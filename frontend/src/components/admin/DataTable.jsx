"use client";

import { Edit2, Trash2, Plus, Search } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function DataTable({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  onAddNew,
  title = "Items",
  searchKey = "",
  addNewLabel = "Add New",
}) {
  const [query, setQuery] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const filteredData = data.filter((item) => {
    if (!query || !searchKey) return true;
    const val = item[searchKey];
    if (typeof val === "string") {
      return val.toLowerCase().includes(query.toLowerCase());
    }
    return true;
  });

  return (
    <div
      className={`border rounded-2xl overflow-hidden shadow-xl transition-colors ${
        isDark ? "bg-[#111111] border-[#222222]" : "bg-white border-[#e2e8f0]"
      }`}
    >
      {/* Header bar */}
      <div
        className={`p-4 border-b flex flex-col sm:flex-row justify-between items-center gap-3 ${
          isDark ? "bg-[#141414] border-[#222222]" : "bg-[#f8fafc] border-[#e2e8f0]"
        }`}
      >
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {searchKey && (
            <div className="relative w-full sm:w-64">
              <Search size={15} className={`absolute left-3 top-2.5 ${isDark ? "text-[#525252]" : "text-[#94a3b8]"}`} />
              <input
                type="text"
                placeholder="Filter entries..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`w-full border rounded-xl pl-9 pr-3 py-1.5 text-xs outline-none focus:border-[#10b981] transition-colors ${
                  isDark
                    ? "bg-[#1c1c1c] border-[#2e2e2e] text-white placeholder-[#525252]"
                    : "bg-white border-[#cbd5e1] text-[#0f172a] placeholder-[#94a3b8]"
                }`}
              />
            </div>
          )}
          <span className={`font-mono text-xs ${isDark ? "text-[#737373]" : "text-[#64748b]"}`}>
            {filteredData.length} {filteredData.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        {onAddNew && (
          <button
            onClick={onAddNew}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 font-semibold font-mono text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm ${
              isDark
                ? "bg-[#10b981] hover:bg-[#059669] text-black"
                : "bg-[#0f172a] hover:bg-[#1e293b] text-white"
            }`}
          >
            <Plus size={15} />
            <span>{addNewLabel}</span>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className={`border-b text-[11px] font-mono uppercase tracking-wider ${
                isDark
                  ? "bg-[#171717] border-[#222222] text-[#737373]"
                  : "bg-[#f1f5f9] border-[#e2e8f0] text-[#64748b]"
              }`}
            >
              {columns.map((col, idx) => (
                <th key={idx} className="p-4 font-semibold">
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && <th className="p-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className={`divide-y text-sm ${isDark ? "divide-[#1f1f1f]" : "divide-[#e2e8f0]"}`}>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className={`p-8 text-center font-mono text-xs ${isDark ? "text-[#525252]" : "text-[#94a3b8]"}`}
                >
                  No items found. Click "{addNewLabel}" to create one.
                </td>
              </tr>
            ) : (
              filteredData.map((row, rIdx) => (
                <tr
                  key={row._id || rIdx}
                  className={`transition-colors group ${
                    isDark ? "hover:bg-[#181818] text-[#d4d4d4]" : "hover:bg-[#f8fafc] text-[#334155]"
                  }`}
                >
                  {columns.map((col, cIdx) => (
                    <td key={cIdx} className="p-4 align-middle">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="p-4 text-right align-middle">
                      <div className="flex items-center justify-end gap-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isDark
                                ? "text-[#a3a3a3] hover:text-[#10b981] hover:bg-[#222222]"
                                : "text-[#64748b] hover:text-[#059669] hover:bg-[#e2e8f0]"
                            }`}
                            title="Edit"
                          >
                            <Edit2 size={15} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row._id)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isDark
                                ? "text-[#a3a3a3] hover:text-[#ef4444] hover:bg-[#222222]"
                                : "text-[#64748b] hover:text-[#ef4444] hover:bg-[#e2e8f0]"
                            }`}
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
