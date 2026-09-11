// ==========================================
// 项目数据 / Projects Data
//
// 这个文件控制两个地方：
// 1. 首页的「Featured Projects」横向卡片（走 longDescription / features）
// 2. /projects 页面的项目网格（走 description / technologies / category）
//
// 内容来源：个人工作经历（友电国际 + 南昌水岚州交通项目）
// ==========================================

// 分类：决定 /projects 页面的筛选按钮
export type ProjectCategory =
  | "engineering" // 工程项目 / 施工
  | "digital" // 独立站 / 国际站 / 数字化
  | "supply-chain" // 供应链
  | "product"; // 产品与硬件设计

// 分类的中文标签，改这里就能改筛选按钮的文字
export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  engineering: "工程项目",
  digital: "数字化与外贸",
  "supply-chain": "供应链",
  product: "产品设计",
};

export interface Project {
  id: string;
  title: string;

  // 短描述：/projects 页面的卡片用这句
  description: string;

  // 长描述：首页 Featured Projects 用这句
  longDescription: string;

  // 标签：会显示成小圆角标签
  technologies: string[];

  // 关键成果：首页每条项目最多显示前 4 条
  features: string[];

  // ⚠️ 项目配图：目前复用的是已有图片。
  // 建议换成你真实的项目照片（现场照片、设备照片、后台截图等），
  // 放进 public/images/projects/ 下，然后把路径改成新的。
  image: string;

  demoUrl?: string;
  githubUrl?: string;

  // 项目周期
  period: string;

  category: ProjectCategory;
}

export const projects: Project[] = [
  {
    id: "nanchang-water-project",
    title: "南昌水岚州交通项目 · 现场施工负责",
    description:
      "以公司名义参与全国招投标项目，负责现场外包施工团队管理与施工进度、工艺把控。",
    longDescription:
      "统筹南昌水岚州交通项目的现场外包施工。工作覆盖招投标、施工管理到现场复勘的完整链条：使用公司名义参加全国范围内的招投标项目，独立完成技术标与商务标标书制作，并参与线上及线下开标；中标后负责外包施工团队的日常管理与协调，把控施工进度与施工工艺，并主导现场复勘工作。",
    technologies: [
      "招投标",
      "技术标 / 商务标",
      "线上 / 线下开标",
      "外包团队管理",
      "施工进度管理",
      "施工工艺把控",
      "现场复勘",
    ],
    features: [
      "使用公司名义参加全国招投标项目",
      "独立完成技术标、商务标标书文件制作",
      "参与线上开标与线下开标全流程",
      "管理协调外包施工团队",
      "统筹施工进度与施工工艺把控",
      "主导项目现场复勘",
    ],
    image: "/images/projects/community-dashboard/community.webp",
    period: "早期经历",
    category: "engineering",
  },
  {
    id: "youpower-global-channels",
    title: "友电国际 · 独立站与阿里巴巴国际站建设",
    description:
      "主导外贸独立站从 0 到 1 建设，并负责阿里巴巴国际站店铺运营，累计成交 20 家客户。",
    longDescription:
      "主导公司海外获客渠道从 0 到 1 的搭建。独立站方面，基于 WordPress 生态完成全站建设：使用 NameSilo 管理域名、Hostinger 部署主机、Elementor 搭建页面、SEOPress 完成站内 SEO 配置，面向全球市场实现从 0 到 1 的线下实质性询盘。国际站方面，作为项目负责人主导店铺从 0 到 1 建设，完成入驻、店铺装修、产品上架、关键词优化与询盘转化体系搭建，累计获取潜在客户 60+ 家公司，成交客户 20 家，跑通从建站到成交的最小业务闭环。",
    technologies: [
      "WordPress",
      "Elementor",
      "NameSilo",
      "Hostinger",
      "SEOPress",
      "站内 SEO",
      "阿里巴巴国际站",
      "关键词优化",
      "询盘转化",
    ],
    features: [
      "独立站从 0 到 1 建成并产生实质询盘",
      "基于 WordPress 生态完成全站搭建",
      "NameSilo 域名管理 + Hostinger 主机部署",
      "Elementor 页面搭建 + SEOPress 站内 SEO",
      "国际站累计获取潜在客户 60+ 家公司",
      "成交客户 20 家，跑通建站到成交闭环",
    ],
    image: "/images/projects/portfolio-v1/portfolio4.webp",
    period: "友电国际",
    category: "digital",
  },
  {
    id: "youpower-supply-chain",
    title: "友电国际 · 充电桩产品供应链从 0 到 1",
    description:
      "主导充电桩产品供应链搭建，导入 5 家合格供应商，采购成本相较成立初期降低 27%。",
    longDescription:
      "作为外贸充电桩供应链项目负责人，主导充电桩产品供应链从 0 到 1 的搭建。工作覆盖供应商开发、样品认证、成本谈判、质量交付与出口配套的完整链路，最终导入 5 家合格供应商，支撑 20 款产品实现量产，采购成本相较公司成立初期降低 27%，为外贸订单交付打下稳定的供应基础。",
    technologies: [
      "供应商开发",
      "样品认证",
      "成本谈判",
      "质量交付",
      "出口配套",
      "量产导入",
      "成本优化",
    ],
    features: [
      "主导充电桩供应链从 0 到 1 搭建",
      "完成供应商开发与样品认证体系",
      "导入 5 家合格供应商",
      "支持 20 款产品实现量产",
      "采购成本相较成立初期降低 27%",
      "建立成本谈判与质量交付标准",
    ],
    image: "/images/projects/syncverse/syncverse.webp",
    period: "友电国际",
    category: "supply-chain",
  },
  {
    id: "youpower-product-design",
    title: "友电国际 · 充电桩硬件结构 / UI / 主控版本设计统筹",
    description:
      "统筹充电桩产品设计，完成 2 款主控版本、5 版结构设计、3 套 UI 方案并推动量产导入。",
    longDescription:
      "作为充电桩产品设计统筹负责人，主导硬件结构、UI 交互与主控版本从 0 到 1 的规划。对外统筹供应商协同开发，对内推动设计评审与打样验证，最终完成 2 款主控版本、5 版结构设计、3 套 UI 方案，并推动统筹打样、测试、认证与量产导入全流程，直接支撑外贸订单交付。",
    technologies: [
      "硬件结构设计",
      "UI 交互设计",
      "主控版本规划",
      "供应商协同",
      "打样与测试",
      "产品认证",
      "量产导入",
    ],
    features: [
      "主导硬件结构 / UI / 主控版本从 0 到 1 规划",
      "统筹供应商完成 2 款主控版本",
      "完成 5 版硬件结构设计",
      "输出 3 套 UI 交互方案",
      "推动打样、测试与产品认证",
      "完成量产导入并支撑外贸订单交付",
    ],
    image: "/images/projects/portfolio-v2.png",
    period: "友电国际",
    category: "product",
  },
  {
    id: "brazil-ocpp-platform",
    title: "巴西 OCPP 平台开发统筹",
    description:
      "协助国内平台商开发 OCPP 平台，支持 PIX / 信用卡支付与葡萄牙语 UI。",
    longDescription:
      "协助项目负责人推进巴西市场 OCPP 平台建设，作为国内平台商与业务端之间的对接角色，参与平台开发、OCPP 协议对接、测试上线与远程运维。平台支持 PIX 与信用卡支付，并完成葡萄牙语 UI 适配，满足巴西本地用户的支付习惯与语言环境。",
    technologies: [
      "OCPP 协议",
      "平台开发统筹",
      "协议对接",
      "测试上线",
      "远程运维",
      "PIX 支付",
      "信用卡支付",
      "葡萄牙语 UI",
      "本地化适配",
    ],
    features: [
      "协助国内平台商完成 OCPP 平台开发",
      "负责 OCPP 协议对接与联调",
      "参与平台测试上线与远程运维",
      "支持 PIX 与信用卡支付",
      "完成葡萄牙语 UI 本地化适配",
      "打通巴西本地充电业务流程",
    ],
    image: "/images/student-result-analyzer/result.webp",
    period: "友电国际 · 巴西市场",
    category: "digital",
  },
];
