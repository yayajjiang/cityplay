import {createHash} from 'node:crypto';
import {classifyDiscovery,diverseDiscoveries} from './discoveries.mjs';
export const cities=['shanghai','guangzhou','shenzhen','hangzhou'];
export const channels=[['all',null],['exhibition','展览'],['film','影视'],['music','演出'],['sports','运动'],['party',null]];
const clean=text=>text.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&nbsp;/g,' ').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/\s+/g,' ').trim();
const timestamp=value=>Date.parse(value && !/(Z|[+-]\d\d:\d\d)$/.test(value)?value+'+08:00':value);
export function isUpcomingEvent(item,now=Date.now()){
 const start=timestamp(item.start),end=timestamp(item.end);
 return Number.isFinite(start)&&Number.isFinite(end)&&end>=start&&end>=now&&start<now+60*86400000;
}
export function parseDoubanEvents(html,{city,category,today,sourceUrl}){
 if(!html.includes('db-events-list'))throw new Error('Expected event list missing (login, verification, or page changed)');
 const items=[];
 for(const block of html.split(/<li\b[^>]*class=["']list-entry["'][^>]*>/i).slice(1)){
  const url=block.match(/href=["'](https:\/\/www\.douban\.com\/event\/\d+\/)["']/)?.[1];
  const title=clean(block.match(/<span[^>]*itemprop="summary"[^>]*>([\s\S]*?)<\/span>/)?.[1]||'');
  const date=key=>block.match(new RegExp(`<time[^>]*itemprop="${key}"[^>]*datetime="([^"]+)"`))?.[1];
  if(!url||!title||/博览会|招商|创业|培训|跨境|行业峰会/.test(title))continue;
  items.push({id:createHash('sha256').update(city+url).digest('hex').slice(0,20),city,title,category:category||classifyDiscovery(title),url,source:'豆瓣同城',sourceUrl,discoveredAt:today,lastSeenAt:today,start:date('startDate'),end:date('endDate'),location:clean(block.match(/<meta[^>]*itemprop="location"[^>]*content="([^"]*)"/)?.[1]||''),price:clean(block.match(/<li class="fee">[\s\S]*?<strong>([\s\S]*?)<\/strong>/)?.[1]||'')});
 }
 return items;
}
export function mergeCityEvents(previous,incoming,city,now=Date.now()){
 const old=new Map(previous.filter(i=>i.city===city).map(i=>[i.url,i]));
 const fresh=incoming.filter(i=>i.city===city).map(i=>({...i,discoveredAt:old.get(i.url)?.discoveredAt||i.discoveredAt}));
 return diverseDiscoveries([...fresh,...previous.filter(i=>i.city===city)].filter(i=>isUpcomingEvent(i,now)),60);
}
