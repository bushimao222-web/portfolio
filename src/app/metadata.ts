import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const generateMetadata = (): Metadata => {
  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: `${SITE_CONFIG.name} | 新能源充电基础设施 & 全球业务`,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [
      "李世豪",
      "Kevin",
      "新能源充电桩",
      "充电基础设施",
      "EV Charging",
      "OCPP",
      "充电桩供应链",
      "海外独立站",
      "阿里巴巴国际站",
      "外贸业务",
      "招投标",
      "工程项目管理",
      "充电桩产品设计",
    ],
    authors: [
      {
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
    ],
    creator: SITE_CONFIG.name,
    openGraph: {
      type: "website",
      locale: "zh_CN",
      alternateLocale: ["en_US"],
      url: SITE_CONFIG.url,
      title: `${SITE_CONFIG.name} | 新能源充电基础设施 & 全球业务`,
      description: SITE_CONFIG.description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_CONFIG.name} | 新能源充电基础设施 & 全球业务`,
      description: SITE_CONFIG.description,
      images: [SITE_CONFIG.ogImage],
      // 暂时不设置 creator：没有 X / Twitter 账号时，
      // 填一个不存在的 @handle 反而会在分享卡片上显示错误的作者
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
};
