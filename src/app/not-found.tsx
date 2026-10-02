import Link from "next/link";
import styles from "./content.module.css";

export default function NotFound() {
  return (
    <div className={`wrap ${styles.notFound}`}>
      <p className="eyebrow">Error 404</p>
      <h1 className={styles.pageTitle}>We couldn’t find that page</h1>
      <p>It may have moved, or never existed.</p>
      <Link href="/shop" className="btn">
        Shop all products
      </Link>
    </div>
  );
}
