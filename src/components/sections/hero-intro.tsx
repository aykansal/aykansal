import Image from "next/image";
import { DitherImage } from "@/components/ui/dither-image";
import { BookCallButton } from "@/components/ui/book-call-button";
import { SOCIAL } from "@/config/links";

export function HeroIntro() {
    return (
        <div className="flex flex-col items-center gap-6 min-[560px]:flex-row min-[560px]:gap-6">
            {/* Avatar — interactive dithered particle canvas */}
            <div className="aspect-square w-full shrink-0 min-[560px]:h-[300px] min-[560px]:w-[300px]">
                <DitherImage src="/avatar-big.png" className="block h-full w-full" />
            </div>

            {/* Text + CTA */}
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-4">
                <p className="font-space text-[16px] leading-normal text-text-secondary">
                    I&apos;m <span className="text-text-primary underline decoration-border-strong underline-offset-2">Ayush Kansal</span>. I design and build in applied ai, web, full-stack, from start to ship. Currently learning <span className="text-text-primary underline decoration-border-strong underline-offset-2">AI Security</span> systems by building Harnesses. Before that, I was freelancing and shipping fast on{" "}
                    <span className="inline-flex items-center gap-1">
                        <Image src="/icons/Linkedin.svg" alt="" width={14} height={14} className="inline-block size-4" />
                        <span className="text-text-primary underline decoration-border-strong underline-offset-2"><a href={SOCIAL.linkedin}>Linkedin</a></span>
                    </span>
                    .
                </p>

                <p className="font-space text-[16px] leading-normal text-text-secondary">
                    Based in <span className="text-text-primary underline decoration-border-strong underline-offset-2">Mohali, India</span>.
                    <br/>
                    Open for{" "}<span className="text-text-primary underline decoration-border-strong underline-offset-2">Work</span>.
                </p>

                <div className="pt-1">
                    <BookCallButton />
                </div>
            </div>
        </div>
    );
}
