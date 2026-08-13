"use client";

import { useTheme } from "@/context/ThemeContext";

export default function SEOPreview({ title, description, slug }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://krishnaprasadpanthi17.com.np";
  const displayTitle = title ? `${title} | Krishna Panthi` : "Post Title | Krishna Panthi";
  const displayDesc = description || "This is how your post description will appear in Google Search Results.";

  return (
    <div
      className={`border rounded-xl p-4 space-y-2 select-none transition-colors ${
        isDark ? "bg-[#141414] border-[#262626]" : "bg-white border-[#cbd5e1]"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#10b981]">
          Google SERP Preview
        </span>
        <span className={`text-[10px] font-mono ${isDark ? "text-[#525252]" : "text-[#94a3b8]"}`}>
          SEO & GEO Live Preview
        </span>
      </div>

      <div className="bg-white p-4 rounded-lg text-black space-y-1 font-sans shadow-inner border border-[#e2e8f0]">
        <div className="text-[12px] text-[#202124] truncate flex items-center gap-1.5 font-normal">
          <span className="w-4 h-4 rounded-full bg-[#f1f3f4] text-[10px] flex items-center justify-center font-bold text-[#5f6368]">
            kp
          </span>
          <span className="truncate">{baseUrl} › blog › {slug || "example-slug"}</span>
        </div>
        <h3 className="text-base text-[#1a0dab] font-medium hover:underline cursor-pointer leading-snug truncate">
          {displayTitle}
        </h3>
        <p className="text-xs text-[#4d5156] leading-normal line-clamp-2">
          {displayDesc}
        </p>
      </div>

      <div className={`flex justify-between items-center text-[10px] font-mono pt-1 ${isDark ? "text-[#737373]" : "text-[#64748b]"}`}>
        <span>Title Length: {displayTitle.length} chars (Optimal: 50-60)</span>
        <span>Desc Length: {displayDesc.length} chars (Optimal: 120-160)</span>
      </div>
    </div>
  );
}
