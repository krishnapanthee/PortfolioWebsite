"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";
import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    role: "",
    company: "",
    companyUrl: "",
    period: "",
    bulletsText: "",
    order: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const res = await fetch("/api/experiences");
      const data = await res.json();
      if (Array.isArray(data)) setExperiences(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ role: "", company: "", companyUrl: "", period: "", bulletsText: "", order: experiences.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      role: item.role || "",
      company: item.company || "",
      companyUrl: item.companyUrl || "",
      period: item.period || "",
      bulletsText: (item.bullets || []).join("\n"),
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this experience record?")) return;
    try {
      await fetch(`/api/experiences/${id}`, { method: "DELETE" });
      loadData();
    } catch (e) {
      alert("Failed to delete record");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const bulletsArray = formData.bulletsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        role: formData.role,
        company: formData.company,
        companyUrl: formData.companyUrl,
        period: formData.period,
        bullets: bulletsArray,
        order: Number(formData.order),
      };

      const url = editingItem ? `/api/experiences/${editingItem._id}` : "/api/experiences";
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
      header: "Role",
      accessor: "role",
      render: (r) => <span className={`font-semibold ${isDark ? "text-white" : "text-[#0f172a]"}`}>{r.role}</span>,
    },
    {
      header: "Company",
      accessor: "company",
      render: (r) => (
        <div className="flex items-center gap-1.5 font-mono text-xs text-[#10b981]">
          <span>{r.company}</span>
          {r.companyUrl && (
            <a
              href={/^https?:\/\//i.test(r.companyUrl) ? r.companyUrl : `https://${r.companyUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${isDark ? "text-[#737373] hover:text-white" : "text-[#94a3b8] hover:text-[#0f172a]"}`}
              title={r.companyUrl}
            >
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      ),
    },
    {
      header: "Period",
      accessor: "period",
      render: (r) => <span className={`font-mono text-xs ${isDark ? "text-[#737373]" : "text-[#64748b]"}`}>{r.period}</span>,
    },
    {
      header: "Bullets",
      accessor: "bullets",
      render: (r) => <span className={`font-mono text-xs ${isDark ? "text-[#a3a3a3]" : "text-[#475569]"}`}>{r.bullets?.length || 0} items</span>,
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
        title="Work Experience"
        description="Manage work history, company links, roles, and key bullet point achievements"
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {loading ? (
          <div className={`font-mono text-xs ${isDark ? "text-[#737373]" : "text-[#94a3b8]"}`}>Loading experiences...</div>
        ) : (
          <DataTable
            columns={columns}
            data={experiences}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onAddNew={handleOpenAdd}
            addNewLabel="Add Experience"
            searchKey="role"
          />
        )}
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Experience" : "Add Experience"}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      >
        <div className="space-y-4">
          <div>
            <label className={labelStyle}>Role / Job Title</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Full Stack Developer"
              className={inputStyle}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Company Name</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Techsapana"
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
                placeholder="Jan 2026 — Present"
                className={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Company Website URL</label>
            <input
              type="text"
              value={formData.companyUrl}
              onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
              placeholder="https://techsapana.com"
              className={`${inputStyle} text-xs font-mono`}
            />
          </div>

          <div>
            <label className={labelStyle}>Bullet Point Achievements (One Per Line)</label>
            <textarea
              rows={5}
              value={formData.bulletsText}
              onChange={(e) => setFormData({ ...formData, bulletsText: e.target.value })}
              placeholder="Coordinated end-to-end delivery of digital projects.&#10;Tracked milestones and planned development."
              className={`${inputStyle} text-xs font-mono p-4`}
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
}
