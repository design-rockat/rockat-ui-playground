# Rock-at UI — Design System

Este repositório é a fonte oficial do Rock-at Design System. Contém componentes, tokens, tema e regras visuais do ecossistema Rock-at.

## Stack

- Next.js (App Router)
- Tailwind CSS
- Ant Design
- TypeScript

## Arquitetura atômica

Componentes seguem a cadeia: `tokens CSS → primitivas semânticas → componentes`

- Tokens CSS: `src/styles/tokens.css`
- Primitivas semânticas: `src/styles/primitives.css`
- Componentes UI: `src/components/ui/`
- Tema e tokens TypeScript: `src/design-system/`
- Superfície pública: `src/index.ts`

## Regras ao trabalhar neste repo

- Novos componentes devem consumir tokens de `src/styles/tokens.css` via primitivas de `src/styles/primitives.css` — nunca valores hardcoded.
- A superfície pública (`src/index.ts`) deve exportar tudo que módulos consumidores precisam acessar.
- Radius: `middle/large = 12px`, `small = 8px` como única exceção.
- Não criar segunda fonte de verdade para tokens.
- Não duplicar abstrações já existentes.

## Validação

```bash
npm run lint
npm run test:atomic
```

## Regras de consumo

Leia `plan.md` para entender como módulos externos devem consumir este Design System.
