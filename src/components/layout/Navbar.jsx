"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggler";

const navItems = [
    { name: "Services", href: "/#services" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Metrics", href: "/#stats" },
    { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8"
        >
            <div className="mx-auto max-w-7xl">
                <nav
                    className="relative flex items-center justify-between rounded-full border px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md"
                    style={{
                        backgroundColor: "var(--glass-bg)",
                        borderColor: "var(--border-primary)",
                    }}
                >
                    <Link href="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight group"
                        style={{ color: "var(--text-primary)" }}
                    >
                        <motion.div
                            whileHover={{ rotate: 180, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-[0_4px_15px_rgba(99,102,241,0.35)]"
                            style={{ background: "var(--accent-gradient)" }}
                        >
                            <Sparkles size={18} />
                        </motion.div>
                        <span className="font-extrabold" style={{ color: "var(--text-primary)" }}>
                            Nova <span style={{ color: "var(--text-accent)" }}>Studio</span>
                        </span>
                    </Link>

                    <ul className="hidden md:flex items-center space-x-1">
                        {navItems.map((item, index) => (
                            <li key={item.name} className="relative">
                                <a
                                    href={item.href}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className="relative block px-4 py-2 text-sm font-semibold transition-colors"
                                    style={{ color: hoveredIndex === index ? "var(--text-accent)" : "var(--text-secondary)" }}
                                >
                                    {hoveredIndex === index && (
                                        <motion.span
                                            layoutId="navHover"
                                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                            className="absolute inset-0 z-0 rounded-full"
                                            style={{ backgroundColor: "var(--bg-badge)", border: "1px solid var(--border-accent)" }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggle />
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05, boxShadow: "0px 6px 20px var(--accent-glow)" }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center space-x-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all"
                            style={{ background: "var(--accent-gradient)" }}
                        >
                            <span>Start a Project</span>
                            <ArrowRight size={14} />
                        </motion.a>
                    </div>

                    <div className="flex md:hidden items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="rounded-lg p-1 focus:outline-none cursor-pointer"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-4 right-4 top-24 z-40 overflow-hidden rounded-2xl border p-6 shadow-2xl backdrop-blur-lg md:hidden"
                        style={{
                            backgroundColor: "var(--bg-card)",
                            borderColor: "var(--border-primary)",
                        }}
                    >
                        <ul className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-base font-semibold transition-colors"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}

                            <li className="pt-2 border-t" style={{ borderColor: "var(--border-primary)" }}>
                                <a
                                    href="#contact"
                                    onClick={() => setIsOpen(false)}
                                    className="flex w-full items-center justify-center space-x-2 rounded-xl py-3 font-semibold text-white shadow-lg"
                                    style={{ background: "var(--accent-gradient)" }}
                                >
                                    <span>Start a Project</span>
                                    <ArrowRight size={16} />
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
