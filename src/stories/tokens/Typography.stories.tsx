import React from 'react';
import type { Meta } from '@storybook/react';
import { typography } from '@/design-system/tokens/typography';

// ── Data (ported from src/app/typography/page.tsx) ───────────────────────────

const typeScaleItems = [
  { key: 'xs',  size: '12px', weight: '400',     lineHeight: 1.5,  role: 'Caption, labels, badges',      tailwind: 'text-xs'   },
  { key: 'sm',  size: '14px', weight: '400',     lineHeight: 1.5,  role: 'Body small, helper text',      tailwind: 'text-sm'   },
  { key: 'md',  size: '16px', weight: '400',     lineHeight: 1.5,  role: 'Body default, paragraphs',     tailwind: 'text-base' },
  { key: 'lg',  size: '18px', weight: '400/600', lineHeight: 1.5,  role: 'Body large, intro text',       tailwind: 'text-lg'   },
  { key: 'xl',  size: '20px', weight: '600',     lineHeight: 1.25, role: 'Heading XS, card title',       tailwind: 'text-xl'   },
  { key: '2xl', size: '24px', weight: '600',     lineHeight: 1.25, role: 'Heading S, section title',     tailwind: 'text-2xl'  },
  { key: '3xl', size: '30px', weight: '700',     lineHeight: 1.25, role: 'Heading M, page title',        tailwind: 'text-3xl'  },
  { key: '4xl', size: '36px', weight: '700',     lineHeight: 1.1,  role: 'Heading L, hero / display',    tailwind: 'text-4xl'  },
];

const weightItems = [
  { key: 'normal',   weight: 400, usage: 'Body, descriptions, paragraphs' },
  { key: 'medium',   weight: 500, usage: 'UI labels, navigation, tabs'     },
  { key: 'semibold', weight: 600, usage: 'Headings S–M, card titles'        },
  { key: 'bold',     weight: 700, usage: 'Headings L, display, hero text'   },
];

const lineHeightItems = Object.entries(typography.lineHeight).map(([key, value]) => ({
  key, value,
  usage: key === 'tight' ? 'Headings — espaçamento compacto' : key === 'normal' ? 'Body text — padrão de leitura' : 'Textos longos — máxima legibilidade',
}));

const usageRules = [
  { type: 'do'      as const, rule: 'Use text-base (16px) como tamanho padrão de corpo',          detail: '16px é o mínimo recomendado para conforto de leitura (WCAG 1.4.4).' },
  { type: 'do'      as const, rule: 'Combine peso com tamanho — nunca use bold em body text',     detail: 'font-bold é exclusivo de headings e display. Para ênfase em corpo, use font-semibold.' },
  { type: 'dont'    as const, rule: 'Não crie hierarquia apenas com cor',                         detail: 'Usuários com daltonismo dependem de contraste estrutural (size + weight).' },
  { type: 'do'      as const, rule: 'Use Geist Mono exclusivamente para código e valores técnicos', detail: 'Tokens CSS, snippets e hashes devem usar a família mono.' },
  { type: 'dont'    as const, rule: 'Não misture mais de 2 níveis de tamanho no mesmo bloco',     detail: 'Uma seção deve ter no máximo 1 heading + 1 body size.' },
  { type: 'caution' as const, rule: 'text-xs (12px) só em contextos não-críticos',               detail: 'Use --rockat-text (não muted) em text-xs para garantir contraste.' },
];

// ── Page component ────────────────────────────────────────────────────────────

function TypographyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--rockat-text)' }}>Typography</h1>
        <p className="text-base" style={{ color: 'var(--rockat-text-muted)' }}>Escala tipográfica e regras de uso</p>
      </div>

      {/* Font Families */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Font Families</h2>
        <div className="space-y-3">
          {Object.entries(typography.fontFamily).map(([key, value]) => (
            <div key={key} className="p-5 rounded-xl" style={{ border: '1px solid var(--rockat-border)', background: 'var(--rockat-bg-elevated)' }}>
              <div className="flex items-center gap-2 mb-2">
                <code className="text-[11px] font-mono px-2 py-0.5 rounded" style={{ background: 'var(--rockat-accent-bg)', color: 'var(--rockat-accent-text)' }}>
                  fontFamily.{key}
                </code>
                <span className="text-xs" style={{ color: 'var(--rockat-text-muted)' }}>
                  {key === 'sans' ? 'Interface, headings, body' : 'Code, tokens, valores técnicos'}
                </span>
              </div>
              <p className="text-lg" style={{ fontFamily: value, color: 'var(--rockat-text)', lineHeight: 1.5 }}>
                {key === 'sans' ? 'The quick brown fox jumps over the lazy dog' : 'const primary = "#8001ff"; // var(--rockat-primary-700)'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Type Scale */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Type Scale</h2>
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--rockat-border)' }}>
          <div className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
            style={{ gridTemplateColumns: '48px 1fr 80px 60px 1.8fr', background: 'var(--rockat-bg-subtle)', color: 'var(--rockat-text-muted)', borderBottom: '1px solid var(--rockat-border)' }}>
            <span>Size</span><span>Specimen</span><span>Tailwind</span><span>Weight</span><span>Role</span>
          </div>
          {typeScaleItems.map((item, i) => (
            <div key={item.key} className="grid items-center gap-4 px-5 py-3"
              style={{ gridTemplateColumns: '48px 1fr 80px 60px 1.8fr', borderBottom: i < typeScaleItems.length - 1 ? '1px solid var(--rockat-border)' : 'none', background: 'var(--rockat-bg-elevated)' }}>
              <code className="text-[11px] font-mono" style={{ color: 'var(--rockat-text-muted)' }}>{item.size}</code>
              <p style={{ fontSize: item.size, color: 'var(--rockat-text)', lineHeight: item.lineHeight, fontWeight: item.weight.includes('/') ? 600 : Number(item.weight) }}>Rock-at UI</p>
              <code className="text-[11px] font-mono" style={{ color: 'var(--rockat-accent-text)' }}>{item.tailwind}</code>
              <code className="text-[11px] font-mono" style={{ color: 'var(--rockat-text-muted)' }}>{item.weight}</code>
              <span className="text-xs" style={{ color: 'var(--rockat-text-muted)' }}>{item.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Font Weights */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Font Weights</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {weightItems.map((item) => (
            <div key={item.key} className="p-5 rounded-xl" style={{ border: '1px solid var(--rockat-border)', background: 'var(--rockat-bg-elevated)' }}>
              <p className="text-2xl mb-3 leading-tight" style={{ fontWeight: item.weight, color: 'var(--rockat-text)' }}>The quick brown fox</p>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--rockat-text)' }}>font-{item.key}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--rockat-text-muted)' }}>{item.usage}</p>
                </div>
                <code className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: 'var(--rockat-accent-bg)', color: 'var(--rockat-accent-text)' }}>{item.weight}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Line Heights */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--rockat-text)' }}>Line Heights</h2>
        <div className="space-y-3">
          {lineHeightItems.map((item) => (
            <div key={item.key} className="p-5 rounded-xl" style={{ border: '1px solid var(--rockat-border)', background: 'var(--rockat-bg-elevated)' }}>
              <div className="flex items-start gap-6 flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className="text-base mb-3" style={{ lineHeight: item.value, color: 'var(--rockat-text)' }}>
                    O Rock-at UI é um design system orientado a produto. Cada decisão tipográfica é guiada por legibilidade e hierarquia visual clara.
                  </p>
                  <p className="text-xs" style={{ color: 'var(--rockat-text-muted)' }}>{item.usage}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <code className="text-[11px] font-mono px-2 py-0.5 rounded block mb-1" style={{ background: 'var(--rockat-accent-bg)', color: 'var(--rockat-accent-text)' }}>lineHeight.{item.key}</code>
                  <span className="text-xl font-bold" style={{ color: 'var(--rockat-text)' }}>{item.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-6">
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
  title: 'Design System/Typography',
  component: TypographyPage,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;

export const Default = {};
