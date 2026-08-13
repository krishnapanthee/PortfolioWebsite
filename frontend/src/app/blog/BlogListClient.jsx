"use client";

import Link from "next/link";
import { useTheme } from "../../context/ThemeContext";
import { ArrowLeft, ArrowUpRight, Moon, Sun, Calendar, Clock } from "lucide-react";
import Footer from "../../components/Footer";

export default function BlogListClient({ posts }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        isDark ? "bg-[#0a0a0a] text-[#fafafa]" : "bg-[#fafafa] text-[#0a0a0a]"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b ${
          isDark ? "bg-[#0a0a0a]/80 border-[#1a1a1a]" : "bg-[#fafafa]/80 border-[#eaeaea]"
        }`}
      >
        <div className="max-w-[800px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono font-bold text-lg tracking-tight hover:text-[#10b981] transition-colors"
          >
            kp<span className="text-[#10b981]">.</span>
          </Link>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl transition-all border cursor-pointer ${
              isDark
                ? "bg-[#141414] border-[#222222] text-[#a3a3a3] hover:text-white"
                : "bg-[#f1f5f9] border-[#cbd5e1] text-[#475569] hover:text-[#0f172a]"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} className="text-[#f59e0b]" /> : <Moon size={16} className="text-[#6366f1]" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[800px] mx-auto px-6 py-12">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wide text-[#10b981] hover:underline mb-8 group"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          back to home
        </Link>

        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <p className="font-mono text-xs uppercase tracking-wider text-[#10b981]">Writing</p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Articles & Technical Insights
          </h1>
          <p className={`text-sm mt-2 ${isDark ? "text-[#a3a3a3]" : "text-[#64748b]"}`}>
            Thoughtful write-ups on backend engineering, system architecture, web development, and software design.
          </p>
        </div>

        {/* Post list */}
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post, index) => (
            <Link
              key={post.slug || index}
              href={`/blog/${post.slug}`}
              className={`group p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl flex flex-col sm:flex-row justify-between sm:items-center gap-5 ${
                isDark
                  ? "bg-[#111111]/90 border-[#222222] hover:border-[#10b981]/40 hover:bg-[#141414]"
                  : "bg-white border-[#e2e8f0] hover:border-[#10b981]/50 hover:bg-[#f8fafc]"
              }`}
            >
              <div className="space-y-2.5 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                      isDark ? "bg-[#1c1c1c] text-[#a3a3a3]" : "bg-[#f1f5f9] text-[#475569]"
                    }`}
                  >
                    <Calendar size={11} className="text-[#10b981]" />
                    <span>{post.date}</span>
                  </span>
                  {post.readTime && (
                    <span
                      className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                        isDark ? "bg-[#1c1c1c] text-[#737373]" : "bg-[#f1f5f9] text-[#64748b]"
                      }`}
                    >
                      <Clock size={11} />
                      <span>{post.readTime}</span>
                    </span>
                  )}
                </div>

                <h2
                  className={`font-semibold text-lg tracking-tight flex items-center gap-2 transition-colors ${
                    isDark
                      ? "text-[#e5e5e5] group-hover:text-[#10b981]"
                      : "text-[#0f172a] group-hover:text-[#059669]"
                  }`}
                >
                  {post.title}
                </h2>

                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-[#a3a3a3]" : "text-[#64748b]"
                  }`}
                >
                  {post.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-mono font-medium text-[#10b981] group-hover:translate-x-1 transition-transform self-end sm:self-center">
                <span>Read Article</span>
                <ArrowUpRight size={15} />
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <div className="max-w-[800px] mx-auto px-6">
        <Footer />
      </div>
    </div>
  );
}
