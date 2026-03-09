"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { App } from "antd";
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

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
      success: { message: "Sucesso!", description: "Sua alteração foi salva com êxito.", icon: <CheckCircle size={20} style={{ color: "#52c41a" }} /> },
      error: { message: "Erro!", description: "Não foi possível completar a operação.", icon: <AlertCircle size={20} style={{ color: "#ff4d4f" }} /> },
      warning: { message: "Atenção", description: "Esta ação pode ter consequências irreversíveis.", icon: <AlertTriangle size={20} style={{ color: "#faad14" }} /> },
      info: { message: "Informação", description: "Novos recursos estão disponíveis para você.", icon: <Info size={20} style={{ color: "#1677ff" }} /> },
    };
    notification[type](config[type]);
  };

  return (
    <>
      <Header title="Toast / Message" subtitle="Feedback temporário ao usuário" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-base mb-10" style={{ color: "var(--rockat-text-muted)" }}>
          Use os componentes de feedback do Ant Design (<code className="font-mono text-sm px-1.5 py-0.5 rounded"
            style={{ background: "var(--rockat-primary-100)", color: "var(--rockat-primary-700)" }}>message</code> e{" "}
          <code className="font-mono text-sm px-1.5 py-0.5 rounded"
            style={{ background: "var(--rockat-primary-100)", color: "var(--rockat-primary-700)" }}>notification</code>)
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
