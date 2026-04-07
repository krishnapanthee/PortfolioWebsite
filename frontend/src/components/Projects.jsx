import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import educonsultancy from "../assets/educonsultancy.png";
import hostelsarathi from "../assets/hostelsarathi.png";
import jobblast from "../assets/jobblast.png";
import rickmortyexplorer from "../assets/rickmortyexplorer.png";
import salonnepal from "../assets/salonnepal.png";
import uddfy from "../assets/uddfy.png";
import saipal from "../assets/saipal.png";

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
      image: uddfy,
      title: "Uddfy",
      description:
        "A Nepal-focused platform that helps students discover and apply for scholarships through a centralized system.",
      github: "https://github.com/sujan-0/EDU_SCH",
      demo: "https://uddfy.com/",
    },
    {
      image: hostelsarathi,
      title: "Hostel Sarathi",
      description:
        "A smart hostel discovery platform that simplifies room searching and booking for students.",
      github: "https://github.com/krishnapanthee/HostelSarathi",
      demo: "https://hostelsarathi.com/",
    },
    {
      image: jobblast,
      title: "Job Blast",
      description:
        "A multiple job posting platform for recruiters to post jobs and find candidates with real-time notifications.",
      github: "https://github.com/krishnapanthee/job_blast",
      demo: "https://jobblast.vercel.app/",
    },
    {
      image: educonsultancy,
      title: "EduConsultancy",
      description:
        "A comprehensive education consultancy platform connecting students with global universities and providing test preparation and visa application services.",
      github: "https://github.com/krishnapanthee/EduConsultancy",
      demo: "https://edu-consultancy.vercel.app/",
    },


    {
      image: rickmortyexplorer,
      title: "Rick & Morty Explorer",
      description:
        "An interactive dashboard fetching real-time character data from the Rick & Morty API, featuring advanced filtering and pagination.",
      github: "https://github.com/krishnapanthee/rickmortyexplorer",
      demo: "https://rickmortyexplorer.vercel.app/",
    },
    {
      image: salonnepal,
      title: "Salon Nepal",
      description:
        "A personalized salon booking application that allows users to pick services, select stylists, and book appointments online.",
      github: "https://github.com/krishnapanthee/salon-nepal",
      demo: "https://salon-nepal.vercel.app/",
    },
    {
      image: saipal,
      title: "Saipal",
      description: "An school website for Saipal Academy",
      github: "https://github.com/UddheshyaGroup/Saipal-Website",
      demo: "https://saipal.edu.np/",
    }

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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  // Mobile: allow horizontal scroll, Desktop: show one project at a time
  return (
    <div
      id="projects"
      ref={sectionRef}
      className={`py-16 sm:py-20 md:py-24 px-6 sm:px-8 ${theme === "dark" ? "bg-black" : "bg-white"
        } transition-colors duration-300`}
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
          My <span className="text-orange-500">Projects</span>
        </h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto mt-3 animate-expandWidth"></div>
      </div>
      {/* Projects Container */}
      <div className="relative max-w-[1200px] mx-auto">
        {/* Mobile Swipe View (Scroll Snapping) */}
        <div className="block lg:hidden">
          <div
            className={`flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar ${isVisible ? "animate-fadeIn" : "opacity-0"
              }`}
            onScroll={(e) => {
              const container = e.currentTarget;
              const index = Math.round(container.scrollLeft / container.offsetWidth);
              if (index !== currentIndex) {
                setCurrentIndex(index);
              }
            }}
            style={{
              animationDelay: "0.2s",
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <style>{`
              .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
            {projects.map((project, index) => (
              <div key={index} className="flex-shrink-0 w-full snap-center px-2">
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

        {/* Desktop View (Slider with Arrows) */}
        <div className="hidden lg:flex justify-center items-center relative py-4">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className={`absolute left-[-60px] z-10 p-4 rounded-full transition-all duration-300 ${theme === "dark"
              ? "bg-gray-900 border-gray-800 text-orange-500 hover:bg-gray-800"
              : "bg-white border-gray-200 text-orange-500 hover:bg-gray-100"
              } border shadow-xl hover:scale-110 active:scale-95`}
          >
            <ChevronLeft size={28} />
          </button>

          <div className="w-full">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`transition-all duration-700 w-full ${index === currentIndex ? "opacity-100 block translate-x-0" : "opacity-0 hidden translate-x-10"
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

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className={`absolute right-[-60px] z-10 p-4 rounded-full transition-all duration-300 ${theme === "dark"
              ? "bg-gray-900 border-gray-800 text-orange-500 hover:bg-gray-800"
              : "bg-white border-gray-200 text-orange-500 hover:bg-gray-100"
              } border shadow-xl hover:scale-110 active:scale-95`}
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Unified Pagination Dots */}
        <div
          className={`flex justify-center gap-2 mt-8 ${isVisible ? "animate-fadeInUp" : "opacity-0"}`}
          style={{ animationDelay: "0.4s" }}
        >
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                // For mobile, scroll to the project
                const mobileContainer = document.querySelector('.no-scrollbar');
                if (mobileContainer) {
                  mobileContainer.scrollTo({
                    left: index * mobileContainer.offsetWidth,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                ? "bg-orange-500 w-8"
                : `${theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-300 hover:bg-gray-400"} w-2`
                }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
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
      className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        } rounded-xl p-5 sm:p-6 md:p-8 w-full max-w-[95%] sm:max-w-[600px] md:max-w-[700px] min-h-[440px] sm:min-h-[460px] flex flex-col items-center mx-auto transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${theme === "dark"
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
        className={`text-xl sm:text-2xl font-bold mt-4 sm:mt-5 text-center ${theme === "dark" ? "text-white" : "text-gray-900"
          } transition-colors duration-300`}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"
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
          className={`px-6 py-2.5 sm:py-3 ${theme === "dark"
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
