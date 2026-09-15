"use client";

import { ScrollProgress, ScrollGlow } from "@/components/animations/scroll-progress";

// ==========================================
// 客户端全局布局
//
// 说明：这里原本还挂着 <CursorGlow />，它是第二套自定义光标实现
// （和 ui/custom-cursor.tsx 功能重复，会同时渲染两套圆点+圆环，
//  造成视觉叠加和性能浪费）。
//
// 现在统一由 ui/custom-cursor.tsx 一套光标负责，
// CursorGlow 已从项目中移除。
// ==========================================

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="noise-overlay">
      <ScrollProgress />
      <ScrollGlow />
      {children}
    </div>
  );
}
