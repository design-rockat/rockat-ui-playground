import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

function read(path) {
  return readFileSync(resolve(root, path), "utf8");
}

test("Button uses semantic ds-* primitives", () => {
  const buttonSource = read("src/components/ui/button/Button.tsx");

  assert.match(buttonSource, /ds-radius-interactive/);
  assert.match(buttonSource, /ds-radius-button-sm/);
  assert.match(buttonSource, /ds-text-button-sm/);
  assert.match(buttonSource, /ds-text-button-md/);
  assert.match(buttonSource, /ds-text-button-lg/);
  assert.match(buttonSource, /ds-space-button-sm/);
  assert.match(buttonSource, /ds-space-button-md/);
  assert.match(buttonSource, /ds-space-button-lg/);
  assert.match(buttonSource, /ds-color-button-primary/);
  assert.match(buttonSource, /ds-color-button-default/);
  assert.match(buttonSource, /ds-color-button-dashed/);
  assert.match(buttonSource, /ds-color-button-text/);
  assert.match(buttonSource, /ds-color-button-link/);
  assert.match(buttonSource, /ds-color-button-danger/);
});

test("Button does not use hardcoded visual utility classes", () => {
  const buttonSource = read("src/components/ui/button/Button.tsx");
  const forbiddenPatterns = [
    /\brounded-(sm|md|lg|xl|2xl|3xl|full|none)\b/,
    /\btext-(xs|sm|base|lg|xl)\b/,
    /\bpx-\d+\b/,
    /\bpy-\d+\b/,
  ];

  for (const pattern of forbiddenPatterns) {
    assert.equal(pattern.test(buttonSource), false, `forbidden pattern found: ${pattern}`);
  }
});

test("AntD theme normalizes button radius across sizes", () => {
  const themeSource = read("src/design-system/theme/antd-theme.ts");
  assert.match(themeSource, /Button:\s*{[\s\S]*?borderRadius:\s*12/);
  assert.match(themeSource, /Button:\s*{[\s\S]*?borderRadiusSM:\s*8/);
  assert.match(themeSource, /Button:\s*{[\s\S]*?borderRadiusLG:\s*12/);
});

test("Semantic primitive classes are defined", () => {
  const primitivesSource = read("src/styles/primitives.css");
  const requiredClasses = [
    ".ds-radius-interactive",
    ".ds-radius-button-sm",
    ".ds-text-button-sm",
    ".ds-text-button-md",
    ".ds-text-button-lg",
    ".ds-space-button-sm",
    ".ds-space-button-md",
    ".ds-space-button-lg",
    ".ds-color-button-primary",
    ".ds-color-button-default",
    ".ds-color-button-dashed",
    ".ds-color-button-text",
    ".ds-color-button-link",
    ".ds-color-button-danger",
  ];

  for (const className of requiredClasses) {
    assert.match(primitivesSource, new RegExp(`\\${className}`));
  }
});
