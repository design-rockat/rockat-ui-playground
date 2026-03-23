import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Space } from 'antd';
import { Star, MoreHorizontal, Heart, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
      description: 'Variante visual do card',
      table: { defaultValue: { summary: 'default' } },
    },
    title: {
      control: 'text',
      description: 'Título do card (header)',
    },
  },
  args: {
    variant: 'default',
    title: 'Card Title',
    children: 'Conteúdo do card. Pode conter qualquer elemento React.',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Card variant="default" title="Variant: Default">
        <p style={{ color: 'var(--rockat-text-muted)' }}>Borderless com background do tema.</p>
      </Card>
      <Card variant="outlined" title="Variant: Outlined">
        <p style={{ color: 'var(--rockat-text-muted)' }}>Com borda visível.</p>
      </Card>
      <Card variant="filled" title="Variant: Filled">
        <p style={{ color: 'var(--rockat-text-muted)' }}>Fundo colorido suave — primary-50 no light.</p>
      </Card>
    </Space>
  ),
};

export const WithExtraActions: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Card
      title="Projeto Alpha"
      extra={<Button type="text" antSize="small" icon={<MoreHorizontal size={16} />} aria-label="Mais opções" />}
    >
      <p className="text-sm mb-4" style={{ color: 'var(--rockat-text-muted)' }}>
        Descrição do projeto com detalhes relevantes para o usuário.
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star size={14} style={{ color: '#facc15', fill: '#facc15' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--rockat-text)' }}>4.8</span>
        </div>
        <Button type="primary" antSize="small">Abrir</Button>
      </div>
    </Card>
  ),
};

export const GridLayout: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid grid-cols-3 gap-3">
      {['Design', 'Engineering', 'Product'].map((team) => (
        <Card key={team} variant="outlined">
          <div className="flex items-start justify-between mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'var(--rockat-accent-text)' }}>
              {team[0]}
            </div>
            <button aria-label="Favoritar"><Heart size={16} style={{ color: 'var(--rockat-text-muted)' }} /></button>
          </div>
          <p className="font-semibold text-sm" style={{ color: 'var(--rockat-text)' }}>{team}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--rockat-text-muted)' }}>3 membros</p>
        </Card>
      ))}
    </div>
  ),
};
