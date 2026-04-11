"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

export function MermaidRenderer() {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        mermaid.initialize({
            startOnLoad: false,
            theme: "dark", // or dynamically based on your app's theme
            securityLevel: "loose",
        });

        // Hashnode outputs mermaid blocks generally as <pre><code class="language-mermaid">
        // We will find these and render them via Mermaid.js
        const nodes = document.querySelectorAll("pre code.language-mermaid");
        
        nodes.forEach((node, index) => {
            const wrapper = document.createElement("div");
            wrapper.className = "relative group bg-bg-primary rounded-xl border border-border-subtle p-6 mb-6 flex flex-col items-center justify-center";
            wrapper.id = `mermaid-wrapper-${index}`;

            const container = document.createElement("div");
            container.className = "mermaid flex justify-center w-full overflow-auto max-h-[80vh]";
            container.id = `mermaid-${index}`;

            const button = document.createElement("button");
            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`;
            button.className = "absolute top-3 right-3 p-1.5 bg-bg-secondary border border-border-subtle text-text-muted hover:text-text-primary rounded-md opacity-50 hover:opacity-100 transition-opacity z-10 hidden sm:block";
            button.title = "View Fullscreen";
            button.onclick = () => {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    wrapper.requestFullscreen().catch(err => {
                        console.error(`Error attempting to enable fullscreen: ${err.message}`);
                    });
                }
            };
            
            wrapper.appendChild(button);
            wrapper.appendChild(container);

            const graphDefinition = node.textContent || "";
            
            // Render and insert
            mermaid.render(`mermaid-svg-${index}`, graphDefinition).then((result) => {
                container.innerHTML = result.svg;
                const preElement = node.parentElement;
                preElement?.parentElement?.replaceChild(wrapper, preElement);
            }).catch(e => {
                console.error("Mermaid parsing error", e);
            });
        });
        
    }, []);

    return null;
}
