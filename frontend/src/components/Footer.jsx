"use client";

import { Github, Linkedin, Twitter, Mail, Link as LinkIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Footer = ({ data }) => {
  const { theme } = useTheme();

  const defaultLinks = [
    { platform: "GitHub", href: "https://github.com/krishnapanthee/", icon: Github },
    { platform: "LinkedIn", href: "https://www.linkedin.com/in/krishna-panthi-512097280/", icon: Linkedin },
    { platform: "Twitter", href: "https://x.com/kishna165887", icon: Twitter },
    { platform: "Email", href: "mailto:krishnapantheee@gmail.com", icon: Mail },
  ];

  const getIcon = (platform) => {
    const p = (platform || "").toLowerCase();
    if (p.includes("github")) return Github;
    if (p.includes("linkedin")) return Linkedin;
    if (p.includes("twitter") || p.includes("x")) return Twitter;
    if (p.includes("email") || p.includes("mail")) return Mail;
    return LinkIcon;
  };

  const handleEmailClick = (e, targetHref) => {
    e.preventDefault();
    let email = "krishnapantheee@gmail.com";
    if (targetHref.startsWith("mailto:")) {
      email = targetHref.replace("mailto:", "");
    } else if (targetHref.includes("to=")) {
      const parsed = targetHref.split("to=")[1]?.split("&")[0];
      if (parsed) email = parsed;
    } else if (targetHref.includes("@") && !targetHref.startsWith("http")) {
      email = targetHref;
    }

    if (typeof window !== "undefined" && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = `mailto:${email}`;
    } else {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
        "_blank"
      );
    }
  };

  const links = data?.length
    ? data.map((item) => ({
        platform: item.platform,
        href: item.url,
        icon: getIcon(item.platform),
      }))
    : defaultLinks;

  return (
    <footer className="py-12 mt-8">
      <div
        className={`max-w-[900px] mx-auto px-6 border-t pt-8 ${
          theme === "dark" ? "border-[#262626]" : "border-[#e5e5e5]"
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-5">
            {links.map(({ platform, href, icon: Icon }, idx) => {
              const isEmail =
                (platform || "").toLowerCase().includes("email") ||
                (platform || "").toLowerCase().includes("mail") ||
                href.startsWith("mailto:") ||
                href.includes("gmail.com");

              return (
                <a
                  key={idx}
                  href={href}
                  onClick={isEmail ? (e) => handleEmailClick(e, href) : undefined}
                  target={isEmail ? undefined : "_blank"}
                  rel={isEmail ? undefined : "noopener noreferrer"}
                  aria-label={platform}
                  className={`transition-colors ${
                    theme === "dark" ? "text-[#a3a3a3] hover:text-[#10b981]" : "text-[#737373] hover:text-[#10b981]"
                  }`}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>

          <p className={`font-mono text-xs font-semibold tracking-tight ${theme === "dark" ? "text-[#e5e5e5]" : "text-[#171717]"}`}>
            © {new Date().getFullYear()} Krishna Panthi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
