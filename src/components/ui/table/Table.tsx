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
  className?: string;
};

export function Table<T extends Record<string, any>>({ columns, data, striped = false, className }: Props<T>) {
  return (
    <div className={className} style={{ border: "1px solid var(--rockat-border)", borderRadius: 12, overflow: "hidden" }}>
      <table className="min-w-full text-sm" style={{ borderCollapse: "separate", width: "100%" }}>
        <thead style={{ background: "var(--rockat-bg-subtle)" }}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-left px-4 py-3 ${col.className ?? ""}`}
                style={{ color: "var(--rockat-text-muted)" }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                background: striped && rowIndex % 2 === 0 ? "var(--rockat-bg-elevated)" : "transparent",
                borderTop: "1px solid var(--rockat-border)",
              }}
            >
              {columns.map((col) => (
                <td key={col.key} className={`px-4 py-3 ${col.className ?? ""}`} style={{ color: "var(--rockat-text)" }}>
                  {col.render ? col.render(row) : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
