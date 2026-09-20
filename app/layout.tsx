import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'CityPlay · 北京，还没玩完', description: '一个漂亮、低维护、可 Fork 的个人城市游玩清单。', openGraph: { title: 'CityPlay · 北京，还没玩完', description: '发现今天值得去的，也记住以后想去的。', type: 'website' }, twitter: { card: 'summary', title: 'CityPlay · 北京，还没玩完', description: '你的城市，是一张慢慢完成的清单。' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><body>{children}</body></html>; }
