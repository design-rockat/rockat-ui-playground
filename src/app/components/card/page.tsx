"use client";

import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Space } from "antd";
import { Star, MoreHorizontal, Heart, Users, ArrowRight } from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Variant Guide — ref: Atlassian Card, IBM Carbon Tile, MD3 Card variants
// ---------------------------------------------------------------------------

const variantGuide: {
  variant: string;
  whenToUse: string;
  example: string;
  note?: string;
}[] = [
  {
    variant: "default",
    whenToUse: "Container neutro para a maioria dos contextos",
    example: "Dashboard widgets, detalhe de item",
  },
  {
    variant: "outlined",
    whenToUse: "Destaque dentro de grids e listas — borda define o limite visual",
    example: "Cards de equipe, projetos em grid",
  },
  {
    variant: "filled",
    whenToUse: "Destaque editorial com fundo colorido suave",
    example: "Chamadas de ação, features em destaque",
    note: "Use com moderação",
  },
];

// ---------------------------------------------------------------------------
// Content guidelines — ref: IBM Carbon, GitHub Primer, Atlassian DS
// ---------------------------------------------------------------------------

const contentRules: {
  element: string;
  rule: string;
  good: string;
  bad: string;
}[] = [
  {
    element: "Title",
    rule: "Substantivo ou frase curta — identifica a entidade do card",
    good: "Projeto Alpha",
    bad: "Detalhes importantes do projeto",
  },
  {
    element: "Body",
    rule: "Máx 2–3 linhas visíveis, truncar com ellipsis se maior",
    good: "Descrição objetiva com 1–2 frases",
    bad: "Parágrafos longos sem Read More",
  },
  {
    element: "Extra",
    rule: "Ações secundárias (ícone ou link) — não duplicar footer",
    good: "Ícone de menu ou \"Ver mais\"",
    bad: "Múltiplos CTAs no extra e no footer",
  },
  {
    element: "Footer",
    rule: "Ação primária do card — 1 a 2 botões no máximo",
    good: "\"Abrir\" (primary) + \"Remover\" (text)",
    bad: "3 ou mais botões de igual peso",
  },
];

// ---------------------------------------------------------------------------
// Usage guidelines — ref: IBM Carbon, Atlassian DS, MD3, GitHub Primer
// ---------------------------------------------------------------------------

const usageRules: {
  type: "do" | "dont" | "caution";
  rule: string;
  detail: string;
}[] = [
  {
    type: "do",
    rule: "Um card = uma entidade — use como container de unidade de conteúdo",
    detail:
      "Cada card deve representar um único item, projeto, usuário ou conceito. Não misture entidades diferentes no mesmo card. Referência: Atlassian DS, MD3.",
  },
  {
    type: "do",
    rule: "Em grids, mantenha altura uniforme com align-stretch",
    detail:
      "Cards em grid devem ter a mesma altura. Use CSS Grid com align-items: stretch ou min-height consistente para evitar quebra visual. Referência: IBM Carbon.",
  },
  {
    type: "dont",
    rule: "Não anunture cards excessivamente — evite cards dentro de cards",
    detail:
      "No máximo 1 nível de aninhamento. Card > card > card cria hierarquia visual confusa e dificulta a leitura de informação. Referência: MD3.",
  },
  {
    type: "dont",
    rule: "Não use Card como substituto de tabela para dados tabulares",
    detail:
      "Se o conteúdo tem colunas e linhas comparação — use Table. Card é para entidades independentes, não para dados relacionados em linhas. Referência: IBM Carbon.",
  },
  {
    type: "caution",
    rule: "Cards clicáveis precisam de hover state e cursor pointer explícitos",
    detail:
      "Se o card inteiro é interativo, defina cursor: pointer + hover visual (shadow ou border). Sem feedback, o usuário não percebe a interatividade. Referência: Atlassian DS.",
  },
  {
    type: "caution",
    rule: "Para listas longas (>12 itens), prefira Table ou List ao invés de card grid",
    detail:
      "Grids de cards são ideais para até ~12 itens. Para listas longas paginadas, Table ou List oferecem scaneabilidade superior. Referência: GitHub Primer.",
  },
];

function MenuCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-5 rounded-2xl cursor-pointer transition-all duration-200"
      style={{
        background: "var(--rockat-bg-elevated)",
        border: `1px solid ${hovered ? "var(--rockat-primary-700)" : "var(--rockat-primary-50)"}`,
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 ease-out"
        style={{
          background: "var(--rockat-icon-bg)",
          color: "var(--rockat-icon-color)",
          transform: hovered ? "scale(1.12)" : "scale(1)",
        }}
      >
        {icon}
      </div>

      <p className="font-semibold text-sm mb-3" style={{ color: "var(--rockat-menu-text)" }}>
        {title}
      </p>

      <div style={{ minHeight: 22 }}>
        <div style={{ transition: "opacity 160ms, transform 160ms", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(-4px)" }}>
          <Button
            type="link"
            icon={<ArrowRight size={14} />}
            iconPosition="end"
            className="!p-0 !h-auto text-xs font-medium"
            style={{ color: "var(--rockat-primary-700)" }}
          >
            Acessar
          </Button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-base font-semibold mb-4" style={{ color: "var(--rockat-text)" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function CardPage() {
  return (
    <>
      <Header title="Card" subtitle="Container para agrupar conteúdo relacionado" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-base mb-10" style={{ color: "var(--rockat-text-muted)" }}>
          O componente{" "}
          <code
            className="font-mono text-sm px-1.5 py-0.5 rounded"
            style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}
          >
            Card
          </code>{" "}
          agrupa conteúdo com suporte a título, extra e variantes visuais.
        </p>

        <Section title="Default">
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Card title="Card Default">
              <p style={{ color: "var(--rockat-text-muted)" }}>
                Conteúdo do card com border padrão e background elevado.
              </p>
            </Card>
          </Space>
        </Section>

        <Section title="With Extra Actions">
          <Card
            title="Projeto Alpha"
            extra={
              <Button type="text" antSize="small" icon={<MoreHorizontal size={16} />} />
            }
          >
            <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
              Descrição do projeto com detalhes relevantes para o usuário.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star size={14} style={{ color: "#facc15", fill: "#facc15" }} />
                <span className="text-sm font-medium" style={{ color: "var(--rockat-text)" }}>
                  4.8
                </span>
              </div>
              <Button type="primary" antSize="small">
                Abrir
              </Button>
            </div>
          </Card>
        </Section>

        <Section title="Variants">
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Card variant="default" title="Variant: Default">
              <p style={{ color: "var(--rockat-text-muted)" }}>Borderless com background do tema.</p>
            </Card>
            <Card variant="outlined" title="Variant: Outlined">
              <p style={{ color: "var(--rockat-text-muted)" }}>Com borda visível.</p>
            </Card>
            <Card variant="filled" title="Variant: Filled">
              <p style={{ color: "var(--rockat-text-muted)" }}>Fundo colorido suave — primary-50 no light, primary-950 no dark.</p>
            </Card>
          </Space>
        </Section>

        <Section title="Grid Layout">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {["Design", "Engineering", "Product"].map((team) => (
              <Card key={team} variant="outlined">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "var(--rockat-accent-text)", color: "white" }}
                  >
                    {team[0]}
                  </div>
                  <button>
                    <Heart size={16} style={{ color: "var(--rockat-text-muted)" }} />
                  </button>
                </div>
                <p className="font-semibold text-sm" style={{ color: "var(--rockat-text)" }}>
                  {team}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--rockat-text-muted)" }}>
                  3 membros
                </p>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Rock-at Menu Card">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MenuCard
              icon={<Users size={18} />}
              title="Recursos Humanos"
            />
            <MenuCard
              icon={<Users size={18} />}
              title="Financeiro"
            />
            <MenuCard
              icon={<Users size={18} />}
              title="Tecnologia"
            />
          </div>
        </Section>

        {/* ── Variant Guide ─────────────────────────────────────────────── */}
        <div className="mb-10">
          <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
            Variant Guide
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Qual variante usar em cada situação — referência: Atlassian Card, IBM Carbon Tile, MD3 Card.
          </p>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--rockat-border)" }}>
            <div
              className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
              style={{
                gridTemplateColumns: "100px 1fr 1fr 110px",
                background: "var(--rockat-primary-50)",
                color: "var(--rockat-text-muted)",
                borderBottom: "1px solid var(--rockat-border)",
              }}
            >
              <span>Variante</span>
              <span>Quando usar</span>
              <span>Exemplos</span>
              <span>Atenção</span>
            </div>
            {variantGuide.map((item, i) => (
              <div
                key={item.variant}
                className="grid px-5 py-3 gap-4 items-start"
                style={{
                  gridTemplateColumns: "100px 1fr 1fr 110px",
                  borderBottom: i < variantGuide.length - 1 ? "1px solid var(--rockat-border)" : undefined,
                  background: "var(--rockat-bg-elevated)",
                }}
              >
                <code
                  className="text-[11px] font-mono px-1.5 py-0.5 rounded self-start"
                  style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}
                >
                  {item.variant}
                </code>
                <span className="text-xs" style={{ color: "var(--rockat-text)" }}>{item.whenToUse}</span>
                <span className="text-xs" style={{ color: "var(--rockat-text-muted)" }}>{item.example}</span>
                <span
                  className="text-[11px]"
                  style={{ color: item.note ? "var(--rockat-warning-text)" : "transparent" }}
                >
                  {item.note ?? "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Content Guidelines ───────────────────────────────────────── */}
        <div className="mb-10">
          <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
            Content Guidelines
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Como escrever e estruturar cada elemento do card — referência: IBM Carbon, GitHub Primer, Atlassian DS.
          </p>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--rockat-border)" }}>
            <div
              className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
              style={{
                gridTemplateColumns: "80px 1.2fr 1fr 1fr",
                background: "var(--rockat-primary-50)",
                color: "var(--rockat-text-muted)",
                borderBottom: "1px solid var(--rockat-border)",
              }}
            >
              <span>Elemento</span>
              <span>Regra</span>
              <span style={{ color: "var(--rockat-success-text)" }}>✓ Correto</span>
              <span style={{ color: "var(--rockat-danger-text)" }}>✗ Evitar</span>
            </div>
            {contentRules.map((item, i) => (
              <div
                key={i}
                className="grid px-5 py-3 gap-4 items-start"
                style={{
                  gridTemplateColumns: "80px 1.2fr 1fr 1fr",
                  borderBottom: i < contentRules.length - 1 ? "1px solid var(--rockat-border)" : undefined,
                  background: "var(--rockat-bg-elevated)",
                }}
              >
                <code
                  className="text-[11px] font-mono px-1.5 py-0.5 rounded self-start"
                  style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}
                >
                  {item.element}
                </code>
                <span className="text-xs" style={{ color: "var(--rockat-text)" }}>{item.rule}</span>
                <code
                  className="text-[11px] font-mono px-1.5 py-0.5 rounded self-start"
                  style={{ background: "var(--rockat-success-bg)", color: "var(--rockat-success-text)" }}
                >
                  {item.good}
                </code>
                <code
                  className="text-[11px] font-mono px-1.5 py-0.5 rounded self-start"
                  style={{ background: "var(--rockat-danger-bg)", color: "var(--rockat-danger-text)" }}
                >
                  {item.bad}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* ── Usage Guidelines ──────────────────────────────────────────── */}
        <div className="mb-10">
          <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
            Usage Guidelines
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Boas práticas baseadas em IBM Carbon, Atlassian DS, MD3 e GitHub Primer.
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
        </div>

      </div>
    </>
  );
}
