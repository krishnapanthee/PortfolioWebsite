"use client";

import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Briefcase } from "lucide-react";

const Experience = ({ data }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isDark = theme === "dark";

  const defaultExperiences = [
    {
      role: "Technical Lead",
      company: "Techsapana",
      companyUrl: null,
      period: "Jan 2026 — Jun 2026",
      bullets: [
        "Coordinated end-to-end delivery of digital projects.",
        "Tracked milestones and planned development.",
        "Collaborated with developers, designers and stakeholders.",
        "Maintained technical documentation.",
        "Supported QA, testing and deployments.",
        "Improved application performance.",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "Uddheshya Group",
      companyUrl: null,
      period: "Jan 2025 — Dec 2025",
      bullets: [
        "Developed scalable web applications.",
        "Collaborated with cross-functional teams.",
        "Performed API testing and documentation.",
        "Implemented authentication and REST APIs.",
        "Participated in Agile meetings.",
      ],
    },
  ];

  const experiences = data?.length ? data : defaultExperiences;

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

  const formatCompanyUrl = (url) => {
    if (!url) return null;
    const trimmed = url.trim();
    if (!trimmed) return null;
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  return (
    <section id="experience" ref={sectionRef} className="py-10 sm:py-14">
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        <div className="flex items-center gap-2 mb-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#10b981]">
            Work Experience
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {experiences.map((exp, index) => {
            const formattedUrl = formatCompanyUrl(exp.companyUrl);

            return (
              <div
                key={exp._id || index}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg space-y-4 ${isDark
                  ? "bg-[#111111]/80 border-[#222222] hover:border-[#10b981]/40 hover:bg-[#141414]"
                  : "bg-white/90 border-[#e2e8f0] hover:border-[#10b981]/50 hover:bg-[#f8fafc]"
                  }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-xl ${isDark ? "bg-[#1a1a1a] text-[#10b981]" : "bg-[#f1f5f9] text-[#059669]"
                        }`}
                    >
                      <Briefcase size={16} />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-base sm:text-lg ${isDark ? "text-[#e5e5e5]" : "text-[#0f172a]"}`}>
                        {exp.role}{" "}
                        <span className="text-[#10b981] font-normal">•</span>{" "}
                        {formattedUrl ? (
                          <a
                            href={formattedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#10b981] hover:underline font-semibold transition-colors"
                          >
                            <span>{exp.company}</span>
                            <ArrowUpRight size={14} />
                          </a>
                        ) : (
                          <span className={isDark ? "text-[#a3a3a3]" : "text-[#475569]"}>{exp.company}</span>
                        )}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`font-mono text-xs px-3 py-1 rounded-full self-start sm:self-auto ${isDark ? "bg-[#1c1c1c] text-[#737373]" : "bg-[#f1f5f9] text-[#64748b]"
                      }`}
                  >
                    {exp.period}
                  </span>
                </div>

                {exp.bullets && (
                  <ul className="space-y-2 text-xs sm:text-sm pl-2">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] mt-2 flex-shrink-0"></span>
                        <span className={`leading-relaxed ${isDark ? "text-[#a3a3a3]" : "text-[#64748b]"}`}>
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
