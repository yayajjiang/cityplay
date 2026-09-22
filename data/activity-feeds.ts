import beijing from './daily-discoveries.json';
import shanghai from './city-discoveries/shanghai.json';
import guangzhou from './city-discoveries/guangzhou.json';
import shenzhen from './city-discoveries/shenzhen.json';
import hangzhou from './city-discoveries/hangzhou.json';
import type { Discovery } from '../lib/discoveries.mjs';
import type { CityKey } from './cities';
export const cityDiscoveryFeeds:Record<CityKey,Discovery[]>={beijing,shanghai,guangzhou,shenzhen,hangzhou};
