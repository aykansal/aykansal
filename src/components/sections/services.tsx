"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { services, type Service } from "@/content/services";
import { SOCIAL } from "@/config/links";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Service Row ─── */

function ServiceRow({ service, index, isOpen, onToggle, hasActive }: { service: Service; index: number; isOpen: boolean; onToggle: () => void; hasActive: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <motion.div
            ref={ref}
            className="group relative overflow-hidden border-b border-border-default"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.08, ease }}
        >
            {/* Left accent border — visible when open */}
            <motion.div
                className="absolute top-0 left-0 bottom-0 w-[3px] bg-accent-primary"
                initial={false}
                animate={{ scaleY: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease }}
                style={{ originY: 0 }}
            />

            {/* Scan-line hover effect */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="animate-scan-once absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,var(--accent-primary)_50%,transparent_100%)] opacity-[0.03]" />
            </div>

            {/* Header row — always visible */}
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                className={`flex w-full cursor-pointer items-center gap-4 py-6 pl-5 pr-2 text-left transition-opacity duration-300 min-[480px]:gap-6 min-[480px]:py-8 min-[480px]:pl-6 ${
                    hasActive && !isOpen ? "opacity-40" : "opacity-100"
                }`}
            >
                {/* Number */}
                <span className={`font-jetbrains text-2xl font-medium transition-colors duration-300 ${isOpen ? "text-accent-primary" : "text-text-muted"}`}>
                    {service.number}
                </span>

                {/* Title */}
                <span
                    className={`font-jetbrains text-[14px] font-semibold tracking-wide transition-colors duration-300 ${isOpen ? "text-text-primary" : "text-text-secondary"}`}
                >
                    {service.title}
                </span>

                {/* Toggle icon */}
                <span className="ml-auto shrink-0 pr-2">
                    <motion.span className="block font-jetbrains text-2xl leading-none text-text-muted" initial={false} animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2, ease }}>
                        +
                    </motion.span>
                </span>
            </button>

            {/* Expandable content */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col gap-5 pb-8 pl-5 pr-4 min-[480px]:pl-6">
                            {/* Offset to align with title (past the number) */}
                            <div className="min-[480px]:pl-[72px]">
                                {/* Description */}
                                <motion.p
                                    className="font-space text-[14px] leading-normal text-text-secondary"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.05, ease }}
                                >
                                    {service.description}
                                </motion.p>

                                {/* Includes list */}
                                <div className="mt-4 flex flex-col gap-1.5">
                                    {service.includes.map((item, i) => (
                                        <motion.span
                                            key={item}
                                            className="font-space text-[14px] leading-normal text-text-tertiary"
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.25, delay: 0.1 + i * 0.04, ease }}
                                        >
                                            · {item}
                                        </motion.span>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ─── Services Section ─── */

export function Services() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="mt-24" aria-label="Services">
            <motion.h2
                className="font-micro text-[40px] leading-none text-text-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
            >
                SERVICES
            </motion.h2>

            {/* Top border */}
            <div className="mt-8 border-t border-border-default">
                {services.map((s, i) => (
                    <ServiceRow key={s.number} service={s} index={i} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} hasActive={openIndex !== null} />
                ))}
            </div>

            {/* CTA + Availability */}
            <div className="mt-6 flex flex-col-reverse items-start gap-3 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between">
                <motion.p
                    className="flex items-center gap-2 font-space text-[12px] text-accent-tertiary"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3, ease }}
                >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-tertiary animate-[status-pulse_2s_ease-in-out_infinite]" />
                    CURRENTLY ACCEPTING NEW PROJECTS
                </motion.p>
                <a
                    href={SOCIAL.cal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-accent-primary px-4 py-2 font-jetbrains text-[12px] uppercase tracking-wider text-accent-primary transition-colors hover:bg-accent-primary hover:text-bg-primary"
                >
                    BOOK A CALL
                </a>
            </div>
        </section>
    );
}
