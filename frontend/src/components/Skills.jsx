import { useTheme } from "../context/ThemeContext";

const Skills = () => {
  const { theme } = useTheme();

  const skills = [
    { 
      name: "HTML", 
      percentage: 90, 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
    },
    { 
      name: "CSS", 
      percentage: 80, 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
    },
    { 
      name: "JavaScript", 
      percentage: 75, 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
    },
    { 
      name: "TypeScript", 
      percentage: 70, 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
    },
    { 
      name: "React", 
      percentage: 70, 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    },
    { 
      name: "Next.js", 
      percentage: 65, 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
    },
    { 
      name: "Node.js", 
      percentage: 75, 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    },
    { 
      name: "Express", 
      percentage: 70, 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
    },
    { 
      name: "MySQL", 
      percentage: 60, 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
    },
    { 
      name: "MongoDB", 
      percentage: 65, 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
    },
  ];

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div
      id="skills"
      className={`py-16 sm:py-20 md:py-24 px-6 sm:px-8 ${
        theme === "dark" ? "bg-black" : "bg-white"
      } transition-colors duration-300 overflow-hidden`}
    >
      {/* Section Title */}
      <div className="text-center mb-12 sm:mb-14 md:mb-16">
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        } transition-colors duration-300`}>
          My <span className="text-orange-500">Skills</span>
        </h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto mt-3"></div>
      </div>
      
      {/* Marquee container */}
      <div className="relative">
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee hover:pause">
            {duplicatedSkills.map((skill, index) => (
              <SkillCard key={`${skill.name}-${index}`} skill={skill} theme={theme} />
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

const SkillCard = ({ skill, theme }) => {
  return (
    <div
      className={`relative flex-shrink-0 mx-3 sm:mx-4 w-44 sm:w-52 flex flex-col items-center gap-3 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      } rounded-xl p-5 sm:p-6 transition-all duration-300 hover:scale-105`}
    >
      <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
        {skill.percentage}%
      </div>
      
      <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mt-2">
        <img 
          src={skill.logo} 
          alt={`${skill.name} logo`}
          className={`w-full h-full object-contain ${
            theme === "dark" && (skill.name === "Express" || skill.name === "Next.js") 
              ? "invert" 
              : ""
          }`}
        />
      </div>
      
      <h3 className={`text-base sm:text-lg font-semibold ${
        theme === "dark" ? "text-white" : "text-gray-800"
      } text-center transition-colors duration-300`}>
        {skill.name}
      </h3>
    </div>
  );
};

export default Skills;