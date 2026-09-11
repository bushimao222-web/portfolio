"use client";

import { motion } from "framer-motion";
import { StarsBackground } from "@/components/ui/stars-background";
import { coreSkills, type CoreSkill } from "@/data/skills";

// ==========================================
// 首页「Technical Skills」滚动画廊
//
// 数据来源：src/data/skills.ts（与关于页共用同一份）
//
// 原来是外链 skillicons.dev 的 logo 图片墙，
// 内容与个人方向不符（HTML/React/AWS 等），
// 而且其中 Pandas / NumPy / Matplotlib 三个都错误地
// 指向了 React 的图标。现改为本地图标，与主题一致、也更快。
// ==========================================

// 拆成上下两行做反向滚动
const half = Math.ceil(coreSkills.length / 2);
const firstRow = coreSkills.slice(0, half);
const secondRow = coreSkills.slice(half);

export function SkillsShowcase() {
  return (
    <section className="relative z-30 bg-[#1C1B1A] rounded-t-[2.5rem] mt-[-2rem] py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
      <StarsBackground />

      {/* Radial Gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(28,27,26,0.5),transparent_85%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 text-center mb-20 px-6"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          <span className="font-mono text-zinc-400">Toolkit</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight text-white">
          核心能力 <span className="text-zinc-500">/ Core Skills</span>
        </h2>
        <p className="text-zinc-400 text-lg font-light max-w-xl mx-auto">
          技术、项目、商务与数字化能力的交叉实践。
        </p>
      </motion.div>

      {/* Infinite Marquee Container */}
      <div className="relative z-10 w-full max-w-[100vw] overflow-hidden flex flex-col gap-8 md:gap-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {/* Row 1: Moves Left */}
        <div className="flex w-max">
          <motion.div
            className="flex gap-8 md:gap-12 pr-8 md:pr-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {/* Duplicate the array twice for seamless looping */}
            {[...firstRow, ...firstRow].map((skill, index) => (
              <SkillIcon key={`${skill.nameEn}-row1-${index}`} skill={skill} />
            ))}
          </motion.div>
        </div>

        {/* Row 2: Moves Right */}
        <div className="flex w-max self-end">
          <motion.div
            className="flex gap-8 md:gap-12 pr-8 md:pr-12"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {/* Duplicate the array twice for seamless looping */}
            {[...secondRow, ...secondRow].map((skill, index) => (
              <SkillIcon key={`${skill.nameEn}-row2-${index}`} skill={skill} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SkillIcon({ skill }: { skill: CoreSkill }) {
  const Icon = skill.icon;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col items-center group w-20 h-28 md:w-24 md:h-32 shrink-0 cursor-pointer"
    >
      <div className="relative">
        {/* Hover Glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-4 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* Glassmorphic Icon Container */}
        <div className="relative z-10 p-3 md:p-4 rounded-2xl bg-[#111111] border border-white/5 group-hover:border-white/20 group-hover:bg-[#1A1A1A] transition-all duration-300 shadow-xl">
          <div className="w-10 h-10 md:w-14 md:h-14 relative flex items-center justify-center">
            <Icon className="w-8 h-8 md:w-10 md:h-10 text-zinc-400 group-hover:text-white transition-colors duration-300 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]" />
          </div>
        </div>
      </div>

      <span className="mt-4 text-[10px] md:text-xs font-mono font-semibold tracking-wider text-zinc-500 group-hover:text-white transition-colors duration-300 whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
        {skill.name}
      </span>
    </motion.div>
  );
}
