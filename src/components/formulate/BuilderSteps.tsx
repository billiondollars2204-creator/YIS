import Link from "next/link";
import styles from "./formulate.module.css";

const steps = ["Choose product", "Formulate", "Review"];

/** Three-step progress indicator for the custom-batch flow. */
export function BuilderSteps({ current, slug }: { current: 0 | 1 | 2; slug?: string }) {
  return (
    <ol className={styles.steps} aria-label="Custom batch steps">
      {steps.map((s, i) => {
        const state = i < current ? "done" : i === current ? "current" : "todo";
        const href = i === 0 ? "/customise" : i === 1 && slug ? `/customise/${slug}` : undefined;
        return (
          <li key={s} data-state={state} aria-current={i === current ? "step" : undefined}>
            <span className={styles.stepNum}>{i + 1}</span>
            {state === "done" && href ? <Link href={href}>{s}</Link> : <span>{s}</span>}
          </li>
        );
      })}
    </ol>
  );
}
