import { useTheme } from "../context/ThemeContext";
import { Github } from "lucide-react";

const Hero = () => {
  const { theme } = useTheme();

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center pt-20 pb-10"
    >
      <div className="max-w-2xl w-full text-left space-y-6">
        {/* Name */}
        <h1
          className={`font-mono text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight ${
            theme === "dark" ? "text-white" : "text-[#0a0a0a]"
          }`}
        >
          Krishna Panthi
        </h1>

        {/* SEO hidden text */}
        <h2 className="sr-only">Krishna Panthi - Full Stack Developer Portfolio</h2>

        {/* Tagline */}
        <p
          className={`text-lg sm:text-xl leading-relaxed max-w-lg ${
            theme === "dark" ? "text-[#a3a3a3]" : "text-[#737373]"
          }`}
        >
          full-stack developer building things for the web.
          <br />
          focused on{" "}
          <span className="text-[#10b981]">React</span>,{" "}
          <span className="text-[#10b981]">Node.js</span>,{" "}
          <span className="text-[#10b981]">Next.js</span>,{" "}
          <span className="text-[#10b981]">TypeScript</span>,{" "}
          and{" "}
          <span className="text-[#10b981]">PostgreSQL</span>.
        </p>

        {/* Status */}
        <p
          className={`font-mono text-sm ${
            theme === "dark" ? "text-[#525252]" : "text-[#a3a3a3]"
          }`}
        >
          {"// currently open to opportunities"}
        </p>

        {/* Links */}
        <div className="flex items-center gap-6 pt-2">
          <a
            href="https://github.com/krishnapanthee"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-sm font-mono transition-colors ${
              theme === "dark"
                ? "text-[#a3a3a3] hover:text-[#10b981]"
                : "text-[#737373] hover:text-[#10b981]"
            }`}
          >
            <Github size={16} />
            github →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
