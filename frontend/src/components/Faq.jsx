"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { Plus, Minus, HelpCircle } from "lucide-react";

const Faq = ({ data }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(0); // open first FAQ by default
  const sectionRef = useRef(null);
  const isDark = theme === "dark";

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
    <section id="faq" ref={sectionRef} className="py-10 sm:py-14">
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        <div className="flex items-center gap-2 mb-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#10b981]">
            Frequently Asked Questions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq._id || index}
                className={`p-5 rounded-2xl border transition-all duration-300 ${
                  isDark
                    ? isOpen
                      ? "bg-[#141414] border-[#10b981]/40 shadow-lg"
                      : "bg-[#111111]/80 border-[#222222] hover:border-[#333333]"
                    : isOpen
                    ? "bg-white border-[#10b981]/50 shadow-md"
                    : "bg-white/90 border-[#e2e8f0] hover:border-[#cbd5e1]"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left flex items-center justify-between gap-4 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle
                      size={17}
                      className={isOpen ? "text-[#10b981]" : isDark ? "text-[#525252]" : "text-[#94a3b8]"}
                    />
                    <h3
                      className={`text-base font-semibold tracking-tight transition-colors ${
                        isOpen
                          ? "text-[#10b981]"
                          : isDark
                          ? "text-[#e5e5e5] group-hover:text-white"
                          : "text-[#0f172a] group-hover:text-[#10b981]"
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`p-1 rounded-lg transition-colors ${
                      isOpen
                        ? "bg-[#10b981]/10 text-[#10b981]"
                        : isDark
                        ? "bg-[#1c1c1c] text-[#737373]"
                        : "bg-[#f1f5f9] text-[#64748b]"
                    }`}
                  >
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-3.5 pt-3.5 border-t border-inherit animate-fadeIn">
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-[#a3a3a3]" : "text-[#475569]"}`}>
                      {faq.answer}
                    </p>
                  </div>
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
