"use client";

import { useEffect, useState, useRef } from "react";
import clsx from "clsx";

interface TOCItem {
    id: string;
    level: number;
    title: string;
    slug: string;
}

export function TableOfContents({ items }: { items: TOCItem[] }) {
    const [activeId, setActiveId] = useState<string>("");
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const headingElements = items.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
            
            let currentActiveId = "";
            for (const el of headingElements) {
                const rect = el.getBoundingClientRect();
                // 120 gives a nice offset equivalent to scroll-mt-24 (approx 96px) + extra breathing room
                if (rect.top <= 120) { 
                    currentActiveId = el.id;
                } else if (!currentActiveId && rect.top < window.innerHeight) {
                    // If no headers have crossed the top line yet, but one is visible in viewport, make it active
                    currentActiveId = el.id;
                }
            }
            if (currentActiveId) setActiveId(currentActiveId);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Check once on mount

        return () => window.removeEventListener("scroll", handleScroll);
    }, [items]);

    useEffect(() => {
        // Auto scroll TOC
        if (activeId && containerRef.current) {
            const activeElement = containerRef.current.querySelector(`a[href="#${activeId}"]`);
            if (activeElement) {
                activeElement.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                });
            }
        }
    }, [activeId]);

    if (items.length === 0) return null;

    return (
        <aside className="hidden lg:block sticky top-24 pt-4 border-l border-border-subtle pl-6 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide" ref={containerRef}>
            <h3 className="font-jetbrains text-text-primary font-bold mb-4 uppercase tracking-wider text-sm">Table of Contents</h3>
            <nav className="flex flex-col gap-3 font-space text-sm relative">
                {items.map((item) => {
                    const isActive = activeId === item.slug;
                    return (
                        <a 
                            key={item.id} 
                            href={`#${item.slug}`}
                            className={clsx(
                                "transition-colors line-clamp-2 outline-none",
                                isActive ? "text-accent-primary font-bold" : "text-text-muted hover:text-text-primary"
                            )}
                            style={{ marginLeft: `${(item.level - 1) * 12}px` }}
                        >
                            {item.title}
                        </a>
                    );
                })}
            </nav>
        </aside>
    );
}
