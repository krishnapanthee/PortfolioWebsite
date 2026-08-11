import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";

const Education = () => {
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

  const educationList = [
    {
      degree: "Bachelor in Computer Science & Information Technology (BSc CSIT)",
      institution: "Trinity International College, Kathmandu",
      period: "Nov 2023 — Present",
    },
  ];

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-10 sm:py-12"
    >
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        {/* Section label */}
        <p className="font-mono text-sm mb-4 text-[#10b981]">
          education
        </p>

        {/* Education list */}
        <div className="space-y-0">
          {educationList.map((edu, index) => (
            <div
              key={index}
              className={`group grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-8 py-6 ${
                index !== educationList.length - 1
                  ? `border-b ${theme === "dark" ? "border-[#1a1a1a]" : "border-[#f0f0f0]"}`
                  : ""
              }`}
            >
              {/* Period */}
              <p
                className={`font-mono text-xs tracking-wide ${
                  theme === "dark" ? "text-[#525252]" : "text-[#a3a3a3]"
                } pt-1`}
              >
                {edu.period}
              </p>

              {/* Content */}
              <div className="space-y-1.5">
                <h3
                  className={`font-medium text-base ${
                    theme === "dark" ? "text-[#e5e5e5]" : "text-[#171717]"
                  }`}
                >
                  {edu.degree}
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-[#a3a3a3]" : "text-[#525252]"
                  }`}
                >
                  {edu.institution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
