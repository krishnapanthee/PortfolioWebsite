import React, { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import "./App.css";

/**
 * Main App Content Component
 * Wrapped separately to access theme context
 */
const AppContent = () => {
  const { theme } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initial loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show loading spinner
  if (isLoading) {
    return (
      <div className={`loader ${theme === "dark" ? "!bg-black" : "!bg-white"}`}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Navigation Bar */}
      <Header />

      {/* Main Content Container */}
      <div className="w-full flex justify-center">
        <div
          className={`w-full max-w-[1200px] px-4 sm:px-6 md:px-8 mx-auto transition-colors duration-300`}
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Testimonials />
          <Contact />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop show={showBackToTop} />
    </div>
  );
};

/**
 * Root App Component
 * Wraps everything in ThemeProvider
 */
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
