import { test } from "node:test";
import assert from "node:assert/strict";
import {
  canCustomize,
  customizationSignature,
  EMPTY_CUSTOMIZATION,
  isCustomized,
  minQtyForCustom,
} from "./customization.ts";

test("customization unlocks at 500 g of total line weight", () => {
  assert.equal(canCustomize(250, 1), false);
  assert.equal(canCustomize(250, 2), true);
  assert.equal(canCustomize(500, 1), true);
  assert.equal(canCustomize(1000, 1), true);
  assert.equal(canCustomize(200, 2), false);
});

test("minimum quantity per pack size", () => {
  assert.equal(minQtyForCustom(250), 2);
  assert.equal(minQtyForCustom(200), 3);
  assert.equal(minQtyForCustom(500), 1);
  assert.equal(minQtyForCustom(1000), 1);
});

test("signature ignores option order and treats empty as standard", () => {
  assert.equal(customizationSignature(EMPTY_CUSTOMIZATION), "std");
  assert.equal(isCustomized({ ...EMPTY_CUSTOMIZATION, note: "   " }), false);
  const a = customizationSignature({ ...EMPTY_CUSTOMIZATION, add: ["x", "y"] });
  const b = customizationSignature({ ...EMPTY_CUSTOMIZATION, add: ["y", "x"] });
  assert.equal(a, b);
  assert.notEqual(a, "std");
});
