import type {CityKey} from './cities';
type Source={name:string;type:string;cadence:string;note:string;url:string};
const names={beijing:'北京',shanghai:'上海',guangzhou:'广州',shenzhen:'深圳',hangzhou:'杭州'};
const prefixes={beijing:'bj',shanghai:'sh',guangzhou:'gz',shenzhen:'sz',hangzhou:'hz'};
const local:Record<CityKey,Source[]>={
 beijing:[
 {name:'活动网 · 北京合集',type:'已整理的活动库',cadence:'分类与票务',note:'按日期、活动类型和价格浏览演出、观影、手作与户外活动。',url:'https://huodong.com/event/beijing'},
 {name:'北京城市日历',type:'官方活动合集',cadence:'展演与城市生活',note:'首都之窗汇总正在举办的文化演出、集市和城市活动。',url:'https://www.beijing.gov.cn/so/zcdh/csrl'},
 {name:'中国电影资料馆 · 小西天',type:'场馆放映日历',cadence:'电影排期',note:'查看艺术影院放映日历，购票按场次公告进入指定渠道。',url:'https://www.cfa.org.cn/eportal/ui?pageId=488e1818660b49fd94b3d22dc3f05a33'},
 {name:'国家大剧院',type:'官网 / 官方微信',cadence:'演出与开票',note:'官网汇总演出排期，并同步官方微信的开票推送。',url:'https://www.chncpa.org/'},
 {name:'数字北京科学中心',type:'官方公众号',cadence:'手作与体验',note:'微信搜“数字北京科学中心”；公开活动与预约说明见馆方网站。',url:'https://www.bjsc.net.cn/bjsc/bgxx/tzgg/qtgg/202608/t20260817_194263.html'},
 {name:'北京石刻艺术博物馆',type:'官方公众号',cadence:'参观与活动',note:'微信搜同名公众号；官网可查看购票方式与周三免费名额规则。',url:'https://www.bjstoneartmuseum.org.cn/CN/service/canguanmenpiao/'},
 {name:'文联北京',type:'官方公众号',cadence:'双周影院',note:'关注艺术电影放映与非会员赠票公告，依具体场次预约。',url:'https://www.bjnews.com.cn/detail/1788215594019675.html'},
 ],
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
