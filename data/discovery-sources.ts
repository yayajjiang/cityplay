import type {CityKey} from './cities';
type Source={name:string;type:string;cadence:string;note:string;url:string};
const names={beijing:'北京',shanghai:'上海',guangzhou:'广州',shenzhen:'深圳',hangzhou:'杭州'};
const prefixes={beijing:'bj',shanghai:'sh',guangzhou:'gz',shenzhen:'sz',hangzhou:'hz'};
const local:Record<CityKey,Source[]>={
 beijing:[{name:'北京科学中心',type:'场馆活动',cadence:'手作与体验',note:'科学体验、节令市集与亲子工作坊。',url:'https://www.bjsc.net.cn/bjsc/bgxx/hdyg/'}],
 shanghai:[{name:'乐游上海',type:'城市指南',cadence:'展览与街区',note:'街区新玩法、艺术空间与城市周末指南。',url:'https://www.meet-in-shanghai.net/'}],
 guangzhou:[{name:'Hope Group · 广州',type:'店家官网',cadence:'酒单与预约',note:'东山口鸡尾酒、庙前三酉及店家预约入口。',url:'https://hopeandsesame.cn/'}],
 shenzhen:[{name:'Hope Group · 深圳',type:'店家官网',cadence:'酒吧与预约',note:'侨城坊酒吧及店家发布的预约信息。',url:'https://hopeandsesame.cn/hope-sesame-shenzhen/'}],
 hangzhou:[{name:'杭州城市生活',type:'城市指南',cadence:'夜市与新空间',note:'武林夜市、创意园区与城市生活空间。',url:'https://www.ehangzhou.gov.cn/hz_shopping.html'}],
};
// These are browsing/research entrances, not claims of automated API access.
export function discoverySources(city:CityKey):Source[]{return [
 {name:'活动行 · '+names[city],type:'活动报名',cadence:'工作坊与小聚',note:'优先找手作、放映、音乐和读书会；每场有独立报名页。',url:`https://${prefixes[city]}.huodongxing.com/`},
 {name:'豆瓣同城 · '+names[city],type:'活动平台',cadence:'演出与放映',note:'按城市查演出、展览、电影及同城聚会排期。',url:`https://www.douban.com/location/${city}/events/week-all`},
 ...local[city],
 ];}
