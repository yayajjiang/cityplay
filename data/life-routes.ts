import type { CityKey } from './cities';
export type LifeRoute = {id:string;city:CityKey;title:string;need:string[];duration:string;budget:string;season:string;transport:string;tips:string;stops:[string,string,string][]};
export const lifeRoutes:LifeRoute[] = [
  {
    "id": "hutong-date",
    "city": "beijing",
    "title": "一杯咖啡，走进胡同",
    "need": [
      "独处放空",
      "约会",
      "下班两小时"
    ],
    "duration": "2–3小时",
    "budget": "建议预留 ¥50–120 / 人",
    "season": "四季 · 午后",
    "transport": "雍和宫站出发，胡同步行；参观国子监另留时间",
    "tips": "这条路线不强制进景点，想慢一点就只选咖啡和散步。",
    "stops": [
      [
        "wudaoying-coffee",
        "45分钟",
        "先坐下来喝杯咖啡，挑一两家小店。"
      ],
      [
        "guozijian",
        "45分钟",
        "散步到成贤街看古建；入馆另确认门票与开放。"
      ],
      [
        "bell-drum",
        "45分钟",
        "继续向鼓楼方向走，也可坐车结束行程。"
      ]
    ]
  },
  {
    "id": "longfusi-night",
    "city": "beijing",
    "title": "隆福寺：从看展到微醺",
    "need": [
      "朋友聚会",
      "夜生活",
      "约会"
    ],
    "duration": "3–4小时",
    "budget": "建议预留 ¥150–300 / 人",
    "season": "四季 · 下午至晚间",
    "transport": "东四站出发，隆福寺与钱粮胡同步行衔接",
    "tips": "展览票单独确认；餐吧可直接作为晚饭，饮酒后选择公共交通或打车。",
    "stops": [
      [
        "longfusi",
        "60–90分钟",
        "先看当期展览或逛文创街区。"
      ],
      [
        "jing-a-longfusi",
        "90分钟",
        "晚饭配精酿，朋友多时先订桌。"
      ]
    ]
  },
  {
    "id": "art-beer",
    "city": "beijing",
    "title": "798 看展，再喝一杯",
    "need": [
      "朋友聚会",
      "约会",
      "夜生活"
    ],
    "duration": "半天",
    "budget": "建议预留 ¥180–350 / 人，展票另计",
    "season": "四季 · 午后",
    "transport": "导航至798艺术区，园内步行",
    "tips": "先选具体展览再订票；京A官网列周一不营业，临时变更以门店为准。",
    "stops": [
      [
        "798",
        "2–3小时",
        "挑一个主要展览，再逛设计店。"
      ],
      [
        "jing-a-798",
        "90分钟",
        "在同一园区吃饭喝精酿。"
      ]
    ]
  },
  {
    "id": "cbd-afterwork",
    "city": "beijing",
    "title": "国贸下班后的两小时",
    "need": [
      "下班两小时",
      "朋友聚会",
      "夜生活"
    ],
    "duration": "2小时",
    "budget": "建议预留 ¥120–250 / 人",
    "season": "四季 · 晚间",
    "transport": "国贸站或金台夕照站步行至嘉里中心",
    "tips": "一站完成晚餐与小聚，无须跨区赶场。",
    "stops": [
      [
        "jing-a-cbd",
        "2小时",
        "餐吧晚餐、聊天，天气好时看看CBD夜景。"
      ]
    ]
  },
  {
    "id": "qianmen-family",
    "city": "beijing",
    "title": "前门慢游，陪长辈喝茶",
    "need": [
      "带长辈",
      "约会",
      "雨天室内"
    ],
    "duration": "半天",
    "budget": "建议预留 ¥100–250 / 人，演出票另计",
    "season": "四季 · 午后",
    "transport": "前门站出发，街区内步行；坐累了随时进店休息",
    "tips": "两站之间有户外路段；茶馆选座与演出时间先确认，不追求走完前门。",
    "stops": [
      [
        "beijingfang-coffee",
        "90分钟",
        "逛书店、咖啡与文创，安排一次坐下休息。"
      ],
      [
        "laoshe-tea",
        "90分钟",
        "喝茶或按订好的场次看演出。"
      ]
    ]
  },
  {
    "id": "kids-rain",
    "city": "beijing",
    "title": "雨天，带小朋友去探索",
    "need": [
      "亲子",
      "雨天室内"
    ],
    "duration": "2–3小时",
    "budget": "按场馆当日票价安排",
    "season": "四季 · 室内",
    "transport": "直接导航至中国儿童中心；馆内完成半日",
    "tips": "优先选择一馆，按孩子年龄核实分区，不把亲子日排得过满。",
    "stops": [
      [
        "laoniu-kids",
        "2–3小时",
        "亲子互动与动手探索，预留吃饭和休息时间。"
      ]
    ]
  },
  {
    "id": "craft-day",
    "city": "beijing",
    "title": "周末想学点手艺",
    "need": [
      "手作体验",
      "亲子",
      "雨天室内"
    ],
    "duration": "2小时起",
    "budget": "展览与体验费用向场馆确认",
    "season": "四季",
    "transport": "按预约课程地址导航，避免只凭场馆名跑空",
    "tips": "这是预约型玩法：先确认有课程，再出发；没有课程时改看展陈。",
    "stops": [
      [
        "xicheng-craft",
        "2小时",
        "先看非遗项目，再参加已确认的手作体验。"
      ]
    ]
  },
  {
    "id": "autumn-easy",
    "city": "beijing",
    "title": "赏秋入门，半天留给山林",
    "need": [
      "户外运动",
      "独处放空",
      "赏秋"
    ],
    "duration": "半天",
    "budget": "门票与交通按出发日核验",
    "season": "秋季 · 观赏期以公告为准",
    "transport": "导航至百望山森林公园，原路或园内环线返回",
    "tips": "先看园方开放公告、天气及当年彩叶情况；不把往年最佳日期当成今年实况。",
    "stops": [
      [
        "baiwangshan",
        "2–3小时",
        "走园内开放步道，选择适合自己体力的观景点。"
      ]
    ]
  },
  {
    "id": "free-river",
    "city": "beijing",
    "title": "不买票，也有好风景",
    "need": [
      "少花钱",
      "独处放空",
      "约会",
      "下班两小时"
    ],
    "duration": "2小时",
    "budget": "公共水岸散步 ¥0；餐饮交通另计",
    "season": "春夏秋 · 傍晚",
    "transport": "亮马桥站出发，沿开放水岸散步",
    "tips": "这条是步行路线，游船等收费项目不包含在内。",
    "stops": [
      [
        "liangma-river",
        "2小时",
        "沿河看日落，走累了就折返。"
      ]
    ]
  },
  {
    "id": "food-evening",
    "city": "beijing",
    "title": "今晚就为一顿饭出门",
    "need": [
      "朋友聚会",
      "美食",
      "夜生活"
    ],
    "duration": "2–3小时",
    "budget": "按选定餐厅菜单与人数安排",
    "season": "四季 · 晚饭",
    "transport": "北新桥或东直门站，按餐厅位置选下车站",
    "tips": "先和同伴确认口味、忌口和预算；热门门店考虑提前取号。",
    "stops": [
      [
        "guijie-food",
        "2–3小时",
        "从火锅、京菜或小龙虾里选一家，不用连吃多店。"
      ]
    ]
  },
  {
    "id": "jazz-evening",
    "city": "beijing",
    "title": "把今晚交给爵士",
    "need": [
      "约会",
      "音乐现场",
      "雨天室内"
    ],
    "duration": "一场演出",
    "budget": "演出票价及消费要求以主办方为准",
    "season": "按演出排期",
    "transport": "导航到Blue Note Beijing，按票面入场时间到达",
    "tips": "先核实具体演出日期、入场年龄和低消，再安排晚餐。",
    "stops": [
      [
        "blue-note",
        "约2小时",
        "留出入场时间，听完整场现场演奏。"
      ]
    ]
  }
];
export const needs = [
 {name:'全部',hint:'随意看看',categories:[],tags:[]},
 {name:'独处放空',hint:'阅读 · 咖啡 · 慢走',categories:['书店','咖啡茶馆'],tags:['放空','散步','独处放空']},
 {name:'朋友聚会',hint:'餐吧 · 精酿 · 聚餐',categories:['酒吧','美食'],tags:['朋友聚会']},
 {name:'约会',hint:'看展 · 日落 · 爵士',categories:['展览','音乐现场'],tags:['约会','日落','夜景']},
 {name:'亲子',hint:'互动 · 探索 · 自然',categories:['亲子'],tags:['亲子']},
 {name:'带长辈',hint:'慢节奏 · 喝茶 · 古建',categories:[],tags:['带长辈']},
 {name:'雨天室内',hint:'逛馆 · 电影 · 手作',categories:['博物馆','展览','影视','音乐现场','剧场','手作体验'],tags:['室内','雨天室内']},
 {name:'下班两小时',hint:'就近坐坐，轻松出门',categories:[],tags:['下班两小时']},
 {name:'夜生活',hint:'Bar · 精酿 · 夜宵',categories:['酒吧','音乐现场'],tags:['夜生活','夜景','夜游']},
 {name:'户外运动',hint:'骑行 · 跑步 · 登山',categories:['户外','骑行','运动'],tags:['登山','徒步','跑步']},
 {name:'少花钱',hint:'免费空间 · 水岸散步',categories:[],tags:['免费']},
 {name:'手作体验',hint:'非遗 · 动手做',categories:['手作体验'],tags:['手作']},
 {name:'美食',hint:'好好吃一顿',categories:['美食'],tags:[]},
 {name:'音乐现场',hint:'跟着排期选一场',categories:['音乐现场','剧场'],tags:[]},
 {name:'赏秋',hint:'先看叶况，再出发',categories:['赏秋'],tags:['红叶','银杏','彩林']},
] as const;
