import React, { useState, useCallback } from 'react';
import type { Meta } from '@storybook/react';
import { colors } from '@/design-system/tokens/colors';
import { Check, Copy } from 'lucide-react';

// ── Data ────────────────────────────────────────────────────────────────────

type ColorGroup = { name: string; palette: Record<string, string>; cssPrefix: string };

const colorGroups: ColorGroup[] = [
  { name: 'Primary',   palette: colors.primary,   cssPrefix: '--rockat-primary'   },
  { name: 'Neutral',   palette: colors.neutral,    cssPrefix: '--rockat-neutral'   },
  { name: 'Secondary', palette: colors.secondary,  cssPrefix: '--rockat-secondary' },
  { name: 'Tertiary',  palette: colors.tertiary,   cssPrefix: '--rockat-tertiary'  },
];

const semanticTokens = [
  {
    category: 'Background',
    description: 'Use para todos os fundos de UI. Adaptam-se automaticamente ao tema claro/escuro.',
    tokens: [
      { name: '--rockat-bg',           light: '#ffffff', dark: '#13111c', usage: 'Fundo principal da página'         },
      { name: '--rockat-bg-subtle',    light: '#f9f8ff', dark: '#1a1625', usage: 'Seções e áreas de destaque sutil'  },
      { name: '--rockat-bg-elevated',  light: '#ffffff', dark: '#211d2e', usage: 'Cards, dropdowns e modais'         },
      { name: '--rockat-sidebar-bg',   light: '#faf9ff', dark: '#0f0d18', usage: 'Fundo da barra lateral'            },
    ],
  },
  {
    category: 'Text',
    description: 'Dois níveis de hierarquia tipográfica. Garantem legibilidade e contraste WCAG em ambos os temas.',
    tokens: [
      { name: '--rockat-text',       light: '#171717', dark: '#f0ecff', usage: 'Texto principal, headings, labels'        },
      { name: '--rockat-text-muted', light: '#525252', dark: '#a3a3a3', usage: 'Texto secundário, descrições, metadados'  },
    ],
  },
  {
    category: 'Border',
    description: 'Bordas consistentes em todo o sistema. Nunca use valores hex fixos para bordas.',
    tokens: [
      { name: '--rockat-border',          light: '#e5e5e5', dark: '#2d2840', usage: 'Inputs, cards e separadores'     },
      { name: '--rockat-sidebar-border',  light: '#ede4ff', dark: '#2d2840', usage: 'Bordas da navegação lateral'     },
    ],
  },
];

const usageRules = [
  { type: 'do'      as const, rule: 'Use semantic tokens em componentes, nunca primitive tokens',   detail: 'Use --rockat-text para cor de texto, --rockat-bg para fundos. Semantic tokens garantem que o tema claro/escuro funcione automaticamente.' },
  { type: 'dont'    as const, rule: 'Nunca use valores hex diretamente no código de componentes',   detail: 'Valores fixos como color: #8001ff quebram o sistema de temas. Sempre referencie um token CSS var.' },
  { type: 'do'      as const, rule: 'Reserve primitive tokens para definir novos semantic tokens',  detail: 'Se precisar de um novo token, defina-o em tokens.css mapeando um primitive: --meu-token: var(--rockat-primary-200).' },
  { type: 'do'      as const, rule: 'Use primary-700 como cor de ação principal',                  detail: 'Botões primários, links, focus rings e ícones interativos usam --rockat-primary-700. Contraste ≈ 6:1 com branco (WCAG AA ✓).' },
  { type: 'do'      as const, rule: 'Use primary-50 / primary-100 para hover states',              detail: 'Backgrounds de hover em menus, badges informativos e tooltips usam os extremos claros da escala primária.' },
  { type: 'do'      as const, rule: 'Use neutral para estrutura, não para identidade visual',       detail: 'Bordas, textos secundários e fundos estruturais usam a escala neutral.' },
  { type: 'caution' as const, rule: 'Verifique contraste antes de colocar texto sobre cor',         detail: 'Texto branco sobre primary-400 ou mais claro falha WCAG AA.' },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function MiniSwatch({ color }: { color: string }) {
  return (
    <span className="inline-block w-4 h-4 rounded flex-shrink-0"
      style={{ background: color, border: '1px solid rgba(0,0,0,0.1)' }} />
  );
}

function ColorCard({ scale, hex, cssVar }: { scale: string; hex: string; cssVar: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(cssVar); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  }, [cssVar]);

  return (
    <div className="rounded-xl overflow-hidden cursor-pointer group"
      style={{ border: '1px solid var(--rockat-border)' }} onClick={handleCopy}>
      <div className="h-20 relative flex items-end justify-end p-1.5" style={{ background: hex }}>
        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition-opacity duration-150 ${copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          style={{ background: 'rgba(0,0,0,0.55)', color: '#fff' }}>
          {copied ? 'Copiado!' : <Copy size={10} />}
        </span>
      </div>
      <div className="px-2.5 py-2" style={{ background: 'var(--rockat-bg-elevated)' }}>
        <p className="text-[11px] font-semibold leading-tight" style={{ color: 'var(--rockat-text)' }}>{scale}</p>
        <p className="text-[10px] font-mono mt-0.5" style={{ color: 'var(--rockat-text-muted)' }}>{hex}</p>
        <p className="text-[10px] font-mono mt-0.5 truncate" style={{ color: 'var(--rockat-accent-text)' }}>{cssVar}</p>
      </div>
    </div>
  );
}

function TokenRow({ token }: { token: typeof semanticTokens[0]['tokens'][0] }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(token.name); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  }, [token.name]);

  return (
    <div className="group grid items-center px-4 py-3 text-xs gap-3"
      style={{ gridTemplateColumns: '1fr 1fr 1fr 1.5fr', background: 'var(--rockat-bg-elevated)', borderTop: '1px solid var(--rockat-border)' }}>
      <button className="flex items-center gap-1.5 text-left" onClick={handleCopy}>
        <code className="font-mono text-[10px] truncate" style={{ color: 'var(--rockat-accent-text)' }}>{token.name}</code>
        <span className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {copied ? <Check size={10} style={{ color: 'var(--rockat-accent-text)' }} /> : <Copy size={10} style={{ color: 'var(--rockat-text-muted)' }} />}
        </span>
      </button>
      <div className="flex items-center gap-2"><MiniSwatch color={token.light} /><span className="font-mono text-[10px]" style={{ color: 'var(--rockat-text-muted)' }}>{token.light}</span></div>
      <div className="flex items-center gap-2"><MiniSwatch color={token.dark} /><span className="font-mono text-[10px]" style={{ color: 'var(--rockat-text-muted)' }}>{token.dark}</span></div>
      <span style={{ color: 'var(--rockat-text-muted)' }}>{token.usage}</span>
    </div>
  );
}

// ── Page component (rendered by the story) ───────────────────────────────────

function ColorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--rockat-text)' }}>Colors</h1>
        <p className="text-base" style={{ color: 'var(--rockat-text-muted)' }}>Paleta de cores e tokens do sistema</p>
      </div>

      {/* Primitive Tokens */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--rockat-text)' }}>Primitive Tokens</h2>
        {colorGroups.map((group) => (
          <div key={group.name} className="mb-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--rockat-text-muted)' }}>{group.name}</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {Object.entries(group.palette).map(([scale, hex]) => (
                <ColorCard key={scale} scale={scale} hex={hex} cssVar={`${group.cssPrefix}-${scale}`} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Semantic Tokens */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--rockat-text)' }}>Semantic Tokens</h2>
        <div className="space-y-8">
          {semanticTokens.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--rockat-text)' }}>{group.category}</h3>
              <p className="text-xs mb-3" style={{ color: 'var(--rockat-text-muted)' }}>{group.description}</p>
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--rockat-border)' }}>
                <div className="grid px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-3"
                  style={{ gridTemplateColumns: '1fr 1fr 1fr 1.5fr', background: 'var(--rockat-primary-50)', color: 'var(--rockat-text-muted)' }}>
                  <span>Token</span><span>Light</span><span>Dark</span><span>Uso</span>
                </div>
                {group.tokens.map((token) => <TokenRow key={token.name} token={token} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--rockat-text)' }}>Usage Guidelines</h2>
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
  title: 'Design System/Colors',
  component: ColorsPage,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;

export const Default = {};
