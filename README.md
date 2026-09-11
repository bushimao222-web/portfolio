# 李世豪 · Kevin — 个人主页

新能源充电基础设施 & 全球业务方向个人网站。
基于 Next.js 15 + React 19 + Tailwind CSS v4 构建，深色星空风格，带滚动动画。

---

## 快速开始

```bash
npm install      # 第一次运行需要先装依赖
npm run dev      # 启动本地开发服务器
```

打开 http://localhost:3000 查看效果。

### 打不开 localhost:3000 怎么排查

按顺序检查：

1. **确认 `npm run dev` 真的跑起来了** —— 
   终端里应该出现 `✓ Ready in xxx ms` 和 `- Local: http://localhost:3000`。
   如果终端报错，先解决报错。

2. **端口被占用** —— 如果 3000 被别的程序占了，
   Next.js 会自动换到 3001。**看终端里实际打印的地址**，不要固定试 3000。

3. **必须保持终端窗口开着** —— 
   关掉终端或按 Ctrl+C，服务就停了，网页自然打不开。
   开发服务器是「前台进程」，要一直运行着。

4. **`node_modules` 是否装好** —— 如果没跑过 `npm install`，
   或者 `npm install` 报错中断了，dev 会启动失败。重新跑一次。

5. **`index.html` 会造成干扰** —— 
   项目根目录有一个多余的 `index.html`，建议删掉。
   Next.js 项目不需要它，容易让人误以为是入口文件。

6. **地址别写错** —— 是 `http://localhost:3000`，
   不是 `https://`（本地开发默认没有 https）。

其他命令：

```bash
npm run build        # 生产构建（部署前建议先本地跑一次）
npm start            # 启动生产模式服务
npm run type-check   # 只做 TypeScript 类型检查，不产出文件
npm run lint         # 代码规范检查
```

---

## ⚠️ 上线前必须处理的 4 件事

### 1. 补上头像照片

首页和「关于我」页面都在引用 `/images/profile.jpg`，但 `public/images/` 里**还没有这个文件**，
现在打开首页头像位置是空的。

**操作**：把你的照片放到 `public/images/profile.jpg`（建议 3:4 竖版，宽度 800px 以上）

### 2. 补上简历 PDF（可选）

导航栏的「Resume」按钮现在是**隐藏状态**，因为 `public/resume/resume.pdf` 不存在 —— 
如果显示出来，访客点击会看到 404。

**操作**：
1. 在 `public/` 下新建 `resume` 文件夹
2. 把简历 PDF 放进去，文件名必须是 `resume.pdf`
3. 打开 `src/lib/constants.ts`，把 `FEATURES.showResumeButton` 改成 `true`

### 3. 填写正式域名

`src/lib/constants.ts` 里的 `SITE_CONFIG.url` 现在是 `http://localhost:3000`。
它决定了微信/社交平台分享卡片的图片地址和搜索引擎的 sitemap。

**操作**：部署拿到域名后，改成正式地址，例如 `https://kevin-ev.vercel.app`

### 4. 补上分享缩略图（可选）

`SITE_CONFIG.ogImage` 指向 `/images/og-image.jpg`，该文件不存在，分享到微信/Twitter 时没有缩略图。

**操作**：做一张 1200×630 的图放到 `public/images/og-image.jpg`

---

## 想改内容，只需要动这 5 个文件

| 想改什么 | 改哪个文件 |
|---|---|
| **姓名、邮箱、GitHub、域名、导航菜单** | `src/lib/constants.ts` |
| **职业成果 / 学历** | `src/data/achievements.ts` |
| **工作经历（/experience 时间轴）** | `src/data/experience.ts` |
| **项目（首页卡片 + /projects 页面）** | `src/data/projects.ts` |
| **核心能力（图标卡片）** | `src/components/sections/skills.tsx` |

几个要点：

- **首页「职业成果」卡片的内容自动来自 `src/data/achievements.ts`**，
  不用改组件。组件的 `LAYOUT` / `ICON_KEYS` / `METRICS` 只控制卡片大小、图标和右上角标签。
- `src/data/projects.ts` 里的 `category` 只能是这 4 个值之一：
  `engineering` / `digital` / `supply-chain` / `product`。
  分类的中文名在同一个文件的 `CATEGORY_LABELS` 里改。
- 项目配图目前**复用的是旧图片**，建议换成真实的项目照片
  （现场照片、设备照片、店铺后台截图等），放进 `public/images/projects/` 后改路径。

---

## 目录结构

```
src/
├── app/                    页面路由与全局配置
│   ├── layout.tsx          全局布局（导航栏、页脚、主题）
│   ├── metadata.ts         全站 SEO 配置
│   ├── page.tsx            首页
│   └── (routes)/           about / experience / projects 三个页面
├── components/
│   ├── layout/             导航栏、页脚
│   ├── sections/           各页面主要板块
│   ├── home/               首页专用板块
│   ├── animations/         动画组件
│   ├── seo/json-ld.tsx     结构化数据（给搜索引擎看的名片）
│   └── ui/                 基础 UI 组件
├── data/                   ★ 内容数据（改内容主要看这里）
└── lib/constants.ts        ★ 全站配置
```

---

## 已知待办

- [ ] 补 `public/images/profile.jpg` 头像
- [ ] 补简历 PDF 并开启 `FEATURES.showResumeButton`
- [ ] 填写正式域名（`SITE_CONFIG.url`）
- [ ] 补分享缩略图 `public/images/og-image.jpg`
- [ ] 删除 `src/lib/` 下误放的 Excel 文件（见下方说明）
- [ ] 把项目配图换成真实照片
- [ ] 有 LinkedIn 的话补上 `SITE_CONFIG.links.linkedin`

---

## 安全提醒

项目里曾经误放了一个业务 Excel 文件：

```
src/lib/UD INV & PL-LCUD21052601(模版）(1).xlsx
```

这是发票/形式发票模板，含客户与金额信息，**不应该出现在公开仓库里**。

**请务必确认：**
1. 本地已删除该文件（它没有被任何代码引用，删除是安全的）
2. 检查 GitHub 仓库上是否曾经提交过 —— 如果提交过，
   单纯删除文件是没用的，历史记录里依然能查到，
   需要连同提交历史一起清理。

`.gitignore` 里已经加了 `*.xlsx` 等规则做兜底拦截。

---

## 部署：Cloudflare Pages + 静态导出

项目已配置 `output: "export"`（见 `next.config.ts`），`npm run build` 会生成纯静态的 `out/` 目录。

### 方式一：Cloudflare Pages 连接 GitHub（推荐，自动部署）

1. 代码推到 GitHub
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. 选中你的仓库
4. 构建配置填：

   | 配置项 | 值 |
   |---|---|
   | Framework preset | `Next.js (Static HTML Export)` |
   | Build command | `npm run build` |
   | Build output directory | `out` |

5. **Save and Deploy**

之后每次 `git push`，Cloudflare 会自动重新构建部署。

### 方式二：本地构建后手动上传

```bash
npm run build
```

然后把生成的 `out/` 文件夹直接拖到 Cloudflare Pages 的上传界面。

### 静态导出模式下的限制

这是 Next.js 官方的硬性限制，不是本项目的问题。`output: "export"` 下**不能使用**：

- `headers()` / `redirects()` / `rewrites()`（`next.config.ts` 里的）
- `next/image` 的默认图片优化
- ISR（增量静态再生成）、Cookies、Server Actions、Draft Mode

本项目已经处理好了：

- 原来的 `headers()` 已迁移到 `public/_headers`（Cloudflare Pages 会自动读取）
- 图片优化已用 `images.unoptimized: true` 关闭
- `sitemap.ts` 和 `robots.ts` 在构建时生成静态文件，**可以正常工作**

> ⚠️ 如果以后要加需要服务端的功能（比如联系表单 API、后台登录），
> 就不能再用纯静态部署了，需要换成 Cloudflare Workers（vinext 或 OpenNext 适配器）。
> 本项目目前**不需要**服务端，静态部署完全够用。

### 为什么不用 GitHub Pages

也可以部署到 GitHub Pages，但 Cloudflare Pages 更好用：自带 CDN 加速、
国内访问速度明显更好、支持 `_headers` 配置响应头、部署界面更简单。
两者都需要 `output: "export"`，配置成本一样。

---

## 技术栈

Next.js 15.4 · React 19 · TypeScript 5 · Tailwind CSS v4 ·
Framer Motion 12 · shadcn/ui (Radix UI) · next-themes · Lucide Icons
