"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { ArrowUpRight } from "lucide-react";

const Projects = ({ data }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const defaultProjects = [
    {
      title: "Hostel Sarathi",
      description: "Smart hostel discovery platform that simplifies room searching and booking for students in Nepal.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      githubUrl: "https://github.com/krishnapanthee/HostelSarathi",
      demoUrl: "https://hostelsarathi.com/",
    },
    {
      title: "Uddfy",
      description: "Nepal-focused platform helping students discover and apply for scholarships through a centralized system.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      githubUrl: "https://github.com/sujan-0/EDU_SCH",
      demoUrl: "https://uddfy.com/",
    },
  ];

  const projects = data?.length ? data : defaultProjects;

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

  return (
    <section id="projects" ref={sectionRef} className="py-10 sm:py-12">
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        <p className="font-mono text-sm mb-4 text-[#10b981]">projects</p>

        <div className="space-y-0">
          {projects.map((project, index) => (
            <a
              key={project._id || index}
              href={project.demoUrl || project.githubUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`group grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-8 gap-y-2 py-5 transition-colors ${
                index !== projects.length - 1
                  ? `border-b ${theme === "dark" ? "border-[#1a1a1a]" : "border-[#f0f0f0]"}`
                  : ""
              }`}
            >
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
                <p className={`text-sm leading-relaxed ${theme === "dark" ? "text-[#737373]" : "text-[#737373]"}`}>
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap gap-1.5 items-start pt-0.5">
                {(project.technologies || []).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className={`font-mono text-[11px] px-2 py-0.5 rounded whitespace-nowrap ${
                      theme === "dark" ? "bg-[#171717] text-[#525252]" : "bg-[#f5f5f5] text-[#a3a3a3]"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8">
          <a
            href="https://github.com/krishnapanthee"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-mono text-xs transition-colors ${
              theme === "dark" ? "text-[#525252] hover:text-[#10b981]" : "text-[#a3a3a3] hover:text-[#10b981]"
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
