"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import ImageUploader from "@/components/admin/ImageUploader";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function AdminAboutPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [about, setAbout] = useState({
    name: "Krishna Panthi",
    location: "Nepal",
    imageUrl: "/assets/imgPortfolio.png",
    paragraphs: [],
    highlightTechs: ["MERN", "Next.js", "PostgreSQL"],
  });
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setAbout(data);
          setP1(data.paragraphs?.[0] || "");
          setP2(data.paragraphs?.[1] || "");
          setTechInput((data.highlightTechs || []).join(", "));
        }
      })
      .finally(() => setLoading(false));
  }, []);

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
        ...about,
        paragraphs: [p1, p2].filter(Boolean),
        highlightTechs: techArray,
      };

      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 3000);
      }
    } catch (e) {
      alert("Failed to save about section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className={`p-8 font-mono text-xs ${isDark ? "text-[#737373]" : "text-[#94a3b8]"}`}>Loading About Section data...</div>;
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
        title="About Section Management"
        description="Update your bio paragraphs, location, profile photo, and highlight tech stacks"
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
              <Check size={16} /> Saved About Section successfully!
            </div>
          )}

          <ImageUploader
            label="Profile / About Photo"
            value={about.imageUrl}
            onChange={(url) => setAbout({ ...about, imageUrl: url })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Name</label>
              <input
                type="text"
                value={about.name || ""}
                onChange={(e) => setAbout({ ...about, name: e.target.value })}
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Location</label>
              <input
                type="text"
                value={about.location || ""}
                onChange={(e) => setAbout({ ...about, location: e.target.value })}
                className={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Bio Paragraph 1</label>
            <textarea
              rows={3}
              value={p1}
              onChange={(e) => setP1(e.target.value)}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Bio Paragraph 2</label>
            <textarea
              rows={3}
              value={p2}
              onChange={(e) => setP2(e.target.value)}
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Highlight Tech Badges (Comma Separated)</label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="MERN, Next.js, PostgreSQL"
              className={`${inputStyle} font-mono`}
            />
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
              <span>Save About Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
