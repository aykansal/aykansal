"use client";

export function ThreePlacesShowcase() {
    return (
        <div className="not-prose my-8 overflow-hidden rounded-xl border border-border-default bg-bg-secondary">
            <div className="border-b border-border-default px-4 py-3 sm:px-5">
                <p className="font-jetbrains text-xs font-semibold tracking-wider text-text-primary uppercase">
                    Your message, three places at once
                </p>
                <p className="mt-0.5 font-space text-[12px] text-text-tertiary">
                    Readable on the ends. Nonsense in the middle.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch divide-y divide-border-default md:divide-y-0">
                {/* Your Phone */}
                <div className="p-5 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-tertiary animate-pulse" />
                            <span className="font-jetbrains text-[10px] tracking-widest text-text-tertiary uppercase">Your phone</span>
                        </div>
                        <div className="rounded-lg border border-accent-tertiary/20 bg-accent-tertiary/5 px-3.5 py-3 min-h-[72px] flex items-center text-accent-tertiary">
                            <p className="font-space text-sm leading-relaxed font-medium">hey</p>
                        </div>
                    </div>
                    <p className="mt-2.5 font-jetbrains text-[10px] text-text-muted">Plain text, before it leaves.</p>
                </div>

                {/* Arrow 1 */}
                <div className="hidden md:flex items-center justify-center px-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-text-muted">
                        <path d="M5 12h14m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* WhatsApp Server */}
                <div className="p-5 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-pixel-orange" />
                            <span className="font-jetbrains text-[10px] tracking-widest text-text-tertiary uppercase">Server</span>
                        </div>
                        <div className="rounded-lg border border-border-default bg-bg-tertiary/50 px-3.5 py-3 min-h-[72px] flex items-center text-text-tertiary">
                            <p className="font-mono text-[11px] break-all leading-relaxed opacity-70">
                                !dPO;z]:LO!?;$:PRU:.$F~m/iAz_|a9[[
                            </p>
                        </div>
                    </div>
                    <p className="mt-2.5 font-jetbrains text-[10px] text-text-muted">Scrambled. Unreadable without the key.</p>
                </div>

                {/* Arrow 2 */}
                <div className="hidden md:flex items-center justify-center px-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-text-muted">
                        <path d="M5 12h14m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* Friend's Phone */}
                <div className="p-5 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-primary animate-pulse" />
                            <span className="font-jetbrains text-[10px] tracking-widest text-text-tertiary uppercase">Friend's phone</span>
                        </div>
                        <div className="rounded-lg border border-accent-primary/20 bg-accent-primary/5 px-3.5 py-3 min-h-[72px] flex items-center text-accent-primary">
                            <p className="font-space text-sm leading-relaxed font-medium">hey</p>
                        </div>
                    </div>
                    <p className="mt-2.5 font-jetbrains text-[10px] text-text-muted">Unscrambled, once it lands.</p>
                </div>
            </div>
        </div>
    );
}
