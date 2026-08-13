"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import AdminHeader from "@/components/admin/AdminHeader";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";
import FileUploader from "@/components/admin/FileUploader";
import { Award, FileText, ExternalLink } from "lucide-react";

export default function CertificationsAdminPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "",
    fileUrl: "",
    order: 0,
    isPublished: true,
  });

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/certifications?all=true");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setCertifications(data);
      }
    } catch (err) {
      console.error("Failed to fetch certifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleOpenAdd = () => {
    setEditingCert(null);
    setFormData({
      title: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      credentialUrl: "",
      fileUrl: "",
      order: certifications.length + 1,
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title || "",
      issuer: cert.issuer || "",
      issueDate: cert.issueDate || "",
      expiryDate: cert.expiryDate || "",
      credentialId: cert.credentialId || "",
      credentialUrl: cert.credentialUrl || "",
      fileUrl: cert.fileUrl || "",
      order: cert.order || 0,
      isPublished: cert.isPublished ?? true,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingCert
        ? `/api/certifications/${editingCert._id}`
        : "/api/certifications";
      const method = editingCert ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchCertifications();
      }
    } catch (err) {
      console.error("Error saving certification:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this certification?")) return;
    try {
      const res = await fetch(`/api/certifications/${id}`, { method: "DELETE" });
      if (res.ok) fetchCertifications();
    } catch (err) {
      console.error("Error deleting certification:", err);
    }
  };

  const handleTogglePublished = async (cert) => {
    try {
      const res = await fetch(`/api/certifications/${cert._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !cert.isPublished }),
      });
      if (res.ok) fetchCertifications();
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const columns = [
    {
      header: "Certification",
      accessor: "title",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isDark ? "bg-[#1a1a1a] text-[#10b981]" : "bg-[#f1f5f9] text-[#059669]"}`}>
            <Award size={18} />
          </div>
          <div>
            <p className={`font-semibold text-sm ${isDark ? "text-white" : "text-[#0f172a]"}`}>{row.title}</p>
            <p className={`text-xs ${isDark ? "text-[#737373]" : "text-[#64748b]"}`}>{row.issuer}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Issue Date",
      accessor: "issueDate",
      render: (row) => <span className="font-mono text-xs">{row.issueDate || "—"}</span>,
    },
    {
      header: "Attachment File",
      accessor: "fileUrl",
      render: (row) =>
        row.fileUrl ? (
          <a
            href={row.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs text-[#10b981] hover:underline"
          >
            <FileText size={14} />
            <span>View File</span>
          </a>
        ) : (
          <span className={`font-mono text-xs ${isDark ? "text-[#525252]" : "text-[#cbd5e1]"}`}>No File</span>
        ),
    },
    {
      header: "Credential URL",
      accessor: "credentialUrl",
      render: (row) =>
        row.credentialUrl ? (
          <a
            href={row.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs text-[#10b981] hover:underline"
          >
            <ExternalLink size={13} />
            <span>Verify</span>
          </a>
        ) : (
          <span className={`font-mono text-xs ${isDark ? "text-[#525252]" : "text-[#cbd5e1]"}`}>—</span>
        ),
    },
    {
      header: "Status",
      accessor: "isPublished",
      render: (row) => (
        <button
          onClick={() => handleTogglePublished(row)}
          className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-medium transition-colors cursor-pointer ${
            row.isPublished
              ? isDark
                ? "bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30"
                : "bg-[#059669]/10 text-[#059669] border border-[#059669]/30"
              : isDark
              ? "bg-[#262626] text-[#737373]"
              : "bg-[#f1f5f9] text-[#94a3b8]"
          }`}
        >
          {row.isPublished ? "Published" : "Draft"}
        </button>
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
        title="Certifications & Trainings"
        description="Manage professional certificates, digital badges, and verification attachments"
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {loading ? (
          <div className={`font-mono text-xs ${isDark ? "text-[#737373]" : "text-[#94a3b8]"}`}>
            Loading certifications...
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={certifications}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onAddNew={handleOpenAdd}
            addNewLabel="Add Certification"
            searchKey="title"
          />
        )}
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCert ? "Edit Certification" : "Add Certification"}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      >
        <div className="space-y-4">
          <div>
            <label className={labelStyle}>Certification Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. AWS Certified Solutions Architect"
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Issuing Organization *</label>
            <input
              type="text"
              required
              value={formData.issuer}
              onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
              placeholder="e.g. Amazon Web Services, Coursera, Meta"
              className={inputStyle}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Issue Date</label>
              <input
                type="text"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                placeholder="e.g. Jan 2026"
                className={inputStyle}
              />
            </div>
            <div>
              <label className={labelStyle}>Expiry Date</label>
              <input
                type="text"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                placeholder="e.g. No Expiration"
                className={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Credential ID / Registration No.</label>
            <input
              type="text"
              value={formData.credentialId}
              onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
              placeholder="e.g. AWS-SEC-984021"
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Verification URL (Credly, Official Badge Link)</label>
            <input
              type="url"
              value={formData.credentialUrl}
              onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
              placeholder="https://credly.com/badges/..."
              className={inputStyle}
            />
          </div>

          <FileUploader
            value={formData.fileUrl}
            onChange={(url) => setFormData({ ...formData, fileUrl: url })}
            label="Upload Local Certificate File (PDF, Image, Excel, Word)"
          />

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="accent-[#10b981]"
            />
            <label htmlFor="isPublished" className="font-mono text-xs cursor-pointer select-none">
              Publish on public website
            </label>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
