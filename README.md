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

`.github/workflows/daily-events.yml` 每天北京时间 08:00 访问配置的北京公共信息来源，将新发现写入 `data/daily-discoveries.json`，构建通过后自动提交。也可以在 GitHub Actions 页面手动运行，或在本地执行 `npm run events:sync`。

自动发现用于建立线索池；页面中的重点活动仍保留来源、有效期和最后核验日期，方便出发前再次确认。

数据里的 `x` / `y` 是站内概览地图上的百分比位置；`mapUrl` 是外部导航链接。长期地点与临时活动分开保存；活动必须有 `start` 和 `end`，页面会自动显示状态。

MIT
