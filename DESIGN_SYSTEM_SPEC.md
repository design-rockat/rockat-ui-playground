# Rock-at UI - Design System Spec

## Purpose

This document is the official Design System specification for AI-assisted implementation of Rock-at UI in other libraries, modules, or repositories.

Use this file as the primary contract for visual and interaction decisions.

Precedence rule:

1. Use this Markdown as the canonical contract.
2. Use the current implementation in this repository only as mapping/reference.
3. If code and this document diverge, external consumers should follow this document unless a gap is explicitly called out below.

This spec is intentionally semantic. It describes what another library must reproduce, not only how the current Ant Design wrapper happens to expose it today.

## Foundations

### Colors

Only the palettes below are part of the current official documentation contract:

- `primary`
- `neutral`
- `secondary`

Do not document or propagate `tertiary` as part of the current official Design System contract.

#### Primary

Use `primary` for brand, high-emphasis actions, selected states, and strong highlights.

| Scale | Hex | Canonical token |
| --- | --- | --- |
| 50 | `#f5f0ff` | `--rockat-primary-50` |
| 100 | `#ede4ff` | `--rockat-primary-100` |
| 200 | `#ddcdff` | `--rockat-primary-200` |
| 300 | `#c5a5ff` | `--rockat-primary-300` |
| 400 | `#ab72ff` | `--rockat-primary-400` |
| 500 | `#943aff` | `--rockat-primary-500` |
| 600 | `#8c12ff` | `--rockat-primary-600` |
| 700 | `#8001ff` | `--rockat-primary-700` |
| 800 | `#6600cc` | `--rockat-primary-800` |
| 900 | `#5902b0` | `--rockat-primary-900` |
| 950 | `#350078` | `--rockat-primary-950` |

Recommended usage:

- `primary-700` is the default brand/action color.
- `primary-600` and `primary-800` are used for hover/active emphasis around primary actions.
- `primary-50` and `primary-100` are used for soft backgrounds, subtle highlights, and low-emphasis brand surfaces.

#### Neutral

Use `neutral` for structure, text hierarchy, borders, separators, and non-brand surfaces.

| Scale | Hex | Canonical token |
| --- | --- | --- |
| 50 | `#fafafa` | `--rockat-neutral-50` |
| 100 | `#f5f5f5` | `--rockat-neutral-100` |
| 200 | `#e5e5e5` | `--rockat-neutral-200` |
| 300 | `#d4d4d4` | `--rockat-neutral-300` |
| 400 | `#a3a3a3` | `--rockat-neutral-400` |
| 500 | `#737373` | `--rockat-neutral-500` |
| 600 | `#525252` | `--rockat-neutral-600` |
| 700 | `#404040` | `--rockat-neutral-700` |
| 800 | `#262626` | `--rockat-neutral-800` |
| 900 | `#171717` | `--rockat-neutral-900` |
| 950 | `#0a0a0a` | `--rockat-neutral-950` |

Recommended usage:

- Use neutral tones for layout structure before reaching for brand color.
- Use neutral scales for borders, secondary text, dividers, and low-attention surfaces.
- Do not use neutral as a substitute for primary emphasis.

#### Secondary

Use `secondary` for positive support surfaces, supporting accents, and non-primary semantic emphasis.

| Scale | Hex | Canonical token |
| --- | --- | --- |
| 50 | `#f3fff6` | `--rockat-secondary-50` |
| 100 | `#e7ffed` | `--rockat-secondary-100` |
| 200 | `#bfffd0` | `--rockat-secondary-200` |
| 300 | `#8ef3a7` | `--rockat-secondary-300` |
| 400 | `#4fe274` | `--rockat-secondary-400` |
| 500 | `#20c24f` | `--rockat-secondary-500` |
| 600 | `#17a73f` | `--rockat-secondary-600` |
| 700 | `#0e8a30` | `--rockat-secondary-700` |
| 800 | `#0a6726` | `--rockat-secondary-800` |
| 900 | `#06491b` | `--rockat-secondary-900` |
| 950 | `#03260f` | `--rockat-secondary-950` |

Recommended usage:

- Use `secondary` for supportive visual accents, not as a replacement for primary CTA color.
- Use lighter secondary tones for calm surfaces and deeper tones for positive semantic emphasis.

#### Color Rules

- Never hardcode hex values inside consuming components if a Design System token exists.
- When another library cannot use CSS variables directly, preserve the semantic intent and the exact palette values above.
- Prefer semantic usage over raw palette usage: primary for brand/action, neutral for structure, secondary for supportive emphasis.

#### Border Contract

Global border rule for external implementations:

- Every standard bordered component must use `grey 100` as the default border color.
- In the current Rock-at token system, `grey 100` maps to `neutral-100`.
- Canonical value: `#f5f5f5`
- Canonical token for external documentation intent: `grey-100`
- Canonical token in the current repo: `--rockat-neutral-100`

Apply this border color by default to:

- outlined cards
- bordered inputs
- table outer borders
- table header separators
- row separators when a visible divider is needed
- any other standard surface that exposes a neutral border

Border rule summary:

- If a component has a visible neutral border and no stronger semantic override is required, use `grey 100`.
- Do not invent different neutral border colors per component.
- If another library uses a `gray` or `grey` naming scheme, map it to the Rock-at value above.

### Icons

The standard icon library is `lucide-react`.

Required import pattern:

```tsx
import { Search, Mail, Lock, Eye, EyeOff, Plus, Download } from "lucide-react";
```

Rules:

- Use Lucide icons consistently across buttons, inputs, cards, tables, and supporting UI.
- Do not mix icon libraries inside the same product surface unless there is an explicit migration plan.
- Use icons to reinforce meaning, not replace text without accessibility support.
- Decorative icons may remain unlabeled.
- Interactive icon-only controls must always have an accessible name.

Recommended sizes by context:

- `14px` inside dense inputs
- `16px` inside buttons and compact actions
- `20px` for standalone icon previews or gallery contexts

### Radius

System rule:

- Default radius for surfaces and interactive components is `12px`.
- The only standard compact exception is `8px` for small controls.

This means another library implementing Rock-at UI should default to:

- `12px` for buttons, inputs, cards, tables, modals, popovers, and standard surfaces
- `8px` only for intentionally small/compact variants

Reference token scale currently present in the repo:

| Token | Value | Status in the contract |
| --- | --- | --- |
| `radius.none` | `0px` | exceptional |
| `radius.sm` | `4px` | exceptional |
| `radius.md` | `8px` | compact exception |
| `radius.lg` | `12px` | default |
| `radius.xl` | `16px` | large surface exception |
| `radius.2xl` | `24px` | hero/sheet exception |
| `radius.full` | `9999px` | pill/circular only |

Contract rule for AI consumers:

- If unsure, choose `12px`.
- Do not invent per-component radius values outside this system.

### Spacing

Spacing follows a `4px` base scale.

| Key | Value | Tier | Typical usage |
| --- | --- | --- | --- |
| `0` | `0px` | micro | reset, no spacing |
| `1` | `4px` | micro | icon gaps, micro separation |
| `2` | `8px` | micro | chips, compact elements |
| `3` | `12px` | micro | small internal padding |
| `4` | `16px` | component | default component padding |
| `5` | `20px` | component | cards, dropdowns, medium internal spacing |
| `6` | `24px` | component | forms, modal internals |
| `8` | `32px` | component | large cards and panels |
| `10` | `40px` | layout | section gaps |
| `12` | `48px` | layout | container padding |
| `16` | `64px` | layout | large block separation |
| `20` | `80px` | layout | hero and large vertical rhythm |
| `24` | `96px` | layout | major page sections |

Rules:

- Stay on the 4px scale.
- Use `gap` for layout relationships whenever possible.
- Use micro spacing for component internals, component spacing for standard surfaces, and layout spacing for page structure.
- Do not introduce arbitrary spacing values unless the Design System is intentionally extended.

### Typography

#### Font families

| Token | Value | Use |
| --- | --- | --- |
| `fontFamily.sans` | `Geist, system-ui, sans-serif` | interface, headings, body |
| `fontFamily.mono` | `Geist Mono, monospace` | code, tokens, technical values |

#### Font sizes

| Token | Value | Default role |
| --- | --- | --- |
| `fontSize.xs` | `12px` | captions, helper labels, dense metadata |
| `fontSize.sm` | `14px` | small body, helper text |
| `fontSize.md` | `16px` | default body size |
| `fontSize.lg` | `18px` | large body, intro text |
| `fontSize.xl` | `20px` | small heading, card title |
| `fontSize.2xl` | `24px` | section heading |
| `fontSize.3xl` | `30px` | page heading |
| `fontSize.4xl` | `36px` | display/hero heading |

#### Font weights

| Token | Value | Use |
| --- | --- | --- |
| `fontWeight.normal` | `400` | paragraphs, descriptions |
| `fontWeight.medium` | `500` | labels, navigation, UI text |
| `fontWeight.semibold` | `600` | component titles, section headings |
| `fontWeight.bold` | `700` | page titles, display text |

#### Line heights

| Token | Value | Use |
| --- | --- | --- |
| `lineHeight.tight` | `1.25` | headings |
| `lineHeight.normal` | `1.5` | body text |
| `lineHeight.relaxed` | `1.75` | long-form reading |

Rules:

- `16px` is the default body size.
- Do not create hierarchy using only color; combine size and weight.
- Use mono only for code-like or technical content.
- Avoid mixing too many text sizes inside a single compact component.

Typography contract summary for AI consumers:

- Body default must be `16px / 1.5 / 400`.
- Button text must use `500` weight.
- Small helper/caption text may use `12px`, but never as the main readable body size.
- Card titles should default to `20px` with `600` weight when a clear title hierarchy is needed.
- Section headings should start at `24px` with `600` weight.
- Page headings should start at `30px` with `700` weight.

## Components

## Button

### Objective

Communicate and trigger user actions with clear visual hierarchy.

### When to use

- Primary actions in forms, dialogs, pages, and cards
- Secondary or tertiary actions that support a primary flow
- Icon-supported actions when the icon reinforces the label
- Icon-only actions when space is constrained and the action remains clear

### When not to use

- Do not place multiple primary buttons with equal emphasis in the same local context.
- Do not use icon-only buttons without an accessible name.
- Do not replace navigation links with buttons when the intent is navigation.

### Anatomy

Required button anatomy:

1. Outer interactive container
2. Optional leading icon slot
3. Label/content slot
4. Optional loading indicator state
5. Optional icon-only presentation

Anatomy details:

| Part | Required | Rule |
| --- | --- | --- |
| Outer container | yes | carries radius, border, background, spacing, and interaction states |
| Label | no for icon-only, yes otherwise | must remain the primary meaning carrier in standard buttons |
| Leading icon | optional | icon appears before the label |
| Loading indicator | optional | replaces or augments the resting state while preserving action meaning |
| Icon-only content | optional | only valid when the button has an accessible label |

Structural rules:

- The icon sits before the label.
- The label and icon must be vertically centered.
- The button must support text-only, icon + text, and icon-only compositions.
- Icon-only buttons still follow the same radius and border rules as their size/variant combination.
- The outer container is the source of truth for border radius.
- Padding belongs to the outer container, not to the icon or label independently.

### Variants

| Variant | Meaning | Usage guidance |
| --- | --- | --- |
| `primary` | highest emphasis | default CTA |
| `default` | secondary outlined action | standard secondary action |
| `dashed` | optional/secondary alternative | lighter optional action |
| `text` | low-emphasis tertiary action | in dense UI or supporting actions |
| `link` | inline/link-like action | contextual link action |

Notes:

- `danger` is a state overlay, not a standalone base variant in the contract.
- `primary` should usually appear at most once per decision cluster.

### Sizes

| Size | Radius | Text size | Font weight | Horizontal padding | Vertical padding | Contract role |
| --- | --- | --- | --- | --- |
| `small` | `8px` | `12px` | `500` | `7px` | `0px` | compact actions |
| `middle` | `12px` | `14px` | `500` | `15px` | `0px` | default |
| `large` | `12px` | `16px` | `500` | `15px` | `0px` | high-visibility action |

Non-negotiable radius rule for buttons:

- `small` buttons use `8px`.
- `middle` and `large` buttons use `12px`.
- If another library exposes only one button radius token, it must still preserve the `small` exception.

Non-negotiable border rule for bordered buttons:

- Bordered neutral buttons must use `grey 100` / `neutral-100` as the default border color.
- This applies to `default` and `dashed` buttons in their resting bordered state.

### States

| State | Meaning | Rule |
| --- | --- | --- |
| `default` | interactive and available | normal usage |
| `loading` | action in progress | keep label context if possible |
| `disabled` | unavailable | visually disabled and non-interactive |
| `danger` | destructive emphasis | use for delete/remove/destructive intent |
| `block` | full-width layout mode | use when the button must fill its container |

### Icon rules

- Use `lucide-react`.
- Prefer one icon per button.
- Standard icon placement is leading, before the text.
- Icon-only buttons must preserve the same visual hierarchy as labeled buttons.
- Icon-only buttons must receive an explicit accessible label.
- Dense button icons should usually be `16px`.
- Icon-only buttons should not collapse the radius or invent a new border treatment.

### Visual behavior contract

External implementations must preserve these button decisions:

- `primary` is filled and highest emphasis.
- `default` is bordered and secondary.
- `dashed` is bordered with dashed stroke treatment.
- `text` has no visible resting border.
- `link` behaves like an inline action with no visible resting border.
- `danger` modifies the visual treatment for destructive intent without changing the sizing contract.
- `block` only changes width behavior; it does not change radius, typography, or icon rules.

### Accessibility

- Icon-only buttons require `aria-label`.
- Loading buttons should remain understandable to assistive technology.
- Disabled buttons must not look active.
- Text and link buttons must still preserve sufficient contrast and focus visibility.

### Snippet

```tsx
import { Plus, Edit } from "lucide-react";

<Button type="primary" antSize="middle">Salvar</Button>
<Button type="default" antSize="middle" icon={<Edit size={16} />}>Editar</Button>
<Button type="primary" icon={<Plus size={16} />} aria-label="Adicionar item" />
```

### Mapping to the current API

| Semantic contract | Current repo mapping |
| --- | --- |
| Variant | `Button.type` |
| Size | `Button.antSize` |
| Destructive state | `Button.danger` |
| Loading state | `Button.loading` |
| Disabled state | `Button.disabled` |
| Full width | `Button.block` |
| Icon | `Button.icon` |

Implementation precision note:

- Another AI or implementation tool should be able to build the button contract from this section alone without guessing radius, icon order, border color, typography weight, or size behavior.

## Input

### Objective

Capture short-form user input with clear labeling, state feedback, and optional semantic icons.

### When to use

- Text entry
- Search entry
- Email entry
- Password entry
- Labeled form fields with hint or error messaging

### When not to use

- Do not use for long-form multi-line text.
- Do not rely on placeholder as the only label in critical forms.
- Do not hide errors only in color; include explicit text feedback.

### Anatomy

- Optional label
- Input field container
- Optional prefix icon
- Input text/value area
- Optional trailing password visibility toggle
- Supporting text area for hint or error

### Variants

Input does not currently expose visual variants like button/card. The contract is semantic by use case.

| Case | Meaning | Rule |
| --- | --- | --- |
| `default` | plain text field | baseline input |
| `search` | search-oriented field | may use leading search icon |
| `email` | email field | may use leading mail icon and email input type |
| `password` | secret text field | must support visibility toggle with eye icon |

### Sizes

| Size | Contract role |
| --- | --- |
| `small` | compact dense forms |
| `middle` | default |
| `large` | high-visibility or touch-friendly forms |

Input radius and border contract:

- Default input radius is `12px`.
- If a compact small input is intentionally used, `8px` is allowed as the compact exception.
- Standard input border color must be `grey 100` / `neutral-100`.

### States

| State | Meaning | Rule |
| --- | --- | --- |
| `default` | ready for input | baseline |
| `disabled` | unavailable | visually disabled and non-editable |
| `error` | invalid or incomplete | show explicit error text |
| `hint` | helper guidance | visible only when no error is shown |
| `with prefix icon` | contextual affordance | icon should support meaning, not replace label |

Password-specific contract:

- Password fields must expose a visibility toggle.
- Use `Eye` when the password is hidden.
- Use `EyeOff` when the password is visible.
- The toggle must be an interactive control with an accessible label.
- This is a required contract behavior for external consumers.

### Icon rules

- Use `lucide-react`.
- Prefix icons are appropriate for search, email, lock/password, and similar semantic cues.
- Input icons inside dense fields should usually be `14px`.
- Password visibility toggle icons must be interactive, not decorative.

### Accessibility

- Prefer visible labels for important fields.
- Error text must be explicit and should override hint text.
- Password visibility toggle must expose a meaningful accessible label such as "Mostrar senha" / "Ocultar senha".
- Decorative prefix icons should not be announced.

### Snippet

```tsx
import { Search, Mail, Lock, Eye, EyeOff } from "lucide-react";

<Input label="Busca" prefix={<Search size={14} />} placeholder="Pesquisar..." />

<Input
  label="Email"
  type="email"
  prefix={<Mail size={14} />}
  placeholder="nome@empresa.com"
  hint="Nunca compartilharemos seu email."
/>

// Contract requirement for external implementations:
// password fields must include a visibility toggle using Eye / EyeOff
<Input
  label="Senha"
  type="password"
  prefix={<Lock size={14} />}
  placeholder="Minimo de 8 caracteres"
/>
```

### Mapping to the current API

| Semantic contract | Current repo mapping |
| --- | --- |
| Size | `Input.size` |
| Label | `Input.label` |
| Hint | `Input.hint` |
| Error message | `Input.error` |
| Prefix icon | `Input.prefix` |
| Disabled state | `Input.disabled` |
| Field type | `Input.type` |

Important status note:

- The current repo supports `label`, `hint`, `error`, `size`, `type`, and `prefix`.
- The password visibility toggle with `Eye` / `EyeOff` is part of the contract but is not yet implemented as dedicated wrapper behavior in the current component.

## Card

### Objective

Group related content inside a reusable surface with consistent spacing, hierarchy, and optional header actions.

### When to use

- Summary surfaces
- List/grid items
- Metric or project previews
- Sections that need a contained background and visual grouping

### When not to use

- Do not wrap content in cards when simple page spacing is enough.
- Do not invent multiple card looks outside the documented variants.
- Do not turn every layout container into a card.

### Anatomy

- Surface container
- Optional title/header
- Optional extra action in the header
- Body content

### Variants

| Variant | Meaning | Rule |
| --- | --- | --- |
| `default` | borderless standard card | baseline surface |
| `outlined` | visible border | use when separation needs stronger structure |
| `filled` | soft brand-tinted surface | use for highlighted content, not every card |

### Sizes

There is no named size prop in the current public contract.

Contract guidance:

- Use standard component spacing values inside cards.
- Default surface radius remains `12px`.
- Card size is determined by container/layout composition, not by a dedicated card size API.
- Outlined cards must use `grey 100` / `neutral-100` as the border color.

### States

| State | Meaning | Rule |
| --- | --- | --- |
| `default` | regular content surface | baseline |
| `with title` | visible header/title | use for grouped content |
| `with extra action` | header action present | extra action must be interactive and intentional |

### Icon rules

- Use Lucide for supporting icons inside cards.
- Header actions may use icon buttons.
- Supporting metadata icons should remain secondary to the main content.

### Accessibility

- Titles should preserve hierarchy relative to the surrounding page.
- Header actions must be real interactive controls, not decorative elements.
- If an entire card becomes clickable in a consuming product, use correct link/button semantics instead of a generic `div`.

### Snippet

```tsx
import { MoreHorizontal, Star } from "lucide-react";

<Card
  variant="outlined"
  title="Projeto Alpha"
  extra={<Button type="text" antSize="small" icon={<MoreHorizontal size={16} />} aria-label="Mais opcoes" />}
>
  <p>Descricao do projeto.</p>
  <div>
    <Star size={16} />
    <span>4.8</span>
  </div>
</Card>
```

### Mapping to the current API

| Semantic contract | Current repo mapping |
| --- | --- |
| Variant | `Card.variant` |
| Header title | `Card.title` |
| Header extra action | `Card.extra` |
| Surface content | `Card.children` |

## Table

### Objective

Display structured tabular data with clear headers, readable rows, and explicit empty/loading states.

### When to use

- Repeated records with stable columns
- Scan-friendly structured data
- Admin/product data tables with predictable row schema

### When not to use

- Do not use when content is better represented as cards on all breakpoints.
- Do not overload tables with decorative styling patterns outside the system contract.
- Do not use striped tables as part of the official Rock-at Design System contract in this stage.

### Anatomy

- Outer surface container
- Table element
- Header row
- Body rows
- Empty state row
- Loading skeleton rows
- Optional row click affordance

### Variants

Only the following cases are part of the official contract:

| Case | Meaning | Rule |
| --- | --- | --- |
| `default` | standard table with data | baseline |
| `empty state` | no data available | show explicit empty text |
| `loading` | data is being fetched | use skeleton rows |
| `clickable` | rows trigger navigation/action | rows must communicate interactivity |

### Sizes

There is no named size API in the current public contract.

Contract guidance:

- Preserve `12px` outer surface radius.
- Use readable cell spacing and maintain scan-friendly density.
- Use `grey 100` / `neutral-100` for the table outer border and default separators.

### States

| State | Meaning | Rule |
| --- | --- | --- |
| `default` | populated table | standard rendering |
| `empty` | no results | use clear empty message |
| `loading` | data in progress | skeleton rows instead of blank flash |
| `clickable` | row interaction enabled | cursor and hover feedback required |

### Icon rules

- Icons are optional inside cells.
- Use Lucide only when the icon adds real semantic value to the cell or action.
- Do not add icon decoration to every row by default.

### Accessibility

- Preserve real table semantics with header cells and body cells.
- Clickable rows should also have a keyboard-accessible interaction model in consuming implementations.
- Empty and loading states should remain understandable and explicit.

### Snippet

```tsx
<Table
  columns={[
    { key: "name", title: "Nome" },
    { key: "email", title: "Email" },
  ]}
  data={users}
  emptyText="Nenhum dado encontrado."
/>
```

### Mapping to the current API

| Semantic contract | Current repo mapping |
| --- | --- |
| Column definition | `columns` |
| Data rows | `data` |
| Loading state | `loading` |
| Empty state text | `emptyText` |
| Clickable rows | `onRowClick` |

Important contract note:

- `striped` exists in the current implementation, but it is intentionally outside the official documented Design System contract for now.

## Deliberate Omissions / Gaps

- `tertiary` color scale exists in the repo tokens but is intentionally omitted from the official Design System documentation for this stage.
- `Table.striped` exists in the repo code but is intentionally excluded from the official Design System contract.
- Password visibility toggle with `Eye` / `EyeOff` is a required documented contract for inputs, but it is not yet implemented as a dedicated behavior in the current wrapper.
- External consumers should reproduce the contract in this Markdown, not inherit undocumented Ant Design behavior automatically.

## Implementation Mapping

Current public surface in this repository:

- `Button`
- `Input`
- `Card`
- `Table`
- `ThemeProvider`
- `rockatLightTheme`
- `rockatDarkTheme`
- `colors`
- `spacing`
- `radius`
- `typography`

Public entrypoint:

```ts
src/index.ts
```

Reference implementation areas:

- `src/components/ui/button/Button.tsx`
- `src/components/ui/input/Input.tsx`
- `src/components/ui/card/Card.tsx`
- `src/components/ui/table/Table.tsx`
- `src/design-system/tokens/*`
- `src/styles/tokens.css`
- `src/styles/primitives.css`

Mapping guidance for another library:

- Reproduce the semantic behavior first.
- Reuse the exact tokens and hierarchy rules from this document.
- Treat Ant Design prop names as current implementation detail, not universal API law.
- If another library has different component APIs, preserve the same variants, states, sizes, radius, spacing, typography, and icon behavior.

## Contract Summary for AI Consumers

If an AI agent must reproduce Rock-at UI in another module, it should follow these rules in order:

1. Use the foundations in this file for colors, icons, radius, spacing, and typography.
2. Use the component contracts in this file before checking the local implementation.
3. Preserve `12px` as the default radius for standard surfaces and interactive components.
4. Use `lucide-react` for icons.
5. Preserve the button size contract exactly: `small = 8px radius`, `middle/large = 12px radius`, text weight `500`.
6. Use `grey 100` / `neutral-100` as the default border color for cards, inputs, tables, and other neutral bordered surfaces.
7. Documented table support is limited to `default`, `empty state`, `loading`, and `clickable`.
8. Password inputs must include a visibility toggle with `Eye` / `EyeOff`, even though the current wrapper does not yet provide that behavior directly.
9. Do not propagate undocumented patterns such as `tertiary` palette usage or `striped` table as part of the current official contract.
