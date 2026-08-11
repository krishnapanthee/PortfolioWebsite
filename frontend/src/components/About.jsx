import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import heroImg from "../assets/imgPortfolio.png";

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
    <section
      id="about"
      ref={sectionRef}
      className="py-10 sm:py-12"
    >
      <div
        className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}
      >
        {/* Section label */}
        <p
          className={`font-mono text-sm mb-4 ${theme === "dark" ? "text-[#10b981]" : "text-[#10b981]"
            }`}
        >
          about
        </p>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
          {/* Photo - First on mobile, Last on desktop */}
          <div className="order-first md:order-last flex-shrink-0">
            <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-xl overflow-hidden mx-auto md:mx-0">
              <img
                src={heroImg}
                alt="Krishna Panthi - Full-Stack Developer"
                width="208"
                height="208"
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-last md:order-first flex-1 space-y-5">
            <p
              className={`text-base sm:text-lg leading-relaxed ${theme === "dark" ? "text-[#a3a3a3]" : "text-[#525252]"
                }`}
            >
              I'm
              <span className={`font-mono text-lg sm:text-xl md:text-xl font-bold pl-2 tracking-tight ${theme === "dark" ? "text-white" : "text-[#0a0a0a]"
                }`}>
                Krishna Panthi
              </span>
              , a full-stack developer based in Nepal. I specialize in the{" "}
              <span className={`font-mono text-sm px-1.5 py-0.5 rounded ${theme === "dark" ? "bg-[#171717] text-[#d4d4d4]" : "bg-[#f5f5f5] text-[#404040]"
                }`}>MERN</span>{" "}
              stack and build clean, efficient digital solutions with{" "}
              <span className={`font-mono text-sm px-1.5 py-0.5 rounded ${theme === "dark" ? "bg-[#171717] text-[#d4d4d4]" : "bg-[#f5f5f5] text-[#404040]"
                }`}>Next.js</span>{" "}
              and{" "}
              <span className={`font-mono text-sm px-1.5 py-0.5 rounded ${theme === "dark" ? "bg-[#171717] text-[#d4d4d4]" : "bg-[#f5f5f5] text-[#404040]"
                }`}>PostgreSQL</span>.
            </p>
            <p
              className={`text-base sm:text-lg leading-relaxed ${theme === "dark" ? "text-[#a3a3a3]" : "text-[#525252]"
                }`}
            >
              My goal is to create web applications that are as powerful as they are intuitive - shipping products that real people use, not just "projects".
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
