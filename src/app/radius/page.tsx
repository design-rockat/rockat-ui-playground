"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { radius } from "@/design-system/tokens/radius";
import { Copy, Check } from "lucide-react";

// ---------------------------------------------------------------------------
// Data enriched with semantic roles — ref: MD3 Shape System, Atlassian DS
// ---------------------------------------------------------------------------

const radiusItems: {
  key: string;
  value: string;
  tailwind: string;
  role: string;
  components: string;
}[] = [
  { key: "none", value: "0px",    tailwind: "rounded-none", role: "Sem arredondamento",         components: "Dividers, imagens fullbleed, tabelas" },
  { key: "sm",   value: "4px",    tailwind: "rounded-sm",   role: "Arredondamento sutil",        components: "Badges, tags inline, chips compactos" },
  { key: "md",   value: "8px",    tailwind: "rounded-lg",   role: "Arredondamento padrão leve",  components: "Tooltips, dropdowns, menus" },
  { key: "lg",   value: "12px",   tailwind: "rounded-xl",   role: "Padrão do sistema ★",         components: "Buttons, inputs, cards, modais" },
  { key: "xl",   value: "16px",   tailwind: "rounded-2xl",  role: "Arredondamento expressivo",   components: "Cards grandes, banners, painéis" },
  { key: "2xl",  value: "24px",   tailwind: "rounded-3xl",  role: "Arredondamento acentuado",    components: "Hero cards, sheets, drawers" },
  { key: "full", value: "9999px", tailwind: "rounded-full", role: "Pílula / Circular",           components: "Avatars, pills, FABs, toggles" },
];

const usageRules = [
  {
    type: "do" as const,
    rule: "Use radius.lg (12px) como padrão para todos os componentes interativos",
    detail:
      "Buttons, inputs, cards e modais usam 12px. É o valor configurado no Ant Design ConfigProvider e garante consistência visual. Referência: Rock-at DS padrão.",
  },
  {
    type: "do" as const,
    rule: "Use radius.full apenas para elementos circulares ou pill",
    detail:
      "Avatars, badges de status, pills de filtro e FABs usam rounded-full. Para botões normais, mantenha lg. Referência: MD3 Shape — Full.",
  },
  {
    type: "dont" as const,
    rule: "Não misture mais de 2 valores de radius em um mesmo layout",
    detail:
      "Usar none, md, xl e full no mesmo card cria inconsistência visual. Escolha um valor dominante e um desvio no máximo. Referência: Atlassian DS.",
  },
  {
    type: "do" as const,
    rule: "Reduza o radius em componentes muito pequenos",
    detail:
      "Um badge de 20px de altura com radius.xl (16px) vira quase um pill. Use radius.sm (4px) ou radius.md (8px) para elementos abaixo de 32px de altura. Referência: MD3 Shape Scale.",
  },
  {
    type: "dont" as const,
    rule: "Não use radius.none em componentes flutuantes (modais, cards, dropdowns)",
    detail:
      "Cantos retos em elementos sobrepostos ao conteúdo parecem erros visuais. Reserve none apenas para elementos que se estendem até a borda da viewport. Referência: IBM Carbon.",
  },
  {
    type: "caution" as const,
    rule: "Em mobile, prefira radius maior para alvos de toque",
    detail:
      "Raios maiores (lg, xl) melhoram a percepção de toque em telas pequenas. Nunca use radius.none em botões mobile. Referência: MD3 Adaptive Shape.",
  },
];

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function RadiusRow({ item, striped }: { item: typeof radiusItems[0]; striped: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(item.tailwind);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }, [item.tailwind]);

  const isDefault = item.key === "lg";

  return (
    <div
      className="group grid items-center gap-4 px-5 py-3"
      style={{
        gridTemplateColumns: "48px 52px 116px 1fr 1.8fr",
        borderBottom: "1px solid var(--rockat-border)",
        background: striped ? "var(--rockat-bg-subtle)" : "var(--rockat-bg-elevated)",
      }}
    >
      {/* Preview swatch */}
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: item.value,
          background: "var(--rockat-accent-bg)",
          border: "2px solid var(--rockat-accent-border)",
          flexShrink: 0,
        }}
      />

      {/* px value */}
      <code className="text-[11px] font-mono" style={{ color: "var(--rockat-text-muted)" }}>
        {item.value}
      </code>

      {/* Tailwind class — click to copy */}
      <button
        className="flex items-center gap-1.5 text-left"
        onClick={handleCopy}
        title={`Copiar ${item.tailwind}`}
      >
        <code className="text-[11px] font-mono" style={{ color: "var(--rockat-accent-text)" }}>
          {item.tailwind}
        </code>
        {isDefault && (
          <span
            className="text-[9px] font-bold px-1 py-0.5 rounded uppercase"
            style={{ background: "var(--rockat-success-bg)", color: "var(--rockat-success-text)" }}
          >
            default
          </span>
        )}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          {copied
            ? <Check size={10} style={{ color: "var(--rockat-success-text)" }} />
            : <Copy size={10} style={{ color: "var(--rockat-text-muted)" }} />}
        </span>
      </button>

      {/* Role */}
      <span className="text-xs" style={{ color: "var(--rockat-text)" }}>
        {item.role}
      </span>

      {/* Components */}
      <span className="text-xs" style={{ color: "var(--rockat-text-muted)" }}>
        {item.components}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function RadiusPage() {
  return (
    <>
      <Header title="Radius" subtitle="Escala de border-radius e regras de uso" />
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* ── Intro ──────────────────────────────────────────────────────── */}
        <div className="mb-12">
          <p className="text-base mb-5" style={{ color: "var(--rockat-text-muted)" }}>
            O border-radius define a personalidade visual do sistema — de estrutural a expressivo.
            Referência:{" "}
            <strong style={{ color: "var(--rockat-text)" }}>MD3 Shape System</strong>,{" "}
            <strong style={{ color: "var(--rockat-text)" }}>Atlassian DS</strong> e{" "}
            <strong style={{ color: "var(--rockat-text)" }}>IBM Carbon</strong>.
            O valor padrão do sistema é{" "}
            <code
              className="text-[11px] font-mono px-1.5 py-0.5 rounded"
              style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}
            >
              radius.lg = 12px
            </code>
            , aplicado globalmente via Ant Design{" "}
            <code
              className="text-[11px] font-mono px-1.5 py-0.5 rounded"
              style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}
            >
              ConfigProvider
            </code>.
          </p>
        </div>

        {/* ── Scale Grid ─────────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--rockat-text)" }}>
            Radius Scale
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--rockat-text-muted)" }}>
            Visualização dos 7 passos da escala. Clique na classe Tailwind para copiá-la.
          </p>

          {/* Scale table */}
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--rockat-border)" }}>
            <div
              className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
              style={{
                gridTemplateColumns: "48px 52px 116px 1fr 1.8fr",
                background: "var(--rockat-bg-subtle)",
                color: "var(--rockat-text-muted)",
                borderBottom: "1px solid var(--rockat-border)",
              }}
            >
              <span>Preview</span>
              <span>Value</span>
              <span>Tailwind</span>
              <span>Role</span>
              <span>Componentes</span>
            </div>
            {radiusItems.map((item, i) => (
              <RadiusRow key={item.key} item={item} striped={i % 2 === 0} />
            ))}
          </div>
        </section>

        {/* ── Visual Scale ───────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--rockat-text)" }}>
            Visual Comparison
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--rockat-text-muted)" }}>
            Todos os valores lado a lado na mesma escala para comparação visual.
          </p>
          <div className="flex flex-wrap items-end gap-5 p-6 rounded-2xl" style={{ background: "var(--rockat-bg-subtle)", border: "1px solid var(--rockat-border)" }}>
            {radiusItems.map((item) => (
              <div key={item.key} className="flex flex-col items-center gap-2">
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: item.value,
                    background: "var(--rockat-accent-bg)",
                    border: "2px solid var(--rockat-accent-border)",
                  }}
                />
                <div className="text-center">
                  <p className="text-[11px] font-semibold" style={{ color: "var(--rockat-text)" }}>
                    {item.key}
                  </p>
                  <code className="text-[10px] font-mono" style={{ color: "var(--rockat-text-muted)" }}>
                    {item.value}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── In Context ─────────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--rockat-text)" }}>
            Radius in Context
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--rockat-text-muted)" }}>
            Como os valores se aplicam em componentes reais — referência: MD3, Atlassian DS.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Structural — none/sm */}
            <div className="p-5 rounded-2xl" style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--rockat-text-muted)" }}>
                Estrutural · none / sm
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-0.5 font-medium" style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)", borderRadius: "0px" }}>
                  Tag none
                </span>
                <span className="text-xs px-2 py-0.5 font-medium" style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)", borderRadius: "4px" }}>
                  Badge sm
                </span>
              </div>
            </div>

            {/* Component default — lg */}
            <div className="p-5 rounded-2xl" style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--rockat-text-muted)" }}>
                Padrão · lg (12px) ★
              </p>
              <button
                className="text-sm font-medium px-4 py-2 w-full"
                style={{
                  borderRadius: "12px",
                  background: "var(--rockat-accent-bg)",
                  color: "var(--rockat-accent-text)",
                  border: "1px solid var(--rockat-accent-border)",
                }}
              >
                Button default
              </button>
            </div>

            {/* Expressive — full */}
            <div className="p-5 rounded-2xl" style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--rockat-text-muted)" }}>
                Expressivo · full
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <div
                  className="w-8 h-8 flex items-center justify-center text-xs font-bold"
                  style={{ borderRadius: "9999px", background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)", border: "2px solid var(--rockat-accent-border)" }}
                >
                  AV
                </div>
                <span
                  className="text-xs px-3 py-1 font-medium"
                  style={{ borderRadius: "9999px", background: "var(--rockat-success-bg)", color: "var(--rockat-success-text)" }}
                >
                  Pill badge
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── System default callout ──────────────────────────────────────── */}
        <div
          className="mb-14 p-5 rounded-2xl"
          style={{ background: "var(--rockat-accent-bg)", border: "1px solid var(--rockat-accent-border)" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--rockat-accent-text)" }}>
            Padrão do Design System
          </p>
          <p className="text-sm" style={{ color: "var(--rockat-text-muted)" }}>
            Todos os componentes usam{" "}
            <code className="font-mono text-xs" style={{ color: "var(--rockat-accent-text)" }}>radius.lg = 12px</code>{" "}
            por padrão. O Ant Design{" "}
            <code className="font-mono text-xs" style={{ color: "var(--rockat-accent-text)" }}>ConfigProvider</code>{" "}
            está configurado com{" "}
            <code className="font-mono text-xs" style={{ color: "var(--rockat-accent-text)" }}>borderRadius: 12</code>,
            propagando o valor automaticamente para todos os componentes Ant Design do sistema.
          </p>
        </div>

        {/* ── Usage Guidelines ───────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--rockat-text)" }}>
            Usage Guidelines
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--rockat-text-muted)" }}>
            Regras baseadas em MD3 Shape System, Atlassian DS, IBM Carbon e GitHub Primer.
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
                      item.type === "do"   ? "var(--rockat-success-bg)" :
                      item.type === "dont" ? "var(--rockat-danger-bg)"  :
                                             "var(--rockat-warning-bg)",
                    color:
                      item.type === "do"   ? "var(--rockat-success-text)" :
                      item.type === "dont" ? "var(--rockat-danger-text)"  :
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
