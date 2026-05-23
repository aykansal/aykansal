"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { SmartPhone01Icon, DatabaseIcon } from "@hugeicons/core-free-icons";

interface PrekeyStep {
    title: string;
    description: string;
    serverBoxes: string[];
    userBoxes: string[];
    friendBoxes: string[];
    userStatus: string;
    friendStatus: string;
    isFriendOnline: boolean;
}

const STEPS: PrekeyStep[] = [
    {
        title: "Step 1 of 4: Friend uploads empty lockboxes",
        description: "When your friend first installs WhatsApp, their phone makes a batch of one-time lockboxes. The empty boxes go to the server, while the matching keys stay on their phone.",
        serverBoxes: ["#47", "#48", "#49", "#50"],
        userBoxes: [],
        friendBoxes: [],
        userStatus: "idle",
        friendStatus: "offline",
        isFriendOnline: false
    },
    {
        title: "Step 2 of 4: You fetch your friend's lockbox",
        description: "You write 'hey'. Since your friend is offline, your phone asks the server for one of their empty lockboxes. The server hands over box #47.",
        serverBoxes: ["#48", "#49", "#50"],
        userBoxes: ["#47 (empty)"],
        friendBoxes: [],
        userStatus: "fetching...",
        friendStatus: "offline",
        isFriendOnline: false
    },
    {
        title: "Step 3 of 4: You lock your message and upload",
        description: "Your phone locks 'hey' inside box #47. You send the locked box back to the server. The server stores it. The key is still only on your friend's phone.",
        serverBoxes: ["#48", "#49", "#50", "#47 (LOCKED)"],
        userBoxes: [],
        friendBoxes: [],
        userStatus: "sent",
        friendStatus: "offline",
        isFriendOnline: false
    },
    {
        title: "Step 4 of 4: Friend retrieves and unlocks",
        description: "Your friend's phone comes online, downloads the locked box #47 from the server, and unlocks it using key #47 from local storage. Message decrypted!",
        serverBoxes: ["#48", "#49", "#50"],
        userBoxes: [],
        friendBoxes: ["#47 (OPENED: 'hey')"],
        userStatus: "idle",
        friendStatus: "online",
        isFriendOnline: true
    }
];

export function PrekeysShowcase() {
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

            {/* Visual panels */}
            <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* You */}
                <div className="rounded-lg border border-accent-tertiary/25 bg-accent-tertiary/5 p-4 flex flex-col min-h-[190px] justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-tertiary" />
                            <span className="font-jetbrains text-[10px] tracking-widest text-text-tertiary uppercase">You</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4 text-text-secondary">
                            <HugeiconsIcon icon={SmartPhone01Icon} size={18} className="text-accent-tertiary" />
                            <span className="font-jetbrains text-[11px] uppercase tracking-wider">{current.userStatus}</span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-wrap gap-2 items-center justify-center">
                        <AnimatePresence>
                            {current.userBoxes.map((box) => (
                                <motion.div
                                    key={box}
                                    className="flex flex-col items-center p-2 rounded border border-accent-tertiary/30 bg-bg-primary"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    layout
                                >
                                    <div className="w-6 h-6 rounded bg-accent-tertiary/20 flex items-center justify-center text-[10px] font-mono text-accent-tertiary font-bold">
                                        📦
                                    </div>
                                    <span className="font-jetbrains text-[8px] text-text-tertiary mt-1">{box}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Server */}
                <div className="rounded-lg border border-border-default bg-bg-tertiary/20 p-4 flex flex-col min-h-[190px] justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-text-muted" />
                            <span className="font-jetbrains text-[10px] tracking-widest text-text-tertiary uppercase">Server</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4 text-text-secondary">
                            <HugeiconsIcon icon={DatabaseIcon} size={18} className="text-text-tertiary" />
                            <span className="font-jetbrains text-[11px] uppercase tracking-wider">Prekey Store</span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-wrap gap-1.5 items-center justify-center content-center">
                        <AnimatePresence>
                            {current.serverBoxes.map((box) => (
                                <motion.div
                                    key={box}
                                    className="flex flex-col items-center p-1.5 rounded border border-border-default bg-bg-secondary w-[56px]"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    layout
                                >
                                    <div className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold ${box.includes("LOCKED") ? "bg-status-error/10 text-status-error" : "bg-accent-primary/10 text-accent-primary"}`}>
                                        {box.includes("LOCKED") ? "🔒" : "📦"}
                                    </div>
                                    <span className="font-jetbrains text-[8px] text-text-tertiary mt-0.5 text-center leading-none truncate w-full">
                                        {box.split(" ")[0]}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Friend */}
                <div className="rounded-lg border border-accent-primary/25 bg-accent-primary/5 p-4 flex flex-col min-h-[190px] justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`h-1.5 w-1.5 rounded-full ${current.isFriendOnline ? "bg-accent-primary animate-pulse" : "bg-text-muted"}`} />
                            <span className="font-jetbrains text-[10px] tracking-widest text-text-tertiary uppercase">Friend</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4 text-text-secondary">
                            <HugeiconsIcon icon={SmartPhone01Icon} size={18} className={current.isFriendOnline ? "text-accent-primary" : "text-text-muted"} />
                            <span className="font-jetbrains text-[11px] uppercase tracking-wider">{current.friendStatus}</span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-wrap gap-2 items-center justify-center">
                        <AnimatePresence>
                            {current.friendBoxes.map((box) => (
                                <motion.div
                                    key={box}
                                    className="flex flex-col items-center p-2 rounded border border-accent-primary/30 bg-bg-primary"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    layout
                                >
                                    <div className="w-6 h-6 rounded bg-accent-primary/20 flex items-center justify-center text-[10px] font-mono text-accent-primary font-bold">
                                        🔓
                                    </div>
                                    <span className="font-space text-[9px] text-accent-primary font-medium mt-1">hey</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
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
