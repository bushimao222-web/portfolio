"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskedHeading, WordReveal } from "@/components/animations";

export function StatusBanner() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
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

          {/* 中文用 MaskedHeading：它按「字符」拆分，
               中文也安全（按空格拆分的 WordReveal 只适合英文句子）。
               标题做成单行，避免两行长短不一导致 <br /> 处错位。 */}
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white">
            <MaskedHeading text="从想法到落地" delay={0.1} />
            <span className="block mt-3 text-zinc-500 text-2xl md:text-4xl lg:text-5xl">
              <MaskedHeading text="From Ideas to Execution" delay={0.4} />
            </span>
          </h2>

          <div className="mt-8 text-lg md:text-2xl text-zinc-300 font-light leading-relaxed max-w-3xl mx-auto">
            <WordReveal
              text="覆盖新能源充电基础设施全链路 —— 海外获客渠道、充电桩产品供应链、产品与主控设计，以及 OCPP 平台落地。"
              delay={0.8}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
