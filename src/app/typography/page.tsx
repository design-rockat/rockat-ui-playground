import { Header } from "@/components/layout/Header";
import { typography } from "@/design-system/tokens/typography";

// ---------------------------------------------------------------------------
// Data enriched with semantic roles — ref: IBM Carbon, GitHub Primer, MD3
// ---------------------------------------------------------------------------

const typeScaleItems: {
  key: string;
  size: string;
  weight: string;
  lineHeight: number;
  role: string;
  tailwind: string;
}[] = [
  { key: "xs",   size: "12px", weight: "400",     lineHeight: 1.5,  role: "Caption, labels, badges",       tailwind: "text-xs"  },
  { key: "sm",   size: "14px", weight: "400",     lineHeight: 1.5,  role: "Body small, helper text",       tailwind: "text-sm"  },
  { key: "md",   size: "16px", weight: "400",     lineHeight: 1.5,  role: "Body default, paragraphs",      tailwind: "text-base"},
  { key: "lg",   size: "18px", weight: "400/600", lineHeight: 1.5,  role: "Body large, intro text",        tailwind: "text-lg"  },
  { key: "xl",   size: "20px", weight: "600",     lineHeight: 1.25, role: "Heading XS, card title",        tailwind: "text-xl"  },
  { key: "2xl",  size: "24px", weight: "600",     lineHeight: 1.25, role: "Heading S, section title",      tailwind: "text-2xl" },
  { key: "3xl",  size: "30px", weight: "700",     lineHeight: 1.25, role: "Heading M, page title",         tailwind: "text-3xl" },
  { key: "4xl",  size: "36px", weight: "700",     lineHeight: 1.1,  role: "Heading L, hero / display",     tailwind: "text-4xl" },
];

const weightItems: {
  key: string;
  weight: number;
  usage: string;
  example: string;
}[] = [
  { key: "normal",   weight: 400, usage: "Body, descriptions, paragraphs",          example: "The quick brown fox" },
  { key: "medium",   weight: 500, usage: "UI labels, navigation, tabs",              example: "The quick brown fox" },
  { key: "semibold", weight: 600, usage: "Headings S–M, card titles, emphasis",      example: "The quick brown fox" },
  { key: "bold",     weight: 700, usage: "Headings L, display, hero text",           example: "The quick brown fox" },
];

const lineHeightItems = Object.entries(typography.lineHeight).map(([key, value]) => ({
  key,
  value,
  token: `lineHeight.${key}`,
  usage:
    key === "tight"   ? "Headings, display text — espaçamento compacto" :
    key === "normal"  ? "Body text, parágrafos — padrão de leitura confortável" :
                        "Textos longos, artigos — máxima legibilidade",
}));

const usageRules = [
  {
    type: "do" as const,
    rule: "Use text-base (16px) como tamanho padrão de corpo",
    detail: "16px é o mínimo recomendado para conforto de leitura (WCAG 1.4.4). Nunca use body menor que text-sm (14px).",
  },
  {
    type: "do" as const,
    rule: "Combine peso com tamanho — nunca use bold em body text",
    detail: "font-bold é exclusivo de headings e display. Para ênfase em corpo, use font-semibold. Referência: IBM Carbon Productive Type.",
  },
  {
    type: "dont" as const,
    rule: "Não crie hierarquia apenas com cor — use tamanho e peso também",
    detail: "Usuários com daltonismo ou baixa visão dependem de contraste estrutural (size + weight), não só de cor. Referência: WCAG 1.4.1.",
  },
  {
    type: "do" as const,
    rule: "Use Geist Mono exclusivamente para código e valores técnicos",
    detail: "Tokens CSS, snippets, valores numéricos e hashes devem usar a família mono. Nunca use mono para UI labels ou body text.",
  },
  {
    type: "dont" as const,
    rule: "Não misture mais de 2 níveis de tamanho em um mesmo bloco de conteúdo",
    detail: "Uma seção deve ter no máximo 1 heading + 1 body size. Mais do que isso gera ruído visual. Referência: Material Design 3 Type Scale.",
  },
  {
    type: "do" as const,
    rule: "Use line-height tight apenas em headings e nunca em body text",
    detail: "lineHeight.tight (1.25) em parágrafos prejudica legibilidade para dislexia e baixa visão. Use lineHeight.normal (1.5) ou relaxed (1.75) em textos corridos.",
  },
  {
    type: "caution" as const,
    rule: "text-xs (12px) só em contextos não-críticos e com contraste máximo",
    detail: "WCAG recomenda relação de contraste mínima de 4.5:1 para texto menor que 14px. Use --rockat-text (não muted) em text-xs.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TypographyPage() {
  return (
    <>
      <Header title="Typography" subtitle="Escala tipográfica e regras de uso" />
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* ── Intro ──────────────────────────────────────────────────────── */}
        <div className="mb-12">
          <p className="text-base mb-5" style={{ color: "var(--rockat-text-muted)" }}>
            A tipografia do Rock-at UI é organizada em dois níveis — prática adotada por{" "}
            <strong style={{ color: "var(--rockat-text)" }}>IBM Carbon</strong>,{" "}
            <strong style={{ color: "var(--rockat-text)" }}>GitHub Primer</strong> e{" "}
            <strong style={{ color: "var(--rockat-text)" }}>Material Design 3</strong>:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl" style={{ background: "var(--rockat-bg-subtle)", border: "1px solid var(--rockat-border)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--rockat-accent-text)" }}>
                Scale tokens
              </p>
              <p className="text-sm" style={{ color: "var(--rockat-text-muted)" }}>
                Primitive: fontSize, fontWeight, lineHeight. Definem a escala base. Use para compor semantic roles.
              </p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "var(--rockat-bg-subtle)", border: "1px solid var(--rockat-border)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--rockat-accent-text)" }}>
                Semantic roles
              </p>
              <p className="text-sm" style={{ color: "var(--rockat-text-muted)" }}>
                Combinações de size + weight + line-height para propósitos concretos: Heading, Body, Caption, Code.
              </p>
            </div>
          </div>
        </div>

        {/* ── Font Families ──────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--rockat-text)" }}>
            Font Families
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--rockat-text-muted)" }}>
            Duas famílias cobrindo 100% dos casos de uso de interface.
          </p>
          <div className="space-y-3">
            {Object.entries(typography.fontFamily).map(([key, value]) => (
              <div
                key={key}
                className="p-5 rounded-xl"
                style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <code className="text-[11px] font-mono px-2 py-0.5 rounded" style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}>
                        fontFamily.{key}
                      </code>
                      <span className="text-xs" style={{ color: "var(--rockat-text-muted)" }}>
                        {key === "sans" ? "Interface, headings, body" : "Code, tokens, valores técnicos"}
                      </span>
                    </div>
                    <p
                      className="text-lg"
                      style={{ fontFamily: value, color: "var(--rockat-text)", lineHeight: 1.5 }}
                    >
                      {key === "sans"
                        ? "The quick brown fox jumps over the lazy dog"
                        : "const primary = \"#8001ff\"; // var(--rockat-primary-700)"}
                    </p>
                  </div>
                  <code
                    className="text-xs font-mono px-2.5 py-1 rounded flex-shrink-0 self-start"
                    style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}
                  >
                    {value.split(",")[0]}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Type Scale ─────────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--rockat-text)" }}>
            Type Scale
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--rockat-text-muted)" }}>
            8 passos de tamanho, cada um com peso, line-height e papel semântico recomendado.
          </p>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--rockat-border)" }}>
            {/* Header row */}
            <div
              className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
              style={{
                gridTemplateColumns: "48px 1fr 80px 60px 1.8fr",
                background: "var(--rockat-bg-subtle)",
                color: "var(--rockat-text-muted)",
                borderBottom: "1px solid var(--rockat-border)",
              }}
            >
              <span>Size</span>
              <span>Specimen</span>
              <span>Tailwind</span>
              <span>Weight</span>
              <span>Role</span>
            </div>
            {typeScaleItems.map((item, i) => (
              <div
                key={item.key}
                className="grid items-center gap-4 px-5 py-3"
                style={{
                  gridTemplateColumns: "48px 1fr 80px 60px 1.8fr",
                  borderBottom: i < typeScaleItems.length - 1 ? "1px solid var(--rockat-border)" : "none",
                  background: i % 2 === 0 ? "var(--rockat-bg-elevated)" : "var(--rockat-bg-subtle)",
                }}
              >
                <code className="text-[11px] font-mono" style={{ color: "var(--rockat-text-muted)" }}>
                  {item.size}
                </code>
                <p
                  style={{
                    fontSize: item.size,
                    color: "var(--rockat-text)",
                    lineHeight: item.lineHeight,
                    fontWeight: item.weight.includes("/") ? 600 : Number(item.weight),
                  }}
                >
                  Rock-at UI
                </p>
                <code className="text-[11px] font-mono" style={{ color: "var(--rockat-accent-text)" }}>
                  {item.tailwind}
                </code>
                <code className="text-[11px] font-mono" style={{ color: "var(--rockat-text-muted)" }}>
                  {item.weight}
                </code>
                <span className="text-xs" style={{ color: "var(--rockat-text-muted)" }}>
                  {item.role}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Font Weights ───────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--rockat-text)" }}>
            Font Weights
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--rockat-text-muted)" }}>
            4 graus de ênfase. Cada peso tem um papel semântico — não os intercambie livremente.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {weightItems.map((item) => (
              <div
                key={item.key}
                className="p-5 rounded-xl"
                style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}
              >
                <p
                  className="text-2xl mb-3 leading-tight"
                  style={{ fontWeight: item.weight, color: "var(--rockat-text)" }}
                >
                  {item.example}
                </p>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--rockat-text)" }}>
                      font-{item.key}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--rockat-text-muted)" }}>
                      {item.usage}
                    </p>
                  </div>
                  <code
                    className="text-xs font-mono px-2 py-0.5 rounded flex-shrink-0"
                    style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}
                  >
                    {item.weight}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Line Heights ───────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--rockat-text)" }}>
            Line Heights
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--rockat-text-muted)" }}>
            O espaçamento vertical afeta diretamente a legibilidade. Nunca use{" "}
            <code className="text-[11px] font-mono px-1 py-0.5 rounded" style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}>
              tight
            </code>{" "}
            em parágrafos.
          </p>
          <div className="space-y-3">
            {lineHeightItems.map((item) => (
              <div
                key={item.key}
                className="p-5 rounded-xl"
                style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}
              >
                <div className="flex items-start gap-6 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-base mb-3"
                      style={{
                        lineHeight: item.value,
                        color: "var(--rockat-text)",
                      }}
                    >
                      O Rock-at UI é um design system orientado a produto. Cada decisão tipográfica é guiada por legibilidade e hierarquia visual clara.
                    </p>
                    <p className="text-xs" style={{ color: "var(--rockat-text-muted)" }}>
                      {item.usage}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <code
                      className="text-[11px] font-mono px-2 py-0.5 rounded block mb-1"
                      style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}
                    >
                      {item.token}
                    </code>
                    <span className="text-xl font-bold" style={{ color: "var(--rockat-text)" }}>
                      {item.value}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pairing Specimen ───────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--rockat-text)" }}>
            Pairing Specimen
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--rockat-text-muted)" }}>
            Como heading, body e caption funcionam juntos — padrão adotado por IBM Carbon e Atlassian DS.
          </p>
          <div className="p-8 rounded-2xl" style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--rockat-accent-text)" }}>
              Caption · text-xs · font-semibold · lineHeight tight
            </p>
            <h3 className="text-3xl font-bold mb-3 leading-tight" style={{ color: "var(--rockat-text)" }}>
              Construindo produtos com design consistente
            </h3>
            <p className="text-base mb-5" style={{ color: "var(--rockat-text-muted)", lineHeight: 1.75 }}>
              Um design system bem definido reduz decisões arbitrárias e acelera o desenvolvimento. Cada token tipográfico tem um propósito claro, evitando ambiguidade na escolha de tamanho e peso.
            </p>
            <p className="text-sm" style={{ color: "var(--rockat-text-muted)", lineHeight: 1.5 }}>
              Última atualização: Rock-at UI v0.1.0 ·{" "}
              <code className="font-mono text-xs" style={{ color: "var(--rockat-accent-text)" }}>
                Geist / Geist Mono
              </code>
            </p>
          </div>
        </section>

        {/* ── Usage Guidelines ───────────────────────────────────────────── */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--rockat-text)" }}>
            Usage Guidelines
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--rockat-text-muted)" }}>
            Regras baseadas em IBM Carbon, Atlassian DS, Material Design 3 e GitHub Primer.
          </p>
          <div className="space-y-3">
            {usageRules.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: "var(--rockat-bg-elevated)", border: "1px solid var(--rockat-border)" }}
              >
                <span
                  className="mt-0.5 flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
                  style={{
                    background:
                      item.type === "do"      ? "var(--rockat-success-bg)"  :
                      item.type === "dont"    ? "var(--rockat-danger-bg)"   :
                                                "var(--rockat-warning-bg)",
                    color:
                      item.type === "do"      ? "var(--rockat-success-text)"  :
                      item.type === "dont"    ? "var(--rockat-danger-text)"   :
                                                "var(--rockat-warning-text)",
                  }}
                >
                  {item.type === "do" ? "Do" : item.type === "dont" ? "Don't" : "Atenção"}
                </span>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--rockat-text)" }}>
                    {item.rule}
                  </p>
                  <p className="text-xs" style={{ color: "var(--rockat-text-muted)" }}>
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
