// ==========================================
// Next.js 配置
//
// 本项目部署方式：Cloudflare Pages 静态部署
// 所以启用了 output: "export"，构建产物是纯静态文件（out/ 目录），
// 可以放在任何静态服务器上。
//
// ⚠️ 静态导出模式下的限制（这是官方的硬性限制，不是配置问题）：
// 以下配置项在 output: "export" 下【不能使用】，用了会构建失败：
//   - headers()    → 改用根目录的 public/_headers 文件
//   - rewrites()   → 静态站点不需要
//   - redirects()  → 改用 public/_redirects 文件
//   - next/image 的默认图片优化 → 已用 unoptimized: true 关闭
//
// 以后如果要加这些功能，就得换成 Cloudflare Workers（vinext / OpenNext），
// 不能再走纯静态部署。
// ==========================================

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出：next build 后生成 out/ 目录
  output: "export",

  reactStrictMode: true,

  images: {
    // 静态导出必须关闭 Next.js 的图片优化服务
    // （图片优化需要 Node 服务器在运行时处理，静态站点没有）
    unoptimized: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
