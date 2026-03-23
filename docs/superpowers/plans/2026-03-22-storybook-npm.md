# Storybook + npm Package Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Storybook with interactive stories for all design system tokens and components, and configure the repo as an npm package publishable to GitHub Packages.

**Architecture:** Storybook 8 with `@storybook/nextjs` shares the Next.js PostCSS + Tailwind 4 pipeline. A custom global decorator wraps every story with `ConfigProvider` directly (avoiding localStorage side-effects), controlled by a toolbar parameter. `tsup` compiles `src/index.ts` → `dist/` (ESM + CJS + `.d.ts`); CSS files are copied post-build via an npm script.

**Tech Stack:** Storybook 8 (`@storybook/nextjs`), tsup 8, React 19, Ant Design 6, Tailwind CSS 4, TypeScript 5

---

## File Map

**Create:**
- `.storybook/main.ts` — Storybook framework config
- `.storybook/preview.tsx` — global decorator + theme toolbar
- `src/stories/tokens/Colors.stories.tsx`
- `src/stories/tokens/Typography.stories.tsx`
- `src/stories/tokens/Spacing.stories.tsx`
- `src/stories/tokens/Radius.stories.tsx`
- `src/stories/tokens/Icons.stories.tsx`
- `src/stories/components/Button.stories.tsx`
- `src/stories/components/Input.stories.tsx`
- `src/stories/components/Card.stories.tsx`
- `src/stories/components/Table.stories.tsx`
- `tsup.config.ts`

**Modify:**
- `src/index.ts` — add `"use client"` + export `Table`, `Column` (no `TableProps` — props type is private `Props<T>` in Table.tsx)
- `package.json` — remove `"private"`, add `name`/`exports`/`files`/`peerDependencies`/`publishConfig`/scripts
- `.gitignore` — add `dist/`

---

### Task 1: Update src/index.ts

**Files:**
- Modify: `src/index.ts`

- [ ] **Step 1: Add "use client" and Table exports**

Replace the entire `src/index.ts` with:

```typescript
"use client";

// Components
export { Button } from "./components/ui/button";
export type { ButtonProps } from "./components/ui/button";

export { Input } from "./components/ui/input";
export type { InputProps } from "./components/ui/input";

export { Card } from "./components/ui/card";
export type { CardProps } from "./components/ui/card";

export { Table } from "./components/ui/table";
export type { Column } from "./components/ui/table";
// Note: Table's props are typed as `Props<T>` (not exported). Column<T> is the public type.

// Design System
export { ThemeProvider, useThemeContext } from "./design-system/theme/provider";
export { rockatLightTheme, rockatDarkTheme } from "./design-system/theme/antd-theme";

// Tokens
export { colors, spacing, radius, typography } from "./design-system/tokens";
```

- [ ] **Step 2: Verify lint passes**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/index.ts
git commit -m "feat: export Table and Column from public surface, add use client to entry"
```

---

### Task 2: Install Storybook

**Files:**
- Modify: `package.json` (devDependencies only — scripts added in Task 14)

- [ ] **Step 1: Install Storybook packages**

```bash
npm install -D storybook@latest @storybook/nextjs @storybook/addon-essentials
```

Expected: packages added to `devDependencies` in `package.json`. No errors.

- [ ] **Step 2: Create .storybook directory**

```bash
mkdir -p .storybook
```

- [ ] **Step 3: Create .storybook/main.ts**

```typescript
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: { autodocs: 'tag' },
};

export default config;
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .storybook/main.ts
git commit -m "chore: install Storybook 8 with @storybook/nextjs"
```

---

### Task 3: Create .storybook/preview.tsx

**Files:**
- Create: `.storybook/preview.tsx`

> **Decorator design note:** The decorator uses `ConfigProvider` from Ant Design directly (not the project's `ThemeProvider`). Reason: `ThemeProvider` reads/writes `localStorage` and `document` in `useEffect`, which creates timing issues in Storybook (localStorage persists between stories and can override the toolbar selection). Using `ConfigProvider` directly gives the toolbar full, synchronous control over the theme.

- [ ] **Step 1: Create the global decorator and theme toolbar**

```tsx
import React from 'react';
import type { Preview, Decorator } from '@storybook/react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { rockatLightTheme, rockatDarkTheme } from '../src/design-system/theme/antd-theme';
import '../src/app/globals.css';

const withTheme: Decorator = (Story, context) => {
  const isDark = context.globals.theme === 'dark';

  // Sync CSS tokens with toolbar selection
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

  const antdConfig = {
    ...(isDark ? rockatDarkTheme : rockatLightTheme),
    algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  };

  return (
    <ConfigProvider theme={antdConfig}>
      <div
        style={{
          background: 'var(--rockat-bg)',
          minHeight: '100vh',
          padding: '1.5rem',
          transition: 'background 0.2s',
          color: 'var(--rockat-text)',
        }}
      >
        <Story />
      </div>
    </ConfigProvider>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
```

- [ ] **Step 2: Add storybook scripts to package.json**

In `package.json`, inside `"scripts"`, add:

```json
"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build"
```

- [ ] **Step 3: Boot Storybook and verify no errors**

```bash
npm run storybook
```

Expected: browser opens at `http://localhost:6006`. No console errors. An empty sidebar is fine — no stories yet.

> **Tailwind 4 / PostCSS:** `@storybook/nextjs` 8.4+ picks up the project's `postcss.config.mjs` automatically via the Next.js webpack pipeline. If CSS fails to load (tokens not applied, unstyled components), check that `postcss.config.mjs` exports `{ plugins: { '@tailwindcss/postcss': {} } }` at the repo root. If the issue persists, verify the installed Storybook version is ≥ 8.4: `npx storybook --version`.

Kill the server with `Ctrl+C` after confirming it boots.

- [ ] **Step 4: Commit**

```bash
git add .storybook/preview.tsx package.json
git commit -m "chore: configure Storybook preview with theme toolbar and global decorator"
```

---

### Task 4: Colors story

**Files:**
- Create: `src/stories/tokens/Colors.stories.tsx`
- Source reference: `src/app/colors/page.tsx` (data and component logic to port)
- Source reference: `src/design-system/tokens/colors.ts` (color data)

- [ ] **Step 1: Create the Colors story file**

```tsx
import React, { useState, useCallback } from 'react';
import type { Meta } from '@storybook/react';
import { colors } from '@/design-system/tokens/colors';
import { Check, Copy } from 'lucide-react';

// ── Data ────────────────────────────────────────────────────────────────────

type ColorGroup = { name: string; palette: Record<string, string>; cssPrefix: string };

const colorGroups: ColorGroup[] = [
  { name: 'Primary',   palette: colors.primary,   cssPrefix: '--rockat-primary'   },
  { name: 'Neutral',   palette: colors.neutral,    cssPrefix: '--rockat-neutral'   },
  { name: 'Secondary', palette: colors.secondary,  cssPrefix: '--rockat-secondary' },
  { name: 'Tertiary',  palette: colors.tertiary,   cssPrefix: '--rockat-tertiary'  },
];

const semanticTokens = [
  {
    category: 'Background',
    description: 'Use para todos os fundos de UI. Adaptam-se automaticamente ao tema claro/escuro.',
    tokens: [
      { name: '--rockat-bg',           light: '#ffffff', dark: '#13111c', usage: 'Fundo principal da página'         },
      { name: '--rockat-bg-subtle',    light: '#f9f8ff', dark: '#1a1625', usage: 'Seções e áreas de destaque sutil'  },
      { name: '--rockat-bg-elevated',  light: '#ffffff', dark: '#211d2e', usage: 'Cards, dropdowns e modais'         },
      { name: '--rockat-sidebar-bg',   light: '#faf9ff', dark: '#0f0d18', usage: 'Fundo da barra lateral'            },
    ],
  },
  {
    category: 'Text',
    description: 'Dois níveis de hierarquia tipográfica. Garantem legibilidade e contraste WCAG em ambos os temas.',
    tokens: [
      { name: '--rockat-text',       light: '#171717', dark: '#f0ecff', usage: 'Texto principal, headings, labels'        },
      { name: '--rockat-text-muted', light: '#525252', dark: '#a3a3a3', usage: 'Texto secundário, descrições, metadados'  },
    ],
  },
  {
    category: 'Border',
    description: 'Bordas consistentes em todo o sistema. Nunca use valores hex fixos para bordas.',
    tokens: [
      { name: '--rockat-border',          light: '#e5e5e5', dark: '#2d2840', usage: 'Inputs, cards e separadores'     },
      { name: '--rockat-sidebar-border',  light: '#ede4ff', dark: '#2d2840', usage: 'Bordas da navegação lateral'     },
    ],
  },
];

const usageRules = [
  { type: 'do'      as const, rule: 'Use semantic tokens em componentes, nunca primitive tokens',   detail: 'Use --rockat-text para cor de texto, --rockat-bg para fundos. Semantic tokens garantem que o tema claro/escuro funcione automaticamente.' },
  { type: 'dont'    as const, rule: 'Nunca use valores hex diretamente no código de componentes',   detail: 'Valores fixos como color: #8001ff quebram o sistema de temas. Sempre referencie um token CSS var.' },
  { type: 'do'      as const, rule: 'Reserve primitive tokens para definir novos semantic tokens',  detail: 'Se precisar de um novo token, defina-o em tokens.css mapeando um primitive: --meu-token: var(--rockat-primary-200).' },
  { type: 'do'      as const, rule: 'Use primary-700 como cor de ação principal',                  detail: 'Botões primários, links, focus rings e ícones interativos usam --rockat-primary-700. Contraste ≈ 6:1 com branco (WCAG AA ✓).' },
  { type: 'do'      as const, rule: 'Use primary-50 / primary-100 para hover states',              detail: 'Backgrounds de hover em menus, badges informativos e tooltips usam os extremos claros da escala primária.' },
  { type: 'do'      as const, rule: 'Use neutral para estrutura, não para identidade visual',       detail: 'Bordas, textos secundários e fundos estruturais usam a escala neutral.' },
  { type: 'caution' as const, rule: 'Verifique contraste antes de colocar texto sobre cor',         detail: 'Texto branco sobre primary-400 ou mais claro falha WCAG AA.' },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function MiniSwatch({ color }: { color: string }) {
  return (
    <span className="inline-block w-4 h-4 rounded flex-shrink-0"
      style={{ background: color, border: '1px solid rgba(0,0,0,0.1)' }} />
  );
}

function ColorCard({ scale, hex, cssVar }: { scale: string; hex: string; cssVar: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(cssVar); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  }, [cssVar]);

  return (
    <div className="rounded-xl overflow-hidden cursor-pointer group"
      style={{ border: '1px solid var(--rockat-border)' }} onClick={handleCopy}>
      <div className="h-20 relative flex items-end justify-end p-1.5" style={{ background: hex }}>
        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition-opacity duration-150 ${copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          style={{ background: 'rgba(0,0,0,0.55)', color: '#fff' }}>
          {copied ? 'Copiado!' : <Copy size={10} />}
        </span>
      </div>
      <div className="px-2.5 py-2" style={{ background: 'var(--rockat-bg-elevated)' }}>
        <p className="text-[11px] font-semibold leading-tight" style={{ color: 'var(--rockat-text)' }}>{scale}</p>
        <p className="text-[10px] font-mono mt-0.5" style={{ color: 'var(--rockat-text-muted)' }}>{hex}</p>
        <p className="text-[10px] font-mono mt-0.5 truncate" style={{ color: 'var(--rockat-accent-text)' }}>{cssVar}</p>
      </div>
    </div>
  );
}

function TokenRow({ token }: { token: typeof semanticTokens[0]['tokens'][0] }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(token.name); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  }, [token.name]);

  return (
    <div className="group grid items-center px-4 py-3 text-xs gap-3"
      style={{ gridTemplateColumns: '1fr 1fr 1fr 1.5fr', background: 'var(--rockat-bg-elevated)', borderTop: '1px solid var(--rockat-border)' }}>
      <button className="flex items-center gap-1.5 text-left" onClick={handleCopy}>
        <code className="font-mono text-[10px] truncate" style={{ color: 'var(--rockat-accent-text)' }}>{token.name}</code>
        <span className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {copied ? <Check size={10} style={{ color: 'var(--rockat-accent-text)' }} /> : <Copy size={10} style={{ color: 'var(--rockat-text-muted)' }} />}
        </span>
      </button>
      <div className="flex items-center gap-2"><MiniSwatch color={token.light} /><span className="font-mono text-[10px]" style={{ color: 'var(--rockat-text-muted)' }}>{token.light}</span></div>
      <div className="flex items-center gap-2"><MiniSwatch color={token.dark} /><span className="font-mono text-[10px]" style={{ color: 'var(--rockat-text-muted)' }}>{token.dark}</span></div>
      <span style={{ color: 'var(--rockat-text-muted)' }}>{token.usage}</span>
    </div>
  );
}

// ── Page component (rendered by the story) ───────────────────────────────────

function ColorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--rockat-text)' }}>Colors</h1>
        <p className="text-base" style={{ color: 'var(--rockat-text-muted)' }}>Paleta de cores e tokens do sistema</p>
      </div>

      {/* Primitive Tokens */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--rockat-text)' }}>Primitive Tokens</h2>
        {colorGroups.map((group) => (
          <div key={group.name} className="mb-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--rockat-text-muted)' }}>{group.name}</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {Object.entries(group.palette).map(([scale, hex]) => (
                <ColorCard key={scale} scale={scale} hex={hex} cssVar={`${group.cssPrefix}-${scale}`} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Semantic Tokens */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--rockat-text)' }}>Semantic Tokens</h2>
        <div className="space-y-8">
          {semanticTokens.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--rockat-text)' }}>{group.category}</h3>
              <p className="text-xs mb-3" style={{ color: 'var(--rockat-text-muted)' }}>{group.description}</p>
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--rockat-border)' }}>
                <div className="grid px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-3"
                  style={{ gridTemplateColumns: '1fr 1fr 1fr 1.5fr', background: 'var(--rockat-primary-50)', color: 'var(--rockat-text-muted)' }}>
                  <span>Token</span><span>Light</span><span>Dark</span><span>Uso</span>
                </div>
                {group.tokens.map((token) => <TokenRow key={token.name} token={token} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--rockat-text)' }}>Usage Guidelines</h2>
        <div className="space-y-3">
          {usageRules.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: 'var(--rockat-bg-elevated)', border: '1px solid var(--rockat-border)' }}>
              <span className="mt-0.5 flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
                style={{
                  background: item.type === 'do' ? 'var(--rockat-success-bg)' : item.type === 'dont' ? 'var(--rockat-danger-bg)' : 'var(--rockat-warning-bg)',
                  color:      item.type === 'do' ? 'var(--rockat-success-text)' : item.type === 'dont' ? 'var(--rockat-danger-text)' : 'var(--rockat-warning-text)',
                }}>
                {item.type === 'do' ? 'Do' : item.type === 'dont' ? "Don't" : 'Atenção'}
              </span>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--rockat-text)' }}>{item.rule}</p>
                <p className="text-xs" style={{ color: 'var(--rockat-text-muted)' }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design System/Colors',
  component: ColorsPage,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;

export const Default = {};
```

- [ ] **Step 2: Run Storybook and verify the Colors story renders**

```bash
npm run storybook
```

Navigate to "Design System → Colors". Verify swatches render, theme toggle changes background/text colors, click copies CSS var to clipboard.

- [ ] **Step 3: Commit**

```bash
git add src/stories/tokens/Colors.stories.tsx
git commit -m "docs(storybook): add Colors token story"
```

---

### Task 5: Typography story

**Files:**
- Create: `src/stories/tokens/Typography.stories.tsx`
- Source reference: `src/app/typography/page.tsx`
- Source reference: `src/design-system/tokens/typography.ts`

- [ ] **Step 1: Create the Typography story file**

```tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { typography } from '@/design-system/tokens/typography';

// ── Data (ported from src/app/typography/page.tsx) ───────────────────────────

const typeScaleItems = [
  { key: 'xs',  size: '12px', weight: '400',     lineHeight: 1.5,  role: 'Caption, labels, badges',      tailwind: 'text-xs'   },
  { key: 'sm',  size: '14px', weight: '400',     lineHeight: 1.5,  role: 'Body small, helper text',      tailwind: 'text-sm'   },
  { key: 'md',  size: '16px', weight: '400',     lineHeight: 1.5,  role: 'Body default, paragraphs',     tailwind: 'text-base' },
  { key: 'lg',  size: '18px', weight: '400/600', lineHeight: 1.5,  role: 'Body large, intro text',       tailwind: 'text-lg'   },
  { key: 'xl',  size: '20px', weight: '600',     lineHeight: 1.25, role: 'Heading XS, card title',       tailwind: 'text-xl'   },
  { key: '2xl', size: '24px', weight: '600',     lineHeight: 1.25, role: 'Heading S, section title',     tailwind: 'text-2xl'  },
  { key: '3xl', size: '30px', weight: '700',     lineHeight: 1.25, role: 'Heading M, page title',        tailwind: 'text-3xl'  },
  { key: '4xl', size: '36px', weight: '700',     lineHeight: 1.1,  role: 'Heading L, hero / display',    tailwind: 'text-4xl'  },
];

const weightItems = [
  { key: 'normal',   weight: 400, usage: 'Body, descriptions, paragraphs' },
  { key: 'medium',   weight: 500, usage: 'UI labels, navigation, tabs'     },
  { key: 'semibold', weight: 600, usage: 'Headings S–M, card titles'        },
  { key: 'bold',     weight: 700, usage: 'Headings L, display, hero text'   },
];

const lineHeightItems = Object.entries(typography.lineHeight).map(([key, value]) => ({
  key, value,
  usage: key === 'tight' ? 'Headings — espaçamento compacto' : key === 'normal' ? 'Body text — padrão de leitura' : 'Textos longos — máxima legibilidade',
}));

const usageRules = [
  { type: 'do'      as const, rule: 'Use text-base (16px) como tamanho padrão de corpo',          detail: '16px é o mínimo recomendado para conforto de leitura (WCAG 1.4.4).' },
  { type: 'do'      as const, rule: 'Combine peso com tamanho — nunca use bold em body text',     detail: 'font-bold é exclusivo de headings e display. Para ênfase em corpo, use font-semibold.' },
  { type: 'dont'    as const, rule: 'Não crie hierarquia apenas com cor',                         detail: 'Usuários com daltonismo dependem de contraste estrutural (size + weight).' },
  { type: 'do'      as const, rule: 'Use Geist Mono exclusivamente para código e valores técnicos', detail: 'Tokens CSS, snippets e hashes devem usar a família mono.' },
  { type: 'dont'    as const, rule: 'Não misture mais de 2 níveis de tamanho no mesmo bloco',     detail: 'Uma seção deve ter no máximo 1 heading + 1 body size.' },
  { type: 'caution' as const, rule: 'text-xs (12px) só em contextos não-críticos',               detail: 'Use --rockat-text (não muted) em text-xs para garantir contraste.' },
];

// ── Page component ────────────────────────────────────────────────────────────

function TypographyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--rockat-text)' }}>Typography</h1>
        <p className="text-base" style={{ color: 'var(--rockat-text-muted)' }}>Escala tipográfica e regras de uso</p>
      </div>

      {/* Font Families */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Font Families</h2>
        <div className="space-y-3">
          {Object.entries(typography.fontFamily).map(([key, value]) => (
            <div key={key} className="p-5 rounded-xl" style={{ border: '1px solid var(--rockat-border)', background: 'var(--rockat-bg-elevated)' }}>
              <div className="flex items-center gap-2 mb-2">
                <code className="text-[11px] font-mono px-2 py-0.5 rounded" style={{ background: 'var(--rockat-accent-bg)', color: 'var(--rockat-accent-text)' }}>
                  fontFamily.{key}
                </code>
                <span className="text-xs" style={{ color: 'var(--rockat-text-muted)' }}>
                  {key === 'sans' ? 'Interface, headings, body' : 'Code, tokens, valores técnicos'}
                </span>
              </div>
              <p className="text-lg" style={{ fontFamily: value, color: 'var(--rockat-text)', lineHeight: 1.5 }}>
                {key === 'sans' ? 'The quick brown fox jumps over the lazy dog' : 'const primary = "#8001ff"; // var(--rockat-primary-700)'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Type Scale */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Type Scale</h2>
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--rockat-border)' }}>
          <div className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
            style={{ gridTemplateColumns: '48px 1fr 80px 60px 1.8fr', background: 'var(--rockat-bg-subtle)', color: 'var(--rockat-text-muted)', borderBottom: '1px solid var(--rockat-border)' }}>
            <span>Size</span><span>Specimen</span><span>Tailwind</span><span>Weight</span><span>Role</span>
          </div>
          {typeScaleItems.map((item, i) => (
            <div key={item.key} className="grid items-center gap-4 px-5 py-3"
              style={{ gridTemplateColumns: '48px 1fr 80px 60px 1.8fr', borderBottom: i < typeScaleItems.length - 1 ? '1px solid var(--rockat-border)' : 'none', background: 'var(--rockat-bg-elevated)' }}>
              <code className="text-[11px] font-mono" style={{ color: 'var(--rockat-text-muted)' }}>{item.size}</code>
              <p style={{ fontSize: item.size, color: 'var(--rockat-text)', lineHeight: item.lineHeight, fontWeight: item.weight.includes('/') ? 600 : Number(item.weight) }}>Rock-at UI</p>
              <code className="text-[11px] font-mono" style={{ color: 'var(--rockat-accent-text)' }}>{item.tailwind}</code>
              <code className="text-[11px] font-mono" style={{ color: 'var(--rockat-text-muted)' }}>{item.weight}</code>
              <span className="text-xs" style={{ color: 'var(--rockat-text-muted)' }}>{item.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Font Weights */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Font Weights</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {weightItems.map((item) => (
            <div key={item.key} className="p-5 rounded-xl" style={{ border: '1px solid var(--rockat-border)', background: 'var(--rockat-bg-elevated)' }}>
              <p className="text-2xl mb-3 leading-tight" style={{ fontWeight: item.weight, color: 'var(--rockat-text)' }}>The quick brown fox</p>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--rockat-text)' }}>font-{item.key}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--rockat-text-muted)' }}>{item.usage}</p>
                </div>
                <code className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: 'var(--rockat-accent-bg)', color: 'var(--rockat-accent-text)' }}>{item.weight}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Line Heights */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Line Heights</h2>
        <div className="space-y-3">
          {lineHeightItems.map((item) => (
            <div key={item.key} className="p-5 rounded-xl" style={{ border: '1px solid var(--rockat-border)', background: 'var(--rockat-bg-elevated)' }}>
              <div className="flex items-start gap-6 flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className="text-base mb-3" style={{ lineHeight: item.value, color: 'var(--rockat-text)' }}>
                    O Rock-at UI é um design system orientado a produto. Cada decisão tipográfica é guiada por legibilidade e hierarquia visual clara.
                  </p>
                  <p className="text-xs" style={{ color: 'var(--rockat-text-muted)' }}>{item.usage}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <code className="text-[11px] font-mono px-2 py-0.5 rounded block mb-1" style={{ background: 'var(--rockat-accent-bg)', color: 'var(--rockat-accent-text)' }}>lineHeight.{item.key}</code>
                  <span className="text-xl font-bold" style={{ color: 'var(--rockat-text)' }}>{item.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Usage Guidelines</h2>
        <div className="space-y-3">
          {usageRules.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: 'var(--rockat-bg-elevated)', border: '1px solid var(--rockat-border)' }}>
              <span className="mt-0.5 flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
                style={{
                  background: item.type === 'do' ? 'var(--rockat-success-bg)' : item.type === 'dont' ? 'var(--rockat-danger-bg)' : 'var(--rockat-warning-bg)',
                  color:      item.type === 'do' ? 'var(--rockat-success-text)' : item.type === 'dont' ? 'var(--rockat-danger-text)' : 'var(--rockat-warning-text)',
                }}>
                {item.type === 'do' ? 'Do' : item.type === 'dont' ? "Don't" : 'Atenção'}
              </span>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--rockat-text)' }}>{item.rule}</p>
                <p className="text-xs" style={{ color: 'var(--rockat-text-muted)' }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design System/Typography',
  component: TypographyPage,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;

export const Default = {};
```

- [ ] **Step 2: Verify story renders in Storybook**

Open `http://localhost:6006`, navigate to "Design System → Typography". Confirm font families, type scale table, and weight cards render correctly.

- [ ] **Step 3: Commit**

```bash
git add src/stories/tokens/Typography.stories.tsx
git commit -m "docs(storybook): add Typography token story"
```

---

### Task 6: Spacing story

**Files:**
- Create: `src/stories/tokens/Spacing.stories.tsx`
- Source reference: `src/app/spacing/page.tsx` (full data and `SpacingRow` component)

- [ ] **Step 1: Create the Spacing story file**

```tsx
import React, { useState, useCallback } from 'react';
import type { Meta } from '@storybook/react';
import { Copy, Check } from 'lucide-react';

// ── Data (ported from src/app/spacing/page.tsx) ──────────────────────────────

const spacingItems = [
  { key: '0',  value: '0px',  px: 0,  tailwind: 'p-0',  tier: 'micro'     as const, role: 'Reset, bordas coladas'               },
  { key: '1',  value: '4px',  px: 4,  tailwind: 'p-1',  tier: 'micro'     as const, role: 'Badges, ícones, separadores'          },
  { key: '2',  value: '8px',  px: 8,  tailwind: 'p-2',  tier: 'micro'     as const, role: 'Botões compactos, tags, chips'         },
  { key: '3',  value: '12px', px: 12, tailwind: 'p-3',  tier: 'micro'     as const, role: 'Inputs pequenos, itens de lista'       },
  { key: '4',  value: '16px', px: 16, tailwind: 'p-4',  tier: 'component' as const, role: 'Padding padrão de componente'          },
  { key: '5',  value: '20px', px: 20, tailwind: 'p-5',  tier: 'component' as const, role: 'Cards, popovers, dropdowns'            },
  { key: '6',  value: '24px', px: 24, tailwind: 'p-6',  tier: 'component' as const, role: 'Seções de formulário, modais'          },
  { key: '8',  value: '32px', px: 32, tailwind: 'p-8',  tier: 'component' as const, role: 'Cards grandes, painéis'                },
  { key: '10', value: '40px', px: 40, tailwind: 'p-10', tier: 'layout'    as const, role: 'Espaçamento entre seções'              },
  { key: '12', value: '48px', px: 48, tailwind: 'p-12', tier: 'layout'    as const, role: 'Padding de página, container'          },
  { key: '16', value: '64px', px: 64, tailwind: 'p-16', tier: 'layout'    as const, role: 'Separação de blocos de conteúdo'       },
  { key: '20', value: '80px', px: 80, tailwind: 'p-20', tier: 'layout'    as const, role: 'Hero sections, header height'          },
  { key: '24', value: '96px', px: 96, tailwind: 'p-24', tier: 'layout'    as const, role: 'Seções de landing, grandes gaps'       },
];

const tierConfig = {
  micro:     { label: 'Micro',     bg: 'var(--rockat-success-bg)',  text: 'var(--rockat-success-text)' },
  component: { label: 'Component', bg: 'var(--rockat-accent-bg)',   text: 'var(--rockat-accent-text)'  },
  layout:    { label: 'Layout',    bg: 'var(--rockat-warning-bg)',  text: 'var(--rockat-warning-text)' },
};

const usageRules = [
  { type: 'do'      as const, rule: 'Use sempre múltiplos de 4px — nunca valores arbitrários',         detail: 'A escala 4px garante alinhamento no grid e consistência visual.' },
  { type: 'do'      as const, rule: 'Use tier micro (0–12px) para espaçamento interno de componentes', detail: 'Padding de badges, chips, ícones e botões compactos.' },
  { type: 'do'      as const, rule: 'Use tier component (16–32px) como padding padrão',                detail: 'Cards, modais, inputs e painéis usam entre 16px e 32px.' },
  { type: 'do'      as const, rule: 'Use tier layout (40–96px) apenas para estrutura de página',       detail: 'Separação entre seções, padding de container e hero areas.' },
  { type: 'dont'    as const, rule: 'Nunca use margin para espaçamento — prefira gap',                 detail: 'gap em flex/grid é mais previsível e evita margin collapse.' },
  { type: 'dont'    as const, rule: 'Não use espaçamento assimétrico sem intenção declarada',          detail: 'py-4 px-7 é arbitrário e inconsistente. Justifique desvios.' },
  { type: 'caution' as const, rule: 'Em mobile, reduza um nível de tier para espaçamentos de layout', detail: 'O que é p-12 em desktop pode ser p-6 em mobile.' },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function SpacingRow({ item }: { item: typeof spacingItems[0] }) {
  const [copied, setCopied] = useState(false);
  const tier = tierConfig[item.tier];
  const MAX_PX = 96;
  const barWidth = item.px === 0 ? 2 : Math.round((item.px / MAX_PX) * 100);
  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(item.tailwind); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  }, [item.tailwind]);

  return (
    <div className="group grid items-center gap-4 px-5 py-3"
      style={{ gridTemplateColumns: '36px 52px 64px 80px 1fr 1.8fr', borderBottom: '1px solid var(--rockat-border)', background: 'var(--rockat-bg-elevated)' }}>
      <code className="text-[11px] font-mono" style={{ color: 'var(--rockat-text-muted)' }}>{item.key}</code>
      <code className="text-[11px] font-mono" style={{ color: 'var(--rockat-text-muted)' }}>{item.value}</code>
      <button className="flex items-center gap-1 text-left" onClick={handleCopy}>
        <code className="text-[11px] font-mono" style={{ color: 'var(--rockat-accent-text)' }}>{item.tailwind}</code>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          {copied ? <Check size={10} style={{ color: 'var(--rockat-success-text)' }} /> : <Copy size={10} style={{ color: 'var(--rockat-text-muted)' }} />}
        </span>
      </button>
      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide w-fit" style={{ background: tier.bg, color: tier.text }}>{tier.label}</span>
      <div style={{ height: '16px', display: 'flex', alignItems: 'center' }}>
        <div className="rounded" style={{ width: `${barWidth}%`, height: '12px', minWidth: '2px', background: 'var(--rockat-accent-text)', opacity: 0.6 }} />
      </div>
      <span className="text-xs" style={{ color: 'var(--rockat-text-muted)' }}>{item.role}</span>
    </div>
  );
}

// ── Page component ────────────────────────────────────────────────────────────

function SpacingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--rockat-text)' }}>Spacing</h1>
        <p className="text-base" style={{ color: 'var(--rockat-text-muted)' }}>Escala de espaçamento e regras de uso</p>
      </div>

      {/* Tier intro */}
      <div className="mb-12">
        <p className="text-base mb-5" style={{ color: 'var(--rockat-text-muted)' }}>
          A escala segue múltiplos de <strong style={{ color: 'var(--rockat-text)' }}>4px</strong> — base adotada por IBM Carbon, Material Design 3 e GitHub Primer.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {(['micro', 'component', 'layout'] as const).map((tier) => (
            <div key={tier} className="p-4 rounded-xl" style={{ background: 'var(--rockat-bg-subtle)', border: '1px solid var(--rockat-border)' }}>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide" style={{ background: tierConfig[tier].bg, color: tierConfig[tier].text }}>{tierConfig[tier].label}</span>
              <p className="text-sm mt-2" style={{ color: 'var(--rockat-text-muted)' }}>
                {tier === 'micro'     && '0–12px · Detalhes internos de componentes pequenos'}
                {tier === 'component' && '16–32px · Padding padrão de componentes de UI'}
                {tier === 'layout'    && '40–96px · Estrutura de página e separação de seções'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scale table */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Spacing Scale</h2>
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--rockat-border)' }}>
          <div className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
            style={{ gridTemplateColumns: '36px 52px 64px 80px 1fr 1.8fr', background: 'var(--rockat-primary-50)', color: 'var(--rockat-text-muted)', borderBottom: '1px solid var(--rockat-border)' }}>
            <span>Key</span><span>Value</span><span>Tailwind</span><span>Tier</span><span>Visual</span><span>Role</span>
          </div>
          {spacingItems.map((item) => <SpacingRow key={item.key} item={item} />)}
        </div>
      </section>

      {/* Usage guidelines */}
      <section>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Usage Guidelines</h2>
        <div className="space-y-3">
          {usageRules.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: 'var(--rockat-bg-elevated)', border: '1px solid var(--rockat-border)' }}>
              <span className="mt-0.5 flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
                style={{
                  background: item.type === 'do' ? 'var(--rockat-success-bg)' : item.type === 'dont' ? 'var(--rockat-danger-bg)' : 'var(--rockat-warning-bg)',
                  color:      item.type === 'do' ? 'var(--rockat-success-text)' : item.type === 'dont' ? 'var(--rockat-danger-text)' : 'var(--rockat-warning-text)',
                }}>
                {item.type === 'do' ? 'Do' : item.type === 'dont' ? "Don't" : 'Atenção'}
              </span>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--rockat-text)' }}>{item.rule}</p>
                <p className="text-xs" style={{ color: 'var(--rockat-text-muted)' }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design System/Spacing',
  component: SpacingPage,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;

export const Default = {};
```

- [ ] **Step 2: Verify in Storybook**

Navigate to "Design System → Spacing". Confirm tier badges and visual bars render. Test copy-on-click for Tailwind classes.

- [ ] **Step 3: Commit**

```bash
git add src/stories/tokens/Spacing.stories.tsx
git commit -m "docs(storybook): add Spacing token story"
```

---

### Task 7: Radius story

**Files:**
- Create: `src/stories/tokens/Radius.stories.tsx`
- Source reference: `src/app/radius/page.tsx`

- [ ] **Step 1: Create the Radius story file**

```tsx
import React, { useState, useCallback } from 'react';
import type { Meta } from '@storybook/react';
import { Copy, Check } from 'lucide-react';

// ── Data (ported from src/app/radius/page.tsx) ───────────────────────────────

const radiusItems = [
  { key: 'none', value: '0px',    tailwind: 'rounded-none', role: 'Sem arredondamento',        components: 'Dividers, imagens fullbleed, tabelas'    },
  { key: 'sm',   value: '4px',    tailwind: 'rounded-sm',   role: 'Arredondamento sutil',       components: 'Badges, tags inline, chips compactos'    },
  { key: 'md',   value: '8px',    tailwind: 'rounded-lg',   role: 'Arredondamento padrão leve', components: 'Tooltips, dropdowns, menus'              },
  { key: 'lg',   value: '12px',   tailwind: 'rounded-xl',   role: 'Padrão do sistema ★',        components: 'Buttons, inputs, cards, modais'          },
  { key: 'xl',   value: '16px',   tailwind: 'rounded-2xl',  role: 'Arredondamento expressivo',  components: 'Cards grandes, banners, painéis'         },
  { key: '2xl',  value: '24px',   tailwind: 'rounded-3xl',  role: 'Arredondamento acentuado',   components: 'Hero cards, sheets, drawers'             },
  { key: 'full', value: '9999px', tailwind: 'rounded-full', role: 'Pílula / Circular',          components: 'Avatars, pills, FABs, toggles'          },
];

const usageRules = [
  { type: 'do'      as const, rule: 'Use radius.lg (12px) como padrão para todos os componentes interativos', detail: 'Buttons, inputs, cards e modais usam 12px. Configurado globalmente via ConfigProvider.' },
  { type: 'do'      as const, rule: 'Use radius.full apenas para elementos circulares ou pill',               detail: 'Avatars, badges de status, pills de filtro e FABs.' },
  { type: 'dont'    as const, rule: 'Não misture mais de 2 valores de radius em um mesmo layout',             detail: 'Escolha um valor dominante e um desvio no máximo.' },
  { type: 'do'      as const, rule: 'Reduza o radius em componentes muito pequenos',                         detail: 'Use radius.sm (4px) ou radius.md (8px) para elementos abaixo de 32px.' },
  { type: 'dont'    as const, rule: 'Não use radius.none em componentes flutuantes',                         detail: 'Cantos retos em elementos sobrepostos parecem erros visuais.' },
  { type: 'caution' as const, rule: 'Em mobile, prefira radius maior para alvos de toque',                   detail: 'Raios maiores melhoram a percepção de toque em telas pequenas.' },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function RadiusRow({ item }: { item: typeof radiusItems[0] }) {
  const [copied, setCopied] = useState(false);
  const isDefault = item.key === 'lg';
  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(item.tailwind); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  }, [item.tailwind]);

  return (
    <div className="group grid items-center gap-4 px-5 py-3"
      style={{ gridTemplateColumns: '48px 52px 116px 1fr 1.8fr', borderBottom: '1px solid var(--rockat-border)', background: 'var(--rockat-bg-elevated)' }}>
      <div style={{ width: 40, height: 40, borderRadius: item.value, background: 'var(--rockat-accent-bg)', border: '2px solid var(--rockat-accent-border)', flexShrink: 0 }} />
      <code className="text-[11px] font-mono" style={{ color: 'var(--rockat-text-muted)' }}>{item.value}</code>
      <button className="flex items-center gap-1.5 text-left" onClick={handleCopy}>
        <code className="text-[11px] font-mono" style={{ color: 'var(--rockat-accent-text)' }}>{item.tailwind}</code>
        {isDefault && <span className="text-[9px] font-bold px-1 py-0.5 rounded uppercase" style={{ background: 'var(--rockat-success-bg)', color: 'var(--rockat-success-text)' }}>default</span>}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          {copied ? <Check size={10} style={{ color: 'var(--rockat-success-text)' }} /> : <Copy size={10} style={{ color: 'var(--rockat-text-muted)' }} />}
        </span>
      </button>
      <span className="text-xs" style={{ color: 'var(--rockat-text)' }}>{item.role}</span>
      <span className="text-xs" style={{ color: 'var(--rockat-text-muted)' }}>{item.components}</span>
    </div>
  );
}

// ── Page component ────────────────────────────────────────────────────────────

function RadiusPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--rockat-text)' }}>Radius</h1>
        <p className="text-base" style={{ color: 'var(--rockat-text-muted)' }}>Escala de border-radius e regras de uso</p>
      </div>

      {/* Scale table */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Radius Scale</h2>
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--rockat-border)' }}>
          <div className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
            style={{ gridTemplateColumns: '48px 52px 116px 1fr 1.8fr', background: 'var(--rockat-primary-50)', color: 'var(--rockat-text-muted)', borderBottom: '1px solid var(--rockat-border)' }}>
            <span>Preview</span><span>Value</span><span>Tailwind</span><span>Role</span><span>Componentes</span>
          </div>
          {radiusItems.map((item) => <RadiusRow key={item.key} item={item} />)}
        </div>
      </section>

      {/* Visual comparison */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Visual Comparison</h2>
        <div className="flex flex-wrap items-end gap-5 p-6 rounded-2xl" style={{ background: 'var(--rockat-bg-subtle)', border: '1px solid var(--rockat-border)' }}>
          {radiusItems.map((item) => (
            <div key={item.key} className="flex flex-col items-center gap-2">
              <div style={{ width: 56, height: 56, borderRadius: item.value, background: 'var(--rockat-accent-bg)', border: '2px solid var(--rockat-accent-border)' }} />
              <div className="text-center">
                <p className="text-[11px] font-semibold" style={{ color: 'var(--rockat-text)' }}>{item.key}</p>
                <code className="text-[10px] font-mono" style={{ color: 'var(--rockat-text-muted)' }}>{item.value}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage guidelines */}
      <section>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Usage Guidelines</h2>
        <div className="space-y-3">
          {usageRules.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: 'var(--rockat-bg-elevated)', border: '1px solid var(--rockat-border)' }}>
              <span className="mt-0.5 flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
                style={{
                  background: item.type === 'do' ? 'var(--rockat-success-bg)' : item.type === 'dont' ? 'var(--rockat-danger-bg)' : 'var(--rockat-warning-bg)',
                  color:      item.type === 'do' ? 'var(--rockat-success-text)' : item.type === 'dont' ? 'var(--rockat-danger-text)' : 'var(--rockat-warning-text)',
                }}>
                {item.type === 'do' ? 'Do' : item.type === 'dont' ? "Don't" : 'Atenção'}
              </span>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--rockat-text)' }}>{item.rule}</p>
                <p className="text-xs" style={{ color: 'var(--rockat-text-muted)' }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design System/Radius',
  component: RadiusPage,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;

export const Default = {};
```

- [ ] **Step 2: Commit**

```bash
git add src/stories/tokens/Radius.stories.tsx
git commit -m "docs(storybook): add Radius token story"
```

---

### Task 8: Icons story

**Files:**
- Create: `src/stories/tokens/Icons.stories.tsx`
- Source reference: `src/app/icons/page.tsx`

- [ ] **Step 1: Create the Icons story file**

```tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import {
  Home, Settings, User, Bell, Search, Plus, Minus, X, Check,
  ChevronRight, ChevronDown, ChevronLeft, ChevronUp,
  ArrowRight, ArrowLeft, ExternalLink, Link,
  Edit, Trash2, Copy, Download, Upload,
  Eye, EyeOff, Lock, Unlock,
  Star, Heart, Bookmark,
  Mail, Phone, MessageSquare,
  Calendar, Clock, Globe,
  Palette, Layers, Zap, Package, Grid3x3,
  Sun, Moon, Menu, MoreHorizontal, MoreVertical,
  AlertCircle, AlertTriangle, Info, CheckCircle, XCircle,
} from 'lucide-react';

const icons = [
  { name: 'Home',          icon: <Home size={20} />          },
  { name: 'Settings',      icon: <Settings size={20} />      },
  { name: 'User',          icon: <User size={20} />          },
  { name: 'Bell',          icon: <Bell size={20} />          },
  { name: 'Search',        icon: <Search size={20} />        },
  { name: 'Plus',          icon: <Plus size={20} />          },
  { name: 'Minus',         icon: <Minus size={20} />         },
  { name: 'X',             icon: <X size={20} />             },
  { name: 'Check',         icon: <Check size={20} />         },
  { name: 'ChevronRight',  icon: <ChevronRight size={20} />  },
  { name: 'ChevronDown',   icon: <ChevronDown size={20} />   },
  { name: 'ChevronLeft',   icon: <ChevronLeft size={20} />   },
  { name: 'ChevronUp',     icon: <ChevronUp size={20} />     },
  { name: 'ArrowRight',    icon: <ArrowRight size={20} />    },
  { name: 'ArrowLeft',     icon: <ArrowLeft size={20} />     },
  { name: 'ExternalLink',  icon: <ExternalLink size={20} />  },
  { name: 'Link',          icon: <Link size={20} />          },
  { name: 'Edit',          icon: <Edit size={20} />          },
  { name: 'Trash2',        icon: <Trash2 size={20} />        },
  { name: 'Copy',          icon: <Copy size={20} />          },
  { name: 'Download',      icon: <Download size={20} />      },
  { name: 'Upload',        icon: <Upload size={20} />        },
  { name: 'Eye',           icon: <Eye size={20} />           },
  { name: 'EyeOff',        icon: <EyeOff size={20} />        },
  { name: 'Lock',          icon: <Lock size={20} />          },
  { name: 'Unlock',        icon: <Unlock size={20} />        },
  { name: 'Star',          icon: <Star size={20} />          },
  { name: 'Heart',         icon: <Heart size={20} />         },
  { name: 'Bookmark',      icon: <Bookmark size={20} />      },
  { name: 'Mail',          icon: <Mail size={20} />          },
  { name: 'Phone',         icon: <Phone size={20} />         },
  { name: 'MessageSquare', icon: <MessageSquare size={20} /> },
  { name: 'Calendar',      icon: <Calendar size={20} />      },
  { name: 'Clock',         icon: <Clock size={20} />         },
  { name: 'Globe',         icon: <Globe size={20} />         },
  { name: 'Palette',       icon: <Palette size={20} />       },
  { name: 'Layers',        icon: <Layers size={20} />        },
  { name: 'Zap',           icon: <Zap size={20} />           },
  { name: 'Package',       icon: <Package size={20} />       },
  { name: 'Grid3x3',       icon: <Grid3x3 size={20} />       },
  { name: 'Sun',           icon: <Sun size={20} />           },
  { name: 'Moon',          icon: <Moon size={20} />          },
  { name: 'Menu',          icon: <Menu size={20} />          },
  { name: 'MoreHorizontal',icon: <MoreHorizontal size={20} />},
  { name: 'MoreVertical',  icon: <MoreVertical size={20} />  },
  { name: 'AlertCircle',   icon: <AlertCircle size={20} />   },
  { name: 'AlertTriangle', icon: <AlertTriangle size={20} /> },
  { name: 'Info',          icon: <Info size={20} />          },
  { name: 'CheckCircle',   icon: <CheckCircle size={20} />   },
  { name: 'XCircle',       icon: <XCircle size={20} />       },
];

function IconsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--rockat-text)' }}>Icons</h1>
        <p className="text-base" style={{ color: 'var(--rockat-text-muted)' }}>Biblioteca de ícones Lucide React</p>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8"
        style={{ background: 'var(--rockat-primary-100)', color: 'var(--rockat-primary-700)' }}>
        <Package size={12} /> lucide-react
      </div>

      <p className="text-base mb-10" style={{ color: 'var(--rockat-text-muted)' }}>
        O Rock-at UI usa <strong style={{ color: 'var(--rockat-text)' }}>Lucide React</strong> como biblioteca de ícones padrão.
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {icons.map(({ name, icon }) => (
          <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-xl"
            style={{ border: '1px solid var(--rockat-border)', background: 'var(--rockat-bg-elevated)' }}>
            <div style={{ color: 'var(--rockat-text)' }}>{icon}</div>
            <span className="text-xs text-center leading-tight" style={{ color: 'var(--rockat-text-muted)' }}>{name}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 p-5 rounded-2xl" style={{ background: 'var(--rockat-primary-50)', border: '1px solid var(--rockat-primary-100)' }}>
        <p className="text-sm font-semibold mb-2" style={{ color: 'var(--rockat-primary-700)' }}>Como usar</p>
        <code className="text-xs font-mono block" style={{ color: 'var(--rockat-text)' }}>
          {`import { Download } from "lucide-react";`}<br />{`<Download size={20} />`}
        </code>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Design System/Icons',
  component: IconsPage,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;

export const Default = {};
```

- [ ] **Step 2: Commit**

```bash
git add src/stories/tokens/Icons.stories.tsx
git commit -m "docs(storybook): add Icons token story"
```

---

### Task 9: Button story

**Files:**
- Create: `src/stories/components/Button.stories.tsx`
- Source reference: `src/app/components/button/page.tsx` (variant guide, content rules, usage rules)

- [ ] **Step 1: Create the Button story file**

```tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Space } from 'antd';
import { Plus, Download, Trash2, Edit, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'default', 'dashed', 'text', 'link'],
      description: 'Variante visual do botão',
      table: { defaultValue: { summary: 'primary' } },
    },
    antSize: {
      control: 'select',
      options: ['small', 'middle', 'large'],
      description: 'Tamanho do botão',
      table: { defaultValue: { summary: 'middle' } },
    },
    danger: {
      control: 'boolean',
      description: 'Estado destrutivo — vermelho',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
    block: {
      control: 'boolean',
      description: 'Ocupa 100% da largura do container',
    },
    children: {
      control: 'text',
      description: 'Texto do botão',
    },
  },
  args: {
    children: 'Button',
    type: 'primary',
    antSize: 'middle',
    danger: false,
    loading: false,
    disabled: false,
    block: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── Interactive (controls) ───────────────────────────────────────────────────

export const Default: Story = {};

// ── Named stories ────────────────────────────────────────────────────────────

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space wrap>
      <Button type="primary">Primary</Button>
      <Button type="default">Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
      <Button type="link">Link</Button>
    </Space>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space wrap align="center">
      <Button type="primary" antSize="small">Small</Button>
      <Button type="primary" antSize="middle">Middle</Button>
      <Button type="primary" antSize="large">Large</Button>
    </Space>
  ),
};

export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space wrap>
      <Button type="primary" icon={<Plus size={16} />}>New Item</Button>
      <Button type="default" icon={<Download size={16} />}>Download</Button>
      <Button type="dashed" icon={<Edit size={16} />}>Edit</Button>
      <Button type="default" danger icon={<Trash2 size={16} />}>Delete</Button>
    </Space>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space wrap>
      <Button type="primary">Active</Button>
      <Button type="primary" loading>Loading</Button>
      <Button type="primary" disabled>Disabled</Button>
      <Button type="default" danger>Danger</Button>
    </Space>
  ),
};

export const IconOnly: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space>
      <Button type="primary" icon={<Plus size={16} />} aria-label="Adicionar" />
      <Button type="default" icon={<Edit size={16} />} aria-label="Editar" />
      <Button type="dashed" icon={<Download size={16} />} aria-label="Download" />
    </Space>
  ),
};

export const Block: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button type="primary" block icon={<ArrowRight size={16} />}>Continue</Button>
        <Button type="default" block>Cancel</Button>
      </Space>
    </div>
  ),
};

export const Hierarchy: Story = {
  name: 'Hierarchy: Primary / Secondary / Tertiary',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid gap-3">
      {[
        { title: 'Primary', note: 'Máximo 1 por view', children: <Space wrap><Button type="primary">Salvar alterações</Button><Button type="primary" icon={<Plus size={16} />}>Criar projeto</Button></Space> },
        { title: 'Secondary (Outline)', note: 'Ações alternativas ao primary', children: <Space wrap><Button type="default">Cancelar</Button><Button type="default" icon={<Edit size={16} />}>Editar</Button><Button type="dashed">Adicionar opcional</Button></Space> },
        { title: 'Tertiary', note: 'Ações de menor prioridade', children: <Space wrap><Button type="text">Ver detalhes</Button><Button type="link">Abrir documentação</Button></Space> },
      ].map((item) => (
        <div key={item.title} className="p-5 rounded-xl" style={{ border: '1px solid var(--rockat-border)', background: 'var(--rockat-bg-elevated)' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--rockat-text)' }}>{item.title}</p>
          <p className="text-xs mb-4" style={{ color: 'var(--rockat-accent-text)' }}>{item.note}</p>
          {item.children}
        </div>
      ))}
    </div>
  ),
};
```

- [ ] **Step 2: Verify controls work**

Open Storybook at "Components → Button → Default". In the controls panel, change `type`, `antSize`, `danger`, `loading`, `disabled`. Confirm the button updates in real time.

- [ ] **Step 3: Commit**

```bash
git add src/stories/components/Button.stories.tsx
git commit -m "docs(storybook): add Button component story with interactive controls"
```

---

### Task 10: Input story

**Files:**
- Create: `src/stories/components/Input.stories.tsx`
- Source reference: `src/app/components/input/page.tsx`

- [ ] **Step 1: Create the Input story file**

```tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Space } from 'antd';
import { Search, Mail, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label visível acima do campo',
    },
    hint: {
      control: 'text',
      description: 'Texto auxiliar abaixo do campo (oculto quando há erro)',
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro — ativa status de erro no campo',
    },
    placeholder: {
      control: 'text',
      description: 'Texto de placeholder',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
      description: 'Tamanho do campo',
    },
  },
  args: {
    placeholder: 'Digite algo...',
    label: '',
    hint: '',
    error: '',
    disabled: false,
    size: 'middle',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Nome completo',
    placeholder: 'Ex: João da Silva',
    hint: 'Use seu nome como aparece no documento.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    error: 'Informe um e-mail válido (ex: nome@dominio.com)',
  },
};

export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Input prefix={<Search size={14} />} placeholder="Pesquisar..." />
      <Input prefix={<Mail size={14} />} placeholder="seu@email.com" type="email" label="Email" hint="Nunca compartilharemos seu email." />
      <Input prefix={<Lock size={14} />} placeholder="Mínimo 8 caracteres" type="password" label="Senha" />
    </Space>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Input size="small" placeholder="Small" label="Small" />
      <Input size="middle" placeholder="Middle (default)" label="Middle" />
      <Input size="large" placeholder="Large" label="Large" />
    </Space>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Input label="Ativo" placeholder="Campo ativo" />
      <Input label="Com erro" placeholder="Campo com erro" error="Este campo é obrigatório." />
      <Input placeholder="Desabilitado" disabled />
    </Space>
  ),
};
```

- [ ] **Step 2: Verify controls work**

Open "Components → Input → Default". Test `label`, `hint`, `error` text controls. Confirm `error` turns the field red and hides `hint`.

- [ ] **Step 3: Commit**

```bash
git add src/stories/components/Input.stories.tsx
git commit -m "docs(storybook): add Input component story with interactive controls"
```

---

### Task 11: Card story

**Files:**
- Create: `src/stories/components/Card.stories.tsx`
- Source reference: `src/app/components/card/page.tsx`

- [ ] **Step 1: Create the Card story file**

```tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Space } from 'antd';
import { Star, MoreHorizontal, Heart, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
      description: 'Variante visual do card',
      table: { defaultValue: { summary: 'default' } },
    },
    title: {
      control: 'text',
      description: 'Título do card (header)',
    },
  },
  args: {
    variant: 'default',
    title: 'Card Title',
    children: 'Conteúdo do card. Pode conter qualquer elemento React.',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Card variant="default" title="Variant: Default">
        <p style={{ color: 'var(--rockat-text-muted)' }}>Borderless com background do tema.</p>
      </Card>
      <Card variant="outlined" title="Variant: Outlined">
        <p style={{ color: 'var(--rockat-text-muted)' }}>Com borda visível.</p>
      </Card>
      <Card variant="filled" title="Variant: Filled">
        <p style={{ color: 'var(--rockat-text-muted)' }}>Fundo colorido suave — primary-50 no light.</p>
      </Card>
    </Space>
  ),
};

export const WithExtraActions: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Card
      title="Projeto Alpha"
      extra={<Button type="text" antSize="small" icon={<MoreHorizontal size={16} />} aria-label="Mais opções" />}
    >
      <p className="text-sm mb-4" style={{ color: 'var(--rockat-text-muted)' }}>
        Descrição do projeto com detalhes relevantes para o usuário.
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star size={14} style={{ color: '#facc15', fill: '#facc15' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--rockat-text)' }}>4.8</span>
        </div>
        <Button type="primary" antSize="small">Abrir</Button>
      </div>
    </Card>
  ),
};

export const GridLayout: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid grid-cols-3 gap-3">
      {['Design', 'Engineering', 'Product'].map((team) => (
        <Card key={team} variant="outlined">
          <div className="flex items-start justify-between mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'var(--rockat-accent-text)' }}>
              {team[0]}
            </div>
            <button aria-label="Favoritar"><Heart size={16} style={{ color: 'var(--rockat-text-muted)' }} /></button>
          </div>
          <p className="font-semibold text-sm" style={{ color: 'var(--rockat-text)' }}>{team}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--rockat-text-muted)' }}>3 membros</p>
        </Card>
      ))}
    </div>
  ),
};
```

- [ ] **Step 2: Verify controls work**

Open "Components → Card → Default". Switch `variant` between `default`, `outlined`, `filled` and confirm visual changes.

- [ ] **Step 3: Commit**

```bash
git add src/stories/components/Card.stories.tsx
git commit -m "docs(storybook): add Card component story with interactive controls"
```

---

### Task 12: Table story

**Files:**
- Create: `src/stories/components/Table.stories.tsx`
- Source reference: `src/app/tables/page.tsx`

- [ ] **Step 1: Create the Table story file**

```tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '@/components/ui/table';
import type { Column } from '@/components/ui/table';

// ── Mock data ─────────────────────────────────────────────────────────────────

type User = { id: number; name: string; email: string; role: string; status: 'Active' | 'Inactive' };

const mockUsers: User[] = [
  { id: 1, name: 'Ana Silva',    email: 'ana@rockat.io',    role: 'Designer',   status: 'Active'   },
  { id: 2, name: 'Bruno Costa',  email: 'bruno@rockat.io',  role: 'Engineer',   status: 'Active'   },
  { id: 3, name: 'Carla Mendes', email: 'carla@rockat.io',  role: 'PM',         status: 'Inactive' },
  { id: 4, name: 'Diego Rocha',  email: 'diego@rockat.io',  role: 'Engineer',   status: 'Active'   },
  { id: 5, name: 'Elena Ferreira', email: 'elena@rockat.io', role: 'Designer',  status: 'Active'   },
];

const columns: Column<User>[] = [
  { key: 'name',   title: 'Nome'    },
  { key: 'email',  title: 'Email'   },
  { key: 'role',   title: 'Função'  },
  {
    key: 'status',
    title: 'Status',
    render: (row) => (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full"
        style={{
          background: row.status === 'Active' ? 'var(--rockat-success-bg)' : 'var(--rockat-neutral-bg)',
          color:      row.status === 'Active' ? 'var(--rockat-success-text)' : 'var(--rockat-neutral-text)',
        }}>
        {row.status}
      </span>
    ),
  },
];

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    striped: {
      control: 'boolean',
      description: 'Linhas alternadas com fundo sutil',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento com skeleton rows',
    },
    emptyText: {
      control: 'text',
      description: 'Texto exibido quando não há dados',
    },
  },
  args: {
    columns,
    data: mockUsers,
    striped: false,
    loading: false,
    emptyText: 'Nenhum dado encontrado.',
  },
};

export default meta;
type Story = StoryObj<typeof Table<User>>;

export const Default: Story = {};

export const Striped: Story = {
  args: { striped: true },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Empty: Story = {
  args: { data: [] },
};

export const Clickable: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Table
      columns={columns}
      data={mockUsers}
      onRowClick={(row) => alert(`Clicked: ${row.name}`)}
    />
  ),
};
```

- [ ] **Step 2: Verify controls work**

Open "Components → Table → Default". Toggle `striped` and `loading` in controls. Test the `Empty` story. Test `Clickable` — clicking a row should trigger an alert.

- [ ] **Step 3: Commit**

```bash
git add src/stories/components/Table.stories.tsx
git commit -m "docs(storybook): add Table component story with interactive controls"
```

---

### Task 13: tsup + package.json publishing setup

**Files:**
- Create: `tsup.config.ts`
- Modify: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: Install tsup**

```bash
npm install -D tsup
```

- [ ] **Step 2: Create tsup.config.ts**

```typescript
import { defineConfig } from 'tsup';
import path from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  splitting: false,
  clean: true,
  external: ['react', 'react-dom', 'antd'],
  outDir: 'dist',
  // Preserve "use client" in both ESM and CJS outputs
  banner: { js: '"use client";' },
  // Resolve the @/ path alias used in component source files (e.g. @/lib/cn)
  esbuildOptions(options) {
    options.alias = { '@': path.resolve('./src') };
  },
});
```

- [ ] **Step 3: Update package.json**

Replace the top section of `package.json` with the following. Keep all existing `dependencies` and `devDependencies` intact — only update the fields shown:

```json
{
  "name": "@<org>/rockat-ui",
  "version": "0.1.0",
  "description": "Rock-at Design System — components, tokens and theme",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles/tokens": "./dist/styles/tokens.css",
    "./styles/primitives": "./dist/styles/primitives.css"
  },
  "files": ["dist"],
  "sideEffects": ["**/*.css"],
  "peerDependencies": {
    "react": ">=19",
    "react-dom": ">=19",
    "antd": ">=6"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com",
    "access": "restricted"
  }
}
```

> **Important:** Remove `"private": true` — npm refuses to publish private packages.

- [ ] **Step 4: Add build:lib and copy:styles scripts to package.json scripts**

```json
"build:lib": "tsup && npm run copy:styles",
"copy:styles": "mkdir -p dist/styles && cp src/styles/tokens.css dist/styles/ && cp src/styles/primitives.css dist/styles/"
```

The final scripts object should be:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "node --test",
  "test:atomic": "node --test tests/button-atomic.test.mjs",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build",
  "build:lib": "tsup && npm run copy:styles",
  "copy:styles": "mkdir -p dist/styles && cp src/styles/tokens.css dist/styles/ && cp src/styles/primitives.css dist/styles/"
}
```

- [ ] **Step 5: Add dist/ to .gitignore**

Open `.gitignore` (create if it doesn't exist) and add:

```
# Library build output — not committed
/dist
/storybook-static
```

- [ ] **Step 6: Run build:lib and verify output**

```bash
npm run build:lib
```

Expected output:

```
dist/index.js        (ESM)
dist/index.cjs       (CJS)
dist/index.d.ts      (TypeScript types)
dist/index.d.cts     (CJS types)
dist/styles/tokens.css
dist/styles/primitives.css
```

Run: `ls dist/ && ls dist/styles/`

If any of the above files are missing, check the tsup output for errors before continuing.

- [ ] **Step 7: Verify types are correct**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add tsup.config.ts package.json package-lock.json .gitignore
git commit -m "chore: add tsup build and GitHub Packages publishing config"
```

---

### Task 14: Final verification

- [ ] **Step 1: Run full Storybook build (smoke test)**

```bash
npm run build-storybook
```

Expected: `storybook-static/` directory created with no errors. This verifies all stories compile.

- [ ] **Step 2: Run lint and tests**

```bash
npm run lint && npm run test:atomic
```

Expected: all pass.

- [ ] **Step 3: Confirm Storybook sidebar structure**

Start Storybook: `npm run storybook`

Verify the sidebar shows:
```
Design System/
  Colors
  Typography
  Spacing
  Radius
  Icons
Components/
  Button
  Input
  Card
  Table
```

- [ ] **Step 4: Test theme toggle on each component story**

For Button, Input, Card, Table: switch to Dark using the toolbar. Verify:
- Background turns dark (`#13111c`)
- Text turns light (`#f0ecff`)
- Components visually update (Ant Design dark algorithm active)

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final verification — Storybook and lib build passing"
```

---

## Publishing to GitHub Packages (when ready)

Before publishing for the first time:

1. Replace `@<org>` in `package.json` `"name"` with your actual GitHub org (e.g. `@confraria/rockat-ui`)
2. Authenticate: `npm login --registry=https://npm.pkg.github.com`
3. Build: `npm run build:lib`
4. Publish: `npm publish`

Consumer repo setup:

```bash
# Add to .npmrc in the consumer repo
@<org>:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```tsx
// Usage in consumer
import { Button, Card, Input, Table } from '@<org>/rockat-ui';
import '@<org>/rockat-ui/styles/tokens';
import '@<org>/rockat-ui/styles/primitives';
```
