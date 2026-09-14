"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface StarBackgroundProps {
  className?: string;
  // Keep other props optional for backward compatibility
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
}

export const StarsBackground: React.FC<StarBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // ---------- 光标引力场参数 ----------
    // spacing      点阵间距（越小越密，36 是能看出"网格感"又不显脏的平衡点）
    // maxDistance  引力作用半径。原来是 120，稍大一点就完全没反应，过渡很突兀；
    //              现在扩到 180，影响范围更大、边界感更弱
    // pullStrength 最大拖拽位移。原来 6，配合更大的半径会显得"拽得太狠"，
    //              降到 4，让整片点阵是"缓慢被吸引"而不是"被吸走"
    const spacing = 36;
    const maxDistance = 180;
    const pullStrength = 4;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      if (mouse.x === -1000 && mouse.targetX !== -1000) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      }

      if (mouse.x !== -1000) {
        // 光标处的大范围柔光。
        // 半径 300（原来 250），配合更大的引力半径；
        // 透明度压到 4% / 1.5% —— 这是"氛围"不是"特效"，
        // 越淡越高级，一旦明显就会盖过内容。
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          300
        );
        gradient.addColorStop(0, "rgba(99, 102, 241, 0.04)");
        gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.015)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const time = Date.now() * 0.0015;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const originalX = c * spacing;
          const originalY = r * spacing;

          const noiseX = Math.sin(time + c * 0.5 + r * 0.3) * 1.0;
          const noiseY = Math.cos(time + c * 0.3 + r * 0.5) * 1.0;

          let drawX = originalX + noiseX;
          let drawY = originalY + noiseY;

          let radius = 1.0;
          let opacity = 0.07;

          if (mouse.x !== -1000) {
            const dx = mouse.x - originalX;
            const dy = mouse.y - originalY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
              const force = (maxDistance - dist) / maxDistance;
              drawX += (dx / dist) * pullStrength * force;
              drawY += (dy / dist) * pullStrength * force;
              // 亮度提升幅度从 0.35 降到 0.28：
              // 半径变大后同时变亮会显得"糊"，稍微收一点更清晰
              radius = 1.0 + force * 1.5;
              opacity = 0.07 + force * 0.28;
            }
          }

          ctx.beginPath();
          ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full absolute inset-0 pointer-events-none z-[1]", className)}
      style={{ mixBlendMode: "screen" }}
    />
  );
};
