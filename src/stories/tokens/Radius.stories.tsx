import React, { useState, useCallback } from 'react';
import type { Meta } from '@storybook/react';
import { Copy, Check } from 'lucide-react';

// ── Data (ported from src/app/radius/page.tsx) ───────────────────────────────

const radiusItems = [
  { key: 'none', value: '0px',    tailwind: 'rounded-none', role: 'Sem arredondamento',        components: 'Dividers, imagens fullbleed, tabelas'    },
  { key: 'sm',   value: '4px',    tailwind: 'rounded-sm',   role: 'Arredondamento sutil',       components: 'Badges, tags inline, chips compactos'    },
  { key: 'md',   value: '8px',    tailwind: 'rounded-lg',   role: 'Arredondamento padrão leve', components: 'Tooltips, dropdowns, menus'              },
  { key: 'lg',   value: '12px',   tailwind: 'rounded-xl',   role: 'Padrão do sistema ★',        components: 'Buttons, inputs, cards, modais'          },
  { key: 'xl',   value: '16px',   tailwind: 'rounded-2xl',  role: 'Arredondamento expressivo',  components: 'Cards grandes, banners, painéis'         },
  { key: '2xl',  value: '24px',   tailwind: 'rounded-3xl',  role: 'Arredondamento acentuado',   components: 'Hero cards, sheets, drawers'             },
  { key: 'full', value: '9999px', tailwind: 'rounded-full', role: 'Pílula / Circular',          components: 'Avatars, pills, FABs, toggles'          },
];

const usageRules = [
  { type: 'do'      as const, rule: 'Use radius.lg (12px) como padrão para todos os componentes interativos', detail: 'Buttons, inputs, cards e modais usam 12px. Configurado globalmente via ConfigProvider.' },
  { type: 'do'      as const, rule: 'Use radius.full apenas para elementos circulares ou pill',               detail: 'Avatars, badges de status, pills de filtro e FABs.' },
  { type: 'dont'    as const, rule: 'Não misture mais de 2 valores de radius em um mesmo layout',             detail: 'Escolha um valor dominante e um desvio no máximo.' },
  { type: 'do'      as const, rule: 'Reduza o radius em componentes muito pequenos',                         detail: 'Use radius.sm (4px) ou radius.md (8px) para elementos abaixo de 32px.' },
  { type: 'dont'    as const, rule: 'Não use radius.none em componentes flutuantes',                         detail: 'Cantos retos em elementos sobrepostos parecem erros visuais.' },
  { type: 'caution' as const, rule: 'Em mobile, prefira radius maior para alvos de toque',                   detail: 'Raios maiores melhoram a percepção de toque em telas pequenas.' },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function RadiusRow({ item }: { item: typeof radiusItems[0] }) {
  const [copied, setCopied] = useState(false);
  const isDefault = item.key === 'lg';
  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(item.tailwind); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  }, [item.tailwind]);

  return (
    <div className="group grid items-center gap-4 px-5 py-3"
      style={{ gridTemplateColumns: '48px 52px 116px 1fr 1.8fr', borderBottom: '1px solid var(--rockat-border)', background: 'var(--rockat-bg-elevated)' }}>
      <div style={{ width: 40, height: 40, borderRadius: item.value, background: 'var(--rockat-accent-bg)', border: '2px solid var(--rockat-accent-border)', flexShrink: 0 }} />
      <code className="text-[11px] font-mono" style={{ color: 'var(--rockat-text-muted)' }}>{item.value}</code>
      <button className="flex items-center gap-1.5 text-left" onClick={handleCopy}>
        <code className="text-[11px] font-mono" style={{ color: 'var(--rockat-accent-text)' }}>{item.tailwind}</code>
        {isDefault && <span className="text-[9px] font-bold px-1 py-0.5 rounded uppercase" style={{ background: 'var(--rockat-success-bg)', color: 'var(--rockat-success-text)' }}>default</span>}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          {copied ? <Check size={10} style={{ color: 'var(--rockat-success-text)' }} /> : <Copy size={10} style={{ color: 'var(--rockat-text-muted)' }} />}
        </span>
      </button>
      <span className="text-xs" style={{ color: 'var(--rockat-text)' }}>{item.role}</span>
      <span className="text-xs" style={{ color: 'var(--rockat-text-muted)' }}>{item.components}</span>
    </div>
  );
}

// ── Page component ────────────────────────────────────────────────────────────

function RadiusPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--rockat-text)' }}>Radius</h1>
        <p className="text-base" style={{ color: 'var(--rockat-text-muted)' }}>Escala de border-radius e regras de uso</p>
      </div>

      {/* Scale table */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Radius Scale</h2>
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--rockat-border)' }}>
          <div className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
            style={{ gridTemplateColumns: '48px 52px 116px 1fr 1.8fr', background: 'var(--rockat-primary-50)', color: 'var(--rockat-text-muted)', borderBottom: '1px solid var(--rockat-border)' }}>
            <span>Preview</span><span>Value</span><span>Tailwind</span><span>Role</span><span>Componentes</span>
          </div>
          {radiusItems.map((item) => <RadiusRow key={item.key} item={item} />)}
        </div>
      </section>

      {/* Visual comparison */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Visual Comparison</h2>
        <div className="flex flex-wrap items-end gap-5 p-6 rounded-2xl" style={{ background: 'var(--rockat-bg-subtle)', border: '1px solid var(--rockat-border)' }}>
          {radiusItems.map((item) => (
            <div key={item.key} className="flex flex-col items-center gap-2">
              <div style={{ width: 56, height: 56, borderRadius: item.value, background: 'var(--rockat-accent-bg)', border: '2px solid var(--rockat-accent-border)' }} />
              <div className="text-center">
                <p className="text-[11px] font-semibold" style={{ color: 'var(--rockat-text)' }}>{item.key}</p>
                <code className="text-[10px] font-mono" style={{ color: 'var(--rockat-text-muted)' }}>{item.value}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage guidelines */}
      <section>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Usage Guidelines</h2>
        <div className="space-y-3">
          {usageRules.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: 'var(--rockat-bg-elevated)', border: '1px solid var(--rockat-border)' }}>
              <span className="mt-0.5 flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
                style={{
                  background: item.type === 'do' ? 'var(--rockat-success-bg)' : item.type === 'dont' ? 'var(--rockat-danger-bg)' : 'var(--rockat-warning-bg)',
                  color:      item.type === 'do' ? 'var(--rockat-success-text)' : item.type === 'dont' ? 'var(--rockat-danger-text)' : 'var(--rockat-warning-text)',
                }}>
                {item.type === 'do' ? 'Do' : item.type === 'dont' ? "Don't" : 'Atenção'}
              </span>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--rockat-text)' }}>{item.rule}</p>
                <p className="text-xs" style={{ color: 'var(--rockat-text-muted)' }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design System/Radius',
  component: RadiusPage,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;

export const Default = {};
