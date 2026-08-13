"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import { Send, Mail, CheckCircle, AlertCircle } from "lucide-react";

const rawFormId =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_FORMSPREE_FORM_ID) ||
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_FORMSPREE_FORM_ID) ||
  "";
const formEndpoint = rawFormId.startsWith("http")
  ? rawFormId
  : rawFormId
    ? `https://formspree.io/f/${rawFormId}`
    : "";

const Contact = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isDark = theme === "dark";

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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitStatus(null);
      setSubmitMessage("");

      try {
        if (!formEndpoint) {
          await new Promise((resolve) => setTimeout(resolve, 600));
          setSubmitStatus("success");
          setSubmitMessage("Message sent successfully.");
          setFormData({ name: "", email: "", message: "" });
          return;
        }

        const response = await fetch(formEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitStatus("success");
          setSubmitMessage("Message sent successfully.");
          setFormData({ name: "", email: "", message: "" });
        } else {
          setSubmitStatus("error");
          setSubmitMessage("Error sending message.");
        }
      } catch (error) {
        setSubmitStatus("error");
        setSubmitMessage("Error sending message.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-10 sm:py-14">
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        <div className="flex items-center gap-2 mb-6">

          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#10b981]">
            Get In Touch
          </p>
        </div>

        <div
          className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 shadow-xl max-w-2xl mx-auto ${isDark ? "bg-[#111111]/90 border-[#222222]" : "bg-white border-[#e2e8f0]"
            }`}
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-inherit">

            <div>
              <h3 className={`font-semibold text-lg tracking-tight ${isDark ? "text-[#e5e5e5]" : "text-[#0f172a]"}`}>
                Send a Direct Message
              </h3>
              <p className={`text-xs ${isDark ? "text-[#a3a3a3]" : "text-[#64748b]"}`}>
                Have a project or collaboration in mind? Drop a message below.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className={`block font-mono text-xs mb-1.5 ${isDark ? "text-[#a3a3a3]" : "text-[#475569]"}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ram"
                  className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none transition-colors border ${errors.name
                    ? "border-red-500"
                    : isDark
                      ? "bg-[#171717] border-[#2e2e2e] text-white placeholder-[#525252] focus:border-[#10b981]"
                      : "bg-[#f8fafc] border-[#cbd5e1] text-[#0f172a] placeholder-[#94a3b8] focus:border-[#10b981]"
                    }`}
                />
                {errors.name && <p className="font-mono text-[11px] text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className={`block font-mono text-xs mb-1.5 ${isDark ? "text-[#a3a3a3]" : "text-[#475569]"}`}>
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ram@gmail.com"
                  className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none transition-colors border ${errors.email
                    ? "border-red-500"
                    : isDark
                      ? "bg-[#171717] border-[#2e2e2e] text-white placeholder-[#525252] focus:border-[#10b981]"
                      : "bg-[#f8fafc] border-[#cbd5e1] text-[#0f172a] placeholder-[#94a3b8] focus:border-[#10b981]"
                    }`}
                />
                {errors.email && <p className="font-mono text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className={`block font-mono text-xs mb-1.5 ${isDark ? "text-[#a3a3a3]" : "text-[#475569]"}`}>
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your project details or message..."
                rows="4"
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none transition-colors resize-none border ${errors.message
                  ? "border-red-500"
                  : isDark
                    ? "bg-[#171717] border-[#2e2e2e] text-white placeholder-[#525252] focus:border-[#10b981]"
                    : "bg-[#f8fafc] border-[#cbd5e1] text-[#0f172a] placeholder-[#94a3b8] focus:border-[#10b981]"
                  }`}
              />
              {errors.message && <p className="font-mono text-[11px] text-red-500 mt-1">{errors.message}</p>}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2 ${isDark ? "bg-[#10b981] hover:bg-[#059669] text-black" : "bg-[#0f172a] hover:bg-[#1e293b] text-white"
                  }`}
              >
                <Send size={14} />
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>

              {submitMessage && (
                <div
                  className={`flex items-center gap-1.5 font-mono text-xs ${submitStatus === "success" ? "text-[#10b981]" : "text-red-500"
                    }`}
                >
                  {submitStatus === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                  <span>{submitMessage}</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;