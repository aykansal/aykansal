"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon, ArrowUpRight01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { projects, type Project } from "@/content/projects";
import { ProjectThumbnail } from "@/components/ui/project-thumbnail";

const ease = [0.16, 1, 0.3, 1] as const;

const STATUS_STYLES = {
    online: "bg-accent-tertiary/10 text-accent-tertiary",
    "in-dev": "bg-status-warning/10 text-status-warning",
    archived: "bg-text-muted/30 text-text-tertiary",
} as const;

const STATUS_LABELS = {
    online: "ONLINE",
    "in-dev": "IN DEV",
    archived: "ARCHIVED",
} as const;

/* ─── Project Card ─── */

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <motion.div
            ref={ref}
            className="group relative flex flex-col overflow-hidden border border-border-default bg-bg-secondary transition-[border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-border-strong"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1, ease }}
        >
            {/* Dot-grid overlay */}
            <div className="dot-grid-overlay pointer-events-none absolute inset-0 z-10 transition-opacity duration-300" aria-hidden="true" />

            {/* Thumbnail area */}
            <div className="relative aspect-16/10 w-full bg-bg-tertiary">
                {project.image ? (
                    <Image src={project.image} alt={`${project.title} screenshot`} fill className="object-cover" />
                ) : (
                    <ProjectThumbnail slug={project.slug} />
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-4 p-4">
                {/* Name + status */}
                <div className="flex items-center justify-between gap-2">
                    <h3 className="font-jetbrains text-[14px] font-semibold uppercase tracking-wide text-text-primary">{project.title}</h3>
                    <span className={cn("shrink-0 px-1.5 py-0.5 font-jetbrains text-[10px] uppercase tracking-wider", STATUS_STYLES[project.status])}>{STATUS_LABELS[project.status]}</span>
                </div>

                {/* Description */}
                <p className="line-clamp-3 font-space text-[14px] leading-normal text-text-secondary">{project.description}</p>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                        <span key={tech} className="bg-bg-tertiary px-1.5 py-0.5 font-jetbrains text-[10px] uppercase tracking-wider text-text-tertiary">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Separator */}
            <div className="mt-auto border-t border-border-default" />

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3">
                {/* Left: source badge */}
                <span
                    className={cn(
                        "shrink-0 px-1.5 py-0.5 font-jetbrains text-[10px] uppercase tracking-wider",
                        project.source === "open" ? "bg-accent-tertiary/10 text-accent-tertiary" : "bg-status-error/10 text-status-error",
                    )}
                >
                    {project.source === "open" ? "OPEN SOURCE" : "CLOSED SOURCE"}
                </span>

                {/* Right: links or fallback */}
                <div className="flex items-center gap-3">
                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 font-jetbrains text-[10px] uppercase tracking-wider text-text-tertiary transition-colors hover:text-text-primary"
                        >
                            REPO
                            <HugeiconsIcon icon={GithubIcon} size={12} />
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 font-jetbrains text-[10px] uppercase tracking-wider text-text-tertiary transition-colors hover:text-text-primary"
                        >
                            LIVE
                            <HugeiconsIcon icon={ArrowUpRight01Icon} size={12} />
                        </a>
                    )}
                    {!project.liveUrl && !project.repoUrl && (
                        <span className="font-jetbrains text-[10px] uppercase tracking-wider text-text-muted">
                            {project.status === "in-dev" ? "COMING SOON" : project.source === "closed" ? "NDA" : "COMING SOON"}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Projects Section ─── */

export function Projects() {
    return (
        <section id="projects" className="mt-24 scroll-mt-16" aria-label="Projects">
            <motion.h2
                className="font-micro text-[40px] leading-none text-text-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
            >
                PROJECTS
            </motion.h2>

            <div className="mt-8 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
                {projects.map((project, i) => (
                    <ProjectCard key={project.slug} project={project} index={i} />
                ))}
            </div>

            <div className="mt-4 flex justify-end">
                <Link
                    href="/work"
                    className="flex items-center gap-1 border border-border-default px-3 py-1.5 font-jetbrains text-[12px] uppercase tracking-wider text-text-tertiary transition-colors hover:border-border-strong hover:text-text-primary"
                >
                    SEE ALL WORK
                    <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
                </Link>
            </div>
        </section>
    );
}
