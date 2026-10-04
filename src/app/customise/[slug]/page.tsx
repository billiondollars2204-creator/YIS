import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProduct } from "@/data/products";
import { CUSTOMISABLE_PRODUCTS, getFormula } from "@/data/formulations";
import { Formulator } from "@/components/formulate/Formulator";
import { ingredients } from "@/data/ingredients";
import { EMPTY_CUSTOMIZATION, resolveFormula } from "@/lib/customization";
import { formatGrams } from "@/lib/units";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CUSTOMISABLE_PRODUCTS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `Custom ${p.name}`,
    description: `Formulate your own ${p.name}: adjust the base, nuts, seeds, spices and sweetener. Custom batches from 500 g.`,
    alternates: { canonical: `/customise/${slug}` },
  };
}

export default async function CustomisePage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  const formula = getFormula(slug);
  if (!product || !formula) notFound();
  // Server-rendered house recipe shown until the interactive builder loads.
  const fallback = (
    <div className="wrap" style={{ paddingBlock: "var(--s-7)" }}>
      <p className="kicker">Custom batch</p>
      <h1>{product.name}</h1>
      <p className="lede">House recipe per 500 g. The interactive builder is loading.</p>
      <ul>
        {resolveFormula(formula, EMPTY_CUSTOMIZATION)
          .filter((r) => r.grams > 0)
          .map((r) => (
            <li key={r.key}>
              {ingredients[r.pick]?.name}: {formatGrams(r.grams)}
            </li>
          ))}
      </ul>
    </div>
  );
  return (
    <Suspense fallback={fallback}>
      <Formulator slug={slug} />
    </Suspense>
  );
}
