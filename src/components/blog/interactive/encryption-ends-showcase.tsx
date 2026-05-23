"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    CloudIcon,
    SmartPhone01Icon,
    Alert01Icon,
    Bug01Icon,
    Analytics01Icon
} from "@hugeicons/core-free-icons";

interface BreachPoint {
    id: string;
    title: string;
    icon: any;
    color: string;
    borderClass: string;
    bgClass: string;
    textClass: string;
    badgeClass: string;
    short: string;
    detailed: string;
}

const POINTS: BreachPoint[] = [
    {
        id: "cloud",
        title: "Cloud backups",
        icon: CloudIcon,
        color: "amber",
        borderClass: "border-amber-500/25 hover:border-amber-500/50",
        bgClass: "bg-amber-500/[0.04]",
        textClass: "text-amber-700 dark:text-amber-400",
        badgeClass: "bg-amber-500",
        short: "Google Drive and iCloud backups sat without encryption for years.",
        detailed: "Even if messages are encrypted during their flight, standard cloud backups upload the database to Apple or Google servers. To fix this, you must explicitly enable 'End-to-End Encrypted Backups' in WhatsApp settings."
    },
    {
        id: "phone",
        title: "The phone itself",
        icon: SmartPhone01Icon,
        color: "violet",
        borderClass: "border-violet-500/25 hover:border-violet-500/50",
        bgClass: "bg-violet-500/[0.04]",
        textClass: "text-violet-700 dark:text-violet-400",
        badgeClass: "bg-violet-500",
        short: "Anyone who can open the phone reads the messages like you do.",
        detailed: "Encryption secures the wire. Once it lands, the app decrypts the database for you. If someone steals your passcode or looks over your shoulder, encryption does absolutely nothing to stop them."
    },
    {
        id: "report",
        title: "The Report button",
        icon: Alert01Icon,
        color: "red",
        borderClass: "border-status-error/25 hover:border-status-error/50",
        bgClass: "bg-status-error/5",
        textClass: "text-status-error",
        badgeClass: "bg-status-error",
        short: "Reporting a message sends it to WhatsApp in plain text.",
        detailed: "When you report an account, your phone packages the last five messages of that chat and uploads them directly to WhatsApp moderators. Because you chose to share it, the envelope is opened for content moderation."
    },
    {
        id: "spyware",
        title: "Spyware",
        icon: Bug01Icon,
        color: "pink",
        borderClass: "border-rose-500/25 hover:border-rose-500/50",
        bgClass: "bg-rose-500/[0.04]",
        textClass: "text-rose-700 dark:text-rose-400",
        badgeClass: "bg-rose-500",
        short: "Pegasus and similar tools take over the phone, not the encryption.",
        detailed: "State-level spyware bypasses encryption by taking over the entire OS. It captures keyboard input, records screens, and dumps memory before encryption happens or after decryption is finished."
    },
    {
        id: "metadata",
        title: "Metadata",
        icon: Analytics01Icon,
        color: "sky",
        borderClass: "border-accent-primary/25 hover:border-accent-primary/50",
        bgClass: "bg-accent-primary/5",
        textClass: "text-accent-primary",
        badgeClass: "bg-accent-primary",
        short: "Who you talk to, when, and how often stays visible.",
        detailed: "The content of the letter is locked, but the envelope is public. Servers must know who to route the message to, leaving logs of phone numbers, precise times, message size, and IP addresses."
    }
];

export function EncryptionEndsShowcase() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const activePoint = POINTS.find((p) => p.id === selectedId);

    return (
        <div className="not-prose my-8 overflow-hidden rounded-xl border border-border-default bg-bg-secondary">
            <div className="border-b border-border-default px-4 py-3 sm:px-5">
                <p className="font-jetbrains text-xs font-semibold tracking-wider text-text-primary uppercase">
                    Five places encryption stops protecting you
                </p>
                <p className="mt-0.5 font-space text-[12px] text-text-tertiary">
                    Tap any card to read more.
                </p>
            </div>

            {/* Grid */}
            <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {POINTS.map((point) => {
                    const isSelected = selectedId === point.id;
                    return (
                        <button
                            key={point.id}
                            onClick={() => setSelectedId(isSelected ? null : point.id)}
                            className={`relative text-left rounded-lg border p-4 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-accent-primary/40 ${point.borderClass} ${point.bgClass} ${
                                isSelected ? "ring-1 ring-accent-primary/30 scale-[1.01]" : ""
                            }`}
                        >
                            <div className="flex items-start gap-2.5 mb-2">
                                <span className={point.textClass}>
                                    <HugeiconsIcon icon={point.icon} size={18} />
                                </span>
                                <div className={`flex-1 text-sm font-semibold tracking-wide ${point.textClass}`}>
                                    {point.title}
                                </div>
                                <span className={`h-1.5 w-1.5 rounded-full mt-1.5 ${point.badgeClass} ${
                                    isSelected ? "animate-ping" : ""
                                }`} />
                            </div>
                            <p className="font-space text-[12.5px] leading-relaxed text-text-secondary">
                                {point.short}
                            </p>
                        </button>
                    );
                })}
            </div>

            {/* Expansion panel for details */}
            <AnimatePresence mode="wait">
                {activePoint && (
                    <motion.div
                        key={activePoint.id}
                        className="border-t border-border-default p-4 sm:p-5 bg-bg-tertiary/25"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className="flex items-start gap-3">
                            <span className={`${activePoint.textClass} mt-0.5`}>
                                <HugeiconsIcon icon={activePoint.icon} size={18} />
                            </span>
                            <div>
                                <h4 className={`text-[13px] font-bold uppercase tracking-wider ${activePoint.textClass}`}>
                                    {activePoint.title} — Why it breaks
                                </h4>
                                <p className="mt-1 font-space text-[13px] text-text-primary leading-relaxed">
                                    {activePoint.detailed}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
