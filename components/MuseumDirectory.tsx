'use client';
import {useState} from 'react';
import {ExternalLink,Search} from 'lucide-react';
import directory from '@/data/beijing-museum-directory.json';
export default function MuseumDirectory(){
 const [query,setQuery]=useState(''),[limit,setLimit]=useState(20);
 const found=directory.items.filter(item=>[item.name,...item.aliases].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
 return <section className="section museum-directory" id="museums"><div className="section-heading"><div><p className="eyebrow">BEYOND THE HIGHLIGHTS</p><h2>北京博物馆名录</h2><p className="directory-intro">从 {directory.items.length} 家馆里找下一站。收录依据市文旅局名录，开放与预约信息见各馆详情。</p></div><a href={directory.sourceUrl} target="_blank" rel="noreferrer">查看名录来源 <ExternalLink size={14}/></a></div><label className="directory-search"><Search size={18}/><input value={query} onChange={e=>{setQuery(e.target.value);setLimit(20)}} placeholder="搜索馆名或别名，如五塔寺、电影、航空" aria-label="搜索北京博物馆名录"/><span>{found.length} 家</span></label><div className="directory-grid">{found.slice(0,limit).map(item=><a key={item.id} href={item.url} target="_blank" rel="noreferrer"><span><b>{item.name}</b>{item.aliases.length>0&&<small>{item.aliases.join(' · ')}</small>}</span><ExternalLink size={15}/></a>)}</div>{!found.length&&<p role="status">这份名录中没有匹配的馆名，试试更短的关键词。</p>}{found.length>limit&&<button type="button" className="directory-more" onClick={()=>setLimit(n=>n+40)}>再看 {Math.min(40,found.length-limit)} 家 · 还有 {found.length-limit} 家</button>}</section>;
}
