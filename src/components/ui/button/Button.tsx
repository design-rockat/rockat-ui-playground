"use client";

import React from "react";
import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva("inline-flex items-center justify-center font-medium transition-all duration-150", {
  variants: {
    variant: {
      primary: "",
      default: "",
      dashed: "",
      text: "",
      link: "",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export interface ButtonProps
  extends Omit<AntButtonProps, "type" | "size" | "variant">,
    VariantProps<typeof buttonVariants> {
  type?: AntButtonProps["type"];
  antSize?: AntButtonProps["size"];
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size,
  antSize = "middle",
  className,
  type,
  children,
  icon,
  ...props
}: ButtonProps) {
  const antType = type ?? (variant as AntButtonProps["type"]);

  // Icon-only: no children, has icon
  const isIconOnly = !!icon && !children;

  return (
    <AntButton
      type={antType}
      size={antSize}
      className={cn(
        buttonVariants({ variant, size }),
        className,
        isIconOnly && "flex items-center justify-center p-0"
      )}
      icon={icon}
      {...props}
    >
      {children}
    </AntButton>
  );
}
