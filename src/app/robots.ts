import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

// ⚠️ 与 sitemap.ts 同理：robots.ts 也是特殊的 Route Handler，
// 静态导出（output: "export"）下必须显式声明为静态，
// 否则 next build 会报 "not configured ... with output: export"。
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
