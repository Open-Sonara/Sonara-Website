import { cn, hash } from "@/lib/utils";

/**
 * Generated album artwork for demonstrations. Deterministic per seed, drawn
 * in the violet family so previews sit in the brand palette. No real covers.
 */

const palettes: Array<[string, string, string]> = [
  ["#2a1b4d", "#a78bfa", "#f5f3ff"],
  ["#1b1640", "#6d6af0", "#c4b5fd"],
  ["#3b1236", "#e879c6", "#fde7f6"],
  ["#14223a", "#7aa7f5", "#e3ecff"],
  ["#2d1530", "#b58cf5", "#ffd6e8"],
  ["#1d1a2e", "#c4b5fd", "#6d28d9"],
  ["#331a52", "#f0abfc", "#a78bfa"],
  ["#10172a", "#93c5fd", "#a78bfa"],
];

export function CoverArt({ seed, className, title }: { seed: string; className?: string; title?: string }) {
  const h = hash(seed);
  const [bg, a, b] = palettes[h % palettes.length]!;
  const kind = (h >>> 4) % 6;
  const r = (n: number) => ((h >>> n) % 100) / 100;

  let art: React.ReactNode;
  switch (kind) {
    case 0: // grooves
      art = (
        <>
          {Array.from({ length: 7 }, (_, i) => (
            <circle key={i} cx={50 + r(3) * 20 - 10} cy={56} r={44 - i * 6} fill="none" stroke={i % 2 ? a : b} strokeOpacity={0.35 + i * 0.08} strokeWidth="2.2" />
          ))}
          <circle cx={50 + r(3) * 20 - 10} cy={56} r="6" fill={a} />
        </>
      );
      break;
    case 1: // horizon
      art = (
        <>
          <circle cx="50" cy={58 + r(5) * 8} r="26" fill={a} />
          {Array.from({ length: 6 }, (_, i) => (
            <rect key={i} x="0" y={62 + i * 6} width="100" height={2 + i * 0.6} fill={bg} />
          ))}
          <rect x="0" y="84" width="100" height="16" fill={b} fillOpacity="0.18" />
        </>
      );
      break;
    case 2: // stripes
      art = Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={-20 + i * 16} y="-20" width="7" height="160" fill={i % 3 === 0 ? b : a} fillOpacity={0.25 + (i % 4) * 0.18} transform="rotate(28 50 50)" />
      ));
      break;
    case 3: // dot grid
      art = Array.from({ length: 36 }, (_, i) => {
        const x = 14 + (i % 6) * 14.4;
        const y = 14 + Math.floor(i / 6) * 14.4;
        const big = (h >>> (i % 24)) & 1;
        return <circle key={i} cx={x} cy={y} r={big ? 4.6 : 2} fill={big ? a : b} fillOpacity={big ? 0.95 : 0.5} />;
      });
      break;
    case 4: // waveform
      art = (
        <>
          {Array.from({ length: 22 }, (_, i) => {
            const amp = 6 + Math.abs(Math.sin(i * 0.7 + r(7) * 6)) * 30;
            return <rect key={i} x={6 + i * 4.1} y={50 - amp / 2} width="2.4" height={amp} rx="1.2" fill={i % 5 === 0 ? b : a} />;
          })}
        </>
      );
      break;
    default: // arcs
      art = (
        <>
          <path d="M18 82 A40 40 0 0 1 82 30" fill="none" stroke={a} strokeWidth="9" strokeLinecap="round" />
          <path d="M34 82 A24 24 0 0 1 70 50" fill="none" stroke={b} strokeWidth="7" strokeLinecap="round" strokeOpacity="0.8" />
          <circle cx="78" cy="78" r="6" fill={b} />
        </>
      );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("block aspect-square w-full overflow-hidden", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="100" height="100" fill={bg} />
      {art}
    </svg>
  );
}
