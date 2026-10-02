import type { Metadata } from "next";
import Link from "next/link";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false },
};

// PLACEHOLDER: connect to the commerce backend's customer accounts (e.g. OTP or magic-link login).
export default function AccountPage() {
  return (
    <div className={`wrap ${styles.narrow}`}>
      <h1 className={styles.pageTitle}>Sign in</h1>
      <p className={styles.intro}>Track orders, reorder favourites and save addresses. Accounts are coming soon — you can check out as a guest today.</p>
      <form className={styles.stack} aria-describedby="account-note">
        <div className="field">
          <label htmlFor="acc-phone">Mobile number or email</label>
          <input id="acc-phone" className="input" autoComplete="username" disabled />
        </div>
        <button type="button" className="btn btn--block" disabled>
          Send login code
        </button>
        <p id="account-note" className="hint">
          Placeholder — sign-in isn’t connected yet.
        </p>
      </form>
      <p>
        <Link href="/shop" className="link">
          Continue shopping
        </Link>
      </p>
    </div>
  );
}
