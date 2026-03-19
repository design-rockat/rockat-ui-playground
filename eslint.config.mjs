import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/components/ui/button/Button.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXAttribute[name.name='style']",
          message:
            "Atomic DS rule: do not use inline style in Button. Consume semantic ds-* primitives.",
        },
        {
          selector: "Literal[value=/rounded-(sm|md|lg|xl|2xl|3xl|full|none)/]",
          message:
            "Atomic DS rule: do not use rounded-* directly in Button. Use ds-radius-interactive.",
        },
        {
          selector: "Literal[value=/(\\btext-(xs|sm|base|lg|xl)\\b|\\bpx-\\d+\\b|\\bpy-\\d+\\b)/]",
          message:
            "Atomic DS rule: do not use text-* or px*/py* visual utilities directly in Button. Use ds-text-button-* and ds-space-button-*.",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
