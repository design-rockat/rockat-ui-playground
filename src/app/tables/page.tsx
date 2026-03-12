"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Table, Column } from "@/components/ui/table";

type Row = { name: string; role: string; status: string; updated: string };

type StatusType = "Active" | "Pending" | "Inactive";

const statusConfig: Record<StatusType, { bg: string; text: string }> = {
  Active:   { bg: "var(--rockat-success-bg)",  text: "var(--rockat-success-text)" },
  Pending:  { bg: "var(--rockat-warning-bg)",  text: "var(--rockat-warning-text)" },
  Inactive: { bg: "var(--rockat-neutral-bg)",  text: "var(--rockat-neutral-text)" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status as StatusType] ?? statusConfig.Inactive;
  return (
    <span
      style={{
        color: cfg.text,
        background: cfg.bg,
        borderRadius: 6,
        display: "inline-block",
        padding: "2px 8px",
        fontSize: 12,
        fontWeight: 500,
      }}
    >
      {status}
    </span>
  );
}

const columns: Column<Row>[] = [
  { key: "name", title: "Name" },
  { key: "role", title: "Role" },
  {
    key: "status",
    title: "Status",
    render: (r) => <StatusBadge status={r.status} />,
  },
  { key: "updated", title: "Updated" },
];

const defaultData: Row[] = [
  { name: "Ana Silva",    role: "Designer",  status: "Active",   updated: "2 days ago" },
  { name: "Bruno Costa", role: "Engineer",  status: "Pending",  updated: "1 week ago" },
  { name: "Carla Mendes",role: "PM",        status: "Inactive", updated: "2 weeks ago" },
];

const stripedData: Row[] = [
  { name: "Camila Rocha", role: "PM",      status: "Active",   updated: "Yesterday" },
  { name: "Daniel",       role: "QA",      status: "Inactive", updated: "3 days ago" },
  { name: "Eduardo",      role: "Support", status: "Active",   updated: "Today" },
];

export default function TablesPage() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header title="Tables" subtitle="Componentes de tabela — padrões básicos" />
      <div className="max-w-4xl mx-auto px-6 py-12">

        <p className="text-base mb-10" style={{ color: "var(--rockat-text-muted)" }}>
          Exemplos e recomendações para tabelas. Use como ponto de partida e converta para componentes reutilizáveis.
        </p>

        {/* Default */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--rockat-text)" }}>Default</h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Tabela simples com header, linhas e status badges semânticos.
          </p>
          <Table columns={columns} data={defaultData} />
        </section>

        {/* Striped */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--rockat-text)" }}>Striped</h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Fundo alternado nas linhas melhora a leitura em tabelas densas.
          </p>
          <Table columns={columns} data={stripedData} striped />
        </section>

        {/* Clickable rows */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--rockat-text)" }}>Clickable Rows</h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Use <code className="px-1 py-0.5 rounded text-xs" style={{ background: "var(--rockat-bg-subtle)", color: "var(--rockat-accent-text)" }}>onRowClick</code> para tornar linhas interativas.
          </p>
          <Table
            columns={columns}
            data={defaultData}
            onRowClick={(row) => alert(`Clicou em: ${row.name}`)}
          />
        </section>

        {/* Loading */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--rockat-text)" }}>Loading State</h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Skeleton automático enquanto os dados carregam. Use a prop <code className="px-1 py-0.5 rounded text-xs" style={{ background: "var(--rockat-bg-subtle)", color: "var(--rockat-accent-text)" }}>loading</code>.
          </p>
          <div className="mb-3">
            <button
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 2000);
              }}
              className="text-sm px-4 py-2 rounded-xl font-medium transition-all"
              style={{
                background: "var(--rockat-primary-700)",
                color: "#fff",
              }}
            >
              Simular carregamento
            </button>
          </div>
          <Table columns={columns} data={loading ? [] : defaultData} loading={loading} />
        </section>

        {/* Empty State */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--rockat-text)" }}>Empty State</h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Quando não há dados, exibe uma mensagem via <code className="px-1 py-0.5 rounded text-xs" style={{ background: "var(--rockat-bg-subtle)", color: "var(--rockat-accent-text)" }}>emptyText</code>.
          </p>
          <Table columns={columns} data={[]} emptyText="Nenhum usuário encontrado." />
        </section>

        {/* Status Badges */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--rockat-text)" }}>Status Badges</h2>
          <div className="flex flex-wrap gap-3">
            <StatusBadge status="Active" />
            <StatusBadge status="Pending" />
            <StatusBadge status="Inactive" />
          </div>
        </section>

        {/* Guidelines */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--rockat-text)" }}>Guidelines</h2>
          <div
            className="rounded-2xl p-6 space-y-3 text-sm"
            style={{ background: "var(--rockat-bg-subtle)", border: "1px solid var(--rockat-border)" }}
          >
            {[
              { rule: "Use tokens semânticos", detail: "Prefira --rockat-success-*, --rockat-warning-*, --rockat-neutral-* para status." },
              { rule: "Evite cores fortes no fundo de linhas", detail: "Use --rockat-bg-subtle para striped e --rockat-accent-bg para hover." },
              { rule: "Forneça estados claros", detail: "Hover, selected e focus devem ter contraste suficiente (WCAG AA)." },
              { rule: "Mobile-first", detail: "Torne a tabela rolável horizontalmente com overflow-x e mantenha headers fixos." },
              { rule: "Sempre declare emptyText", detail: "Nunca mostre uma tabela vazia sem mensagem explicativa." },
            ].map((g) => (
              <div key={g.rule} className="flex gap-3">
                <span
                  className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--rockat-primary-500)", marginTop: 6 }}
                />
                <span style={{ color: "var(--rockat-text-muted)" }}>
                  <strong style={{ color: "var(--rockat-text)" }}>{g.rule}:</strong> {g.detail}
                </span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
