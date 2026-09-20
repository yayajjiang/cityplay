import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'CityPlay · 北京城市游玩指南', description: '每天更新北京值得去的活动、展览、新店与季节玩法。', openGraph: { title: 'CityPlay · 北京城市游玩指南', description: '每天更新北京值得去的活动、展览、新店与季节玩法。', type: 'website' }, twitter: { card: 'summary', title: 'CityPlay · 北京城市游玩指南', description: '每天发现北京的新鲜玩法。' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><body>{children}</body></html>; }
