"use client";

import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { DarkCurveSweepUp, DarkCurveSweepDown } from "./curve-transitions";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const introTextControls = useAnimationControls();
  const curveUpControls = useAnimationControls();
  const counterControls = useAnimationControls();
  const curveDownControls = useAnimationControls();

  const [showOverlays, setShowOverlays] = useState(true);
  const [percent, setPercent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    const sequence = async () => {
      try {
        // Step 1 + 2 并行：文字动画和第一段曲线扫屏同时进行。
        // 原来是 await 串行，白白多等 1.2 秒。
        await Promise.all([
          introTextControls.start("animate"),
          curveUpControls.start("animate"),
        ]);

        // Step 3: 显示百分比进度
        setIsRunning(true);
        await counterControls.start("animate");

        // Step 4: 第二段曲线扫屏，揭开首页内容
        await curveDownControls.start("animate");

        // Hide overlays to reveal home content
        setShowOverlays(false);
        onComplete();
      } catch (err) {
        console.error("Preloader animation failed", err);
      } finally {
        document.body.style.overflow = "";
      }
    };

    sequence();

    return () => {
      document.body.style.overflow = "";
    };
  }, [introTextControls, curveUpControls, counterControls, curveDownControls, onComplete]);

  // RequestAnimationFrame percentage counter
  useEffect(() => {
    if (!isRunning) return;

    const duration = 1400; // time in ms（原来是 2800，配合整体压缩到约 3 秒）
    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      setPercent(Math.round(eased * 100));

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isRunning]);

  if (!showOverlays) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none w-screen h-screen select-none font-sans">
      {/* 1. Solid Pre-Load Backdrop Layer */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={introTextControls}
        variants={{
          animate: {
            opacity: [1, 1, 0],
            transition: {
              duration: 0.8,
              times: [0, 0.72, 1],
              ease: "easeInOut"
            }
          }
        }}
        className="absolute inset-0 bg-[#000000] flex items-center justify-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={introTextControls}
          variants={{
            animate: {
              opacity: [0, 1, 1, 0],
              y: [15, 0, 0, -10],
              transition: {
                duration: 0.8,
                times: [0, 0.25, 0.7, 1],
                ease: "easeInOut"
              }
            }
          }}
          className="text-white text-3xl md:text-5xl uppercase tracking-[0.2em] font-light text-center px-4"
        >
          Are You Ready?
        </motion.h1>
      </motion.div>

      {/* 2. Curve Sweep Up Transition */}
      <DarkCurveSweepUp controls={curveUpControls} />

      {/* 3. Progress Counter Dashboard Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={counterControls}
        variants={{
          animate: {
            opacity: [0, 1, 1, 0],
            transition: {
              duration: 1.45,
              times: [0, 0.1, 0.85, 1],
              ease: "easeInOut"
            }
          }
        }}
        className="absolute inset-0 flex items-center justify-center z-30"
      >
        <div className="flex flex-col items-center gap-5 w-[300px] md:w-[460px]">
          {/* 加载文案
              原先是 "INITIALIZING PORTFOLIO"（偏机械感）。
              现改为中英双行，更贴合"个人 IP + 新能源出海"的定位。
              想换文案只改下面这两个 span 即可。 */}
          <div className="flex flex-col items-center gap-1.5 w-full">
            <span className="text-white/85 text-sm md:text-base tracking-[0.35em] uppercase font-mono">
              CONNECTING TO KEVIN SHI
            </span>
            <span className="text-white/45 text-[11px] md:text-xs tracking-[0.3em]">
              正在接入 · 李世豪
            </span>
          </div>

          {/* 进度百分比 */}
          <span className="text-white/80 text-sm md:text-base font-mono tabular-nums tracking-widest">
            {percent}%
          </span>

          {/* 进度条：从 2px 加粗到 5px，并加了柔光 */}
          <div className="relative w-full h-[5px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-white/90 shadow-[0_0_14px_rgba(255,255,255,0.65)]"
              initial={{ width: "0%" }}
              variants={{
                animate: {
                  width: "100%",
                  transition: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }
                }
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* 4. Curve Sweep Down Transition */}
      <DarkCurveSweepDown controls={curveDownControls} />
    </div>
  );
}
