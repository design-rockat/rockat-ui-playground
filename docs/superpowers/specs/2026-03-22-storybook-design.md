# Spec: Storybook + npm Package — Rock-at UI Design System

**Date:** 2026-03-22
**Status:** Approved

---

## Objetivo

Transformar o repositório `rockat-ui-playground` em duas coisas simultaneamente:

1. **Pacote npm publicável** no GitHub Packages (`@<org>/rockat-ui`), consumível por outros repositórios como a landing page do Confraria.
2. **Storybook** como documentação visual interativa oficial, substituindo o Playground Next.js existente.

---

## Escopo

### O que muda

- Adição do Storybook (`@storybook/nextjs` framework)
- Adição de build de biblioteca com `tsup`
- Configuração de publicação no GitHub Packages
- Criação de stories para todos os tokens e componentes públicos
- **`Table` e `Column` adicionados à superfície pública (`src/index.ts`)** — parte da implementação, antes da story de Table
- `"use client"` adicionado ao topo de `src/index.ts` para marcar o entry point da lib como Client Component
- Remoção futura das páginas Next.js do Playground (após stories prontas)

### O que não muda

- Nenhum componente existente é modificado
- Tokens CSS (`tokens.css`, `primitives.css`) permanecem como fonte de verdade
- Superfície pública (`src/index.ts`) permanece a mesma

---

## Arquitetura

### Dual responsibility do repositório

```
rockat-ui-playground/
├── src/                    # Fonte dos componentes e tokens (não muda)
│   ├── components/ui/
│   ├── design-system/
│   ├── styles/
│   └── index.ts            # Superfície pública do pacote
├── dist/                   # Output do build de lib (tsup) — não comitar
│   ├── index.js            # ESM
│   ├── index.cjs           # CJS
│   ├── index.d.ts          # Types
│   └── styles/             # CSS copiado
├── .storybook/             # Configuração do Storybook
│   ├── main.ts
│   ├── preview.tsx         # Decorator global (ThemeProvider + tema toggle)
│   └── manager.ts          # Branding opcional
└── src/stories/            # Todas as stories
    ├── tokens/
    │   ├── Colors.stories.tsx
    │   ├── Typography.stories.tsx
    │   ├── Spacing.stories.tsx
    │   ├── Radius.stories.tsx
    │   └── Icons.stories.tsx
    └── components/
        ├── Button.stories.tsx
        ├── Input.stories.tsx
        ├── Card.stories.tsx
        └── Table.stories.tsx
```

### Fluxo de versionamento e publicação

```
1. Desenvolve e testa localmente (npm run storybook)
2. Atualiza version em package.json (ex: 0.1.0 → 0.2.0)
3. git tag v0.2.0
4. npm run build:lib         → compila src/ para dist/
5. npm publish               → publica no GitHub Packages
6. Consumidor: npm install @<org>/rockat-ui
```

---

## Storybook

### Framework e versão

- `@storybook/nextjs` — framework oficial para Next.js + React 19
- Storybook 8.4+ (suporta React 19 e Ant Design 6)
- Resolve automaticamente: `@/` path alias, `"use client"`, Tailwind CSS 4 PostCSS, imports de CSS

### Configuração global (`.storybook/preview.tsx`)

- **Decorator global:** envolve todas as stories com `ThemeProvider` do Ant Design (`rockatLightTheme` / `rockatDarkTheme`)
- **CSS global importado:** `src/app/globals.css` (que importa `tokens.css` e `primitives.css`) — funciona via pipeline PostCSS do Next.js; requer que `postcss.config.mjs` com `@tailwindcss/postcss` esteja presente na raiz (já existe no projeto)
- **Toolbar de tema:** toggle Light (padrão) / Dark — o decorator usa o `ThemeProvider` existente, que já aplica `data-theme` no `<html>` e comuta `algorithm: antdTheme.darkAlgorithm` / `antdTheme.defaultAlgorithm` internamente. Nenhuma modificação necessária no `ThemeProvider`.
- **Background do canvas:** sincronizado com `--rockat-bg` do tema ativo

### Organização das stories

#### Tokens (docs-only — sem controls, apenas documentação visual)

| Story | Conteúdo |
|-------|----------|
| `Design System/Colors` | Paleta primitiva (swatches clicáveis para copiar CSS var) + tokens semânticos (tabela light/dark/uso) + usage guidelines |
| `Design System/Typography` | Font families, type scale (8 passos), pesos, line heights, pairing specimen + usage guidelines |
| `Design System/Spacing` | Escala visual de espaçamentos com tokens |
| `Design System/Radius` | Swatches de raios (interactive 12px, sm 8px) |
| `Design System/Icons` | Grid dos ícones Lucide usados no DS |

#### Componentes (interativos com controls)

| Story | Controls |
|-------|----------|
| `Components/Button` | `type` (select), `antSize` (select), `danger` (boolean), `loading` (boolean), `disabled` (boolean), `block` (boolean), `children` (text), `icon` (boolean) |
| `Components/Input` | `label` (text), `hint` (text), `error` (text), `placeholder` (text), `disabled` (boolean), `size` (select) |
| `Components/Card` | `variant` (select: default/filled/outlined), `title` (text), `extra` (text), `children` (text) |
| `Components/Table` | `striped` (boolean), `loading` (boolean), `emptyText` (text) — dados mockados fixos |

Cada componente terá múltiplas named stories cobrindo os casos principais do Playground (Variants, Sizes, With Icons, States, etc.).

---

## Pacote npm

### Build de biblioteca

Ferramenta: **`tsup`** — zero-config, suporta ESM + CJS + `.d.ts` simultaneamente.

```ts
// tsup.config.ts
export default {
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  splitting: false,
  external: ['react', 'react-dom', 'antd'],
  outDir: 'dist',
}
```

> **"use client":** adicionado ao topo de `src/index.ts` (entry point). Com `splitting: false`, o bundle gerado pelo tsup herda a diretiva do entry point, marcando o pacote inteiro como Client Component — correto, pois todos os componentes desta lib são client-only.

> **`next` não é peerDependency** — os componentes não importam nada de `next/*`. Adicioná-lo forçaria consumidores não-Next.js (ex: Vite) a instalar Next.js desnecessariamente.

> **CSS na `dist/`:** o tsup não copia arquivos estáticos. Os CSS são copiados via script `copy:styles` pós-build, que cria `dist/styles/tokens.css` e `dist/styles/primitives.css` — correspondendo exatamente aos caminhos declarados no `exports` map.

CSS (`tokens.css`, `primitives.css`) copiado para `dist/styles/` via script pós-build.

### package.json

```json
{
  "name": "@<org>/rockat-ui",
  "version": "0.1.0",
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

### Scripts adicionados

```json
"scripts": {
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build",
  "build:lib": "tsup && npm run copy:styles",
  "copy:styles": "mkdir -p dist/styles && cp src/styles/tokens.css dist/styles/ && cp src/styles/primitives.css dist/styles/"
}
```

### Consumo em outro repositório

```bash
# .npmrc no repositório consumidor
@<org>:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}

# instalar
npm install @<org>/rockat-ui
```

```tsx
// uso
import { Button, Card, Input } from '@<org>/rockat-ui'
import '@<org>/rockat-ui/styles/tokens'
import '@<org>/rockat-ui/styles/primitives'
```

---

## Notas de implementação

- **Decorator do Storybook:** o decorator que envolve as stories com `ThemeProvider` deve passar um `key` prop vinculado ao parâmetro do toolbar (ex: `<ThemeProvider key={mode}>`). Isso força remount ao trocar o tema, evitando que o `localStorage` de uma sessão anterior sobreponha a seleção do toolbar.

- **`"private": true` no `package.json`:** deve ser removido antes de publicar. O npm recusa publicação silenciosamente se este campo estiver `true`.

---

## O que não está no escopo desta implementação

- CI/CD automático (GitHub Actions para publicar no push de tag) — fase futura
- GitHub Pages para hospedar o Storybook estático — fase futura
- Remoção das páginas Next.js do Playground — feita manualmente após validação das stories
- Storybook interaction tests (`@storybook/test`) — fase futura

---

## Critérios de sucesso

- [ ] `npm run storybook` sobe sem erros com todas as stories
- [ ] Toggle Light/Dark funciona em todas as stories
- [ ] Controls do Storybook manipulam props dos componentes em tempo real
- [ ] `npm run build:lib` gera `dist/` com ESM, CJS e `.d.ts`
- [ ] `npm publish` publica no GitHub Packages sem erros
- [ ] Repositório consumidor consegue importar componentes e tokens do pacote
