"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Preloader } from "@/components/animations";
import { Hero } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { StatusBanner } from "@/components/home/status-banner";
import { SkillsShowcase } from "@/components/home/skills-showcase";
import { Achievements } from "@/components/home/achievements";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  // ---------- 修复「刷新后停在页面底部」 ----------
  //
  // 原因：浏览器默认会做「滚动位置恢复」（scroll restoration），
  // 刷新时把你上次离开页面的滚动位置还原回来。
  // 这个网站页脚很长，所以经常被还原到 Contact 那一栏。
  //
  // 处理：关掉浏览器的自动恢复，改为每次进首页都回到顶部。
  // 页面内部的「返回顶部」和导航锚点不受影响，仍然正常工作。
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // 预加载动画结束后，强制回到页面顶部（首页第一屏：大名字区域）
  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);

  return (
    <>
      <Preloader onComplete={() => setLoading(false)} />

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Hero />
          <FeaturedProjects />
          <StatusBanner />
          <SkillsShowcase />
          <Achievements />
        </motion.div>
      )}
    </>
  );
}
