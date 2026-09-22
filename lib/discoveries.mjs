export const activityCategories = ['图书','影视','新店','展览','演出','市集','户外','美食','夜生活','亲子','运动','其他'];
const rules = [
 ['新店', /开业|首店|新店|开门迎客/],
 ['影视', /电影|影展|放映|影院|影视|片单/],
 ['展览', /展览|大展|艺术展|特展/],
 ['演出', /演出|音乐会|戏剧|舞剧|话剧|演唱会|艺术周|爵士|音乐节|脱口秀|Live\s*house/i],
 ['夜生活', /酒吧|精酿|鸡尾酒|夜生活|夜宵|夜游/],
 ['美食', /美食|餐厅|餐饮|咖啡|茶馆|烘焙|甜品/],
 ['亲子', /亲子|儿童|遛娃/],
 ['运动', /滑雪|滑冰|跑步|马拉松|攀岩|球赛|运动/],
 ['市集', /市集|嘉年华|集市|消费季|生活节/],
 ['户外', /公园|骑行|徒步|绿道|露营|赏秋|红叶|银杏|彩叶|观赏期|花期|登山/],
 ['图书', /书市|书展|阅读|图书|文学|书店|读书/],
 ['展览', /博物馆|美术馆/],
];
export const classifyDiscovery = title => rules.find(([, pattern])=>pattern.test(title))?.[0] || '其他';
export function isDiscoveryRelevant(title) {
 return /活动|周末|开幕|开启|举办|预告|指南|演出|展览|市集|电影|书市|书展|读书会|公园|新店|开业|音乐|艺术|节|游|咖啡|精酿|酒吧|美食|亲子|滑雪|滑冰|银杏|红叶|彩叶|观赏期|花期/.test(title)
 && !/申报|招聘|行业|交通管理|车票|国际旅游展|服务平台|参考价|书单|作品发布|十佳作品|医院|就医|医疗|新闻发布会|征集|公布|名单|党建|党支部|干部|职工|青年趣味运动会|科技创新|工作会议|培训班|调研|座谈|采购|招标/.test(title);
}
export function isRecentDiscovery(item,now=Date.now()) {
 const dated=item.url.match(/\/t(\d{4})(\d{2})(\d{2})_/);
 const date=dated ? `${dated[1]}-${dated[2]}-${dated[3]}` : item.discoveredAt;
 const year=item.title.match(/\b(20\d{2})年?/);
 if(year && Number(year[1])<new Date(now).getUTCFullYear())return false;
 const stamp=new Date(date+'T00:00:00+08:00').getTime();
 return Number.isFinite(stamp)&&stamp>=now-30*86400000&&stamp<=now+86400000;
}
// Round-robin by category; recency ordering is preserved within each bucket.
export function diverseDiscoveries(items, limit=6, filter='全部') {
 const unique=items.filter((item,i,list)=>list.findIndex(other=>(other.eventKey||other.url)===(item.eventKey||item.url))===i)
  .sort((a,b)=>(b.discoveredAt||'').localeCompare(a.discoveredAt||''));
 if(filter!=='全部') return unique.filter(item=>item.category===filter).slice(0,limit);
 const buckets = new Map();
 for(const item of unique){ if(!buckets.has(item.category)) buckets.set(item.category,[]); buckets.get(item.category).push(item); }
 const keys=[...buckets.keys()].sort((a,b)=>Number(a==='其他')-Number(b==='其他'));
 const result=[];
 while(result.length<limit && keys.some(key=>buckets.get(key).length)){
  for(const key of keys){const item=buckets.get(key).shift();if(item) result.push(item); if(result.length===limit)break;}
 }
 return result;
}
