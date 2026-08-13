"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function FormModal({ isOpen, onClose, title, children, onSubmit, isSubmitting }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className={`border rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fadeInScale transition-colors ${
          isDark ? "bg-[#111111] border-[#262626]" : "bg-white border-[#cbd5e1]"
        }`}
      >
        {/* Header */}
        <div
          className={`p-5 border-b flex justify-between items-center ${
            isDark ? "bg-[#141414] border-[#222222]" : "bg-[#f8fafc] border-[#e2e8f0]"
          }`}
        >
          <h2 className={`text-base font-bold font-mono tracking-tight ${isDark ? "text-white" : "text-[#0f172a]"}`}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-md transition-colors cursor-pointer ${
              isDark ? "text-[#737373] hover:text-white hover:bg-[#222222]" : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#e2e8f0]"
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={onSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 overflow-y-auto space-y-5 flex-1">{children}</div>

          {/* Footer Actions */}
          <div
            className={`p-4 border-t flex justify-end gap-3 ${
              isDark ? "bg-[#141414] border-[#222222]" : "bg-[#f8fafc] border-[#e2e8f0]"
            }`}
          >
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                isDark
                  ? "text-[#a3a3a3] hover:text-white bg-[#1a1a1a] hover:bg-[#262626]"
                  : "text-[#475569] hover:text-[#0f172a] bg-[#e2e8f0] hover:bg-[#cbd5e1]"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-2 rounded-xl text-xs font-mono font-semibold transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2 ${
                isDark
                  ? "bg-[#10b981] hover:bg-[#059669] text-black"
                  : "bg-[#0f172a] hover:bg-[#1e293b] text-white"
              }`}
            >
              {isSubmitting && (
                <div className={`w-3 h-3 border-2 ${isDark ? "border-black" : "border-white"} border-t-transparent rounded-full animate-spin`}></div>
              )}
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
