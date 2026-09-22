'use client';
import { useState } from 'react';
import type { CityKey } from '@/data/cities';
const motifs:Record<CityKey,{name:string;color:string;stroke:string;path:string;veins?:string}>={
 beijing:{name:'银杏',color:'#e4b72f',stroke:'#997622',path:'M20 30C15 21 3 23 2 13C2 5 10 2 17 6L20 13L23 6C30 2 38 5 38 13C37 23 25 21 20 30ZM20 29L22 39',veins:'M20 29L8 11M20 29L14 8M20 29L26 8M20 29L32 11'},
 shanghai:{name:'梧桐',color:'#bd6b42',stroke:'#794b35',path:'M20 2L25 12L34 8L30 19L38 21L28 29L21 28L22 38L19 38L18 28L9 30L2 21L10 19L6 8L15 12Z',veins:'M20 28L20 8M20 24L11 15M20 24L29 15'},
 guangzhou:{name:'木棉',color:'#df694f',stroke:'#a64837',path:'M20 17C7 7 15 0 20 3C26 0 34 8 23 17C38 8 42 19 33 24C41 36 27 41 22 26C23 42 7 40 10 28C-1 29-1 14 16 19Z',veins:'M17 20L23 20M20 17L20 23'},
 shenzhen:{name:'海浪',color:'#55b7be',stroke:'#236c86',path:'M3 27C12 28 11 7 24 8C32 8 36 15 35 21C30 15 22 17 26 25C28 30 34 29 38 27L35 34L5 34Z',veins:'M7 31C16 33 16 16 24 14'},
 hangzhou:{name:'桂花',color:'#edcc67',stroke:'#9e8e47',path:'M20 18C5 17 6 3 14 5C18 5 20 11 20 15C20 3 34 1 34 10C34 16 27 19 22 20C38 19 39 33 30 34C24 34 21 27 20 23C19 39 5 40 5 30C5 24 12 20 18 20Z',veins:'M18 20L22 20M20 18L20 22'},
};
export default function AutumnAtmosphere({enabled,cityKey}:{enabled:boolean;cityKey:CityKey}){
 const [paused,setPaused]=useState(false);
 const motif=motifs[cityKey];
 if(!enabled)return null;
 return <><button type="button" className="autumn-toggle" aria-pressed={!paused} onClick={()=>setPaused(!paused)}>{motif.name}动效 · {paused?'开启':'暂停'}</button>{!paused&&<div className="autumn-leaves" aria-hidden="true">{Array.from({length:7},(_,i)=><svg key={i} viewBox="0 0 40 40" style={{left:`${8+i*14}%`,animationDelay:`-${i*3}s`,animationDuration:`${19+i*2}s`,fill:motif.color,stroke:motif.stroke}}><path d={motif.path}/><path d={motif.veins} fill="none" strokeWidth=".8"/></svg>)}</div>}</>;
}
