"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer } from "antd";
import {
  BookOpen,
  Palette,
  Type,
  Maximize2,
  Circle,
  Layers,
  Square,
  TextCursor,
  CreditCard,
  Bell,
  LayoutGrid,
  Lightbulb,
  Grid3x3,
  ChevronRight,
  ChevronDown,
  X,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/cn";

type NavItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  {
    label: "Introduction",
    href: "/",
    icon: <BookOpen size={16} />,
  },
  {
    label: "Colors",
    href: "/colors",
    icon: <Palette size={16} />,
  },
  {
    label: "Typography",
    href: "/typography",
    icon: <Type size={16} />,
  },
  {
    label: "Spacing",
    href: "/spacing",
    icon: <Maximize2 size={16} />,
  },
  {
    label: "Radius",
    href: "/radius",
    icon: <Circle size={16} />,
  },
  {
    label: "Components",
    icon: <Layers size={16} />,
    children: [
      { label: "Button", href: "/components/button", icon: <Square size={14} /> },
      { label: "Input", href: "/components/input", icon: <TextCursor size={14} /> },
      { label: "Card", href: "/components/card", icon: <CreditCard size={14} /> },
      { label: "Toast", href: "/components/toast", icon: <Bell size={14} /> },
      { label: "Modal", href: "/components/modal", icon: <LayoutGrid size={14} /> },
    ],
  },
  {
    label: "Icons",
    href: "/icons",
    icon: <Lightbulb size={16} />,
  },
  {
    label: "Playground",
    href: "/playground",
    icon: <Grid3x3 size={16} />,
  },
];

function NavItemComponent({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(() => {
    if (!item.children) return false;
    return item.children.some((child) => child.href === pathname);
  });

  const isActive = item.href === pathname;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150",
            "text-[var(--rockat-text-muted)] hover:text-[var(--rockat-text)] hover:bg-[var(--rockat-primary-50)]",
            "dark:hover:bg-[var(--rockat-bg-elevated)]",
            open && "text-[var(--rockat-text)]"
          )}
        >
          <span className="flex items-center gap-2">
            {item.icon}
            {item.label}
          </span>
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {open && (
          <div className="ml-4 mt-1 border-l border-[var(--rockat-border)] pl-2 space-y-0.5">
            {item.children.map((child) => (
              <NavItemComponent key={child.href} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href!}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150",
        isActive
          ? "bg-primary-100 text-primary-700 font-semibold"
          : "text-[var(--rockat-text-muted)] hover:text-[var(--rockat-text)] hover:bg-[var(--rockat-primary-50)]"
      )}
      style={
        isActive
          ? {
              background: "var(--rockat-primary-100)",
              color: "var(--rockat-primary-700)",
            }
          : {}
      }
    >
      {item.icon}
      {item.label}
    </Link>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex flex-col h-full px-4 py-6" style={{ background: "var(--rockat-sidebar-bg)" }}>
      {/* Logo */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, var(--rockat-primary-600), var(--rockat-primary-800))" }}
          >
            R
          </div>
          <div>
            <div className="font-bold text-sm leading-tight" style={{ color: "var(--rockat-text)" }}>
              Rock-at UI
            </div>
            <div className="text-xs" style={{ color: "var(--rockat-text-muted)" }}>
              Design System
            </div>
          </div>
        </Link>
        {onClose && (
          <Button
            type="text"
            size="small"
            icon={<X size={16} />}
            onClick={onClose}
          />
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavItemComponent key={item.href ?? item.label} item={item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-6 pt-4" style={{ borderTop: "1px solid var(--rockat-sidebar-border)" }}>
        <p className="text-xs text-center" style={{ color: "var(--rockat-text-muted)" }}>
          Rock-at UI v0.1.0
        </p>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 h-screen sticky top-0 flex-shrink-0"
        style={{
          borderRight: "1px solid var(--rockat-sidebar-border)",
          background: "var(--rockat-sidebar-bg)",
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl shadow-lg"
        style={{ background: "var(--rockat-bg-elevated)", border: "1px solid var(--rockat-border)" }}
        onClick={() => setDrawerOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={20} style={{ color: "var(--rockat-text)" }} />
      </button>

      {/* Mobile drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="left"
        width={280}
        styles={{ body: { padding: 0 } }}
        closable={false}
      >
        <SidebarContent onClose={() => setDrawerOpen(false)} />
      </Drawer>
    </>
  );
}
