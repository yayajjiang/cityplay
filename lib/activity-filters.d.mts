import type {Discovery} from './discoveries.mjs';
export function activityDistrict(item:Discovery,city:string):string;
export function activityDistricts(city:string):string[];
export function filterActivities<T extends Discovery>(items:T[],filters:{city:string;district?:string;ticket?:string}):T[];
