import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Space } from 'antd';
import { Plus, Download, Trash2, Edit, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'default', 'dashed', 'text', 'link'],
      description: 'Variante visual do botão',
      table: { defaultValue: { summary: 'primary' } },
    },
    antSize: {
      control: 'select',
      options: ['small', 'middle', 'large'],
      description: 'Tamanho do botão',
      table: { defaultValue: { summary: 'middle' } },
    },
    danger: {
      control: 'boolean',
      description: 'Estado destrutivo — vermelho',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
    block: {
      control: 'boolean',
      description: 'Ocupa 100% da largura do container',
    },
    children: {
      control: 'text',
      description: 'Texto do botão',
    },
  },
  args: {
    children: 'Button',
    type: 'primary',
    antSize: 'middle',
    danger: false,
    loading: false,
    disabled: false,
    block: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── Interactive (controls) ───────────────────────────────────────────────────

export const Default: Story = {};

// ── Named stories ────────────────────────────────────────────────────────────

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space wrap>
      <Button type="primary">Primary</Button>
      <Button type="default">Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
      <Button type="link">Link</Button>
    </Space>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space wrap align="center">
      <Button type="primary" antSize="small">Small</Button>
      <Button type="primary" antSize="middle">Middle</Button>
      <Button type="primary" antSize="large">Large</Button>
    </Space>
  ),
};

export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space wrap>
      <Button type="primary" icon={<Plus size={16} />}>New Item</Button>
      <Button type="default" icon={<Download size={16} />}>Download</Button>
      <Button type="dashed" icon={<Edit size={16} />}>Edit</Button>
      <Button type="default" danger icon={<Trash2 size={16} />}>Delete</Button>
    </Space>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space wrap>
      <Button type="primary">Active</Button>
      <Button type="primary" loading>Loading</Button>
      <Button type="primary" disabled>Disabled</Button>
      <Button type="default" danger>Danger</Button>
    </Space>
  ),
};

export const IconOnly: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space>
      <Button type="primary" icon={<Plus size={16} />} aria-label="Adicionar" />
      <Button type="default" icon={<Edit size={16} />} aria-label="Editar" />
      <Button type="dashed" icon={<Download size={16} />} aria-label="Download" />
    </Space>
  ),
};

export const Block: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button type="primary" block icon={<ArrowRight size={16} />}>Continue</Button>
        <Button type="default" block>Cancel</Button>
      </Space>
    </div>
  ),
};

export const Hierarchy: Story = {
  name: 'Hierarchy: Primary / Secondary / Tertiary',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid gap-3">
      {[
        { title: 'Primary', note: 'Máximo 1 por view', children: <Space wrap><Button type="primary">Salvar alterações</Button><Button type="primary" icon={<Plus size={16} />}>Criar projeto</Button></Space> },
        { title: 'Secondary (Outline)', note: 'Ações alternativas ao primary', children: <Space wrap><Button type="default">Cancelar</Button><Button type="default" icon={<Edit size={16} />}>Editar</Button><Button type="dashed">Adicionar opcional</Button></Space> },
        { title: 'Tertiary', note: 'Ações de menor prioridade', children: <Space wrap><Button type="text">Ver detalhes</Button><Button type="link">Abrir documentação</Button></Space> },
      ].map((item) => (
        <div key={item.title} className="p-5 rounded-xl" style={{ border: '1px solid var(--rockat-border)', background: 'var(--rockat-bg-elevated)' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--rockat-text)' }}>{item.title}</p>
          <p className="text-xs mb-4" style={{ color: 'var(--rockat-accent-text)' }}>{item.note}</p>
          {item.children}
        </div>
      ))}
    </div>
  ),
};
