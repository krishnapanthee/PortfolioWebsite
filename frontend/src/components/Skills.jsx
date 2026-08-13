"use client";

import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";

const Skills = ({ data }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
    <section id="skills" ref={sectionRef} className="py-10 sm:py-12">
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        <p className="font-mono text-sm mb-4 text-[#10b981]">skills</p>

        <div className="space-y-6">
          {skillCategories.map((cat, index) => (
            <div key={index} className="space-y-2">
              <h3 className={`font-mono text-xs ${theme === "dark" ? "text-[#525252]" : "text-[#a3a3a3]"}`}>
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`font-mono text-xs px-2.5 py-1 rounded transition-colors ${
                      theme === "dark"
                        ? "bg-[#171717] text-[#d4d4d4] hover:text-[#10b981] border border-[#262626]"
                        : "bg-[#f5f5f5] text-[#404040] hover:text-[#10b981] border border-[#e5e5e5]"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
