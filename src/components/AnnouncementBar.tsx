import Link from "next/link";
import { FREE_SHIPPING_THRESHOLD, formatINR } from "@/lib/money";
import styles from "./AnnouncementBar.module.css";

export function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <p className="wrap">
        <span>Free standard delivery over {formatINR(FREE_SHIPPING_THRESHOLD)}</span>
        <span className={styles.sep} aria-hidden="true" />
        <span className={styles.second}>
          Custom batches from 500 g —{" "}
          <Link href="/shop?custom=1" className={styles.link}>
            build yours
          </Link>
        </span>
      </p>
    </div>
  );
}
