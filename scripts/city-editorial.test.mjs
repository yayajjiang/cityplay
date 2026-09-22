import test from 'node:test';
import assert from 'node:assert/strict';
import {cityPacks} from '../data/cities.ts';
import {cityRoutes,cityEditorial} from '../data/city-editorial.ts';
test('each city has its own routes with valid local stops',()=>{
 for(const [key,pack] of Object.entries(cityPacks)){
  const routes=cityRoutes.filter(r=>r.city===key);
  assert.ok(routes.length>=3,key);
  for(const r of routes)for(const [id] of r.stops)assert.ok(pack.places.some(p=>p.id===id),`${key}: ${id}`);
  assert.equal(cityEditorial[key].seasonTitles.length,4);
  for(const title of cityEditorial[key].seasonTitles)assert.ok(!title.includes('北京'));
  for(const id of cityEditorial[key].featured)assert.ok(pack.places.some(p=>p.id===id));
 }
 assert.equal(new Set(cityRoutes.map(r=>r.id)).size,cityRoutes.length);
});
