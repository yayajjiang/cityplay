# CityPlay

> Your city is a checklist.

一个漂亮、低维护、可 Fork 的个人城市游玩清单。默认数据是北京，无账号、无数据库、无后端。

## 功能

- 最近活动与自动过期状态
- 书店、高校、公园、博物馆、骑行、CityWalk、赏秋、雪景分类
- 搜索、筛选、想去 / 去过 / 完成度
- 本地添加私人地点、地图概览与高德导航
- JSON 导入 / 导出、响应式移动端布局

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

然后打开 `http://localhost:3000`。你的“想去 / 去过”、私人地点和备注会自动保存在当前浏览器中。

## Fork 成你的城市

1. 修改 `city.config.ts` 中的城市名、文案与分类。
2. 修改 `data/beijing.ts`，替换地点与活动。
3. 更新页面标题和 README。
4. 部署到 GitHub Pages、Cloudflare、Vercel 或 OpenAI Sites。

数据里的 `x` / `y` 是站内概览地图上的百分比位置；`mapUrl` 是外部导航链接。用户状态保存在浏览器 `localStorage` 中。长期地点与临时活动分开保存；活动必须有 `start` 和 `end`，页面会自动显示状态。

MIT
