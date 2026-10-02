import Link from "next/link";
import { ProductArt } from "@/components/art/ProductArt";
import styles from "./content.module.css";

export default function NotFound() {
  return (
    <div className={`wrap ${styles.notFound}`}>
      <div className={styles.notFoundArt} aria-hidden="true">
        <ProductArt kind="laddu" variant={2} />
      </div>
      <p className="eyebrow">Oops</p>
      <h1>This laddu rolled away</h1>
      <p className="lede">We couldn’t find that page. It may have moved, or never existed.</p>
      <Link href="/" className="btn">
        Back home
      </Link>
    </div>
  );
}
