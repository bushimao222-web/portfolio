"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Mail } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";

// ==========================================
// 页脚 / Contact 区域
//
// 【布局】分两行，避免拥挤：
//
//   第 1 行
//   ┌────────────────────┬─────────────────────────────────┐
//   │ 1/3  姓名 + 定位    │ 2/3  联系我（主要区域，右对齐）    │
//   │                    │      ┌──────────┬──────────┐    │
//   │                    │      │ 两个邮箱  │ 微信二维码 │    │
//   │                    │      └──────────┴──────────┘    │
//   └────────────────────┴─────────────────────────────────┘
//
//   第 2 行（独立一栏，右对齐）
//   ┌────────────────────┬─────────────────────────────────┐
//   │ 1/3  Navigation    │ 2/3  Personal Philosophy        │
//   └────────────────────┴─────────────────────────────────┘
//
// ⚠️ 右对齐是通过给「第 2 列」加 flex justify-end 实现的。
//    想去掉右对齐，把那个 justify-end 删掉即可。
//
// 【需要你准备的文件】
// 微信二维码：public/images/wechat-qr.jpg
//   建议正方形 800x800 以上。没放的话显示「二维码待放置」提示，不会破图。
// ==========================================

// 两个邮箱地址
const EMAILS = [
  "bushimao222@gmail.com",
  "2966569818@qq.com",
];

// 二维码文件路径
const WECHAT_QR = "/images/wechat-qr.jpg";

export function Footer() {
  // 二维码加载失败时（文件还没放），显示占位提示而不是破图
  const [qrFailed, setQrFailed] = useState(false);

  return (
    <footer
      id="contact"
      className="
        w-full
        bg-[#1C1B1A]
        text-white
        rounded-t-[2.5rem]
        relative
        z-50
        mt-[-2rem]
        px-6
        py-20
        md:px-12
        md:py-28
      "
    >
      <div className="max-w-6xl mx-auto">

        {/* ==================================================
            第 1 行：姓名(1/3) + 联系我(2/3)
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-14
            md:gap-12
            items-stretch
          "
        >

          {/* ---------- 第 1 列：姓名 + 定位 ---------- */}
          <div className="flex flex-col">
            <h2 className="font-display font-black text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none">
              李世豪
            </h2>

            <p className="mt-3 text-xl md:text-2xl font-medium text-zinc-400">
              Kevin
            </p>

            {/* 职业标签（字号已加大） */}
            <p className="mt-8 text-base md:text-xl text-zinc-300 leading-relaxed whitespace-nowrap">
              Technology · Projects · Global Business · Digital
            </p>

            {/* 英文定位 + 中文定位：作为一组，用 mt-auto 推到这一列底部，
                这样它的下边框会和右侧二维码的下边框平齐
                （前提是外层容器 items-stretch，第一行设了）。 */}
            <div className="mt-auto pt-10">
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed whitespace-nowrap">
                Connecting technology, projects, and global markets.
              </p>

              <p className="mt-3 text-zinc-400 text-sm md:text-base leading-relaxed">
                连接技术、项目与全球市场。
              </p>
            </div>
          </div>


          {/* ---------- 第 2 列：联系我（主要区域） ----------
               左侧竖向分隔线，内容整体向右靠齐 */}
          <div
            className="
              md:pl-12
              md:border-l
              md:border-white/10
              flex
              flex-col
              md:items-end
              md:text-right
            "
          >
            <span className="font-mono text-zinc-500 text-xs tracking-[0.2em] uppercase font-bold">
              Contact
            </span>

            <h3 className="mt-4 text-2xl md:text-3xl font-display font-bold leading-tight">
              联系我 / Contact Me
            </h3>

            {/* 邮箱与二维码并排（整体靠右）
                sm:items-stretch + 右侧 mt-auto：
                让二维码那一块被推到底部，使它的下边框
                和左侧「Connecting... + 连接技术…」那一组的下边框对齐。 */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-stretch gap-8 md:gap-12">

              {/* 左：两个邮箱
                  每一项都是固定宽度的 flex 行：
                  图标 16px + gap 8px + 文字，所以两个邮箱的信封图标
                  和起始文字位置完全对齐。 */}
              <ul className="flex flex-col gap-4">
                {EMAILS.map((email) => (
                  <li key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="
                        group
                        flex
                        items-center
                        gap-2
                        text-sm md:text-base
                        font-semibold
                        text-zinc-200
                        hover:text-white
                        transition-colors
                        whitespace-nowrap
                      "
                    >
                      <Mail className="h-4 w-4 shrink-0 text-zinc-500 group-hover:text-white transition-colors" />
                      <span className="underline decoration-white/20 underline-offset-4 group-hover:decoration-white/60 transition-colors">
                        {email}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* 右：微信二维码（已放大），贴底对齐 */}
              <div className="sm:shrink-0 flex flex-col sm:mt-auto">
                <span className="block font-mono text-zinc-500 text-[11px] tracking-[0.2em] uppercase font-bold">
                  微信 / WeChat
                </span>

                <div
                  className="
                    mt-3
                    relative
                    w-40 h-40 md:w-52 md:h-52
                    rounded-xl
                    overflow-hidden
                    border border-white/15
                    bg-white/[0.03]
                    flex items-center justify-center
                  "
                >
                  {qrFailed ? (
                    /* 二维码还没放进来 → 显示提示，避免浏览器破图图标 */
                    <div className="text-center px-3">
                      <p className="text-xs text-zinc-500 leading-snug">
                        二维码
                        <br />
                        待放置
                      </p>
                      <p className="mt-2 text-[10px] text-zinc-600 font-mono leading-tight break-all">
                        public/images/
                        <br />
                        wechat-qr.jpg
                      </p>
                    </div>
                  ) : (
                    <Image
                      src={WECHAT_QR}
                      alt="李世豪 微信二维码"
                      fill
                      sizes="208px"
                      className="object-contain"
                      onError={() => setQrFailed(true)}
                    />
                  )}
                </div>

                <p className="mt-2 text-xs text-zinc-500">
                  扫码加微信
                </p>
              </div>

            </div>
          </div>

        </motion.div>


        {/* ==================================================
            第 2 行：Navigation(1/3) + Personal Philosophy(2/3)
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-14
            md:gap-12
            items-stretch
            mt-16
            md:mt-20
            pt-14
            border-t
            border-white/10
          "
        >

          {/* ---------- 第 1 列：网站导航（横向排列） ----------
               每个菜单项内部是「英文在上、中文在下居中」的两行结构，
               整排菜单横向摆放，不再竖着堆叠。 */}
          <div>
            <span className="font-mono text-zinc-500 text-xs tracking-[0.2em] uppercase font-bold">
              Navigation
            </span>

            <nav className="mt-5 flex flex-wrap gap-x-7 gap-y-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex flex-col items-center text-center"
                >
                  <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                  <span className="mt-0.5 text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    {item.labelZh}
                  </span>
                </Link>
              ))}
            </nav>
          </div>


          {/* ---------- 第 2 列：个人理念（右对齐） ---------- */}
          <div
            className="
              md:pl-12
              md:border-l
              md:border-white/10
              flex
              flex-col
              md:items-end
              md:text-right
            "
          >
            <span className="font-mono text-zinc-500 text-xs tracking-[0.2em] uppercase font-bold">
              Personal Philosophy
            </span>

            <div className="mt-6 flex flex-col gap-3">
              <p className="text-2xl md:text-4xl font-display font-semibold leading-tight">
                From ideas to execution.
              </p>

              <p className="text-zinc-400 text-lg md:text-xl">
                从想法到落地。
              </p>

              <span className="mt-2 font-mono text-zinc-500 text-xs tracking-widest uppercase">
                — Kevin · 李世豪
              </span>
            </div>
          </div>

        </motion.div>


        {/* ==================================================
            最底部版权区域
        ================================================== */}
        <div
          className="
            border-t
            border-white/10
            mt-16
            pt-8
            flex
            flex-col
            sm:flex-row
            justify-between
            items-center
            gap-3
            text-sm
            font-mono
            text-zinc-500
          "
        >
          <span>
            © {new Date().getFullYear()} 李世豪 · Kevin
          </span>

          <span className="flex items-center gap-2">
            Personal Portfolio
            <Sparkles className="h-3.5 w-3.5 text-zinc-400" />
          </span>
        </div>

      </div>
    </footer>
  );
}
