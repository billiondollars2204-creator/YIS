import Link from "next/link";
import { ArrowRight } from "./icons";

type Props = {
  id: string;
  title: React.ReactNode;
  index?: string;
  eyebrow?: string;
  description?: string;
  href?: string;
  linkLabel?: string;
};

/** Every section uses the same anatomy: index + label, title, one line, one link. */
export function SectionHead({ id, title, index, eyebrow, description, href, linkLabel = "View all" }: Props) {
  return (
    <div className="section-head">
      <div>
        {(eyebrow || index) && (
          <p className="section-label">
            {index && <span>{index}</span>}
            {eyebrow}
          </p>
        )}
        <h2 id={id}>{title}</h2>
      </div>
      {(description || href) && (
        <div className="section-side">
          {description && <p>{description}</p>}
          {href && (
            <Link href={href} className="arrow-link">
              {linkLabel} <ArrowRight />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
