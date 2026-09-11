// ==========================================
// 工作经历数据 / Experience Data
//
// 这个文件只控制 /experience 页面的时间轴。
//
// 页面布局是左右交替的，第 1 条在左、第 2 条在右，以此类推。
// 增删条目不会破坏布局，可以放心调整。
// ==========================================

export type Experience = {
  id: string;

  // 公司 / 业务板块（显示在职位下方）
  company: string;

  // 职位名称
  role: string;

  // 时间区间
  duration: string;

  // 地点
  location: string;

  // 总体说明
  description: string;

  // 具体职责与成果，会显示成列表
  achievements: string[];

  // 能力 / 领域标签
  technologies: string[];

  // 任职类型：full-time / internship / part-time
  type: string;
};

export const experienceData: Experience[] = [
  {
    id: "youpower-global",
    company: "友电国际",
    role: "海外业务拓展 · 项目负责人",
    duration: "转岗后至今",
    location: "中国",
    description:
      "从投标板块转入友电国际，负责开发国际市场、打造并拓宽产品线。主导海外获客渠道、充电桩供应链、产品设计统筹以及巴西 OCPP 平台建设等多条业务线。",
    achievements: [
      "主导外贸独立站从 0 到 1 建设，并负责阿里巴巴国际站店铺建设与运营",
      "累计获取潜在客户 60+ 家公司，成交客户 20 家，跑通从建站到成交的最小闭环",
      "主导充电桩产品供应链从 0 到 1 搭建，导入 5 家合格供应商",
      "支撑 20 款产品量产，采购成本相较成立初期降低 27%",
      "统筹充电桩硬件结构 / UI / 主控版本设计，完成 2 款主控版本、5 版结构设计、3 套 UI 方案",
      "协助推进巴西 OCPP 平台开发、协议对接与测试上线",
    ],
    technologies: [
      "国际市场开发",
      "产品线规划",
      "供应链管理",
      "独立站运营",
      "阿里巴巴国际站",
      "跨境电商",
      "项目管理",
    ],
    type: "full-time",
  },
  {
    id: "youpower-gm-assistant",
    company: "友电",
    role: "总经理助理",
    duration: "约半年",
    location: "中国",
    description:
      "在友电任职期间担任总经理助理约半年，协助总经理推进跨部门事务与业务协调，随后转岗至友电国际负责海外业务。",
    achievements: [
      "协助总经理处理日常经营事务与跨部门协调",
      "参与公司业务推进与内部流程梳理",
      "积累从公司整体视角看业务与项目的经验",
      "半年后主动转岗至友电国际，转向海外市场开拓",
    ],
    technologies: ["跨部门协调", "业务推进", "流程梳理", "高管支持"],
    type: "full-time",
  },
  {
    id: "youpower-tendering",
    company: "友电",
    role: "投标板块 · 工程项目现场负责",
    duration: "入职初期",
    location: "南昌 · 中国",
    description:
      "以投标板块进入友电，负责全国范围内的招投标项目，并担任南昌水岚州交通项目现场外包施工负责人。",
    achievements: [
      "使用公司名义参加全国范围的招投标项目",
      "独立完成技术标与商务标标书文件制作",
      "参与线上开标与线下开标全流程",
      "管理协调外包施工团队，统筹施工进度",
      "把控施工工艺并主导项目现场复勘",
    ],
    technologies: [
      "招投标",
      "技术标 / 商务标",
      "开标流程",
      "外包团队管理",
      "施工管理",
      "现场复勘",
    ],
    type: "full-time",
  },
];
