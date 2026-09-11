"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SITE_CONFIG, NAV_ITEMS } from "@/lib/constants";
import { TextRoll } from "@/components/animations";

export function Footer() {
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
            第一部分：个人品牌信息
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            grid
            grid-cols-1
            md:grid-cols-12
            gap-10
            md:gap-16
            items-end
            pb-16
          "
        >

          {/* 左侧：姓名 + 定位 */}
          <div className="md:col-span-8">

            {/* 中文名 */}
            <h2
              className="
                font-display
                font-black
                text-5xl
                sm:text-6xl
                md:text-8xl
                tracking-tight
                leading-none
              "
            >
              李世豪
            </h2>

            {/* 英文名 */}
            <p
              className="
                mt-3
                text-xl
                md:text-2xl
                font-medium
                text-zinc-400
              "
            >
              Kevin
            </p>

            {/* 职业标签 */}
            <p
              className="
                mt-8
                text-lg
                md:text-xl
                text-zinc-300
                leading-relaxed
                max-w-3xl
              "
            >
              Technology · Projects · Global Business · Digital
            </p>

            {/* 个人定位 */}
            <div
              className="
                mt-5
                text-zinc-400
                text-base
                md:text-lg
                leading-relaxed
                max-w-3xl
              "
            >
              <p>
                连接技术、项目与全球市场。
              </p>

              <p className="mt-1">
                Connecting technology, projects, and global markets.
              </p>
            </div>

          </div>


          {/* 右侧：联系按钮 */}
          <div
            className="
              md:col-span-4
              flex
              md:justify-end
            "
          >
            <a
              href={`mailto:${SITE_CONFIG.links.email}`}
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                px-8
                py-5
                rounded-full
                bg-white
                text-black
                font-bold
                text-base
                md:text-lg
                transition-all
                duration-300
                hover:bg-zinc-200
                hover:scale-105
              "
            >
              联系我 / Contact Me

              <span
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              >
                ↗
              </span>
            </a>
          </div>

        </motion.div>


        {/* ==================================================
            分隔线
        ================================================== */}
        <div className="border-t border-white/10" />


        {/* ==================================================
            第二部分：联系方式 + 导航 + 个人理念
        ================================================== */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-12
            gap-12
            py-16
          "
        >

          {/* ================================================
              联系方式
          ================================================ */}
          <div className="md:col-span-4">

            <span
              className="
                font-mono
                text-zinc-500
                text-xs
                tracking-[0.2em]
                uppercase
                font-bold
              "
            >
              Connect
            </span>

            <ul
              className="
                mt-6
                flex
                flex-col
                gap-4
                font-semibold
              "
            >
              <li>
                <TextRoll
                  text="Email ↗"
                  href={`mailto:${SITE_CONFIG.links.email}`}
                  className="
                    text-zinc-300
                    hover:text-white
                    transition-colors
                  "
                />
              </li>

              {/* 下面两项按需显示：
                   在 constants.ts 里填了对应链接才会出现，
                   避免出现「点了没反应」的死链（原来 LinkedIn 是 "#"）。

                   想加 WhatsApp / 微信，照着 GitHub 这一项的写法往下加即可。 */}
              {SITE_CONFIG.links.linkedin && (
                <li>
                  <TextRoll
                    text="LinkedIn ↗"
                    href={SITE_CONFIG.links.linkedin}
                    className="
                      text-zinc-300
                      hover:text-white
                      transition-colors
                    "
                  />
                </li>
              )}

              {SITE_CONFIG.links.github && (
                <li>
                  <TextRoll
                    text="GitHub ↗"
                    href={SITE_CONFIG.links.github}
                    className="
                      text-zinc-300
                      hover:text-white
                      transition-colors
                    "
                  />
                </li>
              )}

            </ul>
          </div>


          {/* ================================================
              网站导航
          ================================================ */}
          <div className="md:col-span-4">

            <span
              className="
                font-mono
                text-zinc-500
                text-xs
                tracking-[0.2em]
                uppercase
                font-bold
              "
            >
              Navigation
            </span>

            <ul
              className="
                mt-6
                flex
                flex-col
                gap-4
                font-semibold
              "
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <TextRoll
                    text={item.label}
                    href={item.href}
                    className="
                      text-zinc-300
                      hover:text-white
                      transition-colors
                    "
                  />
                </li>
              ))}
            </ul>

          </div>


          {/* ================================================
              个人理念
          ================================================ */}
          <div
            className="
              md:col-span-4
              flex
              flex-col
              md:items-end
              md:text-right
            "
          >

            <span
              className="
                font-mono
                text-zinc-500
                text-xs
                tracking-[0.2em]
                uppercase
                font-bold
              "
            >
              Personal Philosophy
            </span>

            <div
              className="
                mt-6
                max-w-[320px]
                flex
                flex-col
                gap-3
              "
            >

              <p
                className="
                  text-2xl
                  md:text-3xl
                  font-display
                  font-semibold
                  leading-tight
                "
              >
                From ideas to execution.
              </p>

              <p
                className="
                  text-zinc-400
                  text-lg
                "
              >
                从想法到落地。
              </p>

              <span
                className="
                  mt-2
                  font-mono
                  text-zinc-500
                  text-xs
                  tracking-widest
                  uppercase
                "
              >
                — Kevin · 李世豪
              </span>

            </div>

          </div>

        </div>


        {/* ==================================================
            最底部版权区域
        ================================================== */}
        <div
          className="
            border-t
            border-white/10
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