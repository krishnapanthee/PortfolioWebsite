"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Mail, AlertCircle, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen relative flex items-center justify-center p-6 font-sans transition-colors ${
        isDark ? "bg-[#0a0a0a] text-white" : "bg-[#f8fafc] text-[#0f172a]"
      }`}
    >
      {/* Top Right Theme Mode Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 p-2.5 rounded-xl border transition-all cursor-pointer shadow-sm z-50 flex items-center gap-2 text-xs font-mono ${
          isDark
            ? "bg-[#141414]/90 backdrop-blur-md border-[#292929] text-[#d4d4d4] hover:text-white hover:border-[#404040]"
            : "bg-white/90 backdrop-blur-md border-[#cbd5e1] text-[#475569] hover:text-[#0f172a] hover:border-[#94a3b8]"
        }`}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDark ? (
          <>
            <Sun size={16} className="text-[#f59e0b]" />
            <span className="hidden sm:inline">Light Mode</span>
          </>
        ) : (
          <>
            <Moon size={16} className="text-[#6366f1]" />
            <span className="hidden sm:inline">Dark Mode</span>
          </>
        )}
      </button>

      <div className="w-full max-w-md space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold font-mono tracking-tight">Admin Login</h1>
          <p className={`text-xs font-mono ${isDark ? "text-[#737373]" : "text-[#64748b]"}`}>
            Login to manage portfolio
          </p>
        </div>

        {/* Login Form Card */}
        <div
          className={`border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 transition-colors ${
            isDark ? "bg-[#111111] border-[#222222]" : "bg-white border-[#e2e8f0]"
          }`}
        >
          {error && (
            <div className="p-3.5 bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-xl text-xs font-mono text-[#ef4444] flex items-center gap-2">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                className={`block text-xs font-mono uppercase tracking-wider mb-2 ${
                  isDark ? "text-[#a3a3a3]" : "text-[#475569]"
                }`}
              >
                Admin Email
              </label>
              <div className="relative">
                <Mail size={16} className={`absolute left-3.5 top-3 ${isDark ? "text-[#525252]" : "text-[#94a3b8]"}`} />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#10b981] transition-colors ${
                    isDark
                      ? "bg-[#171717] border-[#2e2e2e] text-white placeholder-[#525252]"
                      : "bg-white border-[#cbd5e1] text-[#0f172a] placeholder-[#94a3b8]"
                  }`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className={`block text-xs font-mono uppercase tracking-wider ${
                    isDark ? "text-[#a3a3a3]" : "text-[#475569]"
                  }`}
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <KeyRound size={16} className={`absolute left-3.5 top-3 ${isDark ? "text-[#525252]" : "text-[#94a3b8]"}`} />
                <input
                  type="password"
                  required
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#10b981] transition-colors ${
                    isDark
                      ? "bg-[#171717] border-[#2e2e2e] text-white placeholder-[#525252]"
                      : "bg-white border-[#cbd5e1] text-[#0f172a] placeholder-[#94a3b8]"
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-2 font-semibold font-mono text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg ${
                isDark
                  ? "bg-[#10b981] hover:bg-[#059669] text-white shadow-[#10b981]/20 hover:shadow-[#10b981]/30"
                  : "bg-[#0f172a] hover:bg-[#1e293b] text-white shadow-slate-900/10 hover:shadow-slate-900/20"
              }`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>Authenticate</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
