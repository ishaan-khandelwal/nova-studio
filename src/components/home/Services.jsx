"use client";

import { useEffect, useState } from "react";
import { Palette, Code, Sparkles } from "lucide-react";
import axios from "axios";

const IconMap = {
  Palette: Palette,
  Code: Code,
  Sparkles: Sparkles,
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await axios.get("/api/services");
        setServices(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-24 px-4 border-t transition-colors duration-300" style={{ borderColor: 'var(--border-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-extrabold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Our Expertise
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            We deliver top-tier fullstack engineering and branding solutions tailored to help digital brands scale.
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 rounded-3xl animate-pulse" 
                   style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-primary)" }} />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center p-8 border rounded-2xl" style={{ borderColor: "var(--border-primary)", color: "var(--text-secondary)" }}>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = IconMap[service.icon] || Code;
              return (
                <div
                  key={service.id}
                  className="p-8 rounded-3xl border shadow-sm transition-all duration-300 flex flex-col justify-between"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-primary)",
                  }}
                >
                  <div>
                    <div
                      className="h-12 w-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm border animate-none"
                      style={{
                        backgroundColor: "var(--bg-badge)",
                        borderColor: "var(--border-accent)",
                        color: "var(--text-accent)",
                      }}
                    >
                      <IconComponent size={24} />
                    </div>

                    <h3
                      className="text-xl font-bold mb-4"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {service.title}
                    </h3>

                    <p
                      className="text-sm leading-relaxed mb-6"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {service.description}
                    </p>
                  </div>

                  <a
                    href="#contact"
                    className="text-sm font-bold inline-flex items-center gap-1.5 transition-colors hover:opacity-80"
                    style={{ color: "var(--text-accent)" }}
                  >
                    <span>Learn More</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
