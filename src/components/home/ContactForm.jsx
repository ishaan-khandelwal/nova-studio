"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { validateContactForm } from "@/lib/validations";
import axios from "axios";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus(null);

    const { isValid, errors: validationErrors } = validateContactForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/contact", formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      try {
        await axios.post('/api/analytics', {
          eventType: 'cta_click',
          elementId: 'contact_submit',
          url: window.location.href,
        });
      } catch (_) {}
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 border-t transition-colors duration-300" style={{ borderColor: 'var(--border-primary)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-extrabold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Start a Project
          </h2>
          <p
            className="text-base md:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Have an idea or a project in mind? Fill out the form and our team will get back to you shortly.
          </p>
        </div>

        <div
          className="p-8 md:p-12 rounded-3xl border shadow-lg"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-primary)",
          }}
        >
          {status === "success" && (
            <div
              className="flex items-center gap-3 p-4 rounded-xl border mb-8 text-emerald-800 bg-emerald-50 dark:bg-emerald-950/10 dark:text-emerald-300"
              style={{ borderColor: "rgba(16, 185, 129, 0.2)" }}
            >
              <CheckCircle className="shrink-0" size={20} />
              <div className="text-sm font-semibold">
                Thank you! Your inquiry was submitted successfully. We will reach out soon.
              </div>
            </div>
          )}

          {status === "error" && (
            <div
              className="flex items-center gap-3 p-4 rounded-xl border mb-8 text-rose-800 bg-rose-50 dark:bg-rose-950/10 dark:text-rose-300"
              style={{ borderColor: "rgba(244, 63, 94, 0.2)" }}
            >
              <AlertCircle className="shrink-0" size={20} />
              <div className="text-sm font-semibold">
                An error occurred. Please try again or check your database configuration.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-bold mb-2" style={{ color: "var(--text-secondary)" }}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                className="px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all outline-none"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: errors.name ? "rgba(244,63,94,0.4)" : "var(--border-primary)",
                  color: "var(--text-primary)",
                }}
                placeholder="Enter your name"
              />
              {errors.name && (
                <span className="text-xs font-semibold text-rose-500 mt-1.5">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-bold mb-2" style={{ color: "var(--text-secondary)" }}>
                Email Address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all outline-none"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: errors.email ? "rgba(244,63,94,0.4)" : "var(--border-primary)",
                  color: "var(--text-primary)",
                }}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <span className="text-xs font-semibold text-rose-500 mt-1.5">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="text-sm font-bold mb-2" style={{ color: "var(--text-secondary)" }}>
                Project Scope / Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                rows={5}
                className="px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all outline-none resize-none"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: errors.message ? "rgba(244,63,94,0.4)" : "var(--border-primary)",
                  color: "var(--text-primary)",
                }}
                placeholder="Briefly describe your project details"
              />
              {errors.message && (
                <span className="text-xs font-semibold text-rose-500 mt-1.5">{errors.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-4 font-bold text-white shadow-md transition-all cursor-pointer"
              style={{
                background: "var(--accent-gradient)",
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
