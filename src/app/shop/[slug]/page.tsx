import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, isSoldOut, products } from "@/data/products";
import { benefitTitle } from "@/data/content";
import { productImages, resolveImage } from "@/data/images";
import { customNoun, getFormula } from "@/data/formulations";
import { ingredients, type Allergen } from "@/data/ingredients";
import { EMPTY_CUSTOMIZATION, MIN_CUSTOM_GRAMS, resolveFormula } from "@/lib/customization";
import { formatGrams } from "@/lib/units";
import { site } from "@/lib/site";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductPurchase } from "@/components/ProductPurchase";
import { ProductCard } from "@/components/ProductCard";
import { IngredientSwatch } from "@/components/IngredientSwatch";
import { Placeholder } from "@/components/Placeholder";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight } from "@/components/icons";
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
  const formula = getFormula(product.slug);
  const house = formula ? resolveFormula(formula, EMPTY_CUSTOMIZATION).filter((r) => r.grams > 0) : [];
  const allergens = [...new Set(house.map((r) => ingredients[r.pick]?.allergen).filter(Boolean))] as Allergen[];
  const adjustable = formula ? formula.lines.filter((l) => !l.fill).map((l) => ingredients[l.options[0]]?.name.toLowerCase()) : [];
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
          <header className={styles.head}>
            <p className={styles.badges}>
              {product.badge && <span className="badge badge--dark">{product.badge}</span>}
              {product.customizable ? <span className="badge badge--custom">Customisable</span> : <span className="badge badge--muted">Standard recipe</span>}
            </p>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.tagline}>{product.tagline}</p>
          </header>

          <ProductPurchase product={product} />

          {formula && !isSoldOut(product) && (
            <section className={styles.custom} aria-labelledby="custom-title">
              <div className={styles.customSwatches} aria-hidden="true">
                {formula.lines.slice(0, 6).map((l) => (
                  <IngredientSwatch key={l.key} id={l.options[0]} className={styles.customSwatch} sizes="40px" />
                ))}
              </div>
              <h2 id="custom-title" className={styles.customTitle}>
                Make it your way
              </h2>
              <p className={styles.customText}>
                Start from our house recipe and adjust {adjustable.slice(0, 3).join(", ")} and {adjustable.length - 3} more ingredients. Cooked as its own batch,
                from {MIN_CUSTOM_GRAMS} g.
              </p>
              <Link href={`/customise/${product.slug}`} className="btn btn--secondary btn--block">
                Customise this {customNoun[product.category] ?? "batch"} <ArrowRight />
              </Link>
            </section>
          )}

          <dl className={styles.facts}>
            <div>
              <dt>Made</dt>
              <dd>By hand, in small batches</dd>
            </div>
            <div>
              <dt>Traditionally enjoyed for</dt>
              <dd>{product.enjoyedFor.map((b) => benefitTitle[b]).join(", ")}</dd>
            </div>
            <div>
              <dt>Contains</dt>
              <dd>{allergens.length ? <Placeholder note="kitchen to confirm allergens">{allergens.join(", ")}</Placeholder> : <Placeholder note="allergen list">To be confirmed</Placeholder>}</dd>
            </div>
            <div>
              <dt>Shelf life</dt>
              <dd>
                <Placeholder note="per-product shelf life">To be confirmed</Placeholder>
              </dd>
            </div>
          </dl>

          <div className={styles.details}>
            <details className="acc" open>
              <summary>About</summary>
              <div className="acc-body">
                <p>{product.description}</p>
              </div>
            </details>
            <details className="acc">
              <summary>Ingredients</summary>
              <div className="acc-body">
                {house.length ? (
                  <>
                    <table className={styles.table}>
                      <caption className="visually-hidden">House recipe per 500 g</caption>
                      <thead>
                        <tr>
                          <th scope="col">House recipe</th>
                          <th scope="col">per 500 g</th>
                        </tr>
                      </thead>
                      <tbody>
                        {house.map((r) => (
                          <tr key={r.key}>
                            <th scope="row">
                              <IngredientSwatch id={r.pick} className={styles.rowSwatch} sizes="24px" />
                              {ingredients[r.pick]?.name}
                              <span>{ingredients[r.pick]?.local}</span>
                            </th>
                            <td className="num">{formatGrams(r.grams)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p>
                      <Placeholder note="kitchen to confirm recipe">Amounts are a draft house recipe awaiting kitchen confirmation.</Placeholder>
                    </p>
                  </>
                ) : (
                  <>
                    <ul className={styles.list}>
                      {product.ingredients.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                    <p>
                      <Placeholder note="final ingredient list from the kitchen">Full ingredient list to be confirmed.</Placeholder>
                    </p>
                  </>
                )}
              </div>
            </details>
            <details className="acc">
              <summary>Nutrition</summary>
              <div className="acc-body">
                <table className={styles.table}>
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
                  <Placeholder note="lab-tested values">Values will be added after lab testing.</Placeholder>
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
              <summary>Storage</summary>
              <div className="acc-body">
                <p>{product.storage}</p>
              </div>
            </details>
            <details className="acc">
              <summary>Delivery &amp; returns</summary>
              <div className="acc-body">
                <p>
                  Free standard delivery over ₹999. If your order arrives damaged or incorrect, we replace or refund it.{" "}
                  <Link href="/shipping-returns" className="link">
                    Full policy
                  </Link>
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>

      <section className={styles.reviews} aria-labelledby="reviews-title">
        <h2 id="reviews-title">Reviews</h2>
        <p className="muted">
          <Placeholder note="connect a reviews provider">Reviews from verified buyers will appear here after launch.</Placeholder>
        </p>
      </section>

      <section className={styles.related} aria-labelledby="related-title">
        <div className="section-head">
          <h2 id="related-title">You may also like</h2>
          <Link href="/shop" className="arrow-link">
            Shop all <ArrowRight />
          </Link>
        </div>
        <div className={`${styles.relatedGrid} reveal-group`}>
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
