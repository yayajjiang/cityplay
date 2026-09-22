'use client';
import { useRef, useState } from 'react';
import { ArrowUpRight, Coffee, Wine, Route, Leaf, Clock3 } from 'lucide-react';
import { cityRoutes } from '@/data/city-editorial';
import { needs, lifeRoutes } from '@/data/life-routes';
import { xhsSearch } from '@/lib/community';
import type { Place } from '@/data/beijing';
import type { CityKey } from '@/data/cities';

export default function LifestyleGuide({cityKey,city,places,onChoosePlace}:{cityKey:CityKey;city:string;places:Place[];onChoosePlace:(id:string)=>void}) {
 const routeHeading=useRef<HTMLDivElement>(null);
 const [need,setNeed]=useState('全部');
 const [expanded,setExpanded]=useState(false);
 const selection=needs.find(n=>n.name===need)!;
 const matches=places.filter(p=>need==='全部'||(selection.categories as readonly string[]).includes(p.category)||p.tags.some(t=>(selection.tags as readonly string[]).includes(t)));
 const routes=[...lifeRoutes,...cityRoutes].filter(r=>r.city===cityKey&&(need==='全部'||r.need.includes(need)));
 const ordered=[...places.filter(p=>p.guide),...places.filter(p=>!p.guide)];
 const diverse=ordered.filter((p,i)=>ordered.findIndex(a=>a.category===p.category)===i);
 const picks=need==='全部'?[...diverse,...ordered.filter(p=>!diverse.includes(p))]:matches;
 return <section className="section lifestyle" id="life">
  <div className="section-heading"><div><p className="eyebrow">A CITY FOR EVERY MOOD</p><h2>今天，想怎么过？</h2></div><p>一个人、两个人或一群人。<br/>从当下的心情，找到{city}的另一面。</p></div>
  <figure className="lifestyle-cover"><img src={cityKey==='beijing'?'/images/beijing-autumn-hero.png':`/images/${cityKey}-hero.png`} alt={`${city}城市印象插画`} loading="lazy"/><figcaption>{city} · 把时间留给喜欢的事</figcaption></figure>
  <div className="need-grid" aria-label="按生活需求筛选">{needs.map((n,i)=><button type="button" className={need===n.name?'need-choice active':'need-choice'} aria-pressed={need===n.name} key={n.name} onClick={()=>{setNeed(n.name);setExpanded(false)}}><span className="need-number">{String(i+1).padStart(2,'0')}</span><span><b>{n.name}</b><small>{n.hint}</small></span></button>)}</div>
  <div className="life-results-heading" aria-live="polite"><h3>{need==='全部'?'城市生活提案':need}</h3><span>{matches.length} 个去处 · {routes.length} 条编辑路线</span></div>
  {picks.length===0?<div className="life-empty">这座城市的「{need}」攻略还在补充。试试其他需求，或到下方地点分类浏览。</div>:<div className="life-picks">{picks.slice(0,6).map(p=><a key={p.id} href={'#place-'+p.id} className="life-pick" onClick={()=>onChoosePlace(p.id)}><span className="life-pick-icon">{p.category==='酒吧'?<Wine size={20}/>:p.category==='咖啡茶馆'?<Coffee size={20}/>:<ArrowUpRight size={20}/>}</span><span><small>{p.area} / {p.category}</small><b>{p.name}</b><em>{p.duration} · {p.note}</em></span><ArrowUpRight size={16}/></a>)}</div>}
  {routes.length>0&&<><div className="life-results-heading" ref={routeHeading} tabIndex={-1}><h3><Route size={20}/> 照着走的一天</h3><span>编辑建议 · 时长和预算为估算</span></div><div className="route-grid">{routes.slice(0,expanded?undefined:4).map(r=><article className="life-route" key={r.id}><div className="route-kicker"><span>{r.need.join(' / ')}</span><Clock3 size={16}/></div><h3>{r.title}</h3><p className="route-facts">{r.duration} · {r.season}</p><div className="route-stops">{r.stops.map(([id],index)=><span key={id}>{index>0&&<i>→</i>}{places.find(p=>p.id===id)?.name}</span>)}</div><p className="route-budget">{r.budget}</p><details><summary>展开路线与出发准备 <ArrowUpRight size={15}/></summary><p className="route-transport">{r.transport}</p><ol>{r.stops.map(([id,time,task])=>{const p=places.find(p=>p.id===id);return p&&<li key={id}><strong>{p.name}</strong><small>{time}</small><p>{task}</p><a href={p.mapUrl} target="_blank" rel="noreferrer">导航到这一站 ↗</a>{p.guide&&<a href={p.guide.sourceUrl} target="_blank" rel="noreferrer">场所资料 ↗</a>}</li>})}</ol><p className="route-tip">{r.tips}</p><a className="community-link" href={xhsSearch(city+" "+r.stops.map(([id])=>places.find(p=>p.id===id)?.name).join(" "))} target="_blank" rel="noreferrer">小红书搜这条路线 ↗</a></details></article>)}</div>{routes.length>4&&<button type="button" className="routes-more" onClick={(event)=>{event.preventDefault();const collapsing=expanded;setExpanded(!expanded);if(collapsing)requestAnimationFrame(()=>{routeHeading.current?.scrollIntoView({behavior:'instant',block:'start'});routeHeading.current?.focus({preventScroll:true});});}}>{expanded?'收起路线':`查看全部 ${routes.length} 条路线`}</button>}</>}
  {cityKey==='beijing'&&<aside className="season-intelligence"><div><p className="eyebrow">SEASONAL INTELLIGENCE</p><h3><Leaf size={22}/> 赏秋，先看这几件事</h3><p>山区与城区、银杏与黄栌的时间不同。历年观赏期只作选址参考，出发前再看当年的叶况与开放公告。</p></div><div className="season-sources"><a href="https://data.beijing.gov.cn/docs/2025.pdf" target="_blank" rel="noreferrer"><b>秋季彩叶观赏地图 · 数据目录 ↗</b><span>年度资料：彩叶树种、参考观赏期与交通建议。</span></a><a href="https://yllhj.beijing.gov.cn/" target="_blank" rel="noreferrer"><b>北京市园林绿化局 ↗</b><span>关注当年的彩叶、公园及山区开放消息。</span></a><a href="https://gygl.beijing.gov.cn/" target="_blank" rel="noreferrer"><b>北京市公园管理中心 ↗</b><span>花期叶况、游园活动与市属公园公告。</span></a><a href="https://bj.cma.gov.cn/" target="_blank" rel="noreferrer"><b>北京气象 ↗</b><span>查看降雨、大风与出行天气。</span></a></div></aside>}
 </section>;
}
