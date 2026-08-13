"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import {
  LayoutDashboard,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  FileText,
  MessageSquareQuote,
  HelpCircle,
  Share2,
  Sparkles,
  Settings,
  ExternalLink,
  X,
} from "lucide-react";

export default function Sidebar({ counts = {}, mobileOpen = false, setMobileOpen = () => { } }) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Hero Section", href: "/admin/hero", icon: Sparkles },
    { label: "About", href: "/admin/about", icon: User },
    { label: "Experience", href: "/admin/experience", icon: Briefcase, count: counts.experience },
    { label: "Education", href: "/admin/education", icon: GraduationCap, count: counts.education },
    { label: "Skills", href: "/admin/skills", icon: Wrench, count: counts.skills },
    { label: "Projects", href: "/admin/projects", icon: FolderGit2, count: counts.projects },
    { label: "Writing / Blog", href: "/admin/blog", icon: FileText, count: counts.posts },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote, count: counts.testimonials },
    { label: "FAQs", href: "/admin/faqs", icon: HelpCircle, count: counts.faqs },
    { label: "Social Links", href: "/admin/social", icon: Share2, count: counts.social },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full select-none">
      {/* Header logo */}
      <div
        className={`p-5 border-b flex items-center justify-between ${isDark ? "border-[#222222]" : "border-[#e2e8f0]"
          }`}
      >
        <Link
          href="/admin"
          onClick={() => setMobileOpen(false)}
          className={`font-mono font-bold text-lg tracking-tight flex items-center gap-1.5 ${isDark ? "text-white" : "text-[#0f172a]"
            }`}
        >
          kp<span className="text-[#10b981]">.</span>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors p-1.5 rounded-lg border ${isDark
              ? "text-[#737373] border-[#262626] hover:text-[#10b981] hover:bg-[#1c1c1c]"
              : "text-[#64748b] border-[#cbd5e1] hover:text-[#10b981] hover:bg-[#f1f5f9]"
              }`}
            title="View Live Website"
          >
            <ExternalLink size={15} />
          </a>
          <button
            onClick={() => setMobileOpen(false)}
            className={`lg:hidden p-1.5 rounded-lg border transition-colors ${isDark
              ? "text-[#a3a3a3] border-[#262626] hover:text-white hover:bg-[#1c1c1c]"
              : "text-[#64748b] border-[#cbd5e1] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
              }`}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                ? "bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 shadow-sm"
                : isDark
                  ? "text-[#a3a3a3] hover:text-white hover:bg-[#181818]"
                  : "text-[#475569] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={17} className={isActive ? "text-[#10b981]" : isDark ? "text-[#737373]" : "text-[#64748b]"} />
                <span>{item.label}</span>
              </div>

              {item.count !== undefined && item.count > 0 && (
                <span
                  className={`font-mono text-xs px-2 py-0.5 rounded-full ${isActive
                    ? "bg-[#10b981]/20 text-[#10b981]"
                    : isDark
                      ? "bg-[#222222] text-[#737373]"
                      : "bg-[#e2e8f0] text-[#64748b]"
                    }`}
                >
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>


    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex w-64 border-r flex-col flex-shrink-0 min-h-screen transition-colors ${isDark ? "bg-[#111111] border-[#222222]" : "bg-white border-[#e2e8f0]"
          }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Content */}
          <aside
            className={`relative w-72 max-w-[85vw] h-full shadow-2xl transition-transform border-r ${isDark ? "bg-[#111111] border-[#222222] text-white" : "bg-white border-[#e2e8f0] text-[#0f172a]"
              }`}
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
