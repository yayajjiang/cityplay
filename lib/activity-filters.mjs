const districts={
 beijing:['东城','西城','朝阳','海淀','丰台','石景山','门头沟','房山','通州','顺义','昌平','大兴','怀柔','平谷','密云','延庆'],
 shanghai:['黄浦','徐汇','长宁','静安','普陀','虹口','杨浦','浦东','闵行','宝山','嘉定','金山','松江','青浦','奉贤','崇明'],
 guangzhou:['越秀','海珠','荔湾','天河','白云','黄埔','番禺','花都','南沙','从化','增城'],
 shenzhen:['福田','罗湖','南山','盐田','宝安','龙岗','龙华','坪山','光明','大鹏'],
 hangzhou:['上城','拱墅','西湖','滨江','萧山','余杭','临平','钱塘','富阳','临安','桐庐','淳安','建德'],
};
export function activityDistrict(item,city){return item.area||districts[city]?.find(d=>(item.location||'').includes(d))||'区域未标明'}
export function filterActivities(items,{city,district='全部',ticket='全部'}){
 return items.filter(item=>(district==='全部'||activityDistrict(item,city)===district)&&(ticket==='全部'||(ticket==='早鸟/优惠'?/早鸟|优惠|特惠|折扣/.test(item.title+' '+(item.price||'')):/免费|^0(?:元|\.00)/.test(item.price||''))));
}
export function activityDistricts(city){return districts[city]||[]}
