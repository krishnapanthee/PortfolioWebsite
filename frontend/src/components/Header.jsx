import { useState } from "react";
import {
  Home,
  User,
  Lightbulb,
  Briefcase,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: User, label: "About", href: "#about" },
    { icon: Lightbulb, label: "Skills", href: "#skills" },
    { icon: Briefcase, label: "Projects", href: "#projects" },
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
      className={`fixed top-0 left-0 w-full ${
        theme === "dark" ? "bg-black" : "bg-white"
      } bg-opacity-95 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 z-[999] flex justify-between items-center shadow-lg transition-colors duration-300`}
    >
      {/* Logo */}
      <div>
        <a
          href="/"
          onClick={handleLogoClick}
          className="text-base sm:text-lg md:text-xl font-semibold text-orange-500 hover:text-orange-400 transition-colors cursor-pointer"
        >
          Krishna Panthi
        </a>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex absolute left-1/2 transform -translate-x-1/2 gap-4 sm:gap-5 md:gap-6 lg:gap-7 justify-center items-center">
        {navItems.map(({ icon: Icon, href, label }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            className="text-orange-500 hover:text-orange-400 transition-colors flex items-center justify-center"
            title={label}
            aria-label={label}
          >
            <Icon size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </a>
        ))}

        {/* Theme Toggle Button - Desktop */}
        <button
          onClick={toggleTheme}
          className="text-orange-500 hover:text-orange-400 transition-colors ml-2"
          aria-label="Toggle theme"
          title={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Mobile Hamburger Menu Button */}
      <div className="sm:hidden flex items-center gap-4">
        {/* Theme Toggle Button - Mobile */}
        <button
          onClick={toggleTheme}
          className="text-orange-500 hover:text-orange-400 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          onClick={() => setIsMenuOpen(true)}
          className="text-orange-500 hover:text-orange-400 transition-colors"
          aria-label="Open Menu"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] transition-opacity duration-500 sm:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Mobile Right Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-[280px] z-[1001] transition-transform duration-500 ease-in-out sm:hidden ${
          theme === "dark" ? "bg-black border-l border-gray-800" : "bg-white border-l border-gray-100"
        } ${isMenuOpen ? "translate-x-0" : "translate-x-full shadow-none"}`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-10">
            <span className="text-xl font-bold text-orange-500">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-orange-500 hover:rotate-90 transition-transform duration-300"
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {navItems.map(({ icon: Icon, href, label }, index) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`flex items-center gap-4 text-lg font-medium transition-all duration-300 ${
                  theme === "dark" ? "text-gray-300 hover:text-orange-500" : "text-gray-700 hover:text-orange-500"
                } ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
                style={{ transitionDelay: `${index * 50 + 100}ms` }}
              >
                <div className={`p-2 rounded-lg ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
                  <Icon size={20} className="text-orange-500" />
                </div>
                {label}
              </a>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-gray-800/10">
             <p className="text-xs text-gray-500 text-center uppercase tracking-widest font-bold">
               Krishna Panthi
             </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
