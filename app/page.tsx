'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Bike,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CirclePlus,
  ExternalLink,
  Footprints,
  Landmark,
  Leaf,
  Map,
  MapPin,
  Search,
  Snowflake,
  Sparkles,
  Star,
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
  type PlaceStatus,
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
const storageKey = 'cityplay-beijing-v1';
type StoredData = {
  statuses: Record<string, PlaceStatus>;
  customPlaces: Place[];
};
const emptyStore: StoredData = { statuses: {}, customPlaces: [] };

function loadStore(): StoredData {
  if (typeof window === 'undefined') return emptyStore;
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || 'null');
    return parsed && typeof parsed === 'object'
      ? { ...emptyStore, ...parsed }
      : emptyStore;
  } catch {
    return emptyStore;
  }
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

function PlaceCard({
  place,
  status,
  onStatus,
}: {
  place: Place;
  status: PlaceStatus;
  onStatus: (value: PlaceStatus) => void;
}) {
  const Icon = icons[place.category as keyof typeof icons] || MapPin;
  return (
    <article className="place-card">
      <div className="place-card__top">
        <span className="place-icon">
          <Icon size={18} />
        </span>
        <button
          className={`status-button ${status}`}
          onClick={() =>
            onStatus(
              status === 'visited'
                ? 'none'
                : status === 'want'
                  ? 'visited'
                  : 'want',
            )
          }
          aria-label={`更新${place.name}状态`}
        >
          {status === 'visited' ? (
            <>
              <Check size={14} /> 去过
            </>
          ) : status === 'want' ? (
            <>
              <Star size={14} fill="currentColor" /> 想去
            </>
          ) : (
            <>
              <CirclePlus size={14} /> 加入
            </>
          )}
        </button>
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
  const [store, setStore] = useState<StoredData>(emptyStore);
  const [filter, setFilter] = useState('全部');
  const [query, setQuery] = useState('');
  const [onlyMine, setOnlyMine] = useState(false);
  const [activityFilter, setActivityFilter] = useState<
    '全部' | ActivityCategory
  >('全部');
  const [showMap, setShowMap] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => setStore(loadStore()), []);
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(store));
  }, [store]);
  const allPlaces = useMemo(
    () => [...places, ...store.customPlaces],
    [store.customPlaces],
  );
  const visible = useMemo(
    () =>
      allPlaces.filter(
        (place) =>
          (filter === '全部' || place.category === filter) &&
          `${place.name}${place.area}${place.tags.join('')}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (!onlyMine ||
            (store.statuses[place.id] && store.statuses[place.id] !== 'none')),
      ),
    [allPlaces, filter, query, onlyMine, store.statuses],
  );
  const visited = allPlaces.filter(
    (place) => store.statuses[place.id] === 'visited',
  ).length;
  const wanted = allPlaces.filter(
    (place) => store.statuses[place.id] === 'want',
  ).length;
  const progress = Math.round((visited / allPlaces.length) * 100);
  const updateStatus = (id: string, value: PlaceStatus) =>
    setStore((current) => ({
      ...current,
      statuses: { ...current.statuses, [id]: value },
    }));
  const exportData = () => {
    const blob = new Blob([JSON.stringify(store, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-beijing-cityplay.json';
    link.click();
    URL.revokeObjectURL(url);
  };
  const importData = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (!data || typeof data !== 'object') throw new Error();
        setStore({
          statuses: data.statuses || {},
          customPlaces: Array.isArray(data.customPlaces)
            ? data.customPlaces
            : [],
        });
      } catch {
        alert('这个文件不是有效的 CityPlay 数据。');
      }
    };
    reader.readAsText(file);
  };
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
          <button onClick={() => setShowMap(true)}>地图</button>
        </div>
        <a className="primary small" href="#daily">
          <CalendarDays size={16} /> 今日活动
        </a>
      </nav>
      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="coordinate">
            <span /> BEIJING · 39.9042° N, 116.4074° E
          </div>
          <h1>
            北京，
            <br />
            <em>还没玩完。</em>
          </h1>
          <p>{cityConfig.tagline}</p>
          <div className="hero-actions">
            <a className="primary" href="#explore">
              开始探索 <ChevronRight size={18} />
            </a>
            <button className="secondary" onClick={() => setShowMap(true)}>
              <Map size={18} /> 看地图
            </button>
          </div>
        </div>
        <div className="progress-card">
          <p>MY BEIJING</p>
          <div className="progress-number">
            {progress}
            <sup>%</sup>
          </div>
          <div className="progress-track">
            <i style={{ width: `${Math.max(3, progress)}%` }} />
          </div>
          <div className="progress-stats">
            <span>
              <strong>{wanted}</strong> 想去
            </span>
            <span>
              <strong>{visited}</strong> 去过
            </span>
            <span>
              <strong>{allPlaces.length}</strong> 坐标
            </span>
          </div>
          <p className="progress-hint">城市不是一次玩完的，是慢慢认识的。</p>
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
          <button
            className={`mine-toggle ${onlyMine ? 'active' : ''}`}
            onClick={() => setOnlyMine(!onlyMine)}
          >
            <Star size={16} /> 只看我的
          </button>
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
            <PlaceCard
              key={place.id}
              place={place}
              status={store.statuses[place.id] || 'none'}
              onStatus={(value) => updateStatus(place.id, value)}
            />
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
      <section className="data-panel">
        <div>
          <p className="eyebrow">YOUR DATA, YOUR CITY</p>
          <h2>没有账号，也不会丢掉你的清单。</h2>
          <p>所有私人状态只存在这台设备。换电脑时导出一个 JSON，再导入即可。</p>
        </div>
        <div className="data-actions">
          <button className="secondary light" onClick={exportData}>
            <ArrowDownToLine size={17} /> 导出我的清单
          </button>
          <button
            className="secondary light"
            onClick={() => fileRef.current?.click()}
          >
            <ArrowUpFromLine size={17} /> 导入
          </button>
          <input
            hidden
            ref={fileRef}
            type="file"
            accept="application/json"
            onChange={(e) => importData(e.target.files?.[0])}
          />
        </div>
      </section>
      <footer>
        <a className="brand" href="#top">
          <span>CP</span> CityPlay
        </a>
        <p>YOUR CITY IS A CHECKLIST.</p>
        <a href="https://github.com" target="_blank" rel="noreferrer">
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
              <p className="eyebrow">MY BEIJING MAP</p>
              <h2>你的北京坐标</h2>
              <p>点一个坐标，去高德地图继续导航。</p>
              <div className="map-legend">
                <span>
                  <i className="dot template" /> 模板地点
                </span>
                <span>
                  <i className="dot want" /> 想去
                </span>
                <span>
                  <i className="dot visited" /> 去过
                </span>
              </div>
            </div>
            <div className="map-canvas">
              {allPlaces.map((place) => (
                <a
                  key={place.id}
                  className={`map-pin ${store.statuses[place.id] || 'none'}`}
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
