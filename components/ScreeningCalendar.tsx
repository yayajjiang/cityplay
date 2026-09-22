'use client';
import {CalendarDays,ExternalLink} from 'lucide-react';
import type {Discovery} from '@/lib/discoveries.mjs';
import {screeningCalendar} from '@/lib/screenings.mjs';
export default function ScreeningCalendar({items,city}:{items:Discovery[];city:string}){
 const calendar=screeningCalendar(items);
 return <section className="screening-calendar"><div className="daily-head"><div><p className="eyebrow">ON THE BIG SCREEN</p><h2>{city}放映日历</h2></div><CalendarDays size={30}/></div><div className="screening-stats">{[[calendar.sources,'来源渠道'],[calendar.films,'部影片'],[calendar.sessions,'场待映'],[calendar.addedToday,'今日收录']].map(([value,label])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><p className="screening-caption">已收录的单场放映，按开场时间排列</p><div className="screening-rows">{calendar.rows.map(row=><a href={row.url} key={row.id} target="_blank" rel="noreferrer"><time dateTime={row.start}>{row.start!.slice(5,10)}<b>{row.start!.slice(11,16)}</b></time><div><h3>{row.film}</h3><p>{row.location}</p><small>{row.price||'票务见详情'} · {row.source}</small></div><ExternalLink size={16}/></a>)}</div>{!calendar.sessions&&<a href="https://beijing.douban.com/events/future-film" target="_blank" rel="noreferrer">查看北京近期观影活动 ↗</a>}</section>;
}
