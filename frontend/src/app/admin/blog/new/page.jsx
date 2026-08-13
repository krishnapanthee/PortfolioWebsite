"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import RichTextEditor from "@/components/admin/RichTextEditor";
import PostFaqManager from "@/components/admin/PostFaqManager";
import SEOPreview from "@/components/admin/SEOPreview";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function AdminNewPostPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    readTime: "5 min read",
    category: "Architecture",
    content: "<p>Write your article content here...</p>",
    published: true,
    metaTitle: "",
    metaDescription: "",
    faqs: [],
  });
  const [submitting, setSubmitting] = useState(false);

  const handleTitleChange = (val) => {
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug === "" || prev.slug === autoSlug.substring(0, prev.slug.length) ? autoSlug : prev.slug,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/blog");
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create post");
      }
    } catch (e) {
      alert("Error saving post");
    } finally {
      setSubmitting(false);
    }
  };

  const cardStyle = `border rounded-2xl p-6 space-y-5 transition-colors ${
    isDark ? "bg-[#111111] border-[#222222]" : "bg-white border-[#e2e8f0] shadow-sm"
  }`;

  const inputStyle = `w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#10b981] transition-colors ${
    isDark ? "bg-[#171717] border-[#2e2e2e] text-white placeholder-[#525252]" : "bg-white border-[#cbd5e1] text-[#0f172a] placeholder-[#94a3b8]"
  }`;

  const labelStyle = `block text-xs font-mono font-medium uppercase tracking-wider mb-2 ${
    isDark ? "text-[#a3a3a3]" : "text-[#475569]"
  }`;

  return (
    <div>
      <AdminHeader
        title="Write New Article"
        description="Craft rich text posts with embedded code blocks, formatting, post FAQs, and live SEO snippet metadata"
        actions={
          <Link
            href="/admin/blog"
            className={`flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors ${
              isDark
                ? "text-[#a3a3a3] hover:text-white bg-[#1c1c1c] border-[#2e2e2e]"
                : "text-[#475569] hover:text-[#0f172a] bg-[#f1f5f9] border-[#cbd5e1]"
            }`}
          >
            <ArrowLeft size={14} /> Back to Posts
          </Link>
        }
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Form (2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className={cardStyle}>
              <div>
                <label className={labelStyle}>Article Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Building Scalable MERN Applications..."
                  className={`${inputStyle} text-base font-semibold`}
                />
              </div>

              <div>
                <label className={labelStyle}>URL Slug</label>
                <div
                  className={`flex items-center border rounded-xl px-3 font-mono text-xs ${
                    isDark ? "bg-[#171717] border-[#2e2e2e] text-[#737373]" : "bg-white border-[#cbd5e1] text-[#64748b]"
                  }`}
                >
                  <span>/blog/</span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="building-scalable-mern-applications"
                    className={`flex-1 bg-transparent py-2.5 outline-none ${isDark ? "text-white" : "text-[#0f172a]"}`}
                  />
                </div>
              </div>

              <div>
                <label className={labelStyle}>Excerpt / Brief Summary</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="A practical guide on structuring full-stack Node.js and React codebases..."
                  className={`${inputStyle} text-xs`}
                />
              </div>

              <div>
                <label className={labelStyle}>Article Content (TipTap WYSIWYG Editor)</label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(html) => setFormData({ ...formData, content: html })}
                />
              </div>
            </div>

            {/* Post FAQs Manager Section below text editor */}
            <PostFaqManager
              faqs={formData.faqs}
              onChange={(newFaqs) => setFormData({ ...formData, faqs: newFaqs })}
            />
          </div>

          {/* Sidebar SEO & Settings (1 Column) */}
          <div className="space-y-6">
            <div className={cardStyle}>
              <h3 className={`text-xs font-mono font-bold uppercase tracking-wider border-b pb-3 ${
                isDark ? "text-white border-[#222222]" : "text-[#0f172a] border-[#e2e8f0]"
              }`}>
                Publishing Settings
              </h3>

              <div>
                <label className={labelStyle}>Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Architecture / Performance / Design"
                  className={`${inputStyle} text-xs`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-[11px] font-mono mb-1 ${isDark ? "text-[#a3a3a3]" : "text-[#475569]"}`}>Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={`${inputStyle} px-2.5 py-1.5 text-xs`}
                  />
                </div>
                <div>
                  <label className={`block text-[11px] font-mono mb-1 ${isDark ? "text-[#a3a3a3]" : "text-[#475569]"}`}>Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className={`${inputStyle} px-2.5 py-1.5 text-xs`}
                  />
                </div>
              </div>

              <div className={`flex items-center justify-between pt-2 border-t ${isDark ? "border-[#222222]" : "border-[#e2e8f0]"}`}>
                <span className={`text-xs font-mono ${isDark ? "text-white" : "text-[#0f172a]"}`}>Publish Status</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, published: !formData.published })}
                  className={`px-3 py-1 rounded-full text-xs font-mono cursor-pointer transition-colors ${
                    formData.published ? "bg-[#10b981]/20 text-[#10b981]" : isDark ? "bg-[#262626] text-[#737373]" : "bg-[#e2e8f0] text-[#64748b]"
                  }`}
                >
                  {formData.published ? "Published" : "Draft"}
                </button>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full font-semibold font-mono text-xs py-3 rounded-xl transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 ${
                  isDark
                    ? "bg-[#10b981] hover:bg-[#059669] text-black"
                    : "bg-[#0f172a] hover:bg-[#1e293b] text-white"
                }`}
              >
                {submitting ? (
                  <div className={`w-3.5 h-3.5 border-2 ${isDark ? "border-black" : "border-white"} border-t-transparent rounded-full animate-spin`}></div>
                ) : (
                  <>
                    <Save size={15} />
                    <span>Publish Post</span>
                  </>
                )}
              </button>
            </div>

            {/* SERP Live Preview */}
            <SEOPreview
              title={formData.metaTitle || formData.title}
              description={formData.metaDescription || formData.description}
              slug={formData.slug}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
