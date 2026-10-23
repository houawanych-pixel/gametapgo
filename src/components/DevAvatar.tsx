import type { Developer } from "@/lib/types";

/** Developer logo placeholder: coloured circle with an initial. */
export default function DevAvatar({ dev, size = 40 }: { dev: Developer; size?: number }) {
  return (
    <span className="dev-avatar" aria-hidden
      style={{ width: size, height: size, fontSize: size * 0.45,
        background: `linear-gradient(135deg, hsl(${dev.hue} 85% 60%), hsl(${(dev.hue + 40) % 360} 80% 42%))` }}>
      {dev.name.slice(0, 1)}
    </span>
  );
}

export function compact(n: number) {
  return Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}
