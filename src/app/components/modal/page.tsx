"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, Space } from "antd";
import { useState } from "react";
import { Trash2, LogOut, CheckCircle } from "lucide-react";

// ---------------------------------------------------------------------------
// Modal Types Guide — ref: Atlassian Dialog, IBM Carbon Modal, MD3 Dialog
// ---------------------------------------------------------------------------

const typesGuide: {
  type: string;
  whenToUse: string;
  size: string;
  note?: string;
}[] = [
  {
    type: "Basic",
    whenToUse: "Informação adicional ou contexto que não cabe na página",
    size: "sm / md",
  },
  {
    type: "Confirmation",
    whenToUse: "Ações destrutivas ou irreversíveis que exigem confirmação explícita",
    size: "sm",
    note: "Sempre use danger no CTA",
  },
  {
    type: "Form Modal",
    whenToUse: "Criação ou edição rápida com poucos campos (máx 4–5)",
    size: "md / lg",
    note: "Formulários longos → use page ou Drawer",
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
    rule: "Verbo + objeto — descreve exatamente a ação",
    good: "Excluir arquivo",
    bad: "Atenção! / Aviso",
  },
  {
    element: "Body",
    rule: "Consequência e contexto — o que acontece se o usuário confirmar",
    good: "Esta ação é permanente e não pode ser desfeita.",
    bad: "Você tem certeza?",
  },
  {
    element: "CTA primário",
    rule: "Espelha o título — verbo específico da ação",
    good: "Excluir (danger)",
    bad: "Sim / OK / Confirmar",
  },
  {
    element: "CTA cancel",
    rule: "Sempre \"Cancelar\" — nunca ambiguous",
    good: "Cancelar",
    bad: "Não / Fechar / Voltar",
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
    rule: "Use modal apenas para interrupções intencionais e necessárias",
    detail:
      "Modal interrompe o fluxo do usuário. Use apenas quando a ação exige atenção imediata (confirmação, edição rápida). Para informações não críticas, use Toast ou Banner. Referência: MD3, IBM Carbon.",
  },
  {
    type: "do",
    rule: "O CTA primário deve sempre espelhar o título do modal",
    detail:
      'Se o título é "Excluir arquivo", o botão deve ser "Excluir" (não "OK" ou "Sim"). Isso reduz ambiguíade e deixa claro o que acontecerá. Referência: Atlassian DS, GitHub Primer.',
  },
  {
    type: "dont",
    rule: "Não empilhe modais — um modal não deve abrir outro",
    detail:
      "Modais sobre modais criam profundidade de navegação confusa e difícil de reverter. Se precisar de mais etapas, use Steps dentro do modal ou divida em páginas separadas. Referência: IBM Carbon.",
  },
  {
    type: "dont",
    rule: "Não use modal para mensagens informativas sem ação",
    detail:
      "Se o usuário só precisa ler e fechar, use Toast, Alert inline ou Drawer. Modal obriga o usuário a parar tudo — reserve para decisões reais. Referência: Atlassian DS.",
  },
  {
    type: "caution",
    rule: "Formulários longos em modal prejudicam a experiência",
    detail:
      "No máximo 4–5 campos por Form Modal. Para formulários maiores, use Drawer ou uma página dedicada. Em mobile, Drawer (bottom sheet) é preferível ao modal. Referência: MD3, Atlassian DS.",
  },
];

export default function ModalPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <Header title="Modal" subtitle="Diálogos e confirmações" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-base mb-10" style={{ color: "var(--rockat-text-muted)" }}>
          Modais são usados para ações que requerem atenção imediata do usuário, como
          confirmações ou formulários rápidos.
        </p>

        <div className="mb-10">
          <h2 className="text-base font-semibold mb-4" style={{ color: "var(--rockat-text)" }}>
            Basic Modal
          </h2>
          <div className="p-6 rounded-2xl" style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}>
            <Button type="primary" onClick={() => setBasicOpen(true)}>
              Open Modal
            </Button>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-base font-semibold mb-4" style={{ color: "var(--rockat-text)" }}>
            Confirmation Modal
          </h2>
          <div className="p-6 rounded-2xl flex gap-3" style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}>
            <Button type="default" danger icon={<Trash2 size={16} />} onClick={() => setConfirmOpen(true)}>
              Delete Item
            </Button>
            <Button type="default" icon={<LogOut size={16} />}>
              Logout (exemplo)
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-4" style={{ color: "var(--rockat-text)" }}>
            Form Modal
          </h2>
          <div className="p-6 rounded-2xl" style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}>
            <Button type="primary" onClick={() => setFormOpen(true)}>
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Basic Modal */}
        <Modal
          title="Rock-at UI Modal"
          open={basicOpen}
          onCancel={() => setBasicOpen(false)}
          footer={
            <Space>
              <Button type="default" onClick={() => setBasicOpen(false)}>Cancelar</Button>
              <Button type="primary" onClick={() => setBasicOpen(false)}>Confirmar</Button>
            </Space>
          }
        >
          <p style={{ color: "var(--rockat-text-muted)" }}>
            Este é um modal básico com o tema Rock-at aplicado. O border-radius e as cores
            seguem os tokens do Design System.
          </p>
        </Modal>

        {/* Confirm Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <Trash2 size={18} style={{ color: "var(--rockat-danger-text)" }} />
              <span>Confirmar exclusão</span>
            </div>
          }
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          footer={
            <Space>
              <Button type="default" onClick={() => setConfirmOpen(false)}>Cancelar</Button>
              <Button type="default" danger onClick={() => setConfirmOpen(false)}>
                Sim, excluir
              </Button>
            </Space>
          }
        >
          <p style={{ color: "var(--rockat-text-muted)" }}>
            Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.
          </p>
        </Modal>

        {/* Form Modal */}
        <Modal
          title="Editar Perfil"
          open={formOpen}
          onCancel={() => setFormOpen(false)}
          footer={
            <Space>
              <Button type="default" onClick={() => setFormOpen(false)}>Cancelar</Button>
              <Button type="primary" icon={<CheckCircle size={16} />} onClick={() => setFormOpen(false)}>
                Salvar
              </Button>
            </Space>
          }
        >
          <div className="space-y-4 py-2">
            <Input label="Nome" placeholder="Seu nome completo" defaultValue="João da Silva" />
            <Input label="Email" type="email" placeholder="email@exemplo.com" defaultValue="joao@rockat.com.br" />
          </div>
        </Modal>
      </div>

        {/* ── Types Guide ──────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-6 mb-10">
          <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
            Modal Types Guide
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Qual tipo de modal usar em cada situação — referência: Atlassian Dialog, IBM Carbon Modal, MD3 Dialog.
          </p>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--rockat-border)" }}>
            <div
              className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
              style={{
                gridTemplateColumns: "110px 1fr 80px 1fr",
                background: "var(--rockat-bg-subtle)",
                color: "var(--rockat-text-muted)",
                borderBottom: "1px solid var(--rockat-border)",
              }}
            >
              <span>Tipo</span>
              <span>Quando usar</span>
              <span>Tamanho</span>
              <span>Atenção</span>
            </div>
            {typesGuide.map((item, i) => (
              <div
                key={item.type}
                className="grid px-5 py-3 gap-4 items-start"
                style={{
                  gridTemplateColumns: "110px 1fr 80px 1fr",
                  borderBottom: i < typesGuide.length - 1 ? "1px solid var(--rockat-border)" : undefined,
                  background: i % 2 === 0 ? "var(--rockat-bg-subtle)" : "var(--rockat-bg-elevated)",
                }}
              >
                <code
                  className="text-[11px] font-mono px-1.5 py-0.5 rounded self-start"
                  style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}
                >
                  {item.type}
                </code>
                <span className="text-xs" style={{ color: "var(--rockat-text)" }}>{item.whenToUse}</span>
                <code className="text-[11px] font-mono" style={{ color: "var(--rockat-text-muted)" }}>{item.size}</code>
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

        {/* ── Content Guidelines ──────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-6 mb-10">
          <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
            Content Guidelines
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Como escrever título, corpo e CTAs de modais — referência: IBM Carbon, GitHub Primer, Atlassian DS.
          </p>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--rockat-border)" }}>
            <div
              className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
              style={{
                gridTemplateColumns: "100px 1.2fr 1fr 1fr",
                background: "var(--rockat-bg-subtle)",
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
                  gridTemplateColumns: "100px 1.2fr 1fr 1fr",
                  borderBottom: i < contentRules.length - 1 ? "1px solid var(--rockat-border)" : undefined,
                  background: i % 2 === 0 ? "var(--rockat-bg-subtle)" : "var(--rockat-bg-elevated)",
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

        {/* ── Usage Guidelines ────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-6 mb-10">
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

        {/* ── Accessibility ──────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-6 mb-10">
          <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
            Accessibility
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Requisitos mínimos — referência: WCAG 2.1, Atlassian DS, MD3.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {([
              {
                title: "Focus trap automático",
                description: "O Ant Design Modal já implementa focus trap: o foco fica preso dentro do modal enquanto aberto. Não remova esse comportamento.",
              },
              {
                title: "ESC fecha o modal via onCancel",
                description: "Certifique-se de que onCancel está sempre implementado. Não use maskClosable={false} sem motivo claro — isso impede o fechamento por clique fora.",
              },
              {
                title: "role=\"dialog\" e aria-modal=\"true\"",
                description: "O Ant Design adiciona automaticamente role=dialog e aria-modal=true. Não sobrescreva esses atributos.",
              },
              {
                title: "Botão de fechar com aria-label",
                description: 'O ícone × do Ant Design Modal já tem aria-label="Close". Para botões customizados no footer, adicione aria-label descritivo.',
              },
            ] as { title: string; description: string }[]).map((item, i) => (
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

    </>
  );
}
