import type {Discovery} from '../lib/discoveries.mjs';
import type {CityKey} from './cities';
const e=(city:CityKey,id:string,title:string,category:string,start:string,end:string,location:string,source:string,url:string):Discovery=>({id,eventKey:id,city,title,category,start:start+'T00:00:00',end:end+'T23:59:59',location,source,url,discoveredAt:'2026-09-22',lastSeenAt:'2026-09-22'});
export const curatedEvents:Discovery[]=[
 e('beijing','bj-pageone-theatre','月亮藏在绘本里：中秋亲子戏剧体验','亲子','2026-09-25','2026-09-25','PAGEONE五道口 · 10:30开始','PAGEONE · 活动行','https://9252918605779.huodongxing.com/event/9878492594100'),
 e('beijing','bj-chorus-september','夜唱计划：成年人的快乐合唱局（9月场次）','演出','2026-09-01','2026-09-30','北京朝阳 · 象外空间 · 场次见报名页','象外空间 · 活动行','https://5845428561887.huodongxing.com/event/6863088182000'),
 e('beijing','bj-science-market','北科万物集：手作、投壶与节令茶点','市集','2026-09-25','2026-09-27','北京科学中心 · 需提前预约大门票','北京科学中心','https://www.bjsc.net.cn/bjsc/bgxx/hdyg/202609/t20260921_198470.html'),
 e('shanghai','sh-stationery-market','四叶草手账市集：原创印章与纸品','市集','2026-09-25','2026-09-27','长风大悦城室内 L2 中庭 · 免费参观','普陀文旅','https://www.shpt.gov.cn/wlj-zfbm/xwdt-wlj/20260915/972991.html'),
 e('shanghai','sh-garden-workshop','花园城市工作坊：亲手做一座微型花园','亲子','2026-09-26','2026-09-26','天安千树 · 莫干山路600号 · 线下免费参与','普陀文旅','https://www.shpt.gov.cn/wlj-zfbm/xwdt-wlj/20260915/972991.html'),
 e('shanghai','sh-sweet-market','首届千树糖水节：河边甜品与轻食','美食','2026-09-25','2026-10-05','天安千树河滨步道 · 入场免费，餐饮另付','普陀文旅','https://www.shpt.gov.cn/wlj-zfbm/xwdt-wlj/20260915/972991.html'),
 e('shenzhen','sz-nantou-market','南头古城中秋风物集：海岸民艺与手作','市集','2026-09-25','2026-09-27','南头古城 · 每日12:00—21:00','深圳本地宝','https://sz.bendibao.com/news/2026918/1013432.htm'),
 e('shenzhen','sz-golden-market','Golden Market 金秋生活集','市集','2026-09-29','2026-10-03','前海嘉里中心商业街区','深圳本地宝','https://m.bendibao.com/show1012872.html'),
 e('guangzhou','gz-lake-market','越秀公园湖畔市集','市集','2026-09-19','2026-10-07','越秀公园 · 逛集与湖边散步','广州本地宝','https://gz.bendibao.com/tour/2026921/ly372405.shtml'),
 e('hangzhou','hz-indie-games','NGD 超星游戏节：独立游戏试玩与市集','其他','2026-09-25','2026-09-26','良渚芯云艺术中心','独游网','https://www.pcindie.com/zhhd/20260802/266.html'),
];
