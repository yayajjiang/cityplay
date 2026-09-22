// Shared category symbols for both map renderers; labels are always text nodes.
const styles:Record<string,{color:string;path:string}>={
  '书店':{color:'#98683d',path:'M3 4h6l3 2 3-2h6v15h-6l-3 2-3-2H3z M12 6v15'},
  '公园':{color:'#34735d',path:'M12 3 5 12h4l-5 6h16l-5-6h4z M12 18v4'},
  '户外':{color:'#34735d',path:'m2 20 7-13 4 7 3-5 6 11z M7 11l2 2 2-2'},
  '骑行':{color:'#31788c',path:'M7 17a4 4 0 1 0-8 0 4 4 0 0 0 8 0 M23 17a4 4 0 1 0-8 0 4 4 0 0 0 8 0 M3 17l5-9 6 9H3 M14 17l4-12h-4 M6 8h5'},
  '美食':{color:'#b6533b',path:'M4 3v6q0 3 3 3t3-3V3 M7 3v19 M17 3v9h4 M21 3v19'},
  '咖啡':{color:'#98683d',path:'M4 8h12v7a5 5 0 0 1-10 0V8 M16 9h3a3 3 0 0 1 0 6h-3 M3 21h16 M8 2v3 M12 2v3'},
  '酒吧':{color:'#805b8e',path:'M4 3h16l-8 9z M12 12v9 M7 21h10'},
  '夜生活':{color:'#805b8e',path:'M4 3h16l-8 9z M12 12v9 M7 21h10'},
  '博物馆':{color:'#587596',path:'m3 8 9-5 9 5z M5 11v8 M12 11v8 M19 11v8 M3 22h18'},
  '高校':{color:'#587596',path:'m2 8 10-5 10 5-10 5z M6 10v7q6 5 12 0v-7 M22 8v8'},
  '展览':{color:'#b36d48',path:'M3 3h18v18H3z M3 17l6-7 5 6 3-3 4 4 M16 7h1'},
};
export function createMapMarker(name:string,category:string,active:boolean){
  const style=styles[category]||{color:'#47786b',path:'M12 22s8-8 8-14a8 8 0 0 0-16 0c0 6 8 14 8 14z M12 6v4'};
  const button=document.createElement('button');
  button.type='button';button.className=`city-map-pin${active?' active':''}`;
  button.style.setProperty('--pin-color',style.color);
  button.title=`${name} · ${category}`;button.setAttribute('aria-label',button.title);button.setAttribute('aria-pressed',String(active));
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  for(const [key,value] of Object.entries({viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':'1.8','stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true'}))svg.setAttribute(key,value);
  const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',style.path);svg.appendChild(path);button.appendChild(svg);
  const label=document.createElement('span');label.className='pin-label';label.textContent=name;button.appendChild(label);
  return button;
}
