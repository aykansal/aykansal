"use client";

import { motion } from "@/lib/motion";

const ease = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function BlogListTransition({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
        >
            {children}
        </motion.div>
    );
}

export function BlogListItem({ children }: { children: React.ReactNode }) {
    return (
        <motion.div variants={itemVariants} className="w-full">
            {children}
        </motion.div>
    );
}
