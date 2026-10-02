import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, isSoldOut, products } from "@/data/products";
import { benefitTitle } from "@/data/content";
import { productImages, resolveImage } from "@/data/images";
import { site } from "@/lib/site";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductPurchase } from "@/components/ProductPurchase";
import { ProductCard } from "@/components/ProductCard";
import { SectionHead } from "@/components/SectionHead";
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
  const img = resolveImage(productImages(p)[0].src);
  return {
    title: p.name,
    description: p.tagline,
    alternates: { canonical: `/shop/${p.slug}` },
    openGraph: { title: p.name, description: p.tagline, type: "website", ...(img ? { images: [img] } : {}) },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const imgs = productImages(product);
  const others = products.filter((p) => p.slug !== product.slug && !isSoldOut(p));
  const related = [...others.filter((p) => p.category === product.category), ...others.filter((p) => p.category !== product.category)].slice(0, 4);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: category?.name,
    brand: { "@type": "Brand", name: site.name },
    image: imgs.map((i) => resolveImage(i.src)).filter(Boolean).map((src) => `${site.url}${src}`),
    // PLACEHOLDER: add sku/gtin and aggregateRating once available.
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
      { "@type": "ListItem", position: 2, name: category?.name ?? "Shop", item: `${site.url}/shop?category=${product.category}` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${site.url}/shop/${product.slug}` },
    ],
  };

  return (
    <div className="wrap">
      <nav aria-label="Breadcrumb" className="crumbs">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href={`/shop?category=${product.category}`}>{category?.name ?? "Shop"}</Link>
          </li>
          <li aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          <ProductGallery images={imgs} name={product.name} />
        </div>

        <div className={styles.info}>
          {(product.badge || product.customizable) && (
            <p className={styles.badges}>
              {product.badge && <span className={styles.badge}>{product.badge}</span>}
              {product.customizable && <span className={styles.badge} data-kind="outline">Customisable from 500 g</span>}
            </p>
          )}
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.tagline}>{product.tagline}</p>
          <p className={styles.enjoyed}>
            Traditionally enjoyed for {product.enjoyedFor.map((b) => benefitTitle[b].toLowerCase()).join(", ")}
          </p>

          <ProductPurchase product={product} />

          <ul className={styles.assure}>
            <li>Cooked by hand in small batches</li>
            <li>Packed fresh, close to the day it’s made</li>
            <li>
              <Placeholder note="confirm serviceable regions">Delivery across India</Placeholder>
            </li>
          </ul>

          <div className={styles.details}>
            <details className="acc" open>
              <summary>Description</summary>
              <div className="acc-body">
                <p>{product.description}</p>
              </div>
            </details>
            <details className="acc">
              <summary>Ingredients</summary>
              <div className="acc-body">
                <ul className={styles.list}>
                  {product.ingredients.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <p>
                  <Placeholder note="final ingredient list from the kitchen">Full ingredient and allergen list to be confirmed.</Placeholder>
                </p>
              </div>
            </details>
            <details className="acc">
              <summary>Nutrition</summary>
              <div className="acc-body">
                <table className={styles.nutrition}>
                  <caption className="visually-hidden">Typical values per 100 g (placeholder)</caption>
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
                <p>
                  <Placeholder note="lab-tested values">Values to be added after lab testing.</Placeholder>
                </p>
              </div>
            </details>
            <details className="acc">
              <summary>How it’s made</summary>
              <div className="acc-body">
                <p>{product.preparation}</p>
              </div>
            </details>
            <details className="acc">
              <summary>Storage &amp; shelf life</summary>
              <div className="acc-body">
                <p>{product.storage}</p>
              </div>
            </details>
            <details className="acc">
              <summary>Shipping &amp; returns</summary>
              <div className="acc-body">
                <p>
                  Free standard delivery over ₹999. Damaged or incorrect orders are replaced or refunded.{" "}
                  <Link href="/shipping-returns" className="link">
                    Read the full policy
                  </Link>
                  .
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>

      <section className={styles.reviews} aria-labelledby="reviews-title">
        <SectionHead id="reviews-title" title="Reviews" />
        <div className={styles.reviewsEmpty}>
          <p>No reviews yet.</p>
          <p className={styles.muted}>
            <Placeholder note="connect a reviews provider">Reviews from verified buyers will appear here.</Placeholder>
          </p>
        </div>
      </section>

      <section className={styles.related} aria-labelledby="related-title">
        <SectionHead id="related-title" title="You may also like" href="/shop" linkLabel="Shop all" />
        <div className={styles.relatedGrid}>
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
      <JsonLd data={productLd} />
      <JsonLd data={breadcrumbLd} />
    </div>
  );
}
