# Module Copy Guide

## Objetivo

Este guia define exatamente o que deve ser copiado deste repositório para dentro de um módulo consumidor, para que uma IA consiga consultar localmente o Design System antes de criar qualquer UI.

Use este guia quando você criar um novo repositório de módulo e quiser levar junto:

- o `plan.md`;
- uma referência local do Design System;
- regras suficientes para a IA trabalhar mesmo sem acesso à internet.

## Dumb

Copie:

- `plan.md`
- `src/index.ts`
- `src/components/ui/`
- `src/design-system/`
- `src/styles/tokens.css`

Cole no novo repositório assim:

- `plan.md` -> `plan.md`
- `src/index.ts` -> `.rockat-ds/src/index.ts`
- `src/components/ui/` -> `.rockat-ds/src/components/ui/`
- `src/design-system/` -> `.rockat-ds/src/design-system/`
- `src/styles/tokens.css` -> `.rockat-ds/src/styles/tokens.css`

Não copie o restante.

## Estrutura recomendada no repositório consumidor

Ao preparar um módulo novo, a estrutura final recomendada é:

```text
<repo-do-modulo>/
  plan.md
  .rockat-ds/
    src/
      index.ts
      components/
        ui/
      design-system/
      styles/
        tokens.css
```

## O que copiar deste repositório

Copie estes arquivos e pastas:

### 1. Arquivo principal de regras

Origem:

- `plan.md`

Destino no módulo:

- `plan.md`

### 2. Superfície pública oficial

Origem:

- `src/index.ts`

Destino no módulo:

- `.rockat-ds/src/index.ts`

Esse arquivo é a fonte primária para a IA descobrir o que é API pública do Design System.

### 3. Componentes oficiais

Origem:

- `src/components/ui/`

Destino no módulo:

- `.rockat-ds/src/components/ui/`

Isso permite que a IA leia a implementação dos componentes existentes antes de propor componente novo ou duplicar abstrações.

### 4. Tokens e tema do Design System

Origem:

- `src/design-system/`

Destino no módulo:

- `.rockat-ds/src/design-system/`

Essa pasta contém:

- tokens em TypeScript;
- provider de tema;
- configuração de tema do Ant Design.

### 5. Tokens CSS

Origem:

- `src/styles/tokens.css`

Destino no módulo:

- `.rockat-ds/src/styles/tokens.css`

Esse arquivo permite que a IA veja as variáveis CSS oficiais e evite criar uma segunda fonte de verdade para cores, superfícies, bordas e estados visuais.

## O que não precisa copiar

Por padrão, não copie estas partes para o módulo consumidor:

- `src/app/`
- `src/components/layout/`
- `public/`
- páginas de showcase ou playground

Essas áreas servem para documentação visual deste repositório, mas não são necessárias para a IA descobrir a API pública e as regras do Design System em outro módulo.

## Ordem de consulta da IA no módulo consumidor

Ao receber uma tarefa de UI, a IA deve consultar nesta ordem:

1. `plan.md`
2. `.rockat-ds/src/index.ts`
3. `.rockat-ds/src/components/ui/`
4. `.rockat-ds/src/design-system/`
5. `.rockat-ds/src/styles/tokens.css`

Se ainda houver dúvida, aí sim a IA pode procurar:

- o pacote oficial do Design System;
- o repositório remoto do DS;
- documentação adicional do time.

## Regra de uso no módulo consumidor

Se o Design System já tiver componente, token ou padrão para o caso:

- a IA deve usar o Design System;
- não deve criar componente paralelo;
- não deve criar token local equivalente;
- não deve resolver com CSS ad hoc permanente.

Se faltar cobertura no Design System:

- a IA deve registrar a lacuna;
- propor evolução no DS;
- e só criar solução local mínima e temporária se isso for realmente necessário para destravar a entrega.

## Checklist de preparação ao criar um módulo novo

Antes de usar a IA no novo repositório, confirme:

- `plan.md` foi copiado para a raiz;
- `.rockat-ds/src/index.ts` existe;
- `.rockat-ds/src/components/ui/` existe;
- `.rockat-ds/src/design-system/` existe;
- `.rockat-ds/src/styles/tokens.css` existe;
- o `plan.md` está coerente com o fluxo de consumo do módulo;
- se houver pacote oficial publicado, o nome do pacote foi preenchido no `plan.md`.

## Resultado esperado

Quando esse kit estiver presente no módulo consumidor, você poderá instruir a IA com algo como:

“Antes de criar qualquer interface, leia o `plan.md` e consulte `.rockat-ds/` para usar os componentes, tokens e regras oficiais do Design System.”

Isso reduz bastante a chance de a IA inventar componentes paralelos ou fugir da linguagem visual oficial por falta de contexto.
