// ==========================================
// 核心技能数据 / Core Skills
//
// 这一份数据被两个地方使用：
// 1. 关于页「核心能力 / Core Skills」图标网格 —— src/components/sections/skills.tsx
// 2. 首页「Technical Skills」滚动画廊 —— src/components/home/skills-showcase.tsx
//
// 所以只需要在这里维护一次，两个页面自动同步。
//
// icon 只能是下面 import 进来的这些 lucide 图标之一。
// 想换图标时，在上面 import 里加一个，然后在这里引用。
// ==========================================

import {
  Zap,
  Network,
  Wrench,
  BriefcaseBusiness,
  FileText,
  PanelsTopLeft,
  Search,
  Bot,
  Store,
  HardHat,
  type LucideIcon,
} from "lucide-react";

export interface CoreSkill {
  // 中文名称
  name: string;

  // 英文名称
  nameEn: string;

  // 图标
  icon: LucideIcon;
}

// 一共 12 项：
// 关于页按 6 列排（正好两排）
// 首页滚动画廊上下两行各 6 个
export const coreSkills: CoreSkill[] = [
  {
    name: "新能源充电",
    nameEn: "EV Charging",
    icon: Zap,
  },
  {
    name: "OCPP 协议",
    nameEn: "OCPP Integration",
    icon: Network,
  },
  {
    name: "设备调试",
    nameEn: "Commissioning",
    icon: Wrench,
  },
  {
    name: "项目交付",
    nameEn: "Project Delivery",
    icon: BriefcaseBusiness,
  },
  {
    name: "招投标",
    nameEn: "Tendering",
    icon: FileText,
  },
  {
    name: "施工协调",
    nameEn: "Construction",
    icon: HardHat,
  },
  {
    name: "独立站建设",
    nameEn: "Website Building",
    icon: PanelsTopLeft,
  },
  {
    name: "SEO 优化",
    nameEn: "SEO & Growth",
    icon: Search,
  },
  {
    name: "国际站运营",
    nameEn: "Global E-commerce",
    icon: Store,
  },
  {
    name: "AI 工具",
    nameEn: "AI Tools",
    icon: Bot,
  },
  {
    name: "供应链管理",
    nameEn: "Supply Chain",
    icon: BriefcaseBusiness,
  },
  {
    name: "远程运维",
    nameEn: "Remote O&M",
    icon: Network,
  },
];
