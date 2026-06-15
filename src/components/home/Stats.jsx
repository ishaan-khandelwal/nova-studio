"use client";

import { useStats } from "@/hooks/useStats";

export default function Stats() {
  const { stats, loading, error } = useStats();

  return (
    <section id="stats" className="py-20 px-4 transition-colors duration-300 border-t" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-primary)' }}>
      <div className="max-w-7xl mx-auto">
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-28 rounded-2xl animate-pulse bg-slate-200/10 border border-slate-200/5" />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center p-8 border rounded-2xl" style={{ borderColor: "var(--border-primary)", color: "var(--text-secondary)" }}>
            <p>Failed to load statistics.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {stats.map((stat, index) => (
              <div
                key={stat.key || index}
                className="p-8 rounded-3xl"
              >
                <div
                  className="text-5xl md:text-6xl font-extrabold mb-3 bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--accent-gradient)" }}
                >
                  {stat.value}
                  <span>{stat.suffix}</span>
                </div>
                <h3
                  className="text-base md:text-lg font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {stat.label}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
