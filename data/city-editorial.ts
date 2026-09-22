import type { CityKey } from './cities';
import type { LifeRoute } from './life-routes';
export const cityEditorial:Record<Exclude<CityKey,'beijing'>,{source:string;sourceName:string;seasonTitles:string[];seasonDescriptions:string[];featured:string[]}>={
 shanghai:{source:'https://www.meet-in-shanghai.net/',sourceName:'乐游上海',seasonTitles:['梧桐街区的春日午后','把夏夜交给黄浦江','共青森林与苏河秋色','冬天，走进博物馆'],seasonDescriptions:['从武康路慢慢走到安福路，看老建筑与街角小店。','西岸散步，外滩看夜景；把户外时间留给傍晚。','森林半日和苏州河沿岸漫步，选一条慢下来。','上海博物馆东馆选两个展厅，留够休息时间。'],featured:['上海-wukang','上海-westbund','上海-sihang']},
 guangzhou:{source:'https://www.gz.gov.cn/zt/2025ycbjpxhd/tjjd/content/post_10329063.html',sourceName:'广州 · 粤韵西关',seasonTitles:['花城的骑楼与树荫','入馆避暑，珠江乘凉','白云山登高与湿地散步','暖冬西关，茶点与慢行'],seasonDescriptions:['陈家祠看岭南工艺，再沿恩宁路逛老城。','广东省博物馆看展，傍晚从花城广场向江边走。','上午登白云山；另留半天去海珠湿地。','永庆坊和沙面串成一日，吃饭与休息穿插其中。'],featured:['广州-yongqing','广州-shamian','广州-huacheng']},
 shenzhen:{source:'https://www.sz.gov.cn/szzt2010/szwtt/wtcg/whcg/content/post_11132704.html',sourceName:'深圳 · 南头古城',seasonTitles:['从古城走向海湾','夏日画室与海边晚风','梧桐山登高，深圳湾日落','向海而行的暖冬'],seasonDescriptions:['南头古城逛社区，另选半天去人才公园看海湾。','白天逛大芬画室，海岸散步安排在傍晚。','体力充足选梧桐山，轻松路线选深圳湾。','大鹏古城与较场尾连游，留一整天享受海岸。'],featured:['深圳-nantou','深圳-talent','深圳-dafen']},
 hangzhou:{source:'https://wgly.hangzhou.gov.cn/',sourceName:'杭州文广旅游',seasonTitles:['春天，走西湖的西边','九溪听水，丝博避暑','九溪茶山与运河秋游','冬日古寺与江南展馆'],seasonDescriptions:['曲院风荷、杨公堤与茅家埠慢行，看湖也看园林。','九溪走林荫道，雨天改去中国丝绸博物馆。','茶园溪谷徒步与运河街区散步，各留一个半日。','灵隐感受山间静意，丝博看工艺与江南生活。'],featured:['杭州-westlake','杭州-jiuxi','杭州-canal']},
};
const route=(city:LifeRoute['city'],id:string,title:string,need:string[],duration:string,transport:string,tips:string,stops:LifeRoute['stops']):LifeRoute=>({city,id,title,need,duration,transport,tips,stops,budget:'餐饮与展馆门票按所选项目安排',season:'全年可选 · 户外避开恶劣天气'});
export const cityRoutes:LifeRoute[]=[
 route('shanghai','sh-tree','梧桐街区，慢慢逛',['独处放空','约会','下班两小时'],'2–3小时','交通大学站出发，武康路与安福路步行串联。','建筑拍照请留出居民出入空间。',[['上海-wukang','2–3小时','从武康大楼沿街慢行，在安福路找一家咖啡馆休息。']]),
 route('shanghai','sh-river','苏州河走到外滩',['朋友聚会','夜生活','少花钱'],'半天','先到四行仓库，沿苏州河向东，走累了可乘车去外滩。','预留步行体力；不必把沿途场馆全部走完。',[['上海-sihang','90分钟','看历史建筑与苏河湾公共空间。'],['上海-bund','90分钟','傍晚看外滩建筑和两岸灯光。']]),
 route('shanghai','sh-art','西岸的艺术半日',['雨天室内','约会'],'半天','导航到西岸艺术沿线，先选展馆再安排沿江步行。','展馆距离不一，只选一至两场展览。',[['上海-westbund','3–4小时','看一场展览，再到滨江步道散步。']]),
 route('guangzhou','gz-west','西关骑楼与沙面树影',['美食','朋友聚会','约会'],'半天至一天','长寿路站出发，恩宁路逛完后步行或乘车去沙面。','沿线分段休息，餐饮安排在恩宁路附近。',[['广州-yongqing','2小时','看骑楼、粤剧文化和街区小店。'],['广州-shamian','90分钟','沿树荫散步，收尾在珠江边。']]),
 route('guangzhou','gz-art','岭南工艺细细看',['雨天室内','带长辈','亲子'],'2小时','陈家祠站出站后步行抵达。','室内展厅与院落交替游览。',[['广州-chen','2小时','重点看陶塑、木雕与灰塑，别急着只拍正门。']]),
 route('guangzhou','gz-night','从省博走向珠江夜色',['夜生活','下班两小时','约会'],'半天','珠江新城片区步行，先入馆再逛花城广场。','只看夜景可省略省博，傍晚直接到广场。',[['广州-museum','2小时','选自然或岭南文化展厅。'],['广州-huacheng','90分钟','从大剧院方向慢走到海心沙周边。']]),
 route('shenzhen','sz-bay','把傍晚留给深圳湾',['约会','户外运动','少花钱'],'2–3小时','导航人才公园，从公园向深圳湾公共步道延伸。','步行或骑行二选一，遵循各路段骑行标识。',[['深圳-talent','2–3小时','先逛人才公园，再沿海湾看城市天际线。']]),
 route('shenzhen','sz-old','古城的小店与城市来路',['独处放空','美食','朋友聚会'],'3小时','中山公园站附近出发，步行进入南头古城。','先看展馆，再沿小巷找喜欢的小店。',[['深圳-nantou','3小时','看古城历史，街巷里喝咖啡、逛社区店铺。']]),
 route('shenzhen','sz-sea','大鹏古城到较场尾',['亲子','约会','户外运动'],'一天','从市区乘公共交通或驾车到大鹏所城，古城与较场尾步行衔接。','往返市区留足时间，海边游玩关注风浪。',[['深圳-dapeng','一天','上午逛古城，午饭后到较场尾海边。']]),
 route('hangzhou','hz-lake','西湖西线，留白半日',['独处放空','带长辈','约会'],'半天','从曲院风荷出发，杨公堤与茅家埠分段慢行。','不追求环湖走完，疲劳时就近结束。',[['杭州-westlake','3–4小时','看园林与湖湾，湖边坐一会儿。']]),
 route('hangzhou','hz-tea','九溪：茶园与溪声',['赏秋','户外运动','朋友聚会'],'半天','导航九溪入口，按体力选择折返或向茶村延伸。','雨后石面湿滑，穿防滑鞋，不下溪涉水。',[['杭州-jiuxi','3小时','沿溪谷走到茶园，在途中安排休息。']]),
 route('hangzhou','hz-canal','沿运河读杭州日常',['美食','雨天室内','亲子'],'半天','从拱宸桥周边出发，结合步行与短程公交到大兜路。','沿线博物馆择一参观，不必全部打卡。',[['杭州-canal','4小时','看桥、逛街区、选一间博物馆，最后吃顿饭。']]),
];
