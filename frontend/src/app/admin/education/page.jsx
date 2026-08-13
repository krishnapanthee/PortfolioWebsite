"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function AdminEducationPage() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    period: "",
    description: "",
    order: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const res = await fetch("/api/education");
      const data = await res.json();
      if (Array.isArray(data)) setEducation(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ degree: "", institution: "", period: "", description: "", order: education.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      degree: item.degree || "",
      institution: item.institution || "",
      period: item.period || "",
      description: item.description || "",
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return;
    try {
      await fetch(`/api/education/${id}`, { method: "DELETE" });
      loadData();
    } catch (e) {
      alert("Failed to delete entry");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingItem ? `/api/education/${editingItem._id}` : "/api/education";
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
      header: "Degree / Qualification",
      accessor: "degree",
      render: (r) => <span className={`font-semibold ${isDark ? "text-white" : "text-[#0f172a]"}`}>{r.degree}</span>,
    },
    {
      header: "Institution",
      accessor: "institution",
      render: (r) => <span className="text-[#10b981] font-mono text-xs">{r.institution}</span>,
    },
    {
      header: "Period",
      accessor: "period",
      render: (r) => <span className={`font-mono text-xs ${isDark ? "text-[#737373]" : "text-[#64748b]"}`}>{r.period}</span>,
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
        title="Education History"
        description="Manage academic qualifications, degrees, and institutions"
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {loading ? (
          <div className={`font-mono text-xs ${isDark ? "text-[#737373]" : "text-[#94a3b8]"}`}>Loading education records...</div>
        ) : (
          <DataTable
            columns={columns}
            data={education}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onAddNew={handleOpenAdd}
            addNewLabel="Add Education"
            searchKey="degree"
          />
        )}
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Education" : "Add Education"}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      >
        <div className="space-y-4">
          <div>
            <label className={labelStyle}>Degree / Qualification Title</label>
            <input
              type="text"
              required
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              placeholder="BSc (Hons) Computer Science"
              className={inputStyle}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Institution Name</label>
              <input
                type="text"
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="Saipal Academy"
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Period / Timeline</label>
              <input
                type="text"
                required
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                placeholder="2022 — Present"
                className={inputStyle}
              />
            </div>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
