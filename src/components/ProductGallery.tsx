"use client";

import { useState } from "react";
import type { ImageRef } from "@/data/images";
import { SmartImage } from "./SmartImage";
import styles from "./ProductGallery.module.css";

export function ProductGallery({ images, name }: { images: ImageRef[]; name: string }) {
  const [index, setIndex] = useState(0);
  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <SmartImage key={images[index].id} image={images[index]} sizes="(min-width: 960px) 50vw, 100vw" ratio="4 / 5" preload={index === 0} />
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
              <SmartImage image={im} sizes="96px" ratio="4 / 5" decorative />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
