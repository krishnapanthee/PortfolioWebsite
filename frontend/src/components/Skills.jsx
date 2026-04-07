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

  const skills = [
    {
      name: "HTML",
      percentage: 90,
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS",
      percentage: 80,
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "JavaScript",
      percentage: 75,
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      percentage: 70,
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "React",
      percentage: 70,
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Next.js",
      percentage: 70,
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Node.js",
      percentage: 75,
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express",
      percentage: 70,
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    },

    {
      name: "Prisma",
      percentage: 65,
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    },
    {
      name: "PostgreSQL",
      percentage: 65,
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "MongoDB",
      percentage: 75,
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
  ];

  const categories = [
    {
      title: "Frontend",
      skills: skills.filter(s => ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"].includes(s.name))
    },
    {
      title: "Backend",
      skills: skills.filter(s => ["Node.js", "Express", "JWT", "Prisma"].includes(s.name))
    },
    {
      title: "Database",
      skills: skills.filter(s => ["PostgreSQL", "MongoDB"].includes(s.name))
    }
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      id="skills"
      ref={sectionRef}
      className={`py-8 sm:py-12 md:py-16 px-6 sm:px-8 ${theme === "dark" ? "bg-black" : "bg-white"
        } transition-colors duration-300 overflow-hidden`}
    >
      {/* Section Title */}
      <div
        className={`text-center mb-12 sm:mb-14 md:mb-16 ${isVisible ? "animate-fadeInDown" : "opacity-0"
          }`}
      >
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"
            } transition-colors duration-300`}
        >
          My <span className="text-orange-500">Skills</span>
        </h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto mt-3 animate-expandWidth"></div>
      </div>

      {/* Tab Navigation */}
      <div className={`flex justify-center gap-2 sm:gap-4 mb-10 sm:mb-12 ${isVisible ? "animate-fadeIn" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
        {categories.map((cat, index) => (
          <button
            key={cat.title}
            onClick={() => setActiveTab(index)}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${activeTab === index
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105"
              : theme === "dark"
                ? "bg-gray-900 text-gray-400 hover:bg-gray-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Skills Tab Content */}
      <div className="max-w-[1000px] mx-auto min-h-[300px]">
        <div
          key={activeTab}
          className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 animate-fadeInScale"
        >
          {categories[activeTab].skills.map((skill, index) => (
            <div
              key={skill.name}
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "forwards" }}
            >
              <SkillCard
                skill={skill}
                theme={theme}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SkillCard = ({ skill, theme }) => {
  return (
    <div
      className={`relative w-32 h-32 sm:w-40 sm:h-40 flex flex-col items-center justify-center gap-2 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        } rounded-xl p-4 transition-all duration-300 hover:scale-110 hover:shadow-xl ${theme === "dark"
          ? "hover:shadow-orange-500/20"
          : "hover:shadow-orange-500/30"
        } cursor-default group`}
    >
      <div className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] sm:text-xs font-bold rounded-full w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
        {skill.percentage}%
      </div>

      <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 transition-transform duration-300 group-hover:rotate-6">
        <img
          src={skill.logo}
          alt={`${skill.name} logo`}
          className={`w-full h-full object-contain ${theme === "dark" &&
            (skill.name === "Express" || skill.name === "Next.js")
            ? "invert"
            : ""
            }`}
        />
      </div>

      <h3
        className={`text-xs sm:text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"
          } text-center transition-colors duration-300 mt-2`}
      >
        {skill.name}
      </h3>
    </div>
  );
};

export default Skills;
