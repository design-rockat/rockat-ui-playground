"use client";

import React from "react";
import { Input as AntInput, InputProps as AntInputProps } from "antd";
import { cn } from "@/lib/cn";

export interface InputProps extends AntInputProps {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
}

export function Input({
  label,
  hint,
  error,
  className,
  containerClassName,
  ...props
}: InputProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      {label && (
        <label
          className="text-sm font-medium"
          style={{ color: "var(--rockat-text)" }}
        >
          {label}
        </label>
      )}
      <AntInput
        status={error ? "error" : undefined}
        className={className}
        {...props}
      />
      {error && (
        <p className="text-xs" style={{ color: "#ff4d4f" }}>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs" style={{ color: "var(--rockat-text-muted)" }}>
          {hint}
        </p>
      )}
    </div>
  );
}
