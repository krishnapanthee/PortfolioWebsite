import { useState } from "react";
import {
  Home,
  User,
  Lightbulb,
  Briefcase,
  Mail,
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
    { icon: Mail, label: "Contact", href: "#contact" },
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

      <div className="sm:hidden flex items-center gap-2">
        {/* Theme Toggle Button - Mobile */}
        <button
          onClick={toggleTheme}
          className="text-orange-500 hover:text-orange-400 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="text-orange-500 hover:text-orange-400 transition-colors"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`sm:hidden absolute top-full left-0 w-full ${
          theme === "dark" ? "bg-black" : "bg-white"
        } border-t border-orange-500/50 flex flex-col items-stretch overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-[500px] py-2" : "max-h-0 py-0"
        }`}
      >
        {navItems.map(({ icon: Icon, href, label }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            className="w-full flex flex-row items-center justify-start text-orange-500 hover:text-orange-400 transition-colors py-2 px-6 min-h-[44px] gap-3"
          >
            <span className="flex items-center justify-center w-7 h-7">
              <Icon size={20} />
            </span>
            <span className="text-base">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Header;
