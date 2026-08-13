"use client";

import { Plus, Trash2, HelpCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function PostFaqManager({ faqs = [], onChange }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleAddFaq = () => {
    onChange([...faqs, { question: "", answer: "" }]);
  };

  const handleRemoveFaq = (index) => {
    const updated = faqs.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div
      className={`border rounded-2xl p-6 space-y-4 transition-colors ${
        isDark ? "bg-[#111111] border-[#222222]" : "bg-white border-[#e2e8f0]"
      }`}
    >
      <div className={`flex items-center justify-between border-b pb-3 ${isDark ? "border-[#222222]" : "border-[#e2e8f0]"}`}>
        <div className="flex items-center gap-2">
          <HelpCircle size={16} className="text-[#10b981]" />
          <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? "text-white" : "text-[#0f172a]"}`}>
            Article FAQs (AEO & Search Rich Snippets)
          </h3>
        </div>
        <button
          type="button"
          onClick={handleAddFaq}
          className="flex items-center gap-1 text-xs font-mono bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981]/20 border border-[#10b981]/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Plus size={14} /> Add FAQ Item
        </button>
      </div>

      <p className={`text-xs leading-relaxed ${isDark ? "text-[#737373]" : "text-[#64748b]"}`}>
        Add frequently asked questions specific to this post. These will render at the bottom of the article and boost AI Answer Engine Optimization (AEO).
      </p>

      {faqs.length === 0 ? (
        <div
          className={`text-center py-6 border border-dashed rounded-xl text-xs font-mono ${
            isDark ? "border-[#222222] text-[#525252]" : "border-[#cbd5e1] text-[#94a3b8]"
          }`}
        >
          No FAQs added yet for this post. Click &quot;Add FAQ Item&quot; to add one.
        </div>
      ) : (
        <div className="space-y-4 pt-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl p-4 space-y-3 relative group transition-colors ${
                isDark ? "bg-[#171717] border-[#2e2e2e]" : "bg-[#f8fafc] border-[#cbd5e1]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-medium text-[#10b981]">
                  FAQ #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveFaq(index)}
                  className={`p-1 transition-colors cursor-pointer ${
                    isDark ? "text-[#737373] hover:text-red-400" : "text-[#94a3b8] hover:text-red-500"
                  }`}
                  title="Remove FAQ"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div>
                <label className={`block text-[11px] font-mono mb-1 ${isDark ? "text-[#a3a3a3]" : "text-[#475569]"}`}>
                  Question
                </label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => handleChange(index, "question", e.target.value)}
                  placeholder="e.g. How does Clean Architecture differ from standard MVC?"
                  className={`w-full border rounded-lg px-3 py-2 text-xs outline-none focus:border-[#10b981] ${
                    isDark
                      ? "bg-[#111111] border-[#2e2e2e] text-white"
                      : "bg-white border-[#cbd5e1] text-[#0f172a]"
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[11px] font-mono mb-1 ${isDark ? "text-[#a3a3a3]" : "text-[#475569]"}`}>
                  Answer
                </label>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => handleChange(index, "answer", e.target.value)}
                  placeholder="e.g. Clean Architecture separates business logic into domain services and repositories..."
                  className={`w-full border rounded-lg p-3 text-xs outline-none focus:border-[#10b981] ${
                    isDark
                      ? "bg-[#111111] border-[#2e2e2e] text-white"
                      : "bg-white border-[#cbd5e1] text-[#0f172a]"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
