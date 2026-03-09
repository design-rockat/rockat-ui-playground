"use client";

import { Header } from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Space } from "antd";
import { Search, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Input Type Guide — ref: MD3 Text Fields, IBM Carbon, Atlassian DS
// ---------------------------------------------------------------------------

const typeGuide: {
  type: string;
  whenToUse: string;
  example: string;
  note?: string;
}[] = [
  {
    type: "text",
    whenToUse: "Entrada de texto livre de linha única",
    example: "Nome, título, endereço",
  },
  {
    type: "email",
    whenToUse: "Endereços de e-mail — habilita teclado @ em mobile e validação nativa",
    example: "seu@email.com",
  },
  {
    type: "password",
    whenToUse: "Senhas — sempre ofereça toggle de visibilidade",
    example: "Senha, confirmar senha",
    note: "Nunca use autocomplete=off",
  },
  {
    type: "search",
    whenToUse: "Campos de busca — use prefix icon + botão de limpar",
    example: "Pesquisar produtos",
  },
  {
    type: "number",
    whenToUse: "Valores numéricos — especifique min/max, evite para CEP/CPF",
    example: "Quantidade, preço",
    note: "Prefira type=text + pattern para dados formatados",
  },
  {
    type: "tel",
    whenToUse: "Números de telefone — habilita teclado numérico em mobile",
    example: "(11) 99999-9999",
  },
];

// ---------------------------------------------------------------------------
// Content guidelines — ref: IBM Carbon Copy Guidelines, GitHub Primer Content
// ---------------------------------------------------------------------------

const contentRules: {
  element: string;
  rule: string;
  good: string;
  bad: string;
}[] = [
  {
    element: "Label",
    rule: "Substantivo curto, sentence case, sempre visível",
    good: "Nome completo",
    bad: "Digite seu nome completo",
  },
  {
    element: "Placeholder",
    rule: "Mostre formato ou exemplo — nunca substitua o label",
    good: "Ex: João da Silva",
    bad: "Nome completo",
  },
  {
    element: "Hint",
    rule: "Explique restrição ou formato antes do erro",
    good: "Mínimo 8 caracteres, 1 número e 1 símbolo",
    bad: "Campo inválido",
  },
  {
    element: "Error",
    rule: "Específico e acionável — diga o que fazer para corrigir",
    good: "Informe um e-mail válido (ex: nome@dominio.com)",
    bad: "E-mail inválido",
  },
];

// ---------------------------------------------------------------------------
// Usage guidelines — ref: IBM Carbon, Atlassian DS, MD3, GitHub Primer
// ---------------------------------------------------------------------------

const usageRules: {
  type: "do" | "dont" | "caution";
  rule: string;
  detail: string;
}[] = [
  {
    type: "do",
    rule: "Sempre use label visível — nunca substitua por placeholder",
    detail:
      "O placeholder desaparece no primeiro caractere digitado e não é lido por todos os leitores de tela. Toda entrada deve ter label permanente. Referência: WCAG 2.1, IBM Carbon.",
  },
  {
    type: "do",
    rule: "Exiba o erro inline imediatamente abaixo do campo",
    detail:
      "Nunca mostre erros em bloco no topo do formulário sem indicar o campo. Mostre após blur (ao sair do campo) ou após tentativa de submissão. Referência: MD3, Atlassian DS.",
  },
  {
    type: "dont",
    rule: "Não use disabled sem explicar o motivo",
    detail:
      "Um campo desabilitado sem contexto cria confusão. Se o campo é condicional, use tooltip ou hint explicando a dependência. Referência: Atlassian DS.",
  },
  {
    type: "dont",
    rule: "Não marque campos obrigatórios e opcionais ao mesmo tempo",
    detail:
      "Escolha uma estratégia: marcar TODOS os obrigatórios com * OU marcar TODOS os opcionais com (opcional). Misturar cria ruído visual. Referência: GitHub Primer, IBM Carbon.",
  },
  {
    type: "caution",
    rule: "Largura do campo deve sugerir o comprimento esperado da entrada",
    detail:
      "Campos para CEP (8 dígitos) não devem ter a mesma largura de campos para endereço completo. A largura comunica o formato esperado. Referência: IBM Carbon.",
  },
  {
    type: "do",
    rule: "Para senhas, sempre ofereça toggle de visibilidade",
    detail:
      "Mascarar senha sem opção de revelar força erros de digitação. Never use autocomplete=off — isso piora a UX e não aumenta a segurança. Referência: NIST SP 800-63B, MD3.",
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-base font-semibold mb-4" style={{ color: "var(--rockat-text)" }}>
        {title}
      </h2>
      <div
        className="p-6 rounded-2xl"
        style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}
      >
        {children}
      </div>
    </div>
  );
}

export default function InputPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Header title="Input" subtitle="Campos de entrada de texto" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-base mb-10" style={{ color: "var(--rockat-text-muted)" }}>
          O componente{" "}
          <code
            className="font-mono text-sm px-1.5 py-0.5 rounded"
            style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}
          >
            Input
          </code>{" "}
          encapsula o Ant Design Input com suporte a label, hint e erro.
        </p>

        <Section title="Default">
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Input placeholder="Digite algo..." style={{ maxWidth: 320 }} />
            <Input
              label="Nome completo"
              placeholder="Ex: João da Silva"
              style={{ maxWidth: 320 }}
            />
          </Space>
        </Section>

        <Section title="With Icons">
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Input
              prefix={<Search size={14} />}
              placeholder="Pesquisar..."
              style={{ maxWidth: 320 }}
            />
            <Input
              prefix={<Mail size={14} />}
              placeholder="seu@email.com"
              type="email"
              style={{ maxWidth: 320 }}
            />
          </Space>
        </Section>

        <Section title="With Label and Hint">
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Input
              label="Email"
              placeholder="seu@email.com"
              hint="Nunca compartilharemos seu email."
              prefix={<Mail size={14} />}
              style={{ maxWidth: 320 }}
            />
            <Input
              label="Senha"
              placeholder="Mínimo 8 caracteres"
              type={showPassword ? "text" : "password"}
              prefix={<Lock size={14} />}
              suffix={
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              }
              style={{ maxWidth: 320 }}
            />
          </Space>
        </Section>

        <Section title="States">
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Input
              label="Campo com erro"
              placeholder="Digite algo..."
              error="Este campo é obrigatório."
              style={{ maxWidth: 320 }}
            />
            <Input
              placeholder="Desabilitado"
              disabled
              style={{ maxWidth: 320 }}
            />
          </Space>
        </Section>

        <Section title="Sizes">
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Input size="small" placeholder="Small" style={{ maxWidth: 320 }} />
            <Input size="middle" placeholder="Middle (default)" style={{ maxWidth: 320 }} />
            <Input size="large" placeholder="Large" style={{ maxWidth: 320 }} />
          </Space>
        </Section>

        {/* ── Input Type Guide ─────────────────────────────────────────── */}
        <div className="mb-10">
          <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
            Input Type Guide
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Qual tipo de input usar em cada situação — referência: MD3 Text Fields, IBM Carbon, Atlassian DS.
          </p>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--rockat-border)" }}>
            <div
              className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
              style={{
                gridTemplateColumns: "80px 1fr 1fr 1fr",
                background: "var(--rockat-bg-subtle)",
                color: "var(--rockat-text-muted)",
                borderBottom: "1px solid var(--rockat-border)",
              }}
            >
              <span>type=</span>
              <span>Quando usar</span>
              <span>Exemplo</span>
              <span>Atenção</span>
            </div>
            {typeGuide.map((item, i) => (
              <div
                key={item.type}
                className="grid px-5 py-3 gap-4 items-start"
                style={{
                  gridTemplateColumns: "80px 1fr 1fr 1fr",
                  borderBottom: i < typeGuide.length - 1 ? "1px solid var(--rockat-border)" : undefined,
                  background: i % 2 === 0 ? "var(--rockat-bg-subtle)" : "var(--rockat-bg-elevated)",
                }}
              >
                <code
                  className="text-[11px] font-mono px-1.5 py-0.5 rounded self-start"
                  style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}
                >
                  {item.type}
                </code>
                <span className="text-xs" style={{ color: "var(--rockat-text)" }}>
                  {item.whenToUse}
                </span>
                <span className="text-xs" style={{ color: "var(--rockat-text-muted)" }}>
                  {item.example}
                </span>
                <span
                  className="text-[11px]"
                  style={{ color: item.note ? "var(--rockat-warning-text)" : "var(--rockat-text-muted)" }}
                >
                  {item.note ?? "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Content Guidelines ───────────────────────────────────────── */}
        <div className="mb-10">
          <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
            Content Guidelines
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Como escrever label, placeholder, hint e mensagem de erro — referência: IBM Carbon Copy Guidelines, GitHub Primer.
          </p>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--rockat-border)" }}>
            <div
              className="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide gap-4"
              style={{
                gridTemplateColumns: "80px 1.2fr 1fr 1fr",
                background: "var(--rockat-bg-subtle)",
                color: "var(--rockat-text-muted)",
                borderBottom: "1px solid var(--rockat-border)",
              }}
            >
              <span>Elemento</span>
              <span>Regra</span>
              <span style={{ color: "var(--rockat-success-text)" }}>✓ Correto</span>
              <span style={{ color: "var(--rockat-danger-text)" }}>✗ Evitar</span>
            </div>
            {contentRules.map((item, i) => (
              <div
                key={i}
                className="grid px-5 py-3 gap-4 items-start"
                style={{
                  gridTemplateColumns: "80px 1.2fr 1fr 1fr",
                  borderBottom: i < contentRules.length - 1 ? "1px solid var(--rockat-border)" : undefined,
                  background: i % 2 === 0 ? "var(--rockat-bg-subtle)" : "var(--rockat-bg-elevated)",
                }}
              >
                <code
                  className="text-[11px] font-mono px-1.5 py-0.5 rounded self-start"
                  style={{ background: "var(--rockat-accent-bg)", color: "var(--rockat-accent-text)" }}
                >
                  {item.element}
                </code>
                <span className="text-xs" style={{ color: "var(--rockat-text)" }}>
                  {item.rule}
                </span>
                <code
                  className="text-[11px] font-mono px-1.5 py-0.5 rounded self-start"
                  style={{ background: "var(--rockat-success-bg)", color: "var(--rockat-success-text)" }}
                >
                  {item.good}
                </code>
                <code
                  className="text-[11px] font-mono px-1.5 py-0.5 rounded self-start"
                  style={{ background: "var(--rockat-danger-bg)", color: "var(--rockat-danger-text)" }}
                >
                  {item.bad}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* ── Usage Guidelines ─────────────────────────────────────────── */}
        <div className="mb-10">
          <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
            Usage Guidelines
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Boas práticas baseadas em IBM Carbon, Atlassian DS, MD3 e GitHub Primer.
          </p>
          <div className="space-y-3">
            {usageRules.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: "var(--rockat-bg-elevated)", border: "1px solid var(--rockat-border)" }}
              >
                <span
                  className="mt-0.5 flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
                  style={{
                    background:
                      item.type === "do"   ? "var(--rockat-success-bg)" :
                      item.type === "dont" ? "var(--rockat-danger-bg)"  :
                                             "var(--rockat-warning-bg)",
                    color:
                      item.type === "do"   ? "var(--rockat-success-text)" :
                      item.type === "dont" ? "var(--rockat-danger-text)"  :
                                             "var(--rockat-warning-text)",
                  }}
                >
                  {item.type === "do" ? "Do" : item.type === "dont" ? "Don't" : "Atenção"}
                </span>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--rockat-text)" }}>
                    {item.rule}
                  </p>
                  <p className="text-xs" style={{ color: "var(--rockat-text-muted)" }}>
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Accessibility ─────────────────────────────────────────────── */}
        <div className="mb-10">
          <h2 className="text-base font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
            Accessibility
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--rockat-text-muted)" }}>
            Requisitos mínimos de acessibilidade — referência: WCAG 2.1, MD3, Atlassian DS.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {([
              {
                title: "label associado via htmlFor + id",
                description:
                  "Todo input deve ter um <label> com htmlFor apontando para o id do campo. O wrapper label é alternativa válida. Placeholder não substitui label.",
              },
              {
                title: "Erros com aria-describedby",
                description:
                  "A mensagem de erro deve ter um id único referenciado no aria-describedby do input. Assim leitores de tela anunciam o erro ao focar no campo.",
              },
              {
                title: "Alvo de toque mínimo de 44×44px",
                description:
                  "Botões de ação dentro do input (ex: show/hide de senha, limpar) devem ter área clicável mínima de 44×44px para acessibilidade em dispositivos touch.",
              },
              {
                title: "Não remova estilos de foco",
                description:
                  "O outline de foco do Ant Design é o único indicador visual para usuários de teclado. Nunca use outline: none sem substituir por outro indicador de foco visível.",
              },
            ] as { title: string; description: string }[]).map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl"
                style={{ background: "var(--rockat-bg-elevated)", border: "1px solid var(--rockat-border)" }}
              >
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--rockat-text)" }}>
                  {item.title}
                </p>
                <p className="text-xs" style={{ color: "var(--rockat-text-muted)" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
