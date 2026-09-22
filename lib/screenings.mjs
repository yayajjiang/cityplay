// Count individual timed film screenings, not film news, festivals or date ranges.
export function screeningCalendar(items,now=Date.now()){
 const seen=new Set(),today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai'}).format(new Date(now));
 const rows=[];
 for(const item of items){
  const film=item.title.match(/《([^》]+)》/)?.[1];
  if(item.category!=='影视'||!film||!item.start||!item.end||item.start.slice(0,10)!==item.end.slice(0,10)||!item.location)continue;
  if(!/放映|观影|首映/.test(item.title)||item.start.slice(11,19)==='00:00:00')continue;
  const stamp=Date.parse(/(Z|[+-]\d\d:\d\d)$/.test(item.start)?item.start:item.start+'+08:00');
  if(!Number.isFinite(stamp)||stamp<now)continue;
  const key=[film,stamp,item.location.replace(/\s/g,'')].join('|');
  if(seen.has(key))continue;seen.add(key);rows.push({...item,film,stamp});
 }
 rows.sort((a,b)=>a.stamp-b.stamp);
 return {rows,sources:new Set(rows.map(r=>r.source)).size,films:new Set(rows.map(r=>r.film)).size,sessions:rows.length,addedToday:rows.filter(r=>r.discoveredAt===today).length};
}
