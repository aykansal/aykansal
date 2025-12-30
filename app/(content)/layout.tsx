import Script from "next/script";
import { CalIcon } from "@/components/icons/cal-icon";
import { GitHubIcon } from "@/components/icons/github-icon";
import { LinkedInIcon } from "@/components/icons/linkedin-icon";
import { TwitterIcon } from "@/components/icons/twitter-icon";
import { YtIcon } from "@/components/icons/yt-icon";
import { ModeToggle } from "@/components/mode-toggle";
import { SectionTabs } from "@/components/sections/section-tabs";

const age = 20.940_063_403_62;

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900">
        <main className="relative z-10 mx-auto mt-16 max-w-xl px-4 py-4 text-zinc-900 dark:text-zinc-100">
          <section className="mb-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-gambarino font-medium text-2xl tracking-tight">
                Hi, I'm Ayush Kansal
              </h2>
              <div className="flex items-center gap-4">
                <a
                  aria-label="View source code on GitHub"
                  className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-md p-2 transition-all hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-zinc-600 dark:focus:ring-offset-black dark:hover:bg-zinc-800"
                  href="https://github.com/aykansal/aykansal"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <GitHubIcon className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100" />
                </a>
                <ModeToggle />
              </div>
            </div>
            <p className="text-md">
              Software Engineer based in Mohali, India,{" "}
              <span className="precise-age" id="age">
                {age}
              </span>{" "}
              years old with a passion for generative AI and full-stack
              development.
            </p>
            <div className="flex flex-row gap-4">
              <a
                className="overflow-hidden text-zinc-900/60 transition-all hover:text-zinc-900 dark:text-zinc-100/60 dark:hover:text-zinc-100"
                href="https://cal.com/aykansal"
                rel="noopener"
                target="_blank"
              >
                <p className="sr-only">Cal.com</p>
                <CalIcon className="h-5 w-5 transition-all" />
              </a>
              <a
                className="overflow-hidden text-zinc-900/60 transition-all hover:text-zinc-900 dark:text-zinc-100/60 dark:hover:text-zinc-100"
                href="https://github.com/aykansal"
                rel="noopener"
                target="_blank"
              >
                <p className="sr-only">GitHub</p>
                <GitHubIcon className="h-5 w-5 transition-all" />
              </a>
              <a
                className="overflow-hidden text-zinc-900/60 transition-all hover:text-zinc-900 dark:text-zinc-100/60 dark:hover:text-zinc-100"
                href="https://twitter.com/aykansal"
                rel="noopener"
                target="_blank"
              >
                <p className="sr-only">Twitter</p>
                <TwitterIcon className="h-5 w-5 transition-all" />
              </a>
              <a
                className="overflow-hidden text-zinc-900/60 transition-all hover:text-zinc-900 dark:text-zinc-100/60 dark:hover:text-zinc-100"
                href="https://www.linkedin.com/in/aykansal/"
                rel="noopener"
                target="_blank"
              >
                <p className="sr-only">LinkedIn</p>
                <LinkedInIcon className="h-5 w-5 transition-all" />
              </a>
              <a
                className="overflow-hidden text-zinc-900/60 transition-all hover:text-zinc-900 dark:text-zinc-100/60 dark:hover:text-zinc-100"
                href="https://youtube.com/@aykansal"
                rel="noopener"
                target="_blank"
              >
                <p className="sr-only">YouTube</p>
                <YtIcon className="h-5 w-5 transition-all" />
              </a>
            </div>
          </section>

          <section className="mt-8 flex flex-col gap-8">
            <SectionTabs />
            {children}
          </section>

          {/* <section className="mt-12">
            <Sponsors />
          </section> */}
        </main>
        <footer className="relative z-50 mt-8">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-2 px-4 py-4 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-0 sm:text-left">
            <p className="text-sm text-zinc-900 dark:text-muted-foreground">
              Made with ❤️ by{" "}
              <span className="font-bold text-black/90 dark:text-zinc-100">
                Ayush Kansal
              </span>
            </p>
          </div>
        </footer>
      </div>
      <Script src="/age.js" />
    </>
  );
}
