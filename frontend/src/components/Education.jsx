"use client";

import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import { GraduationCap } from "lucide-react";

const Education = ({ data }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isDark = theme === "dark";

  const defaultEducation = [
    {
      degree: "BSc (Hons) Computer Science",
      institution: "Saipal Academy",
      period: "2022 — Present",
    },
  ];

  const educationList = data?.length ? data : defaultEducation;

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
    <section id="education" ref={sectionRef} className="py-10 sm:py-14">
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        <div className="flex items-center gap-2 mb-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#10b981]">
            Education & Qualifications
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {educationList.map((edu, index) => (
            <div
              key={edu._id || index}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDark
                  ? "bg-[#111111]/80 border-[#222222] hover:border-[#10b981]/40 hover:bg-[#141414]"
                  : "bg-white/90 border-[#e2e8f0] hover:border-[#10b981]/50 hover:bg-[#f8fafc]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl ${
                    isDark ? "bg-[#1a1a1a] text-[#10b981]" : "bg-[#f1f5f9] text-[#059669]"
                  }`}
                >
                  <GraduationCap size={18} />
                </div>
                <div className="space-y-1">
                  <h3 className={`font-semibold text-base sm:text-lg ${isDark ? "text-[#e5e5e5]" : "text-[#0f172a]"}`}>
                    {edu.degree}
                  </h3>
                  <p className={`text-xs sm:text-sm font-medium ${isDark ? "text-[#a3a3a3]" : "text-[#64748b]"}`}>
                    {edu.institution}
                  </p>
                </div>
              </div>

              <span
                className={`font-mono text-xs px-3 py-1 rounded-full self-start sm:self-auto ${
                  isDark ? "bg-[#1c1c1c] text-[#737373]" : "bg-[#f1f5f9] text-[#64748b]"
                }`}
              >
                {edu.period}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
