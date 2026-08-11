import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";

const Experience = () => {
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

  const experiences = [
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

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-10 sm:py-12"
    >
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        {/* Section label */}
        <p className="font-mono text-sm mb-4 text-[#10b981]">
          experience
        </p>

        {/* Experience list */}
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`group grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-8 py-6 ${
                index !== experiences.length - 1
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
                {exp.period}
              </p>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <h3
                    className={`font-medium text-base ${
                      theme === "dark" ? "text-[#e5e5e5]" : "text-[#171717]"
                    }`}
                  >
                    {exp.role}{" "}
                    <span className={`${theme === "dark" ? "text-[#525252]" : "text-[#a3a3a3]"}`}>·</span>{" "}
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#10b981] hover:underline"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      <span className={`${theme === "dark" ? "text-[#a3a3a3]" : "text-[#737373]"}`}>
                        {exp.company}
                      </span>
                    )}
                  </h3>
                </div>

                {exp.bullets && (
                  <ul className="space-y-1.5 list-disc list-inside text-sm">
                    {exp.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className={`leading-relaxed ${
                          theme === "dark" ? "text-[#a3a3a3]" : "text-[#525252]"
                        }`}
                      >
                        <span className="-ml-1">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
