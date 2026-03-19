import { Header } from "@/components/layout/Header";
import { ArrowRight, Palette, Layers, Zap, Package } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Palette size={20} />,
    title: "Design Tokens",
    description: "Cores, tipografia, espaçamento e raio de borda centralizados e reutilizáveis.",
    href: "/colors",
  },
  {
    icon: <Layers size={20} />,
    title: "Componentes",
    description: "Componentes baseados no Ant Design, encapsulados com tokens do DS.",
    href: "/components/button",
  },
  {
    icon: <Zap size={20} />,
    title: "Playground",
    description: "Teste componentes ao vivo e visualize variações em tempo real.",
    href: "/playground",
  },
  {
    icon: <Package size={20} />,
    title: "Pronto para NPM",
    description: "Estrutura preparada para publicação do pacote rockat-ui no NPM.",
    href: "/",
  },
];

const stack = ["Next.js 15", "TypeScript", "Tailwind CSS", "Ant Design", "CVA"];

export default function DesignSystemPage() {
  return (
    <>
      <Header title="Introduction" subtitle="Rock-at UI Design System" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ background: "var(--rockat-primary-100)", color: "var(--rockat-primary-700)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--rockat-primary-500)" }} />
            v0.1.0 — Em desenvolvimento
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--rockat-text)" }}>
            Rock-at UI
          </h1>
          <p className="text-xl leading-relaxed mb-8 max-w-2xl" style={{ color: "var(--rockat-text-muted)" }}>
            Sistema de Design da Rock-at — tokens, componentes e playground para criar
            interfaces consistentes, acessíveis e modernas.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/components/button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all"
              style={{ background: "var(--rockat-primary-700)" }}
            >
              Ver Componentes <ArrowRight size={16} />
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ border: "1px solid var(--rockat-border)", color: "var(--rockat-text)", background: "var(--rockat-bg)" }}
            >
              Abrir Playground
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {features.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="p-6 rounded-2xl transition-all hover:shadow-md"
              style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--rockat-primary-100)", color: "var(--rockat-primary-700)" }}
              >
                {f.icon}
              </div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--rockat-text)" }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--rockat-text-muted)" }}>
                {f.description}
              </p>
            </Link>
          ))}
        </div>

        <div>
          <h2
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--rockat-text-muted)" }}
          >
            Stack do Projeto
          </h2>
          <div className="flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{ border: "1px solid var(--rockat-border)", color: "var(--rockat-text)", background: "var(--rockat-bg-elevated)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
