"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { App } from "antd";
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

// ---------------------------------------------------------------------------
// Message vs Notification guide — ref: Atlassian DS, IBM Carbon, MD3 Snackbar
// ---------------------------------------------------------------------------

const comparisonGuide: {
  aspect: string;
  message: string;
  notification: string;
}[] = [
  { aspect: "Posição",    message: "Topo centralizado",                   notification: "Canto superior direito" },
  { aspect: "Duração",    message: "2–3s (auto-dismiss)",                  notification: "4–6s (pode ser persistente)" },
  { aspect: "Conteúdo",   message: "1 linha de texto curto",               notification: "Título + descrição" },
  { aspect: "Quando usar", message: "Feedback imediato de ações simples",   notification: "Eventos de sistema, not. assíncronas" },
  { aspect: "Exemplos",    message: "Copiado, Salvo, Excluído",             notification: "Upload concluído, nova mensagem" },
];

// ---------------------------------------------------------------------------
// Content guidelines — ref: IBM Carbon, GitHub Primer Content
// ---------------------------------------------------------------------------

const contentRules: {
  type: string;
  rule: string;
  good: string;
  bad: string;
}[] = [
  {
    type: "success",
    rule: "Confirme o que foi feito — verbo no passado",
    good: "Arquivo salvo com sucesso",
    bad: "Sucesso!",
  },
  {
    type: "error",
    rule: "Específico e acionável — diga o que fazer",
    good: "Falha ao salvar: sem conexão. Tente novamente.",
    bad: "Erro!",
  },
  {
    type: "warning",
    rule: "Explique a consequência ou condição",
    good: "Você tem 5 tentativas restantes",
    bad: "Atenção",
  },
  {
    type: "info",
    rule: "Orientação útil e contextual — não trivial",
    good: "Novos recursos disponíveis na versão 2.0",
    bad: "Informação",
  },
];

// ---------------------------------------------------------------------------
// Usage guidelines — ref: IBM Carbon, Atlassian DS, MD3, WCAG
// ---------------------------------------------------------------------------

const usageRules: {
  type: "do" | "dont" | "caution";
  rule: string;
  detail: string;
}[] = [
  {
    type: "do",
    rule: "Use message para feedback imediato de ações do usuário",
    detail:
      "Salvar, deletar, copiar, exportar — essas ações geram feedback instantâneo com message. O auto-dismiss (3s) é adequado para ações que o usuário iniciou intencionalmente. Referência: MD3 Snackbar, IBM Carbon.",
  },
  {
    type: "do",
    rule: "Use notification para eventos assíncronos ou fora do contexto atual",
    detail:
      "Upload concluído em background, nova mensagem recebida, alerta de sistema — use notification com título e descrição. O usuário pode ter navegado para outra tela. Referência: Atlassian DS.",
  },
  {
    type: "dont",
    rule: "Não empilhe mais de 3 toasts simultâneos",
    detail:
      "Múltiplos toasts ao mesmo tempo criam ruído visual e sobrecarga cognitiva. Se há múltiplos eventos, agrupe em uma notificação única ou use um feed de atividades. Referência: IBM Carbon.",
  },
  {
    type: "dont",
    rule: "Não use toast como único feedback para erros críticos",
    detail:
      "Erros que bloqueiam o fluxo (falha de autenticação, dados inválidos) devem ter Alert inline ou Banner, além do toast opcional. Toast auto-dismiss desaparece antes que o usuário possa agir. Referência: IBM Carbon, GitHub Primer.",
  },
  {
    type: "caution",
    rule: "Toasts não devem ser o único canal de feedback para acessibilidade",
    detail:
      "Mensagens temporárias podem ser perdidas por usuários de leitores de tela. Complemente com aria-live regions ou mensagens inline persistentes para erros. Referência: WCAG 2.1 SC 4.1.3.",
  },
];

function ToastDemoInner() {
  const { message, notification } = App.useApp();

  const showMessage = (type: "success" | "error" | "warning" | "info") => {
    const msgs = {
      success: "Operação realizada com sucesso!",
      error: "Ocorreu um erro. Tente novamente.",
      warning: "Atenção: verifique os dados antes de continuar.",
      info: "Dica: você pode customizar este comportamento.",
    };
    message[type](msgs[type]);
  };

  const showNotification = (type: "success" | "error" | "warning" | "info") => {
    const config = {
      success: { message: "Sucesso!", description: "Sua alteração foi salva com êxito.", icon: <CheckCircle size={20} style={{ color: "var(--rockat-success-text)" }} /> },
      error: { message: "Erro!", description: "Não foi possível completar a operação.", icon: <AlertCircle size={20} style={{ color: "var(--rockat-danger-text)" }} /> },
      warning: { message: "Atenção", description: "Esta ação pode ter consequências irreversíveis.", icon: <AlertTriangle size={20} style={{ color: "var(--rockat-warning-text)" }} /> },
      info: { message: "Informação", description: "Novos recursos estão disponíveis para você.", icon: <Info size={20} style={{ color: "var(--rockat-accent-text)" }} /> },
    };
    notification[type](config[type]);
  };

  return (
    <>
      <Header title="Toast / Message" subtitle="Feedback temporário ao usuário" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-base mb-10" style={{ color: "var(--rockat-text-muted)" }}>
          Use os componentes de feedback do Ant Design (<code className="font-mono text-sm px-1.5 py-0.5 rounded"
            style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}>message</code> e{" "}
          <code className="font-mono text-sm px-1.5 py-0.5 rounded"
            style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}>notification</code>)
          através do <code className="font-mono text-sm">App.useApp()</code>.
        </p>

        <div className="mb-10">
          <h2 className="text-base font-semibold mb-4" style={{ color: "var(--rockat-text)" }}>
            Message (toast simples)
          </h2>
          <div
            className="p-6 rounded-2xl flex flex-wrap gap-3"
            style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}
          >
            <Button type="primary" icon={<CheckCircle size={16} />} onClick={() => showMessage("success")}>
              Success
            </Button>
            <Button type="default" danger icon={<AlertCircle size={16} />} onClick={() => showMessage("error")}>
              Error
            </Button>
            <Button type="default" icon={<AlertTriangle size={16} />} onClick={() => showMessage("warning")}>
              Warning
            </Button>
            <Button type="dashed" icon={<Info size={16} />} onClick={() => showMessage("info")}>
              Info
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold mb-4" style={{ color: "var(--rockat-text)" }}>
            Notification (toast com descrição)
          </h2>
          <div
            className="p-6 rounded-2xl flex flex-wrap gap-3"
            style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}
          >
            <Button type="primary" icon={<CheckCircle size={16} />} onClick={() => showNotification("success")}>
              Success
            </Button>
            <Button type="default" danger icon={<AlertCircle size={16} />} onClick={() => showNotification("error")}>
              Error
            </Button>
            <Button type="default" icon={<AlertTriangle size={16} />} onClick={() => showNotification("warning")}>
              Warning
            </Button>
            <Button type="dashed" icon={<Info size={16} />} onClick={() => showNotification("info")}>
              Info
            </Button>
          </div>
        </div>
      </div>

      {/* ── Message vs Notification ────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 mb-10">
        <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
          Message vs Notification
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
          Quando usar cada um — referência: Atlassian DS, IBM Carbon, MD3 Snackbar.
        </p>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--rockat-border)" }}>
          <div
            className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
            style={{
              gridTemplateColumns: "100px 1fr 1fr",
              background: "var(--rockat-bg-subtle)",
              color: "var(--rockat-text-muted)",
              borderBottom: "1px solid var(--rockat-border)",
            }}
          >
            <span>Aspecto</span>
            <span style={{ color: "var(--rockat-accent-text)" }}>message</span>
            <span style={{ color: "var(--rockat-accent-text)" }}>notification</span>
          </div>
          {comparisonGuide.map((item, i) => (
            <div
              key={item.aspect}
              className="grid px-5 py-3 gap-4 items-start"
              style={{
                gridTemplateColumns: "100px 1fr 1fr",
                borderBottom: i < comparisonGuide.length - 1 ? "1px solid var(--rockat-border)" : undefined,
                background: i % 2 === 0 ? "var(--rockat-bg-subtle)" : "var(--rockat-bg-elevated)",
              }}
            >
              <span className="text-xs font-medium" style={{ color: "var(--rockat-text)" }}>{item.aspect}</span>
              <span className="text-xs" style={{ color: "var(--rockat-text-muted)" }}>{item.message}</span>
              <span className="text-xs" style={{ color: "var(--rockat-text-muted)" }}>{item.notification}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Content Guidelines ────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 mb-10">
        <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
          Content Guidelines
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
          Como escrever mensagens por tipo — referência: IBM Carbon Copy Guidelines, GitHub Primer Content.
        </p>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--rockat-border)" }}>
          <div
            className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
            style={{
              gridTemplateColumns: "70px 1.2fr 1fr 1fr",
              background: "var(--rockat-bg-subtle)",
              color: "var(--rockat-text-muted)",
              borderBottom: "1px solid var(--rockat-border)",
            }}
          >
            <span>Tipo</span>
            <span>Regra</span>
            <span style={{ color: "var(--rockat-success-text)" }}>✓ Correto</span>
            <span style={{ color: "var(--rockat-danger-text)" }}>✗ Evitar</span>
          </div>
          {contentRules.map((item, i) => (
            <div
              key={i}
              className="grid px-5 py-3 gap-4 items-start"
              style={{
                gridTemplateColumns: "70px 1.2fr 1fr 1fr",
                borderBottom: i < contentRules.length - 1 ? "1px solid var(--rockat-border)" : undefined,
                background: i % 2 === 0 ? "var(--rockat-bg-subtle)" : "var(--rockat-bg-elevated)",
              }}
            >
              <code
                className="text-[11px] font-mono px-1.5 py-0.5 rounded self-start"
                style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}
              >
                {item.type}
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

      {/* ── Usage Guidelines ─────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 mb-10">
        <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
          Usage Guidelines
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
          Boas práticas baseadas em IBM Carbon, Atlassian DS, MD3 e WCAG.
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

    </>
  );
}

export default function ToastPage() {
  return (
    <App>
      <ToastDemoInner />
    </App>
  );
}
