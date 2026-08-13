"use client";

import AuthGuard from "@/components/admin/AuthGuard";
import Sidebar from "@/components/admin/Sidebar";
import { useEffect, useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

const AdminMobileContext = createContext({
  mobileOpen: false,
  setMobileOpen: () => {},
});

export const useAdminMobile = () => useContext(AdminMobileContext);

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [counts, setCounts] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (pathname === "/admin/login") return;

    const fetchCounts = async () => {
      try {
        const [exp, edu, skl, prj, pst, tst, faq, soc] = await Promise.all([
          fetch("/api/experiences").then((r) => r.json()),
          fetch("/api/education").then((r) => r.json()),
          fetch("/api/skills").then((r) => r.json()),
          fetch("/api/projects").then((r) => r.json()),
          fetch("/api/posts").then((r) => r.json()),
          fetch("/api/testimonials").then((r) => r.json()),
          fetch("/api/faqs").then((r) => r.json()),
          fetch("/api/social").then((r) => r.json()),
        ]);

        setCounts({
          experience: Array.isArray(exp) ? exp.length : 0,
          education: Array.isArray(edu) ? edu.length : 0,
          skills: Array.isArray(skl) ? skl.length : 0,
          projects: Array.isArray(prj) ? prj.length : 0,
          posts: Array.isArray(pst) ? pst.length : 0,
          testimonials: Array.isArray(tst) ? tst.length : 0,
          faqs: Array.isArray(faq) ? faq.length : 0,
          social: Array.isArray(soc) ? soc.length : 0,
        });
      } catch (e) {
        // Ignore background counter errors
      }
    };

    fetchCounts();
  }, [pathname]);

  if (pathname === "/admin/login") {
    return <AuthGuard>{children}</AuthGuard>;
  }

  return (
    <AuthGuard>
      <AdminMobileContext.Provider value={{ mobileOpen, setMobileOpen }}>
        <div
          className={`flex min-h-screen font-sans transition-colors ${
            isDark ? "bg-[#0a0a0a] text-white" : "bg-[#f8fafc] text-[#0f172a]"
          }`}
        >
          <Sidebar counts={counts} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          <main className="flex-1 flex flex-col min-w-0 overflow-y-auto w-full">
            {children}
          </main>
        </div>
      </AdminMobileContext.Provider>
    </AuthGuard>
  );
}
