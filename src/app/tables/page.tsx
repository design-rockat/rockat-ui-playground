"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Table, Column } from "@/components/ui/table";

type Row = { name: string; role: string; status: string; updated: string };

const columns: Column<Row>[] = [
  { key: "name", title: "Name" },
  { key: "role", title: "Role" },
  {
    key: "status",
    title: "Status",
    render: (r) => (
      <span style={{
        color: r.status === "Active" ? "var(--rockat-success-text)" : "var(--rockat-warning-text)",
        background: r.status === "Active" ? "var(--rockat-success-bg)" : "var(--rockat-warning-bg)",
        borderRadius: 6,
        display: "inline-block",
        padding: "2px 8px",
      }}>{r.status}</span>
    ),
  },
  { key: "updated", title: "Updated" },
];

const data: Row[] = [
  { name: "Ana Silva", role: "Designer", status: "Active", updated: "2 days ago" },
  { name: "Bruno Costa", role: "Engineer", status: "Pending", updated: "1 week ago" },
];

const stripedData: Row[] = [
  { name: "Camila Rocha", role: "PM", status: "Active", updated: "Yesterday" },
  { name: "Daniel", role: "QA", status: "Inactive", updated: "3 days ago" },
  { name: "Eduardo", role: "Support", status: "Active", updated: "Today" },
];

export default function TablesPage() {
  return (
    <>
      <Header title="Tables" subtitle="Componentes de tabela — padrões básicos" />
      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="mb-8">
          <p className="text-base mb-2" style={{ color: "var(--rockat-text-muted)" }}>
            Página com exemplos e recomendações para tabelas. Use como ponto de partida e converta para componentes reutilizáveis.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--rockat-text)" }}>Examples</h2>
          <div className="space-y-6">
            <Table columns={columns} data={data} />
            <Table columns={columns} data={stripedData} striped />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--rockat-text)" }}>Guidelines</h2>
          <ul className="text-sm" style={{ color: "var(--rockat-text-muted)", marginLeft: 12 }}>
            <li>Use semantic tokens para cores de texto e fundo.</li>
            <li>Evite cores fortes como fundo de linhas; prefira `--rockat-bg-elevated` e `--rockat-border`.</li>
            <li>Forneça estados claros (hover, selected, focus) e garanta contraste.</li>
            <li>Mobile: torne a tabela rolável horizontalmente e mantenha headers fixos se necessário.</li>
          </ul>
        </section>

      </div>
    </>
  );
}
