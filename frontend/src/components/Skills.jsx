import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";

const Skills = () => {
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

  const categories = [
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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-10 sm:py-12"
    >
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        {/* Section label */}
        <p className="font-mono text-sm mb-4 text-[#10b981]">
          skills
        </p>

        {/* Skills by category */}
        <div className="space-y-8">
          {categories.map((cat) => (
            <div key={cat.title}>
              <p
                className={`font-mono text-xs tracking-wide mb-3 ${theme === "dark" ? "text-[#525252]" : "text-[#a3a3a3]"
                  }`}
              >
                {cat.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`font-mono text-[13px] px-3 py-1.5 rounded border transition-colors ${theme === "dark"
                      ? "border-[#262626] text-[#a3a3a3] hover:border-[#10b981] hover:text-[#10b981]"
                      : "border-[#e5e5e5] text-[#525252] hover:border-[#10b981] hover:text-[#10b981]"
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
