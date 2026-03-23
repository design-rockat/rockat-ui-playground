import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Space } from 'antd';
import { Search, Mail, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label visível acima do campo',
    },
    hint: {
      control: 'text',
      description: 'Texto auxiliar abaixo do campo (oculto quando há erro)',
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro — ativa status de erro no campo',
    },
    placeholder: {
      control: 'text',
      description: 'Texto de placeholder',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
      description: 'Tamanho do campo',
    },
  },
  args: {
    placeholder: 'Digite algo...',
    label: '',
    hint: '',
    error: '',
    disabled: false,
    size: 'middle',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Nome completo',
    placeholder: 'Ex: João da Silva',
    hint: 'Use seu nome como aparece no documento.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    error: 'Informe um e-mail válido (ex: nome@dominio.com)',
  },
};

export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Input prefix={<Search size={14} />} placeholder="Pesquisar..." />
      <Input prefix={<Mail size={14} />} placeholder="seu@email.com" type="email" label="Email" hint="Nunca compartilharemos seu email." />
      <Input prefix={<Lock size={14} />} placeholder="Mínimo 8 caracteres" type="password" label="Senha" />
    </Space>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Input size="small" placeholder="Small" label="Small" />
      <Input size="middle" placeholder="Middle (default)" label="Middle" />
      <Input size="large" placeholder="Large" label="Large" />
    </Space>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Input label="Ativo" placeholder="Campo ativo" />
      <Input label="Com erro" placeholder="Campo com erro" error="Este campo é obrigatório." />
      <Input placeholder="Desabilitado" disabled />
    </Space>
  ),
};
