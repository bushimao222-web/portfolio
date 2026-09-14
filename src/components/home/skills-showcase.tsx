"use client";

import { motion } from "framer-motion";
import { StarsBackground } from "@/components/ui/stars-background";
import { coreSkills, type CoreSkill } from "@/data/skills";

// ==========================================
// 首页「核心能力 / Core Skills」
//
// 数据来源：src/data/skills.ts（与关于页共用同一份）
//
// 【布局】
//   固定在页面中间区域（max-w-4xl 居中），不横跨整页。
//   共 12 个技能，分成上下两行，每行 6 个。
//
// 【动画】两行反向滚动
//   第 1 行 → 向左滚动
//   第 2 行 → 向右滚动
//
//   ⚠️ 为什么要复制 4 份：
//      一行只有 6 个图标（约 1100px），而容器宽 896px。
//      如果内容宽度不够，滚动到一半就会露出空白，出现"断裂"。
//      复制 4 份后单份仍约 1100px，但整体 4400px，
//      移动 50%（= 2 份 = 2200px）后回到完全相同的位置，
//      所以视觉上是无缝循环。
//
//   如果以后删减技能够少（比如每行只剩 3 个），
//   可能出现空隙，就把 REPEAT 调大。
// ==========================================

const half = Math.ceil(coreSkills.length / 2);
const firstRow = coreSkills.slice(0, half); // 第 1 行 6 个
const secondRow = coreSkills.slice(half); // 第 2 行 6 个

// 复制份数（4 = 滚动的 50% 正好等于 2 份，回到原点无缝衔接）
const REPEAT = 4;

function repeatItems(items: CoreSkill[]) {
  return Array.from({ length: REPEAT }).flatMap((_, copy) =>
    items.map((skill, index) => ({
      skill,
      // 用「份数 + 下标」做 key，避免重复 key
      key: `${skill.nameEn}-${copy}-${index}`,
    }))
  );
}

export function SkillsShowcase() {
  const row1 = repeatItems(firstRow);
  const row2 = repeatItems(secondRow);

  return (
    <section className="relative z-30 bg-[#1C1B1A] rounded-t-[2.5rem] mt-[-2rem] py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
      <StarsBackground />

      {/* 中心径向渐变，增加纵深 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(28,27,26,0.5),transparent_85%)] pointer-events-none" />

      {/* ---------- 标题 ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 text-center mb-16 px-6"
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

      {/* ---------- 滚动区域：固定在中间，两侧做边缘淡出 ----------
           mask-image 让左右两端渐隐，这样图标是"从中心两侧淡入淡出"，
          而不是硬生生地从容器边缘切出来。 */}
      <div className="relative z-10 w-[90vw] max-w-4xl flex flex-col gap-10 md:gap-14 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        {/* 第 1 行：向左滚动 */}
        <div className="flex w-full overflow-hidden">
          <motion.div
            className="flex w-max gap-8 md:gap-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {row1.map(({ skill, key }) => (
              <SkillIcon key={key} skill={skill} />
            ))}
          </motion.div>
        </div>

        {/* 第 2 行：向右滚动 */}
        <div className="flex w-full overflow-hidden">
          <motion.div
            className="flex w-max gap-8 md:gap-12"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 38 }}
          >
            {row2.map(({ skill, key }) => (
              <SkillIcon key={key} skill={skill} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 单个技能图标
//
// 固定宽度（w-24 / md:w-28），保证四份复制后
// 每份的总宽度一致，滚动才能无缝衔接。
// ==========================================
function SkillIcon({ skill }: { skill: CoreSkill }) {
  const Icon = skill.icon;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="flex flex-col items-center group w-24 md:w-28 shrink-0 cursor-pointer"
    >
      <div className="relative">
        {/* 悬停光晕 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-4 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* 玻璃质感图标容器 */}
        <div className="relative z-10 p-3 md:p-4 rounded-2xl bg-[#111111] border border-white/5 group-hover:border-white/20 group-hover:bg-[#1A1A1A] transition-all duration-300 shadow-xl">
          <div className="w-10 h-10 md:w-14 md:h-14 relative flex items-center justify-center">
            <Icon className="w-8 h-8 md:w-10 md:h-10 text-zinc-400 group-hover:text-white transition-colors duration-300 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]" />
          </div>
        </div>
      </div>

      {/* 名称：默认就显示（原来是悬停才出现，移动端等于看不到） */}
      <span className="mt-4 text-center text-[11px] md:text-xs font-medium leading-tight text-zinc-400 group-hover:text-white transition-colors duration-300">
        {skill.name}
      </span>
      <span className="mt-0.5 text-center text-[10px] md:text-[11px] leading-tight text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">
        {skill.nameEn}
      </span>
    </motion.div>
  );
}
