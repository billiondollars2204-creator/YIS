import Link from "next/link";
import { ArrowRight } from "./icons";

type Props = { id: string; title: string; eyebrow?: string; href?: string; linkLabel?: string };

export function SectionHead({ id, title, eyebrow, href, linkLabel = "View all" }: Props) {
  return (
    <div className="section-head">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id}>{title}</h2>
      </div>
      {href && (
        <Link href={href} className="arrow-link">
          {linkLabel} <ArrowRight />
        </Link>
      )}
    </div>
  );
}
