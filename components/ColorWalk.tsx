'use client';
import { useState } from 'react';
import type {CityKey} from '@/data/cities';
import {xhsSearch} from '@/lib/community';
type Stop={color:string;name:string;place:string;idea:string};
const palettes:Record<CityKey,Stop[]>={
 beijing:[{color:'#b34934',name:'朱红',place:'钟楼湾胡同',idea:'找红墙、灯笼和门上的细节，拍下三种不同的红。'},{color:'#cba742',name:'金黄',place:'钓鱼台银杏大道',idea:'留给深秋叶黄时；今天也可以从街角的黄色小物开始。'},{color:'#718169',name:'青绿',place:'奥林匹克森林公园',idea:'沿树荫慢走，收集叶片、湖水与倒影里的绿。'}],
 shanghai:[{color:'#b77a58',name:'砖红',place:'武康路',idea:'从一块砖、一扇窗到整栋建筑，观察街区的颜色。'},{color:'#7b93a0',name:'江蓝',place:'外滩',idea:'捕捉天空、水面与玻璃里的蓝，给自己一小时慢拍。'},{color:'#758666',name:'林绿',place:'共青森林公园',idea:'走一小段林荫道，拍下同一种绿的不同层次。'}],
 guangzhou:[{color:'#d4b47b',name:'骑楼黄',place:'恩宁路',idea:'沿骑楼找暖黄墙面，再找一份同色的点心。'},{color:'#789174',name:'榕树绿',place:'沙面',idea:'在树影与建筑之间，收集叶片、窗框和光斑。'},{color:'#7793b1',name:'夜幕蓝',place:'花城广场',idea:'黄昏出发，看天空与城市灯光怎样交换颜色。'}],
 shenzhen:[{color:'#5b9ea7',name:'海湾蓝',place:'深圳湾公园',idea:'拍海面、天空和玻璃楼的蓝，散步也能成为寻色任务。'},{color:'#b87046',name:'落日橙',place:'人才公园',idea:'晴天傍晚找暖色倒影，阴天改看建筑细节。'},{color:'#839576',name:'山野绿',place:'莲花山公园',idea:'沿上山步道找三种绿色，走累了就在草地休息。'}],
 hangzhou:[{color:'#739080',name:'西湖绿',place:'茅家埠',idea:'看湖水、柳树与岸边倒影，不必绕完整个西湖。'},{color:'#b8a060',name:'茶山色',place:'九溪十八涧',idea:'观察茶叶、溪石和林间光线，给照片留一些空白。'},{color:'#81837b',name:'水墨灰',place:'拱宸桥',idea:'找桥面、屋瓦和运河倒影，收集江南的灰色层次。'}],
};
export default function ColorWalk({cityKey,city}:{cityKey:CityKey;city:string}){
 const [index,setIndex]=useState(0);const stop=palettes[cityKey][index];
 return <section className="color-walk" aria-label="Color Walk主题玩法"><div><p className="eyebrow">COLOR WALK · 自主玩法</p><h2>选一种颜色，<br/>重新认识{city}。</h2><p>挑一个颜色，散步一小时，收集三张同色照片。</p><div className="color-choices">{palettes[cityKey].map((s,i)=><button type="button" key={s.name} onClick={()=>setIndex(i)} aria-pressed={i===index} style={{background:s.color}}>{s.name}{i===index?' ✓':''}</button>)}</div></div><div className="color-stop" style={{borderColor:stop.color}} aria-live="polite"><span style={{color:stop.color}}>这一站 · {stop.name}</span><h3>{stop.place}</h3><p>{stop.idea}</p><a href={`https://uri.amap.com/search?keyword=${encodeURIComponent(stop.place)}&city=${encodeURIComponent(city)}`} target="_blank" rel="noreferrer">去这里找颜色 ↗</a><a href={xhsSearch(city+' Color Walk '+stop.name)} target="_blank" rel="noreferrer">小红书搜灵感 ↗</a>{cityKey==='beijing'&&<a href="https://www.beijing.gov.cn/renwen/rwzyd/xltj/202603/t20260323_4563846.html" target="_blank" rel="noreferrer">Color Walk 玩法参考 ↗</a>}</div></section>;
}
