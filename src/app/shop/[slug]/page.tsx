import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, isSoldOut, products } from "@/data/products";
import { benefitTitle } from "@/data/content";
import { site } from "@/lib/site";
import { ProductArt } from "@/components/art/ProductArt";
import { BenefitIcon } from "@/components/art/Marks";
import { ProductPurchase } from "@/components/ProductPurchase";
import { ProductTile } from "@/components/ProductTile";
import { Placeholder } from "@/components/Placeholder";
import { JsonLd } from "@/components/JsonLd";
import styles from "./product.module.css";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.tagline,
    alternates: { canonical: `/shop/${p.slug}` },
    openGraph: { title: p.name, description: p.tagline, type: "website" },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const others = products.filter((p) => p.slug !== product.slug && !isSoldOut(p));
  const related = [...others.filter((p) => p.category === product.category), ...others.filter((p) => p.category !== product.category)].slice(0, 3);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: category?.name,
    brand: { "@type": "Brand", name: site.name },
    // PLACEHOLDER: add image URLs, sku/gtin and aggregateRating once available.
    offers: product.variants.map((v) => ({
      "@type": "Offer",
      sku: `${product.slug}-${v.id}`,
      name: v.label,
      price: v.price,
      priceCurrency: "INR",
      availability: v.stock === "out_of_stock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      url: `${site.url}/shop/${product.slug}`,
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${site.url}/shop` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${site.url}/shop/${product.slug}` },
    ],
  };

  return (
    <>
      <div className="wrap">
        <nav aria-label="Breadcrumb" className={styles.crumbs}>
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href={`/shop#${product.category}`}>{category?.name ?? "Shop"}</Link>
            </li>
            <li aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className={styles.layout}>
          <div className={styles.gallery}>
            <div className={styles.mainArt}>
              <ProductArt kind={product.art} variant={1} title={`Illustration of ${product.name} — product photography placeholder`} />
            </div>
            <p className={styles.galleryNote}>Illustration placeholder — product photos go here.</p>
          </div>

          <div className={styles.info}>
            <p className="eyebrow">{category?.name}</p>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.tagline}>{product.tagline}</p>
            <ul className={styles.tags} aria-label="Traditionally enjoyed for">
              {product.enjoyedFor.map((b) => (
                <li key={b}>
                  <span className={styles.tagIcon}>
                    <BenefitIcon slug={b} />
                  </span>
                  {benefitTitle[b]}
                </li>
              ))}
            </ul>
            <ProductPurchase product={product} />
          </div>
        </div>

        <div className={styles.details}>
          <section aria-labelledby="about-title" className={styles.about}>
            <h2 id="about-title">About this batch</h2>
            <p>{product.description}</p>
          </section>

          <section aria-labelledby="ing-title">
            <h2 id="ing-title">What’s inside</h2>
            <ul className={styles.ingredients}>
              {product.ingredients.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className={styles.small}>
              <Placeholder note="final ingredient list from the kitchen">Full ingredient list and allergen information to be confirmed.</Placeholder>
            </p>
          </section>

          <section aria-labelledby="nut-title">
            <h2 id="nut-title">Nutrition</h2>
            <table className={styles.nutrition}>
              <caption className="visually-hidden">Nutrition information per 100 g (placeholder values)</caption>
              <thead>
                <tr>
                  <th scope="col">Typical values</th>
                  <th scope="col">per 100 g</th>
                </tr>
              </thead>
              <tbody>
                {product.nutrition.map((n) => (
                  <tr key={n.label}>
                    <th scope="row">{n.label}</th>
                    <td>{n.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={styles.small}>
              <Placeholder note="lab-tested values">Values to be added after lab testing.</Placeholder>
            </p>
          </section>

          <section aria-labelledby="prep-title">
            <h2 id="prep-title">How it’s made</h2>
            <p>{product.preparation}</p>
            <h3 className={styles.subhead}>Keeping it fresh</h3>
            <p>{product.storage}</p>
          </section>
        </div>

        <section className={styles.related} aria-labelledby="related-title">
          <h2 id="related-title">You might also like</h2>
          <div className={styles.relatedGrid}>
            {related.map((p, i) => (
              <ProductTile key={p.slug} product={p} index={i + 1} />
            ))}
          </div>
        </section>
      </div>
      <JsonLd data={productLd} />
      <JsonLd data={breadcrumbLd} />
    </>
  );
}
