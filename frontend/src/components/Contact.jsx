import { useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";

// Import Vite environment variable for Formspree form ID
const FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;

const Contact = () => {
  const { theme } = useTheme();

  return (
    <div id="contact" className={`py-16 sm:py-20 md:py-24 px-6 sm:px-8 ${
      theme === 'dark' ? 'bg-black' : 'bg-white'
    } transition-colors duration-300`}>
      {/* Section Title */}
      <div className="text-center mb-12 sm:mb-14 md:mb-16">
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        } transition-colors duration-300`}>
          Get In <span className="text-orange-500">Touch</span>
        </h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto mt-3"></div>
      </div>

      <div className={`max-w-full sm:max-w-[600px] md:max-w-[700px] mx-auto p-6 sm:p-8 md:p-10 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      } rounded-xl transition-colors duration-300`}>
        <ContactForm theme={theme} />
      </div>
    </div>
  );
};

const ContactForm = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      setSubmitMessage("");

      try {
        const response = await fetch(`https://formspree.io/f/${FORM_ID}` , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitMessage("Thanks for reaching out! I'll get back to you soon.");
          setFormData({ name: "", email: "", message: "" });
        } else {
          setSubmitMessage("Something went wrong. Please try again.");
        }
      } catch (error) {
        setSubmitMessage("Couldn't send the message. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
        {/* Name Field */}
        <div className="flex flex-col gap-1.5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className={`w-full p-3 sm:p-3.5 border ${
              errors.name ? "border-red-500" : theme === 'dark' ? "border-gray-700" : "border-gray-300"
            } rounded-lg ${
              theme === 'dark' ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-400'
            } text-sm sm:text-base outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20`}
          />
          {errors.name && (
            <span className="text-red-500 text-xs sm:text-sm">{errors.name}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className={`w-full p-3 sm:p-3.5 border ${
              errors.email ? "border-red-500" : theme === 'dark' ? "border-gray-700" : "border-gray-300"
            } rounded-lg ${
              theme === 'dark' ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-400'
            } text-sm sm:text-base outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20`}
          />
          {errors.email && (
            <span className="text-red-500 text-xs sm:text-sm">{errors.email}</span>
          )}
        </div>

        {/* Message Field */}
        <div className="flex flex-col gap-1.5">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className={`w-full p-3 sm:p-3.5 border ${
              errors.message ? "border-red-500" : theme === 'dark' ? "border-gray-700" : "border-gray-300"
            } rounded-lg ${
              theme === 'dark' ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-400'
            } text-sm sm:text-base outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 resize-none`}
          />
          {errors.message && (
            <span className="text-red-500 text-xs sm:text-sm">{errors.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 sm:px-8 py-3 sm:py-3.5 w-full bg-orange-500 text-white rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {/* Submission Message */}
        {submitMessage && (
          <p
            className={`text-center text-sm sm:text-base ${
              submitMessage.includes("Thanks")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {submitMessage}
          </p>
        )}
      </form>

      
    </div>
  );
};

export default Contact;