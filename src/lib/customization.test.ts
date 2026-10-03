import { test } from "node:test";
import assert from "node:assert/strict";
import {
  canCustomize,
  customizationSignature,
  EMPTY_CUSTOMIZATION,
  isCustomized,
  minQtyForCustom,
  normalize,
  packSurcharge,
} from "./customization.ts";

const recipe = {
  ingredients: [
    { id: "almond", default: 2 },
    { id: "raisin", default: 1 },
  ],
  choices: [{ id: "sweetener", default: "jaggery" }],
};
const prices = { almond: 30, raisin: 15 };

test("customisation unlocks at 500 g of total line weight", () => {
  assert.equal(canCustomize(250, 1), false);
  assert.equal(canCustomize(250, 2), true);
  assert.equal(canCustomize(500, 1), true);
  assert.equal(canCustomize(1000, 2), true);
  assert.equal(canCustomize(200, 2), false);
});

test("minimum quantity per pack size", () => {
  assert.equal(minQtyForCustom(250), 2);
  assert.equal(minQtyForCustom(200), 3);
  assert.equal(minQtyForCustom(500), 1);
});

test("normalize drops values equal to the house recipe", () => {
  const c = normalize({ levels: { almond: 2, raisin: 0 }, choices: { sweetener: "jaggery" }, note: "  " }, recipe);
  assert.deepEqual(c, { levels: { raisin: 0 }, choices: {}, note: "" });
  assert.equal(isCustomized(normalize({ levels: { almond: 2 }, choices: {}, note: "" }, recipe)), false);
});

test("signature is order-independent and 'std' when unchanged", () => {
  assert.equal(customizationSignature(EMPTY_CUSTOMIZATION), "std");
  const a = customizationSignature({ levels: { a: 1, b: 2 }, choices: {}, note: "" });
  const b = customizationSignature({ levels: { b: 2, a: 1 }, choices: {}, note: "" });
  assert.equal(a, b);
  assert.notEqual(a, "std");
});

test("surcharge charges only for extra levels, scaled by pack weight", () => {
  assert.equal(packSurcharge({ levels: { almond: 3 }, choices: {}, note: "" }, recipe, prices, 500), 30);
  assert.equal(packSurcharge({ levels: { almond: 3, raisin: 3 }, choices: {}, note: "" }, recipe, prices, 1000), 120);
  assert.equal(packSurcharge({ levels: { almond: 0 }, choices: {}, note: "" }, recipe, prices, 500), 0);
});
