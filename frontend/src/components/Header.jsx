"use client";

import { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Writings", href: "#writings" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[999] transition-colors duration-300 border-b ${theme === "dark"
        ? "bg-[#0a0a0a]/90 border-[#262626]"
        : "bg-[#fafafa]/90 border-[#e5e5e5]"
        } backdrop-blur-md`}
    >
      <div className="max-w-[900px] mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          onClick={handleLogoClick}
          className={`font-mono text-sm font-semibold tracking-tight transition-colors ${theme === "dark"
            ? "text-white hover:text-[#10b981]"
            : "text-black hover:text-[#10b981]"
            }`}
        >
          kp.
        </a>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-8">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className={`font-mono text-[13px] font-medium tracking-tight transition-colors ${theme === "dark"
                ? "text-[#a3a3a3] hover:text-white"
                : "text-[#525252] hover:text-black"
                }`}
            >
              {label}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            className={`transition-colors ${theme === "dark"
              ? "text-[#a3a3a3] hover:text-white"
              : "text-[#737373] hover:text-black"
              }`}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="sm:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`transition-colors ${theme === "dark"
              ? "text-[#a3a3a3] hover:text-white"
              : "text-[#737373] hover:text-black"
              }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            onClick={() => setIsMenuOpen(true)}
            className={`transition-colors ${theme === "dark"
              ? "text-[#a3a3a3] hover:text-white"
              : "text-[#737373] hover:text-black"
              }`}
            aria-label="Open Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] transition-opacity duration-300 sm:hidden ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-[260px] z-[1001] transition-transform duration-300 ease-out sm:hidden ${theme === "dark"
          ? "bg-[#0a0a0a] border-l border-[#262626]"
          : "bg-[#fafafa] border-l border-[#e5e5e5]"
          } ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end mb-12">
            <button
              onClick={() => setIsMenuOpen(false)}
              className={`transition-colors ${theme === "dark" ? "text-[#a3a3a3] hover:text-white" : "text-[#737373] hover:text-black"
                }`}
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {navItems.map(({ href, label }, index) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`font-mono text-sm font-medium tracking-tight transition-all duration-300 ${theme === "dark"
                  ? "text-[#a3a3a3] hover:text-white"
                  : "text-[#525252] hover:text-black"
                  } ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
                style={{ transitionDelay: `${index * 50 + 100}ms` }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
