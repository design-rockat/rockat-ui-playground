"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Space } from "antd";
import { Download, Plus, Trash2, Edit, ArrowRight } from "lucide-react";

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
            style={{ background: "var(--rockat-primary-100)", color: "var(--rockat-primary-700)" }}>
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
            <Button type="primary" icon={<Plus size={16} />} shape="circle" />
            <Button type="default" icon={<Edit size={16} />} shape="circle" />
            <Button type="dashed" icon={<Download size={16} />} shape="circle" />
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
      </div>
    </>
  );
}
