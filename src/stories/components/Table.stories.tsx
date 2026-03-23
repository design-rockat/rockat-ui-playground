import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '@/components/ui/table';
import type { Column } from '@/components/ui/table';

// ── Mock data ─────────────────────────────────────────────────────────────────

type User = { id: number; name: string; email: string; role: string; status: 'Active' | 'Inactive' };

const mockUsers: User[] = [
  { id: 1, name: 'Ana Silva',    email: 'ana@rockat.io',    role: 'Designer',   status: 'Active'   },
  { id: 2, name: 'Bruno Costa',  email: 'bruno@rockat.io',  role: 'Engineer',   status: 'Active'   },
  { id: 3, name: 'Carla Mendes', email: 'carla@rockat.io',  role: 'PM',         status: 'Inactive' },
  { id: 4, name: 'Diego Rocha',  email: 'diego@rockat.io',  role: 'Engineer',   status: 'Active'   },
  { id: 5, name: 'Elena Ferreira', email: 'elena@rockat.io', role: 'Designer',  status: 'Active'   },
];

const columns: Column<User>[] = [
  { key: 'name',   title: 'Nome'    },
  { key: 'email',  title: 'Email'   },
  { key: 'role',   title: 'Função'  },
  {
    key: 'status',
    title: 'Status',
    render: (row) => (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full"
        style={{
          background: row.status === 'Active' ? 'var(--rockat-success-bg)' : 'var(--rockat-neutral-bg)',
          color:      row.status === 'Active' ? 'var(--rockat-success-text)' : 'var(--rockat-neutral-text)',
        }}>
        {row.status}
      </span>
    ),
  },
];

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    striped: {
      control: 'boolean',
      description: 'Linhas alternadas com fundo sutil',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento com skeleton rows',
    },
    emptyText: {
      control: 'text',
      description: 'Texto exibido quando não há dados',
    },
  },
  args: {
    columns,
    data: mockUsers,
    striped: false,
    loading: false,
    emptyText: 'Nenhum dado encontrado.',
  },
};

export default meta;
type Story = StoryObj<typeof Table<User>>;

export const Default: Story = {};

export const Striped: Story = {
  args: { striped: true },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Empty: Story = {
  args: { data: [] },
};

export const Clickable: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Table
      columns={columns}
      data={mockUsers}
      onRowClick={(row) => alert(`Clicked: ${row.name}`)}
    />
  ),
};
