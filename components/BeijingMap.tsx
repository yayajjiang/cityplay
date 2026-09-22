'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Clock3, LocateFixed, MapPin, Navigation, Sparkles, TrainFront } from 'lucide-react';
import type { Place } from '@/data/beijing';
import coordinateData from '@/data/place-coordinates.json';

type MapLibre = typeof import('maplibre-gl');
type MapInstance = import('maplibre-gl').Map;
type MarkerInstance = import('maplibre-gl').Marker;
type Coordinates = { lng: number; lat: number };

const categories = ['全部', '书店', '高校', '公园', '博物馆', '展览', '影视', '骑行', 'CityWalk', '赏秋', '雪景', '户外'];

const coordinateOverrides = coordinateData as Record<string, Coordinates>;
const coords = (place: Place): Coordinates => place.lng && place.lat ? {lng:place.lng,lat:place.lat} : coordinateOverrides[place.id] || ({ lng: 115.72 + place.x * 0.0182, lat: 40.36 - place.y * 0.0118 });
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
  const [selected, setSelected] = useState<Place | null>(places[0] || null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [time, setTime] = useState('半天');
  const [mood, setMood] = useState('轻松娱乐');
  const [convenience, setConvenience] = useState('地铁优先');
  const districts = useMemo(()=>['全部',...Array.from(new Set(places.map(p=>p.area)))],[places]);

  const visible = useMemo(() => places.filter((place) => (district === '全部' || place.area === district) && (category === '全部' || place.category === category)), [places, district, category]);
  const nearby = useMemo(() => {
    if (!selected) return [];
    const center = coords(selected);
    return places.filter((place) => place.id !== selected.id).map((place) => ({ place, km: distance(center, coords(place)) })).sort((a, b) => a.km - b.km).slice(0, 4);
  }, [places, selected]);
  const recommendations = useMemo(() => {
    const moodCategories: Record<string, string[]> = { '轻松娱乐': ['公园', 'CityWalk', '书店', '展览', '影视'], '人文漫游': ['博物馆', '高校', '书店', 'CityWalk'], '户外运动': ['户外', '骑行', '赏秋', '公园'] };
    const limit = time === '2小时' ? 3 : time === '半天' ? 5 : 8;
    const origin = userLocation || { lng: center[0], lat: center[1] };
    return places
      .filter((place) => moodCategories[mood]?.includes(place.category))
      .map((place) => ({ place, km: distance(origin, coords(place)), score: (moodCategories[mood]?.includes(place.category) ? 20 : 0) - distance(origin, coords(place)) }))
      .sort((a, b) => convenience === '离我最近' ? a.km - b.km : b.score - a.score)
      .slice(0, limit);
  }, [places, time, mood, convenience, userLocation, center]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let disposed = false;
    import('maplibre-gl').then((maplibre) => {
      if (disposed || !containerRef.current) return;
      maplibreRef.current = maplibre;
      mapRef.current = new maplibre.Map({ container: containerRef.current, style: 'https://tiles.openfreemap.org/styles/bright', center, zoom: city==='北京'?8.8:10.2, attributionControl: false });
      mapRef.current.addControl(new maplibre.NavigationControl({ showCompass: false }), 'top-right');
      mapRef.current.addControl(new maplibre.AttributionControl({ compact: true }), 'bottom-right');
    });
    return () => { disposed = true; mapRef.current?.remove(); mapRef.current = null; };
  }, [city, center]);

  useEffect(() => {
    const map = mapRef.current;
    const maplibre = maplibreRef.current;
    if (!map || !maplibre) return;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = visible.map((place) => {
      const el = document.createElement('button');
      el.className = `real-map-marker ${selected?.id === place.id ? 'active' : ''}`;
      el.title = `${place.name} · ${place.area}`;
      el.setAttribute('aria-label', place.name);
      el.addEventListener('click', () => setSelected(place));
      return new maplibre.Marker({ element: el }).setLngLat(coords(place)).addTo(map);
    });
  }, [visible, selected]);

  useEffect(() => {
    if (selected && mapRef.current) mapRef.current.flyTo({ center: coords(selected), zoom: selected.area === '延庆' || selected.area === '密云' ? 10 : 11.5, essential: true });
  }, [selected]);

  const locate = () => navigator.geolocation?.getCurrentPosition((position) => {
    const point = { lng: position.coords.longitude, lat: position.coords.latitude };
    setUserLocation(point);
    mapRef.current?.flyTo({ center: point, zoom: 12, essential: true });
    if (maplibreRef.current && mapRef.current) {
      const el = document.createElement('div'); el.className = 'user-location-marker';
      new maplibreRef.current.Marker({ element: el }).setLngLat(point).addTo(mapRef.current);
    }
  });

  return <section className="map-workbench" id="map">
    <div className="map-toolbar">
      <div><p className="eyebrow">EXPLORE BY MAP</p><h2>从地图开始逛{city}</h2></div>
      <div className="map-selectors"><label>区域<select value={district} onChange={(e) => setDistrict(e.target.value)}>{districts.map((item) => <option key={item}>{item}</option>)}</select></label><label>标签<select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label><button onClick={locate}><LocateFixed size={16} /> 推荐当前位置</button></div>
    </div>
    <div className="real-map-layout">
      <div className="real-map" ref={containerRef} />
      <aside className="map-place-panel">
        {selected && <><span className="map-place-category">{selected.area} · {selected.category}</span><h3>{selected.name}</h3><p>{selected.note}</p><div className="map-place-tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="primary" href={selected.mapUrl} target="_blank" rel="noreferrer"><Navigation size={16} /> 高德导航</a><div className="nearby-list"><b>附近还可以去</b>{nearby.map(({ place, km }) => <button key={place.id} onClick={() => setSelected(place)}><MapPin size={14} /><span>{place.name}<small>{place.category} · 约 {km.toFixed(1)} km</small></span></button>)}</div></>}
      </aside>
    </div>
    <div className="trip-planner">
      <div className="planner-heading"><Sparkles size={20} /><div><p className="eyebrow">QUICK PLAN</p><h3>现在去哪儿</h3></div></div>
      <div className="planner-options"><label><Clock3 size={15} /> 时间<select value={time} onChange={(e) => setTime(e.target.value)}><option>2小时</option><option>半天</option><option>一天</option></select></label><label>玩法<select value={mood} onChange={(e) => setMood(e.target.value)}><option>轻松娱乐</option><option>人文漫游</option><option>户外运动</option></select></label><label>便利度<select value={convenience} onChange={(e) => setConvenience(e.target.value)}><option>地铁优先</option><option>离我最近</option><option>值得专程去</option></select></label></div>
      <div className="recommendation-row">{recommendations.map(({ place, km }, index) => <button key={place.id} onClick={() => setSelected(place)}><i>{String(index + 1).padStart(2, '0')}</i><span>{place.name}<small>{place.area} · {place.category}{userLocation ? ` · ${km.toFixed(1)} km` : ''}</small></span></button>)}</div>
      {city==='北京' && <div className="subway-links"><TrainFront size={18} /><strong>北京地铁图</strong><span>规划跨区游玩前先看线网与换乘</span><a href="https://map.bjsubway.com/" target="_blank" rel="noreferrer">北京地铁官方线网图 ↗</a><a href="https://www.mtr.bj.cn/article/line" target="_blank" rel="noreferrer">京港地铁高清图 ↗</a></div>}
    </div>
  </section>;
}
