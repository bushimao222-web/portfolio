"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projectsForProjectsPage, CATEGORY_LABELS, type Project } from "@/data/projects";
import { Globe, Package, Cpu, HardHat } from "lucide-react";
import { StarsBackground } from "@/components/ui/stars-background";

// ==========================================
// 项目页面 / Projects
//
// 【卡片交互】静态显示文字 → 悬停切换成图片
//
//   默认状态：标题 + 描述 + 关键成果 + 标签（纯文字，便于快速扫读）
//   悬停状态：文字淡出，项目配图淡入
//
//   实现方式：文字层和图片层绝对定位叠在同一个卡片里，
//   用 opacity 交叉淡入淡出 —— 不用翻转/位移，
//   因为那些会让文字在过渡中变形、难以阅读。
//
//   ⚠️ 手机上（无悬停能力）用 max-md: 前缀强制显示图片、
//      隐藏文字层，避免出现一个点不动的空卡片。
// ==========================================

// 分类图标：key 需要和 data/projects.ts 里的 category 保持一致
const categoryIcons: Record<string, React.ReactNode> = {
  engineering: <HardHat className="h-3.5 w-3.5" />,
  digital: <Globe className="h-3.5 w-3.5" />,
  "supply-chain": <Package className="h-3.5 w-3.5" />,
  product: <Cpu className="h-3.5 w-3.5" />,
};

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // ⚠️ 用的是 projectsForProjectsPage（已过滤），不是完整的 projects。
  //    「南昌水岚州交通项目」在数据里标记了 hiddenOnProjectsPage，
  //    它只出现在首页「精选项目」，不在这里展示。
  const visibleProjects = projectsForProjectsPage;

  const filteredProjects =
    selectedCategory === "all"
      ? visibleProjects
      : visibleProjects.filter((project) => project.category === selectedCategory);

  // 筛选按钮：根据本页实际存在的分类动态生成，
  // 避免出现「点了某个分类却一条都不显示」的空分类
  const categories = [
    { value: "all", label: "全部 / All" },
    ...Array.from(new Set(visibleProjects.map((p) => p.category))).map(
      (category) => ({
        value: category,
        label: CATEGORY_LABELS[category],
      })
    ),
  ];

  return (
    <section className="relative z-30 min-h-screen bg-black text-white py-32 rounded-t-[2.5rem] mt-[-2rem] overflow-hidden">
      <StarsBackground />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* ---------- 标题 ---------- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="font-mono text-zinc-400">Portfolio</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
            项目 <span className="text-zinc-600">/ Projects</span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg font-light max-w-2xl mx-auto">
            从海外获客渠道、充电桩供应链，到产品设计统筹与 OCPP 平台落地。
            <br />
            悬停卡片可查看项目配图。
          </p>
        </motion.div>

        {/* ---------- 筛选按钮 ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-mono transition-all duration-300 ${
                selectedCategory === category.value
                  ? "bg-white text-black font-bold"
                  : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* ---------- 项目卡片 ---------- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 数量提示 */}
        <div className="mt-12 text-center">
          <span className="font-mono text-xs tracking-widest uppercase text-zinc-600">
            共 {filteredProjects.length} 个项目
          </span>
        </div>

      </div>
    </section>
  );
}

// ==========================================
// 单个项目卡片
//
// 卡片高度固定，文字层和图片层绝对定位重叠，
// 悬停时交叉淡入淡出。
// ==========================================
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="group relative h-[420px] md:h-[460px] rounded-3xl bg-[#0A0A0A] border border-white/10 overflow-hidden hover:border-white/25 transition-colors duration-500"
    >
      {/* ================= 图片层（悬停时显示） ================= */}
      <div
        className={[
          "absolute inset-0 transition-opacity duration-500 ease-out",
          // 手机上直接常显图片（没有悬停能力）
          "max-md:opacity-100",
          isHovering ? "md:opacity-100" : "md:opacity-0",
        ].join(" ")}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {/* 图片上压一层黑渐变，保证底部标题始终可读 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        {/* 图片状态下的底部标题 */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-400">
            {CATEGORY_LABELS[project.category]} · {project.period}
          </span>
          <h3 className="mt-2 text-xl md:text-2xl font-bold text-white leading-tight">
            {project.title}
          </h3>
        </div>
      </div>

      {/* ================= 文字层（默认显示） ================= */}
      <div
        className={[
          "absolute inset-0 p-6 md:p-8 flex flex-col transition-opacity duration-500 ease-out",
          // 手机上隐藏文字层，避免和图片层重叠
          "max-md:opacity-0 max-md:pointer-events-none",
          isHovering ? "md:opacity-0" : "md:opacity-100",
        ].join(" ")}
      >
        {/* 顶部：分类 + 序号 */}
        <div className="flex items-center justify-between mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-zinc-300 font-mono">
            {categoryIcons[project.category]}
            {CATEGORY_LABELS[project.category]}
          </span>
          <span className="font-mono text-xs text-zinc-600">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* 标题 */}
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-snug">
          {project.title}
        </h3>

        {/* 描述 */}
        <p className="mt-4 text-sm text-zinc-400 leading-relaxed font-light">
          {project.description}
        </p>

        {/* 关键成果 */}
        <ul className="mt-5 space-y-2 flex-1">
          {project.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <span className="mt-[7px] h-1 w-1 rounded-full bg-zinc-600 shrink-0" />
              <span className="text-[13px] text-zinc-300 leading-snug">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* 底部：标签 */}
        <div className="pt-5 border-t border-white/10">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono tracking-wide rounded bg-white/5 text-zinc-400 border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
