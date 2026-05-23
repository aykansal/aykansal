"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";
import { ZoomIn } from "lucide-react";
import { useTheme } from "next-themes";

let mermaidReady = false;

function ensureMermaid(theme: "dark" | "neutral") {
    if (mermaidReady) {
        mermaid.initialize({ theme, startOnLoad: false, securityLevel: "loose" });
        return;
    }
    mermaid.initialize({ theme, startOnLoad: false, securityLevel: "loose" });
    mermaidReady = true;
}

export function MermaidDiagram({ chart }: { chart: string }) {
    const renderId = useId().replace(/:/g, "");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const [error, setError] = useState<string | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = useCallback(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        if (document.fullscreenElement) {
            void document.exitFullscreen();
            return;
        }

        void wrapper.requestFullscreen().catch((err: unknown) => {
            console.error("Fullscreen request failed:", err);
        });
    }, []);

    useEffect(() => {
        const onFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement === wrapperRef.current);
        };

        document.addEventListener("fullscreenchange", onFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const theme = resolvedTheme === "dark" ? "dark" : "neutral";
        ensureMermaid(theme);

        let cancelled = false;

        mermaid
            .render(`mermaid-svg-${renderId}`, chart)
            .then(({ svg }) => {
                if (!cancelled) {
                    container.innerHTML = svg;
                    setError(null);
                }
            })
            .catch((err: unknown) => {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : String(err));
                }
            });

        return () => {
            cancelled = true;
        };
    }, [chart, renderId, resolvedTheme]);

    if (error) {
        return (
            <pre className="my-4 overflow-x-auto rounded border border-border-default bg-bg-secondary p-4 font-jetbrains text-[12px] text-text-secondary">
                {error}
            </pre>
        );
    }

    return (
        <div
            ref={wrapperRef}
            className="group relative my-6 overflow-x-auto rounded border border-border-default bg-bg-secondary p-4 sm:p-6 fullscreen:flex fullscreen:min-h-dvh fullscreen:items-center fullscreen:justify-center fullscreen:overflow-auto fullscreen:p-8"
        >
            <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "View diagram fullscreen"}
                aria-pressed={isFullscreen}
                title={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
                className="absolute top-3 right-3 z-10 rounded-md border border-border-default bg-bg-primary/90 p-1.5 text-text-muted opacity-70 transition-opacity hover:text-text-primary hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50"
            >
                <ZoomIn className="size-4" aria-hidden="true" />
            </button>
            <div
                ref={containerRef}
                className="mermaid flex w-full min-h-[120px] justify-center [&_svg]:max-w-full fullscreen:max-h-[85dvh] fullscreen:[&_svg]:max-h-[85dvh]"
                aria-label="Diagram"
            />
        </div>
    );
}
