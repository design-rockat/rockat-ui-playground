"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Space, Select, Switch, Slider } from "antd";
import { useState } from "react";
import { Download, Plus, Edit, Trash2, Search, Star, Heart } from "lucide-react";

type ButtonType = "primary" | "default" | "dashed" | "text" | "link";
type ButtonSize = "small" | "middle" | "large";

export default function PlaygroundPage() {
  const [btnType, setBtnType] = useState<ButtonType>("primary");
  const [btnSize, setBtnSize] = useState<ButtonSize>("middle");
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnDanger, setBtnDanger] = useState(false);
  const [btnBlock, setBtnBlock] = useState(false);
  const [btnLabel, setBtnLabel] = useState("Click me");

  const [inputSize, setInputSize] = useState<"small" | "middle" | "large">("middle");
  const [inputLabel, setInputLabel] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState("Digite algo...");
  const [inputDisabled, setInputDisabled] = useState(false);
  const [inputError, setInputError] = useState("");

  return (
    <>
      <Header title="Playground" subtitle="Teste componentes ao vivo" />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-base mb-10" style={{ color: "var(--rockat-text-muted)" }}>
          Configure os componentes usando os controles ao lado e visualize as mudanças em tempo real.
        </p>

        {/* Button Playground */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-5" style={{ color: "var(--rockat-text)" }}>
            Button
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Preview */}
            <div
              className="rounded-2xl p-8 flex items-center justify-center"
              style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)", minHeight: 160 }}
            >
              <Button
                type={btnType}
                antSize={btnSize}
                loading={btnLoading}
                disabled={btnDisabled}
                danger={btnDanger}
                block={btnBlock}
              >
                {btnLabel}
              </Button>
            </div>

            {/* Controls */}
            <div
              className="rounded-2xl p-5 space-y-4"
              style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-subtle)" }}
            >
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--rockat-text-muted)" }}>Type</label>
                <Select
                  value={btnType}
                  onChange={setBtnType}
                  style={{ width: "100%" }}
                  options={["primary", "default", "dashed", "text", "link"].map((v) => ({ value: v, label: v }))}
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--rockat-text-muted)" }}>Size</label>
                <Select
                  value={btnSize}
                  onChange={setBtnSize}
                  style={{ width: "100%" }}
                  options={["small", "middle", "large"].map((v) => ({ value: v, label: v }))}
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--rockat-text-muted)" }}>Label</label>
                <Input
                  value={btnLabel}
                  onChange={(e) => setBtnLabel(e.target.value)}
                  placeholder="Button label"
                />
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: "var(--rockat-text)" }}>
                  <Switch checked={btnLoading} onChange={setBtnLoading} size="small" /> Loading
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: "var(--rockat-text)" }}>
                  <Switch checked={btnDisabled} onChange={setBtnDisabled} size="small" /> Disabled
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: "var(--rockat-text)" }}>
                  <Switch checked={btnDanger} onChange={setBtnDanger} size="small" /> Danger
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: "var(--rockat-text)" }}>
                  <Switch checked={btnBlock} onChange={setBtnBlock} size="small" /> Block
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Input Playground */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-5" style={{ color: "var(--rockat-text)" }}>
            Input
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Preview */}
            <div
              className="rounded-2xl p-8 flex items-center"
              style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)", minHeight: 160 }}
            >
              <div className="w-full max-w-xs">
                <Input
                  label={inputLabel || undefined}
                  placeholder={inputPlaceholder}
                  size={inputSize}
                  disabled={inputDisabled}
                  error={inputError || undefined}
                />
              </div>
            </div>

            {/* Controls */}
            <div
              className="rounded-2xl p-5 space-y-4"
              style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-subtle)" }}
            >
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--rockat-text-muted)" }}>Size</label>
                <Select
                  value={inputSize}
                  onChange={setInputSize}
                  style={{ width: "100%" }}
                  options={["small", "middle", "large"].map((v) => ({ value: v, label: v }))}
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--rockat-text-muted)" }}>Label</label>
                <Input value={inputLabel} onChange={(e) => setInputLabel(e.target.value)} placeholder="Label text" />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--rockat-text-muted)" }}>Placeholder</label>
                <Input value={inputPlaceholder} onChange={(e) => setInputPlaceholder(e.target.value)} placeholder="Placeholder text" />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--rockat-text-muted)" }}>Error message</label>
                <Input value={inputError} onChange={(e) => setInputError(e.target.value)} placeholder="Error message" />
              </div>
              <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: "var(--rockat-text)" }}>
                <Switch checked={inputDisabled} onChange={setInputDisabled} size="small" /> Disabled
              </label>
            </div>
          </div>
        </div>

        {/* Quick Gallery */}
        <div>
          <h2 className="text-lg font-semibold mb-5" style={{ color: "var(--rockat-text)" }}>
            Component Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card title="Buttons" variant="outlined">
              <Space wrap>
                <Button type="primary" icon={<Plus size={16} />}>New</Button>
                <Button type="default" icon={<Edit size={16} />}>Edit</Button>
                <Button type="default" danger icon={<Trash2 size={16} />}>Delete</Button>
                <Button type="dashed" icon={<Download size={16} />}>Export</Button>
              </Space>
            </Card>
            <Card title="Search" variant="outlined">
              <Input
                prefix={<Search size={14} />}
                placeholder="Search for anything..."
              />
            </Card>
            <Card title="Rating" variant="outlined">
              <Space>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={20}
                    style={{ color: n <= 4 ? "#facc15" : "#d4d4d4", fill: n <= 4 ? "#facc15" : "none" }}
                  />
                ))}
              </Space>
              <p className="text-sm mt-2" style={{ color: "var(--rockat-text-muted)" }}>4.0 / 5.0</p>
            </Card>
            <Card title="Actions" variant="outlined">
              <Space>
                <Button type="primary">Confirm</Button>
                <Button type="default">Cancel</Button>
                <Button type="text" icon={<Heart size={16} />} danger />
              </Space>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
