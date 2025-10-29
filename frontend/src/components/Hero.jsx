import { useTheme } from "../context/ThemeContext";
import heroImg from "../assets/imgPortfolio-oXRpLsjI.png";

const Hero = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`flex ${
        theme === "dark" ? "bg-[#090909]" : "bg-gray-50"
      } justify-center w-full mt-12 sm:mt-14 md:mt-16 transition-colors duration-300`}
    >
      {/* Hero Container */}
      <div className="relative rounded-xl max-w-[1200px] w-full p-4 sm:p-5 md:p-6 z-[1]">
        {/* Hero Section */}
        <div
          id="home"
          className="flex flex-col md:flex-row items-center justify-between text-center md:text-left px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] gap-8 sm:gap-10 md:gap-10"
        >
          {/* Profile Image - Top on Mobile */}
          <div className="flex justify-center items-center w-full md:hidden order-1 animate-fadeInScale">
            <img
              src={heroImg}
              alt="Developer Profile"
              className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] rounded-full object-cover border-4 border-orange-500 shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Left Text Section */}
          <div className="flex-1 max-w-full md:pl-4 lg:pl-8 order-2 md:order-1">
            {/* Greeting */}
            <h3
              className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              } transition-colors duration-300 animate-fadeInUp opacity-0`}
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              Hi, I'm
            </h3>

            {/* Name */}
            <h1
              className={`text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              } transition-colors duration-300 leading-tight animate-fadeInUp opacity-0`}
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              <span className="text-orange-500 animate-shimmer bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent bg-[length:200%_100%]">
                Krishna Panthi
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-base sm:text-lg md:text-xl lg:text-2xl mt-2 sm:mt-3 md:mt-4 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              } transition-colors duration-300 animate-fadeInUp opacity-0`}
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              Aspiring Web Developer
            </p>

            {/* Call-to-Action Buttons */}
            <div
              className="mt-6 sm:mt-7 md:mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 animate-fadeInUp opacity-0"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              {/* GitHub Button */}
              <a
                href="https://github.com/krishnapanthee"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 bg-orange-500 text-white text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600 shadow-md hover:shadow-lg"
              >
                View GitHub
              </a>

              {/* Download Resume Button */}
              <a
                href="/resume.pdf"
                download="Krishna_Panthi_Resume.pdf"
                className="inline-block px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 bg-orange-500 text-white text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600 shadow-md hover:shadow-lg"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Right Image Section - Hidden on Mobile, Visible on Desktop */}
          <div className="hidden md:flex flex-1 justify-center items-center order-3 md:order-2 animate-fadeInScale">
            <img
              src={heroImg}
              alt="Developer Profile"
              className="w-[280px] h-[280px] lg:w-[320px] lg:h-[320px] rounded-full object-cover border-4 border-orange-500 shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
