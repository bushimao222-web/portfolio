"use client";

import { motion } from "framer-motion";
import {
  Award,
  Users,
  ArrowUpRight,
  Zap,
  Globe,
  Store,
  type LucideIcon,
} from "lucide-react";
import { StarsBackground } from "@/components/ui/stars-background";
import { achievementsData } from "@/data/achievements";

// ==========================================
// 首页「Impact & Recognition」卡片数据
//
// 这里只做「展示编排」：决定哪张卡片大、哪张卡片小。
// 文案内容全部取自 src/data/achievements.ts，
// 所以以后改内容只需要改那一个文件，这里不用动。
//
// icon 可选值：Zap / Globe / Store / Award / Users
// ==========================================

const ICONS: Record<string, LucideIcon> = {
  Zap,
  Globe,
  Store,
  Award,
  Users,
};

// bento 布局：md:col-span-2 md:row-span-2 表示占 2 列 2 行（大卡）
const LAYOUT: Record<string, string> = {
  "ev-charging-global": "md:col-span-2 md:row-span-2",
  "project-management": "md:col-span-1 md:row-span-1",
  "independent-website": "md:col-span-1 md:row-span-1",
  "alibaba-international": "md:col-span-2 md:row-span-1",
};

const ICON_KEYS: Record<string, string> = {
  "ev-charging-global": "Zap",
  "project-management": "Award",
  "independent-website": "Globe",
  "alibaba-international": "Store",
};

// 卡片右上角的高亮数据
const METRICS: Record<string, string> = {
  "ev-charging-global": "Global",
  "project-management": "Tendering",
  "independent-website": "0 → 1",
  "alibaba-international": "20 Deals",
};

// 卡片描述：用 impact 的前两条拼成一句，避免重复维护一套文案
function buildDescription(id: string, fallback: string): string {
  const achievement = achievementsData.find((item) => item.id === id);
  if (!achievement) return fallback;

  const points = achievement.impact.slice(0, 2).join("；");
  return `${achievement.description} ${points}。`;
}

export function Achievements() {
  const cards = achievementsData.map((achievement) => {
    const Icon = ICONS[ICON_KEYS[achievement.id]] ?? Award;

    return {
      id: achievement.id,
      icon: Icon,
      title: achievement.title,
      description: buildDescription(achievement.id, achievement.description),
      metric: METRICS[achievement.id] ?? "",
      className: LAYOUT[achievement.id] ?? "md:col-span-1 md:row-span-1",
    };
  });

  return (
    <section
      id="achievements"
      className="relative z-40 min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-black text-white py-24 md:py-32 rounded-t-[2.5rem] mt-[-2rem]"
    >
      <StarsBackground />

      {/* Very subtle top gradient to blend */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10" />

      <div className="relative z-10 text-center mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          <span className="font-mono text-zinc-400">Milestones</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-black tracking-tight text-white"
        >
          职业成果 <span className="text-zinc-600">/ Achievements</span>
        </motion.h2>
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(250px,auto)]">
          {cards.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className={`group relative rounded-3xl bg-[#0A0A0A] border border-white/5 overflow-hidden flex flex-col justify-between p-8 hover:border-white/20 transition-all duration-700 ${item.className}`}
              >
                {/* Sweep hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Top Header */}
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500">
                    <Icon className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors duration-500" />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500">
                      {item.metric}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="mt-12 relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-4 group-hover:translate-x-2 transition-transform duration-500">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed font-light text-sm md:text-base group-hover:text-zinc-300 transition-colors duration-500">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
