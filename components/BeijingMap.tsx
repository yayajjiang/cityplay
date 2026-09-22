'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Clock3, Expand, LocateFixed, MapPin, Navigation, Sparkles, TrainFront } from 'lucide-react';
import type { Place } from '@/data/beijing';
import RasterMap from './RasterMap';
import {createMapMarker} from '@/lib/map-markers';
import coordinateData from '@/data/place-coordinates.json';

type MapLibre = typeof import('maplibre-gl');
type MapInstance = import('maplibre-gl').Map;
type MarkerInstance = import('maplibre-gl').Marker;
type Coordinates = { lng: number; lat: number };


const coordinateOverrides = coordinateData as Record<string, Coordinates>;
const coords = (place: Place): Coordinates | null => Number.isFinite(place.lng) && Number.isFinite(place.lat) ? {lng:place.lng!,lat:place.lat!} : coordinateOverrides[place.id] || null;
const distance = (a: Coordinates, b: Coordinates) => {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const value = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(value));
};

export default function BeijingMap({ places, city='北京', center=[116.4074,39.9042] }: { places: Place[]; city?:string; center?:[number,number] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapInstance | null>(null);
  const maplibreRef = useRef<MapLibre | null>(null);
  const markersRef = useRef<MarkerInstance[]>([]);
  const [district, setDistrict] = useState('全部');
  const [category, setCategory] = useState('全部');
  const [selected, setSelected] = useState<Place | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [time, setTime] = useState('半天');
  const [mood, setMood] = useState('轻松娱乐');
  const [convenience, setConvenience] = useState('距离优先');
  const [locationStatus,setLocationStatus]=useState('尚未定位 · 当前按城市中心推荐');
  const [mapStatus,setMapStatus]=useState('loading');
  const [mapEngine,setMapEngine]=useState<'raster'|'vector'>('raster');
  const [retry,setRetry]=useState(0);
  const [fitRequest,setFitRequest]=useState(0);
  const userMarker=useRef<MarkerInstance|null>(null);
  const [mapReady,setMapReady]=useState(false);
  const categories=useMemo(()=>['全部',...new Set(places.map(p=>p.category))],[places]);
  const districts = useMemo(()=>['全部',...Array.from(new Set(places.map(p=>p.area)))],[places]);

  const visible = useMemo(() => places.filter((place) => (district === '全部' || place.area === district) && (category === '全部' || place.category === category)), [places, district, category]);
  useEffect(()=>{if(selected&&!visible.some(p=>p.id===selected.id))setSelected(null)},[visible,selected]);
  const pins=useMemo(()=>visible.filter(p=>coords(p)).map(place=>({place,point:coords(place)!})),[visible]);
  const nearby = useMemo(() => {
    if (!selected) return [];
    const center = coords(selected);
    if(!center)return [];
    return places.filter((place) => place.id !== selected.id && coords(place)).map((place) => ({ place, km: distance(center, coords(place)!) })).sort((a, b) => a.km - b.km).slice(0, 4);
  }, [places, selected]);
  const recommendations = useMemo(() => {
    const moodCategories: Record<string, string[]> = { '轻松娱乐': ['公园', 'CityWalk', '书店', '展览', '影视'], '人文漫游': ['博物馆', '高校', '书店', 'CityWalk'], '户外运动': ['户外', '骑行', '赏秋', '公园'] };
    const limit = time === '2小时' ? 3 : time === '半天' ? 5 : 8;
    const origin = userLocation || { lng: center[0], lat: center[1] };
    return places
      .filter((place) => moodCategories[mood]?.includes(place.category))
      .map((place) => ({ place, km: coords(place)?distance(origin,coords(place)!):null, score:coords(place)?20-distance(origin,coords(place)!):0 }))
      .sort((a, b) => convenience === '离我最近' ? (a.km??Infinity) - (b.km??Infinity) : b.score - a.score)
      .slice(0, limit);
  }, [places, time, mood, convenience, userLocation, center]);

  useEffect(() => {
    if (mapEngine!=='vector'||!containerRef.current || mapRef.current) return;
    let disposed = false;
    setMapReady(false);setMapStatus('loading');
    const timeout=window.setTimeout(()=>{if(!disposed)setMapStatus('error')},15000);
    let observer:ResizeObserver|undefined;
    import('maplibre-gl').then((maplibre) => {
      if (disposed || !containerRef.current) return;
      maplibreRef.current = maplibre;
      mapRef.current = new maplibre.Map({ container: containerRef.current, style: 'https://tiles.openfreemap.org/styles/positron', center, zoom: city==='北京'?8.8:10.2, scrollZoom:true,touchZoomRotate:true,attributionControl: false });
      setMapReady(true);
      mapRef.current.addControl(new maplibre.NavigationControl({ showCompass: false }), 'bottom-right');
      mapRef.current.touchZoomRotate.disableRotation();
      mapRef.current.addControl(new maplibre.ScaleControl({unit:'metric'}),'bottom-left');
      mapRef.current.addControl(new maplibre.AttributionControl({ compact: true }), 'bottom-right');
      mapRef.current.on('load',()=>{if(!disposed){clearTimeout(timeout);setMapStatus('ready');setMapReady(true);mapRef.current?.resize()}});
      mapRef.current.on('error',()=>{if(!disposed)setMapStatus('error')});
      observer=new ResizeObserver(()=>mapRef.current?.resize());observer.observe(containerRef.current);
    }).catch(()=>{if(!disposed)setMapStatus('error')});
    return () => { disposed = true;clearTimeout(timeout);observer?.disconnect();userMarker.current?.remove(); mapRef.current?.remove(); mapRef.current = null; };
  }, [city, center[0], center[1],retry,mapEngine]);

  useEffect(() => {
    const map = mapRef.current;
    const maplibre = maplibreRef.current;
    if (!map || !maplibre) return;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = visible.filter(place=>coords(place)).map((place) => {
      const el = createMapMarker(place.name,place.category,selected?.id===place.id);
      el.addEventListener('click', () => setSelected(place));
      return new maplibre.Marker({ element: el }).setLngLat(coords(place)!).addTo(map);
    });
  }, [visible, selected, mapReady]);

  useEffect(() => {
    if (selected && coords(selected) && mapRef.current) mapRef.current.flyTo({ center: coords(selected)!, zoom: selected.area === '延庆' || selected.area === '密云' ? 10 : 11.5, essential: true });
  }, [selected]);

  useEffect(()=>{const map=mapRef.current;if(!map||!mapReady||!pins.length)return;const bounds=new maplibreRef.current!.LngLatBounds();pins.forEach(p=>bounds.extend(p.point));map.fitBounds(bounds,{padding:72,maxZoom:12,duration:0})},[pins,fitRequest,mapReady,mapEngine]);

  const locate = () => {
    if(!navigator.geolocation){setLocationStatus('浏览器不支持定位，可按区域选择去处');return;}
    setLocationStatus('正在获取位置，请允许浏览器定位…');
    navigator.geolocation.getCurrentPosition((position)=>{
      const point={lng:position.coords.longitude,lat:position.coords.latitude};
      setUserLocation(point);setConvenience('离我最近');
      setLocationStatus(distance(point,{lng:center[0],lat:center[1]})>120?`已定位 · 你离${city}较远，推荐仍限定${city}`:'已定位 · 按你的位置排序，距离为直线距离');
      mapRef.current?.flyTo({center:point,zoom:12});
      if(maplibreRef.current&&mapRef.current){userMarker.current?.remove();const el=document.createElement('div');el.className='user-location-marker';userMarker.current=new maplibreRef.current.Marker({element:el}).setLngLat(point).addTo(mapRef.current);}
    },error=>setLocationStatus(error.code===1?'未获定位权限 · 可在浏览器站点设置中允许后重试':error.code===3?'定位超时 · 请重试或按区域挑选':'暂时无法获取位置 · 请重试或按区域挑选'),{enableHighAccuracy:false,timeout:10000,maximumAge:300000});
  };

  return <section className="map-workbench" id="map">
    <div className="map-toolbar">
      <div><p className="eyebrow">EXPLORE BY MAP</p><h2>从地图开始逛{city}</h2></div>
      <div className="map-selectors"><label>底图<select value={mapEngine} onChange={e=>{setMapEngine(e.target.value as 'raster'|'vector');setMapStatus('loading')}}><option value="raster">街道地图</option><option value="vector">清爽浅色</option></select></label><label>地点<select value={selected?.id||''} onChange={e=>setSelected(places.find(p=>p.id===e.target.value)||null)}><option value="" disabled>在地图上选一个地方</option>{visible.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label><label>区域<select value={district} onChange={(e) => setDistrict(e.target.value)}>{districts.map((item) => <option key={item}>{item}</option>)}</select></label><label>标签<select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label><button onClick={locate}><LocateFixed size={16} /> 推荐当前位置</button></div>
    </div>
    <div className="real-map-layout">
      <div className="map-stage"><div className="map-floating-head"><div><span>EXPLORE · {city}</span><strong>{pins.length} 个地图去处</strong></div><button type="button" onClick={()=>setFitRequest(n=>n+1)}><Expand size={16}/> 查看全貌</button></div><div className="map-gesture-hint">双指捏合缩放 · 拖动探索</div>{mapEngine==='raster'?<RasterMap center={center} pins={pins} fitRequest={fitRequest} selectedId={selected?.id} userLocation={userLocation} onSelect={setSelected} onStatus={setMapStatus} retry={retry}/>:<div className="real-map" ref={containerRef}/>}{mapStatus!=='ready'&&<div className="map-status" role="status">{mapStatus==='loading'?'地图加载中…':<>底图暂时未能加载<button type="button" onClick={()=>{setMapEngine(mapEngine==='raster'?'vector':'raster');setMapStatus('loading')}}>切换底图</button><button type="button" onClick={()=>setRetry(n=>n+1)}>重新加载</button><a href={`https://uri.amap.com/search?keyword=${encodeURIComponent(city)}`} target="_blank" rel="noreferrer">打开高德地图 ↗</a></>}</div>}</div>
      <aside className="map-place-panel">{!selected&&<div className="map-empty-selection"><MapPin size={32}/><p className="eyebrow">PICK YOUR NEXT STOP</p><h3>下一站，去哪儿？</h3><p>点一个地图标记，看看怎么玩，再把附近的好去处串起来。</p><div className="map-place-tags">{categories.filter(c=>c!=="全部").map(c=><button key={c} type="button" onClick={()=>setCategory(c)}>{c}</button>)}</div></div>}
        {selected && <><span className="map-place-category">{selected.area} · {selected.category}</span><h3>{selected.name}</h3><p>{selected.note}</p><div className="map-place-tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="primary" href={selected.mapUrl} target="_blank" rel="noreferrer"><Navigation size={16} /> 高德导航</a><div className="nearby-list"><b>附近还可以去</b>{nearby.length===0&&<a href={selected.mapUrl} target="_blank" rel="noreferrer">在高德查看周边 ↗</a>}{nearby.map(({ place, km }) => <button key={place.id} onClick={() => {setDistrict('全部');setCategory('全部');setSelected(place)}}><MapPin size={14} /><span>{place.name}<small>{place.category} · 约 {km.toFixed(1)} km</small></span></button>)}</div></>}
      </aside>
    </div>
    <div className="trip-planner">
      <div className="planner-heading"><Sparkles size={20} /><div><p className="eyebrow">QUICK PLAN</p><h3>现在去哪儿</h3></div></div>
      <p className="location-status" role="status">{locationStatus} <button type="button" onClick={locate}>获取我的位置</button></p><div className="planner-options"><label><Clock3 size={15} /> 时间<select value={time} onChange={(e) => setTime(e.target.value)}><option>2小时</option><option>半天</option><option>一天</option></select></label><label>玩法<select value={mood} onChange={(e) => setMood(e.target.value)}><option>轻松娱乐</option><option>人文漫游</option><option>户外运动</option></select></label><label>便利度<select value={convenience} onChange={(e) => setConvenience(e.target.value)}><option>距离优先</option><option>离我最近</option></select></label></div>
      <div className="recommendation-row">{recommendations.map(({ place, km }, index) => <button key={place.id} onClick={() => {setDistrict('全部');setCategory('全部');setSelected(place)}}><i>{String(index + 1).padStart(2, '0')}</i><span>{place.name}<small>{place.area} · {place.category}{userLocation && km!==null ? ` · ${km.toFixed(1)} km` : ''}</small></span></button>)}</div>
      {city==='北京' && <div className="subway-links"><TrainFront size={18} /><strong>北京地铁图</strong><span>规划跨区游玩前先看线网与换乘</span><a href="https://map.bjsubway.com/" target="_blank" rel="noreferrer">北京地铁官方线网图 ↗</a><a href="https://www.mtr.bj.cn/article/line" target="_blank" rel="noreferrer">京港地铁高清图 ↗</a></div>}
    </div>
  </section>;
}
