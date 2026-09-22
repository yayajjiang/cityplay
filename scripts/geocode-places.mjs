import { readFile, writeFile } from 'node:fs/promises';

const files = [new URL('../data/beijing.ts', import.meta.url), new URL('../data/beijing-districts.ts', import.meta.url)];
const output = new URL('../data/place-coordinates.json', import.meta.url);
const existing = JSON.parse(await readFile(output, 'utf8'));
const entries = [];
for (const file of files) {
  const source = await readFile(file, 'utf8');
  for (const match of source.matchAll(/(?:id:\s*'([^']+)'[\s\S]{0,80}?name:\s*'([^']+)'|p\('([^']+)','([^']+)')/g)) {
    const id=match[1]||match[3];
    if(id==='bell-drum')continue; // 同名郊区地标，须单独核验。
    entries.push({id,name:match[2]||match[4]});
  }
}

for (const [index, entry] of entries.slice(0,Number(process.env.GEOCODE_LIMIT)||entries.length).entries()) {
  if (existing[entry.id]) continue;
  try {
    const query = encodeURIComponent(`${entry.name} 北京 中国`);
    const response = await fetch(`https://photon.komoot.io/api/?q=${query}&limit=3`, { signal:AbortSignal.timeout(10000), headers: { 'user-agent': 'CityPlay/1.0 (public Beijing guide)' } });
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const feature=data.features?.find(f=>f.properties?.name===entry.name && f.geometry.coordinates[0]>115 && f.geometry.coordinates[0]<118 && f.geometry.coordinates[1]>39 && f.geometry.coordinates[1]<41.5);
    const point=feature?.geometry?.coordinates;
    if (point && point[0] > 115 && point[0] < 118 && point[1] > 39 && point[1] < 41.5) existing[entry.id] = { lng: point[0], lat: point[1] };
  } catch (error) { console.warn(`Skipped ${entry.name}: ${error.message}`); }
  if (index % 10 === 0) console.log(`Geocoded ${index + 1}/${entries.length}`);
  await new Promise((resolve) => setTimeout(resolve, 220));
}
await writeFile(output, `${JSON.stringify(existing, null, 2)}\n`);
console.log(`Saved ${Object.keys(existing).length} name-matched OSM coordinates.`);
