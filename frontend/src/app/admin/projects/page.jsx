"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";
import ImageUploader from "@/components/admin/ImageUploader";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techText: "",
    githubUrl: "",
    demoUrl: "",
    imageUrl: "",
    order: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (Array.isArray(data)) setProjects(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      techText: "",
      githubUrl: "",
      demoUrl: "",
      imageUrl: "",
      order: projects.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      techText: (item.technologies || []).join(", "),
      githubUrl: item.githubUrl || "",
      demoUrl: item.demoUrl || "",
      imageUrl: item.imageUrl || "",
      order: item.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      loadData();
    } catch (e) {
      alert("Failed to delete project");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const techArray = formData.techText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title,
        description: formData.description,
        technologies: techArray,
        githubUrl: formData.githubUrl,
        demoUrl: formData.demoUrl,
        imageUrl: formData.imageUrl,
        order: Number(formData.order),
      };

      const url = editingItem ? `/api/projects/${editingItem._id}` : "/api/projects";
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
      header: "Project Title",
      accessor: "title",
      render: (r) => (
        <div>
          <div className={`font-semibold ${isDark ? "text-white" : "text-[#0f172a]"}`}>{r.title}</div>
          <div className={`text-xs font-mono truncate max-w-xs ${isDark ? "text-[#737373]" : "text-[#64748b]"}`}>{r.description}</div>
        </div>
      ),
    },
    {
      header: "Technologies",
      accessor: "technologies",
      render: (r) => (
        <div className="flex flex-wrap gap-1">
          {(r.technologies || []).slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                isDark ? "bg-[#1c1c1c] border-[#2e2e2e] text-[#a3a3a3]" : "bg-[#f1f5f9] border-[#cbd5e1] text-[#475569]"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "Live Demo",
      accessor: "demoUrl",
      render: (r) =>
        r.demoUrl ? (
          <a href={r.demoUrl} target="_blank" rel="noreferrer" className="text-[#10b981] font-mono text-xs hover:underline">
            Live Link
          </a>
        ) : (
          <span className={`font-mono text-xs ${isDark ? "text-[#525252]" : "text-[#94a3b8]"}`}>No link</span>
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
        title="Projects Portfolio"
        description="Manage showcase projects, tech tags, GitHub links, and live URLs"
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {loading ? (
          <div className={`font-mono text-xs ${isDark ? "text-[#737373]" : "text-[#94a3b8]"}`}>Loading projects...</div>
        ) : (
          <DataTable
            columns={columns}
            data={projects}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onAddNew={handleOpenAdd}
            addNewLabel="Add Project"
            searchKey="title"
          />
        )}
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Project" : "Add Project"}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      >
        <div className="space-y-4">
          <div>
            <label className={labelStyle}>Project Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Hostel Sarathi"
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Description</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Smart hostel discovery platform that simplifies room searching and booking for students in Nepal."
              className={`${inputStyle} text-xs`}
            />
          </div>

          <div>
            <label className={labelStyle}>Technologies Used (Comma Separated)</label>
            <input
              type="text"
              value={formData.techText}
              onChange={(e) => setFormData({ ...formData, techText: e.target.value })}
              placeholder="React, Node.js, MongoDB, Express"
              className={`${inputStyle} font-mono`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>GitHub Repository URL</label>
              <input
                type="text"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/krishnapanthee/HostelSarathi"
                className={`${inputStyle} text-xs font-mono`}
              />
            </div>
            <div>
              <label className={labelStyle}>Live Demo URL</label>
              <input
                type="text"
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                placeholder="https://hostelsarathi.com/"
                className={`${inputStyle} text-xs font-mono`}
              />
            </div>
          </div>

          <ImageUploader
            label="Project Thumbnail Image (Optional)"
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
          />
        </div>
      </FormModal>
    </div>
  );
}
