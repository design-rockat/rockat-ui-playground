import { Header } from "@/components/layout/Header";
import { radius } from "@/design-system/tokens/radius";

const radiusItems = Object.entries(radius).map(([key, value]) => ({ key, value }));

export default function RadiusPage() {
  return (
    <>
      <Header title="Radius" subtitle="Escala de border-radius do Rock-at UI" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-base mb-10" style={{ color: "var(--rockat-text-muted)" }}>
          O border-radius padrão dos componentes é{" "}
          <strong style={{ color: "var(--rockat-text)" }}>12px (lg)</strong>.
          Use a escala abaixo para manter consistência visual.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {radiusItems.map((item) => (
            <div key={item.key} className="flex flex-col items-center gap-3 p-5 rounded-2xl"
              style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}
            >
              <div
                className="w-16 h-16"
                style={{
                  background: "var(--rockat-primary-200)",
                  borderRadius: item.value,
                  border: "2px solid var(--rockat-primary-400)",
                }}
              />
              <div className="text-center">
                <p className="text-sm font-semibold" style={{ color: "var(--rockat-text)" }}>
                  {item.key}
                </p>
                <code className="text-xs font-mono" style={{ color: "var(--rockat-text-muted)" }}>
                  {item.value}
                </code>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-10 p-5 rounded-2xl"
          style={{ background: "var(--rockat-primary-50)", border: "1px solid var(--rockat-primary-100)" }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--rockat-primary-700)" }}>
            Padrão do Design System
          </p>
          <p className="text-sm" style={{ color: "var(--rockat-text-muted)" }}>
            Todos os componentes usam <code className="font-mono">radius.lg = 12px</code> por padrão.
            O Ant Design ConfigProvider está configurado com <code className="font-mono">borderRadius: 12</code>.
          </p>
        </div>
      </div>
    </>
  );
}
