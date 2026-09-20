import { readFile, writeFile } from 'node:fs/promises';

const output = new URL('../data/daily-discoveries.json', import.meta.url);
const sources = [
  { name: '北京市政府', url: 'https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/index.html', base: 'https://www.beijing.gov.cn' },
  { name: '北京旅游网', url: 'https://www.visitbeijing.com.cn/', base: 'https://www.visitbeijing.com.cn' },
  { name: '北京市公园管理中心', url: 'https://gygl.beijing.gov.cn/', base: 'https://gygl.beijing.gov.cn' },
];

const rules = [
  ['图书', /书市|书展|阅读|图书|文学|书店/],
  ['影视', /电影|影展|放映|影院|影视/],
  ['新店', /开业|首店|新店|开门迎客/],
  ['展览', /展览|大展|博物馆|美术馆|艺术展/],
  ['演出', /演出|音乐会|戏剧|舞剧|话剧|演唱会|艺术周/],
  ['市集', /市集|嘉年华|集市|消费季|生活节/],
  ['户外', /公园|骑行|徒步|绿道|露营|赏秋|红叶/],
];
const relevant = /活动|周末|开幕|开启|举办|预告|指南|演出|展览|市集|电影|书|公园|新店|开业|音乐|艺术|节|游/;
const excluded = /关于|公告|通知|申报|成果|协会|行业|办公|交通管理|车票|项目亮相|国际旅游展|服务平台|名单|办法|参考价|招聘/;
const clean = (value) => value.replace(/<[^>]*>/g, '').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const category = (title) => rules.find(([, pattern]) => pattern.test(title))?.[0] || '其他';
const absolute = (href, base) => { try { return new URL(href, base).href; } catch { return null; } };

const previous = JSON.parse(await readFile(output, 'utf8'));
const found = [];
for (const source of sources) {
  try {
    const response = await fetch(source.url, { headers: { 'user-agent': 'CityPlay/1.0 public-city-guide' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
      const title = clean(match[2]);
      const url = absolute(match[1], source.base);
      if (!url || title.length < 6 || title.length > 70 || !relevant.test(title) || excluded.test(title)) continue;
      found.push({ id: Buffer.from(url).toString('base64url').slice(-24), title, category: category(title), url, source: source.name, discoveredAt: new Date().toISOString().slice(0, 10) });
    }
  } catch (error) {
    console.warn(`Skipped ${source.name}: ${error.message}`);
  }
}

const merged = [...found, ...previous]
  .filter((item) => relevant.test(item.title) && !excluded.test(item.title))
  .filter((item, index, list) => list.findIndex((other) => other.url === item.url) === index)
  .sort((a, b) => Number(a.category === '其他') - Number(b.category === '其他'))
  .slice(0, 60);
await writeFile(output, `${JSON.stringify(merged, null, 2)}\n`);
console.log(`Saved ${merged.length} daily discoveries (${found.length} found today).`);
