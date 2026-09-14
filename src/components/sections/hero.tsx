"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ANIMATION_VARIANTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Typewriter,
  MagneticButton,
  MaskedHeading
} from "@/components/animations";
import { ChevronDown } from "lucide-react";
import { StarsBackground } from "@/components/ui/stars-background";

// ==========================================
// 首页姓名 + 悬停浮出照片
//
// 【尺寸调整】
// 照片尺寸在 className 里，两处要一起改（保持一致）：
//   w-64 h-80          → 手机 (256 x 320)
//   md:w-[26rem] md:h-96 → 桌面 (416 x 384)
// 1 个 Tailwind 间距单位 = 4px。
//
// ⚠️ 触发区高度 = 照片高度。再往上调（比如 md:h-[30rem]）可能会遮住下方按钮。
//
// 照片文件：public/images/profile-hero.jpg
//
// 【交互逻辑说明】
// 照片是「打开后要移动到照片上也保持显示」的，
// 所以不能用纯 CSS 的 group-hover（鼠标一离开文字就关），
// 这里改用 React 状态控制：
//   鼠标进入 → 打开
//   鼠标离开整个区域（文字 + 照片）→ 关闭
// 因为触发区(trigger)的高度就等于照片高度，
// 鼠标从名字移到照片上时仍然在区域内，所以不会关闭。
//
// 手机端没有悬停概念，照片改为常驻显示（用 max-md: 前缀控制）。
// ==========================================

function AnimatedName() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 照片是否展开
  const [isOpen, setIsOpen] = useState(false);

  // 是否为手机/窄屏。手机没有悬停概念，照片改为常驻显示。
  // 初始值是 false（和服务器渲染一致），挂载后再根据真实宽度修正，
  // 避免服务端/客户端渲染不一致导致的水合报错。
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // 照片/姓名的展开状态：手机端始终展开，桌面端看 isOpen
  const show = isOpen || isMobile;

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 40; // 最大位移 20px
    const y = (clientY / innerHeight - 0.5) * 40;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  // 鼠标离开整个区域时：关闭照片 + 视差归零
  const handleMouseLeave = () => {
    setIsOpen(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* 照片：绝对定位居中。
          ⚠️ 关键：状态相关的样式（透明度/缩放/旋转/模糊）全部用内联 style 控制，
             不再用 md: 前缀的 Tailwind 类。
             原因：之前 md:blur-[6px] 和 md:blur-0 同时存在，谁生效取决于
             Tailwind 的生成顺序，结果就是改了没反应。

          pointer-events-none 让鼠标事件穿透到下面的触发区，
          这样鼠标停在照片任何位置都还在区域内，不会关闭。 */}
      <motion.div
        style={{
          x: useTransform(smoothX, (x) => -x * 1.5),
          y: useTransform(smoothY, (y) => -y * 1.5),
          // 展开：清晰、放大、轻微右倾；收起：模糊、缩小、左倾
          opacity: show ? 1 : 0,
          transform: show ? "scale(1) rotate(3deg)" : "scale(0.9) rotate(-6deg)",
          filter: show ? "blur(0px)" : "blur(6px)",
          transition:
            "opacity 500ms ease-out, transform 500ms ease-out, filter 500ms ease-out",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-64 h-80 md:w-[26rem] md:h-96 pointer-events-none"
      >
        <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-white/20 bg-[#0A0A0A]">
          <Image
            src="/images/profile-hero.jpg"
            alt="李世豪 Kevin"
            fill
            sizes="(max-width: 768px) 256px, 416px"
            className="object-cover object-[center_25%]"
            priority
          />
        </div>
      </motion.div>

      {/* 姓名：垂直水平居中在容器里。
          ⚠️ 这里绝对不能用 h-0 —— 姓名自带 overflow-hidden（遮罩动画需要），
             高度为 0 会把文字上下裁掉，看起来就是"字变小/被切平"。

          容器高度由 h-80 / md:h-96 决定（= 照片高度），
          所以鼠标可以在「文字 ↔ 照片」之间自由移动而不关闭，
          容器也只占照片那一块，不会盖住下方按钮。

          z-40 高于照片，保证悬停事件由它接收。 */}
      <div className="relative z-40 h-80 md:h-96 flex items-center justify-center">
        <motion.h1
          style={{
            x: smoothX,
            y: smoothY,
            // 照片展开时姓名完全淡出。
            // 故意用 opacity 0 而不是半透明 ——
            // 姓名文字比照片宽，只要留一点透明度就会从照片左右两边露出来。
            opacity: show ? 0 : 1,
            filter: show ? "blur(4px)" : "blur(0px)",
            transition: "opacity 400ms ease-out, filter 400ms ease-out",
          }}
          className="flex items-center font-display text-5xl md:text-7xl lg:text-8xl font-black overflow-hidden select-none pb-4 tracking-tighter cursor-pointer"
        >
          <MaskedHeading text="李世豪 · Kevin" delay={0.3} />
        </motion.h1>
      </div>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <span className="text-[10px] text-zinc-500 tracking-[0.4em] uppercase font-mono font-bold">Scroll to explore</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-4 w-4 text-zinc-400" />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 600], [1, 0.95]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const borderRadius = useTransform(scrollY, [0, 500], [0, 24]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden sticky top-0 z-0 bg-[#000000]"
    >
      <StarsBackground />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        style={{ scale, opacity, borderRadius }}
        className="container mx-auto px-4 py-20 relative z-10 origin-top text-center max-w-5xl flex flex-col items-center justify-center"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          className="mx-auto flex flex-col items-center"
        >


          <motion.div
            variants={ANIMATION_VARIANTS.fadeDown}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs tracking-[0.2em] uppercase font-mono text-zinc-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            WELCOME TO MY WORLD
          </motion.div>

          <AnimatedName />

          <motion.div
            variants={ANIMATION_VARIANTS.fadeUp}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl md:text-3xl text-zinc-400 mb-12 font-light tracking-wide"
          >
            <span className="block mt-2">
              <Typewriter
                words={[
                  "充电桩解决方案 / EV Charging Solutions",
                  "OCPP 协议集成 / OCPP Integration",
                  "海外项目支持 / Global Project Support",
                  "设备调试与故障排查 / Commissioning & Troubleshooting"
                ]}
                className="text-zinc-300 font-medium"
              />
            </span>
          </motion.div>

          <motion.div
            variants={ANIMATION_VARIANTS.fadeUp}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0"
          >
            <MagneticButton>
              <Button asChild size="lg" className="h-14 px-8 text-sm sm:text-base font-bold rounded-full bg-white text-black hover:bg-zinc-200 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <Link href="/projects">
                  View Projects
                </Link>
              </Button>
            </MagneticButton>

            <MagneticButton>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-8 text-sm sm:text-base font-bold rounded-full bg-transparent border-white/20 text-white hover:bg-white/10 transition-all"
              >
                <Link href="/about">About Me</Link>
              </Button>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
