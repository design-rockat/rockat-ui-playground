"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, Space } from "antd";
import { useState } from "react";
import { Trash2, LogOut, CheckCircle } from "lucide-react";

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
              <Trash2 size={18} style={{ color: "#ff4d4f" }} />
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
    </>
  );
}
