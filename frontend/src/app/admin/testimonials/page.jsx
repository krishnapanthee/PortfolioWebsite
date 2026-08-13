"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    quote: "",
    author: "",
    role: "",
    link: "",
    order: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (Array.isArray(data)) setTestimonials(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ quote: "", author: "", role: "", link: "", order: testimonials.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      quote: item.quote || "",
      author: item.author || "",
      role: item.role || "",
      link: item.link || "",
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      loadData();
    } catch (e) {
      alert("Failed to delete testimonial");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingItem ? `/api/testimonials/${editingItem._id}` : "/api/testimonials";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, order: Number(formData.order) }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        loadData();
      }
    } catch (e) {
      alert("Error saving record");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: "Author & Role",
      accessor: "author",
      render: (r) => (
        <div>
          <div className={`font-semibold ${isDark ? "text-white" : "text-[#0f172a]"}`}>{r.author}</div>
          <div className="text-xs font-mono text-[#10b981]">{r.role}</div>
        </div>
      ),
    },
    {
      header: "Quote",
      accessor: "quote",
      render: (r) => <div className={`text-xs line-clamp-2 max-w-md ${isDark ? "text-[#a3a3a3]" : "text-[#475569]"}`}>"{r.quote}"</div>,
    },
  ];

  const inputStyle = `w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#10b981] transition-colors ${
    isDark ? "bg-[#171717] border-[#2e2e2e] text-white placeholder-[#525252]" : "bg-white border-[#cbd5e1] text-[#0f172a] placeholder-[#94a3b8]"
  }`;

  const labelStyle = `block text-xs font-mono font-medium uppercase tracking-wider mb-2 ${
    isDark ? "text-[#a3a3a3]" : "text-[#475569]"
  }`;

  return (
    <div>
      <AdminHeader
        title="Testimonials & Recommendations"
        description="Manage client/colleague feedback and endorsement quotes"
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {loading ? (
          <div className={`font-mono text-xs ${isDark ? "text-[#737373]" : "text-[#94a3b8]"}`}>Loading testimonials...</div>
        ) : (
          <DataTable
            columns={columns}
            data={testimonials}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onAddNew={handleOpenAdd}
            addNewLabel="Add Testimonial"
            searchKey="author"
          />
        )}
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Testimonial" : "Add Testimonial"}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Author Name</label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Parakram K.C."
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Author Role / Organization</label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Technical Lead, Uddheshya Group"
                className={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Testimonial Quote Text</label>
            <textarea
              rows={4}
              required
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              placeholder="Krishna played a pivotal role as a Full Stack Developer..."
              className={`${inputStyle} text-xs p-4`}
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
}
