import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/data/products";
import { recipes } from "@/data/ingredients";
import { BatchBuilder } from "@/components/builder/BatchBuilder";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(recipes).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `Build your ${p.name}`,
    description: `Customise ${p.name}: choose the base, dry fruits, seeds, spices and sweetness. Custom batches from 500 g.`,
    alternates: { canonical: `/customise/${slug}` },
  };
}

export default async function CustomisePage({ params }: Params) {
  const { slug } = await params;
  if (!getProduct(slug) || !recipes[slug]) notFound();
  return <BatchBuilder slug={slug} />;
}
