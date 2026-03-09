"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer, Tooltip } from "antd";
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
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { LogoImage } from "./LogoImage";

type NavItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  { label: "Introduction", href: "/", icon: <BookOpen size={16} /> },
  { label: "Colors", href: "/colors", icon: <Palette size={16} /> },
  { label: "Typography", href: "/typography", icon: <Type size={16} /> },
  { label: "Spacing", href: "/spacing", icon: <Maximize2 size={16} /> },
  { label: "Radius", href: "/radius", icon: <Circle size={16} /> },
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
  { label: "Icons", href: "/icons", icon: <Lightbulb size={16} /> },
  { label: "Playground", href: "/playground", icon: <Grid3x3 size={16} /> },
];

function NavItemComponent({
  item,
  collapsed,
  depth = 0,
}: {
  item: NavItem;
  collapsed: boolean;
  depth?: number;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(() => {
    if (!item.children) return false;
    return item.children.some((child) => child.href === pathname);
  });

  const isActive = item.href === pathname;

  if (item.children) {
    if (collapsed) {
      return (
        <Tooltip title={item.label} placement="right">
          <button
            className={cn(
              "w-full flex items-center justify-center p-2.5 rounded-xl transition-all duration-150",
              "text-[var(--rockat-text-muted)] hover:text-[var(--rockat-text)] hover:bg-[var(--rockat-primary-50)]"
            )}
          >
            {item.icon}
          </button>
        </Tooltip>
      );
    }

    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150",
            "text-[var(--rockat-text-muted)] hover:text-[var(--rockat-text)] hover:bg-[var(--rockat-primary-50)]",
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
              <NavItemComponent key={child.href} item={child} collapsed={false} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (collapsed) {
    return (
      <Tooltip title={item.label} placement="right">
        <Link
          href={item.href!}
          className={cn(
            "flex items-center justify-center p-2.5 rounded-xl transition-all duration-150",
            isActive
              ? "text-[var(--rockat-primary-700)]"
              : "text-[var(--rockat-text-muted)] hover:text-[var(--rockat-text)] hover:bg-[var(--rockat-primary-50)]"
          )}
          style={isActive ? { background: "var(--rockat-primary-100)" } : {}}
        >
          {item.icon}
        </Link>
      </Tooltip>
    );
  }

  return (
    <Link
      href={item.href!}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150",
        isActive
          ? "font-semibold"
          : "text-[var(--rockat-text-muted)] hover:text-[var(--rockat-text)] hover:bg-[var(--rockat-primary-50)]"
      )}
      style={isActive ? { background: "var(--rockat-primary-100)", color: "var(--rockat-primary-700)" } : {}}
    >
      {item.icon}
      {item.label}
    </Link>
  );
}

function SidebarContent({
  onClose,
  collapsed,
  onToggleCollapse,
}: {
  onClose?: () => void;
  collapsed: boolean;
  onToggleCollapse?: () => void;
}) {
  return (
    <div
      className="flex flex-col h-full py-5 transition-all duration-200"
      style={{
        background: "var(--rockat-sidebar-bg)",
        paddingLeft: collapsed ? "12px" : "16px",
        paddingRight: collapsed ? "12px" : "16px",
      }}
    >
      {/* Logo + collapse button */}
      <div className={cn("flex items-center mb-7", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <Link href="/" className="flex items-center">
            <LogoImage width={130} height={36} />
          </Link>
        )}

        {/* Collapse toggle (desktop) or close (mobile drawer) */}
        {onClose ? (
          <Button type="text" size="small" icon={<X size={16} />} onClick={onClose} />
        ) : onToggleCollapse ? (
          <Tooltip title={collapsed ? "Expand sidebar" : "Collapse sidebar"} placement="right">
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-xl transition-all duration-150 hover:bg-[var(--rockat-primary-50)]"
              style={{ color: "var(--rockat-text-muted)" }}
              aria-label="Toggle sidebar"
            >
              {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
          </Tooltip>
        ) : null}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => (
          <NavItemComponent
            key={item.href ?? item.label}
            item={item}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="mt-6 pt-4" style={{ borderTop: "1px solid var(--rockat-sidebar-border)" }}>
          <p className="text-xs text-center" style={{ color: "var(--rockat-text-muted)" }}>
            Rock-at UI v0.1.0
          </p>
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col h-screen sticky top-0 flex-shrink-0 transition-all duration-200"
        style={{
          width: collapsed ? "64px" : "256px",
          borderRight: "1px solid var(--rockat-sidebar-border)",
          background: "var(--rockat-sidebar-bg)",
        }}
      >
        <SidebarContent
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />
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
        <SidebarContent
          collapsed={false}
          onClose={() => setDrawerOpen(false)}
        />
      </Drawer>
    </>
  );
}



