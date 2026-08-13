"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { ArrowLeft, Moon, Sun, Plus, Minus, HelpCircle } from "lucide-react";
import Footer from "../../../components/Footer";

export default function BlogArticleClient({ post }) {
  const { theme, toggleTheme } = useTheme();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const hasFaqs = post.faqs && post.faqs.length > 0;

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0a0a0a] text-[#fafafa]" : "bg-[#fafafa] text-[#0a0a0a]"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b ${
          theme === "dark" ? "bg-[#0a0a0a]/80 border-[#1a1a1a]" : "bg-[#fafafa]/80 border-[#eaeaea]"
        }`}
      >
        <div className="max-w-[800px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-mono font-bold text-lg tracking-tight hover:text-[#10b981] transition-colors">
            kp<span className="text-[#10b981]">.</span>
          </Link>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              theme === "dark" ? "hover:bg-[#1a1a1a] text-[#a3a3a3]" : "hover:bg-[#f0f0f0] text-[#525252]"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[800px] mx-auto px-6 py-12">
        <Link
          href="/#writing"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wide text-[#10b981] hover:underline mb-8 group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          back to writing
        </Link>

        {/* Article Header */}
        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">
              {post.category}
            </span>
            <span className={`font-mono text-xs ${theme === "dark" ? "text-[#737373]" : "text-[#888888]"}`}>
              {post.date}
            </span>
            <span className={`font-mono text-xs ${theme === "dark" ? "text-[#525252]" : "text-[#a3a3a3]"}`}>
              • {post.readTime}
            </span>
          </div>

          <h1 className={`text-2xl sm:text-4xl font-bold tracking-tight leading-tight ${theme === "dark" ? "text-[#f5f5f5]" : "text-[#111111]"}`}>
            {post.title}
          </h1>

          <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-[#a3a3a3]" : "text-[#525252]"}`}>
            {post.description}
          </p>

          <hr className={`${theme === "dark" ? "border-[#1a1a1a]" : "border-[#eaeaea]"} pt-2`} />
        </header>

        {/* Article Content */}
        {typeof post.content === "string" ? (
          <article
            className={`prose ${theme === "dark" ? "prose-invert" : ""} max-w-none space-y-6 ${
              theme === "dark" ? "text-[#d4d4d4]" : "text-[#333333]"
            }`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <article className={`space-y-6 ${theme === "dark" ? "text-[#d4d4d4]" : "text-[#333333]"}`}>
            {post.content}
          </article>
        )}

        {/* Article FAQs Section */}
        {hasFaqs && (
          <section className="mt-14 pt-8 border-t border-[#1a1a1a]">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle size={18} className="text-[#10b981]" />
              <h3 className="font-mono text-[#10b981] text-sm tracking-wide">
                frequently asked questions
              </h3>
            </div>

            <div className="space-y-0">
              {post.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`py-4 transition-colors ${
                      idx !== post.faqs.length - 1
                        ? `border-b ${theme === "dark" ? "border-[#1a1a1a]" : "border-[#f0f0f0]"}`
                        : ""
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left flex items-center justify-between gap-4 group py-1"
                    >
                      <span
                        className={`text-base font-medium transition-colors ${
                          theme === "dark" ? "text-[#e5e5e5] group-hover:text-[#10b981]" : "text-[#171717] group-hover:text-[#10b981]"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span className={`font-mono text-xs p-1 transition-colors ${theme === "dark" ? "text-[#525252]" : "text-[#a3a3a3]"}`}>
                        {isOpen ? <Minus size={16} className="text-[#10b981]" /> : <Plus size={16} />}
                      </span>
                    </button>

                    {isOpen && (
                      <p
                        className={`mt-2.5 text-sm leading-relaxed pr-6 animate-fadeIn ${
                          theme === "dark" ? "text-[#a3a3a3]" : "text-[#525252]"
                        }`}
                      >
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Call to action footer */}
        <div
          className={`mt-16 p-6 rounded-xl border ${
            theme === "dark" ? "bg-[#111111] border-[#1a1a1a]" : "bg-[#f5f5f5] border-[#eaeaea]"
          }`}
        >
          <h4 className="font-mono text-sm font-bold mb-2 text-[#10b981]">
            Written by Krishna Panthi
          </h4>
          <p className={`text-sm leading-relaxed mb-4 ${theme === "dark" ? "text-[#a3a3a3]" : "text-[#525252]"}`}>
            Full-stack developer from Nepal crafting clean, high-performance web applications. Feel free to explore more of my work or get in touch.
          </p>
          <Link
            href="/#contact"
            className="inline-block font-mono text-xs px-4 py-2 rounded bg-[#10b981] text-black font-semibold hover:bg-[#059669] transition-colors"
          >
            Get In Touch →
          </Link>
        </div>
      </main>

      <div className="max-w-[800px] mx-auto px-6">
        <Footer />
      </div>
    </div>
  );
}
