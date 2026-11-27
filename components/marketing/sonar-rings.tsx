/**
 * Faint broken rings radiating from above the headline, echoing the arcs in
 * the Sonara mark. Decorative only.
 */
export function SonarRings() {
  const rings = [180, 300, 430, 570, 720, 880];
  return (
    <svg
      className="pointer-events-none absolute top-[-14rem] left-1/2 h-[64rem] w-[110rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,black_35%,transparent_100%)]"
      viewBox="-880 -880 1760 1760"
      fill="none"
      aria-hidden="true"
    >
      {rings.map((r, i) => {
        const c = 2 * Math.PI * r;
        // Each ring is broken once, with the gap rotating a little per ring, like the mark.
        const gap = c * 0.16;
        return (
          <circle
            key={r}
            r={r}
            stroke="#a78bfa"
            strokeOpacity={0.16 - i * 0.018}
            strokeWidth={1.25}
            strokeDasharray={`${c - gap} ${gap}`}
            transform={`rotate(${60 + i * 14})`}
          />
        );
      })}
    </svg>
  );
}
