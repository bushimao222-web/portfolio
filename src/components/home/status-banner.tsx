"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskedHeading } from "@/components/animations";

export function StatusBanner() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // ---------- 滚动联动的淡入淡出 ----------
  //
  // ⚠️ 原来这里是 opacity: [0, 0.8] → [1, 0]
  //    意思是「一进入视口就开始变透明」，等滚到页面中间时
  //    透明度已经掉到 0.5 以下，所以停留时内容是灰的。
  //    这就是用户反馈的"淡入淡出做反了"。
  //
  // 现在的曲线：
  //   0 → 0.45   完全不透明（进入、停留阶段，内容清晰）
  //   0.45 → 1   才逐渐淡出（离开视口时）
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [1, 1, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 24]);

  return (
    <section 
      ref={containerRef}
      className="relative z-20 w-full min-h-[80vh] flex items-center justify-center bg-black sticky top-0 overflow-hidden"
    >
      <motion.div 
        style={{ scale, opacity, borderRadius }}
        className="w-full h-full max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center bg-[#0A0A0A] border border-white/5 shadow-2xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="flex flex-col items-center gap-6 max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] mb-4">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-zinc-100"></span>
            </span>
            <span className="font-mono text-zinc-400">Current Status</span>
          </div>

          {/* 标题：中英各占一行，都居中
              中文用 MaskedHeading（按「字符」拆分，中文安全）。 */}
          <h2 className="flex flex-col items-center gap-3 font-display font-black tracking-tight">
            <span className="text-3xl md:text-5xl lg:text-6xl text-white">
              <MaskedHeading text="从想法到落地" delay={0.1} />
            </span>
            <span className="text-xl md:text-3xl lg:text-4xl text-zinc-500">
              <MaskedHeading text="From Ideas to Execution" delay={0.4} />
            </span>
          </h2>

          {/* 说明文字
              原来是 WordReveal（按空格拆词 + 逐个上浮），中文按空格拆不开，
              整段会被当成"一个超长单词"，所以排版很怪、还会挤成一大块。
              这里改成普通段落，字号略小、行高放宽、限制宽度，阅读更顺。 */}
          <p className="mt-8 max-w-3xl mx-auto text-base md:text-lg text-zinc-400 font-light leading-loose">
            覆盖新能源充电基础设施全链路 —— 海外获客渠道、充电桩产品供应链、产品与主控设计，以及 OCPP 平台落地。
          </p>
        </div>
      </motion.div>
    </section>
  );
}
