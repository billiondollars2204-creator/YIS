"use client";

import { ingredients } from "@/data/ingredients";
import type { FormulaLine, ResolvedRow } from "@/lib/customization";
import { formatINR } from "@/lib/money";
import { formatGrams } from "@/lib/units";
import { IngredientSwatch } from "../IngredientSwatch";
import { MinusIcon, PlusIcon } from "../icons";
import styles from "./formulate.module.css";

type Props = {
  line: FormulaLine;
  row: ResolvedRow;
  max: number;
  /** Fill-line ingredient name and minimum, for constraint messages. */
  fillName: string;
  fillMin: number;
  message?: string;
  disabled?: boolean;
  onAmount: (grams: number) => void;
  onPick: (id: string) => void;
};

export function IngredientRow({ line, row, max, fillName, fillMin, message, disabled, onAmount, onPick }: Props) {
  const ing = ingredients[row.pick];
  const changed = row.grams !== row.houseGrams || row.pick !== row.housePick;
  const per10 = (ing.pricePer100g / 10).toFixed(ing.pricePer100g < 100 ? 1 : 0);
  const state = row.grams === 0 ? "off" : changed ? "changed" : "house";
  const firstAdd = row.houseGrams > 0 ? row.houseGrams : Math.max(line.step, Math.round((line.max * 0.25) / line.step) * line.step);
  const msgId = `msg-${line.key}`;

  return (
    <li className={styles.row} data-state={state} data-role={line.role}>
      <IngredientSwatch id={row.pick} className={styles.rowImg} sizes="88px" />
      <div className={styles.rowBody}>
        <h4 className={styles.rowName}>
          {ing.name} <span lang="hi-Latn">{ing.local}</span>
          {line.role === "base" && <span className={styles.req}>Required</span>}
        </h4>
        <p className={styles.rowDesc}>{ing.description}</p>
        <p className={styles.rowMeta}>
          <span>{ing.prep}</span>
          {ing.allergen && <span className={styles.allergen}>{ing.allergen}</span>}
          {line.fill ? (
            <span>Fills the rest of the batch · at least {formatGrams(line.min)}</span>
          ) : (
            <>
              <span>
                {formatGrams(line.min)}–{formatGrams(line.max)}
              </span>
              <span>+{formatINR(Number(per10))} per 10 g above house</span>
            </>
          )}
        </p>
        {line.options.length > 1 && (
          <fieldset className={styles.swap} disabled={disabled}>
            <legend className="visually-hidden">Choose {line.key}</legend>
            {line.options.map((id) => {
              const o = ingredients[id];
              const diff = o.pricePer100g - ingredients[line.options[0]].pricePer100g;
              return (
                <label key={id} className="option">
                  <input type="radio" name={`pick-${line.key}`} checked={row.pick === id} onChange={() => onPick(id)} />
                  <span>
                    <strong>{o.name}</strong>
                    <small>{id === line.options[0] ? "House choice" : diff > 0 ? "Small extra cost" : "No extra cost"}</small>
                  </span>
                </label>
              );
            })}
          </fieldset>
        )}
      </div>

      <div className={styles.rowControl}>
        {line.fill ? (
          <p className={`${styles.fillAmount} num`}>
            {formatGrams(row.grams)}
            <small>auto</small>
          </p>
        ) : row.grams === 0 && line.role === "addition" ? (
          <button type="button" className="btn btn--quiet btn--sm" onClick={() => onAmount(Math.min(firstAdd, Math.max(line.step, max)))} disabled={disabled} aria-describedby={message ? msgId : undefined}>
            <PlusIcon /> Add<span className="visually-hidden"> {ing.name}</span>
          </button>
        ) : (
          <>
            <div className="stepper" role="group" aria-label={`${ing.name} amount per 500 g`}>
              <button type="button" onClick={() => onAmount(row.grams - line.step)} disabled={disabled || row.grams <= line.min} aria-label={`Less ${ing.name}`}>
                <MinusIcon />
              </button>
              <output className="num" aria-live="off">
                {formatGrams(row.grams)}
              </output>
              <button type="button" onClick={() => onAmount(row.grams + line.step)} disabled={disabled} aria-label={`More ${ing.name}`} aria-describedby={message ? msgId : undefined}>
                <PlusIcon />
              </button>
            </div>
            {row.grams >= max && !message && <span className={styles.atMax}>{row.grams >= line.max ? "Maximum" : "No room left"}</span>}
            {line.role === "addition" && (
              <button type="button" className={styles.remove} onClick={() => onAmount(0)} disabled={disabled}>
                Remove<span className="visually-hidden"> {ing.name}</span>
              </button>
            )}
          </>
        )}
        <p className={styles.house}>
          {changed ? (
            <button type="button" className={styles.resetOne} onClick={() => (row.pick !== row.housePick ? onPick(row.housePick) : onAmount(row.houseGrams))} disabled={disabled || line.fill}>
              House: {row.houseGrams ? formatGrams(row.houseGrams) : "none"}
              {!line.fill && <span> · reset</span>}
            </button>
          ) : (
            <>House amount</>
          )}
        </p>
      </div>

      {message && (
        <p id={msgId} className={styles.limit} role="status">
          {message.replace("{fill}", fillName).replace("{fillMin}", formatGrams(fillMin))}
        </p>
      )}
    </li>
  );
}
