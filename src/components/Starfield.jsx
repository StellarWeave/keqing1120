const stars = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2.2 + 0.8,
  delay: Math.random() * 4,
  twinkleDuration: Math.random() * 2 + 1.5,
  driftDuration: Math.random() * 25 + 20,
  driftDelay: Math.random() * 15,
}));

const nebulas = [
  {
    top: '5%',
    left: '15%',
    size: '65vw',
    color: 'rgba(138, 43, 226, 0.24)',
    duration: 12,
  },
  {
    top: '55%',
    left: '65%',
    size: '55vw',
    color: 'rgba(218, 112, 214, 0.22)',
    duration: 15,
  },
  {
    top: '35%',
    left: '45%',
    size: '75vw',
    color: 'rgba(75, 0, 130, 0.20)',
    duration: 18,
  },
];

export default function Starfield() {
  return (
    <div className="starfield absolute inset-0 overflow-hidden pointer-events-none z-0">
      {nebulas.map((n, i) => (
        <div
          key={i}
          className="starfield-nebula absolute rounded-full"
          style={{
            top: n.top,
            left: n.left,
            width: n.size,
            height: n.size,
            background: `radial-gradient(circle, ${n.color} 0%, transparent 70%)`,
            animationDuration: `${n.duration}s`,
          }}
        />
      ))}
      {stars.map((s) => (
        <div
          key={s.id}
          className="starfield-star absolute"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s, ${s.driftDelay}s`,
            animationDuration: `${s.twinkleDuration}s, ${s.driftDuration}s`,
          }}
        />
      ))}
    </div>
  );
}
