"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { StarsBackground } from "@/components/ui/stars-background";
import { achievementsData } from "@/data/achievements";

// ==========================================
// 首页「职业成果 / Achievements」
//
// 【设计思路】极简
// 之前是不对称的 bento 宫格，每张卡带一个图标和右上角标签，
// 版式零散、装饰偏多。现在改成规整的编号列表：
//
//   01 │ 标题
//      │ 说明
//      │ ── 关键词 · 关键词
//
// 序号用等宽字体，左侧一条细竖线做视觉锚点，
// 和站内的时间轴、页脚分隔线风格统一。
//
// 内容来源：src/data/achievements.ts
//   —— 改文案只改那个文件，这里完全不用动。
// ==========================================

export function Achievements() {
  return (
    <section
      id="achievements"
      className="relative z-40 flex flex-col justify-center items-center overflow-hidden bg-black text-white py-24 md:py-32 rounded-t-[2.5rem] mt-[-2rem]"
    >
      <StarsBackground />

      {/* 顶部渐变，和上一区块自然衔接 */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10" />

      <div className="relative z-10 container mx-auto px-6 max-w-5xl">

        {/* ---------- 标题 ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span className="font-mono text-zinc-400">Milestones</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            职业成果 <span className="text-zinc-600">/ Achievements</span>
          </h2>
        </motion.div>

        {/* ---------- 编号列表 ---------- */}
        <div className="flex flex-col">
          {achievementsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="group relative border-t border-white/10 last:border-b py-8 md:py-10"
            >
              {/* 悬停时左侧出现的短竖线 */}
              <div className="absolute left-0 top-8 md:top-10 h-0 w-[2px] bg-white group-hover:h-[calc(100%-4rem)] md:group-hover:h-[calc(100%-5rem)] transition-all duration-500" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pl-0 group-hover:pl-6 transition-all duration-500">

                {/* 序号 */}
                <div className="md:col-span-1">
                  <span className="font-mono text-sm md:text-base font-bold text-zinc-600 group-hover:text-white transition-colors duration-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* 标题 + 说明 */}
                <div className="md:col-span-7">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-zinc-400 font-light leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>

                {/* 关键词：取 impact 的前三条，只做简洁罗列 */}
                <div className="md:col-span-4 md:text-right">
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
                    {item.impact.slice(0, 3).map((point) => (
                      <li
                        key={point}
                        className="text-xs md:text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-zinc-600 group-hover:text-white transition-colors duration-500">
                    {item.organization}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
