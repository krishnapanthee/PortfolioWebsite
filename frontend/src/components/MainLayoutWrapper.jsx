"use client";

import { useTheme } from "../context/ThemeContext";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import Projects from "./Projects";
import Certifications from "./Certifications";
import Blog from "./Blog";
import Testimonials from "./Testimonials";
import Faq from "./Faq";
import Contact from "./Contact";
import Footer from "./Footer";
import AiAssistant from "./AiAssistant";

export default function MainLayoutWrapper({
  hero,
  about,
  experiences,
  education,
  skills,
  projects,
  certifications,
  posts,
  testimonials,
  faqs,
  socialLinks,
}) {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0a0a0a] text-[#fafafa]" : "bg-[#fafafa] text-[#0a0a0a]"
      }`}
    >
      <Header />

      <main className="w-full flex justify-center">
        <div className="w-full max-w-[900px] px-6 mx-auto">
          <Hero data={hero} />
          <About data={about} />
          <Experience data={experiences} />
          <Education data={education} />
          <Skills data={skills} />
          <Projects data={projects} />
          <Certifications data={certifications} />
          <Blog data={posts} />
          <Testimonials data={testimonials} />
          <Faq data={faqs} />
          <Contact />
        </div>
      </main>

      <Footer data={socialLinks} />
      <AiAssistant />
    </div>
  );
}
