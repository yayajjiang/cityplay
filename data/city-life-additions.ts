import type {Place} from './beijing';
import type {CityKey} from './cities';
// Source-backed guide entries. Missing coordinates remain absent, never guessed.
const place=(city:string,id:string,name:string,category:string,area:string,address:string,note:string,sourceName:string,sourceUrl:string):Place=>({id:`${city}-${id}`,name,category,area,note,duration:'1–2h',seasons:['四季'],tags:[category,'街区生活'],x:50,y:50,mapUrl:`https://uri.amap.com/search?keyword=${encodeURIComponent(name)}&city=${encodeURIComponent(city)}`,guide:{address,planning:note,sourceName,sourceUrl,checkedAt:'2026-09-22'}});
export const cityLifeAdditions:Record<Exclude<CityKey,'beijing'>,Place[]>={
 shanghai:[
  place('上海','tsutaya','上生新所茑屋书店','书店','长宁','延安西路1262号上生新所7号楼','先看历史建筑里的艺术书，再到园区泳池边散步。','乐游上海','https://www.meet-in-shanghai.net/cn/changning-district/upper-student-new-institute-681930/'),
  place('上海','columbia','上生·新所','CityWalk','长宁','延安西路1262号','从孙科别墅、老厂房走到泳池边，留一段时间喝咖啡。','乐游上海','https://www.meet-in-shanghai.net/cn/changning-district/upper-student-new-institute-681930/'),
  place('上海','cannery','The Cannery','美食','长宁','愚园路1107号','把愚园路散步接到一顿海鲜晚餐，也适合朋友小聚。','That’s Shanghai','https://fd.thatsmags.com/detail?id=70'),
 ],
 guangzhou:[
  place('广州','1200','1200bookshop 体育东店','书店','天河','体育东路','在街边书店翻书，把天河逛街安排留出一段阅读时间。','1200门店回顾','https://www.sohu.com/a/1045471904_121124779'),
  place('广州','hope','庙前冰室 Hope & Sesame','酒吧','越秀','东山口庙前西街58号','东山口散步后坐下来喝一杯，官网有预约入口和酒单。','Hope Group','https://hopeandsesame.cn/home/hope-sesame-guangzhou/'),
  place('广州','sanyou','庙前三酉 Bar SanYou','酒吧','越秀','外商新天地A127铺','以本土烈酒为线索探索鸡尾酒，和朋友慢慢聊一个晚上。','Hope Group','https://hopeandsesame.cn/bar-sanyou-guangzhou/'),
 ],
 shenzhen:[
  place('深圳','oldheaven','旧天堂书店','书店','南山','华侨城创意园北区A5栋','翻书、淘唱片，再沿创意园走一段；演出单独看排期。','旧天堂书店公开动态','https://www.globuya.com/CN/Shenzhen/191289718149544/旧天堂书店-Old-Heaven-Books'),
  place('深圳','designsociety','海上世界文化艺术中心','展览','南山','蛇口海上世界滨海片区','先选一场展览，再到滨海公共空间散步，看建筑与海岸。','深圳城市设计促进中心','https://www.szdesigncenter.com/en/shaah-1'),
  place('深圳','hope','庙前冰室 Hope & Sesame','酒吧','南山','侨香路侨城坊2号楼B101','在侨城坊安排晚餐和鸡尾酒，店家官网提供预约入口。','Hope Group','https://hopeandsesame.cn/hope-sesame-shenzhen/'),
 ],
 hangzhou:[
  place('杭州','tsutaya','天目里茑屋书店','书店','西湖','天目山路398号天目里','从书店的艺术与设计书开始，逛累了到园区里喝咖啡。','杭州文旅指南','https://wgly.hangzhou.gov.cn/attach/538/2307051510367229.pdf'),
  place('杭州','ooeli','天目里','CityWalk','西湖','天目山路与古墩路交叉口','建筑、书店与咖啡串成半日；遇到市集再单独加入行程。','杭州文旅指南','https://wgly.hangzhou.gov.cn/attach/538/2307051510367229.pdf'),
  place('杭州','wulin-night','武林夜市','美食','拱墅','武林路商圈','傍晚逛小吃与手作摊位，再步行往湖滨方向收尾。','杭州城市门户','https://www.ehangzhou.gov.cn/hz_shopping.html'),
 ],
};
