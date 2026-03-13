# Rock-at UI Plan

## O que este repositório é

Este repositório é, hoje, um playground e uma documentação viva do Design System Rock-at construído com `Next.js App Router`. O foco atual não é uma biblioteca NPM fechada e pronta para distribuição, e sim uma base para evoluir:

- tokens de design reutilizáveis;
- wrappers leves de componentes sobre `Ant Design`;
- páginas de showcase para documentação visual e validação manual.

Quem mexer aqui deve tratar o projeto primeiro como um ambiente de documentação e experimentação do design system. Se surgir uma mudança que puxe o repo para o papel de pacote distribuível, essa decisão precisa ser explícita e refletida na estrutura, nos scripts e na documentação.

## Stack atual

O estado real do projeto hoje é:

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `Ant Design v6`
- `lucide-react`
- `class-variance-authority`

Referências úteis no código:

- app e rotas: `src/app/*`
- tokens TS: `src/design-system/tokens/*`
- tokens CSS: `src/styles/tokens.css`
- tema Ant Design: `src/design-system/theme/*`
- componentes UI: `src/components/ui/*`
- exports públicos atuais: `src/index.ts`

## Arquitetura atual

### 1. Tokens e semântica visual

Os valores-base do design system estão divididos em dois níveis:

- tokens em TypeScript dentro de `src/design-system/tokens`
- variáveis CSS em `src/styles/tokens.css`

As variáveis `--rockat-*` são a base visual compartilhada pelo app. Elas definem paletas, superfícies, texto, bordas, estados semânticos e diferenças entre tema claro e escuro.

Ao alterar estilo visual, a prioridade deve ser:

1. reutilizar uma variável `--rockat-*` existente;
2. reutilizar tokens TS já publicados;
3. só então criar um token novo, se a necessidade for recorrente e fizer sentido para o sistema.

Evite espalhar valores hardcoded em páginas e componentes se esse valor representa uma decisão de design reaproveitável.

### 2. Tema e modo claro/escuro

O tema é aplicado por `ThemeProvider` em `src/design-system/theme/provider.tsx`, que:

- persiste o tema em `localStorage` com a chave `rockat-theme`;
- aplica `data-theme` no `documentElement`;
- sincroniza o tema do app com o `ConfigProvider` do Ant Design.

Os presets do Ant Design vivem em `src/design-system/theme/antd-theme.ts`.

Regra prática: qualquer mudança de token visual relevante deve ser coerente tanto no modo `light` quanto no modo `dark`. Não introduza ajuste só para um tema se o outro tema ficar inconsistente.

### 3. Estrutura das páginas

As páginas em `src/app/*` funcionam como documentação viva do design system.

Hoje elas cumprem três papéis:

- apresentar tokens como cores, tipografia, spacing e radius;
- demonstrar componentes em páginas dedicadas;
- oferecer um playground interativo para testar variações rapidamente.

Antes de concluir uma mudança visual ou de API em componente, o ideal é que exista uma página ou seção de showcase cobrindo esse comportamento.

### 4. Componentes UI

Os componentes em `src/components/ui/*` são wrappers finos sobre primitives do `Ant Design`.

Padrão atual:

- `Button` reaproveita `AntButton` e adiciona ergonomia leve com `cva`;
- `Input` reaproveita `AntInput` e adiciona `label`, `hint` e `error`;
- `Card` reaproveita `AntCard` e adiciona variantes sem reinventar o componente-base;
- `Table` é uma implementação própria simples, estilizada com tokens do sistema.

Ao criar novos componentes, prefira manter o mesmo modelo: encapsular o suficiente para alinhar tema, API e ergonomia do design system, mas sem duplicar complexidade já resolvida pelo `Ant Design`.

### 5. Superfície pública atual

Os exports centrais estão em `src/index.ts`. Hoje a superfície pública explícita é:

- `Button`
- `Input`
- `Card`
- `ThemeProvider`
- `useThemeContext`
- `rockatLightTheme`
- `rockatDarkTheme`
- `colors`
- `spacing`
- `radius`
- `typography`

Se um novo componente ou token precisar fazer parte da API pública do design system, ele deve ser exportado por esse arquivo.

## Convenções para futuras mudanças

### Visual e styling

- Reutilize `--rockat-*` e tokens existentes antes de criar novos valores.
- Preserve coerência entre `light` e `dark`.
- Mantenha a linguagem visual atual: superfícies suaves, bordas arredondadas e uso consistente dos tokens semânticos.
- Evite hardcode visual repetido quando o valor puder virar token do sistema.

### Componentização

- Prefira wrappers leves sobre `Ant Design` quando isso mantiver consistência e reduzir duplicação.
- Use `Ant Design` diretamente em páginas de showcase ou playground quando o objetivo for demonstração rápida, não necessariamente publicar um wrapper novo.
- Só encapsule um componente novo se houver ganho claro de API, tema, consistência ou reuso.

### Organização

- Tokens novos devem entrar em `src/design-system/tokens/*` e, se precisarem estar no runtime CSS, também em `src/styles/tokens.css`.
- Componentes novos devem seguir o padrão `src/components/ui/<nome>/`.
- Exports públicos devem ser atualizados em `src/index.ts`.
- Páginas de showcase devem entrar em `src/app/...` e, se forem navegáveis, também na navegação da sidebar.

### Papel do repositório

Não assuma que este repo já é um pacote NPM consolidado. A própria home comunica intenção de publicação futura, mas o estado atual é de playground/documentação. Mudanças devem respeitar esse estágio e evitar decisões de packaging/distribuição não pedidas.

## Como mexer sem quebrar o modelo atual

### Adicionar ou alterar tokens

Quando a mudança for de design system:

- atualize o token TypeScript em `src/design-system/tokens/*` se ele precisar existir como dado estruturado;
- atualize `src/styles/tokens.css` se o valor precisar estar disponível como CSS custom property;
- propague a mudança para `src/design-system/theme/antd-theme.ts` se ela impactar o tema do `Ant Design`;
- revise páginas de showcase afetadas para refletir o novo comportamento.

### Adicionar um novo componente

Fluxo recomendado:

1. criar o componente em `src/components/ui/<nome>/`;
2. expor um `index.ts` local, se seguir o padrão dos componentes existentes;
3. publicar o export em `src/index.ts` se o componente fizer parte da API pública;
4. criar uma página de demonstração em `src/app/components/<nome>/page.tsx` ou na área mais adequada da navegação;
5. adicionar a rota correspondente na sidebar em `src/components/layout/Sidebar.tsx` se a página for parte da documentação navegável.

### Quando usar Ant Design direto

Use `Ant Design` diretamente quando:

- o uso for local de uma página de documentação/playground;
- ainda não houver necessidade de API própria do design system;
- a abstração adicional só aumentaria custo sem ganho real.

Encapsule em `src/components/ui` quando:

- o componente precisa carregar convenções do design system;
- o mesmo padrão será reutilizado em mais de um lugar;
- a API do `Ant Design` precisa ser simplificada ou complementada.

### Publicar algo na superfície pública

Se a intenção é que um token, tema, hook ou componente seja consumido fora do app, registre isso em `src/index.ts`. Se não estiver exportado ali, trate como implementação interna do playground/documentação.

## Validação mínima esperada

Toda mudança relevante deve ser validada com pelo menos:

- `npm run build` como baseline obrigatório;
- `npm run lint` como checagem esperada;
- revisão visual manual nas rotas afetadas.

Observação importante: o script de `lint` existe e deve continuar sendo usado, mas em uma inspeção anterior ele precisou ser observado por aparente demora sem saída imediata. Se isso voltar a acontecer, investigue antes de assumir que a mudança de código foi a causa.

## Riscos e pegadinhas atuais

- `README.md` ainda está no template padrão do `Next.js`, então não é fonte confiável de contexto do projeto.
- A home em `src/app/page.tsx` menciona `Next.js 15`, mas o `package.json` está em `Next 16`. Não replique esse dado sem conferir o arquivo de dependências.
- O repositório mistura playground, documentação e embrião de pacote. Não trate decisões futuras de distribuição como se já estivessem prontas.
- Nem todo componente usado nas páginas necessariamente representa uma API pública do design system. A referência oficial da superfície pública é `src/index.ts`.

## Baseline atual validado

No estado em que este documento foi criado:

- `npm run build` passa com geração estática das rotas do app;
- as páginas documentadas incluem introdução, tokens, componentes, tabelas, ícones e playground;
- o tema global depende de `ThemeProvider`, `AntdRegistry` e `ConfigProvider` no layout raiz.

## O que uma IA deve conseguir responder após ler este arquivo

Uma IA ou engenheiro deve conseguir responder, sem explorar o repositório do zero:

- o que este projeto é hoje;
- onde adicionar tokens;
- onde criar ou encapsular componentes;
- onde publicar exports públicos;
- como validar a mudança;
- quais premissas não devem ser assumidas indevidamente.

## Próximo ajuste de documentação recomendado

Como este arquivo passa a ser a principal fonte de contexto operacional, o passo seguinte recomendado é alinhar o `README.md` para apontar para ele ou absorver uma versão resumida deste conteúdo, evitando documentação conflitante.
