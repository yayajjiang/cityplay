export type PlaceStatus = 'none' | 'want' | 'visited';
export type Place = { id:string; name:string; category:string; area:string; note:string; duration:string; seasons:string[]; tags:string[]; mapUrl:string; x:number; y:number };
export type EventItem = { id:string; name:string; type:string; place:string; area:string; start:string; end:string; month:string; day:string };
const amap = (name:string) => `https://uri.amap.com/search?keyword=${encodeURIComponent(name)}&city=北京`;
export const places: Place[] = [
  {id:'san-shan',name:'三山五园绿道',category:'骑行',area:'海淀',note:'把皇家园林、城市公园与西山串成一条秋日路线。',duration:'3–5h',seasons:['春','秋'],tags:['36km','绿道','秋景'],mapUrl:amap('三山五园绿道'),x:20,y:32},
  {id:'pku',name:'北京大学',category:'高校',area:'海淀',note:'未名湖、博雅塔与校园建筑，预约信息出发前再核验。',duration:'2–3h',seasons:['春','秋'],tags:['校园','建筑','需预约'],mapUrl:amap('北京大学'),x:27,y:40},
  {id:'tsinghua',name:'清华大学',category:'高校',area:'海淀',note:'水木清华与近春园，适合留出半天慢慢走。',duration:'3h',seasons:['春','夏','秋'],tags:['校园','荷塘','需预约'],mapUrl:amap('清华大学'),x:31,y:34},
  {id:'ditan',name:'地坛公园',category:'公园',area:'东城',note:'古柏、坛墙和书市，让这里一年四季都有理由重访。',duration:'2h',seasons:['四季'],tags:['古建','散步','书市'],mapUrl:amap('地坛公园'),x:53,y:38},
  {id:'wansheng',name:'万圣书园',category:'书店',area:'海淀',note:'北京独立书店的长青坐标，适合认真逛书。',duration:'1–2h',seasons:['四季'],tags:['独立书店','人文','安静'],mapUrl:amap('万圣书园'),x:37,y:45},
  {id:'mofan',name:'模范书局诗空间',category:'书店',area:'西城',note:'在旧教堂里阅读，让建筑和书一起成为目的地。',duration:'1h',seasons:['四季'],tags:['建筑','诗歌','摄影'],mapUrl:amap('模范书局诗空间'),x:44,y:48},
  {id:'capital-museum',name:'首都博物馆',category:'博物馆',area:'西城',note:'从北京通史到燕地青铜器，雨天也能完整玩半天。',duration:'3h',seasons:['四季'],tags:['历史','室内','预约'],mapUrl:amap('首都博物馆'),x:42,y:58},
  {id:'national-museum',name:'中国国家博物馆',category:'博物馆',area:'东城',note:'馆藏体量很大，建议每次只选一个主题。',duration:'3–5h',seasons:['四季'],tags:['历史','室内','预约'],mapUrl:amap('中国国家博物馆'),x:52,y:55},
  {id:'aosen',name:'奥林匹克森林公园',category:'公园',area:'朝阳',note:'跑步、骑行和看秋色都很舒服的城市大公园。',duration:'2–4h',seasons:['春','夏','秋'],tags:['跑步','骑行','免费'],mapUrl:amap('奥林匹克森林公园'),x:55,y:27},
  {id:'diaoyutai',name:'钓鱼台银杏大道',category:'赏秋',area:'海淀',note:'深秋限定的金色长廊，清晨去更从容。',duration:'1h',seasons:['秋'],tags:['银杏','摄影','限定'],mapUrl:amap('钓鱼台银杏大道'),x:38,y:55},
  {id:'summer-palace-snow',name:'雪后颐和园',category:'雪景',area:'海淀',note:'昆明湖、十七孔桥和万寿山一起变成水墨画。',duration:'3h',seasons:['冬'],tags:['雪景','古建','摄影'],mapUrl:amap('颐和园'),x:18,y:41},
  {id:'baita-walk',name:'白塔寺到西四',category:'CityWalk',area:'西城',note:'白塔、胡同、小店和旧城生活，适合无目的散步。',duration:'2–3h',seasons:['春','秋'],tags:['胡同','建筑','咖啡'],mapUrl:amap('白塔寺'),x:46,y:49}
];
export const events: EventItem[] = [
  {id:'book-fair',name:'我与地坛北京书市',type:'城市活动',place:'地坛公园',area:'东城',start:'2026-09-17',end:'2026-09-27',month:'SEP',day:'17—27'},
  {id:'universal',name:'环球秋季惊彩活动',type:'季节限定',place:'北京环球度假区',area:'通州',start:'2026-09-04',end:'2026-11-01',month:'SEP',day:'04'},
  {id:'autumn',name:'北京秋日收藏计划',type:'季节清单',place:'全城',area:'北京',start:'2026-09-20',end:'2026-11-30',month:'OCT',day:'01'}
];
