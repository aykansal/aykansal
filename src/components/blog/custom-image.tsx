"use client";

import Image from "next/image";
import { motion } from "@/lib/motion";

interface CustomImageProps {
    src: string;
    alt: string;
    caption?: string;
    width?: string | number;
    height?: string | number;
}

export function CustomImage({ src, alt, caption, width = 600, height = 400 }: CustomImageProps) {
    const isLocal = src.startsWith("/") || src.startsWith(".");
    const parsedWidth = typeof width === "string" ? parseInt(width, 10) : width;

    return (
        <div className="my-8 flex flex-col items-center">
            <motion.div
                className="relative overflow-hidden rounded-xl border border-border-default bg-bg-secondary w-full"
                style={{ maxWidth: `${parsedWidth}px` }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                {isLocal ? (
                    <div className="relative aspect-16/10 w-full">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-cover"
                            sizes={`(max-w-screen-sm) 100vw, ${parsedWidth}px`}
                        />
                    </div>
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt={alt} className="w-full h-auto block object-cover" />
                )}
            </motion.div>
            {caption && (
                <p className="mt-3 text-xs text-text-tertiary text-center italic max-w-sm leading-relaxed font-space">
                    {caption}
                </p>
            )}
        </div>
    );
}
