'use client';

import { useMemo, useState } from 'react';
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
  X,
} from 'lucide-react';
import { cityConfig } from '@/city.config';
import dailyDiscoveries from '@/data/daily-discoveries.json';
import {
  activities,
  events,
  places,
  type ActivityCategory,
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
const activityFilters = [
  '全部',
  '图书',
  '影视',
  '新店',
  '展览',
  '演出',
  '市集',
  '户外',
  '其他',
] as const;
const guideSources = [
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
    <article className="place-card">
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

export default function Home() {
  const [, solarTerm, season, seasonalLine] = getSolarTerm();
  const [filter, setFilter] = useState('全部');
  const [query, setQuery] = useState('');
  const [activityFilter, setActivityFilter] = useState<
    '全部' | ActivityCategory
  >('全部');
  const [showMap, setShowMap] = useState(false);
  const visible = useMemo(
    () =>
      places.filter(
        (place) =>
          (filter === '全部' || place.category === filter) &&
          `${place.name}${place.area}${place.tags.join('')}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [filter, query],
  );
  const visibleActivities = activities.filter(
    (activity) =>
      activityFilter === '全部' || activity.category === activityFilter,
  );

  return (
    <main>
      <nav className="topbar">
        <a className="brand" href="#top">
          <span>CP</span> CityPlay
        </a>
        <div className="nav-links">
          <a href="#now">最近</a>
          <a href="#explore">探索</a>
          <a href="#sources">情报源</a>
          <button onClick={() => setShowMap(true)}>地图</button>
        </div>
        <a className="primary small" href="#daily">
          <CalendarDays size={16} /> 今日活动
        </a>
      </nav>
      <section className={`hero season-${season}`} id="top">
        <div className="hero-art" aria-hidden="true" />
        <div className="hero-copy">
          <div className="coordinate">
            <span /> BEIJING · 39.9042° N, 116.4074° E
          </div>
          <h1>
            CityPlay
            <br />
            <em>北京城市游玩指南</em>
          </h1>
          <p>每天更新北京值得去的活动、展览、新店与季节玩法。</p>
          <div className="solar-term">
            <span>{solarTerm}</span>
            <i />
            <p>{seasonalLine}</p>
          </div>
          <div className="hero-actions">
            <a className="primary" href="#explore">
              开始探索 <ChevronRight size={18} />
            </a>
            <button className="secondary" onClick={() => setShowMap(true)}>
              <Map size={18} /> 看地图
            </button>
          </div>
        </div>
        <div className="guide-stamp" aria-hidden="true">
          <span>北京</span>
          <strong>城市游玩<br />公开指南</strong>
          <small>DAILY UPDATED</small>
        </div>
      </section>
      <section className="season-strip">
        <span>此刻北京</span>
        <strong>初秋 · 适合骑行、逛书店、等一场银杏</strong>
        <Leaf size={20} />
      </section>
      <section className="section" id="now">
        <div className="section-heading">
          <div>
            <p className="eyebrow">NOW IN BEIJING</p>
            <h2>最近，去这些地方刚刚好。</h2>
          </div>
          <p>活动数据和长期地点分开保存，过期后自动标记。</p>
        </div>
        <div className="event-grid">
          {events.map((event, index) => (
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
        <div className="daily-radar" id="daily">
          <div className="daily-head">
            <div>
              <p className="eyebrow">DAILY CITY RADAR</p>
              <h2>今天北京有什么</h2>
            </div>
            <div className="verified-badge">
              <span /> 每日自动更新 · 本批核验于 2026.09.20
            </div>
          </div>
          <div className="filters activity-filters" aria-label="活动分类">
            {activityFilters.map((item) => (
              <button
                key={item}
                className={activityFilter === item ? 'active' : ''}
                onClick={() => setActivityFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          {dailyDiscoveries.length > 0 && (
            <div className="discovery-strip">
              <div className="discovery-label">
                <span>今日新发现</span>
                <small>自动收集，点击原文确认详情</small>
              </div>
              <div className="discovery-links">
                {dailyDiscoveries.slice(0, 6).map((item) => (
                  <a key={item.id} href={item.url} target="_blank" rel="noreferrer">
                    <b>{item.category}</b>
                    <span>{item.title}</span>
                    <ExternalLink size={13} />
                  </a>
                ))}
              </div>
            </div>
          )}
          <div className="activity-list">
            {visibleActivities.map((activity) => (
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
        </div>
      </section>
      <section className="section explore" id="explore">
        <div className="section-heading">
          <div>
            <p className="eyebrow">EXPLORE YOUR CITY</p>
            <h2>下一站，想去哪？</h2>
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
          {visible.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
        {visible.length === 0 && (
          <div className="empty-state">
            <MapPin size={30} />
            <h3>这里还没有坐标</h3>
            <p>换个筛选，看看编辑已经整理好的其他坐标。</p>
          </div>
        )}
      </section>
      <section className="section sources-section" id="sources">
        <div className="section-heading">
          <div>
            <p className="eyebrow">BEIJING SIGNALS</p>
            <h2>我们从哪里发现北京</h2>
          </div>
          <p>公开网站由每日任务自动巡检；公众号作为编辑补充来源，重要信息仍回到官方页面核验。</p>
        </div>
        <div className="source-grid">
          {guideSources.map((source) => (
            <a key={source.name} href={source.url} target="_blank" rel="noreferrer" className="source-card">
              <div><span>{source.type}</span><b>{source.cadence}</b></div>
              <h3>{source.name}</h3>
              <p>{source.note}</p>
              <ExternalLink size={16} />
            </a>
          ))}
        </div>
      </section>
      <footer>
        <a className="brand" href="#top">
          <span>CP</span> CityPlay
        </a>
        <p>BEIJING · UPDATED EVERY DAY</p>
        <a href="https://github.com/yayajjiang/cityplay" target="_blank" rel="noreferrer">
          Fork it · Make it yours ↗
        </a>
      </footer>
      {showMap && (
        <div className="modal-backdrop" onMouseDown={() => setShowMap(false)}>
          <div className="map-modal" onMouseDown={(e) => e.stopPropagation()}>
            <button
              className="close map-close"
              onClick={() => setShowMap(false)}
            >
              <X />
            </button>
            <div className="map-copy">
              <p className="eyebrow">CITYPLAY BEIJING MAP</p>
              <h2>北京游玩地图</h2>
              <p>点一个坐标，查看地点并继续导航。</p>
              <div className="map-legend">
                <span>
                  <i className="dot template" /> 攻略地点
                </span>
              </div>
            </div>
            <div className="map-canvas">
              {places.map((place) => (
                <a
                  key={place.id}
                  className="map-pin"
                  style={{ left: `${place.x}%`, top: `${place.y}%` }}
                  title={place.name}
                  href={place.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin size={22} fill="currentColor" />
                  <span>{place.name}</span>
                </a>
              ))}
              <div className="map-label label-haidian">海淀</div>
              <div className="map-label label-dongcheng">东城</div>
              <div className="map-label label-chaoyang">朝阳</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
