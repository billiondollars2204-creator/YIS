import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopView, ShopViewLive } from "./ShopView";

export const metadata: Metadata = {
  title: "Shop all",
  description: "Homemade panjiri, pinni, dry-fruit laddus and dry-fruit mixes, made in small batches.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  // The fallback is the unfiltered catalogue, so the static HTML lists every product.
  return (
    <Suspense fallback={<ShopView query="" />}>
      <ShopViewLive />
    </Suspense>
  );
}
