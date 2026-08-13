"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "@/components/admin/DataTable";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function AdminBlogIndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const loadPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      if (Array.isArray(data)) setPosts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      loadPosts();
    } catch (e) {
      alert("Failed to delete post");
    }
  };

  const columns = [
    {
      header: "Article Title",
      accessor: "title",
      render: (r) => (
        <div>
          <div className={`font-semibold ${isDark ? "text-white" : "text-[#0f172a]"}`}>{r.title}</div>
          <div className="text-xs font-mono text-[#10b981]">/blog/{r.slug}</div>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "category",
      render: (r) => (
        <span
          className={`font-mono text-xs px-2 py-0.5 rounded border ${
            isDark ? "bg-[#1c1c1c] border-[#2e2e2e] text-[#a3a3a3]" : "bg-[#f1f5f9] border-[#cbd5e1] text-[#475569]"
          }`}
        >
          {r.category}
        </span>
      ),
    },
    {
      header: "Published Date",
      accessor: "date",
      render: (r) => <span className={`font-mono text-xs ${isDark ? "text-[#737373]" : "text-[#64748b]"}`}>{r.date}</span>,
    },
    {
      header: "Status",
      accessor: "published",
      render: (r) => (
        <span
          className={`font-mono text-[11px] px-2 py-0.5 rounded-full ${
            r.published !== false ? "bg-[#10b981]/20 text-[#10b981]" : "bg-[#ef4444]/20 text-[#ef4444]"
          }`}
        >
          {r.published !== false ? "Published" : "Draft"}
        </span>
      ),
    },
  ];

  return (
    <div>
      <AdminHeader
        title="Articles & Writing (Blog)"
        description="Write, publish, and optimize blog posts for search engines with SEO / GEO SERP preview"
        actions={
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-1.5 bg-[#10b981] hover:bg-[#059669] text-black font-semibold font-mono text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <Plus size={15} />
            <span>Write New Post</span>
          </Link>
        }
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {loading ? (
          <div className={`font-mono text-xs ${isDark ? "text-[#737373]" : "text-[#94a3b8]"}`}>Loading posts...</div>
        ) : (
          <DataTable
            columns={columns}
            data={posts}
            onEdit={(row) => (window.location.href = `/admin/blog/${row._id}`)}
            onDelete={handleDelete}
            searchKey="title"
          />
        )}
      </div>
    </div>
  );
}
