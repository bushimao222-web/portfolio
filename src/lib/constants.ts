// ==========================================
// 全站基础配置 / Global Site Configuration
//
// 这个文件是全站的「总开关」。
// 网站标题、SEO 描述、页脚联系按钮、分享卡片，都从这里取值。
// 需要改邮箱、GitHub、域名时，只改这里就够了。
// ==========================================

export const SITE_CONFIG = {
  // 站点显示名（浏览器标题栏、分享卡片会用到）
  name: "李世豪 · Kevin",

  // SEO 描述：搜索引擎和微信/Twitter 分享时显示的摘要
  description:
    "新能源充电基础设施与全球业务｜充电桩产品供应链、OCPP 平台、海外独立站与阿里巴巴国际站运营｜EV Charging Infrastructure & Global Business",

  // ⚠️ 上线前必改：部署后的正式域名，例如 "https://kevin-ev.vercel.app"
  // 这个值决定 og 分享卡片图片的绝对地址和 sitemap 里的链接。
  // 现在填 localhost 只是为了本地开发不报错。
  url: "http://localhost:3000",

  // 分享卡片缩略图（1200x630 最佳）
  // ⚠️ 待补：public/images/og-image.jpg 目前不存在，分享出去会没有缩略图
  ogImage: "/images/og-image.jpg",

  links: {
    github: "https://github.com/bushimao222-web",

    // LinkedIn 暂时留空：页脚会自动隐藏这一项，不会出现点了没反应的死链
    linkedin: "",

    email: "bushimao222@gmail.com",

    // 电话留空：页脚不会显示电话项
    phone: "",
  },
};

// ==========================================
// 功能开关 / Feature Flags
// ==========================================

export const FEATURES = {
  // 是否在导航栏显示「Resume」下载按钮。
  //
  // ⚠️ 现在是 false：因为 public/resume/resume.pdf 这个文件还不存在，
  // 如果开启，访客点击会打开一个 404 页面。
  //
  // 等你在 public/ 下新建 resume 文件夹、
  // 把简历 PDF 放进去并命名为 resume.pdf 之后，
  // 把这里改成 true 即可恢复按钮。
  showResumeButton: false,
};

// 顶部导航栏 / 页脚导航共用的菜单
// 注意：Contact 用的是 "#contact" 锚点，指向页脚，不是独立页面
export const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Experience",
    href: "/experience",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

// ==========================================
// 动画预设 / Animation Variants
//
// 目前只保留 4 个基础变体，够用且体积小。
// 如果需要新增（比如左右滑入、缩放淡入），在这里加，
// 然后在组件里用 variants={ANIMATION_VARIANTS.xxx} 引用。
// ==========================================
export const ANIMATION_VARIANTS = {
  fadeUp: {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },

  fadeDown: {
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },

  fadeIn: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },

  scaleIn: {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  },
};
