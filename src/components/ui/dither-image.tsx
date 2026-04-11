"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import {
    bayerDither,
    invertWithMask,
} from "@/lib/dither-algorithms";
import { processImage, loadImage } from "@/lib/image-processing";
import {
    createDotSystem,
    updateDots,
    renderDots,
    type DotSystem,
    type Shockwave,
} from "@/lib/particle-system";
import { useIsMobile } from "@/lib/use-is-mobile";

interface DitherImageProps {
    src: string;
    className?: string;
}

const CONFIG = {
    gridSize: 205,
    scale: 0.80,
    dotScale: 0.5,
    invert: true,
    threshold: 127,
    contrast: 100,
    gamma: 1.03,
    blur: 3.75,
    highlightsCompression: 0.00,
    cornerRadius: 0.00,
} as const;

export function DitherImage({ src, className }: DitherImageProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const systemRef = useRef<DotSystem | null>(null);
    const mouseRef = useRef({ x: 0, y: 0, active: false });
    const shockwavesRef = useRef<Shockwave[]>([]);
    const animFrameRef = useRef<number>(0);
    const runningRef = useRef(false);
    const isMobile = useIsMobile();
    const { resolvedTheme } = useTheme();

    const dotColorRef = useRef({ r: 235, g: 235, b: 235 });
    dotColorRef.current = resolvedTheme === "light"
        ? { r: 45, g: 44, b: 42 }    // #2d2c2a
        : { r: 235, g: 235, b: 235 }; // #ebebeb

    const startLoop = useCallback(() => {
        if (runningRef.current) return;
        runningRef.current = true;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;
        const dpr = window.devicePixelRatio || 1;

        const tick = () => {
            const sys = systemRef.current;
            if (!sys) {
                runningRef.current = false;
                return;
            }

            const rect = canvas.getBoundingClientRect();
            const needsMore = updateDots(
                sys,
                mouseRef.current.x,
                mouseRef.current.y,
                mouseRef.current.active,
                shockwavesRef.current,
                performance.now()
            );

            renderDots(ctx, sys, CONFIG.invert, rect.width, rect.height, dpr, dotColorRef.current);

            if (needsMore) {
                animFrameRef.current = requestAnimationFrame(tick);
            } else {
                runningRef.current = false;
            }
        };

        animFrameRef.current = requestAnimationFrame(tick);
    }, []);

    const rebuildParticles = useCallback(
        async (imgSrc: string) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const img = await loadImage(imgSrc);

            const processed = processImage(
                img,
                CONFIG.gridSize,
                1,
                CONFIG.contrast,
                CONFIG.gamma,
                CONFIG.blur,
                CONFIG.highlightsCompression
            );

            let positions = bayerDither(
                processed.grayscale,
                processed.width,
                processed.height,
                { threshold: CONFIG.threshold, serpentine: true, errorStrength: 1.0 },
                processed.alpha
            );

            if (CONFIG.invert) {
                positions = invertWithMask(
                    positions,
                    processed.width,
                    processed.height,
                    CONFIG.cornerRadius,
                    processed.alpha
                );
            }

            const gw = processed.width;
            const gh = processed.height;
            const s = Math.max(rect.width / gw, rect.height / gh);
            const ox = Math.round((rect.width - gw * s) / 2);
            const oy = Math.round((rect.height - gh * s) / 2);

            const dotScale = isMobile ? CONFIG.dotScale * 0.8 : CONFIG.dotScale;

            systemRef.current = createDotSystem(positions, s, dotScale, ox, oy);
            startLoop();
        },
        [isMobile, startLoop]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d")!;
        const dpr = window.devicePixelRatio || 1;

        let resizeTimer: ReturnType<typeof setTimeout> | null = null;
        let lastWidth = 0;
        let lastHeight = 0;

        const handleResize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            const sys = systemRef.current;
            if (sys) renderDots(ctx, sys, CONFIG.invert, rect.width, rect.height, dpr, dotColorRef.current);

            const w = Math.round(rect.width);
            const h = Math.round(rect.height);
            if (lastWidth !== 0 && (w !== lastWidth || h !== lastHeight)) {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => rebuildParticles(src), 200);
            }
            lastWidth = w;
            lastHeight = h;
        };

        handleResize();
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(canvas);

        const handlePointerMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            mouseRef.current.active = true;
            startLoop();
        };

        const handlePointerLeave = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            mouseRef.current.active = false;
            startLoop();
        };

        const handlePointerCancel = () => {
            mouseRef.current.active = false;
            startLoop();
        };

        const handlePointerUp = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            shockwavesRef.current.push({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                start: performance.now(),
            });
            if (e.pointerType !== "mouse") {
                mouseRef.current.active = false;
            }
            startLoop();
        };

        canvas.addEventListener("pointermove", handlePointerMove);
        canvas.addEventListener("pointerleave", handlePointerLeave);
        canvas.addEventListener("pointercancel", handlePointerCancel);
        canvas.addEventListener("pointerup", handlePointerUp);

        rebuildParticles(src);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            runningRef.current = false;
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeObserver.disconnect();
            canvas.removeEventListener("pointermove", handlePointerMove);
            canvas.removeEventListener("pointerleave", handlePointerLeave);
            canvas.removeEventListener("pointercancel", handlePointerCancel);
            canvas.removeEventListener("pointerup", handlePointerUp);
        };
    }, [startLoop, rebuildParticles, src]);

    /* Re-render dots when theme changes */
    useEffect(() => {
        const canvas = canvasRef.current;
        const sys = systemRef.current;
        if (!canvas || !sys) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        renderDots(ctx, sys, CONFIG.invert, rect.width, rect.height, dpr, dotColorRef.current);
    }, [resolvedTheme]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ touchAction: "none" }}
            role="img"
            aria-label="Interactive dithered avatar"
        />
    );
}
