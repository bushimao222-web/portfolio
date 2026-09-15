// ==========================================
// 动画组件统一出口
//
// 这里每导出一样东西，即使没人用也会被打包进项目。
// 所以移除组件时，记得同时删掉这里的导出。
//
// 【光标相关说明】
// 自定义光标只有一套：src/components/ui/custom-cursor.tsx
// （直接挂在根布局，不经过这里导出）
//
// 原来这里导出过 CursorGlow，但它是第二套重复的光标实现，
// 会和 custom-cursor 同时渲染两套圆点 + 圆环，已删除。
// CursorFollower 是第三套，从未被使用，也已删除。
//
// 【已清理的死代码】tilt-card / floating-particles /
// ui/magnetic-button / ui/project-card / ui/lavender-badge
// 这些都没有任何页面引用，已从项目中移除。
// （MagneticButton 保留 —— 首页的两个按钮正在用它。）
// ==========================================

export { ScrollReveal } from './scroll-reveal';
export { ParallaxWrapper } from './parallax-wrapper';
export { Typewriter } from './typewriter';
export { GradientText } from './gradient-text';
export { SplitText } from './split-text';
export { MagneticButton } from './magnetic-button';
export { StaggerContainer, StaggerItem } from './stagger-container';
export { WaveText } from './wave-text';
export { ScrollProgress, ScrollGlow } from './scroll-progress';
export { Preloader } from './preloader';
export { DarkCurveSweepUp, DarkCurveSweepDown } from './curve-transitions';
export { MaskedHeading, WordReveal, TextRoll } from './animated-helpers';
export { GsapText } from './gsap-text';
export { LiquidImage } from './liquid-image';