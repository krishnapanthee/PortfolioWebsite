import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  const links = [
    {
      icon: Github,
      href: "https://github.com/krishnapanthee/",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/krishna-panthi-512097280/",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://x.com/kishna165887",
      label: "X (Twitter)",
    },
    {
      icon: Mail,
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=krishnapantheee@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className="py-12 mt-8">
      <div
        className={`max-w-[900px] mx-auto px-6 border-t pt-8 ${theme === "dark" ? "border-[#262626]" : "border-[#e5e5e5]"
          }`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Social links */}
          <div className="flex items-center gap-5">
            {links.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`transition-colors ${theme === "dark"
                  ? "text-[#a3a3a3] hover:text-[#10b981]"
                  : "text-[#737373] hover:text-[#10b981]"
                  }`}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p
            className={`font-mono text-xs ${theme === "dark" ? "text-[#a3a3a3]" : "text-[#737373]"
              }`}
          >
            © {new Date().getFullYear()} Krishna Panthi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
