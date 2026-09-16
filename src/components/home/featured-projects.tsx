"use client";

import { useRef, useLayoutEffect, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects as allProjects } from "@/data/projects";

const BG = "#1C1B1A";

export function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [topOffsets, setTopOffsets] = useState<number[]>(allProjects.map(() => 0));

  // 是否启用「卡片层叠」布局。
  // 只在桌面端（≥768px）启用 sticky 层叠效果；
  // 手机上改成普通顺序排列，避免内容被裁切和滚动错乱。
  const [useStackedLayout, setUseStackedLayout] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setUseStackedLayout(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setUseStackedLayout(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // ==========================================
  // 堆叠偏移量的计算
  //
  // 【效果原理】每张卡片 position: sticky，top 依次递增。
  // 后面的卡片滑到自己的 top 位置就"钉住"，被再后面的卡片盖住，
  // 于是屏幕上始终能看到前面几张卡片的标题行叠在一起。
  //
  // 【关键】top 的递增步长必须是【标题行高度】，
  // 而不是整张卡片的高度：
  //
  //   top 步长 = 标题行高（约 110px）
  //     → 卡片 1 钉在 0，卡片 2 钉在 110，卡片 3 钉在 220 …
  //     → 每次只露出上一张的标题行，这才是"层叠"的观感
  //
  //   top 步长 = 整卡高（约 500px）
  //     → 卡片 3 钉在 1000px、卡片 4 钉在 1500px
  //     → 这些位置超出视口，卡片直接看不见了（曾经踩过的坑）
  //
  // ⚠️ 所以 ref 挂在整张卡片上，但只取【标题行】的高度来做步长。
  // ==========================================
  const recalcOffsets = useCallback(() => {
    // 用第一张卡片的标题行高度作为统一步长。
    // 用 querySelector 而不是 ref，是为了避免 ref 语义混淆
    // （ref 现在指向整张卡片，用来测整体高度）。
    const headerEl = containerRef.current?.querySelector<HTMLElement>(
      ".proj-header-row"
    );
    const headerHeight = headerEl?.getBoundingClientRect().height ?? 110;
    const step = Math.max(60, Math.round(headerHeight));

    setTopOffsets(allProjects.map((_, index) => index * step));
  }, []);

  // 首次挂载 + 窗口尺寸变化时重算
  useLayoutEffect(() => {
    recalcOffsets();
    window.addEventListener("resize", recalcOffsets);
    return () => window.removeEventListener("resize", recalcOffsets);
  }, [recalcOffsets]);

  // 字体加载完成后标题行高度会变，需要在之后再校一次
  useEffect(() => {
    const timer = setTimeout(recalcOffsets, 500);
    const raf = requestAnimationFrame(recalcOffsets);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [recalcOffsets]);

  // 桌面/手机布局切换时，标题行高度和字号都变了，必须重算。
  // （不重算会出现"手机端的偏移量被带到桌面端"导致的错位）
  useEffect(() => {
    recalcOffsets();
  }, [useStackedLayout, recalcOffsets]);

  return (
    <>
      <style>{`
        .proj-card {
          position: sticky;
          background: ${BG};
        }
        .proj-header-row {
          display: grid;
          grid-template-columns: 80px 1fr;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem 0;
          background: ${BG};
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          box-sizing: border-box;
        }
        .proj-num {
          font-family: monospace;
          font-weight: 800;
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1;
        }
        .proj-title {
          font-weight: 700;
          font-size: 1.8rem;
          color: #EDEDED;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 0;
        }
        .proj-body {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          padding: 2rem 0 4rem;
          background: ${BG};
        }
        @media (min-width: 768px) {
          .proj-header-row {
            grid-template-columns: 120px 1fr;
            padding: 2rem 0;
          }
          .proj-num {
            font-size: 2rem;
          }
          .proj-title {
            font-size: 2.5rem;
          }
          .proj-body {
            grid-template-columns: 1fr;
          }
        }
        /* 图片已隐藏，文字内容独占整行 */
        .proj-body-text {
          width: 100%;
          max-width: 100%;
        }

        /* ==========================================
           手机端：保留层叠效果，但压缩单卡高度
           ==========================================
           层叠效果（sticky）本身在手机上是可以成立的，
           之前出问题的真正原因是 recalcOffsets 只算了标题行高度，
           导致偏移量偏小、卡片互相重叠（已修复）。

           但手机上有个额外前提：单张卡片的高度要小于视口高度，
           否则 sticky 元素会被裁切、后续卡片会过早顶上来。

           所以手机上做两件事：
             1. 收紧标题行与正文的间距、字号
             2. 配合 JSX 里的 hidden md:block / md:flex，
                在手机端减少展示内容
           ========================================== */
        @media (max-width: 767px) {
          .proj-header-row {
            grid-template-columns: 48px 1fr;
            gap: 0.75rem;
            padding: 1.25rem 0 0.5rem;
          }
          .proj-num {
            font-size: 1.1rem;
          }
          .proj-title {
            font-size: 1.25rem;
          }
          .proj-body {
            padding: 0.75rem 0 2rem;
          }
        }
      `}</style>

      <section
        ref={containerRef}
        id="projects"
        className="w-full text-white relative z-10 py-24 md:py-32 px-6 md:px-12 rounded-t-[2.5rem] mt-[-2rem]"
        style={{ background: BG }}
      >
        <div className="max-w-6xl mx-auto flex flex-col">
          {/* Section Header */}
          <div className="flex flex-col items-start gap-4 mb-20 relative z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="font-mono text-zinc-400">Selected Work</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
              精选项目 <span className="text-zinc-500">/ Projects</span>
            </h2>
            <p className="max-w-xl text-zinc-400 text-sm md:text-base">
              从招投标与工程现场施工，到海外获客渠道、充电桩供应链与产品设计统筹。
            </p>
          </div>

          {/* Stacking Projects Cards Deck */}
          <div className="relative flex flex-col w-full mt-8">
            {allProjects.map((project, index) => {
              const formattedNum = `0${index + 1}`;
              
              return (
                <div
                  key={project.id}
                  className="proj-card w-full"
                  style={{
                    // 手机端不设 top，交给 CSS 走普通排列
                    top: useStackedLayout ? `${topOffsets[index]}px` : "auto",
                    zIndex: 10 + index,
                  }}
                >
                  <div className="proj-header-row">
                    <span className="proj-num">{formattedNum}</span>
                    <h3 className="proj-title uppercase">{project.title}</h3>
                  </div>

                  <div className="proj-body border-b border-white/10">
                    {/* 项目配图已按要求隐藏（只展示文字内容）。
                        如果想恢复图片，把下面这整个 div 的注释去掉即可。 */}
                    {/*
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A] group shadow-2xl">
                      {project.image ? (
                        <div className="relative w-full h-full">
                          <LiquidImage
                            src={project.image}
                            alt={project.title}
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                          <Code2 className="h-12 w-12 text-zinc-500 mb-3" />
                          <span className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em]">{project.category}</span>
                        </div>
                      )}
                    </div>
                    */}

                    {/* 文字内容：图片隐藏后占满整行 */}
                    <div className="proj-body-text flex flex-col justify-between items-start gap-4 md:gap-6">
                      <div className="space-y-4 w-full">
                        {/* 长描述：手机端隐藏。
                            否则单卡过高，超过视口后 sticky 层叠会被裁切。 */}
                        <p className="hidden md:block text-zinc-400 text-sm md:text-base font-light leading-relaxed">
                          {project.longDescription || project.description}
                        </p>

                        {/* 手机端改用短描述（一两句，不占高度） */}
                        <p className="md:hidden text-zinc-300 text-[13px] font-light leading-relaxed">
                          {project.description}
                        </p>

                        {/* 关键特性：文字加大加粗，让它成为这一块的视觉重点
                            ⚠️ 手机端和桌面端用两套独立列表，
                               而不是给同一个列表加「第 N 条隐藏」的条件类 ——
                               后者在项目条目数量不一致时容易出错。
                           手机端 3 条，桌面端 4 条。 */}
                        <div className="space-y-2 md:space-y-3">
                          <span className="block text-zinc-300 text-xs md:text-sm font-mono font-bold tracking-widest uppercase">
                            Key Features
                          </span>

                          {/* 手机端：3 条 */}
                          <ul className="md:hidden grid grid-cols-1 gap-y-2 text-[13px] font-semibold text-zinc-100">
                            {project.features.slice(0, 3).map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2.5">
                                <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                                <span className="leading-snug">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          {/* 桌面端：4 条，两列 */}
                          <ul className="hidden md:grid grid-cols-2 gap-x-8 gap-y-3 text-base font-semibold text-zinc-100">
                            {project.features.slice(0, 4).map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2.5">
                                <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                                <span className="leading-snug">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 技术标签：手机端隐藏（纯罗列信息，桌面上看更合适） */}
                        <div className="hidden md:block pt-2">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="border border-white/10 bg-white/5 text-[11px] md:text-xs font-medium text-zinc-200 py-1 px-2.5 rounded-md hover:bg-white/10 hover:text-white transition-colors"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* CTA Links */}
                      <div className="flex flex-wrap items-center gap-3 md:gap-4 w-full pt-3 md:pt-4 border-t border-white/10">
                        {project.demoUrl && (
                          <Link
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-black bg-white hover:bg-zinc-200 py-2.5 px-5 rounded-full transition-all duration-300 group/btn"
                          >
                            Live Showcase
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </Link>
                        )}
                        {project.githubUrl && (
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-zinc-400 hover:text-white py-2 px-4 rounded-full border border-white/20 hover:border-white transition-all group/git"
                          >
                            <Github className="h-4 w-4" />
                            Source Code
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 桌面端：留出 40vh 空白，让最后一张层叠卡片有"展开"的滚动空间。
              手机端是普通列表布局，不需要这段空白 ——
              否则滑动时会看到一大片空白区，感觉"页面卡住了"或"内容不见了"。 */}
          <div className={useStackedLayout ? "h-[40vh]" : "h-8"} />
        </div>
      </section>
    </>
  );
}
