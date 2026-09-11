"use client";

import { motion } from "framer-motion";
import { ANIMATION_VARIANTS } from "@/lib/constants";
import { educationData } from "@/data/achievements";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import {
  ScrollReveal,
  GradientText,
} from "@/components/animations";

export function About() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* ================================
            标题区域
        ================================= */}
        <ScrollReveal delay={0.1}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={ANIMATION_VARIANTS.fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              关于 <GradientText>我 / About Me</GradientText>
            </h2>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              我的职业经历、项目能力与长期成长方向。
              <br />
              My experience, capabilities, and long-term professional growth.
            </p>
          </motion.div>
        </ScrollReveal>

        {/* ================================
            关于我主体内容
        ================================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATION_VARIANTS.fadeUp}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* ================================
                左侧：个人简介
            ================================= */}
            <div className="space-y-6 text-lg leading-relaxed">

              <p>
                我是李世豪（Kevin），目前主要从事新能源充电基础设施相关工作，
                同时具备海外业务、项目执行、数字化运营与独立站建设经验。
                <br />
                <span className="text-zinc-400">
                  I&apos;m Li Shihao (Kevin), with experience across EV charging
                  infrastructure, international business, project execution,
                  digital operations, and independent website development.
                </span>
              </p>

              <p>
                我的职业经历涵盖充电桩项目实施、设备调试与协议联调、海外客户沟通、
                招投标、施工协调、国际站运营以及独立站从 0 到 1 的建设。
                <br />
                <span className="text-zinc-400">
                  My experience spans EV charging project delivery, equipment
                  commissioning, protocol integration, overseas client communication,
                  tendering, construction coordination, international platform
                  operations, and building independent websites from the ground up.
                </span>
              </p>

              <p>
                相比于单一岗位，我更希望建立一种
                “技术 + 项目 + 商务 + 数字化”
                的复合型能力。
                这个网站也会持续记录我的职业经历、项目成果、技能积累与长期成长。
                <br />
                <span className="text-zinc-400">
                  Rather than being defined by a single role, I&apos;m building a
                  cross-functional profile that connects technology, projects,
                  business, and digital tools. This website documents my experience,
                  projects, skills, and long-term growth.
                </span>
              </p>

            </div>

            {/* ================================
                右侧：头像 + 教育经历
            ================================= */}
            <div className="relative flex flex-col items-center">

              {/* 头像 */}
              <div className="absolute -top-24">
                <div className="relative w-72 h-72 rounded-full p-[4px] bg-gradient-to-br from-indigo-500 via-violet-500 to-slate-400 shadow-2xl">
                  <div className="rounded-full overflow-hidden w-full h-full relative">
                    <Image
                      src="/images/profile.jpg"
                      alt="李世豪 Kevin"
                      fill
                      sizes="300px"
                      className="object-cover object-[center_25%]"
                      priority
                    />
                  </div>
                </div>
              </div>

              <br />
              <br />
              <br />

              {/* 教育经历数据
                  数据来源：
                  src/data/achievements.ts
              */}
              <div className="pt-40 w-full space-y-4">
                {educationData.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={ANIMATION_VARIANTS.fadeUp}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start space-x-4">

                      {/* 教育图标 */}
                      <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <GraduationCap className="h-6 w-6" />
                      </div>

                      {/* 教育信息 */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {edu.degree}
                        </h3>

                        <p className="text-primary font-medium">
                          {edu.institution}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">

                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {edu.duration}
                          </span>

                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {edu.location}
                          </span>

                        </div>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}