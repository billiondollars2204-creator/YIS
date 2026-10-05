import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopView, ShopViewLive } from "./ShopView";

export const metadata: Metadata = {
  title: "Shop panjiri, pinni, laddus & mixes",
  description: "Homemade panjiri, pinni, dry-fruit laddus, mewa mixes and gift boxes. Every ingredient listed. Free delivery over ₹999.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  // The fallback renders the full catalogue, so the static HTML lists every product.
  return (
    <Suspense fallback={<ShopView query="" />}>
      <ShopViewLive />
    </Suspense>
  );
}
