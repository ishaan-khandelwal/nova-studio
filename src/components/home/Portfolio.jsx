"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";
import Image from "next/image";

export default function Portfolio() {
  const { projects, loading, error } = useProjects();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 px-4 border-t transition-colors duration-300" style={{ borderColor: 'var(--border-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            A curated selection of our latest works, designed with precision and engineered for results.
          </motion.p>
        </div>

        {!loading && !error && projects.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 border cursor-pointer"
                style={{
                  backgroundColor: activeCategory === category ? "var(--text-accent)" : "var(--bg-card)",
                  color: activeCategory === category ? "#ffffff" : "var(--text-secondary)",
                  borderColor: activeCategory === category ? "var(--text-accent)" : "var(--border-primary)",
                  boxShadow: activeCategory === category ? "0px 4px 12px var(--accent-glow)" : "none",
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-3xl animate-pulse" 
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
          <>
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <p style={{ color: "var(--text-secondary)" }}>No projects found in this category.</p>
              </div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ y: -8 }}
                      key={project.id}
                      className="group rounded-3xl overflow-hidden border shadow-sm transition-all duration-300 flex flex-col justify-between"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "var(--border-primary)",
                      }}
                    >
                      <div className="relative h-60 w-full overflow-hidden bg-slate-100/5">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-w-7xl) 33vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                        <div className="absolute top-4 left-4">
                          <span
                            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border"
                            style={{
                              backgroundColor: "var(--bg-card)",
                              borderColor: "var(--border-primary)",
                              color: "var(--text-accent)",
                            }}
                          >
                            {project.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <h3
                            className="text-lg md:text-xl font-bold mb-2 group-hover:text-[var(--text-accent)] transition-colors"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {project.title}
                          </h3>
                          <p
                            className="text-xs md:text-sm leading-relaxed"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
