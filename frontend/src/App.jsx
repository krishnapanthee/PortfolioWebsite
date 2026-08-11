import React from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AiAssistant from "./components/AiAssistant";
import "./App.css";

/**
 * Main App Content Component
 * Wrapped separately to access theme context
 */
const AppContent = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0a0a0a] text-[#fafafa]" : "bg-[#fafafa] text-[#0a0a0a]"
      }`}
    >
      {/* Navigation Bar */}
      <Header />

      {/* Main Content Container */}
      <main className="w-full flex justify-center">
        <div className="w-full max-w-[900px] px-6 mx-auto">
          <Hero />
          <About />
          <Experience />
          <Education />
          <Skills />
          <Projects />
          {/* <Blog /> */}
          <Testimonials />
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Assistant Floating Chat */}
      <AiAssistant />
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
