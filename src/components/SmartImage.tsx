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
  /** Rendered instead of the default placeholder while the photo is missing. */
  fallback?: React.ReactNode;
  /** Hide the slot label even when placeholder markers are on (small thumbnails). */
  quiet?: boolean;
};

/**
 * Renders the slot's photo if it exists in /public, otherwise a placeholder of
 * the same size so layout never shifts when real photography lands.
 */
export function SmartImage({ image, sizes, ratio, preload, decorative, className, fallback, quiet }: Props) {
  const src = resolveImage(image.src);
  return (
    <div className={`${styles.frame} ${className ?? ""}`} style={ratio ? { aspectRatio: ratio } : undefined} data-tone={image.tone ?? "sand"}>
      {src ? (
        <Image src={src} alt={decorative ? "" : image.alt} fill sizes={sizes} preload={preload} className={styles.img} />
      ) : (
        <div className={styles.placeholder} {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": image.alt })}>
          {fallback}
          {!fallback && showPlaceholderMarkers && !quiet && <span className={styles.label}>{image.label}</span>}
        </div>
      )}
    </div>
  );
}
