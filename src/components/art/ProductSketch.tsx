import { getCategory, type Product } from "@/data/products";
import { ingredients, productIngredients, recipes } from "@/data/ingredients";
import { Glyph, seeded } from "./glyphs";

const categoryFill: Record<string, string> = {
  panjiri: "#D9A85E",
  pinni: "#B98448",
  laddus: "#6E3D24",
  mixes: "#E9DCC3",
  "gift-boxes": "#D9A85E",
};

/**
 * Drawn glass jar showing the product's contents. Used wherever a product
 * photograph hasn't been supplied yet (see CODEX_IMAGES.md).
 */
export function ProductSketch({ product, variant = "jar" }: { product: Pick<Product, "slug" | "name" | "category" | "short">; variant?: "jar" | "spill" }) {
  const recipe = recipes[product.slug];
  const fill = recipe ? Object.values(recipe.baseTint)[0].light : (categoryFill[product.category] ?? "#D9A85E");
  const kinds = productIngredients(product.slug);
  const rnd = seeded(product.slug + variant);
  const pieces = Array.from({ length: 34 }, (_, i) => ({
    kind: kinds[i % kinds.length],
    x: 118 + rnd() * 164,
    y: 262 + rnd() * 160,
    r: rnd() * 360,
    s: 1.2 + rnd() * 0.5,
  }));
  const cat = getCategory(product.category);
  const id = `jar-${product.slug}-${variant}`;

  return (
    <svg viewBox="0 0 400 500" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <clipPath id={id}>
          <path d="M138 166C104 172 100 200 100 230L100 400C100 428 118 436 146 436L254 436C282 436 300 428 300 400L300 230C300 200 296 172 262 166Z" />
        </clipPath>
      </defs>
      <ellipse cx="200" cy="446" rx="128" ry="12" fill="#1e1915" opacity=".08" />
      {variant === "spill" &&
        pieces.slice(0, 7).map((p, i) => (
          <g key={`s${i}`} transform={`translate(${70 + i * 42} ${452 + (i % 2) * 10}) rotate(${p.r}) scale(1.5)`}>
            <Glyph kind={p.kind} color={ingredients[p.kind].color} line={0.7} />
          </g>
        ))}
      <g clipPath={`url(#${id})`}>
        <path d="M90 258C140 246 170 266 210 254C250 244 280 260 310 252L310 450L90 450Z" fill={fill} />
        {pieces.map((p, i) => (
          <g key={i} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.r.toFixed(0)}) scale(${p.s.toFixed(2)})`}>
            <Glyph kind={p.kind} color={ingredients[p.kind].color} line={0.6} />
          </g>
        ))}
        <rect x="100" y="300" width="200" height="74" fill="#E7D8BD" />
        <path d="M100 300H300M100 374H300" stroke="#1e1915" strokeOpacity=".5" strokeWidth="1" />
        <text x="200" y="330" textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" letterSpacing="2.4" fill="#1e1915">
          IMMUNITYWIZE
        </text>
        <text x="200" y="354" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="15" fill="#5f564d">
          {cat?.name ?? product.name}
        </text>
      </g>
      <path
        d="M138 166C104 172 100 200 100 230L100 400C100 428 118 436 146 436L254 436C282 436 300 428 300 400L300 230C300 200 296 172 262 166Z"
        fill="rgba(255,255,255,.18)"
        stroke="#1e1915"
        strokeWidth="1.6"
      />
      <path d="M118 236C116 280 116 330 118 380" stroke="#fff" strokeOpacity=".7" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M138 146L262 146L264 166L136 166Z" fill="#E9E1D3" stroke="#1e1915" strokeWidth="1.4" />
      <rect x="130" y="108" width="140" height="40" rx="5" fill="#C29A58" stroke="#1e1915" strokeWidth="1.6" />
      <path d="M140 118V140M152 118V140M164 118V140M176 118V140M188 118V140M200 118V140M212 118V140M224 118V140M236 118V140M248 118V140M260 118V140" stroke="#1e1915" strokeOpacity=".25" />
    </svg>
  );
}
