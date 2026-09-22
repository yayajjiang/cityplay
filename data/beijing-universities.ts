import type { Place } from './beijing';
const amap=(name:string)=>`https://uri.amap.com/search?keyword=${encodeURIComponent(name)}&city=北京`;
const unknown=(url:string,route?:string):NonNullable<Place['visit']>=>({status:'常态参观未确认',method:'出发前查官网通知、公开日或公开活动',credential:'不建议仅凭身份证直接前往，以校方当日管理为准',officialUrl:url,verifiedAt:'2026-09-22',route});
const u=(id:string,name:string,area:string,note:string,tags:string[],visit:NonNullable<Place['visit']>,x:number,y:number):Place=>({id,name,category:'高校',area,note,duration:'2–3h',seasons:['春','秋'],tags,mapUrl:amap(name),x,y,visit});
export const universityPlaces:Place[]=[
 u('ruc','中国人民大学','海淀','人文社科氛围浓，关注校庆、开放日和公开讲座。',['人文','公开活动'],unknown('https://www.ruc.edu.cn/'),34,43),
 u('bnu','北京师范大学','海淀','老师大校园记忆，适合跟随公开活动访问。',['师范','老校园'],unknown('https://www.bnu.edu.cn/'),45,39),
 u('buaa','北京航空航天大学','海淀','航空航天特色鲜明，优先关注校史馆和公开日。',['航空','科技'],{status:'需提前咨询',method:'校保卫处页面提示提前 2–3 天电话咨询 82339763',credential:'证件要求以电话确认为准',officialUrl:'https://bwc.buaa.edu.cn/',verifiedAt:'2026-09-22'},42,35),
 u('bit','北京理工大学','海淀','中关村校区可与周边博物馆组合。',['理工','中关村'],unknown('https://www.bit.edu.cn/'),31,48),
 u('bfsu','北京外国语大学','海淀','关注公开讲座、国际文化节。',['语言','国际文化'],unknown('https://www.bfsu.edu.cn/'),29,51),
 u('minzu','中央民族大学','海淀','民族文化特色浓，关注博物馆活动。',['民族文化','博物馆'],unknown('https://www.muc.edu.cn/'),33,51),
 u('bjfu','北京林业大学','海淀','树木与园林特色，关注自然教育活动。',['树木','园林'],unknown('https://www.bjfu.edu.cn/'),42,30),
 u('cau','中国农业大学','海淀','关注农业博物馆、开放日与科普活动。',['农业','科普'],unknown('https://www.cau.edu.cn/'),38,27),
 u('uibe','对外经济贸易大学','朝阳','校方曾办公众开放日，不等于日常可入。',['开放日','国际化'],{...unknown('https://www.uibe.edu.cn/'),status:'开放日/活动预约'},57,37),
 u('cuc','中国传媒大学','朝阳','关注展映、讲座和校园节。',['影视','传媒'],unknown('https://www.cuc.edu.cn/'),72,49),
 u('cafa','中央美术学院','朝阳','普通访客优先去面向公众的央美美术馆。',['美术馆','展览'],{status:'去公共美术馆',method:'查当期展览和预约要求',credential:'以票务页和身份核验要求为准',officialUrl:'https://www.cafamuseum.org/',verifiedAt:'2026-09-22'},65,36),
 u('cupl','中国政法大学','海淀','学院路校区可和北邮、北师大周边组合。',['法学','学院路'],unknown('https://www.cupl.edu.cn/'),44,37),
];
