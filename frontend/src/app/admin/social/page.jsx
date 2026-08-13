"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function AdminSocialPage() {
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    platform: "GitHub",
    url: "",
    label: "",
    order: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const res = await fetch("/api/social");
      const data = await res.json();
      if (Array.isArray(data)) setSocials(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ platform: "GitHub", url: "", label: "", order: socials.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      platform: item.platform || "GitHub",
      url: item.url || "",
      label: item.label || "",
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this social link?")) return;
    try {
      await fetch(`/api/social/${id}`, { method: "DELETE" });
      loadData();
    } catch (e) {
      alert("Failed to delete social link");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingItem ? `/api/social/${editingItem._id}` : "/api/social";
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
      header: "Platform",
      accessor: "platform",
      render: (r) => <span className={`font-semibold font-mono text-xs ${isDark ? "text-white" : "text-[#0f172a]"}`}>{r.platform}</span>,
    },
    {
      header: "Label",
      accessor: "label",
      render: (r) => <span className={`font-mono text-xs ${isDark ? "text-[#a3a3a3]" : "text-[#475569]"}`}>{r.label}</span>,
    },
    {
      header: "URL Link (Person.sameAs Schema)",
      accessor: "url",
      render: (r) => (
        <a href={r.url} target="_blank" rel="noreferrer" className="text-[#10b981] font-mono text-xs hover:underline truncate max-w-xs block">
          {r.url}
        </a>
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
        title="Social & Profile Links"
        description="Manage GitHub, LinkedIn, Twitter, and Email links for Person.sameAs structured data"
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {loading ? (
          <div className={`font-mono text-xs ${isDark ? "text-[#737373]" : "text-[#94a3b8]"}`}>Loading social links...</div>
        ) : (
          <DataTable
            columns={columns}
            data={socials}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onAddNew={handleOpenAdd}
            addNewLabel="Add Social Link"
            searchKey="platform"
          />
        )}
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Social Link" : "Add Social Link"}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Platform Name</label>
              <input
                type="text"
                required
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                placeholder="GitHub / LinkedIn / Twitter / Email"
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Label Text</label>
              <input
                type="text"
                required
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="GitHub"
                className={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Full Profile URL</label>
            <input
              type="text"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://github.com/krishnapanthee/"
              className={`${inputStyle} text-xs font-mono`}
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
}
