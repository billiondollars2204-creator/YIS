import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, isSoldOut, products } from "@/data/products";
import { benefitTitle, faqs } from "@/data/content";
import { productImages, resolveImage } from "@/data/images";
import { getFormula } from "@/data/formulations";
import { ingredients, type Allergen } from "@/data/ingredients";
import { EMPTY_CUSTOMIZATION, MIN_CUSTOM_GRAMS, resolveFormula } from "@/lib/customization";
import { formatGrams, formatShare } from "@/lib/units";
import { site } from "@/lib/site";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductBuy } from "@/components/ProductBuy";
import { ProductCard } from "@/components/ProductCard";
import { IngredientSwatch } from "@/components/IngredientSwatch";
import { Placeholder } from "@/components/Placeholder";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs, Stars, VegMark } from "@/components/ui";
import { ArrowRight, BoxIcon, LeafIcon, ScaleIcon } from "@/components/icons";
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
    title: `${p.name} — ${p.short}`,
    description: `${p.tagline} From ₹${Math.min(...p.variants.map((v) => v.price))}. Every ingredient listed.`,
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
  const house = formula ? resolveFormula(formula, EMPTY_CUSTOMIZATION).filter((r) => r.grams > 0).sort((a, b) => b.grams - a.grams) : [];
  const allergens = [...new Set(house.map((r) => ingredients[r.pick]?.allergen).filter(Boolean))] as Allergen[];
  const contents = product.contents?.map((c) => ({ ...c, product: getProduct(c.slug)! })) ?? [];
  const others = products.filter((p) => p.slug !== product.slug && !isSoldOut(p));
  const related = [...others.filter((p) => p.category === product.category), ...others.filter((p) => p.category !== product.category)].slice(0, 4);
  const productFaqs = faqs.flatMap((g) => g.items).filter((f) => (formula ? true : !/custom/i.test(f.q))).slice(0, 3);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: category?.name,
    brand: { "@type": "Brand", name: site.name },
    countryOfOrigin: "IN",
    image: imgs.map((i) => resolveImage(i.src)).filter(Boolean).map((src) => `${site.url}${src}`),
    // PLACEHOLDER: add sku/gtin and aggregateRating once real reviews exist.
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
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: category?.name ?? "Shop", item: `${site.url}/shop?category=${product.category}` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${site.url}/shop/${product.slug}` },
    ],
  };

  return (
    <div className="container">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: `/shop?category=${product.category}`, label: category?.name ?? "Shop" }, { label: product.name }]} />

      <div className={styles.layout}>
        <div className={styles.gallery}>
          <ProductGallery images={imgs} name={product.name} caption={product.hindi} />
        </div>

        <div className={styles.info}>
          <div className={styles.tags}>
            {product.badge && <span className="tag tag--brand">{product.badge}</span>}
            {product.customizable && <span className="tag tag--custom">Customisable</span>}
            <VegMark />
          </div>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={`hindi ${styles.hindi}`} lang="hi">
            {product.hindi}
          </p>
          <Stars />
          <p className={styles.tagline}>{product.tagline}</p>

          {contents.length > 0 && (
            <div className={styles.contents}>
              <p className="label">In the box</p>
              <ul>
                {contents.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/shop/${c.slug}`}>{c.product.name}</Link>
                    <span className="muted">
                      {c.product.variants.find((v) => v.id === c.variant)?.label} × {c.qty}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ProductBuy product={product} />

          {formula && !isSoldOut(product) && (
            <Link href={`/customise/${product.slug}`} className={styles.custom}>
              <span className={styles.customSwatches} aria-hidden="true">
                {house.slice(0, 5).map((r) => (
                  <IngredientSwatch key={r.key} id={r.pick} className={styles.sw} sizes="32px" />
                ))}
              </span>
              <span>
                <strong>Make it your way</strong>
                <span>Adjust {formula.lines.filter((l) => !l.fill).length} ingredients by the gram. Cooked as its own batch, from {MIN_CUSTOM_GRAMS} g.</span>
              </span>
              <ArrowRight />
            </Link>
          )}

          <ul className={styles.highlights}>
            <li>
              <ScaleIcon /> Full recipe listed by weight
            </li>
            <li>
              <LeafIcon /> Roasted by hand in small batches
            </li>
            <li>
              <BoxIcon /> Damaged on arrival? We replace it.{" "}
              <Link href="/shipping-returns" className="link">
                Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.details}>
        <div>
          <details className="acc" open>
            <summary>Description</summary>
            <div className="acc-body">
              <p>{product.description}</p>
              <p>
                <strong>Traditionally enjoyed for:</strong> {product.enjoyedFor.map((b) => benefitTitle[b]).join(", ")}. <Placeholder note="regulatory review">Not a medical claim.</Placeholder>
              </p>
            </div>
          </details>
          <details className="acc" open={!!house.length}>
            <summary>Ingredients</summary>
            <div className="acc-body">
              {house.length ? (
                <>
                  <table className={styles.table}>
                    <caption className="visually-hidden">House recipe per 500 g, in descending order of weight</caption>
                    <thead>
                      <tr>
                        <th scope="col">Ingredient</th>
                        <th scope="col">Per 500 g</th>
                        <th scope="col">Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      {house.map((r) => (
                        <tr key={r.key}>
                          <th scope="row">
                            <IngredientSwatch id={r.pick} className={styles.rowSw} sizes="20px" />
                            {ingredients[r.pick]?.name} <span className="hindi">{ingredients[r.pick]?.local}</span>
                          </th>
                          <td className="num">{formatGrams(r.grams)}</td>
                          <td className="num">{formatShare(r.share)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p>
                    <Placeholder note="kitchen to confirm recipe">Draft house recipe awaiting kitchen confirmation.</Placeholder>
                  </p>
                </>
              ) : (
                <ul>
                  {product.ingredients.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              )}
            </div>
          </details>
          <details className="acc">
            <summary>Allergens</summary>
            <div className="acc-body">
              <p>
                Contains: <strong>{allergens.length ? allergens.join(", ") : "see ingredients"}</strong>.{" "}
                <Placeholder note="kitchen to confirm cross-contact statement">Made in a kitchen that also handles tree nuts, milk and gluten.</Placeholder>
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>Nutrition (per 100 g)</summary>
            <div className="acc-body">
              <table className={styles.table}>
                <caption className="visually-hidden">Typical values per 100 g</caption>
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
                <Placeholder note="lab-tested values">Values will be published after lab testing.</Placeholder>
              </p>
            </div>
          </details>
          <details className="acc">
            <summary>How to enjoy & store</summary>
            <div className="acc-body">
              <p>{product.preparation}</p>
              <p>{product.storage}</p>
            </div>
          </details>
          <details className="acc">
            <summary>Manufacturer & legal information</summary>
            <div className="acc-body">
              <dl className={styles.legal}>
                <div>
                  <dt>Net quantity</dt>
                  <dd>{product.variants.map((v) => v.label).join(" / ")}</dd>
                </div>
                <div>
                  <dt>MRP</dt>
                  <dd>As shown for each size, inclusive of all taxes</dd>
                </div>
                <div>
                  <dt>Country of origin</dt>
                  <dd>India</dd>
                </div>
                <div>
                  <dt>Best before</dt>
                  <dd>
                    <Placeholder note="per-product shelf life">Printed on the pack</Placeholder>
                  </dd>
                </div>
                <div>
                  <dt>Manufactured & marketed by</dt>
                  <dd>
                    <Placeholder note="legal entity name and address">{site.name}, address to be added</Placeholder>
                  </dd>
                </div>
                <div>
                  <dt>FSSAI licence</dt>
                  <dd>
                    <Placeholder note="licence number">To be added</Placeholder>
                  </dd>
                </div>
                <div>
                  <dt>Customer care</dt>
                  <dd>
                    {site.email} · {site.phone}
                  </dd>
                </div>
              </dl>
            </div>
          </details>
        </div>

        <section className={styles.reviews} aria-labelledby="reviews-title">
          <h2 id="reviews-title">Reviews</h2>
          <Stars label="No reviews yet" />
          <p className="muted small">Reviews from verified buyers will appear here after launch. We publish every review, good or bad.</p>
          <h3 className={styles.qTitle}>Common questions</h3>
          {productFaqs.map((f) => (
            <details key={f.q} className="acc">
              <summary>{f.q}</summary>
              <div className="acc-body">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </section>
      </div>

      <section className="section" aria-labelledby="related-title">
        <div className="section-title">
          <h2 id="related-title">You may also like</h2>
          <Link href="/shop" className="more">
            Shop all <ArrowRight />
          </Link>
        </div>
        <div className="grid-products">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
      <JsonLd data={productLd} />
      <JsonLd data={crumbsLd} />
    </div>
  );
}
