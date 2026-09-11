"use client";

import { coreSkills, type CoreSkill } from "@/data/skills";

// ==========================================
// 核心能力图标网格
//
// 数据来源：src/data/skills.ts（改内容只改那个文件）
// 这个组件只负责「怎么显示」。
// ==========================================

export function SkillsShowcase() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white py-20 px-6">
      {/* ======================================
          标题区域
      ====================================== */}
      <div className="text-center mb-16 z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
          核心能力 / Core Skills
        </h2>

        <p className="text-gray-400 text-lg font-light max-w-3xl mx-auto leading-relaxed">
          技术、项目、商务与数字化能力的交叉实践
          <br />
          Technical, project, business, and digital capabilities.
        </p>
      </div>

      {/* ======================================
          技能卡片区域

          手机：2列
          平板：4列
          大屏：6列
      ====================================== */}
      <div
        className="
          w-full
          max-w-5xl
          grid
          grid-cols-2
          md:grid-cols-4
          lg:grid-cols-6
          gap-x-8
          gap-y-14
          place-items-center
        "
      >
        {coreSkills.map((skill) => (
          <SkillIcon key={skill.nameEn} skill={skill} />
        ))}
      </div>
    </section>
  );
}

// ==========================================
// 单个技能卡片
// ==========================================
function SkillIcon({ skill }: { skill: CoreSkill }) {
  const Icon = skill.icon;

  return (
    <div
      className="
        group
        flex
        flex-col
        items-center
        justify-start
        w-full
        max-w-[160px]
        min-h-[150px]
        text-center
      "
    >
      {/* ======================================
          图标区域

          每个图标尺寸完全一致
      ====================================== */}
      <div
        className="
          relative
          w-20
          h-20
          flex
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          transition-all
          duration-300
          group-hover:bg-white/[0.08]
          group-hover:border-white/20
          group-hover:-translate-y-2
          group-hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)]
        "
      >
        {/* 鼠标悬停光晕 */}
        <div
          className="
            absolute
            inset-0
            rounded-2xl
            bg-white/5
            opacity-0
            blur-xl
            group-hover:opacity-100
            transition-opacity
            duration-300
          "
        />

        {/* 技能图标 */}
        <Icon
          className="
            relative
            z-10
            w-9
            h-9
            text-zinc-300
            transition-all
            duration-300
            group-hover:text-white
            group-hover:scale-110
          "
        />
      </div>

      {/* ======================================
          中文名称
          固定高度，避免一行/两行不一致导致上下不齐
      ====================================== */}
      <div className="mt-4 min-h-[24px] flex items-center justify-center">
        <span className="text-sm font-semibold text-white leading-tight">
          {skill.name}
        </span>
      </div>

      {/* ======================================
          英文名称
          同样固定高度
      ====================================== */}
      <div className="mt-1 min-h-[32px] flex items-start justify-center">
        <span
          className="
            text-xs
            text-zinc-500
            leading-snug
            group-hover:text-zinc-300
            transition-colors
            duration-300
          "
        >
          {skill.nameEn}
        </span>
      </div>
    </div>
  );
}
