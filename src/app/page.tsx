import { HeroBanner } from "@/components/sections/hero-banner";
import { HeroPlayer } from "@/components/sections/hero-player";
import { HeroIntro } from "@/components/sections/hero-intro";
import { HeroManifesto } from "@/components/sections/hero-manifesto";
import { Experience } from "@/components/sections/experience";
import { GitHubGraph } from "@/components/sections/github-graph";
import { Projects } from "@/components/sections/projects";
// import { Testimonials } from "@/components/sections/testimonials";
import { Services } from "@/components/sections/services";
import { Connections } from "@/components/sections/connections";
import { Footer } from "@/components/layout/footer";

export default function Home() {
    return (
        <main className="mx-auto flex w-full max-w-2xl flex-col px-6 pt-12 pb-0">
            <HeroIntro />
            <div className="mt-16 flex flex-col gap-4 min-[560px]:mt-12">
                <HeroPlayer />
                <HeroBanner />
            </div>
            <div className="mt-8">
                <HeroManifesto />
            </div>
            <Experience />
            <GitHubGraph />
            <Projects />
            {/* <Testimonials /> */}
            <Services />
            <Connections />
            <Footer />
        </main>
    );
}
