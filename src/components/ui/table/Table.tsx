"use client";

import React from "react";

export type Column<T> = {
  key: string;
  title: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  striped?: boolean;
  loading?: boolean;
  emptyText?: string;
  onRowClick?: (row: T) => void;
  className?: string;
};

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr style={{ borderTop: "1px solid var(--rockat-border)" }}>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div
            className="rounded animate-pulse"
            style={{ height: 16, width: i === 0 ? "60%" : "40%", background: "var(--rockat-border)" }}
          />
        </td>
      ))}
    </tr>
  );
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  striped = false,
  loading = false,
  emptyText = "Nenhum dado encontrado.",
  onRowClick,
  className,
}: Props<T>) {
  return (
    <div
      className={className}
      style={{ border: "1px solid var(--rockat-border)", borderRadius: 12, overflow: "hidden" }}
    >
      <table className="min-w-full text-sm" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead style={{ background: "var(--rockat-bg-subtle)" }}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-left px-4 py-3 font-medium ${col.className ?? ""}`}
                style={{ color: "var(--rockat-text-muted)", borderBottom: "1px solid var(--rockat-border)" }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <SkeletonRow key={i} cols={columns.length} />
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-sm"
                style={{ color: "var(--rockat-text-muted)" }}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                style={{
                  background:
                    striped && rowIndex % 2 === 0
                      ? "var(--rockat-bg-subtle)"
                      : "transparent",
                  borderTop: rowIndex > 0 ? "1px solid var(--rockat-border)" : undefined,
                  cursor: onRowClick ? "pointer" : undefined,
                  transition: onRowClick ? "background 0.1s" : undefined,
                }}
                className={onRowClick ? "hover:bg-[var(--rockat-accent-bg)]" : ""}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 ${col.className ?? ""}`}
                    style={{ color: "var(--rockat-text)" }}
                  >
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
