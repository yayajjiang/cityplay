import { ExternalLink } from 'lucide-react';
import { xhsSearch } from '@/lib/community';
import type { GuideCollection, Place } from '@/data/beijing';

const seasons = [{key:'spring',name:'春天'},{key:'summer',name:'夏天'},{key:'autumn',name:'秋天'},{key:'winter',name:'冬天'}];
export const collectionSeasons:Record<string,string[]> = {
 'ancient-trees':['autumn'],'golden-beijing':['autumn'],'central-axis':['all'],
 'jingtong-canal':['spring','autumn'],'snow-beijing':['winter'],'subway-day':['all'],
 'autumn-hiking':['autumn'],'winter-sports':['winter'],'spring-flowers':['spring'],'summer-night':['summer']
};
function Card({collection,places,city}:{collection:GuideCollection;places:Place[];city:string}) {
 return <article className="collection-card"><p className="eyebrow">{collection.season}</p><h3>{collection.title}</h3><p>{collection.description}</p><div className="collection-places">{collection.placeIds.slice(0,5).map(id=>{const p=places.find(p=>p.id===id);return p?<span key={id}>{p.name}</span>:null})}</div><div className="collection-footer"><a href={xhsSearch(collection.id==='ancient-trees'?'我在北京看古树':city+' '+collection.title)} target="_blank" rel="noreferrer">小红书搜攻略 ↗</a><a href={collection.sourceUrl} target="_blank" rel="noreferrer">查看来源 <ExternalLink size={12}/></a></div></article>
}
export default function SeasonalCollections({collections,places,season,city='北京'}:{collections:GuideCollection[];places:Place[];season:string;city?:string}) {
 const current=collections.filter(c=>(c.seasons||collectionSeasons[c.id]||['all']).includes(season));
 const allYear=collections.filter(c=>(c.seasons||collectionSeasons[c.id]||['all']).includes('all'));
 return <section className="section collection-section" id="collections">
  <div className="section-heading"><div><p className="eyebrow">IN SEASON</p><h2>这个{seasons.find(s=>s.key===season)?.name||'季节'}，这样玩{city}</h2></div><p>跟着时令走，把好风景留在路上。</p></div>
  <div className="collection-grid">{current.map(c=><Card key={c.id} collection={c} places={places} city={city}/>)}</div>
  <h3 className="year-round-heading">一年四季，随时出发</h3>
  <div className="collection-grid">{allYear.map(c=><Card key={c.id} collection={c} places={places} city={city}/>)}</div>
  <div className="other-seasons"><p className="eyebrow">SAVE FOR ANOTHER SEASON</p><h3>其他季节，先收藏</h3>
   {seasons.filter(s=>s.key!==season).map(s=>{const group=collections.filter(c=>(c.seasons||collectionSeasons[c.id]||[]).includes(s.key));return group.length>0&&<details key={s.key}><summary><span>{s.name}</span><small>{group.length} 个主题</small><span className="season-expand">展开 ＋</span></summary><div className="collection-grid">{group.map(c=><Card key={c.id} collection={c} places={places} city={city}/>)}</div></details>})}
  </div>
 </section>
}
