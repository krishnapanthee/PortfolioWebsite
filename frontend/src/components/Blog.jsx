import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { ArrowUpRight } from "lucide-react";

const Blog = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  const posts = [
    {
      title: "Building Scalable MERN Applications with Clean Architecture",
      description:
        "A practical guide on structuring full-stack Node.js and React codebases for long-term maintainability and scalability.",
      date: "May 2026",
      readTime: "5 min read",
      link: "https://dev.to",
    },
    {
      title: "Optimizing React & Next.js Core Web Vitals for Production",
      description:
        "Key techniques and real-world strategies for improving rendering speed, page performance, and search indexing.",
      date: "Mar 2026",
      readTime: "4 min read",
      link: "https://dev.to",
    },
    {
      title: "Designing Typography-Driven Minimalist Developer Portfolios",
      description:
        "Why typography, whitespace, and clean content structure beat heavy decorative animations for engineering portfolios.",
      date: "Jan 2026",
      readTime: "3 min read",
      link: "https://dev.to",
    },
  ];

  return (
    <section
      id="writing"
      ref={sectionRef}
      className="py-10 sm:py-12"
    >
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        {/* Section label */}
        <p className="font-mono text-sm mb-4 text-[#10b981]">
          writing
        </p>

        {/* Post list */}
        <div className="space-y-0">
          {posts.map((post, index) => (
            <a
              key={index}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-8 py-5 transition-colors ${
                index !== posts.length - 1
                  ? `border-b ${theme === "dark" ? "border-[#1a1a1a]" : "border-[#f0f0f0]"}`
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
                  className={`font-medium text-[15px] flex items-center gap-1.5 transition-colors ${
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
