import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { classifyDiscovery, isDiscoveryRelevant, isRecentDiscovery, diverseDiscoveries } from '../lib/discoveries.mjs';
const output = new URL('../data/daily-discoveries.json', import.meta.url);
const sources = [
 {name:'北京市政府',url:'https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/index.html'},
 {name:'北京旅游网',url:'https://www.visitbeijing.com.cn/'},
 {name:'北京市公园管理中心',url:'https://gygl.beijing.gov.cn/'},
 {name:'北京市园林绿化局',url:'https://yllhj.beijing.gov.cn/'},
 {name:'北京市体育局',url:'https://tyj.beijing.gov.cn/'},
];
const previous=JSON.parse(await readFile(output,'utf8'));
const byUrl=new Map(previous.map(item=>[item.url,item]));
const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const clean=value=>value.replace(/<[^>]*>/g,'').replace(/&nbsp;|&#160;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const results=await Promise.allSettled(sources.map(async source=>{
 const response=await fetch(source.url,{signal:AbortSignal.timeout(15000),headers:{'user-agent':'CityPlay/1.0 public-city-guide'}});
 if(!response.ok)throw new Error(source.name+': HTTP '+response.status);
 const html=await response.text();
 const found=[];
 for(const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)){
  const title=clean(match[2]); let url;
  try{url=new URL(match[1],source.url)}catch{continue}
  if(!['https:','http:'].includes(url.protocol)||url.hostname!==new URL(source.url).hostname)continue;
  if(title.length<6||title.length>90||!isDiscoveryRelevant(title))continue;
  url.hash='';
  const existing=byUrl.get(url.href);
  found.push({id:existing?.id||createHash('sha256').update(url.href).digest('hex').slice(0,20),title,category:classifyDiscovery(title),url:url.href,source:source.name,discoveredAt:existing?.discoveredAt||today,lastSeenAt:today});
 }
 return found;
}));
results.forEach((r,i)=>{if(r.status==='rejected')console.warn('Skipped '+sources[i].name+': '+r.reason.message)});
if(results.every(r=>r.status==='rejected'))throw new Error('All sources failed; preserving previous discoveries.');
const found=results.flatMap(r=>r.status==='fulfilled'?r.value:[]);
const merged=diverseDiscoveries([...found,...previous].filter(item=>isDiscoveryRelevant(item.title)&&isRecentDiscovery(item)).map(item=>({...item,category:classifyDiscovery(item.title)})),60);
await writeFile(output,JSON.stringify(merged,null,2)+'\n');
console.log('Saved '+merged.length+' discoveries; category distribution:',Object.fromEntries([...new Set(merged.map(i=>i.category))].map(c=>[c,merged.filter(i=>i.category===c).length])));
