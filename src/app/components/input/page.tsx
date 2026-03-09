"use client";

import { Header } from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Space } from "antd";
import { Search, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

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

export default function InputPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Header title="Input" subtitle="Campos de entrada de texto" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-base mb-10" style={{ color: "var(--rockat-text-muted)" }}>
          O componente{" "}
          <code
            className="font-mono text-sm px-1.5 py-0.5 rounded"
            style={{ background: "var(--rockat-primary-100)", color: "var(--rockat-primary-700)" }}
          >
            Input
          </code>{" "}
          encapsula o Ant Design Input com suporte a label, hint e erro.
        </p>

        <Section title="Default">
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Input placeholder="Digite algo..." style={{ maxWidth: 320 }} />
            <Input
              label="Nome completo"
              placeholder="Ex: João da Silva"
              style={{ maxWidth: 320 }}
            />
          </Space>
        </Section>

        <Section title="With Icons">
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Input
              prefix={<Search size={14} />}
              placeholder="Pesquisar..."
              style={{ maxWidth: 320 }}
            />
            <Input
              prefix={<Mail size={14} />}
              placeholder="seu@email.com"
              type="email"
              style={{ maxWidth: 320 }}
            />
          </Space>
        </Section>

        <Section title="With Label and Hint">
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Input
              label="Email"
              placeholder="seu@email.com"
              hint="Nunca compartilharemos seu email."
              prefix={<Mail size={14} />}
              style={{ maxWidth: 320 }}
            />
            <Input
              label="Senha"
              placeholder="Mínimo 8 caracteres"
              type={showPassword ? "text" : "password"}
              prefix={<Lock size={14} />}
              suffix={
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              }
              style={{ maxWidth: 320 }}
            />
          </Space>
        </Section>

        <Section title="States">
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Input
              label="Campo com erro"
              placeholder="Digite algo..."
              error="Este campo é obrigatório."
              style={{ maxWidth: 320 }}
            />
            <Input
              placeholder="Desabilitado"
              disabled
              style={{ maxWidth: 320 }}
            />
          </Space>
        </Section>

        <Section title="Sizes">
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Input size="small" placeholder="Small" style={{ maxWidth: 320 }} />
            <Input size="middle" placeholder="Middle (default)" style={{ maxWidth: 320 }} />
            <Input size="large" placeholder="Large" style={{ maxWidth: 320 }} />
          </Space>
        </Section>
      </div>
    </>
  );
}
