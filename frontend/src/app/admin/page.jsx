"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  FolderGit2,
  FileText,
  Briefcase,
  HelpCircle,
  ArrowUpRight,
  Award,
  Sparkles,
  User,
  Wrench,
  CheckCircle2,
  Database,
  Globe,
} from "lucide-react";

export default function AdminDashboardOverview() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [stats, setStats] = useState({
    projects: 0,
    posts: 0,
    experiences: 0,
    certifications: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [prj, pst, exp, cert] = await Promise.all([
          fetch("/api/projects").then((r) => r.json()),
          fetch("/api/posts").then((r) => r.json()),
          fetch("/api/experiences").then((r) => r.json()),
          fetch("/api/certifications?all=true").then((r) => r.json()),
        ]);

        setStats({
          projects: Array.isArray(prj) ? prj.length : 0,
          posts: Array.isArray(pst) ? pst.length : 0,
          experiences: Array.isArray(exp) ? exp.length : 0,
          certifications: Array.isArray(cert) ? cert.length : 0,
        });
      } catch (e) { }
    };
    loadStats();
  }, []);

  const overviewCards = [
    { title: "Portfolio Projects", count: stats.projects, href: "/admin/projects", icon: FolderGit2 },
    { title: "Published Articles", count: stats.posts, href: "/admin/blog", icon: FileText },
    { title: "Work Experiences", count: stats.experiences, href: "/admin/experience", icon: Briefcase },
    { title: "Certifications & Trainings", count: stats.certifications, href: "/admin/certifications", icon: Award },
  ];

  const quickLinks = [
    { label: "Hero & Intro", desc: "Update bio, status line & CV", href: "/admin/hero", icon: Sparkles },
    { label: "About Bio", desc: "Edit profile paragraphs & photo", href: "/admin/about", icon: User },
    { label: "Projects Portfolio", desc: "Manage showcase projects", href: "/admin/projects", icon: FolderGit2 },
    { label: "Articles & Blog", desc: "Publish tech insights & tutorials", href: "/admin/blog", icon: FileText },
    { label: "Technical Skills", desc: "Organize frontend & backend stack", href: "/admin/skills", icon: Wrench },
    { label: "FAQs", desc: "Manage FAQs ", href: "/admin/faqs", icon: HelpCircle },
  ];

  return (
    <div>
      <AdminHeader
        title="Dashboard Overview"
        description="Real-time analytics and management controls"
      />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
        {/* Welcome Header Card */}
        <div
          className={`border rounded-2xl p-5 sm:p-6 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${isDark ? "bg-[#141414] border-[#222222]" : "bg-white border-[#e2e8f0] shadow-sm"
            }`}
        >
          <div className="space-y-1">
            <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-[#0f172a]"}`}>
              Welcome back, Krishna
            </h2>
            <p className={`text-xs ${isDark ? "text-[#a3a3a3]" : "text-[#64748b]"}`}>
              Manage all the contents of your website seamlessly across any device.
            </p>
          </div>
        </div>

        {/* Metrics Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {overviewCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.href}
                className={`border rounded-2xl p-5 transition-all group ${isDark
                  ? "bg-[#111111] border-[#222222] hover:border-[#10b981]/40 hover:bg-[#161616]"
                  : "bg-white border-[#e2e8f0] hover:border-[#10b981]/40 hover:shadow-md shadow-sm"
                  }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-[#a3a3a3]" : "text-[#64748b]"}`}>
                    {card.title}
                  </span>
                  <div className={`p-2 rounded-lg border ${isDark ? "bg-[#171717] border-[#262626] text-[#10b981]" : "bg-[#f1f5f9] border-[#e2e8f0] text-[#059669]"}`}>
                    <Icon size={16} />
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <div className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? "text-white" : "text-[#0f172a]"}`}>
                    {card.count}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-[#10b981]">
                    <span>Manage</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 2-Column Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Quick Management Shortcuts */}
          <div
            className={`lg:col-span-2 border rounded-2xl p-5 sm:p-6 space-y-4 transition-colors ${isDark ? "bg-[#111111] border-[#222222]" : "bg-white border-[#e2e8f0] shadow-sm"
              }`}
          >
            <div className={`flex items-center justify-between border-b pb-4 ${isDark ? "border-[#222222]" : "border-[#e2e8f0]"}`}>
              <h3 className={`text-sm font-bold tracking-tight flex items-center gap-2 ${isDark ? "text-white" : "text-[#0f172a]"}`}>
                <span>Quick Content Access</span>
              </h3>
              <span className={`text-xs font-mono ${isDark ? "text-[#525252]" : "text-[#94a3b8]"}`}>6 Modules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all ${isDark
                      ? "bg-[#161616] border-[#242424] hover:border-[#10b981]/40 hover:bg-[#1a1a1a]"
                      : "bg-[#f8fafc] border-[#e2e8f0] hover:border-[#10b981]/40 hover:bg-white"
                      }`}
                  >
                    <div className={`p-2 rounded-lg border ${isDark ? "bg-[#1c1c1c] border-[#2e2e2e] text-[#10b981]" : "bg-white border-[#cbd5e1] text-[#059669]"}`}>
                      <Icon size={16} />
                    </div>
                    <div className="truncate flex-1">
                      <div className={`text-xs font-semibold ${isDark ? "text-white" : "text-[#0f172a]"}`}>{item.label}</div>
                      <div className={`text-[11px] truncate ${isDark ? "text-[#737373]" : "text-[#64748b]"}`}>{item.desc}</div>
                    </div>
                    <ArrowUpRight size={14} className={`flex-shrink-0 ${isDark ? "text-[#525252]" : "text-[#94a3b8]"}`} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* System & SEO Status Widget */}
          <div
            className={`border rounded-2xl p-5 sm:p-6 space-y-4 transition-colors ${isDark ? "bg-[#111111] border-[#222222]" : "bg-white border-[#e2e8f0] shadow-sm"
              }`}
          >
            <div className={`flex items-center justify-between border-b pb-4 ${isDark ? "border-[#222222]" : "border-[#e2e8f0]"}`}>
              <h3 className={`text-sm font-bold tracking-tight ${isDark ? "text-white" : "text-[#0f172a]"}`}>
                System & SEO Status
              </h3>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className={`p-3 rounded-xl border flex items-center justify-between ${isDark ? "bg-[#161616] border-[#242424]" : "bg-[#f8fafc] border-[#e2e8f0]"}`}>
                <div className="flex items-center gap-2">
                  <Database size={15} className="text-[#10b981]" />
                  <span className={isDark ? "text-[#d4d4d4]" : "text-[#334155]"}>Database</span>
                </div>
                <span className="text-[#10b981] font-semibold">MongoDB</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between ${isDark ? "bg-[#161616] border-[#242424]" : "bg-[#f8fafc] border-[#e2e8f0]"}`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#10b981]" />
                  <span className={isDark ? "text-[#d4d4d4]" : "text-[#334155]"}>Person Schema</span>
                </div>
                <span className="text-[#10b981] font-semibold font-mono">Validated</span>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between ${isDark ? "bg-[#161616] border-[#242424]" : "bg-[#f8fafc] border-[#e2e8f0]"}`}>
                <div className="flex items-center gap-2">
                  <Globe size={15} className="text-[#10b981]" />
                  <span className={isDark ? "text-[#d4d4d4]" : "text-[#334155]"}>Entity Brand</span>
                </div>
                <span className="text-[#10b981] font-semibold">Krishna Panthi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
