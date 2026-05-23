"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";

interface PaintStep {
    title: string;
    description: string;
    publicColors: { name: string; color: string }[];
    userColors: { name: string; color: string }[];
    friendColors: { name: string; color: string }[];
}

const STEPS: PaintStep[] = [
    {
        title: "Step 1 of 5: Agree on a public color",
        description: "You and your friend agree on a public starting color (Yellow). Anyone listening, including the servers, knows this color. It doesn't need to be secret.",
        publicColors: [{ name: "yellow", color: "#eab308" }],
        userColors: [{ name: "yellow", color: "#eab308" }],
        friendColors: [{ name: "yellow", color: "#eab308" }]
    },
    {
        title: "Step 2 of 5: Pick private secret colors",
        description: "You choose Red and your friend chooses Blue in secret. These secret colors are never shared, uploaded, or sent over the internet.",
        publicColors: [],
        userColors: [{ name: "yellow", color: "#eab308" }, { name: "secret red", color: "#ef4444" }],
        friendColors: [{ name: "yellow", color: "#eab308" }, { name: "secret blue", color: "#3b82f6" }]
    },
    {
        title: "Step 3 of 5: Mix public and secret colors",
        description: "You mix public Yellow with secret Red to get Orange. Your friend mixes Yellow with Blue to get Green. You send these mixed colors to each other.",
        publicColors: [{ name: "orange (yours)", color: "#f97316" }, { name: "green (friend's)", color: "#22c55e" }],
        userColors: [{ name: "orange (mixed)", color: "#f97316" }],
        friendColors: [{ name: "green (mixed)", color: "#22c55e" }]
    },
    {
        title: "Step 4 of 5: Exchange mixed colors",
        description: "You receive their Green. Your friend receives your Orange. WhatsApp's servers only saw Orange and Green cross the wire, but they can't 'unmix' them.",
        publicColors: [],
        userColors: [{ name: "green (received)", color: "#22c55e" }, { name: "secret red", color: "#ef4444" }],
        friendColors: [{ name: "orange (received)", color: "#f97316" }, { name: "secret blue", color: "#3b82f6" }]
    },
    {
        title: "Step 5 of 5: Calculate the shared secret",
        description: "You add your secret Red to their Green. Your friend adds their secret Blue to your Orange. You both arrive at the exact same muddy brown color (Key X)!",
        publicColors: [],
        userColors: [{ name: "common key X", color: "#78350f" }],
        friendColors: [{ name: "common key X", color: "#78350f" }]
    }
];

export function PaintMixingShowcase() {
    const [step, setStep] = useState(0);

    const handleNext = () => {
        if (step < STEPS.length - 1) setStep(step + 1);
    };

    const handlePrev = () => {
        if (step > 0) setStep(step - 1);
    };

    const current = STEPS[step];

    return (
        <div className="not-prose my-8 overflow-hidden rounded-xl border border-border-default bg-bg-secondary">
            {/* Header info */}
            <div className="border-b border-border-default px-4 py-3 sm:px-5 min-h-[100px] flex flex-col justify-center">
                <p className="font-jetbrains text-xs font-semibold tracking-wider text-accent-primary uppercase">
                    {current.title}
                </p>
                <p className="mt-1 font-space text-[13px] leading-relaxed text-text-secondary">
                    {current.description}
                </p>
            </div>

            {/* Stepper Visuals */}
            <div className="p-4 sm:p-5 space-y-3">
                {/* Public channel */}
                <div className="rounded-lg border border-border-default bg-bg-tertiary/20 p-4 flex flex-col min-h-[140px] justify-between">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-text-muted" />
                        <span className="font-jetbrains text-[10px] tracking-widest text-text-tertiary uppercase">Public channel (Seen by internet)</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-6">
                        <AnimatePresence mode="wait">
                            {current.publicColors.length > 0 ? (
                                current.publicColors.map((c) => (
                                    <motion.div
                                        key={c.name}
                                        className="flex flex-col items-center gap-1.5"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                    >
                                        <div
                                            className="rounded-full shadow-inner border border-black/10"
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                backgroundColor: c.color,
                                                backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.1) 100%)"
                                            }}
                                        />
                                        <span className="font-jetbrains text-[9px] tracking-wider text-text-tertiary uppercase">{c.name}</span>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.span
                                    className="font-jetbrains text-[10px] text-text-muted uppercase tracking-wider"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                >
                                    No data in transit
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* You vs Friend Split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* You */}
                    <div className="rounded-lg border border-accent-tertiary/20 bg-accent-tertiary/5 p-4 flex flex-col min-h-[140px] justify-between">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-tertiary" />
                            <span className="font-jetbrains text-[10px] tracking-widest text-accent-tertiary uppercase">You (Secret)</span>
                        </div>
                        <div className="flex-1 flex items-center justify-center gap-4">
                            {current.userColors.map((c) => (
                                <motion.div
                                    key={c.name}
                                    className="flex flex-col items-center gap-1.5"
                                    layoutId={`user-${c.name}`}
                                >
                                    <div
                                        className="rounded-full shadow-inner border border-black/10"
                                        style={{
                                            width: "36px",
                                            height: "36px",
                                            backgroundColor: c.color,
                                            backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.1) 100%)"
                                        }}
                                    />
                                    <span className="font-jetbrains text-[8px] tracking-wider text-text-tertiary uppercase text-center leading-none">{c.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Friend */}
                    <div className="rounded-lg border border-accent-primary/20 bg-accent-primary/5 p-4 flex flex-col min-h-[140px] justify-between">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
                            <span className="font-jetbrains text-[10px] tracking-widest text-accent-primary uppercase">Friend (Secret)</span>
                        </div>
                        <div className="flex-1 flex items-center justify-center gap-4">
                            {current.friendColors.map((c) => (
                                <motion.div
                                    key={c.name}
                                    className="flex flex-col items-center gap-1.5"
                                    layoutId={`friend-${c.name}`}
                                >
                                    <div
                                        className="rounded-full shadow-inner border border-black/10"
                                        style={{
                                            width: "36px",
                                            height: "36px",
                                            backgroundColor: c.color,
                                            backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.1) 100%)"
                                        }}
                                    />
                                    <span className="font-jetbrains text-[8px] tracking-wider text-text-tertiary uppercase text-center leading-none">{c.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stepper Controls */}
            <div className="border-t border-border-default px-4 py-3 sm:px-5 flex items-center justify-between gap-3">
                <button
                    onClick={handlePrev}
                    disabled={step === 0}
                    className="text-[11px] rounded-full border border-border-default bg-bg-primary px-3 py-1.5 font-jetbrains text-text-secondary transition-colors hover:bg-bg-tertiary disabled:opacity-30 disabled:cursor-not-allowed uppercase"
                >
                    ← Prev
                </button>
                
                {/* Dots */}
                <div className="flex items-center gap-2">
                    {STEPS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setStep(i)}
                            className="p-1"
                            aria-label={`Go to step ${i + 1}`}
                        >
                            <span className={`block h-1.5 w-1.5 rounded-full transition-all duration-200 ${step === i ? "bg-accent-primary scale-125" : "bg-text-muted/40 hover:bg-text-muted"}`} />
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    disabled={step === STEPS.length - 1}
                    className="text-[11px] rounded-full bg-accent-primary text-bg-primary px-3 py-1.5 font-jetbrains font-semibold transition-colors hover:bg-accent-primary-hover disabled:opacity-30 disabled:cursor-not-allowed uppercase"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
