"use client";

import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { posts as staticPosts } from "../lib/posts";

const Blog = ({ data }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isDark = theme === "dark";

  const posts = data?.length ? data : staticPosts;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="writings" ref={sectionRef} className="py-10 sm:py-14">
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#10b981]">
              Writings & Insights
            </p>
          </div>
          <Link
            href="/blog"
            className={`font-mono text-xs transition-colors flex items-center gap-1 ${
              isDark ? "text-[#737373] hover:text-[#10b981]" : "text-[#64748b] hover:text-[#10b981]"
            }`}
          >
            <span>view all articles</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {posts.map((post, index) => (
            <Link
              key={post.slug || index}
              href={`/blog/${post.slug}`}
              className={`group p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col sm:flex-row justify-between sm:items-center gap-4 ${
                isDark
                  ? "bg-[#111111]/80 border-[#222222] hover:border-[#10b981]/40 hover:bg-[#141414]"
                  : "bg-white/90 border-[#e2e8f0] hover:border-[#10b981]/50 hover:bg-[#f8fafc]"
              }`}
            >
              <div className="space-y-2 flex-1">
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

                <h3
                  className={`font-semibold text-base sm:text-lg tracking-tight flex items-center gap-2 transition-colors ${
                    isDark
                      ? "text-[#e5e5e5] group-hover:text-[#10b981]"
                      : "text-[#0f172a] group-hover:text-[#059669]"
                  }`}
                >
                  {post.title}
                </h3>

                <p
                  className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
                    isDark ? "text-[#a3a3a3]" : "text-[#64748b]"
                  }`}
                >
                  {post.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-mono font-medium text-[#10b981] group-hover:translate-x-1 transition-transform self-end sm:self-center">
                <span>Read</span>
                <ArrowUpRight size={15} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
