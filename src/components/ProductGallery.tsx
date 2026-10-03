"use client";

import { useState } from "react";
import type { ImageRef } from "@/data/images";
import { SmartImage } from "./SmartImage";
import styles from "./ProductGallery.module.css";

export function ProductGallery({ images, name, fallbacks = [] }: { images: ImageRef[]; name: string; fallbacks?: React.ReactNode[] }) {
  const [index, setIndex] = useState(0);
  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <SmartImage
          key={images[index].id}
          image={images[index]}
          sizes="(min-width: 960px) 50vw, 100vw"
          ratio="4 / 5"
          preload={index === 0}
          fallback={fallbacks[index]}
          className={styles.fade}
        />
      </div>
      <ul className={styles.thumbs} aria-label={`${name} images`}>
        {images.map((im, i) => (
          <li key={im.id}>
            <button
              type="button"
              className={styles.thumb}
              aria-current={i === index || undefined}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              onClick={() => setIndex(i)}
            >
              <SmartImage image={im} sizes="96px" ratio="4 / 5" decorative fallback={fallbacks[i]} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
