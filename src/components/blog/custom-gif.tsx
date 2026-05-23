"use client";

import { motion } from "@/lib/motion";

interface CustomGifProps {
    src: string;
    alt: string;
    caption?: string;
    maxWidth?: string;
}

export function CustomGif({ src, alt, caption, maxWidth = "380px" }: CustomGifProps) {
    return (
        <div className="my-8 flex flex-col items-center">
            <motion.img
                src={src}
                alt={alt}
                className="rounded-xl w-full h-auto block border border-border-default bg-bg-secondary"
                style={{ maxWidth }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                loading="lazy"
            />
            {caption && (
                <p className="mt-3 text-xs text-text-tertiary text-center italic max-w-sm leading-relaxed font-space">
                    {caption}
                </p>
            )}
        </div>
    );
}
