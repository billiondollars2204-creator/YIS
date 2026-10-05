import type { Metadata } from "next";
import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { Breadcrumbs } from "@/components/ui";
import { site } from "@/lib/site";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects your personal data.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/support", label: "Help" }, { label: "Privacy policy" }]} />
      <header className={styles.head}>
        <h1>Privacy policy</h1>
        <p className="muted">
          <Placeholder note="legal review before launch">Draft policy, written to follow India’s Digital Personal Data Protection Act, 2023.</Placeholder>
        </p>
      </header>
      <div className="prose" style={{ paddingBottom: "var(--sp-6)" }}>
        <h2>What we collect</h2>
        <ul>
          <li><strong>Order details:</strong> name, phone, email, delivery address and PIN code, so we can cook, pack and deliver your order.</li>
          <li><strong>Payment status:</strong> payments are handled by our payment provider. We never see or store your card, UPI PIN or bank details.</li>
          <li><strong>Account and preferences:</strong> saved items, subscriptions and custom-batch recipes.</li>
          <li><strong>Usage data:</strong> pages viewed and basic device information, only if you accept analytics cookies.</li>
        </ul>
        <h2>How we use it</h2>
        <p>To fulfil and support your orders, send order and delivery updates, manage subscriptions, and, only with your consent, send offers or measure how the site is used. We don’t sell your data.</p>
        <h2>Who we share it with</h2>
        <p>Only the providers needed to run the store: our payment gateway, courier partners, and email/SMS and hosting providers. Each one may use the data only for that purpose.</p>
        <h2>Cookies</h2>
        <p>Essential storage keeps your cart, login and saved items working. Analytics cookies load only after you choose <em>Accept</em> in the cookie banner. You can change your choice at any time with “Cookie settings” in the footer.</p>
        <h2>How long we keep it</h2>
        <p>Order records are kept for <Placeholder note="confirm with accountant">8 years</Placeholder>, as tax law requires. Marketing preferences are kept until you withdraw consent.</p>
        <h2>Your rights</h2>
        <p>You can ask to see, correct or delete your data, withdraw consent, or nominate someone to act for you. Email <a href={`mailto:${site.email}`}>{site.email}</a> and we’ll reply within <Placeholder note="confirm">30 days</Placeholder>.</p>
        <h2>Grievance officer</h2>
        <p><Placeholder note="name, email and address required by law">Name and contact details to be added.</Placeholder></p>
        <p>
          See also our <Link href="/terms">terms of use</Link> and <Link href="/shipping-returns">shipping &amp; returns</Link>.
        </p>
      </div>
    </div>
  );
}
