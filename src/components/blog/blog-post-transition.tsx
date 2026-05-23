"use client";

import { motion } from "@/lib/motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function BlogPostTransition({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
        >
            {children}
        </motion.div>
    );
}
