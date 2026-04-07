import { Facebook, Twitter, Linkedin, Github, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`w-screen p-5 text-center border-t-[3px] border-[#ff9800] transition-colors duration-300 ${theme === "dark" ? "bg-black text-[#ccc]" : "bg-white text-gray-700"
        }`}
    >
      <p className="text-lg font-bold mb-2.5">Connect with me:</p>

      <div className="flex justify-center gap-4">
        <a
          href="https://www.facebook.com/krishna.panthee.898921"
          className={`transition-all duration-300 hover:scale-125 ${theme === "dark"
              ? "text-[#ff9800] hover:text-white"
              : "text-[#ff9800] hover:text-black"
            }`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect on Facebook"
        >
          <Facebook size={20} />
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=krishnapantheee@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-all duration-300 hover:scale-125 ${theme === "dark"
              ? "text-[#ff9800] hover:text-white"
              : "text-[#ff9800] hover:text-black"
            }`}
          title="Email me via Gmail"
          aria-label="Send me an Email"
        >
          <Mail size={20} />
        </a>
        <a
          href="https://x.com/kishna165887"
          className={`transition-all duration-300 hover:scale-125 ${theme === "dark"
              ? "text-[#ff9800] hover:text-white"
              : "text-[#ff9800] hover:text-black"
            }`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow me on X (Twitter)"
        >
          <Twitter size={20} />
        </a>
        <a
          href="https://linkedin.com/in/krisshna-panthee-512097280"
          className={`transition-all duration-300 hover:scale-125 ${theme === "dark"
              ? "text-[#ff9800] hover:text-white"
              : "text-[#ff9800] hover:text-black"
            }`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect on LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="https://github.com/krishnapanthee/"
          className={`transition-all duration-300 hover:scale-125 ${theme === "dark"
              ? "text-[#ff9800] hover:text-white"
              : "text-[#ff9800] hover:text-black"
            }`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Github Profile"
        >
          <Github size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
