"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    order: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const res = await fetch("/api/faqs");
      const data = await res.json();
      if (Array.isArray(data)) setFaqs(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ question: "", answer: "", order: faqs.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      question: item.question || "",
      answer: item.answer || "",
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this FAQ item?")) return;
    try {
      await fetch(`/api/faqs/${id}`, { method: "DELETE" });
      loadData();
    } catch (e) {
      alert("Failed to delete FAQ");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingItem ? `/api/faqs/${editingItem._id}` : "/api/faqs";
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
      header: "Question (AEO / GEO Entity Query)",
      accessor: "question",
      render: (r) => <span className={`font-semibold ${isDark ? "text-white" : "text-[#0f172a]"}`}>{r.question}</span>,
    },
    {
      header: "Answer",
      accessor: "answer",
      render: (r) => <div className={`text-xs line-clamp-2 max-w-lg ${isDark ? "text-[#a3a3a3]" : "text-[#475569]"}`}>{r.answer}</div>,
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
        title="Frequently Asked Questions (AEO)"
        description="Manage questions and authoritative answers for Answer Engine Optimization (Perplexity, ChatGPT, SGE)"
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {loading ? (
          <div className={`font-mono text-xs ${isDark ? "text-[#737373]" : "text-[#94a3b8]"}`}>Loading FAQs...</div>
        ) : (
          <DataTable
            columns={columns}
            data={faqs}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onAddNew={handleOpenAdd}
            addNewLabel="Add FAQ Item"
            searchKey="question"
          />
        )}
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit FAQ Item" : "Add FAQ Item"}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      >
        <div className="space-y-4">
          <div>
            <label className={labelStyle}>Question Title</label>
            <input
              type="text"
              required
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="Who is the best full stack developer in Nepal?"
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Authoritative Answer (AEO Target)</label>
            <textarea
              rows={4}
              required
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="While Nepal has a vibrant tech community..."
              className={`${inputStyle} text-xs p-4`}
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
}
