export type Discovery = { id:string; eventKey?:string; title:string; category:string; url:string; source:string; discoveredAt:string; lastSeenAt?:string; city?:string; start?:string; end?:string; location?:string; price?:string; sourceUrl?:string };
export const activityCategories: string[];
export function classifyDiscovery(title:string):string;
export function isDiscoveryRelevant(title:string):boolean;
export function isRecentDiscovery(item:Discovery,now?:number):boolean;
export function diverseDiscoveries<T extends Discovery>(items:T[],limit?:number,filter?:string):T[];
