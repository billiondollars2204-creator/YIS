import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/data/content";
import { JsonLd } from "@/components/JsonLd";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions about our homemade panjiri, pinni, laddus and dry-fruit mixes — answered.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((g) =>
      g.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
    ),
  };
  return (
    <div className="wrap">
      <header className={styles.hero}>
        <p className="eyebrow">Good questions</p>
        <h1>Frequently asked</h1>
        <p className="lede">
          Can’t find what you need? <Link href="/contact" className="link">Ask us directly</Link>.
        </p>
      </header>
      <div className={styles.body}>
        {faqs.map((g) => (
          <section key={g.group} className={styles.faqGroup} aria-labelledby={`faq-${g.group}`}>
            <h2 id={`faq-${g.group}`}>{g.group}</h2>
            {g.items.map((i) => (
              <details key={i.q} className="acc">
                <summary>{i.q}</summary>
                <div className="acc-body">
                  <p>{i.a}</p>
                </div>
              </details>
            ))}
          </section>
        ))}
      </div>
      <JsonLd data={faqLd} />
    </div>
  );
}
