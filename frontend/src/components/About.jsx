"use client";

import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";

const About = ({ data }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const name = data?.name || "Krishna Panthi";
  const imageUrl = data?.imageUrl || "/assets/imgPortfolio.png";
  const paragraphs = data?.paragraphs?.length
    ? data.paragraphs
    : [
        "I'm Krishna Panthi, a full-stack developer based in Nepal. I specialize in the MERN stack and build clean, efficient digital solutions with Next.js and PostgreSQL.",
        "My goal is to create web applications that are as powerful as they are intuitive - shipping products that real people use, not just 'projects'.",
      ];

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
    <section id="about" ref={sectionRef} className="py-10 sm:py-12">
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        {/* Section label */}
        <p className={`font-mono text-sm mb-4 text-[#10b981]`}>
          about
        </p>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
          {/* Photo - First on mobile, Last on desktop */}
          <div className="order-first md:order-last flex-shrink-0">
            <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden mx-auto md:mx-0">
              <img
                src={imageUrl}
                alt={`${name} - Full-Stack Developer`}
                width="208"
                height="208"
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-last md:order-first flex-1 space-y-5">
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={`text-base sm:text-lg leading-relaxed ${
                  theme === "dark" ? "text-[#a3a3a3]" : "text-[#525252]"
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
