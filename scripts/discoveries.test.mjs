import {test} from 'node:test';
import assert from 'node:assert/strict';
import {classifyDiscovery,diverseDiscoveries,isDiscoveryRelevant} from '../lib/discoveries.mjs';
const item=(i,category)=>({id:String(i),title:'消息'+i,url:'https://example.com/'+i,category,source:'test',discoveredAt:'2026-09-22'});
test('six book headlines cannot crowd out other categories',()=>{const data=[...Array.from({length:8},(_,i)=>item(i,'图书')),item(9,'演出'),item(10,'户外'),item(11,'影视'),item(12,'夜生活'),item(13,'美食')]; assert.equal(new Set(diverseDiscoveries(data,6).map(i=>i.category)).size,6)});
test('category filter, duplicate URLs and empty results',()=>{const a=item(1,'夜生活');assert.deepEqual(diverseDiscoveries([a,a,item(2,'图书')],6,'夜生活'),[a]);assert.deepEqual(diverseDiscoveries([a],6,'亲子'),[])});
test('event type wins over literary topic and unrelated book news excluded',()=>{assert.equal(classifyDiscovery('文学中的长征展览开幕'),'展览');assert.equal(isDiscoveryRelevant('9月书单 | 品阅读之美'),false);assert.equal(isDiscoveryRelevant('图书馆、景区、医院开放时间汇总'),false);assert.equal(classifyDiscovery('周末精酿酒吧指南'),'夜生活');assert.equal(isDiscoveryRelevant('北京红叶观赏期预告'),true)});

test('distinct activities in one article are kept, repeated copies are removed',()=>{const a={...item(1,'市集'),eventKey:'market'};const b={...a,id:'2',eventKey:'workshop',category:'亲子'};assert.equal(diverseDiscoveries([a,b,a],6).length,2)});
