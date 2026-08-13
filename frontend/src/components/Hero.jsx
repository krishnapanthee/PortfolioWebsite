"use client";

import { useTheme } from "../context/ThemeContext";
import { Github, FileText } from "lucide-react";

const Hero = ({ data }) => {
  const { theme } = useTheme();

  const name = data?.name || "Krishna Panthi";
  const tagline = "full-stack developer building things for the web. focused on ";
  const techHighlights = data?.techHighlights?.length
    ? data.techHighlights
    : ["React", "Node.js", "Next.js", "TypeScript", "PostgreSQL"];
  const statusText = data?.statusText || "// currently open to opportunities";
  const githubUrl = data?.githubUrl || "https://github.com/krishnapanthee";
  const resumeUrl = data?.resumeUrl || "";

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center pt-20 pb-10"
    >
      <div className="max-w-2xl w-full text-left space-y-6">
        {/* Name */}
        <h1
          className={`font-mono text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-[#0a0a0a]"
            }`}
        >
          {name}
        </h1>

        {/* SEO hidden text */}
        <h2 className="sr-only">{name} - Full Stack Developer Portfolio</h2>

        {/* Tagline */}
        <p
          className={`text-lg sm:text-xl leading-relaxed max-w-lg ${theme === "dark" ? "text-[#a3a3a3]" : "text-[#737373]"
            }`}
        >
          {tagline}{" "}
          {techHighlights.map((tech, idx) => (
            <span key={idx}>
              <span className="text-[#10b981] font-mono font-medium">{tech}</span>
              {idx < techHighlights.length - 1 ? (idx === techHighlights.length - 2 ? ", and " : ", ") : "."}
            </span>
          ))}
        </p>

        {/* Status */}
        <p
          className={`font-mono text-sm font-medium tracking-tight ${theme === "dark" ? "text-[#a3a3a3]" : "text-[#525252]"
            }`}
        >
          {statusText}
        </p>

        {/* Links */}
        <div className="flex items-center gap-6 pt-2">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-sm font-mono font-medium tracking-tight transition-colors ${theme === "dark"
              ? "text-[#e5e5e5] hover:text-[#10b981]"
              : "text-[#171717] hover:text-[#10b981]"
              }`}
          >
            <Github size={16} />
            github →
          </a>

          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 text-sm font-mono font-medium tracking-tight transition-colors ${theme === "dark"
                ? "text-[#e5e5e5] hover:text-[#10b981]"
                : "text-[#171717] hover:text-[#10b981]"
                }`}
            >
              <FileText size={16} />
              resume / cv →
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
