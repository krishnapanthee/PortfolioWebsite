"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

const Projects = ({ data }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isDark = theme === "dark";

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
    <section id="projects" ref={sectionRef} className="py-10 sm:py-14">
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#10b981]">
              Featured Projects
            </p>
          </div>
          <a
            href="https://github.com/krishnapanthee"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-mono text-xs font-medium tracking-tight transition-colors flex items-center gap-1 ${
              isDark ? "text-[#a3a3a3] hover:text-[#10b981]" : "text-[#475569] hover:text-[#10b981]"
            }`}
          >
            <span>GitHub Profile</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {projects.map((project, index) => (
            <div
              key={project._id || index}
              className={`group p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col justify-between gap-4 ${
                isDark
                  ? "bg-[#111111]/80 border-[#222222] hover:border-[#10b981]/40 hover:bg-[#141414]"
                  : "bg-white/90 border-[#e2e8f0] hover:border-[#10b981]/50 hover:bg-[#f8fafc]"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <h3
                    className={`font-semibold text-lg tracking-tight transition-colors ${
                      isDark ? "text-[#e5e5e5] group-hover:text-[#10b981]" : "text-[#0f172a] group-hover:text-[#059669]"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isDark
                            ? "border-[#262626] text-[#a3a3a3] hover:text-white hover:border-[#404040]"
                            : "border-[#cbd5e1] text-[#475569] hover:text-[#0f172a]"
                        }`}
                        title="View Source Code"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isDark
                            ? "border-[#262626] text-[#10b981] hover:bg-[#10b981]/10"
                            : "border-[#cbd5e1] text-[#059669] hover:bg-[#10b981]/10"
                        }`}
                        title="Visit Live Application"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-[#a3a3a3]" : "text-[#64748b]"}`}>
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-inherit">
                {(project.technologies || []).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className={`font-mono text-[11px] px-2.5 py-0.5 rounded-md ${
                      isDark ? "bg-[#1c1c1c] text-[#a3a3a3]" : "bg-[#f1f5f9] text-[#475569]"
                    }`}
                  >
                    {tech}
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

export default Projects;
