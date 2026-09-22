import test from 'node:test';
import assert from 'node:assert/strict';
import {filterActivities,activityDistrict} from '../lib/activity-filters.mjs';
import {screeningCalendar} from '../lib/screenings.mjs';
test('district uses venue location and never assigns a district from a news title',()=>{
 const a={title:'海淀活动精选',location:''},b={title:'放映',location:'北京 朝阳区 万达影城',price:'免费'};
 assert.equal(activityDistrict(a,'beijing'),'区域未标明');
 assert.deepEqual(filterActivities([a,b],{city:'beijing',district:'朝阳',ticket:'免费'}),[b]);
});
test('screening stats count films and timed sessions, deduplicate reposts, exclude news and past shows',()=>{
 const a={id:'a',category:'影视',title:'《某电影》观影会',start:'2026-09-23T18:00:00',end:'2026-09-23T20:00:00',location:'海淀某影院',source:'馆方',discoveredAt:'2026-09-22'};
 const stats=screeningCalendar([a,{...a,id:'repost'},{...a,id:'b',start:'2026-09-23T21:00:00',end:'2026-09-23T23:00:00'},{...a,id:'news',title:'《某电影》票房新闻'},{...a,id:'past',start:'2026-09-21T18:00:00',end:'2026-09-21T20:00:00'}],Date.parse('2026-09-22T12:00:00+08:00'));
 assert.equal(stats.films,1);assert.equal(stats.sessions,2);assert.equal(stats.sources,1);assert.equal(stats.addedToday,2);
});
