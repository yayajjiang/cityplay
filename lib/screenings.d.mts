import type {Discovery} from './discoveries.mjs';
export function screeningCalendar(items:Discovery[],now?:number):{rows:(Discovery&{film:string;stamp:number})[];sources:number;films:number;sessions:number;addedToday:number};
