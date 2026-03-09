import { Header } from "@/components/layout/Header";
import { colors } from "@/design-system/tokens/colors";

type ColorGroup = {
  name: string;
  palette: Record<string, string>;
};

const colorGroups: ColorGroup[] = [
  { name: "Primary", palette: colors.primary },
  { name: "Neutral", palette: colors.neutral },
];

function ColorCard({ name, hex }: { name: string; hex: string }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--rockat-border)" }}
    >
      <div className="h-16" style={{ background: hex }} />
      <div className="px-3 py-2.5" style={{ background: "var(--rockat-bg-elevated)" }}>
        <p className="text-xs font-semibold" style={{ color: "var(--rockat-text)" }}>
          {name}
        </p>
        <p className="text-xs font-mono mt-0.5" style={{ color: "var(--rockat-text-muted)" }}>
          {hex}
        </p>
      </div>
    </div>
  );
}

export default function ColorsPage() {
  return (
    <>
      <Header title="Colors" subtitle="Paleta de cores do Rock-at UI" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-base mb-10" style={{ color: "var(--rockat-text-muted)" }}>
          Os tokens de cor são a base do sistema de design. Use as variáveis CSS{" "}
          <code
            className="px-1.5 py-0.5 rounded text-xs font-mono"
            style={{ background: "var(--rockat-primary-100)", color: "var(--rockat-primary-700)" }}
          >
            --rockat-primary-*
          </code>{" "}
          ou as classes Tailwind{" "}
          <code
            className="px-1.5 py-0.5 rounded text-xs font-mono"
            style={{ background: "var(--rockat-primary-100)", color: "var(--rockat-primary-700)" }}
          >
            text-primary-700
          </code>
          .
        </p>

        {colorGroups.map((group) => (
          <div key={group.name} className="mb-12">
            <h2
              className="text-lg font-semibold mb-5"
              style={{ color: "var(--rockat-text)" }}
            >
              {group.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {Object.entries(group.palette).map(([scale, hex]) => (
                <ColorCard
                  key={scale}
                  name={`${group.name.toLowerCase()}-${scale}`}
                  hex={hex}
                />
              ))}
            </div>
          </div>
        ))}

        <div
          className="mt-8 p-5 rounded-2xl"
          style={{ background: "var(--rockat-primary-50)", border: "1px solid var(--rockat-primary-100)" }}
        >
          <p
            className="text-sm font-semibold mb-3"
            style={{ color: "var(--rockat-primary-700)" }}
          >
            Token principal do sistema
          </p>
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xs font-mono"
              style={{ background: "#8001ff" }}
            >
              700
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "var(--rockat-text)" }}>
                primary-700
              </p>
              <p className="font-mono text-xs" style={{ color: "var(--rockat-text-muted)" }}>
                #8001ff
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
