"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ==========================================
// 自定义光标 / Custom Cursor
//
// 【设计】两个同心元素，双速差（速度分层）：
//
//   ① 实心白点（12px）
//      - mix-blend-difference：深色底上显示白点，移到浅色区域自动反相成黑点
//      - 弹簧很硬（stiffness 500）：几乎零延迟，精确指示"我在哪"
//      - 悬停可点元素时放大到 1.7 倍
//
//   ② 空心圆环（48px）
//      - 半透明白边，悬停时放大到 1.5 倍并淡出
//      - 弹簧较软（stiffness 90）：明显滞后，制造"包裹感 / 拖尾感"
//
// 两个元素的弹簧刚度差是故意的：点"即时"，环"有重量"。
// 刚度差越大，层次感越明显。
//
// 【性能】全部用 useMotionValue / useTransform 驱动，
// 不经过 React 的 state，所以鼠标移动不会触发组件重新渲染。
//
// 【适配】
// - 触屏设备（pointer: coarse）整个不渲染
// - 系统开启"减少动态效果"（prefers-reduced-motion）时，
//   去掉放大/缩放，只保留跟随
//
// 【关于原生光标】
// globals.css 里在桌面端做了全局 cursor: none，
// 原生光标完全隐藏，位置指示全部交给这个白点 + 圆环。
// 唯一例外是输入框 / 文本域 / 可编辑区域（那里保留原生光标，
// 否则看不见输入焦点）。触屏设备不受影响。
// ==========================================

export function CustomCursor() {
  // 鼠标实时坐标
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 悬停可点元素时：1 = 是，0 = 否。用数值便于做插值
  const hover = useMotionValue(0);

  // 鼠标是否处于静止状态（静止时白点会轻微脉动）
  const [isIdle, setIsIdle] = useState(false);

  // ---------- 实心点 ----------
  // stiffness 高 = 几乎不滞后
  const dotX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.1 });
  // 悬停可点元素时放大 2.2 倍（12px → 26.4px）
  const dotScale = useTransform(hover, [0, 1], [1, 2.2]);

  // ---------- 外环 ----------
  // stiffness 低 = 明显滞后，形成包裹感
  const ringX = useSpring(mouseX, { stiffness: 90, damping: 20, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 90, damping: 20, mass: 0.5 });
  const ringScale = useTransform(hover, [0, 1], [1, 1.5]);
  // 悬停时外环淡出，把焦点让给放大后的实心点
  const ringOpacity = useTransform(hover, [0, 1], [1, 0]);

  // 静止检测的定时器
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // 触屏设备不做自定义光标
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // 系统设置了"减少动态效果"时，取消放大动画和静止脉动
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      dotScale.set(1);
      ringScale.set(1);
    }

    // ---------- 静止脉动的控制 ----------
    // 鼠标一动就立刻恢复"活跃"状态并重置计时；
    // 停下 1 秒后判定为静止，白点开始轻微呼吸。
    const IDLE_DELAY = 1000;
    const markActive = () => {
      setIsIdle(false);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIsIdle(true), IDLE_DELAY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      markActive();
    };

    // 鼠标移出窗口时把光标移出可视区，避免停在边缘
    const handleMouseLeave = () => {
      mouseX.set(-100);
      mouseY.set(-100);
      setIsIdle(false);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };

    // 判断鼠标下方是不是可点击元素
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      hover.set(interactive ? 1 : 0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [mouseX, mouseY, hover, dotScale, ringScale]);

  return (
    <>
      {/* 实心白点
          静止 1 秒后加 .cursor-pulse，白点周围出现轻微呼吸的光晕；
          鼠标一动就移除，恢复干净的白点。 */}
      <motion.div
        aria-hidden="true"
        className={`fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference${
          isIdle ? " cursor-pulse" : ""
        }`}
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          scale: dotScale,
        }}
      />

      {/* 空心圆环 */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-12 h-12 border border-white/40 rounded-full pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          scale: ringScale,
          opacity: ringOpacity,
        }}
      />
    </>
  );
}
