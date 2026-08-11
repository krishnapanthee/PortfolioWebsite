import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { Quote } from "lucide-react";

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
        "Krishna played a pivotal role as a Full Stack Developer at Uddheshya Group. He consistently delivered scalable web applications, robust REST APIs, and seamless authentication systems. His problem-solving mindset, clean code standards, and ownership made him an invaluable asset to our team.",
      author: "Parakram K.C.",
      role: "Technical Lead, Uddheshya Group",
      link: null,
    },
  ];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-10 sm:py-12"
    >
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        {/* Section label */}
        <p className="font-mono text-sm mb-4 text-[#10b981]">
          testimonials
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative border rounded-lg p-6 sm:p-8 ${testimonials.length === 1 ? "md:col-span-2" : ""
                } ${theme === "dark" ? "border-[#262626]" : "border-[#e5e5e5]"
                }`}
            >
              {/* Quote icon */}
              <Quote
                size={20}
                className={`mb-4 ${theme === "dark" ? "text-[#333]" : "text-[#d4d4d4]"
                  }`}
              />

              {/* Quote text */}
              <p
                className={`text-base sm:text-lg leading-relaxed mb-6 ${theme === "dark" ? "text-[#a3a3a3]" : "text-[#525252]"
                  }`}
              >
                {testimonial.quote}
              </p>

              {/* Attribution */}
              <div>
                {testimonial.link ? (
                  <a
                    href={testimonial.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium text-sm transition-colors ${theme === "dark"
                      ? "text-[#e5e5e5] hover:text-[#10b981]"
                      : "text-[#171717] hover:text-[#10b981]"
                      }`}
                  >
                    {testimonial.author}
                  </a>
                ) : (
                  <span
                    className={`font-medium text-sm ${theme === "dark" ? "text-[#e5e5e5]" : "text-[#171717]"
                      }`}
                  >
                    {testimonial.author}
                  </span>
                )}
                {testimonial.role && (
                  <p
                    className={`font-mono text-xs mt-1 ${theme === "dark" ? "text-[#525252]" : "text-[#a3a3a3]"
                      }`}
                  >
                    {testimonial.role}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
