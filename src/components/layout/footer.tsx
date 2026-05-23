"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun03Icon, Moon02Icon } from "@hugeicons/core-free-icons";

function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="h-8 w-8" />;

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex h-8 w-8 cursor-pointer items-center justify-center border border-border-default bg-bg-primary text-text-secondary transition-colors duration-200 hover:text-text-primary"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            <HugeiconsIcon icon={isDark ? Sun03Icon : Moon02Icon} size={14} />
        </button>
    );
}

export function Footer() {
    return (
        <footer className="mt-24 w-full pb-0">
            <div className="relative mx-auto max-w-2xl bg-bg-secondary" style={{ containerType: "inline-size" }}>
                {/* Info bar */}
                <div className="px-6">
                    <div className="flex items-center justify-between py-4">
                        <span className="font-space text-[10px] tracking-wider text-text-muted">&copy; 2026 Ayush Kansal. All rights reserved. Built with &hearts;</span>
                        <ThemeToggle />
                    </div>
                </div>

                {/* Giant brand text — fills content width, centered, bottom-aligned */}
                <div className="relative overflow-hidden px-6">
                    <span className="block select-none text-center font-micro leading-[0.65] text-accent-primary" style={{ fontSize: "32cqw" }} aria-hidden="true">
                        aykansal
                    </span>

                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background: "linear-gradient(to bottom, transparent 20%, var(--bg-secondary) 95%)",
                        }}
                    />
                </div>
            </div>
        </footer>
    );
}
