export type PlaceStatus = 'none' | 'want' | 'visited';
export type Place = {
  id: string;
  name: string;
  category: string;
  area: string;
  note: string;
  duration: string;
  seasons: string[];
  tags: string[];
  mapUrl: string;
  x: number;
  y: number;
  lng?: number;
  lat?: number;
  visit?: { status:string; method:string; credential:string; officialUrl:string; verifiedAt:string; route?:string };
};
export type EventItem = {
  id: string;
  name: string;
  type: string;
  place: string;
  area: string;
  start: string;
  end: string;
  month: string;
  day: string;
};
import { districtPlaces } from './beijing-districts';
import { universityPlaces } from './beijing-universities';
export type ActivityCategory =
  | '图书'
  | '影视'
  | '新店'
  | '展览'
  | '演出'
  | '市集'
  | '户外'
  | '其他';
export type ActivityItem = {
  id: string;
  name: string;
  category: ActivityCategory;
  area: string;
  place: string;
  start: string;
  end: string;
  summary: string;
  price: string;
  sourceName: string;
  sourceUrl: string;
  verifiedAt: string;
};
export type GuideCollection = { id:string; title:string; kicker:string; description:string; season:string; placeIds:string[]; sourceUrl:string };
const amap = (name: string) =>
  `https://uri.amap.com/search?keyword=${encodeURIComponent(name)}&city=北京`;
const featuredPlaces: Place[] = [
  {
    id: 'san-shan',
    name: '三山五园绿道',
    category: '骑行',
    area: '海淀',
    note: '把皇家园林、城市公园与西山串成一条秋日路线。',
    duration: '3–5h',
    seasons: ['春', '秋'],
    tags: ['36km', '绿道', '秋景'],
    mapUrl: amap('三山五园绿道'),
    x: 20,
    y: 32,
  },
  {
    id: 'pku',
    name: '北京大学',
    category: '高校',
    area: '海淀',
    note: '未名湖、博雅塔与静园草坪，官方有 2 小时和半日路线。',
    duration: '2–3h',
    seasons: ['春', '秋'],
    tags: ['校园', '建筑', '需预约'],
    mapUrl: amap('北京大学'),
    x: 27,
    y: 40,
    visit: { status:'需预约', method:'“参观北大”微信小程序；通常周末、节假日和寒暑假开放', credential:'大陆居民身份证实名预约，持原件从东门入校', officialUrl:'https://visitor.pku.edu.cn/', verifiedAt:'2026-09-22', route:'东门 → 博雅塔 → 未名湖 → 静园 → 西门' },
  },
  {
    id: 'tsinghua',
    name: '清华大学',
    category: '高校',
    area: '海淀',
    note: '水木清华与近春园，适合留出半天慢慢走。',
    duration: '3h',
    seasons: ['春', '夏', '秋'],
    tags: ['校园', '荷塘', '需预约'],
    mapUrl: amap('清华大学'),
    x: 31,
    y: 34,
    visit: { status:'需预约', method:'“清华大学”微信公众号→参观清华；周一校园不开放', credential:'实名预约，持本人有效证件入校，不收费', officialUrl:'https://campusvisit.tsinghua.edu.cn/', verifiedAt:'2026-09-22', route:'西门 → 二校门 → 大礼堂 → 水木清华 → 近春园' },
  },
  {
    id: 'ditan',
    name: '地坛公园',
    category: '公园',
    area: '东城',
    note: '古柏、坛墙和书市，让这里一年四季都有理由重访。',
    duration: '2h',
    seasons: ['四季'],
    tags: ['古建', '散步', '书市'],
    mapUrl: amap('地坛公园'),
    x: 53,
    y: 38,
  },
  {
    id: 'wansheng',
    name: '万圣书园',
    category: '书店',
    area: '海淀',
    note: '北京独立书店的长青坐标，适合认真逛书。',
    duration: '1–2h',
    seasons: ['四季'],
    tags: ['独立书店', '人文', '安静'],
    mapUrl: amap('万圣书园'),
    x: 37,
    y: 45,
  },
  {
    id: 'mofan',
    name: '模范书局诗空间',
    category: '书店',
    area: '西城',
    note: '在旧教堂里阅读，让建筑和书一起成为目的地。',
    duration: '1h',
    seasons: ['四季'],
    tags: ['建筑', '诗歌', '摄影'],
    mapUrl: amap('模范书局诗空间'),
    x: 44,
    y: 48,
  },
  {
    id: 'capital-museum',
    name: '首都博物馆',
    category: '博物馆',
    area: '西城',
    note: '从北京通史到燕地青铜器，雨天也能完整玩半天。',
    duration: '3h',
    seasons: ['四季'],
    tags: ['历史', '室内', '预约'],
    mapUrl: amap('首都博物馆'),
    x: 42,
    y: 58,
  },
  {
    id: 'national-museum',
    name: '中国国家博物馆',
    category: '博物馆',
    area: '东城',
    note: '馆藏体量很大，建议每次只选一个主题。',
    duration: '3–5h',
    seasons: ['四季'],
    tags: ['历史', '室内', '预约'],
    mapUrl: amap('中国国家博物馆'),
    x: 52,
    y: 55,
  },
  {
    id: 'aosen',
    name: '奥林匹克森林公园',
    category: '公园',
    area: '朝阳',
    note: '跑步、骑行和看秋色都很舒服的城市大公园。',
    duration: '2–4h',
    seasons: ['春', '夏', '秋'],
    tags: ['跑步', '骑行', '免费'],
    mapUrl: amap('奥林匹克森林公园'),
    x: 55,
    y: 27,
  },
  {
    id: 'diaoyutai',
    name: '钓鱼台银杏大道',
    category: '赏秋',
    area: '海淀',
    note: '深秋限定的金色长廊，清晨去更从容。',
    duration: '1h',
    seasons: ['秋'],
    tags: ['银杏', '摄影', '限定'],
    mapUrl: amap('钓鱼台银杏大道'),
    x: 38,
    y: 55,
  },
  {
    id: 'summer-palace-snow',
    name: '雪后颐和园',
    category: '雪景',
    area: '海淀',
    note: '昆明湖、十七孔桥和万寿山一起变成水墨画。',
    duration: '3h',
    seasons: ['冬'],
    tags: ['雪景', '古建', '摄影'],
    mapUrl: amap('颐和园'),
    x: 18,
    y: 41,
  },
  {
    id: 'baita-walk',
    name: '白塔寺到西四',
    category: 'CityWalk',
    area: '西城',
    note: '白塔、胡同、小店和旧城生活，适合无目的散步。',
    duration: '2–3h',
    seasons: ['春', '秋'],
    tags: ['胡同', '建筑', '咖啡'],
    mapUrl: amap('白塔寺'),
    x: 46,
    y: 49,
  },
];
export const places: Place[] = [...featuredPlaces, ...districtPlaces, ...universityPlaces];
export const events: EventItem[] = [
  {
    id: 'book-fair',
    name: '我与地坛北京书市',
    type: '城市活动',
    place: '地坛公园',
    area: '东城',
    start: '2026-09-17',
    end: '2026-09-27',
    month: 'SEP',
    day: '17—27',
  },
  {
    id: 'universal',
    name: '环球秋季惊彩活动',
    type: '季节限定',
    place: '北京环球度假区',
    area: '通州',
    start: '2026-09-04',
    end: '2026-11-01',
    month: 'SEP',
    day: '04',
  },
  {
    id: 'autumn',
    name: '北京秋日收藏计划',
    type: '季节清单',
    place: '全城',
    area: '北京',
    start: '2026-09-20',
    end: '2026-11-30',
    month: 'OCT',
    day: '01',
  },
];

// Curated public events. Time-sensitive details link back to the source so a
// visitor can confirm booking, weather, and schedule changes before leaving.
export const activities: ActivityItem[] = [
  {
    id: '2026-ancient-trees', name: '我在北京看古树', category: '户外', area: '全城', place: '公园 / 古寺 / 历史街区',
    start: '2026-09-20', end: '2026-11-30', summary: '沿公园、古寺与传统村落寻找北京古树，把树龄、建筑和城市故事串成秋日路线。', price: '多数公共点位免费',
    sourceName: '北京旅游网', sourceUrl: 'https://www.visitbeijing.com.cn/article/4TEWjtcxQVT', verifiedAt: '2026-09-22',
  },
  {
    id: '2026-ditan-book-fair', name: '“我与地坛”北京书市', category: '图书', area: '东城', place: '地坛公园 / 北京图书大厦 / 王府井书店',
    start: '2026-09-17', end: '2026-09-27', summary: '60万余种图书、九大主题展区与150余场文化活动，并发放图书惠民券。', price: '入园及活动以官方现场信息为准',
    sourceName: '北京市政府', sourceUrl: 'https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202609/t20260917_4867465.html', verifiedAt: '2026-09-20',
  },
  {
    id: '2026-miyun-autumn-market', name: '碧水秋集 · 水库文化嘉年华', category: '市集', area: '密云', place: '密云水库展览馆后广场',
    start: '2026-09-12', end: '2026-09-27', summary: '周末文创、非遗手作、围炉煮茶与水库故事分享，晚间有露天公益电影。', price: '市集免费，消费自理',
    sourceName: '北京市政府', sourceUrl: 'https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202609/t20260911_4860098.html', verifiedAt: '2026-09-20',
  },
  {
    id: '2026-miyun-open-air-film', name: '水库秋日露天公益电影', category: '影视', area: '密云', place: '密云水库展览馆后广场',
    start: '2026-09-12', end: '2026-09-27', summary: '秋季市集活动日晚间放映，受天气影响可能调整，出发前查看官方通知。', price: '公益放映',
    sourceName: '北京市政府', sourceUrl: 'https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202609/t20260911_4860098.html', verifiedAt: '2026-09-20',
  },
  {
    id: '2026-songzhuang-long-street', name: '宋庄首开 LONG 街开业', category: '新店', area: '通州', place: '宋庄艺术创意小镇',
    start: '2026-09-25', end: '2026-10-08', summary: '近百家品牌集中亮相，包含28家北京首店与17家通州首店。', price: '开放街区',
    sourceName: '北京市政府', sourceUrl: 'https://www.beijing.gov.cn/ywdt/gqrd/202609/t20260916_4866524.html', verifiedAt: '2026-09-20',
  },
  {
    id: '2026-canal-art-week', name: '北京国际运河艺术周', category: '演出', area: '通州', place: '运河文化广场',
    start: '2026-09-24', end: '2026-09-27', summary: '14个国家的新锐艺术团队带来22场演出，并设运河中秋主题市集。', price: '部分活动需预约或购票',
    sourceName: '北京旅游网', sourceUrl: 'https://www.visitbeijing.com.cn/article/4TEWjtcxQVT', verifiedAt: '2026-09-20',
  },
  {
    id: '2026-opera-culture-week', name: '第十届中国戏曲文化周', category: '演出', area: '丰台', place: '北京园博园',
    start: '2026-09-29', end: '2026-10-05', summary: '名家名段、精品大戏、戏曲快闪、国风市集与园林夜游。', price: '以官方发布为准',
    sourceName: '丰台区政府', sourceUrl: 'https://www.bjft.gov.cn/xwdt/jcdt/bmdt/202608/t20260828_223734.shtml', verifiedAt: '2026-09-20',
  },
  {
    id: '2026-social-science-week', name: '北京社会科学普及周', category: '展览', area: '东城', place: '地坛公园',
    start: '2026-09-20', end: '2026-09-24', summary: '专家讲座、主题展览、非遗体验与 AI 社科互动等八个体验区。', price: '公益活动',
    sourceName: '北京市政府', sourceUrl: 'https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202608/t20260829_4842366.html', verifiedAt: '2026-09-20',
  },
  {
    id: '2026-maya-andes', name: '玛雅与安第斯古代文明大展', category: '展览', area: '西城', place: '首都博物馆',
    start: '2026-09-01', end: '2026-09-30', summary: '汇集墨西哥、秘鲁20余家机构约800件展品，是首博大规模临时展览。', price: '预约与票务以场馆为准',
    sourceName: '北京旅游网', sourceUrl: 'https://www.visitbeijing.com.cn/article/4T16p2kFfPn', verifiedAt: '2026-09-20',
  },
  {
    id: '2026-tangu-jazz', name: '檀谷爵士艺术生活季', category: '演出', area: '门头沟', place: '檀谷 DEFACTTO 开场',
    start: '2026-09-05', end: '2026-10-07', summary: '每个周末及假期每天四场以上爵士、布鲁斯、民谣与摇滚演出。', price: '需购票',
    sourceName: '北京旅游网', sourceUrl: 'https://www.visitbeijing.com.cn/article/4T4o8XbEBWu', verifiedAt: '2026-09-20',
  },
  {
    id: '2026-young-farmers-market', name: '北京优农 · 丰收节金秋消费季', category: '市集', area: '朝阳', place: '朝阳公园',
    start: '2026-09-19', end: '2026-09-27', summary: '北京农产品市集与丰收节主题活动；9月26日场次调整至9月27日。', price: '免费逛市集',
    sourceName: '北京市农业农村局', sourceUrl: 'https://nyncj.beijing.gov.cn/nyj/zwgk/ztgk/bjyntsncpsj/744126124/index.html', verifiedAt: '2026-09-20',
  },
  {
    id: '2026-chaoyang-light-season', name: '北京朝阳国际灯光消费季', category: '其他', area: '朝阳', place: '亮马河 / 朝阳公园等',
    start: '2026-09-11', end: '2026-10-11', summary: '全新光影场景与百余场文旅活动轮番出现，9月24日开启限定光影场景。', price: '公共空间为主',
    sourceName: '北京旅游网', sourceUrl: 'https://www.visitbeijing.com.cn/article/4TD7D14Oo8p', verifiedAt: '2026-09-20',
  },
  {
    id: '2026-autumn-city-routes', name: '北京秋日绿道与城市漫步', category: '户外', area: '全城', place: '北京旅游休闲绿道',
    start: '2026-09-20', end: '2026-11-15', summary: '围绕绿道、运河与古树主题整理的秋日户外路线入口，适合半日或一日游。', price: '大部分公共路线免费',
    sourceName: '北京旅游网', sourceUrl: 'https://www.visitbeijing.com.cn/article/4TEWjtcxQVT', verifiedAt: '2026-09-20',
  },
];

export const guideCollections: GuideCollection[] = [
  { id:'ancient-trees', title:'我在北京看古树', kicker:'秋日主题 01', description:'去古寺、公园与老城找银杏、侧柏和国槐，在树下读北京。', season:'9—11月', placeIds:['dajuetemple','hongluo-temple','tanzhe-temple','temple-heaven','ditan'], sourceUrl:'https://www.visitbeijing.com.cn/article/4TEWjtcxQVT' },
  { id:'golden-beijing', title:'北京银杏收藏计划', kicker:'秋日主题 02', description:'从钓鱼台到三里屯，从校园到古寺，收集一整季的金色。', season:'10—11月', placeIds:['diaoyutai','dajuetemple','pku','tsinghua','green-heart'], sourceUrl:'https://gygl.beijing.gov.cn/' },
  { id:'central-axis', title:'把中轴线从北走到南', kicker:'城市漫步 03', description:'钟鼓楼、故宫、前门与天坛，分段完成北京最长的城市叙事。', season:'四季', placeIds:['bell-drum','forbidden-city','longfusi','temple-heaven'], sourceUrl:'https://www.visitbeijing.com.cn/' },
  { id:'jingtong-canal', title:'沿京通去看运河', kicker:'东线计划 04', description:'从庆丰公园顺通惠河向东，经高碑店、八里桥直到大运河。', season:'春 / 秋', placeIds:['qingfeng-park','gaobeidian-village','baliqiao','xihaizi-randeng','canal-park'], sourceUrl:'https://s.visitbeijing.com.cn/attraction/118113' },
  { id:'snow-beijing', title:'雪后北京限定地图', kicker:'冬日主题 05', description:'雪落宫墙、长城和皇家园林后再出发，收集北京的水墨时刻。', season:'12—2月', placeIds:['summer-palace-snow','forbidden-city','beihai','mutianyu','longqing-gorge'], sourceUrl:'https://www.visitbeijing.com.cn/' },
  { id:'subway-day', title:'坐地铁玩一天', kicker:'低门槛路线 06', description:'优先选择轨道交通可达的展览、公园与街区，少换乘、慢慢逛。', season:'四季', placeIds:['national-library','beijing-planetarium','798','longfusi','grand-canal-museum'], sourceUrl:'https://map.bjsubway.com/' },
  { id:'autumn-hiking', title:'秋天去爬山', kicker:'山野路线 07', description:'从百望山的入门轻徒步，到香山、凤凰岭和雁栖湖西山步道。', season:'9–11月', placeIds:['baiwangshan','xiangshan','xishan-forest','fenghuangling','yanqi-west-trail'], sourceUrl:'https://www.visitbeijing.com.cn/' },
  { id:'winter-sports', title:'冬天去冰雪上', kicker:'冬日主题 08', description:'滑雪、滑冰、冰灯与雪后园林，开放日期每年按天气更新。', season:'12–2月', placeIds:['nanshan-ski','shichahai-ice','kunming-lake-ice','longqing-gorge','olympic-park-yanqing'], sourceUrl:'https://www.visitbeijing.com.cn/' },
  { id:'spring-flowers', title:'春天追着花期走', kicker:'春日主题 09', description:'山桃、樱花与京郊桃花次第开放，当周花期比固定日历更可靠。', season:'3–4月', placeIds:['yuyuantan-sakura','pinggu-peach-sea','summer-palace','yuanmingyuan','fenghuangling'], sourceUrl:'https://gygl.beijing.gov.cn/' },
  { id:'summer-night', title:'夏夜沿河慢慢走', kicker:'夏日主题 10', description:'把炎热的白天留给展览，傍晚再去亮马河、运河和湖边。', season:'6–8月', placeIds:['liangma-summer-night','liangma-river','canal-park','yanqi-lake','jinhai-lake'], sourceUrl:'https://www.visitbeijing.com.cn/' },
];
