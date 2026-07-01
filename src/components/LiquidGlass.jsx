import { useId } from 'react';
import '../styles/LiquidGlass.css';

function svgMaskUrl(svg) {
  return `url('data:image/svg+xml;base64,${btoa(svg)}')`;
}

function ringMasks(radius, edge) {
  const innerR = Math.max(radius - edge, 0);
  const outer = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect x="0" y="0" width="100%" height="100%" rx="0" ry="0" fill="white"/></svg>`;
  const inner = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect x="${edge}" y="${edge}" width="calc(100% - ${edge * 2}px)" height="calc(100% - ${edge * 2}px)" rx="${innerR}" ry="${innerR}" fill="white"/></svg>`;
  return `${svgMaskUrl(outer)}, ${svgMaskUrl(inner)}`;
}

/**
 * Liquid Glass（液态玻璃）卡片容器
 * 基于掘金文章方案：仅在边缘使用 SVG feDisplacementMap 置换滤镜实现折射，
 * 中间区域使用高斯模糊，配合内阴影与高光模拟玻璃质感。
 */
export default function LiquidGlass({
  children,
  className = '',
  cornerRadius = 26,
  blur = 6,
  edge = 5,
  ...props
}) {
  const id = useId().replace(/:/g, '');
  const filterId = `liquid-glass-filter-${id}`;
  const masks = ringMasks(cornerRadius, edge);

  return (
    <>
      <svg
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id={filterId}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            filterUnits="objectBoundingBox"
          >
            <feDisplacementMap scale="200" />
          </filter>
        </defs>
      </svg>
      <div
        className={['liquid-glass', className].filter(Boolean).join(' ')}
        style={{
          '--lg-radius': `${cornerRadius}px`,
          '--lg-blur': `${blur}px`,
        }}
        {...props}
      >
        <div
          className="liquid-glass-outer"
          style={{
            backdropFilter: `url(#${filterId})`,
            WebkitBackdropFilter: `url(#${filterId})`,
            maskImage: masks,
            WebkitMaskImage: masks,
          }}
        />
        <div className="liquid-glass-cover" />
        <div className="liquid-glass-sharp" />
        <div className="liquid-glass-reflect" />
        <div className="liquid-glass-content">{children}</div>
      </div>
    </>
  );
}
