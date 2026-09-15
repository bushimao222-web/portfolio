"use client";

import { useEffect, useState } from "react";

// ==========================================
// 页面滚动进度条（顶部 2px 白线）
// ==========================================
export function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                setProgress((scrollTop / docHeight) * 100);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="scroll-progress"
            style={{ width: `${progress}%` }}
        />
    );
}

// ==========================================
// 滚动条扫光 / Scrollbar Glow Sweep
//
// 一个贴在视口右侧（滚动条位置）的装饰元素，
// 内部有一道柔光从顶部往下扫过。
//
// 为什么要单独做一个 DOM 元素：
//   ::-webkit-scrollbar-thumb 不支持动画，
//   没法直接在原生滚动条上做扫光效果。
//
// 整条 pointer-events: none，
// 所以不会挡住滚动条本身，也不影响任何点击。
//
// 想调节奏就改 globals.css 里 .scroll-glow::after 的 animation 时长。
// ==========================================
export function ScrollGlow() {
    return <div className="scroll-glow" aria-hidden="true" />;
}
