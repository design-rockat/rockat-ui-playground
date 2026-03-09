import { Header } from "@/components/layout/Header";
import { typography } from "@/design-system/tokens/typography";

const typeScaleItems = Object.entries(typography.fontSize).map(([key, size]) => ({
  key,
  size,
  label: `text-${key}`,
}));

const weightItems = Object.entries(typography.fontWeight).map(([key, weight]) => ({
  key,
  weight,
  label: key,
}));

export default function TypographyPage() {
  return (
    <>
      <Header title="Typography" subtitle="Escala tipográfica do Rock-at UI" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-base mb-10" style={{ color: "var(--rockat-text-muted)" }}>
          A tipografia usa{" "}
          <strong style={{ color: "var(--rockat-text)" }}>Geist</strong> como fonte principal,
          complementada por{" "}
          <strong style={{ color: "var(--rockat-text)" }}>Geist Mono</strong> para código.
        </p>

        {/* Font Families */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-5" style={{ color: "var(--rockat-text)" }}>
            Font Families
          </h2>
          <div className="space-y-3">
            {Object.entries(typography.fontFamily).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}
              >
                <div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--rockat-text-muted)" }}
                  >
                    fontFamily.{key}
                  </span>
                  <p
                    className="text-base mt-1"
                    style={{
                      fontFamily: value,
                      color: "var(--rockat-text)",
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
                <code
                  className="text-xs font-mono px-2 py-1 rounded ml-4 flex-shrink-0"
                  style={{ background: "var(--rockat-primary-100)", color: "var(--rockat-primary-700)" }}
                >
                  {value.split(",")[0]}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Type Scale */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-5" style={{ color: "var(--rockat-text)" }}>
            Type Scale
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--rockat-border)" }}
          >
            {typeScaleItems.map((item, i) => (
              <div
                key={item.key}
                className="flex items-baseline gap-4 px-5 py-4"
                style={{
                  borderBottom:
                    i < typeScaleItems.length - 1
                      ? "1px solid var(--rockat-border)"
                      : "none",
                  background: "var(--rockat-bg-elevated)",
                }}
              >
                <div className="w-12 flex-shrink-0">
                  <code
                    className="text-xs font-mono"
                    style={{ color: "var(--rockat-text-muted)" }}
                  >
                    {item.size}
                  </code>
                </div>
                <p
                  className="flex-1"
                  style={{ fontSize: item.size, color: "var(--rockat-text)", lineHeight: 1.3 }}
                >
                  Rock-at UI
                </p>
                <code
                  className="text-xs font-mono flex-shrink-0"
                  style={{ color: "var(--rockat-text-muted)" }}
                >
                  {item.label}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Font Weights */}
        <div>
          <h2 className="text-lg font-semibold mb-5" style={{ color: "var(--rockat-text)" }}>
            Font Weights
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {weightItems.map((item) => (
              <div
                key={item.key}
                className="p-4 rounded-xl"
                style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}
              >
                <p
                  className="text-xl mb-2"
                  style={{ fontWeight: item.weight, color: "var(--rockat-text)" }}
                >
                  Ag
                </p>
                <p className="text-xs" style={{ color: "var(--rockat-text-muted)" }}>
                  {item.label}
                </p>
                <code className="text-xs font-mono" style={{ color: "var(--rockat-primary-600)" }}>
                  {item.weight}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
