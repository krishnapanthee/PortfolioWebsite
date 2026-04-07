import { useTheme } from "../context/ThemeContext";
import heroImg from "../assets/imgPortfolio.png";
import { Github, FileText, ArrowDown } from "lucide-react";

const Hero = () => {
  const { theme } = useTheme();

  return (
    <div
      id="home"
      className={`relative min-h-[85vh] py-12 flex flex-col items-center justify-center px-6 transition-colors duration-500 ${theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"
        }`}
    >
      {/* Subtle organic gradient blob */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none z-0`}></div>

      <div className="relative z-10 max-w-3xl w-full text-center flex flex-col items-center space-y-8">

        {/* Profile Image with subtle organic feel */}
        <div className="relative group animate-fadeInUp">
          <div className="absolute -inset-1 bg-gradient-to-tr from-orange-500 to-orange-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className={`relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 transition-all duration-500 ${theme === "dark" ? "border-gray-800" : "border-gray-100"
            } group-hover:border-orange-500`}>
            <img
              src={heroImg}
              alt="Krishna Panthi"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Introduction */}
        <div className="space-y-4">
          <h3 className=" text-sm sm:text-base font-bold tracking-[0.2em] uppercase animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            Hi, I'm
          </h3>
          <h1 className="text-4xl text-orange-500 sm:text-6xl md:text-7xl font-bold tracking-tight animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            Krishna Panthi
          </h1>
          <p className={`text-lg sm:text-l md:text-xl max-w-xl mx-auto leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-500"
            } animate-fadeInUp`} style={{ animationDelay: "0.3s" }}>
            Full-Stack Developer passionate about building <span className="text-orange-500">modern</span>, efficient, and user-centric web applications.
          </p>
        </div>

        {/* Clean CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
          <a
            href="https://github.com/krishnapanthee"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-orange-500 text-white rounded-full font-bold transition-all hover:bg-orange-600 hover:scale-105 shadow-lg shadow-orange-500/20"
          >
            <Github size={20} />
            GitHub
          </a>

          <a
            href="/resume.pdf"
            download
            className={`flex items-center justify-center gap-2 px-8 py-3.5 border rounded-full font-bold transition-all hover:scale-105 ${theme === "dark"
              ? "border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-white"
              : "border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900"
              }`}
          >
            <FileText size={20} />
            Resume
          </a>
        </div>
      </div>


    </div>
  );
};

export default Hero;
