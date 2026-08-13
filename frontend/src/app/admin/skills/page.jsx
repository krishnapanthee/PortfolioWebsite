"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    category: "frontend",
    skillsText: "",
    order: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      if (Array.isArray(data)) setSkills(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ category: "frontend", skillsText: "", order: skills.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      category: item.category || "frontend",
      skillsText: (item.skills || []).join(", "),
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this skill category?")) return;
    try {
      await fetch(`/api/skills/${id}`, { method: "DELETE" });
      loadData();
    } catch (e) {
      alert("Failed to delete category");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const skillsArray = formData.skillsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        category: formData.category,
        skills: skillsArray,
        order: Number(formData.order),
      };

      const url = editingItem ? `/api/skills/${editingItem._id}` : "/api/skills";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      header: "Category",
      accessor: "category",
      render: (r) => <span className={`font-semibold font-mono uppercase text-xs ${isDark ? "text-white" : "text-[#0f172a]"}`}>{r.category}</span>,
    },
    {
      header: "Skill Items",
      accessor: "skills",
      render: (r) => (
        <div className="flex flex-wrap gap-1.5">
          {(r.skills || []).map((sk, idx) => (
            <span
              key={idx}
              className={`font-mono text-[11px] px-2 py-0.5 rounded border ${
                isDark ? "bg-[#171717] border-[#262626] text-[#10b981]" : "bg-[#f1f5f9] border-[#cbd5e1] text-[#059669]"
              }`}
            >
              {sk}
            </span>
          ))}
        </div>
      ),
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
        title="Technical Skills"
        description="Organize skill categories (frontend, backend, databases, tools) for JSON-LD schema & UI"
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {loading ? (
          <div className={`font-mono text-xs ${isDark ? "text-[#737373]" : "text-[#94a3b8]"}`}>Loading skills...</div>
        ) : (
          <DataTable
            columns={columns}
            data={skills}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onAddNew={handleOpenAdd}
            addNewLabel="Add Skill Category"
            searchKey="category"
          />
        )}
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Skill Category" : "Add Skill Category"}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      >
        <div className="space-y-4">
          <div>
            <label className={labelStyle}>Category Name</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="frontend / backend / databases / tools"
              className={`${inputStyle} font-mono`}
            />
          </div>

          <div>
            <label className={labelStyle}>Skills (Comma Separated)</label>
            <input
              type="text"
              required
              value={formData.skillsText}
              onChange={(e) => setFormData({ ...formData, skillsText: e.target.value })}
              placeholder="React, Next.js, TypeScript, Tailwind CSS"
              className={`${inputStyle} font-mono`}
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
}
