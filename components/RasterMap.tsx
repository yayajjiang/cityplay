'use client';
import {useEffect,useRef,useState} from 'react';
import type {Map as LeafletMap,LayerGroup,Marker} from 'leaflet';
import type {Place} from '@/data/beijing';
import {createMapMarker} from '@/lib/map-markers';
type Point={lng:number;lat:number};
type Pin={place:Place;point:Point};
export default function RasterMap({center,pins,selectedId,userLocation,onSelect,onStatus,retry,fitRequest}:{center:[number,number];pins:Pin[];selectedId?:string;userLocation:Point|null;onSelect:(place:Place)=>void;onStatus:(status:string)=>void;retry:number;fitRequest:number}){
 const container=useRef<HTMLDivElement>(null),map=useRef<LeafletMap|null>(null),layer=useRef<LayerGroup|null>(null),userMarker=useRef<Marker|null>(null);
 const engine=useRef<typeof import('leaflet')|null>(null);
 const [ready,setReady]=useState(false);
 useEffect(()=>{
  let disposed=false,observer:ResizeObserver|undefined;
  onStatus('loading');setReady(false);
  const timeout=setTimeout(()=>{if(!disposed)onStatus('error')},15000);
  import('leaflet').then(L=>{
   if(disposed||!container.current)return;
   engine.current=L;
   const instance=L.map(container.current,{scrollWheelZoom:true,touchZoom:true,dragging:true,doubleClickZoom:true,zoomControl:false,zoomSnap:0.25,zoomDelta:0.5,wheelPxPerZoomLevel:100,bounceAtZoomLimits:false}).setView([center[1],center[0]],11);
   L.control.zoom({position:'bottomright',zoomInTitle:'放大地图',zoomOutTitle:'缩小地图'}).addTo(instance);
   L.control.scale({position:'bottomleft',imperial:false}).addTo(instance);
   map.current=instance;
   const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,updateWhenIdle:true,keepBuffer:0,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'});
   let loaded=0,failed=0;
   tiles.on('tileload',()=>{if(!disposed){loaded++;clearTimeout(timeout);onStatus('ready')}});
   tiles.on('tileerror',()=>{if(!disposed&&++failed>=4&&loaded===0)onStatus('error')});
   tiles.addTo(instance);layer.current=L.layerGroup().addTo(instance);
   observer=new ResizeObserver(()=>instance.invalidateSize({pan:false}));observer.observe(container.current);
   instance.invalidateSize();setReady(true);
  }).catch(()=>{if(!disposed)onStatus('error')});
  return()=>{disposed=true;clearTimeout(timeout);observer?.disconnect();map.current?.remove();map.current=null;layer.current=null;userMarker.current=null};
 },[center[0],center[1],retry,onStatus]);
 useEffect(()=>{
  const L=engine.current,instance=map.current;
  if(!ready||!L||!instance||!layer.current)return;
  layer.current.clearLayers();
  for(const {place,point} of pins){
   const button=createMapMarker(place.name,place.category,selectedId===place.id);
   button.addEventListener('click',()=>onSelect(place));
   L.marker([point.lat,point.lng],{icon:L.divIcon({html:button,className:'raster-pin-wrapper',iconSize:[36,36],iconAnchor:[18,18]}),keyboard:false,zIndexOffset:selectedId===place.id?1000:0}).addTo(layer.current);
  }
 },[pins,selectedId,ready,onSelect]);
 useEffect(()=>{if(ready&&pins.length)map.current?.fitBounds(pins.map(p=>[p.point.lat,p.point.lng] as [number,number]),{padding:[48,72],maxZoom:12,animate:false})},[ready,fitRequest,pins]);
 useEffect(()=>{const pin=pins.find(p=>p.place.id===selectedId);if(ready&&pin)map.current?.setView([pin.point.lat,pin.point.lng],13,{animate:false})},[selectedId,ready]);
 useEffect(()=>{
  const L=engine.current;if(!ready||!L||!map.current||!userLocation)return;
  userMarker.current?.remove();userMarker.current=L.marker([userLocation.lat,userLocation.lng],{icon:L.divIcon({className:'user-location-marker',iconSize:[18,18]}),title:'我的位置'}).addTo(map.current);
  map.current.setView([userLocation.lat,userLocation.lng],12,{animate:false});
 },[userLocation,ready]);
 return <div className="real-map raster-map" ref={container} aria-label="可拖动和缩放的城市地图"/>;
}
