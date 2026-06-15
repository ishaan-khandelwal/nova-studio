"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const triggerCtaClick = async () => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType: 'cta_click', elementId: 'start_project_cta', url: window.location.href }),
      });
    } catch (err) {
      console.error('Analytics error:', err);
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full blur-[120px]" 
             style={{ background: 'var(--accent-gradient)' }} />
        <div className="absolute bottom-[20%] right-[10%] w-[25vw] h-[25vw] rounded-full blur-[100px]" 
             style={{ background: 'var(--text-accent)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 text-xs md:text-sm font-bold shadow-sm"
          style={{
            backgroundColor: "var(--bg-badge)",
            borderColor: "var(--border-accent)",
            color: "var(--text-accent)",
          }}
        >
          <Sparkles size={14} />
          <span>Award Winning Digital Agency</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          We Construct Digital Products at <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--accent-gradient)" }}>Nova Studio</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          A digital agency platform tailored to design, build, and deploy premium web applications. We blend cutting-edge technology with high-fidelity design to elevate your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#contact"
            onClick={triggerCtaClick}
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 25px var(--accent-glow)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-lg transition-all"
            style={{ background: "var(--accent-gradient)" }}
          >
            <span>Start a Project</span>
            <ArrowRight size={18} />
          </motion.a>

          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.05, backgroundColor: "var(--bg-badge)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold border transition-all"
            style={{
              borderColor: "var(--border-primary)",
              color: "var(--text-primary)",
              backgroundColor: "var(--bg-card)"
            }}
          >
            <span>Explore Work</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
