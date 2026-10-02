"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { resolveLines, useCart, useCartUI, useHydrated } from "@/lib/cart";
import { formatINR } from "@/lib/money";
import { useDialog } from "@/lib/useDialog";
import { CartLines } from "./CartLines";
import { FreeShippingBar } from "./FreeShippingBar";
import { CloseIcon } from "./icons";
import styles from "./CartDrawer.module.css";

export function CartDrawer() {
  const open = useCartUI((s) => s.open);
  const setOpen = useCartUI((s) => s.setOpen);
  const raw = useCart((s) => s.lines);
  const hydrated = useHydrated();
  const pathname = usePathname();
  const ref = useDialog(open, () => setOpen(false));
  const lines = hydrated ? resolveLines(raw) : [];
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const close = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  return (
    <dialog ref={ref} className={`sheet sheet--right ${styles.drawer}`} aria-labelledby="cart-drawer-title">
      <div className={styles.inner}>
        <header className={styles.head}>
          <h2 id="cart-drawer-title" className={styles.title}>
            Your cart {count > 0 && <span className={styles.count}>({count})</span>}
          </h2>
          <button type="button" className="icon-btn" onClick={close} aria-label="Close cart">
            <CloseIcon />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className={styles.empty}>
            <p>Your cart is empty.</p>
            <Link href="/shop" className="btn" onClick={close}>
              Shop all products
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.ship}>
              <FreeShippingBar subtotal={subtotal} />
            </div>
            <div className={styles.body}>
              <CartLines lines={lines} onNavigate={close} />
            </div>
            <footer className={styles.foot}>
              <p className={styles.subtotal}>
                <span>Subtotal</span>
                <strong>{formatINR(subtotal)}</strong>
              </p>
              <p className={styles.note}>Taxes included. Delivery calculated at checkout.</p>
              <Link href="/checkout" className="btn btn--block btn--lg" onClick={close}>
                Checkout
              </Link>
              <Link href="/cart" className={styles.viewCart} onClick={close}>
                View cart
              </Link>
            </footer>
          </>
        )}
      </div>
    </dialog>
  );
}
