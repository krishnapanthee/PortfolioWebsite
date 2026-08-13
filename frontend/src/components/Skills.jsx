"use client";

import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import { Code2, Database, Terminal, Cpu } from "lucide-react";

const Skills = ({ data }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isDark = theme === "dark";

  const defaultCategories = [
    {
      title: "frontend",
      skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
      title: "backend",
      skills: ["Node.js", "Express", "Prisma"],
    },
    {
      title: "databases",
      skills: ["PostgreSQL", "MongoDB"],
    },
    {
      title: "tools",
      skills: ["Github", "Vercel", "Postman", "Docker", "Figma", "NGINX", "Linux", "Redis", "Ubuntu"],
    },
  ];

  const categoryIcons = {
    frontend: Code2,
    backend: Cpu,
    databases: Database,
    tools: Terminal,
  };

  const skillCategories = data?.length
    ? data.map((item) => ({ title: item.category, skills: item.skills }))
    : defaultCategories;

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

  return (
    <section id="skills" ref={sectionRef} className="py-10 sm:py-14">
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        <div className="flex items-center gap-2 mb-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#10b981]">
            Technical Skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillCategories.map((cat, index) => {
            const IconComponent = categoryIcons[cat.title.toLowerCase()] || Code2;

            return (
              <div
                key={index}
                className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                  isDark
                    ? "bg-[#111111]/80 border-[#222222] hover:border-[#10b981]/40 hover:bg-[#141414]"
                    : "bg-white/90 border-[#e2e8f0] hover:border-[#10b981]/50 hover:bg-[#f8fafc]"
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-inherit">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-xl ${
                        isDark ? "bg-[#1a1a1a] text-[#10b981]" : "bg-[#f1f5f9] text-[#059669]"
                      }`}
                    >
                      <IconComponent size={16} />
                    </div>
                    <h3
                      className={`font-mono text-xs font-bold uppercase tracking-wider ${
                        isDark ? "text-[#e5e5e5]" : "text-[#0f172a]"
                      }`}
                    >
                      {cat.title}
                    </h3>
                  </div>
                  <span
                    className={`font-mono text-[11px] px-2 py-0.5 rounded-full ${
                      isDark ? "bg-[#1c1c1c] text-[#737373]" : "bg-[#f1f5f9] text-[#64748b]"
                    }`}
                  >
                    {cat.skills.length} skills
                  </span>
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`font-mono text-xs px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-default ${
                        isDark
                          ? "bg-[#171717] border-[#262626] text-[#d4d4d4] hover:border-[#10b981]/60 hover:text-[#10b981] hover:bg-[#10b981]/10"
                          : "bg-[#f8fafc] border-[#cbd5e1] text-[#334155] hover:border-[#10b981]/60 hover:text-[#059669] hover:bg-[#10b981]/10"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
