"use client";

import { useRouter } from "next/navigation";
import { LogOut, Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAdminMobile } from "@/app/admin/layout";

export default function AdminHeader({ title, description, actions, onMobileMenuToggle }) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const mobileContext = useAdminMobile();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (e) {
      router.push("/admin/login");
    }
  };

  const isDark = theme === "dark";
  const handleToggleMobile = onMobileMenuToggle || (() => mobileContext?.setMobileOpen?.(true));

  return (
    <header
      className={`px-4 sm:px-8 py-3.5 sticky top-0 z-30 transition-colors border-b backdrop-blur-md ${
        isDark ? "bg-[#111111]/90 border-[#222222]" : "bg-white/90 border-[#e2e8f0]"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleMobile}
            className={`lg:hidden p-2 rounded-xl border transition-colors cursor-pointer ${
              isDark
                ? "bg-[#1a1a1a] border-[#2e2e2e] text-[#a3a3a3] hover:text-white"
                : "bg-[#f8fafc] border-[#cbd5e1] text-[#475569] hover:text-[#0f172a]"
            }`}
            aria-label="Open Sidebar Menu"
            title="Open Menu"
          >
            <Menu size={18} />
          </button>

          <div>
            <h1
              className={`text-base sm:text-xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-[#0f172a]"
              }`}
            >
              {title}
            </h1>
            {description && (
              <p
                className={`text-[11px] sm:text-xs mt-0.5 ${
                  isDark ? "text-[#a3a3a3]" : "text-[#64748b]"
                }`}
              >
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {actions}

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl transition-all border cursor-pointer ${
              isDark
                ? "bg-[#1a1a1a] border-[#2e2e2e] text-[#a3a3a3] hover:text-white hover:border-[#404040]"
                : "bg-[#f8fafc] border-[#cbd5e1] text-[#475569] hover:text-[#0f172a] hover:border-[#94a3b8]"
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={16} className="text-[#f59e0b]" /> : <Moon size={16} className="text-[#6366f1]" />}
          </button>

          <div className={`h-4 w-px ${isDark ? "bg-[#222222]" : "bg-[#e2e8f0]"}`}></div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-medium text-[#ef4444] hover:text-white bg-[#ef4444]/10 hover:bg-[#ef4444] px-3 sm:px-3.5 py-1.5 rounded-xl border border-[#ef4444]/20 transition-all cursor-pointer"
            title="Logout of admin panel"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
