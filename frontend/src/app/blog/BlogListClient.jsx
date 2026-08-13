"use client";

import Link from "next/link";
import { useTheme } from "../../context/ThemeContext";
import { ArrowLeft, ArrowUpRight, Moon, Sun } from "lucide-react";
import Footer from "../../components/Footer";

export default function BlogListClient({ posts }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#0a0a0a] text-[#fafafa]"
          : "bg-[#fafafa] text-[#0a0a0a]"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b ${
          theme === "dark"
            ? "bg-[#0a0a0a]/80 border-[#1a1a1a]"
            : "bg-[#fafafa]/80 border-[#eaeaea]"
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
            className={`p-2 rounded-lg transition-colors ${
              theme === "dark"
                ? "hover:bg-[#1a1a1a] text-[#a3a3a3]"
                : "hover:bg-[#f0f0f0] text-[#525252]"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
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
          <p className="font-mono text-sm mb-2 text-[#10b981]">writing</p>
          <h1 className="text-3xl font-bold tracking-tight">
            Articles & Technical Insights
          </h1>
        </div>

        {/* Post list */}
        <div className="space-y-0">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group w-full text-left grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-8 py-6 transition-colors ${
                index !== posts.length - 1
                  ? `border-b ${
                      theme === "dark" ? "border-[#1a1a1a]" : "border-[#f0f0f0]"
                    }`
                  : ""
              }`}
            >
              {/* Date & Read time */}
              <div className="pt-0.5">
                <p
                  className={`font-mono text-xs tracking-wide ${
                    theme === "dark" ? "text-[#525252]" : "text-[#a3a3a3]"
                  }`}
                >
                  {post.date}
                </p>
                <p
                  className={`font-mono text-[11px] mt-0.5 ${
                    theme === "dark" ? "text-[#333]" : "text-[#d4d4d4]"
                  }`}
                >
                  {post.readTime}
                </p>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <h3
                  className={`font-medium text-base flex items-center gap-1.5 transition-colors ${
                    theme === "dark"
                      ? "text-[#e5e5e5] group-hover:text-[#10b981]"
                      : "text-[#171717] group-hover:text-[#10b981]"
                  }`}
                >
                  {post.title}
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
                  />
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    theme === "dark" ? "text-[#a3a3a3]" : "text-[#525252]"
                  }`}
                >
                  {post.description}
                </p>
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
