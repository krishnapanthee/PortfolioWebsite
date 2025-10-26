import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import consultancyImage from "../assets/consultancy.png";

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

  const projects = [
    {
      image: consultancyImage,
      title: "Consultancy Website",
      description:
        "A professional education consultancy website designed to connect students with top universities and streamline admission guidance.",
      github: "https://github.com/krishnapanthee/EduConsultancy",
      demo: "https://edu-consultancy.vercel.app/",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  // Detect if device is touch (mobile/tablet)
  useEffect(() => {
    const checkTouch = () =>
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // Remove auto-advance: only change on dot click or swipe

  // Mobile: allow horizontal scroll, Desktop: show one project at a time
  return (
    <div
      id="projects"
      ref={sectionRef}
      className={`py-16 sm:py-20 md:py-24 px-6 sm:px-8 ${
        theme === "dark" ? "bg-black" : "bg-white"
      } transition-colors duration-300`}
    >
      {/* Section Title */}
      <div
        className={`text-center mb-12 sm:mb-14 md:mb-16 ${
          isVisible ? "animate-fadeInDown" : "opacity-0"
        }`}
      >
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          } transition-colors duration-300`}
        >
          My <span className="text-orange-500">Projects</span>
        </h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto mt-3 animate-expandWidth"></div>
      </div>
      {isTouch ? (
        // Mobile: horizontal scrollable cards
        <div
          className={`flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-1 sm:mx-0 ${
            isVisible ? "animate-fadeIn" : "opacity-0"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="flex-shrink-0 w-[90vw] max-w-[350px] min-w-[260px] snap-center"
            >
              <ProjectItem
                {...project}
                theme={theme}
                isVisible={isVisible}
                index={index}
              />
            </div>
          ))}
        </div>
      ) : (
        // Desktop: show one project at a time, static until dot click
        <div
          className={`flex justify-center items-center min-h-[480px] sm:min-h-[520px] ${
            isVisible ? "animate-fadeIn" : "opacity-0"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="relative w-full flex justify-center items-center">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`transition-all duration-500 w-full ${
                  index === currentIndex
                    ? "opacity-100 block"
                    : "opacity-0 hidden"
                }`}
              >
                <ProjectItem
                  {...project}
                  theme={theme}
                  isVisible={isVisible}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Pagination dots (desktop only) */}
      {!isTouch && (
        <div
          className={`flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-10 ${
            isVisible ? "animate-fadeInUp" : "opacity-0"
          }`}
          style={{ animationDelay: "0.4s" }}
        >
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-orange-500 w-8 sm:w-10"
                  : `${
                      theme === "dark"
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    } w-2.5 sm:w-3`
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectItem = ({
  image,
  title,
  description,
  github,
  demo,
  theme,
  isVisible,
  index,
}) => {
  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      } rounded-xl p-5 sm:p-6 md:p-8 w-full max-w-[95%] sm:max-w-[600px] md:max-w-[700px] min-h-[440px] sm:min-h-[460px] flex flex-col items-center mx-auto transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
        theme === "dark"
          ? "hover:shadow-orange-500/20"
          : "hover:shadow-orange-500/30"
      }`}
    >
      {/* Image */}
      <div className="w-full overflow-hidden rounded-lg group">
        <img
          src={image}
          alt={title}
          className="w-full h-[180px] sm:h-[200px] md:h-[220px] object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Title */}
      <h3
        className={`text-xl sm:text-2xl font-bold mt-4 sm:mt-5 text-center ${
          theme === "dark" ? "text-white" : "text-gray-900"
        } transition-colors duration-300`}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={`${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        } text-center text-sm sm:text-base mt-2 sm:mt-3 flex-1 leading-relaxed transition-colors duration-300`}
      >
        {description}
      </p>

      {/* Links */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-5 sm:mt-6 w-full sm:w-auto">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 sm:py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 text-sm sm:text-base text-center hover:scale-105 hover:shadow-lg"
        >
          View Code
        </a>
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-6 py-2.5 sm:py-3 ${
            theme === "dark"
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-white hover:bg-gray-100"
          } border-2 border-orange-500 text-orange-500 font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base text-center hover:scale-105 hover:shadow-lg`}
        >
          Live Demo
        </a>
      </div>
    </div>
  );
};

export default Projects;
