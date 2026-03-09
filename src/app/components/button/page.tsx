"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Space } from "antd";
import { Download, Plus, Trash2, Edit, ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Variant guide — ref: MD3 Button types, IBM Carbon Button kinds,
// Atlassian Button appearance, GitHub Primer Button variant
// ---------------------------------------------------------------------------

const variantGuide: {
  variant: string;
  whenToUse: string;
  example: string;
  note?: string;
}[] = [
  {
    variant: "primary",
    whenToUse: "Ação principal e única de uma view ou seção",
    example: "Salvar, Confirmar, Publicar",
    note: "Máximo 1 por view",
  },
  {
    variant: "default",
    whenToUse: "Ações secundárias, alternativas ao primary",
    example: "Cancelar, Voltar, Editar",
  },
  {
    variant: "dashed",
    whenToUse: "Ações aditivas — indicam criação de algo novo",
    example: "+ Adicionar item, + Nova seção",
  },
  {
    variant: "text",
    whenToUse: "Ações terciárias, menos proeminentes",
    example: "Ver mais, Detalhes, Limpar filtros",
  },
  {
    variant: "link",
    whenToUse: "Navegação para URLs externas ou internas",
    example: "Ver documentação, Abrir no GitHub",
  },
  {
    variant: "danger",
    whenToUse: "Ações destrutivas e irreversíveis",
    example: "Excluir conta, Remover acesso, Revogar",
    note: "Sempre requer confirmação prévia",
  },
];

// ---------------------------------------------------------------------------
// Usage guidelines — ref: IBM Carbon, GitHub Primer, Atlassian DS, MD3
// ---------------------------------------------------------------------------

const usageRules: {
  type: "do" | "dont" | "caution";
  rule: string;
  detail: string;
}[] = [
  {
    type: "do",
    rule: "Use apenas um botão Primary por view ou seção",
    detail:
      "O Primary representa a ação de maior importância. Múltiplos botões primary criam ambiguidade cognitiva. Use default para as demais ações. Referência: IBM Carbon, MD3.",
  },
  {
    type: "do",
    rule: "Par Primary + Default para ações de confirmação/cancelamento",
    detail:
      'Padrão universal: botão principal à direita (Primary = "Salvar") e secundário à esquerda (Default = "Cancelar"). Referência: Atlassian DS, MD3.',
  },
  {
    type: "dont",
    rule: "Não use danger sem confirmação prévia",
    detail:
      'Ações destrutivas devem sempre ter um passo de confirmação (modal, popconfirm, dialog). Nunca execute delete ou revoke diretamente no primeiro clique. Referência: IBM Carbon, GitHub Primer.',
  },
  {
    type: "dont",
    rule: "Não use loading como único feedback de ações assíncronas",
    detail:
      "O estado loading indica progresso, mas o usuário precisa de feedback de conclusão. Combine com Toast, Alert ou mensagem inline após a resposta da API. Referência: Atlassian DS.",
  },
  {
    type: "caution",
    rule: "Botões desativados (disabled) não são focáveis — prefira loading",
    detail:
      "disabled remove o botão do fluxo de tabulação e não comunica o motivo ao usuário. Para ações em andamento, use loading. Para ações condicionais, adicione tooltip com o motivo. Referência: Atlassian DS, MD3.",
  },
  {
    type: "caution",
    rule: "Não empilhe mais de 2 variantes diferentes no mesmo grupo inline",
    detail:
      "Misturar primary + dashed + link no mesmo bloco cria hierarquia confusa. Limite a 2 variantes por grupo de ações. Referência: IBM Carbon.",
  },
];

// ---------------------------------------------------------------------------
// Content guidelines — ref: IBM Carbon Copy Guidelines, GitHub Primer Content
// ---------------------------------------------------------------------------

const contentRules: {
  rule: string;
  good: string;
  bad: string;
}[] = [
  {
    rule: "Comece com um verbo de ação forte",
    good: "Salvar alterações",
    bad: "Alterações",
  },
  {
    rule: "Seja específico sobre o objeto da ação",
    good: "Excluir arquivo",
    bad: "Excluir",
  },
  {
    rule: "Use sentence case (só primeira palavra maiúscula)",
    good: "Adicionar membro",
    bad: "Adicionar Membro / ADICIONAR MEMBRO",
  },
  {
    rule: "Evite rótulos genéricos sem contexto",
    good: "Confirmar cancelamento",
    bad: "OK / Sim / Não",
  },
  {
    rule: "Não use reticências em botões de ação imediata",
    good: "Exportar",
    bad: "Exportar...",
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-base font-semibold mb-4" style={{ color: "var(--rockat-text)" }}>
        {title}
      </h2>
      <div
        className="p-6 rounded-2xl"
        style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}
      >
        {children}
      </div>
    </div>
  );
}

export default function ButtonPage() {
  return (
    <>
      <Header title="Button" subtitle="Componente de ação principal" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-base mb-10" style={{ color: "var(--rockat-text-muted)" }}>
          O componente <code className="font-mono text-sm px-1.5 py-0.5 rounded"
            style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}>
            Button
          </code>{" "}
          encapsula o Ant Design Button com os tokens do Rock-at UI.
        </p>

        <Section title="Variants">
          <Space wrap>
            <Button type="primary">Primary</Button>
            <Button type="default">Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="text">Text</Button>
            <Button type="link">Link</Button>
          </Space>
        </Section>

        <Section title="Sizes">
          <Space wrap align="center">
            <Button type="primary" antSize="small">Small</Button>
            <Button type="primary" antSize="middle">Middle</Button>
            <Button type="primary" antSize="large">Large</Button>
          </Space>
        </Section>

        <Section title="With Icons">
          <Space wrap>
            <Button type="primary" icon={<Plus size={16} />}>New Item</Button>
            <Button type="default" icon={<Download size={16} />}>Download</Button>
            <Button type="dashed" icon={<Edit size={16} />}>Edit</Button>
            <Button type="default" danger icon={<Trash2 size={16} />}>Delete</Button>
          </Space>
        </Section>

        <Section title="States">
          <Space wrap>
            <Button type="primary">Active</Button>
            <Button type="primary" loading>Loading</Button>
            <Button type="primary" disabled>Disabled</Button>
            <Button type="default" danger>Danger</Button>
          </Space>
        </Section>

        <Section title="Icon Only">
          <Space>
            <Button type="primary" icon={<Plus size={16} />} />
            <Button type="default" icon={<Edit size={16} />} />
            <Button type="dashed" icon={<Download size={16} />} />
          </Space>
        </Section>

        <Section title="Block">
          <div className="space-y-3 max-w-xs">
            <Button type="primary" block icon={<ArrowRight size={16} />}>
              Continue
            </Button>
            <Button type="default" block>
              Cancel
            </Button>
          </div>
        </Section>

        {/* ── Variant Guide ──────────────────────────────────────────────── */}
        <div className="mb-10">
          <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
            Variant Guide
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Qual variante usar em cada situação — referência: MD3, IBM Carbon, Atlassian DS, GitHub Primer.
          </p>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--rockat-border)" }}>
            <div
              className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
              style={{
                gridTemplateColumns: "100px 1fr 1fr 100px",
                background: "var(--rockat-primary-50)",
                color: "var(--rockat-text-muted)",
                borderBottom: "1px solid var(--rockat-border)",
              }}
            >
              <span>Variante</span>
              <span>Quando usar</span>
              <span>Exemplos de rótulo</span>
              <span>Restrição</span>
            </div>
            {variantGuide.map((item, i) => (
              <div
                key={item.variant}
                className="grid px-5 py-3 gap-4 items-start"
                style={{
                  gridTemplateColumns: "100px 1fr 1fr 100px",
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
                <span className="text-xs" style={{ color: "var(--rockat-text)" }}>
                  {item.whenToUse}
                </span>
                <span className="text-xs" style={{ color: "var(--rockat-text-muted)" }}>
                  {item.example}
                </span>
                <span className="text-[11px]" style={{ color: item.note ? "var(--rockat-warning-text)" : "transparent" }}>
                  {item.note ?? "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Content Guidelines ─────────────────────────────────────────── */}
        <div className="mb-10">
          <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
            Content Guidelines
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Regras de escrita para rótulos de botão — referência: IBM Carbon Copy Guidelines, GitHub Primer Content.
          </p>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--rockat-border)" }}>
            <div
              className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
              style={{
                gridTemplateColumns: "1.4fr 1fr 1fr",
                background: "var(--rockat-primary-50)",
                color: "var(--rockat-text-muted)",
                borderBottom: "1px solid var(--rockat-border)",
              }}
            >
              <span>Regra</span>
              <span style={{ color: "var(--rockat-success-text)" }}>✓ Correto</span>
              <span style={{ color: "var(--rockat-danger-text)" }}>✗ Evitar</span>
            </div>
            {contentRules.map((item, i) => (
              <div
                key={i}
                className="grid px-5 py-3 gap-4 items-start"
                style={{
                  gridTemplateColumns: "1.4fr 1fr 1fr",
                  borderBottom: i < contentRules.length - 1 ? "1px solid var(--rockat-border)" : undefined,
                  background: "var(--rockat-bg-elevated)",
                }}
              >
                <span className="text-xs" style={{ color: "var(--rockat-text)" }}>
                  {item.rule}
                </span>
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

        {/* ── Usage Guidelines ───────────────────────────────────────────── */}
        <div className="mb-10">
          <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
            Usage Guidelines
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Boas práticas baseadas em IBM Carbon, GitHub Primer, Atlassian DS e MD3.
          </p>
          <div className="space-y-3">
            {usageRules.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{
                  background: "var(--rockat-bg-elevated)",
                  border: "1px solid var(--rockat-border)",
                }}
              >
                <span
                  className="mt-0.5 flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
                  style={{
                    background:
                      item.type === "do"      ? "var(--rockat-success-bg)" :
                      item.type === "dont"    ? "var(--rockat-danger-bg)"  :
                                               "var(--rockat-warning-bg)",
                    color:
                      item.type === "do"      ? "var(--rockat-success-text)" :
                      item.type === "dont"    ? "var(--rockat-danger-text)"  :
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

        {/* ── Accessibility ──────────────────────────────────────────────── */}
        <div className="mb-10">
          <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
            Accessibility
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Requisitos mínimos de acessibilidade — referência: MD3 Accessibility, Atlassian DS.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {([
              {
                title: "Ativação por teclado",
                description: "Todos os botões respondem a Enter e Space. Nunca remova o outline de foco (focus ring) sem substituição visual.",
              },
              {
                title: "Botões icon-only exigem aria-label",
                description: 'Use aria-label descritivo: aria-label="Adicionar item" — não apenas "Adicionar". O ícone não é suficiente para leitores de tela.',
              },
              {
                title: "Disabled vs loading",
                description: "disabled remove o botão do tab order e não comunica motivo. Para ações em andamento use loading. Para condicionais, adicione tooltip com o motivo.",
              },
              {
                title: "Ações destrutivas com confirmação",
                description: 'Botões danger devem ter aria-describedby apontando para o texto de confirmação. Não execute delete no primeiro clique.',
              },
            ] as {title: string; description: string}[]).map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl"
                style={{ background: "var(--rockat-bg-elevated)", border: "1px solid var(--rockat-border)" }}
              >
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
                  {item.title}
                </p>
                <p className="text-xs" style={{ color: "var(--rockat-text-muted)" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
