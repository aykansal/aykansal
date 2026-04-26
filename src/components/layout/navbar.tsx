"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { href: "/#projects", label: "/WORK" },
    { href: "/blogs", label: "/BLOGS" },
    { href: "/timeline", label: "/TIMELINE" },
    { href: "/#contact", label: "/CONTACT" },
] as const;

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                }
            },
            { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
        );

        for (const el of elements) observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <nav className="sticky top-0 z-50 w-full bg-bg-primary/80 backdrop-blur-lg backdrop-saturate-180">
            <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-2">
                <Link href="/" className="group outline-none focus-visible:text-accent-primary">
                    <span className={cn("font-micro text-[40px] leading-none transition-colors duration-200", isHome ? "text-accent-primary" : "text-text-primary group-hover:text-accent-primary")}>
                        <span className="hidden min-[360px]:inline">AYUSH</span>
                        <span className="inline min-[360px]:hidden">A</span>
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    {NAV_LINKS.map((link) => {
                        const sectionId = link.href.slice(1);
                        const isActive = activeSection === sectionId;

                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "font-jetbrains text-[13px] font-normal uppercase leading-none outline-none transition-colors duration-200 focus-visible:text-accent-primary",
                                    isActive ? "text-accent-primary" : "text-text-secondary hover:text-text-primary",
                                )}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
