import '../styles/LiquidGlass.css';

/**
 * Liquid Glass（液态玻璃）卡片容器
 * 使用纯 CSS 实现跨浏览器稳定的磨砂玻璃效果：
 * - backdrop-filter: blur() 作为底层模糊
 * - 渐变高光 + 内阴影模拟玻璃折射与边缘
 * - 不依赖 SVG feDisplacementMap / mask-composite，避免部分浏览器渲染异常
 */
export default function LiquidGlass({
  children,
  className = '',
  cornerRadius = 26,
  blur = 6,
  edge = 5,
  ...props
}) {
  return (
    <div
      className={['liquid-glass', className].filter(Boolean).join(' ')}
      style={{
        '--lg-radius': `${cornerRadius}px`,
        '--lg-blur': `${blur}px`,
        '--lg-edge': `${edge}px`,
      }}
      {...props}
    >
      <div className="liquid-glass-blur" />
      <div className="liquid-glass-sheen" />
      <div className="liquid-glass-edge" />
      <div className="liquid-glass-reflect" />
      <div className="liquid-glass-content">{children}</div>
    </div>
  );
}
