import Image from "next/image";
import { resolveImage, type ImageRef } from "@/data/images";
import { showPlaceholderMarkers } from "@/lib/site";
import styles from "./SmartImage.module.css";

type Props = {
  image: ImageRef;
  sizes: string;
  /** CSS aspect-ratio, e.g. "4 / 5". Omit when the class sets the size. */
  ratio?: string;
  preload?: boolean;
  decorative?: boolean;
  className?: string;
  /** Drawn stand-in shown until the photo exists. */
  fallback?: React.ReactNode;
};

/** Renders the slot's image if it exists in /public, otherwise a quiet tonal placeholder. */
export function SmartImage({ image, sizes, ratio, preload, decorative, className, fallback }: Props) {
  const src = resolveImage(image.src);
  return (
    <div className={`${styles.frame} ${className ?? ""}`} style={ratio ? { aspectRatio: ratio } : undefined} data-tone={image.tone ?? "sand"}>
      {src ? (
        <Image src={src} alt={decorative ? "" : image.alt} fill sizes={sizes} preload={preload} className={styles.img} />
      ) : (
        <div
          className={fallback ? styles.drawn : styles.placeholder}
          {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": image.alt })}
        >
          {fallback ?? (showPlaceholderMarkers && <span className={styles.label}>{image.label}</span>)}
        </div>
      )}
    </div>
  );
}
