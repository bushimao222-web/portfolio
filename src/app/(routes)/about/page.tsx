// 1. 导入 Next.js 提供的元数据（SEO）类型定义
import { Metadata } from "next";

// 2. 导入页面核心展示模块（如果你想改里面的文字细节，需要去这三个对应的文件路径修改）
// 对应文件：src/components/sections/about.tsx —— 控制网页上的个人简介、关于我的长文介绍
import { About } from "@/components/sections/about";
// 对应文件：src/components/sections/skills.tsx —— 控制技能树展示、专业能力标签、熟练度图标
import { SkillsShowcase } from "@/components/sections/skills";
// 对应文件：src/components/sections/achievements.tsx —— 控制个人成就、荣誉证书、项目里程碑
import { Achievements } from "@/components/sections/achievements";

/**
 * ==============================================================================
 * SEO 与网页标签配置区
 * ==============================================================================
 */
export const metadata: Metadata = {
  // 修改这里的字符串，会改变：浏览器顶部标签页显示的网页标题
  // 例如可以改成："关于我 | 李世豪" 或 "About | Kevin"
  title: "关于我 | 李世豪 · Kevin",

  // 修改这里的字符串，会改变：搜索引擎（Google/百度）收录时展示的网页摘要简介
  description:
    "了解我的背景、业务方向与核心能力：新能源充电基础设施、充电桩供应链、OCPP 平台、海外独立站与阿里巴巴国际站运营。",
};

/**
 * ==============================================================================
 * 页面主布局与组件渲染区
 * ==============================================================================
 */
export default function AboutPage() {
  return (
    <>
      {/* 
        className="pt-20"：Tailwind 样式类，代表 padding-top: 5rem (80px)。
        作用是给页面顶部预留出 80px 的间距，防止内容被顶部固定的导航栏（Navbar）遮挡。
      */}
      <div className="pt-20">
        
        {/* 模块 1：关于我板块（若不需要展示个人简介，将这行整行删掉即可从页面移除） */}
        <About />

        {/* 模块 2：技能板块（若不需要展示技术/业务技能，将这行整行删掉即可） */}
        <SkillsShowcase />

        {/* 模块 3：成就板块（若暂时没有奖项或证书想展示，直接把这行删掉或注释掉） */}
        <Achievements />

      </div>
    </>
  );
}
