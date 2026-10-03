import { ingredients, type GlyphKind } from "@/data/ingredients";
import { Glyph } from "./glyphs";

// Small arrangement of three pieces, like a specimen plate.
const LAYOUT: [number, number, number, number][] = [
  [-11, -7, -24, 1.55],
  [11, -3, 28, 1.45],
  [-1, 12, 72, 1.5],
];
const SMALL: [number, number, number, number][] = [
  [-9, -8, -24, 1.9],
  [9, -2, 28, 1.8],
  [-4, 9, 72, 1.9],
  [8, 12, 10, 1.7],
  [-14, 6, 40, 1.7],
];

export function IngredientArt({ id, className, title }: { id: GlyphKind; className?: string; title?: string }) {
  const ing = ingredients[id];
  const small = ing.group === "spice" || id === "magaz" || id === "flax";
  const layout = small ? SMALL : LAYOUT;
  return (
    <svg viewBox="-32 -32 64 64" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {layout.map(([x, y, r, sc], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(${sc * (id === "raisin" ? 1.15 : 1)})`}>
          <Glyph kind={id} color={ing.color} line={0.55} />
        </g>
      ))}
    </svg>
  );
}
