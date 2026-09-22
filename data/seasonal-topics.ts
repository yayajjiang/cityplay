import type { CityKey } from './cities';
import type { GuideCollection } from './beijing';
import {cityEditorial} from './city-editorial';
type Topic=[string,string,string,string[]];
const topics:Record<CityKey,Topic[]>={
 beijing:[
 ['spring','春日皇家园林散步','颐和园看湖岸、圆明园走遗址，两个公园分两次慢慢逛。',['summer-palace','yuanmingyuan']],
 ['spring','天气暖了，骑去运河','选绿道的一段骑行，河边休息与沿途公园留出时间。',['canal-park','san-shan']],
 ['summer','把正午交给博物馆','首博、国博或电影博物馆择一，傍晚再出门散步。',['capital-museum','national-museum','china-film-museum']],
 ['summer','下班后的胡同咖啡','五道营坐坐，再走到鼓楼；用两小时结束闷热的一天。',['wudaoying-coffee','bell-drum']],
 ['winter','暖屋里的书与茶','书店翻书、茶馆坐坐，不赶路的冬日室内半日。',['wansheng','laoshe-tea','beijingfang-coffee']],
 ['winter','冬日艺术馆计划','选一场室内展览，园区步行留短一些，安排一顿热饭。',['798','red-brick','capital-museum']],
 ],
 shanghai:[
 ['spring','森林里的野餐半日','共青森林公园找一条慢行道，草地休息与散步交替。',['上海-gongqing']],
 ['spring','沿苏州河读建筑','从四行仓库周边往河岸走，看老建筑与新的公共空间。',['上海-sihang']],
 ['summer','雨天的东馆艺术课','上海博物馆东馆选择两个展厅，留半天细看。',['上海-museum']],
 ['summer','西岸落日散步','白天看展，傍晚再沿江散步，不追求走完整条滨江。',['上海-westbund']],
 ['autumn','梧桐区慢走一下午','武康路到安福路，建筑、街角咖啡和散步串成半日。',['上海-wukang']],
 ['autumn','把周末留给湿地','崇明东滩安排整日，交通与观鸟各留足时间。',['上海-chongming']],
 ['winter','冬日西岸看展','选定展馆后再出发，馆内休息与江边短步行结合。',['上海-westbund']],
 ['winter','冷天外滩，短程看建筑','挑一小段建筑群细看，临江有风时缩短户外停留。',['上海-bund']],
 ],
 guangzhou:[
 ['spring','骑楼底下慢慢逛','恩宁路看骑楼与粤剧文化，小店和午饭穿插在步行间。',['广州-yongqing']],
 ['spring','沙面树荫与江边','沿沙面街巷看近代建筑，走累了就坐下休息。',['广州-shamian']],
 ['summer','岭南工艺避暑半日','陈家祠看木雕、石雕与陶塑，院落步行避开正午。',['广州-chen']],
 ['summer','花城广场的晚风','傍晚从大剧院方向走向江边，拍建筑和天际线。',['广州-huacheng']],
 ['autumn','白云山轻登高','按体力选一段登山道，上午出发，中途留休息时间。',['广州-baiyun']],
 ['autumn','海珠湿地自然散步','林荫、湿地与果林慢游，适合不赶路的半日。',['广州-haizhu']],
 ['winter','去南沙等候鸟','给南沙湿地留一天，安静观察，带好望远镜。',['广州-nanling']],
 ['winter','岭南建筑里的暖冬','陈家祠看工艺，另选半日去沙面看街区与树影。',['广州-chen','广州-shamian']],
 ],
 shenzhen:[
 ['spring','古城小店与社区散步','南头古城不只拍门楼，留时间给博物馆与巷子。',['深圳-nantou']],
 ['spring','莲花山草地半日','草地休息与山顶观景结合，轻松走完一段。',['深圳-lianhua']],
 ['summer','大芬画室慢慢看','挑感兴趣的画室与展馆，炎热时多留室内时间。',['深圳-dafen']],
 ['summer','深圳湾夜风路线','白天休息，傍晚才到人才公园与海湾步道。',['深圳-talent']],
 ['autumn','登一次梧桐山','按体力选路线，天黑前下山，雨天改为城内游。',['深圳-wutong']],
 ['autumn','古城和海边的一整天','大鹏所城看历史，较场尾留给散步和吃饭。',['深圳-dapeng']],
 ['winter','杨梅坑海岸慢行','选天气平稳的一天，海边散步与观景相结合。',['深圳-yangmeikeng']],
 ['winter','冬日深圳湾观景','海湾长步行或短途骑行二选一，看天际线与水鸟。',['深圳-talent']],
 ],
 hangzhou:[
 ['spring','茶山溪谷慢徒步','九溪沿林荫走到茶园，选择折返或延伸到茶村。',['杭州-jiuxi']],
 ['spring','湘湖环湖半日','步行与骑行二选一，不必一口气绕完整个湖。',['杭州-xianghu']],
 ['summer','丝博里的江南工艺','雨天或正午看丝绸、服饰与设计，慢逛常设展。',['杭州-museum']],
 ['summer','运河边的夏日晚饭','傍晚到拱宸桥，沿河散步，再找地方吃饭。',['杭州-canal']],
 ['autumn','良渚遗址的一天','遗址公园以户外步行为主，安排代步与休息。',['杭州-liangzhu']],
 ['autumn','湘湖秋日骑行','挑一段湖岸慢骑，停下看水与山，不赶里程。',['杭州-xianghu']],
 ['winter','灵隐与北高峰','寺院参观和登高按体力组合，天冷时缩短山路。',['杭州-lingshan']],
 ['winter','运河街区的热饭与展馆','沿河短步行，搭配一个室内展馆与一顿热饭。',['杭州-canal']],
 ],
};
const labels:Record<string,string>={spring:'春日攻略',summer:'夏日攻略',autumn:'秋日攻略',winter:'冬日攻略'};
export function extraSeasonalTopics(city:CityKey):GuideCollection[]{return topics[city].map(([season,title,description,placeIds],i)=>({id:`${city}-seasonal-${i}`,title,description,placeIds,season:labels[season],seasons:[season],kicker:'季节生活提案',sourceUrl:city==='beijing'?'https://www.visitbeijing.com.cn/':cityEditorial[city].source}))}
