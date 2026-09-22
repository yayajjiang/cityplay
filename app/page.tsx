'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Bike,
  BookOpen,
  Building2,
  CalendarDays,
  ChevronRight,
  ExternalLink,
  Footprints,
  Landmark,
  Leaf,
  Map,
  MapPin,
  Search,
  Snowflake,
  Sparkles,
  Trees,
} from 'lucide-react';
import AutumnAtmosphere from '@/components/AutumnAtmosphere';
import { extraSeasonalTopics } from '@/data/seasonal-topics';
import { cityEditorial } from '@/data/city-editorial';
import BeijingMap from '@/components/BeijingMap';
import LifestyleGuide from '@/components/LifestyleGuide';
import SeasonalCollections from '@/components/SeasonalCollections';
import { xhsSearch } from '@/lib/community';
import { cityConfig } from '@/city.config';
import { cityPacks, type CityKey } from '@/data/cities';
import { cityDiscoveryFeeds } from '@/data/activity-feeds';
import { diverseDiscoveries, activityCategories } from '@/lib/discoveries.mjs';
import {
  activities,
  events,
  guideCollections,
  places,
  type Place,
} from '@/data/beijing';

const icons = {
  书店: BookOpen,
  高校: Building2,
  公园: Trees,
  博物馆: Landmark,
  骑行: Bike,
  CityWalk: Footprints,
  赏秋: Leaf,
  雪景: Snowflake,
};
const filters = ['全部', ...cityConfig.categories] as const;
const evergreenCategories:Record<string,string[]> = {美食:['美食','咖啡茶馆'],夜生活:['酒吧','音乐现场'],亲子:['亲子','公园'],运动:['运动','骑行','户外'],图书:['书店'],影视:['影视'],展览:['展览','博物馆'],演出:['音乐现场','剧场'],市集:['逛街市集'],户外:['户外','公园','赏秋']};
const guideSources = [
  { name: '小红书 · 我在北京看古树', type: '社区搜索', cadence: '实拍攻略', note: '看古树路线、拍照角度与到访体验', url: xhsSearch('我在北京看古树') },
  { name: '小红书 · 北京酒吧', type: '社区搜索', cadence: '探店攻略', note: '鸡尾酒、精酿、氛围与朋友小聚', url: xhsSearch('北京 酒吧 精酿 探店') },
  { name: '小红书 · 北京美食', type: '社区搜索', cadence: '逛吃攻略', note: '按街区找餐厅、小吃和咖啡馆', url: xhsSearch('北京 美食 逛吃 路线') },
  { name: '小红书 · 北京赏秋', type: '社区搜索', cadence: '当季实拍', note: '银杏、红叶、徒步与周末路线', url: xhsSearch('北京 赏秋 红叶 实拍') },
  { name: '北京市政府 · 今日提示', type: '网站', cadence: '每日', note: '全市公共活动、节庆、惠民信息', url: 'https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/index.html' },
  { name: '北京旅游网', type: '网站', cadence: '每日', note: '展览、演出、文旅活动与路线', url: 'https://www.visitbeijing.com.cn/' },
  { name: '北京市公园管理中心', type: '网站', cadence: '每日', note: '市属公园活动、花期与科普预告', url: 'https://gygl.beijing.gov.cn/' },
  { name: '北京市文化和旅游局', type: '网站', cadence: '工作日', note: '官方文旅通知、演出与公共文化', url: 'https://whlyj.beijing.gov.cn/' },
  { name: '北京发布', type: '公众号', cadence: '每日', note: '城市新闻、活动提醒与公共服务', url: 'https://www.beijing.gov.cn/' },
  { name: '文旅北京', type: '公众号', cadence: '每日', note: '周末玩法、展演、市集与路线推荐', url: 'https://whlyj.beijing.gov.cn/' },
  { name: '北京公园', type: '公众号', cadence: '按活动', note: '公园花期、展览、游园与预约提醒', url: 'https://gygl.beijing.gov.cn/' },
  { name: '北京阅读季', type: '公众号', cadence: '按活动', note: '书市、新书、阅读活动与书店消息', url: 'https://www.beijing.gov.cn/' },
] as const;
const solarTerms = [
  ['01-05', '小寒', 'winter', '寒意正深，等一场雪落宫墙。'],
  ['01-20', '大寒', 'winter', '一年最冷时，去看结冰的湖与城。'],
  ['02-04', '立春', 'spring', '风里有了春信，胡同正在醒来。'],
  ['02-19', '雨水', 'spring', '冰雪渐融，适合沿河慢慢走。'],
  ['03-05', '惊蛰', 'spring', '万物有声，山桃先开。'],
  ['03-20', '春分', 'spring', '昼夜平分，正是出城踏青时。'],
  ['04-04', '清明', 'spring', '风清景明，柳色绕过旧城墙。'],
  ['04-20', '谷雨', 'spring', '春深一寸，牡丹与新绿相逢。'],
  ['05-05', '立夏', 'summer', '绿荫渐浓，去公园消磨长日。'],
  ['05-21', '小满', 'summer', '风吹麦浪，京郊开始丰盈。'],
  ['06-05', '芒种', 'summer', '日光明亮，适合清晨与傍晚。'],
  ['06-21', '夏至', 'summer', '白昼最长，去追一场城市日落。'],
  ['07-07', '小暑', 'summer', '荷风送凉，找一处水边坐坐。'],
  ['07-22', '大暑', 'summer', '暑气正盛，把展览留给午后。'],
  ['08-07', '立秋', 'autumn', '风开始转凉，北京的秋正在路上。'],
  ['08-23', '处暑', 'autumn', '暑意退场，晚风适合骑行。'],
  ['09-07', '白露', 'autumn', '露从今夜白，银杏正在酝酿金色。'],
  ['09-23', '秋分', 'autumn', '天高云淡，把北京走成一幅长卷。'],
  ['10-08', '寒露', 'autumn', '秋意更深，红墙与黄叶正相配。'],
  ['10-23', '霜降', 'autumn', '层林尽染，去山里看最后的浓秋。'],
  ['11-07', '立冬', 'winter', '北风入城，开始期待第一场雪。'],
  ['11-22', '小雪', 'winter', '天色清冷，古建显得格外安静。'],
  ['12-07', '大雪', 'winter', '若雪落下，整座城都会变成水墨。'],
  ['12-21', '冬至', 'winter', '长夜至此，去冰场与热气里过冬。'],
] as const;

function getSolarTerm() {
  const now = new Date();
  const key = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  return [...solarTerms].reverse().find(([date]) => key >= date) || solarTerms[solarTerms.length - 1];
}
function daysUntil(date: string) {
  return Math.ceil(
    (new Date(`${date}T23:59:59`).getTime() - Date.now()) / 86400000,
  );
}
function eventState(start: string, end: string) {
  const a = daysUntil(start),
    b = daysUntil(end);
  if (b < 0) return '已结束';
  if (a > 0) return `${a} 天后开始`;
  return b === 0 ? '最后一天' : `还有 ${b} 天`;
}

function PlaceCard({ place }: { place: Place }) {
  const Icon = icons[place.category as keyof typeof icons] || MapPin;
  return (
    <article className="place-card" id={'place-'+place.id}>
      <div className="place-card__top">
        <span className="place-icon">
          <Icon size={18} />
        </span>
        <span className="guide-number">{place.category}</span>
      </div>
      <div>
        <p className="eyebrow">
          {place.area} · {place.duration}
        </p>
        <h3>{place.name}</h3>
        <p className="place-note">{place.note}</p>
        {place.guide && <div className="visit-guide"><strong>{place.guide.address}</strong><p>{place.guide.planning}</p><a href={place.guide.sourceUrl} target="_blank" rel="noreferrer">{place.guide.sourceName} ↗</a><small>{place.guide.checkedAt}</small></div>}
        {place.visit && <div className="visit-guide"><strong>{place.visit.status}</strong><p>{place.visit.method}</p><p>{place.visit.credential}</p>{place.visit.route && <p>推荐路线：{place.visit.route}</p>}<a href={place.visit.officialUrl} target="_blank" rel="noreferrer">官方入口 · 核验 {place.visit.verifiedAt} <ExternalLink size={12}/></a></div>}
      </div>
      <div className="tag-row">
        {place.tags.slice(0, 3).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="place-meta">
        <span>{place.seasons.join(' / ')}</span>
        <a href={place.mapUrl} target="_blank" rel="noreferrer">
          地图 <ExternalLink size={12} />
        </a>
      </div>
    </article>
  );
}

export function CityGuide({initialCity='beijing'}:{initialCity?:CityKey}) {
  const [, solarTerm, season, seasonalLine] = getSolarTerm();
  const [view,setView]=useState('home');
  useEffect(()=>{const sync=()=>{const key=location.hash.slice(1);const targets:Record<string,string>={top:'home',home:'home',guide:'guide',life:'guide',collections:'guide',explore:'guide',map:'map',discover:'discover',daily:'discover',sources:'discover'};if(targets[key]){setView(targets[key]);requestAnimationFrame(()=>{if(['home','top','guide','map','discover'].includes(key))window.scrollTo({top:0,behavior:'instant'});else document.getElementById(key)?.scrollIntoView({block:'start'})})}};sync();window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync)},[]);
  const [filter, setFilter] = useState('全部');
  const [query, setQuery] = useState('');
  const [activityFilter, setActivityFilter] = useState('全部');
  const [activeCity,setActiveCity]=useState<CityKey>(initialCity);
  const [showAllPlaces,setShowAllPlaces]=useState(false);
  const [showAllActivities,setShowAllActivities]=useState(false);
  const [showAllSources,setShowAllSources]=useState(false);
  const cityLiveEvents=cityDiscoveryFeeds[activeCity].filter(item=>!item.end||Date.parse(item.end+'+08:00')>=Date.now());
  const visibleDiscoveries = diverseDiscoveries(cityLiveEvents, 6, activityFilter);
  const activePack=activeCity==='beijing'?{key:'beijing' as const,name:'北京',en:'Beijing',tagline:cityConfig.tagline,center:cityConfig.center as [number,number],places}:cityPacks[activeCity];
  const cityPlaces=activePack.places;
  const seasonalCollections=activeCity==='beijing'?guideCollections:[...(['spring','summer','autumn','winter'] as const).map((key,i)=>({id:activeCity+'-'+key,title:cityEditorial[activeCity].seasonTitles[i],kicker:'时令主题',description:cityEditorial[activeCity].seasonDescriptions[i],season:['春','夏','秋','冬'][i],seasons:[key],placeIds:cityPlaces.filter(p=>p.seasons.includes(['春','夏','秋','冬'][i])||p.seasons.includes('四季')).map(p=>p.id),sourceUrl:xhsSearch(activePack.name+' '+['春游','夏天','赏秋','冬天'][i])})),{id:activeCity+'-all',title:'走进'+activePack.name+'的日常',kicker:'四季指南',description:'从街区、展馆和公园里选一个，留半天慢慢逛。',season:'四季',seasons:['all'],placeIds:cityPlaces.filter(p=>p.seasons.includes('四季')).map(p=>p.id),sourceUrl:xhsSearch(activePack.name+' 城市漫步')}].filter(c=>c.placeIds.length>0);
  const citySources=activeCity==='beijing'?[{name:'小红书 · 北京周末去哪儿',type:'关键词搜索',cadence:'路线与实拍',note:'市集、展览、徒步、咖啡，看看大家这个周末去哪玩。',url:xhsSearch('北京周末去哪儿')},{name:'小红书 · 北京活动',type:'关键词搜索',cadence:'活动灵感',note:'找快闪、音乐现场、社群活动和新鲜体验。',url:xhsSearch('北京活动')},{name:'小红书 · 我在北京看古树',type:'话题搜索',cadence:'城市漫步',note:'跟着古树逛胡同、寺院和公园。',url:xhsSearch('我在北京看古树')},{name:'小红书 · 北京新店',type:'关键词搜索',cadence:'探店灵感',note:'咖啡、面包、餐厅与小店，先看近期到访体验。',url:xhsSearch('北京 新店 探店')},...guideSources]:['周末活动','美食咖啡','酒吧夜游','当季实拍'].map(topic=>({name:'小红书 · '+activePack.name+topic,type:'社区搜索',cadence:'攻略',note:activePack.name+'的'+topic+'与到访体验',url:xhsSearch(activePack.name+' '+topic)}));
  const visible = useMemo(
    () =>
      cityPlaces.filter(
        (place) =>
          (filter === '全部' || place.category === filter) &&
          `${place.name}${place.area}${place.tags.join('')}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [filter, query, cityPlaces],
  );
  const visibleActivities = (activeCity==='beijing'?activities:[]).filter(
    (activity) =>
      activityFilter === '全部' || activity.category === activityFilter,
  );
  const evergreenPlaces=cityPlaces.filter(place=>(evergreenCategories[activityFilter]||[]).includes(place.category)).slice(0,6);

  return (
    <main data-city={activeCity}>
      <AutumnAtmosphere enabled={season==='autumn'} cityKey={activeCity}/>
      <nav className="topbar">
        <a className="brand" href="#top">
          <span>CP</span> CityPlay <b>/ {activePack.en}</b>
        </a>
        <div className="nav-links" aria-label="主导航">{[['home','首页'],['guide','玩法攻略'],['map','地图'],['discover','发现']].map(([key,label])=><a href={'#'+key} key={key} aria-current={view===key?'page':undefined}>{label}</a>)}</div>
      <div className="city-tabs" aria-label="切换城市">{([['beijing','北京'],['shanghai','上海'],['guangzhou','广州'],['shenzhen','深圳'],['hangzhou','杭州']] as [CityKey,string][]).map(([key,name])=><a key={key} href={`/${key}${view==='home'?'':'#'+view}`} className={activeCity===key?'active':''} aria-current={activeCity===key?'location':undefined}>{name}</a>)}</div>
        <label className="mobile-city-switch"><span className="sr-only">切换城市</span><select value={activeCity} onChange={event=>{window.location.assign(`/${event.target.value}${view==='home'?'':'#'+view}`)}}>{([['beijing','北京'],['shanghai','上海'],['guangzhou','广州'],['shenzhen','深圳'],['hangzhou','杭州']] as [CityKey,string][]).map(([key,name])=><option key={key} value={key}>{name}</option>)}</select></label>
      </nav>
      <section className={`hero season-${season} ${view!=='home'?'hero-compact':''}`} id="top">
        <div className="hero-art" aria-hidden="true" />
        <div className="hero-copy">
          <div className="coordinate">
            <span /> {activePack.en.toUpperCase()} · CITYPLAY GUIDE
          </div>
          <h1>
            CityPlay
            <br />
            <em>{activePack.name}城市游玩指南</em>
          </h1>
          <p>{activePack.tagline}</p>
          <div className="solar-term">
            <span>{solarTerm}</span>
            <i />
            <p>{activeCity==='beijing'?seasonalLine:activePack.tagline}</p>
          </div>
          <div className="hero-actions">
            <a className="primary" href="#explore">
              开始探索 <ChevronRight size={18} />
            </a>
            <a className="secondary" href="#map">
              <Map size={18} /> 看地图
            </a>
          </div>
        </div>
        <div className="guide-stamp" aria-hidden="true">
          <span>{activePack.name}</span>
          <strong>城市游玩<br />公开指南</strong>
          <small>CITY FIELD GUIDE</small>
        </div>
      </section>
      {view==='home'&&<section className="season-strip">
        <span>此刻{activePack.name}</span>
        <strong>{activeCity==='beijing'?'初秋 · 适合骑行、逛书店、等一场银杏':activePack.tagline}</strong>
        <Leaf size={20} />
      </section>}
      {view==='guide'&&<LifestyleGuide key={activeCity} cityKey={activeCity} city={activePack.name} places={cityPlaces} onChoosePlace={(id)=>{setFilter('全部');setQuery('');setShowAllPlaces(true);requestAnimationFrame(()=>document.getElementById('place-'+id)?.scrollIntoView({behavior:'smooth',block:'start'}))}}/>}
      {(view==='home'||view==='discover')&&<section className="section" id="now">
        <div className="section-heading">
          <div>
            <p className="eyebrow">NOW IN {activePack.en.toUpperCase()}</p>
            <h2>最近，去这些地方刚刚好。</h2>
          </div>
        </div>
        <div className="event-grid">
          {activeCity!=='beijing'&&diverseDiscoveries(cityLiveEvents,3).map((event,index)=><a className={`event-card city-feature event-${index+1}`} href={event.url} target="_blank" rel="noreferrer" key={event.id}><img src={`/images/${activeCity}-hero.png`} alt={`${activePack.name}城市插画`} loading="lazy"/><div className="event-badge">{event.category} · 豆瓣同城</div><div className="event-copy"><p>{event.start?.slice(5,10)} — {event.end?.slice(5,10)}</p><h3>{event.title}</h3><span>{event.location}</span></div></a>)}
          {activeCity!=='beijing'&&cityLiveEvents.length===0&&cityEditorial[activeCity].featured.map((id,index)=>{const p=cityPlaces.find(p=>p.id===id)!;return <a className={`event-card city-feature event-${index+1}`} href={p.mapUrl} target="_blank" rel="noreferrer" key={id}><img src={`/images/${activeCity}-hero.png`} alt={`${activePack.name}城市插画`} loading="lazy"/><div className="event-badge">{p.category} · {p.duration}</div><div className="event-copy"><p>{p.area}</p><h3>{p.name}</h3><span>{p.note}</span></div></a>})}
          {(activeCity==='beijing'?events:[]).slice(0,3).map((event, index) => (
            <article className={`event-card event-${index + 1}`} key={event.id}>
              <div className="event-badge">
                <Sparkles size={14} /> {event.type}
              </div>
              <div className="event-date">
                <span>{event.month}</span>
                <strong>{event.day}</strong>
              </div>
              <div className="event-copy">
                <p>
                  {event.area} · {event.place}
                </p>
                <h3>{event.name}</h3>
                <span>{eventState(event.start, event.end)}</span>
              </div>
            </article>
          ))}
        </div>
        {view==='discover'&&<div className="daily-radar" id="daily">
          <div className="daily-head">
            <div>
              <p className="eyebrow">FRESH IDEAS</p>
              <h2>{activePack.name}，最近有什么好玩的</h2>
            </div>
            <div className="verified-badge">
              <span /> {cityLiveEvents[0]?.lastSeenAt?'最近读取 '+cityLiveEvents[0].lastSeenAt:'城市活动'}
            </div>
          </div>
          <div className="filters activity-filters" aria-label="活动分类">
            {['全部',...activityCategories].map((item) => (
              <button
                key={item}
                className={activityFilter === item ? 'active' : ''}
                onClick={() => setActivityFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          {(
            <div className="discovery-strip">
              <div className="discovery-label">
                <span>近期新发现</span>
                <small>{activityFilter==='全部'?'各类轮流推荐':'当前分类：'+activityFilter} · 点击原文确认日期</small>
              </div>
              <div className="discovery-links">
                {visibleDiscoveries.length===0 && <a href={xhsSearch(activePack.name+' '+(activityFilter==='全部'?'本周活动':activityFilter))} target="_blank" rel="noreferrer"><b>攻略</b><span>小红书搜{activePack.name}{activityFilter==='全部'?'本周活动':activityFilter}</span><ExternalLink size={13}/></a>}
                {visibleDiscoveries.map((item) => (
                  <a key={item.id} href={item.url} target="_blank" rel="noreferrer">
                    <b>{item.category}</b>
                    <span>{item.title}<small className="discovery-meta">{item.start&&item.end?`${item.start.slice(5,10)} — ${item.end.slice(5,10)} · `:''}{item.location?item.location+' · ':''}{item.source}</small></span>
                    <ExternalLink size={13} />
                  </a>
                ))}
              </div>
            </div>
          )}
          {evergreenPlaces.length>0 && <section className="evergreen-guide" aria-label="推荐去处"><div className="life-results-heading"><h3>{activityFilter==='美食'?'平时去哪吃':activityFilter==='夜生活'?'今晚去哪坐坐':'值得去的地方'}</h3><span>{evergreenPlaces.length} 个推荐去处</span></div><div className="life-picks">{evergreenPlaces.map(place=><a className="life-pick" key={place.id} href={place.mapUrl} target="_blank" rel="noreferrer"><span><small>{place.area} · {place.category}</small><b>{place.name}</b><em>{place.note}</em></span><ExternalLink size={16}/></a>)}</div><a href="#life">查看需求攻略与推荐路线 ↗</a></section>}
          <div className="activity-list">
            {visibleActivities.slice(0,showAllActivities?undefined:4).map((activity) => (
              <article className="activity-row" key={activity.id}>
                <div className="activity-category">{activity.category}</div>
                <div className="activity-main">
                  <div className="activity-title-line">
                    <h3>{activity.name}</h3>
                    <span className={daysUntil(activity.end) < 0 ? 'ended' : ''}>
                      {eventState(activity.start, activity.end)}
                    </span>
                  </div>
                  <p>{activity.summary}</p>
                  <div className="activity-meta">
                    <span>{activity.start} — {activity.end}</span>
                    <span>{activity.area} · {activity.place}</span>
                    <span>{activity.price}</span>
                  </div>
                </div>
                <a
                  className="source-link"
                  href={activity.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {activity.sourceName}
                  <small>核验 {activity.verifiedAt}</small>
                  <ExternalLink size={15} />
                </a>
              </article>
            ))}
          </div>
          {visibleActivities.length>4 && <button className="secondary routes-more" onClick={()=>setShowAllActivities(!showAllActivities)}>{showAllActivities?'收起':'更多活动'}</button>}
        </div>}
        {view==='home'&&<div className="home-portals"><a href="#guide"><b>选一种玩法 ↗</b><span>路线、地点与当季攻略</span></a><a href="#map"><b>从附近开始 ↗</b><span>定位、分区与导航</span></a><a href="#discover"><b>发现城市新鲜事 ↗</b><span>周末活动与社区灵感</span></a></div>}
      </section>}
      {view==='guide'&&<><SeasonalCollections collections={[...seasonalCollections,...extraSeasonalTopics(activeCity)]} places={cityPlaces} season={season} city={activePack.name}/>
      <section className="section explore" id="explore">
        <div className="section-heading">
          <div>
            <p className="eyebrow">EXPLORE {activePack.en.toUpperCase()}</p>
            <h2>下一站，想去{activePack.name}哪里？</h2>
          </div>
        </div>
        <div className="tool-row">
          <label className="search">
            <Search size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索地点、区域或标签"
            />
          </label>
        </div>
        <div className="filters" role="tablist" aria-label="地点分类">
          {filters.map((item) => {
            const Icon = icons[item as keyof typeof icons];
            return (
              <button
                key={item}
                className={filter === item ? 'active' : ''}
                onClick={() => setFilter(item)}
              >
                {Icon && <Icon size={15} />}
                {item}
              </button>
            );
          })}
        </div>
        <div className="place-grid">
          {visible.slice(0,showAllPlaces?undefined:8).map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
        {visible.length>8 && <button className="secondary routes-more" onClick={()=>setShowAllPlaces(!showAllPlaces)}>{showAllPlaces?'收起地点':'浏览全部 '+visible.length+' 个地点'}</button>}
        {visible.length === 0 && (
          <div className="empty-state">
            <MapPin size={30} />
            <h3>这里还没有坐标</h3>
            <p>换个筛选，看看编辑已经整理好的其他坐标。</p>
          </div>
        )}
      </section>
      </>}
      {view==='map'&&<BeijingMap key={activeCity} places={cityPlaces} city={activePack.name} center={activePack.center} />}
      {view==='discover'&&<section className="section sources-section" id="sources">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CITY SIGNALS</p>
            <h2>去看看大家怎么玩{activePack.name}</h2>
          </div>
          <p>看小红书实拍，找街区灵感，也查看场馆最新活动。</p>
        </div>
        <div className="source-grid">
          {[...(activeCity==='beijing'?[]:[{name:'豆瓣同城 · '+activePack.name,type:'活动平台',cadence:'近期排期',note:'演出、展览、放映、运动与同城聚会',url:`https://www.douban.com/location/${activeCity}/events/week-all`}]),...citySources].filter((source,index,all)=>all.findIndex(s=>s.name===source.name)===index).slice(0,showAllSources?undefined:4).map((source) => (
            <a key={source.name} href={source.url} target="_blank" rel="noreferrer" className="source-card">
              <div><span>{source.type}</span><b>{source.cadence}</b></div>
              <h3>{source.name}</h3>
              <p>{source.note}</p>
              <ExternalLink size={16} />
            </a>
          ))}
        </div>
        {citySources.length>4 && <button className="secondary routes-more" onClick={()=>setShowAllSources(!showAllSources)}>{showAllSources?'收起':'更多来源'}</button>}
      </section>
      }<footer>
        <a className="brand" href="#top">
          <span>CP</span> CityPlay
        </a>
        <p>{activePack.en.toUpperCase()} · CITY FIELD GUIDE</p>
        <a href="https://github.com/yayajjiang/cityplay" target="_blank" rel="noreferrer">
          Fork it · Make it yours ↗
        </a>
      </footer>
    </main>
  );
}

export default function Home(){return <CityGuide/>}
