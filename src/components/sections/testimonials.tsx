"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { testimonials, type Testimonial } from "@/content/testimonials.tbd";

const GLYPHS = "█▓░▒#@$%&!?*+=~^<>{}[]|/\\";
const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Testimonial Card ─── */

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    const textRef = useRef<HTMLParagraphElement>(null);
    const animRef = useRef<number>(0);
    const busyRef = useRef(false);

    const decrypt = useCallback(
        (cx: number, cy: number) => {
            if (!textRef.current || busyRef.current) return;
            const el = textRef.current as HTMLParagraphElement;
            busyRef.current = true;

            const quote = testimonial.quote;
            const chars = quote.split("");
            const rect = el.getBoundingClientRect();

            const nx = Math.max(0, Math.min(1, (cx - rect.left) / rect.width));
            const ny = Math.max(0, Math.min(1, (cy - rect.top) / rect.height));

            const fontSize = parseFloat(getComputedStyle(el).fontSize) || 15;
            const cpl = Math.max(1, Math.floor(rect.width / (fontSize * 0.6)));
            const rows = Math.max(1, Math.ceil(chars.length / cpl));

            const dist = chars.map((_, i) => {
                const col = (i % cpl) / cpl;
                const row = rows > 1 ? Math.floor(i / cpl) / (rows - 1) : 0;
                return Math.sqrt((col - nx) ** 2 + (row - ny) ** 2);
            });
            const peak = Math.max(...dist, 0.001);

            const t0 = performance.now();

            function tick() {
                const t = performance.now() - t0;
                let out = "";

                if (t < 100) {
                    for (const c of chars) {
                        out += c === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
                    }
                } else {
                    const dt = t - 100;
                    for (let i = 0; i < chars.length; i++) {
                        if (chars[i] === " ") {
                            out += " ";
                            continue;
                        }
                        out += dt >= (dist[i] / peak) * 500 ? chars[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
                    }
                }

                el.textContent = out;

                if (t < 600) {
                    animRef.current = requestAnimationFrame(tick);
                } else {
                    el.textContent = quote;
                    busyRef.current = false;
                }
            }

            animRef.current = requestAnimationFrame(tick);
        },
        [testimonial.quote],
    );

    useEffect(() => () => cancelAnimationFrame(animRef.current), []);

    return (
        <div
            className="group flex w-[320px] shrink-0 flex-col gap-3 border border-border-default bg-bg-secondary p-5 min-[480px]:w-[360px]"
            onMouseEnter={(e) => decrypt(e.clientX, e.clientY)}
            onTouchStart={(e) => {
                const touch = e.touches[0];
                decrypt(touch.clientX, touch.clientY);
            }}
        >
            {/* Oversized opening quote */}
            <span className="select-none font-jetbrains text-2xl font-bold leading-none text-accent-primary" aria-hidden="true">
                &ldquo;
            </span>

            {/* Quote text */}
            <p ref={textRef} className="font-space text-[14px] leading-normal text-text-secondary">
                {testimonial.quote}
            </p>

            {/* Author */}
            <div className="mt-auto border-t border-border-subtle pt-4">
                <span className="font-jetbrains text-[12px] font-semibold text-text-primary">{testimonial.name}</span>
                <span className="block font-space text-[12px] text-text-tertiary">{testimonial.role}</span>
            </div>
        </div>
    );
}

/* ─── Testimonials Section ─── */

export function Testimonials() {
    /* Duplicate cards for seamless loop */
    const track = [...testimonials, ...testimonials];

    return (
        <section className="relative left-1/2 mt-24 w-screen -translate-x-1/2">
            {/* Heading — aligned with page content */}
            <div className="mx-auto max-w-2xl px-6">
                <motion.h2
                    className="font-micro text-[40px] leading-none text-text-primary"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease }}
                >
                    TESTIMONIALS
                </motion.h2>
            </div>

            {/* Marquee carousel */}
            <div className="marquee-mask mx-auto mt-8 max-w-5xl overflow-hidden">
                <div className="marquee flex gap-3">
                    {track.map((t, i) => (
                        <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
                    ))}
                </div>
            </div>
        </section>
    );
}
