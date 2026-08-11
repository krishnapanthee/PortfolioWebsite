import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";

const rawFormId = import.meta.env.VITE_FORMSPREE_FORM_ID || "";
const formEndpoint = rawFormId.startsWith("http")
  ? rawFormId
  : rawFormId
  ? `https://formspree.io/f/${rawFormId}`
  : "";

const Contact = () => {
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
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
          setSubmitMessage("Message sent.");
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
          setSubmitMessage("Message sent.");
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
    <section
      id="contact"
      ref={sectionRef}
      className="py-10 sm:py-12"
    >
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        {/* Section label */}
        <p className="font-mono text-sm mb-4 text-[#10b981]">
          contact
        </p>

        <div className="max-w-xl mx-auto">
          {/* Minimal Editorial Line Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className={`w-full bg-transparent border-b text-sm py-2 outline-none transition-colors font-mono ${errors.name
                    ? "border-red-500"
                    : theme === "dark"
                      ? "border-[#262626] text-[#e5e5e5] placeholder-[#404040] focus:border-[#10b981]"
                      : "border-[#e5e5e5] text-[#171717] placeholder-[#a3a3a3] focus:border-[#10b981]"
                    }`}
                />
                {errors.name && (
                  <p className="font-mono text-[11px] text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`w-full bg-transparent border-b text-sm py-2 outline-none transition-colors font-mono ${errors.email
                    ? "border-red-500"
                    : theme === "dark"
                      ? "border-[#262626] text-[#e5e5e5] placeholder-[#404040] focus:border-[#10b981]"
                      : "border-[#e5e5e5] text-[#171717] placeholder-[#a3a3a3] focus:border-[#10b981]"
                    }`}
                />
                {errors.email && (
                  <p className="font-mono text-[11px] text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message..."
                rows="3"
                className={`w-full bg-transparent border-b text-sm py-2 outline-none transition-colors resize-none font-mono ${errors.message
                  ? "border-red-500"
                  : theme === "dark"
                    ? "border-[#262626] text-[#e5e5e5] placeholder-[#404040] focus:border-[#10b981]"
                    : "border-[#e5e5e5] text-[#171717] placeholder-[#a3a3a3] focus:border-[#10b981]"
                  }`}
              />
              {errors.message && (
                <p className="font-mono text-[11px] text-red-500 mt-1">{errors.message}</p>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`font-mono text-xs transition-colors ${theme === "dark"
                  ? "text-[#a3a3a3] hover:text-[#10b981]"
                  : "text-[#737373] hover:text-[#10b981]"
                  } disabled:opacity-50`}
              >
                {isSubmitting ? "sending..." : "send message →"}
              </button>

              {submitMessage && (
                <span
                  className={`font-mono text-xs ${submitStatus === "success" ? "text-[#10b981]" : "text-red-500"
                    }`}
                >
                  {submitMessage}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;