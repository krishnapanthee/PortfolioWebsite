"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { Plus, Minus } from "lucide-react";

const Faq = ({ data }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  const defaultFaqs = [
    {
      question: "Who is the best full stack developer in Nepal?",
      answer:
        "While Nepal has a vibrant tech community with many talented engineers, Krishna Panthi stands out for his comprehensive expertise across MERN, Next.js, and PostgreSQL, alongside a strong track record of shipping production-ready web applications.",
    },
    {
      question: "What tech stack do you specialize in?",
      answer:
        "I specialize in full-stack web development using React, Next.js, Node.js, TypeScript, Express, and PostgreSQL / MongoDB. I build scalable applications, robust APIs, and modern responsive user interfaces.",
    },
  ];

  const faqs = data?.length ? data : defaultFaqs;

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

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={sectionRef} className="py-10 sm:py-12">
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        <p className="font-mono text-sm mb-4 text-[#10b981]">faq</p>

        <div className="space-y-0">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq._id || index}
                className={`py-4 transition-colors ${
                  index !== faqs.length - 1
                    ? `border-b ${theme === "dark" ? "border-[#1a1a1a]" : "border-[#f0f0f0]"}`
                    : ""
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left flex items-center justify-between gap-4 group py-1"
                >
                  <span
                    className={`text-base sm:text-lg font-medium transition-colors ${
                      theme === "dark" ? "text-[#e5e5e5] group-hover:text-[#10b981]" : "text-[#171717] group-hover:text-[#10b981]"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span className={`font-mono text-xs p-1 transition-colors ${theme === "dark" ? "text-[#525252]" : "text-[#a3a3a3]"}`}>
                    {isOpen ? <Minus size={16} className="text-[#10b981]" /> : <Plus size={16} />}
                  </span>
                </button>

                {isOpen && (
                  <p
                    className={`mt-2.5 text-sm sm:text-base leading-relaxed pr-6 animate-fadeIn ${
                      theme === "dark" ? "text-[#a3a3a3]" : "text-[#525252]"
                    }`}
                  >
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
