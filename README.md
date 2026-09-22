# CityPlay

> Your city is a checklist.

一个漂亮、低维护、可 Fork 的开放城市游玩指南。默认数据是北京，无账号、无数据库、无后端。

## 功能

- 最近活动与自动过期状态
- 每日活动雷达：图书、影视、新店、展览、演出、市集、户外、其他
- 书店、高校、公园、博物馆、骑行、CityWalk、赏秋、雪景分类
- 搜索、分类筛选与季节推荐
- 北京攻略地图与高德导航
- 官方来源、核验日期与响应式移动端布局

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

然后打开 `http://localhost:3000`。

## Fork 成你的城市

1. 修改 `city.config.ts` 中的城市名、文案与分类。
2. 修改 `data/beijing.ts`，替换地点与活动。
3. 更新页面标题和 README。
4. 部署到 GitHub Pages、Cloudflare、Vercel 或 OpenAI Sites。

## 每日活动更新

`.github/workflows/daily-events.yml` 每天北京时间 00:00 和 12:00 访问配置的北京公共信息来源（UTC cron：`0 4,16 * * *`），将新发现写入 `data/daily-discoveries.json`，构建通过后自动提交。GitHub 调度可能延迟；手动运行仍可用，本地执行 `npm run events:sync`。线上构建发布须由部署平台关联仓库，浏览器不会自动拉取 GitHub 的新提交。

新发现按类别轮流展示，分类筛选同步作用于消息。剔除书单、内部工作通知和可识别的过旧链接，保留首次发现时间，不把重新抓取当作新发布。新闻标题分类是启发式规则，详情及活动有效期仍需查原文。

生活攻略放在 `data/lifestyle.ts`，编辑路线放在 `data/life-routes.ts`。美食、酒吧等分类同时展示常驻去处，不会因没有新闻而空白。路线时间、预算是编辑估算。赏秋数据目录按年更新，未宣称接通实时红叶 API。

自动发现用于建立线索池；页面中的重点活动仍保留来源、有效期和最后核验日期，方便出发前再次确认。

数据里的 `x` / `y` 是站内概览地图上的百分比位置；`mapUrl` 是外部导航链接。长期地点与临时活动分开保存；活动必须有 `start` 和 `end`，页面会自动显示状态。

MIT

## 可选攻略与地图 Skills

- [Jhins Trip Planner](https://github.com/jhinzzz/jhins-travel-guide-skills)：路线、餐饮、交通与天气规划。
- [MapLibre cartography / tile sources](https://github.com/maplibre/maplibre-agent-skills)：地图样式、标注和底图接入。

这些技能运行在开发助手中，不是网站运行依赖，也不会由活动定时任务执行。小红书链接目前是话题搜索入口，未接入登录态笔记自动采集。

## 五城活动更新

- 北京：原有公共活动来源；上海、广州、深圳、杭州：豆瓣同城公开活动列表。
- 四城分别采集综合、展览、电影、音乐、运动、聚会六个列表，提取活动日期、地点、价格原文与链接。小红书仍是搜索入口，未接入账号或笔记采集。
- `npm run events:sync:cities` 更新 `data/city-discoveries/`；`status.json` 记录来源成功、失败及最近成功时间。
- 自动任务按北京时间 00:00、12:00 尝试更新五城；来源失败保留尚未结束的历史活动，不把失败标作成功。GitHub 定时触发可能延迟。
- 季节主题是长期编辑攻略，不代表当年节庆或花期已经确认。
- 城市独立地址：`/beijing`、`/shanghai`、`/guangzhou`、`/shenzhen`、`/hangzhou`，导航固定在顶部。
