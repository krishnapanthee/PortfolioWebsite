import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { ArrowUpRight } from "lucide-react";

const Projects = () => {
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
      { threshold: 0.05 }
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

  const projects = [
    {
      title: "Hostel Sarathi",
      description:
        "Smart hostel discovery platform that simplifies room searching and booking for students in Nepal.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/krishnapanthee/HostelSarathi",
      demo: "https://hostelsarathi.com/",
    },
    {
      title: "Uddfy",
      description:
        "Nepal-focused platform helping students discover and apply for scholarships through a centralized system.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/sujan-0/EDU_SCH",
      demo: "https://uddfy.com/",
    },
    {
      title: "Job Blast",
      description:
        "Job posting platform for recruiters with real-time notifications and candidate matching.",
      technologies: ["React", "PostgreSQL", "Prisma", "Node.js"],
      github: "https://github.com/krishnapanthee/job_blast",
      demo: "https://jobblast.vercel.app/",
    },
    {
      title: "EduConsultancy",
      description:
        "Education consultancy platform connecting students with global universities.",
      technologies: ["React", "MongoDB", "Node.js", "Tailwind CSS"],
      github: "https://github.com/krishnapanthee/EduConsultancy",
      demo: "https://edu-consultancy.vercel.app/",
    },
    {
      title: "Salon Nepal",
      description:
        "Salon booking app with service selection, stylist matching, and online appointments.",
      technologies: ["Next.js", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/krishnapanthee/salon-nepal",
      demo: "https://salon-nepal.vercel.app/",
    },
    {
      title: "Rick & Morty Explorer",
      description:
        "Character dashboard with real-time API data, filtering, and pagination.",
      technologies: ["React", "REST API", "Tailwind CSS"],
      github: "https://github.com/krishnapanthee/rickmortyexplorer",
      demo: "https://rickmortyexplorer.vercel.app/",
    },
    {
      title: "Saipal",
      description: "Official website for Saipal Academy.",
      technologies: ["React", "Tailwind CSS"],
      github: "https://github.com/UddheshyaGroup/Saipal-Website",
      demo: "https://saipal.edu.np/",
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-10 sm:py-12"
    >
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        {/* Section label */}
        <p className="font-mono text-sm mb-4 text-[#10b981]">
          projects
        </p>

        {/* Project list */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`group grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-8 gap-y-2 py-5 transition-colors ${
                index !== projects.length - 1
                  ? `border-b ${theme === "dark" ? "border-[#1a1a1a]" : "border-[#f0f0f0]"}`
                  : ""
              }`}
            >
              {/* Left content */}
              <div className="space-y-1.5">
                <h3
                  className={`font-medium text-[15px] flex items-center gap-1.5 transition-colors ${
                    theme === "dark"
                      ? "text-[#e5e5e5] group-hover:text-[#10b981]"
                      : "text-[#171717] group-hover:text-[#10b981]"
                  }`}
                >
                  {project.title}
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
                  />
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    theme === "dark" ? "text-[#737373]" : "text-[#737373]"
                  }`}
                >
                  {project.description}
                </p>
              </div>

              {/* Right: tech tags */}
              <div className="flex flex-wrap sm:flex-nowrap gap-1.5 items-start pt-0.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`font-mono text-[11px] px-2 py-0.5 rounded whitespace-nowrap ${
                      theme === "dark"
                        ? "bg-[#171717] text-[#525252]"
                        : "bg-[#f5f5f5] text-[#a3a3a3]"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* GitHub link */}
        <div className="mt-8">
          <a
            href="https://github.com/krishnapanthee"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-mono text-xs transition-colors ${
              theme === "dark"
                ? "text-[#525252] hover:text-[#10b981]"
                : "text-[#a3a3a3] hover:text-[#10b981]"
            }`}
          >
            view all on github →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
