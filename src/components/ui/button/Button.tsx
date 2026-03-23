"use client";

import React from "react";
import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonBaseClasses =
  "inline-flex items-center justify-center ds-button-flat ds-button-premium-transition ds-button-content-align";

const buttonVariants = cva(buttonBaseClasses, {
  variants: {
    type: {
      primary: "ds-color-button-primary",
      default: "ds-color-button-default",
      dashed: "ds-color-button-dashed",
      text: "ds-color-button-text",
      link: "ds-color-button-link",
    },
    antSize: {
      small: "ds-radius-button-sm ds-text-button-sm ds-space-button-sm",
      middle: "ds-radius-interactive ds-text-button-md ds-space-button-md",
      large: "ds-radius-interactive ds-text-button-lg ds-space-button-lg",
    },
  },
  defaultVariants: {
    type: "primary",
    antSize: "middle",
  },
});

export interface ButtonProps
  extends Omit<AntButtonProps, "type" | "size" | "variant">,
    VariantProps<typeof buttonVariants> {
  type?: AntButtonProps["type"];
  antSize?: "small" | "middle" | "large";
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export function Button({
  antSize = "middle",
  danger,
  className,
  type,
  children,
  icon,
  ...props
}: ButtonProps) {
  const antType = type ?? "primary";

  // Icon-only: no children, has icon
  const isIconOnly = !!icon && !children;

  return (
    <AntButton
      type={antType}
      size={antSize}
      className={cn(
        buttonVariants({ type: antType, antSize }),
        danger && "ds-color-button-danger",
        className,
        isIconOnly && "ds-button-icon-only"
      )}
      danger={danger}
      icon={icon}
      {...props}
    >
      {children}
    </AntButton>
  );
}
