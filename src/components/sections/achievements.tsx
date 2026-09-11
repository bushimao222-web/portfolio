"use client";

import { motion } from "framer-motion";
import { achievementsData } from "@/data/achievements";
import { ANIMATION_VARIANTS } from "@/lib/constants";
import { TrendingUp } from "lucide-react";

export function Achievements() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">

        {/* =====================================
            标题区域
        ====================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATION_VARIANTS.fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            职业亮点 /{" "}
            <span className="gradient-text">
              Career Highlights
            </span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            精选职业经历、项目实践与成果，涵盖新能源充电、项目交付、
            海外业务与数字化运营。
            <br />
            Selected experience, projects, and outcomes across EV charging,
            project delivery, global business, and digital operations.
          </p>
        </motion.div>

        {/* =====================================
            职业亮点卡片
            数据来自：
            src/data/achievements.ts
        ====================================== */}
        <div className="space-y-6">
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={ANIMATION_VARIANTS.fadeUp}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all">

                <div className="flex items-start gap-4">
                  <div className="flex-1">

                    {/* 项目 / 职业亮点标题 */}
                    <h3 className="text-2xl font-semibold mb-1">
                      {achievement.title}
                    </h3>

                    {/* 英文方向 / 项目类型 */}
                    <p className="text-primary font-medium mb-3">
                      {achievement.organization}
                    </p>

                    {/* 简介 */}
                    <p className="text-muted-foreground mb-4">
                      {achievement.description}
                    </p>

                    {/* 具体成果 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievement.impact.map((impact, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.2 + i * 0.1,
                          }}
                          className="flex items-start gap-2"
                        >
                          <TrendingUp
                            className="
                              h-4
                              w-4
                              text-primary
                              mt-0.5
                              flex-shrink-0
                            "
                          />

                          <span className="text-sm">
                            {impact}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}