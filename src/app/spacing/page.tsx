import { Header } from "@/components/layout/Header";
import { spacing } from "@/design-system/tokens/spacing";

const spacingItems = Object.entries(spacing).map(([key, value]) => ({
  key,
  value,
  px: parseInt(value),
}));

export default function SpacingPage() {
  return (
    <>
      <Header title="Spacing" subtitle="Escala de espaçamento do Rock-at UI" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-base mb-10" style={{ color: "var(--rockat-text-muted)" }}>
          O sistema de espaçamento segue uma escala baseada em múltiplos de{" "}
          <strong style={{ color: "var(--rockat-text)" }}>4px</strong>.
          Use as variáveis como referência para paddings, margins e gaps.
        </p>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--rockat-border)" }}
        >
          {spacingItems.map((item, i) => (
            <div
              key={item.key}
              className="flex items-center gap-4 px-5 py-4"
              style={{
                borderBottom:
                  i < spacingItems.length - 1 ? "1px solid var(--rockat-border)" : "none",
                background: "var(--rockat-bg-elevated)",
              }}
            >
              <div className="w-8 text-right flex-shrink-0">
                <code
                  className="text-xs font-mono"
                  style={{ color: "var(--rockat-text-muted)" }}
                >
                  {item.key}
                </code>
              </div>
              <div className="w-16 flex-shrink-0">
                <code
                  className="text-xs font-mono"
                  style={{ color: "var(--rockat-primary-600)" }}
                >
                  {item.value}
                </code>
              </div>
              <div className="flex-1 flex items-center">
                <div
                  className="rounded"
                  style={{
                    width: `${item.px}px`,
                    height: "24px",
                    background: "var(--rockat-primary-400)",
                    minWidth: item.px === 0 ? "2px" : undefined,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
