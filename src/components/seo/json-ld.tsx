import { SITE_CONFIG } from "@/lib/constants";
import { educationData, achievementsData } from "@/data/achievements";
import { experienceData } from "@/data/experience";

// ==========================================
// 结构化数据 / JSON-LD
//
// 这段代码不会显示在页面上，它是给搜索引擎看的「名片」。
// Google 搜索结果里出现的人物信息卡片，就是读这里。
//
// 姓名、职位、擅长领域如果和页面内容不一致，
// 会影响搜索引擎对你这个人的判断，所以改动时保持同步。
// ==========================================

export function JsonLd() {
  // 只有填了 LinkedIn 才放进 sameAs，避免收录一个空链接
  const socialProfiles = [
    SITE_CONFIG.links.github,
    SITE_CONFIG.links.linkedin,
  ].filter(Boolean);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "李世豪",
    alternateName: "Kevin",
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.links.email,
    jobTitle: "新能源充电基础设施 & 全球业务",

    description: SITE_CONFIG.description,

    sameAs: socialProfiles,

    alumniOf: educationData.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.institution,
      address: {
        "@type": "PostalAddress",
        addressLocality: edu.location,
      },
    })),

    worksFor: experienceData.map((exp) => ({
      "@type": "Organization",
      name: exp.company,
      address: {
        "@type": "PostalAddress",
        addressLocality: exp.location,
      },
    })),

    // 擅长领域：与首页「核心能力」板块保持一致
    knowsAbout: [
      "新能源充电基础设施",
      "EV Charging Infrastructure",
      "OCPP 协议对接",
      "充电桩产品供应链",
      "充电桩硬件与结构设计",
      "海外独立站建设",
      "SEO 优化",
      "阿里巴巴国际站运营",
      "工程项目招投标",
      "施工管理与外包协调",
    ],

    memberOf: achievementsData.map((achievement) => ({
      "@type": "Organization",
      name: achievement.title,
      description: achievement.description,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
