"use client";

import { useState } from "react";
import { Upload, X, FileText, Image as ImageIcon, FileSpreadsheet, File } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function FileUploader({ value, onChange, label = "Upload File (PDF, Image, Excel, Word)" }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const getFileIcon = (url) => {
    if (!url) return File;
    const lower = url.toLowerCase();
    if (lower.match(/\.(jpg|jpeg|png|webp|svg|gif)$/)) return ImageIcon;
    if (lower.match(/\.(pdf)$/)) return FileText;
    if (lower.match(/\.(xlsx|xls|csv)$/)) return FileSpreadsheet;
    return FileText;
  };

  const FileIconComponent = getFileIcon(value);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      onChange(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className={`block font-mono text-xs font-medium ${isDark ? "text-[#a3a3a3]" : "text-[#475569]"}`}>
        {label}
      </label>

      {value ? (
        <div
          className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
            isDark ? "bg-[#171717] border-[#2e2e2e]" : "bg-[#f8fafc] border-[#cbd5e1]"
          }`}
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className={`p-2 rounded-lg ${isDark ? "bg-[#222222] text-[#10b981]" : "bg-[#e2e8f0] text-[#059669]"}`}>
              <FileIconComponent size={18} />
            </div>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#10b981] hover:underline truncate"
            >
              {value}
            </a>
          </div>

          <button
            type="button"
            onClick={() => onChange("")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDark ? "hover:bg-[#262626] text-[#737373] hover:text-white" : "hover:bg-[#e2e8f0] text-[#64748b] hover:text-black"
            }`}
            title="Remove File"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-all ${
            isDark
              ? "border-[#2e2e2e] hover:border-[#10b981]/60 bg-[#141414]"
              : "border-[#cbd5e1] hover:border-[#10b981]/60 bg-[#f8fafc]"
          }`}
        >
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.xls,.xlsx,.csv"
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center justify-center gap-1.5">
            <div className={`p-2 rounded-full ${isDark ? "bg-[#1c1c1c] text-[#10b981]" : "bg-[#e2e8f0] text-[#059669]"}`}>
              <Upload size={18} />
            </div>
            <p className={`text-xs font-mono font-medium ${isDark ? "text-[#e5e5e5]" : "text-[#0f172a]"}`}>
              {uploading ? "Uploading..." : "Click or drag & drop to upload file"}
            </p>
            <p className={`text-[11px] font-mono ${isDark ? "text-[#737373]" : "text-[#64748b]"}`}>
              Supports PDF, PNG, JPG, WEBP, Excel, Word
            </p>
          </div>
        </div>
      )}

      {error && <p className="font-mono text-xs text-red-500">{error}</p>}
    </div>
  );
}
