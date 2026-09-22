import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {cities,channels,parseDoubanEvents,mergeCityEvents} from '../lib/city-events.mjs';
const folder=new URL('../data/city-discoveries/',import.meta.url);
await mkdir(folder,{recursive:true});
const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const read=async url=>{try{return JSON.parse(await readFile(url,'utf8'))}catch(e){if(e.code==='ENOENT')return [];throw e}};
const oldReport=await read(new URL('status.json',folder));
const report={};
// Two cities at a time; each site's category pages are fetched sequentially.
async function sync(city){
 const output=new URL(city+'.json',folder),previous=await read(output),incoming=[],sources=[];
 for(const [channel,category] of channels){
  const url=`https://www.douban.com/location/${city}/events/week-${channel}`;
  try{
   const response=await fetch(url,{signal:AbortSignal.timeout(20000),headers:{'user-agent':'CityPlay/1.0 (+https://github.com/yayajjiang/cityplay)'}});
   if(!response.ok)throw new Error('HTTP '+response.status);
   const entries=parseDoubanEvents(await response.text(),{city,category,today,sourceUrl:url});
   incoming.push(...entries);sources.push({url,status:'ok',count:entries.length});
  }catch(error){sources.push({url,status:'failed',error:error.message});console.warn(city,channel,error.message)}
 }
 const success=sources.filter(s=>s.status==='ok').length;
 const merged=mergeCityEvents(previous,incoming,city);
 await writeFile(output,JSON.stringify(merged,null,2)+'\n');
 report[city]={status:success===sources.length?'ok':success?'partial':'failed',checkedAt:new Date().toISOString(),lastSuccessfulAt:success?new Date().toISOString():oldReport[city]?.lastSuccessfulAt||null,count:merged.length,sources};
 console.log(`${city}: ${merged.length} upcoming events, ${success}/${sources.length} sources read`);
}
for(let i=0;i<cities.length;i+=2)await Promise.all(cities.slice(i,i+2).map(sync));
await writeFile(new URL('status.json',folder),JSON.stringify(report,null,2)+'\n');
if(Object.values(report).some(r=>r.status==='failed'))process.exitCode=1;
