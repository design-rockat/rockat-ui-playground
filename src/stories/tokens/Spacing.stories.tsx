import React, { useState, useCallback } from 'react';
import type { Meta } from '@storybook/react';
import { Copy, Check } from 'lucide-react';

// ── Data (ported from src/app/spacing/page.tsx) ──────────────────────────────

const spacingItems = [
  { key: '0',  value: '0px',  px: 0,  tailwind: 'p-0',  tier: 'micro'     as const, role: 'Reset, bordas coladas'               },
  { key: '1',  value: '4px',  px: 4,  tailwind: 'p-1',  tier: 'micro'     as const, role: 'Badges, ícones, separadores'          },
  { key: '2',  value: '8px',  px: 8,  tailwind: 'p-2',  tier: 'micro'     as const, role: 'Botões compactos, tags, chips'         },
  { key: '3',  value: '12px', px: 12, tailwind: 'p-3',  tier: 'micro'     as const, role: 'Inputs pequenos, itens de lista'       },
  { key: '4',  value: '16px', px: 16, tailwind: 'p-4',  tier: 'component' as const, role: 'Padding padrão de componente'          },
  { key: '5',  value: '20px', px: 20, tailwind: 'p-5',  tier: 'component' as const, role: 'Cards, popovers, dropdowns'            },
  { key: '6',  value: '24px', px: 24, tailwind: 'p-6',  tier: 'component' as const, role: 'Seções de formulário, modais'          },
  { key: '8',  value: '32px', px: 32, tailwind: 'p-8',  tier: 'component' as const, role: 'Cards grandes, painéis'                },
  { key: '10', value: '40px', px: 40, tailwind: 'p-10', tier: 'layout'    as const, role: 'Espaçamento entre seções'              },
  { key: '12', value: '48px', px: 48, tailwind: 'p-12', tier: 'layout'    as const, role: 'Padding de página, container'          },
  { key: '16', value: '64px', px: 64, tailwind: 'p-16', tier: 'layout'    as const, role: 'Separação de blocos de conteúdo'       },
  { key: '20', value: '80px', px: 80, tailwind: 'p-20', tier: 'layout'    as const, role: 'Hero sections, header height'          },
  { key: '24', value: '96px', px: 96, tailwind: 'p-24', tier: 'layout'    as const, role: 'Seções de landing, grandes gaps'       },
];

const tierConfig = {
  micro:     { label: 'Micro',     bg: 'var(--rockat-success-bg)',  text: 'var(--rockat-success-text)' },
  component: { label: 'Component', bg: 'var(--rockat-accent-bg)',   text: 'var(--rockat-accent-text)'  },
  layout:    { label: 'Layout',    bg: 'var(--rockat-warning-bg)',  text: 'var(--rockat-warning-text)' },
};

const usageRules = [
  { type: 'do'      as const, rule: 'Use sempre múltiplos de 4px — nunca valores arbitrários',         detail: 'A escala 4px garante alinhamento no grid e consistência visual.' },
  { type: 'do'      as const, rule: 'Use tier micro (0–12px) para espaçamento interno de componentes', detail: 'Padding de badges, chips, ícones e botões compactos.' },
  { type: 'do'      as const, rule: 'Use tier component (16–32px) como padding padrão',                detail: 'Cards, modais, inputs e painéis usam entre 16px e 32px.' },
  { type: 'do'      as const, rule: 'Use tier layout (40–96px) apenas para estrutura de página',       detail: 'Separação entre seções, padding de container e hero areas.' },
  { type: 'dont'    as const, rule: 'Nunca use margin para espaçamento — prefira gap',                 detail: 'gap em flex/grid é mais previsível e evita margin collapse.' },
  { type: 'dont'    as const, rule: 'Não use espaçamento assimétrico sem intenção declarada',          detail: 'py-4 px-7 é arbitrário e inconsistente. Justifique desvios.' },
  { type: 'caution' as const, rule: 'Em mobile, reduza um nível de tier para espaçamentos de layout', detail: 'O que é p-12 em desktop pode ser p-6 em mobile.' },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function SpacingRow({ item }: { item: typeof spacingItems[0] }) {
  const [copied, setCopied] = useState(false);
  const tier = tierConfig[item.tier];
  const MAX_PX = 96;
  const barWidth = item.px === 0 ? 2 : Math.round((item.px / MAX_PX) * 100);
  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(item.tailwind); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  }, [item.tailwind]);

  return (
    <div className="group grid items-center gap-4 px-5 py-3"
      style={{ gridTemplateColumns: '36px 52px 64px 80px 1fr 1.8fr', borderBottom: '1px solid var(--rockat-border)', background: 'var(--rockat-bg-elevated)' }}>
      <code className="text-[11px] font-mono" style={{ color: 'var(--rockat-text-muted)' }}>{item.key}</code>
      <code className="text-[11px] font-mono" style={{ color: 'var(--rockat-text-muted)' }}>{item.value}</code>
      <button className="flex items-center gap-1 text-left" onClick={handleCopy}>
        <code className="text-[11px] font-mono" style={{ color: 'var(--rockat-accent-text)' }}>{item.tailwind}</code>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          {copied ? <Check size={10} style={{ color: 'var(--rockat-success-text)' }} /> : <Copy size={10} style={{ color: 'var(--rockat-text-muted)' }} />}
        </span>
      </button>
      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide w-fit" style={{ background: tier.bg, color: tier.text }}>{tier.label}</span>
      <div style={{ height: '16px', display: 'flex', alignItems: 'center' }}>
        <div className="rounded" style={{ width: `${barWidth}%`, height: '12px', minWidth: '2px', background: 'var(--rockat-accent-text)', opacity: 0.6 }} />
      </div>
      <span className="text-xs" style={{ color: 'var(--rockat-text-muted)' }}>{item.role}</span>
    </div>
  );
}

// ── Page component ────────────────────────────────────────────────────────────

function SpacingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--rockat-text)' }}>Spacing</h1>
        <p className="text-base" style={{ color: 'var(--rockat-text-muted)' }}>Escala de espaçamento e regras de uso</p>
      </div>

      {/* Tier intro */}
      <div className="mb-12">
        <p className="text-base mb-5" style={{ color: 'var(--rockat-text-muted)' }}>
          A escala segue múltiplos de <strong style={{ color: 'var(--rockat-text)' }}>4px</strong> — base adotada por IBM Carbon, Material Design 3 e GitHub Primer.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {(['micro', 'component', 'layout'] as const).map((tier) => (
            <div key={tier} className="p-4 rounded-xl" style={{ background: 'var(--rockat-bg-subtle)', border: '1px solid var(--rockat-border)' }}>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide" style={{ background: tierConfig[tier].bg, color: tierConfig[tier].text }}>{tierConfig[tier].label}</span>
              <p className="text-sm mt-2" style={{ color: 'var(--rockat-text-muted)' }}>
                {tier === 'micro'     && '0–12px · Detalhes internos de componentes pequenos'}
                {tier === 'component' && '16–32px · Padding padrão de componentes de UI'}
                {tier === 'layout'    && '40–96px · Estrutura de página e separação de seções'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scale table */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Spacing Scale</h2>
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--rockat-border)' }}>
          <div className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
            style={{ gridTemplateColumns: '36px 52px 64px 80px 1fr 1.8fr', background: 'var(--rockat-primary-50)', color: 'var(--rockat-text-muted)', borderBottom: '1px solid var(--rockat-border)' }}>
            <span>Key</span><span>Value</span><span>Tailwind</span><span>Tier</span><span>Visual</span><span>Role</span>
          </div>
          {spacingItems.map((item) => <SpacingRow key={item.key} item={item} />)}
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
  title: 'Design System/Spacing',
  component: SpacingPage,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;

export const Default = {};
