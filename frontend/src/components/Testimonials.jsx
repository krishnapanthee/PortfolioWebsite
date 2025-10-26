import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const TestimonialCard = ({ quote, author, role, link, theme }) => {
  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      } rounded-xl p-6 sm:p-8 md:p-10 flex flex-col justify-between min-h-[240px] sm:min-h-[260px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
        theme === "dark"
          ? "hover:shadow-orange-500/20"
          : "hover:shadow-orange-500/30"
      }`}
    >
      <p
        className={`text-base sm:text-lg md:text-xl leading-relaxed ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        } italic mb-6 transition-colors duration-300`}
      >
        "{quote}"
      </p>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`block font-semibold ${
            theme === "dark"
              ? "text-white hover:text-orange-500"
              : "text-gray-900 hover:text-orange-500"
          } transition-all duration-300 hover:translate-x-1`}
        >
          {author}
          {role && (
            <span
              className={`block text-sm font-normal ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              } mt-1 transition-colors duration-300`}
            >
              {role}
            </span>
          )}
        </a>
      ) : (
        <div
          className={`font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {author}
          {role && (
            <span
              className={`block text-sm font-normal ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              } mt-1 transition-colors duration-300`}
            >
              {role}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const Testimonials = () => {
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

  const testimonials = [
    {
      quote:
        "Working with Krishna was an excellent experience. He completely revamped our consultancy website, making it faster, modern, and more professional. Communication was smooth, and he really understood our needs.",
      author: "Sanjana Shrestha",
      role: "Managing Director, EduNepal Consultancy",
      link: "https://linkedin.com/in/sanjanashrestha",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [hovered, testimonials.length]);

  return (
    <div
      id="testimonials"
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
          Client <span className="text-orange-500">Feedback</span>
        </h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto mt-3 animate-expandWidth"></div>
      </div>

      <div
        className={`relative flex justify-center items-center min-h-[280px] sm:min-h-[300px] w-full ${
          isVisible ? "animate-fadeIn" : "opacity-0"
        }`}
        style={{ animationDelay: "0.2s" }}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`transition-all duration-500 w-full max-w-[95%] sm:max-w-[600px] md:max-w-[700px] ${
              index === currentIndex
                ? "opacity-100 scale-100 relative z-10"
                : "opacity-0 scale-95 absolute z-0 pointer-events-none"
            }`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <TestimonialCard {...testimonial} theme={theme} />
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div
        className={`flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-10 ${
          isVisible ? "animate-fadeInUp" : "opacity-0"
        }`}
        style={{ animationDelay: "0.4s" }}
      >
        {testimonials.map((_, index) => (
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
            } hover:scale-110`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
