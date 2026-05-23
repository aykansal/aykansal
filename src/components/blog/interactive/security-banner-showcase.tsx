"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { AlertCircleIcon } from "@hugeicons/core-free-icons";

export function SecurityBannerShowcase() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="not-prose my-8 overflow-hidden rounded-xl border border-border-default bg-bg-secondary">
            <div className="border-b border-border-default px-4 py-3 sm:px-5">
                <p className="font-jetbrains text-xs font-semibold tracking-wider text-text-primary uppercase">
                    The alert you swipe past
                </p>
                <p className="mt-0.5 font-space text-[12px] text-text-tertiary">
                    Tap the yellow banner to see what it actually means.
                </p>
            </div>

            {/* Chat Area */}
            <div className="bg-[#0b141a] p-5 sm:p-8 flex flex-col justify-end min-h-[180px]">
                <div className="mx-auto w-full max-w-md space-y-4">
                    {/* Message */}
                    <div className="flex justify-end">
                        <div className="bg-[#005c4b] text-white rounded-lg rounded-br-sm px-3.5 py-2 max-w-[80%] shadow-sm">
                            <p className="font-space text-sm">hey</p>
                            <p className="font-jetbrains text-[9px] text-white/50 text-right mt-0.5">10:42 ✓✓</p>
                        </div>
                    </div>

                    {/* Banner Trigger */}
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="w-full text-left focus:outline-none block"
                        aria-expanded={expanded}
                    >
                        <div className="bg-[#1f2c33] rounded-lg px-4 py-3 border border-amber-500/20 hover:bg-[#233139] transition-colors shadow-sm">
                            <div className="flex items-start gap-3">
                                <HugeiconsIcon
                                    icon={AlertCircleIcon}
                                    size={16}
                                    className="text-amber-400 mt-0.5 shrink-0"
                                />
                                <p className="font-space text-xs text-white/80 leading-relaxed">
                                    Your security code with <span className="text-white font-semibold">Friend</span> has changed. <span className="text-amber-400 underline hover:text-amber-300 font-medium">Tap to learn more.</span>
                                </p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Detailed Explanation */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        className="border-t border-border-default bg-bg-tertiary/10 p-4 sm:p-5"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="space-y-3 font-space text-[13px] text-text-secondary leading-relaxed">
                            <p>
                                Every chat has a unique <span className="font-semibold text-text-primary">safety number</span> (or fingerprint) representing the cryptographic keys shared between you. When this number changes, it indicates a change in keys.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <div className="p-3 rounded border border-accent-tertiary/20 bg-accent-tertiary/5">
                                    <p className="font-jetbrains text-[10px] font-bold text-accent-tertiary uppercase tracking-wider mb-1">99% of the time:</p>
                                    <p className="text-[12px]">Your friend bought a new device, reinstalled WhatsApp, or reset their system, forcing a key regeneration.</p>
                                </div>
                                <div className="p-3 rounded border border-status-error/25 bg-status-error/5">
                                    <p className="font-jetbrains text-[10px] font-bold text-status-error uppercase tracking-wider mb-1">1% of the time (Attack):</p>
                                    <p className="text-[12px]">A hacker or authority is intercepting the connection, trying to inject their own keys (a Man-in-the-Middle attack).</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
