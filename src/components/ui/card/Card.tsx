"use client";

import React from "react";
import { Card as AntCard, CardProps as AntCardProps } from "antd";
import { cn } from "@/lib/cn";

export interface CardProps extends Omit<AntCardProps, "variant"> {
  className?: string;
  variant?: "default" | "filled" | "outlined";
}

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  return (
    <AntCard
      variant={variant === "outlined" ? "outlined" : "borderless"}
      className={cn(
        variant === "filled" && "bg-opacity-50",
        className
      )}
      style={
        variant === "filled"
          ? { background: "var(--rockat-card-filled-bg)" }
          : {}
      }
      {...props}
    >
      {children}
    </AntCard>
  );
}
