"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import { useEffect, useState } from "react";
import { Check, Upload, FileText, Trash2, ExternalLink } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function AdminHeroPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [hero, setHero] = useState({
    name: "Krishna Panthi",
    tagline: "full-stack developer building things for the web.",
    techHighlights: ["React", "Node.js", "Next.js", "TypeScript", "PostgreSQL"],
    statusText: "// currently open to opportunities",
    githubUrl: "https://github.com/krishnapanthee",
    resumeUrl: "",
  });
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setHero(data);
          setTechInput((data.techHighlights || []).join(", "));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCvFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCv(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload CV file");
      }

      setHero((prev) => ({ ...prev, resumeUrl: data.url }));
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploadingCv(false);
    }
  };

  const handleRemoveCv = () => {
    setHero((prev) => ({ ...prev, resumeUrl: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg(false);

    try {
      const techArray = techInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...hero,
        techHighlights: techArray,
      };

      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 3000);
      }
    } catch (e) {
      alert("Failed to save hero section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className={`p-8 font-mono text-xs ${isDark ? "text-[#737373]" : "text-[#94a3b8]"}`}>Loading Hero Section data...</div>;
  }

  const inputStyle = `w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#10b981] transition-colors ${
    isDark ? "bg-[#171717] border-[#2e2e2e] text-white placeholder-[#525252]" : "bg-white border-[#cbd5e1] text-[#0f172a] placeholder-[#94a3b8]"
  }`;

  const labelStyle = `block text-xs font-mono font-medium uppercase tracking-wider mb-2 ${
    isDark ? "text-[#a3a3a3]" : "text-[#475569]"
  }`;

  return (
    <div>
      <AdminHeader
        title="Hero Section Management"
        description="Update your header intro, tagline, tech highlights, CV document, and social links"
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className={`border rounded-2xl p-6 space-y-6 shadow-xl transition-colors ${
            isDark ? "bg-[#111111] border-[#222222]" : "bg-white border-[#e2e8f0]"
          }`}
        >
          {savedMsg && (
            <div className="p-3 bg-[#10b981]/10 border border-[#10b981]/20 rounded-xl text-xs font-mono text-[#10b981] flex items-center gap-2">
              <Check size={16} /> Saved Hero Section & CV document successfully!
            </div>
          )}

          <div>
            <label className={labelStyle}>Full Name</label>
            <input
              type="text"
              required
              value={hero.name || ""}
              onChange={(e) => setHero({ ...hero, name: e.target.value })}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Primary Tagline</label>
            <input
              type="text"
              required
              value={hero.tagline || ""}
              onChange={(e) => setHero({ ...hero, tagline: e.target.value })}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Tech Stack Highlights (Comma Separated)</label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="React, Node.js, Next.js, TypeScript, PostgreSQL"
              className={`${inputStyle} font-mono`}
            />
            <p className={`text-[11px] font-mono mt-1 ${isDark ? "text-[#525252]" : "text-[#94a3b8]"}`}>
              Rendered as glowing badges in the hero section
            </p>
          </div>

          <div>
            <label className={labelStyle}>Status Text / Availability</label>
            <input
              type="text"
              value={hero.statusText || ""}
              onChange={(e) => setHero({ ...hero, statusText: e.target.value })}
              className={`${inputStyle} text-[#10b981] font-mono`}
            />
          </div>

          <div>
            <label className={labelStyle}>GitHub Profile URL</label>
            <input
              type="text"
              value={hero.githubUrl || ""}
              onChange={(e) => setHero({ ...hero, githubUrl: e.target.value })}
              className={`${inputStyle} text-xs font-mono`}
            />
          </div>

          {/* Local CV File Upload Section */}
          <div className="space-y-2">
            <label className={labelStyle}>Resume / CV Document (Local File Upload)</label>
            
            {hero.resumeUrl ? (
              <div
                className={`p-4 border rounded-xl flex items-center justify-between transition-colors ${
                  isDark ? "bg-[#171717] border-[#2e2e2e]" : "bg-[#f8fafc] border-[#cbd5e1]"
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-[#10b981]/10 text-[#10b981]">
                    <FileText size={20} />
                  </div>
                  <div className="truncate">
                    <div className={`text-xs font-mono font-semibold truncate ${isDark ? "text-white" : "text-[#0f172a]"}`}>
                      {hero.resumeUrl.split("/").pop()}
                    </div>
                    <a
                      href={hero.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-[#10b981] hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>View Uploaded CV</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveCv}
                  className="p-2 text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg transition-colors cursor-pointer ml-2 flex-shrink-0"
                  title="Remove CV"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors relative ${
                  isDark ? "border-[#2e2e2e] bg-[#141414] hover:border-[#10b981]/50" : "border-[#cbd5e1] bg-[#f8fafc] hover:border-[#10b981]/50"
                }`}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCvFileUpload}
                  disabled={uploadingCv}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                  <div className="p-3 rounded-full bg-[#10b981]/10 text-[#10b981]">
                    <Upload size={20} />
                  </div>
                  <div className={`text-xs font-mono font-medium ${isDark ? "text-white" : "text-[#0f172a]"}`}>
                    {uploadingCv ? "Uploading CV file..." : "Click or drag local CV file (PDF, DOCX) to upload"}
                  </div>
                  <div className={`text-[11px] font-mono ${isDark ? "text-[#525252]" : "text-[#94a3b8]"}`}>
                    Saved to local storage folder `/public/uploads/`
                  </div>
                </div>
              </div>
            )}

            {uploadError && (
              <p className="text-xs font-mono text-[#ef4444] mt-1">{uploadError}</p>
            )}
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
              <span>Save Hero Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
