"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProjects } from "@/hooks/useProjects";
import { useContacts } from "@/hooks/useContacts";
import { validateProjectForm } from "@/lib/validations";
import { Plus, Trash2, Mail, Briefcase, LogOut, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import axios from "axios";

export default function AdminDashboard() {
  const router = useRouter();
  const { projects, addProject, removeProject, loading: loadingProjects } = useProjects();
  const { contacts, loading: loadingContacts } = useContacts();

  const [activeTab, setActiveTab] = useState("contacts");
  
  const [newProject, setNewProject] = useState({ title: "", category: "", image: "", description: "" });
  const [formErrors, setFormErrors] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleLogout = () => {
    router.push("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setSubmitStatus(null);

    const { isValid, errors } = validateProjectForm(newProject);
    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    setSubmitLoading(true);
    try {
      await addProject(newProject);
      setSubmitStatus("success");
      setNewProject({ title: "", category: "", image: "", description: "" });
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await removeProject(id);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete project");
    }
  };

  return (
    <div className="min-h-screen py-24 px-4 md:px-8 transition-colors duration-300" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-6 mb-8" style={{ borderColor: "var(--border-primary)" }}>
          <div>
            <h1 className="text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>
              Nova Studio <span style={{ color: "var(--text-accent)" }}>Dashboard</span>
            </h1>
            <p className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>
              Manage inquiries and portfolio submissions
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold shadow-sm transition-all hover:bg-slate-500/10 cursor-pointer"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-primary)",
              color: "var(--text-primary)",
            }}
          >
            <LogOut size={16} />
            <span>Exit Panel</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab("contacts")}
              className="flex items-center gap-3 w-full px-5 py-4 rounded-2xl text-left font-bold text-sm transition-all border cursor-pointer animate-none"
              style={{
                backgroundColor: activeTab === "contacts" ? "var(--bg-badge)" : "var(--bg-card)",
                color: activeTab === "contacts" ? "var(--text-accent)" : "var(--text-secondary)",
                borderColor: activeTab === "contacts" ? "var(--border-accent)" : "var(--border-primary)",
              }}
            >
              <Mail size={18} />
              <span>Contact Inquiries ({contacts.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className="flex items-center gap-3 w-full px-5 py-4 rounded-2xl text-left font-bold text-sm transition-all border cursor-pointer animate-none"
              style={{
                backgroundColor: activeTab === "projects" ? "var(--bg-badge)" : "var(--bg-card)",
                color: activeTab === "projects" ? "var(--text-accent)" : "var(--text-secondary)",
                borderColor: activeTab === "projects" ? "var(--border-accent)" : "var(--border-primary)",
              }}
            >
              <Briefcase size={18} />
              <span>Manage Projects ({projects.length})</span>
            </button>
          </div>

          <div className="lg:col-span-3">
            {activeTab === "contacts" && (
              <div className="rounded-3xl border p-6 md:p-8" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-primary)" }}>
                <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                  Contact Submissions
                </h2>

                {loadingContacts ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="animate-spin text-indigo-500" size={36} />
                  </div>
                ) : contacts.length === 0 ? (
                  <div className="text-center py-12" style={{ color: "var(--text-secondary)" }}>
                    No contact form inquiries submitted yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b" style={{ borderColor: "var(--border-primary)" }}>
                          <th className="pb-4 font-bold" style={{ color: "var(--text-secondary)" }}>Name</th>
                          <th className="pb-4 font-bold" style={{ color: "var(--text-secondary)" }}>Email</th>
                          <th className="pb-4 font-bold" style={{ color: "var(--text-secondary)" }}>Message</th>
                          <th className="pb-4 font-bold" style={{ color: "var(--text-secondary)" }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((contact) => (
                          <tr key={contact.id} className="border-b" style={{ borderColor: "var(--border-primary)" }}>
                            <td className="py-4 font-semibold" style={{ color: "var(--text-primary)" }}>{contact.name}</td>
                            <td className="py-4 text-indigo-500 font-semibold">{contact.email}</td>
                            <td className="py-4" style={{ color: "var(--text-secondary)" }}>{contact.message}</td>
                            <td className="py-4 text-xs" style={{ color: "var(--text-muted)" }}>
                              {new Date(contact.createdAt).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-8">
                <div className="rounded-3xl border p-6 md:p-8" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-primary)" }}>
                  <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                    Add Portfolio Project
                  </h2>

                  {submitStatus === "success" && (
                    <div className="flex items-center gap-3 p-4 rounded-xl border mb-6 text-emerald-800 bg-emerald-50 dark:bg-emerald-950/10 dark:text-emerald-300"
                         style={{ borderColor: "rgba(16, 185, 129, 0.2)" }}>
                      <CheckCircle size={20} />
                      <span className="text-sm font-semibold">Project created successfully!</span>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-3 p-4 rounded-xl border mb-6 text-rose-800 bg-rose-50 dark:bg-rose-950/10 dark:text-rose-300"
                         style={{ borderColor: "rgba(244, 63, 94, 0.2)" }}>
                      <AlertCircle size={20} />
                      <span className="text-sm font-semibold">Failed to create project. Please verify DB setup.</span>
                    </div>
                  )}

                  <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label htmlFor="title" className="text-xs font-bold mb-2" style={{ color: "var(--text-secondary)" }}>Project Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={newProject.title}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl border text-sm font-semibold outline-none"
                        style={{ backgroundColor: "var(--bg-primary)", borderColor: formErrors.title ? "rgba(244,63,94,0.4)" : "var(--border-primary)", color: "var(--text-primary)" }}
                        placeholder="e.g., Nova E-Commerce Platform"
                      />
                      {formErrors.title && <span className="text-xs text-rose-500 mt-1 font-semibold">{formErrors.title}</span>}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="category" className="text-xs font-bold mb-2" style={{ color: "var(--text-secondary)" }}>Category</label>
                      <select
                        id="category"
                        name="category"
                        value={newProject.category}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl border text-sm font-semibold outline-none"
                        style={{ backgroundColor: "var(--bg-primary)", borderColor: formErrors.category ? "rgba(244,63,94,0.4)" : "var(--border-primary)", color: "var(--text-primary)" }}
                      >
                        <option value="">Select Category</option>
                        <option value="Web Design">Web Design</option>
                        <option value="Front-End Development">Front-End Development</option>
                        <option value="Branding">Branding</option>
                      </select>
                      {formErrors.category && <span className="text-xs text-rose-500 mt-1 font-semibold">{formErrors.category}</span>}
                    </div>

                    <div className="flex flex-col md:col-span-2">
                      <label htmlFor="image" className="text-xs font-bold mb-2" style={{ color: "var(--text-secondary)" }}>Image URL</label>
                      <input
                        type="text"
                        id="image"
                        name="image"
                        value={newProject.image}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl border text-sm font-semibold outline-none"
                        style={{ backgroundColor: "var(--bg-primary)", borderColor: formErrors.image ? "rgba(244,63,94,0.4)" : "var(--border-primary)", color: "var(--text-primary)" }}
                        placeholder="e.g., https://images.unsplash.com/... or /images/portfolio.jpg"
                      />
                      {formErrors.image && <span className="text-xs text-rose-500 mt-1 font-semibold">{formErrors.image}</span>}
                    </div>

                    <div className="flex flex-col md:col-span-2">
                      <label htmlFor="description" className="text-xs font-bold mb-2" style={{ color: "var(--text-secondary)" }}>Project Description</label>
                      <textarea
                        id="description"
                        name="description"
                        value={newProject.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="px-4 py-3 rounded-xl border text-sm font-semibold outline-none resize-none"
                        style={{ backgroundColor: "var(--bg-primary)", borderColor: formErrors.description ? "rgba(244,63,94,0.4)" : "var(--border-primary)", color: "var(--text-primary)" }}
                        placeholder="Brief project details..."
                      />
                      {formErrors.description && <span className="text-xs text-rose-500 mt-1 font-semibold">{formErrors.description}</span>}
                    </div>

                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        disabled={submitLoading}
                        className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold text-white shadow-md cursor-pointer w-full sm:w-auto"
                        style={{ background: "var(--accent-gradient)" }}
                      >
                        {submitLoading ? (
                          <>
                            <Loader2 className="animate-spin" size={16} />
                            <span>Adding Project...</span>
                          </>
                        ) : (
                          <>
                            <Plus size={16} />
                            <span>Add Project</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="rounded-3xl border p-6 md:p-8" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-primary)" }}>
                  <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                    Current Projects
                  </h2>

                  {loadingProjects ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="animate-spin text-indigo-500" size={36} />
                    </div>
                  ) : projects.length === 0 ? (
                    <div className="text-center py-12" style={{ color: "var(--text-secondary)" }}>
                      No projects added yet.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="border-b" style={{ borderColor: "var(--border-primary)" }}>
                            <th className="pb-4 font-bold" style={{ color: "var(--text-secondary)" }}>Project Info</th>
                            <th className="pb-4 font-bold" style={{ color: "var(--text-secondary)" }}>Category</th>
                            <th className="pb-4 font-bold text-right" style={{ color: "var(--text-secondary)" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects.map((project) => (
                            <tr key={project.id} className="border-b" style={{ borderColor: "var(--border-primary)" }}>
                              <td className="py-4">
                                <div className="flex items-center gap-4">
                                  <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-slate-100/5">
                                    <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
                                  </div>
                                  <div>
                                    <div className="font-bold" style={{ color: "var(--text-primary)" }}>{project.title}</div>
                                    <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{project.description.slice(0, 60)}...</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4">
                                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                                      style={{ backgroundColor: "var(--bg-badge)", borderColor: "var(--border-accent)", color: "var(--text-accent)" }}>
                                  {project.category}
                                </span>
                              </td>
                              <td className="py-4 text-right">
                                <button
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="p-2.5 rounded-xl hover:bg-rose-500/15 transition-all text-rose-500 cursor-pointer inline-flex items-center justify-center border border-transparent hover:border-rose-500/20"
                                  title="Delete Project"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
