"use client";

import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { posts as staticPosts } from "../lib/posts";

const Blog = ({ data }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
    <section id="writings" ref={sectionRef} className="py-10 sm:py-12">
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        <p className="font-mono text-sm mb-4 text-[#10b981]">writings</p>

        <div className="space-y-0">
          {posts.map((post, index) => (
            <Link
              key={post.slug || index}
              href={`/blog/${post.slug}`}
              className={`group grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-8 gap-y-2 py-5 transition-colors ${index !== posts.length - 1
                ? `border-b ${theme === "dark" ? "border-[#1a1a1a]" : "border-[#f0f0f0]"}`
                : ""
                }`}
            >
              <div className="space-y-1.5">
                <h3
                  className={`font-medium text-[15px] flex items-center gap-1.5 transition-colors ${theme === "dark"
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
                <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-[#737373]" : "text-[#737373]"}`}>
                  {post.description}
                </p>
              </div>

              <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-2 pt-0.5">
                <span className={`font-mono text-xs ${theme === "dark" ? "text-[#525252]" : "text-[#a3a3a3]"}`}>
                  {post.date}
                </span>
                {post.readTime && (
                  <span className={`font-mono text-[11px] ${theme === "dark" ? "text-[#404040]" : "text-[#d4d4d4]"}`}>
                    {post.readTime}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
