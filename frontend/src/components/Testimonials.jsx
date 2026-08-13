"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { Quote } from "lucide-react";

const Testimonials = ({ data }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isDark = theme === "dark";

  const defaultTestimonials = [
    {
      quote:
        "Krishna played a pivotal role as a Full Stack Developer at Uddheshya Group. He consistently delivered scalable web applications, robust REST APIs, and seamless authentication systems. His problem-solving mindset, clean code standards, and ownership made him an invaluable asset to our team.",
      author: "Parakram K.C.",
      role: "Technical Lead, Uddheshya Group",
      link: null,
    },
  ];

  const testimonials = data?.length ? data : defaultTestimonials;

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
    <section id="testimonials" ref={sectionRef} className="py-10 sm:py-14">
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        <div className="flex items-center gap-2 mb-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#10b981]">
            Testimonials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial._id || index}
              className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col justify-between gap-6 ${testimonials.length === 1 ? "md:col-span-2" : ""
                } ${isDark
                  ? "bg-[#111111]/80 border-[#222222] hover:border-[#10b981]/40 hover:bg-[#141414]"
                  : "bg-white/90 border-[#e2e8f0] hover:border-[#10b981]/50 hover:bg-[#f8fafc]"
                }`}
            >
              <div className="space-y-4">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDark ? "bg-[#1a1a1a] text-[#10b981]" : "bg-[#f1f5f9] text-[#059669]"
                    }`}
                >
                  <Quote size={18} />
                </div>

                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-[#a3a3a3]" : "text-[#475569]"}`}>
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-inherit">
                {testimonial.link ? (
                  <a
                    href={testimonial.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sm text-[#10b981] hover:underline"
                  >
                    {testimonial.author}
                  </a>
                ) : (
                  <span className={`font-semibold text-sm ${isDark ? "text-[#e5e5e5]" : "text-[#0f172a]"}`}>
                    {testimonial.author}
                  </span>
                )}
                {testimonial.role && (
                  <p className={`font-mono text-xs mt-0.5 ${isDark ? "text-[#737373]" : "text-[#64748b]"}`}>
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
