"use client";

import { useState } from "react";
import { Upload, Check, AlertCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ImageUploader({ value, onChange, label = "Image Upload" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Upload failed");
      }

      const data = await res.json();
      onChange(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label
        className={`block text-xs font-mono font-medium uppercase tracking-wider ${
          isDark ? "text-[#a3a3a3]" : "text-[#475569]"
        }`}
      >
        {label}
      </label>

      <div className="flex items-center gap-4">
        {/* Preview image */}
        <div
          className={`w-16 h-16 rounded-xl border overflow-hidden flex items-center justify-center flex-shrink-0 relative ${
            isDark ? "bg-[#1c1c1c] border-[#2e2e2e]" : "bg-[#f1f5f9] border-[#cbd5e1]"
          }`}
        >
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <span className={`text-[10px] font-mono ${isDark ? "text-[#525252]" : "text-[#94a3b8]"}`}>
              No Image
            </span>
          )}
        </div>

        {/* Input & URL */}
        <div className="flex-1 space-y-2">
          <input
            type="text"
            placeholder="/assets/imgPortfolio.png or /uploads/..."
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 text-xs outline-none focus:border-[#10b981] transition-colors ${
              isDark
                ? "bg-[#1c1c1c] border-[#2e2e2e] text-white placeholder-[#525252]"
                : "bg-white border-[#cbd5e1] text-[#0f172a] placeholder-[#94a3b8]"
            }`}
          />

          <div className="flex items-center gap-2">
            <label
              className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                isDark
                  ? "bg-[#222222] border-[#2e2e2e] text-[#d4d4d4] hover:text-white hover:bg-[#2e2e2e]"
                  : "bg-[#e2e8f0] border-[#cbd5e1] text-[#334155] hover:text-[#0f172a] hover:bg-[#cbd5e1]"
              }`}
            >
              <Upload size={14} />
              <span>{uploading ? "Uploading..." : "Choose Local File"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>

            {value && (
              <span className="text-[11px] font-mono text-[#10b981] flex items-center gap-1">
                <Check size={13} /> Saved
              </span>
            )}
          </div>

          {error && (
            <p className="text-[11px] font-mono text-[#ef4444] flex items-center gap-1">
              <AlertCircle size={13} /> {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
