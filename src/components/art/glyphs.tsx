import type { GlyphKind } from "@/data/ingredients";

/**
 * Ingredient glyphs, centred on 0,0 at roughly 20 units across. Muted fills
 * with a fine ink outline so they read as drawn specimens, not cartoons.
 */
const INK = "#1e1915";

export function Glyph({ kind, color, line = 0.7 }: { kind: GlyphKind; color: string; line?: number }) {
  const s = { stroke: INK, strokeWidth: line, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const detail = { ...s, fill: "none", strokeWidth: line * 0.7, strokeOpacity: 0.55 };
  switch (kind) {
    case "almond":
      return (
        <g>
          <path d="M0 -11C7 -7 8 5 0 11C-8 5 -7 -7 0 -11Z" fill={color} {...s} />
          <path d="M0 -7C2 -2 2 3 0 8" {...detail} />
        </g>
      );
    case "cashew":
      return <path d="M-9 -6C-11 4 -3 11 5 9C10 8 11 3 8 1C5 -1 2 4 -1 2C-4 0 -3 -5 -5 -8C-6 -10 -8 -9 -9 -6Z" fill={color} {...s} />;
    case "pistachio":
      return (
        <g>
          <path d="M-9 0C-9 -6 9 -6 9 0C9 6 -9 6 -9 0Z" fill={color} {...s} />
          <path d="M-5 -1C-1 -3 3 -3 6 -1" {...detail} />
        </g>
      );
    case "walnut":
      return (
        <g>
          <path d="M-9 -2C-10 -8 -3 -10 0 -7C3 -10 10 -8 9 -2C11 4 6 9 0 8C-6 9 -11 4 -9 -2Z" fill={color} {...s} />
          <path d="M0 -7C-2 -3 2 0 0 3C-2 5 1 7 0 8M-5 -3C-3 0 -6 3 -4 5M5 -3C3 0 6 3 4 5" {...detail} />
        </g>
      );
    case "raisin":
      return <path d="M-5 -3C-3 -6 4 -6 5 -2C7 2 3 6 -1 5C-5 5 -7 0 -5 -3Z" fill={color} {...s} />;
    case "fig":
      return (
        <g>
          <path d="M-8 4C-9 -4 -3 -9 2 -8C8 -6 9 2 6 6C2 9 -6 8 -8 4Z" fill={color} {...s} />
          <path d="M-3 0h.1M1 -3h.1M3 2h.1M-1 4h.1" stroke="#E8C98F" strokeWidth={1.6} strokeLinecap="round" />
        </g>
      );
    case "makhana":
      return (
        <g>
          <path d="M-8 0C-8 -5 -4 -8 0 -8C5 -8 8 -5 8 0C8 5 4 8 0 8C-5 8 -8 5 -8 0Z" fill={color} {...s} />
          <path d="M-3 -3l1.5 1M3 1l1 1.5M-2 4l1.2-.6" stroke="#9B7A55" strokeWidth={1.3} strokeLinecap="round" />
        </g>
      );
    case "gond":
      return (
        <g>
          <path d="M-6 -5L1 -8L7 -3L6 4L0 8L-7 3Z" fill={color} fillOpacity={0.85} {...s} />
          <path d="M1 -8L0 1L6 4M0 1L-7 3" {...detail} />
        </g>
      );
    case "magaz":
      return <path d="M-4.5 0C-4.5 -2.6 4.5 -2.6 4.5 0C4.5 2.6 -4.5 2.6 -4.5 0Z" fill={color} {...s} />;
    case "flax":
      return <path d="M-3.5 0C-3.5 -2 3 -2.2 4.5 0C3 2.2 -3.5 2 -3.5 0Z" fill={color} {...s} />;
    case "pumpkin":
      return (
        <g>
          <path d="M-8 0C-6 -4.5 6 -4.5 8 0C6 4.5 -6 4.5 -8 0Z" fill={color} {...s} />
          <path d="M-5 0C-2 -1.5 2 -1.5 5 0" {...detail} />
        </g>
      );
    case "coconut":
      return <path d="M-8 3C-5 -4 4 -5 8 0C4 -1.5 -4 -1 -8 3Z" fill={color} {...s} />;
    case "cardamom":
      return (
        <g>
          <path d="M0 -9C5 -5 5 5 0 9C-5 5 -5 -5 0 -9Z" fill={color} {...s} />
          <path d="M-2 -6C-3 -2 -3 2 -2 6M2 -6C3 -2 3 2 2 6" {...detail} />
        </g>
      );
    case "saunth":
      return <path d="M-8 2C-9 -3 -4 -5 -2 -3C0 -7 5 -6 5 -2C9 -2 9 4 5 5C2 8 -5 7 -8 2Z" fill={color} {...s} />;
    case "ajwain":
      return (
        <g>
          <path d="M-3 0C-3 -1.6 3 -1.6 3 0C3 1.6 -3 1.6 -3 0Z" fill={color} {...s} />
        </g>
      );
    case "saffron":
      return <path d="M-6 7C-3 1 -1 -3 3 -9M-2 8C0 2 2 -2 7 -6M-8 3C-4 -1 -1 -2 2 -1" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" />;
  }
}

/** Deterministic pseudo-random in [0, 1) so server and client render the same layout. */
export function seeded(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}
