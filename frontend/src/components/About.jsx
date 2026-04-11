import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import { Code, Globe, Zap, Cpu, Briefcase, MapPin, Clock, BookOpen } from "lucide-react";

const About = () => {
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

  return (
    <div
      id="about"
      ref={sectionRef}
      className={`py-8 sm:py-12 md:py-16 px-6 sm:px-8 ${theme === "dark" ? "bg-black" : "bg-white"
        } transition-colors duration-300`}
    >



      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Text Content */}
        {/* Section Title */}
        <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          <div
            className={`text-center mb-12 sm:mb-16 ${isVisible ? "animate-fadeInDown" : "opacity-0"
              }`}
          >
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"
                } transition-colors duration-300`}
            >
              About <span className="text-orange-500">Me</span>
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mt-3 animate-expandWidth"></div>
          </div>
          <p
            className={`text-base sm:text-lg leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"
              } mb-8`}
          >
            I'm <span className="font-semibold text-orange-500">Krishna Prasad Panthi</span>, a dedicated full-stack developer from Nepal specialized in the <span className="font-semibold text-orange-500">MERN stack</span>. I build clean, efficient digital solutions and thrive on building with <span className="font-semibold text-orange-500">Next.js and PostgreSQL</span>. My goal is to create web applications that are as powerful as they are intuitive.
          </p>
        </div>

        {/* Right: Interactive Stats Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <StatCard
            icon={<Code className="text-orange-500" />}
            count="10+"
            label="Technologies"
            delay="0.3s"
            theme={theme}
            isVisible={isVisible}
          />
          <StatCard
            icon={<Briefcase className="text-orange-500" />}
            count="7+"
            label="Projects Done"
            delay="0.4s"
            theme={theme}
            isVisible={isVisible}
          />
          <StatCard
            icon={<Clock className="text-orange-500" />}
            count="3+"
            label="Years in Development"
            delay="0.5s"
            theme={theme}
            isVisible={isVisible}
          />
          <StatCard
            icon={<MapPin className="text-orange-500" />}
            count="Nepal"
            label="Based"
            delay="0.6s"
            theme={theme}
            isVisible={isVisible}
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, count, label, delay, theme, isVisible }) => (
  <div
    className={`flex flex-col items-start p-6 rounded-2xl ${theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-100"
      } border transition-all duration-300 hover:scale-105 hover:shadow-xl ${theme === "dark" ? "hover:shadow-orange-500/10" : "hover:shadow-orange-500/20"
      } ${isVisible ? "animate-fadeInUp" : "opacity-0"}`}
    style={{ animationDelay: delay, animationFillMode: "forwards" }}
  >
    <div className="p-3 bg-orange-500/10 rounded-xl mb-4 text-orange-500">
      {icon}
    </div>
    <h4 className="text-3xl font-bold text-orange-500 mb-1">{count}</h4>
    <p className={`text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"
      }`}>
      {label}
    </p>
  </div>
);

export default About;
