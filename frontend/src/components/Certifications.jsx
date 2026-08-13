"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  Award,
  ExternalLink,
  Download,
  FileText,
  ImageIcon,
  FileSpreadsheet,
  File,
} from "lucide-react";

const Certifications = ({ data }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isDark = theme === "dark";

  const defaultCertifications = [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      issueDate: "2025",
      credentialUrl: "https://aws.amazon.com",
    },
  ];

  const certs = data?.length ? data : defaultCertifications;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getFileIcon = (url) => {
    if (!url) return File;
    const lower = url.toLowerCase();
    if (lower.match(/\.(jpg|jpeg|png|webp|svg|gif)$/)) return ImageIcon;
    if (lower.match(/\.(pdf)$/)) return FileText;
    if (lower.match(/\.(xlsx|xls|csv)$/)) return FileSpreadsheet;
    return FileText;
  };

  return (
    <section id="certifications" ref={sectionRef} className="py-10 sm:py-14">
      <div className={`${isVisible ? "animate-fadeIn" : "opacity-0"}`}>
        <div className="flex items-center gap-2 mb-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#10b981]">
            Certifications & Licenses
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certs.map((cert, index) => {
            const FileIconComponent = getFileIcon(cert.fileUrl);

            return (
              <div
                key={cert._id || index}
                className={`group p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col justify-between gap-4 ${
                  isDark
                    ? "bg-[#111111]/80 border-[#222222] hover:border-[#10b981]/40 hover:bg-[#141414]"
                    : "bg-white/90 border-[#e2e8f0] hover:border-[#10b981]/50 hover:bg-[#f8fafc]"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-xl flex-shrink-0 ${
                          isDark ? "bg-[#1a1a1a] text-[#10b981]" : "bg-[#f1f5f9] text-[#059669]"
                        }`}
                      >
                        <Award size={20} />
                      </div>
                      <div>
                        <h3
                          className={`font-semibold text-base sm:text-lg tracking-tight transition-colors ${
                            isDark ? "text-[#e5e5e5] group-hover:text-[#10b981]" : "text-[#0f172a] group-hover:text-[#059669]"
                          }`}
                        >
                          {cert.title}
                        </h3>
                        <p className={`text-xs font-medium ${isDark ? "text-[#a3a3a3]" : "text-[#64748b]"}`}>
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                  </div>

                  {cert.credentialId && (
                    <p className={`font-mono text-[11px] ${isDark ? "text-[#525252]" : "text-[#94a3b8]"}`}>
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>

                {/* Footer Action Links */}
                <div className="flex items-center justify-between pt-3 border-t border-inherit">
                  {cert.issueDate && (
                    <span
                      className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full ${
                        isDark ? "bg-[#1c1c1c] text-[#737373]" : "bg-[#f1f5f9] text-[#64748b]"
                      }`}
                    >
                      {cert.issueDate}
                    </span>
                  )}

                  <div className="flex items-center gap-2 ml-auto">
                    {cert.fileUrl && (
                      <a
                        href={cert.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                          isDark
                            ? "border-[#262626] text-[#10b981] hover:bg-[#10b981]/10"
                            : "border-[#cbd5e1] text-[#059669] hover:bg-[#10b981]/10"
                        }`}
                        title="Download / View Local Certificate File"
                      >
                        <FileIconComponent size={13} />
                        <span>Attachment</span>
                      </a>
                    )}

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 font-mono text-xs transition-colors ${
                          isDark ? "text-[#a3a3a3] hover:text-[#10b981]" : "text-[#475569] hover:text-[#059669]"
                        }`}
                        title="Verify Official Credential"
                      >
                        <span>Verify</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
