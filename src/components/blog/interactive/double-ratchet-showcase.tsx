"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";

interface MessageItem {
    id: string;
    label: string;
    text: string;
    key: string;
    active: boolean;
}

const INITIAL_MESSAGES: MessageItem[] = [
    { id: "msg-01", label: "msg 01", text: "hey", key: "eec79dff0cb9", active: false },
    { id: "msg-02", label: "msg 02", text: "you up?", key: "cf113b7a320f", active: false },
    { id: "msg-03", label: "msg 03", text: "big news", key: "917bcaf66855", active: true }
];

const PRESETS = [
    "let's meet up",
    "sounds good!",
    "did you see that?",
    "on my way",
    "awesome",
    "check the docs",
    "just finished the build"
];

export function DoubleRatchetShowcase() {
    const [messages, setMessages] = useState<MessageItem[]>(INITIAL_MESSAGES);
    const [presetIndex, setPresetIndex] = useState(0);

    const handleSend = () => {
        // Mark all current active as inactive
        const updatedMessages = messages.map((m) => ({
            ...m,
            active: false
        }));

        // Generate a new random key
        const newKey = Math.random().toString(16).slice(2, 14);
        const newLabel = `msg ${String(messages.length + 1).padStart(2, "0")}`;
        const newText = PRESETS[presetIndex % PRESETS.length];

        const newMessage: MessageItem = {
            id: `msg-${messages.length + 1}`,
            label: newLabel,
            text: newText,
            key: newKey,
            active: true
        };

        setMessages([...updatedMessages, newMessage]);
        setPresetIndex(presetIndex + 1);
    };

    const handleReset = () => {
        setMessages(INITIAL_MESSAGES);
        setPresetIndex(0);
    };

    return (
        <div className="not-prose my-8 overflow-hidden rounded-xl border border-border-default bg-bg-secondary">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-default px-4 py-3 sm:px-5">
                <div>
                    <p className="font-jetbrains text-xs font-semibold tracking-wider text-text-primary uppercase">
                        One key per message
                    </p>
                    <p className="mt-0.5 font-space text-[12px] text-text-tertiary">
                        Every send generates a new key. The old one is destroyed.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleReset}
                        className="text-[10px] rounded-full border border-border-default bg-bg-primary px-3 py-1.5 font-jetbrains text-text-secondary transition-colors hover:bg-bg-tertiary uppercase font-medium"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleSend}
                        className="text-[10px] rounded-full bg-accent-primary text-bg-primary px-3 py-1.5 font-jetbrains font-semibold transition-colors hover:bg-accent-primary-hover uppercase"
                    >
                        Send message
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="p-4 sm:p-5 space-y-2 max-h-[300px] overflow-y-auto scrollbar-hide">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            className={`flex flex-wrap items-center gap-3 rounded-lg border px-3.5 py-2.5 transition-colors duration-200 ${
                                msg.active
                                    ? "border-accent-tertiary/30 bg-accent-tertiary/5 text-text-primary"
                                    : "border-border-default bg-bg-tertiary/20 text-text-tertiary/60"
                            }`}
                            initial={{ opacity: 0, y: 15, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="font-jetbrains text-[10px] tracking-widest uppercase font-semibold w-14 shrink-0">
                                {msg.label}
                            </span>
                            <span className="font-space text-sm flex-1 min-w-[120px] truncate">
                                "{msg.text}"
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="font-jetbrains text-[9px] uppercase tracking-wider text-text-muted">key</span>
                                <code className={`font-mono text-xs ${
                                    msg.active
                                        ? "text-accent-tertiary font-medium"
                                        : "text-text-muted/50 line-through decoration-1"
                                }`}>
                                    {msg.key}
                                </code>
                            </div>
                            <span className={`font-jetbrains text-[9px] rounded-full px-2 py-0.5 border ${
                                msg.active
                                    ? "bg-accent-tertiary/10 text-accent-tertiary border-accent-tertiary/25"
                                    : "bg-bg-tertiary text-text-muted border-border-default"
                            }`}>
                                {msg.active ? "active" : "destroyed"}
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Bottom info banner */}
            <div className="border-t border-border-default px-4 py-3 sm:px-5 bg-bg-tertiary/10">
                <p className="font-space text-[12px] text-text-tertiary leading-relaxed">
                    Steal today's key and you can read today's message.{" "}
                    <span className="font-semibold text-text-primary">You can't read any of the older ones.</span> The key that unlocked yesterday's messages was deleted yesterday.
                </p>
            </div>
        </div>
    );
}
