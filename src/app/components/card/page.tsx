"use client";

import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Space } from "antd";
import { Star, MoreHorizontal, Heart } from "lucide-react";

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
            style={{ background: "var(--rockat-primary-100)", color: "var(--rockat-primary-700)" }}
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
              <p style={{ color: "var(--rockat-text-muted)" }}>Com background preenchido em primary-50.</p>
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
                    style={{ background: "var(--rockat-primary-600)" }}
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
      </div>
    </>
  );
}
