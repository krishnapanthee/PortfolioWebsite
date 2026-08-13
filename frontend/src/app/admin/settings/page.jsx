"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { useEffect, useState } from "react";
import { KeyRound, Check, AlertCircle, Shield, Mail } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function AdminSettingsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [currentAdminEmail, setCurrentAdminEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.admin?.email) {
          setCurrentAdminEmail(data.admin.email);
        }
      })
      .catch(() => { });
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update password");
      }

      setSuccessMsg(data.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = `w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#10b981] transition-colors ${isDark
    ? "bg-[#171717] border-[#2e2e2e] text-white placeholder-[#525252]"
    : "bg-white border-[#cbd5e1] text-[#0f172a] placeholder-[#94a3b8]"
    }`;

  const labelStyle = `block text-xs font-mono font-medium uppercase tracking-wider mb-2 ${isDark ? "text-[#a3a3a3]" : "text-[#475569]"
    }`;

  return (
    <div>
      <AdminHeader
        title="Admin Settings & Security"
        description="Manage your account credentials, security preferences, and dashboard settings"
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
        {/* Account Info Card */}
        <div
          className={`border rounded-2xl p-6 space-y-4 transition-colors ${isDark ? "bg-[#111111] border-[#222222]" : "bg-white border-[#e2e8f0] shadow-sm"
            }`}
        >
          <div className="flex items-center gap-2 border-b pb-3 border-[#222222]/30">

            <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? "text-white" : "text-[#0f172a]"}`}>
              Active Admin Account
            </h3>
          </div>

          <div className="flex items-center gap-3">

            <div>
              <div className={`text-xs font-mono ${isDark ? "text-[#737373]" : "text-[#64748b]"}`}>Primary Admin Email</div>
              <div className={`text-sm font-semibold font-mono mt-0.5 ${isDark ? "text-white" : "text-[#0f172a]"}`}>
                {currentAdminEmail || "[EMAIL_ADDRESS]"}
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Form Card */}
        <div
          className={`border rounded-2xl p-6 space-y-6 shadow-xl transition-colors ${isDark ? "bg-[#111111] border-[#222222]" : "bg-white border-[#e2e8f0]"
            }`}
        >
          <div className="flex items-center gap-2 border-b pb-3 border-[#222222]/30">
            <KeyRound size={18} className="text-[#10b981]" />
            <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? "text-white" : "text-[#0f172a]"}`}>
              Change Account Password
            </h3>
          </div>

          {error && (
            <div className="p-3.5 bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-xl text-xs font-mono text-[#ef4444] flex items-center gap-2">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 bg-[#10b981]/10 border border-[#10b981]/20 rounded-xl text-xs font-mono text-[#10b981] flex items-center gap-2">
              <Check size={16} className="flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className={labelStyle}>Current Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className={inputStyle}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelStyle}>New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className={inputStyle}
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className={`font-semibold font-mono text-xs px-6 py-2.5 rounded-xl transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2 ${
                  isDark
                    ? "bg-[#10b981] hover:bg-[#059669] text-black"
                    : "bg-[#0f172a] hover:bg-[#1e293b] text-white"
                }`}
              >
                {saving && <div className={`w-3.5 h-3.5 border-2 ${isDark ? "border-black" : "border-white"} border-t-transparent rounded-full animate-spin`}></div>}
                <span>Update Password</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
