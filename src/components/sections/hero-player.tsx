"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const MAX_DURATION = 100; // 1:40 in seconds

function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(MAX_DURATION);
    const [blockCount, setBlockCount] = useState(20);

    const effectiveDuration = Math.min(duration, MAX_DURATION);

    const toggle = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (playing) {
            audio.pause();
            setPlaying(false);
        } else {
            if (audio.currentTime >= effectiveDuration) {
                audio.currentTime = 0;
            }
            audio.volume = 0.3;
            audio.play().catch(() => {});
            setPlaying(true);
        }
    }, [playing, effectiveDuration]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        function onTimeUpdate() {
            const t = audio!.currentTime;
            setCurrentTime(t);
            if (t >= effectiveDuration) {
                audio!.pause();
                audio!.currentTime = 0;
                setCurrentTime(0);
                setPlaying(false);
            }
        }

        function onLoaded() {
            setDuration(audio!.duration);
        }

        function onEnded() {
            setCurrentTime(0);
            setPlaying(false);
        }

        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("loadedmetadata", onLoaded);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("loadedmetadata", onLoaded);
            audio.removeEventListener("ended", onEnded);
        };
    }, [effectiveDuration]);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;

        const charWidth = 8.4; // approximate width of █/░ at 14px JetBrains Mono

        function measure() {
            const width = el!.clientWidth;
            setBlockCount(Math.max(8, Math.floor(width / charWidth)));
        }

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    function seek(e: React.MouseEvent<HTMLDivElement>) {
        const audio = audioRef.current;
        if (!audio) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        audio.currentTime = ratio * effectiveDuration;
        setCurrentTime(audio.currentTime);
    }

    function seekByKey(e: React.KeyboardEvent) {
        const audio = audioRef.current;
        if (!audio) return;
        const step = 5;
        if (e.key === "ArrowRight") {
            audio.currentTime = Math.min(audio.currentTime + step, effectiveDuration);
        } else if (e.key === "ArrowLeft") {
            audio.currentTime = Math.max(audio.currentTime - step, 0);
        } else if (e.key === "Home") {
            audio.currentTime = 0;
        } else if (e.key === "End") {
            audio.currentTime = effectiveDuration;
        } else {
            return;
        }
        e.preventDefault();
        setCurrentTime(audio.currentTime);
    }

    const progress = effectiveDuration > 0 ? (currentTime / effectiveDuration) * 100 : 0;
    const filled = Math.round((progress / 100) * blockCount);

    return (
        <div className="flex min-w-0 flex-1 items-center gap-3">
            <audio ref={audioRef} src="/audios/rain.mp3" preload="none" />

            <button
                onClick={toggle}
                aria-label={playing ? "Pause rain ambience" : "Play rain ambience"}
                className="shrink-0 font-jetbrains text-[14px] uppercase tracking-wide text-text-secondary outline-none transition-colors duration-200 hover:text-text-primary focus-visible:text-accent-primary"
            >
                {playing ? "PAUSE" : "PLAY"}
            </button>

            <div
                ref={trackRef}
                onClick={seek}
                onKeyDown={seekByKey}
                tabIndex={0}
                role="slider"
                aria-label="Audio timeline"
                aria-valuemin={0}
                aria-valuemax={effectiveDuration}
                aria-valuenow={Math.round(currentTime)}
                aria-valuetext={formatTime(currentTime)}
                className="min-w-0 flex-1 cursor-pointer select-none overflow-hidden whitespace-nowrap font-jetbrains text-[14px] leading-none min-[560px]:max-w-[240px] outline-none focus-visible:ring-1 focus-visible:ring-accent-primary"
            >
                <span className="text-text-secondary">{"█".repeat(filled)}</span>
                <span className="text-text-tertiary">{"░".repeat(blockCount - filled)}</span>
            </div>

            <span className="shrink-0 font-jetbrains text-[14px] tabular-nums text-text-secondary">
                {formatTime(currentTime)}
            </span>
        </div>
    );
}

function Clock() {
    const [time, setTime] = useState<{ ist: string; utc: string } | null>(null);

    useEffect(() => {
        function update() {
            const now = new Date();
            const istFull = now.toLocaleTimeString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });
            const utcFull = now.toLocaleTimeString("en-GB", {
                timeZone: "UTC",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });
            setTime({ ist: istFull, utc: utcFull });
        }

        update();
        const interval = setInterval(update, 60_000);
        return () => clearInterval(interval);
    }, []);

    if (!time) return null;

    const istParts = time.ist.split(" ");
    const utcParts = time.utc.split(" ");

    return (
        <span className="shrink-0 font-jetbrains text-[14px] tabular-nums uppercase">
            <span className="hidden min-[560px]:inline">
                <span className="text-text-tertiary">IST </span>
                <span className="text-text-secondary">{istParts[0]}</span>
                <span className="text-text-tertiary"> {istParts[1]}</span>
            </span>
            <span className="hidden min-[630px]:inline">
                <span className="text-text-tertiary"> · UTC </span>
                <span className="text-text-secondary">{utcParts[0]}</span>
                <span className="text-text-tertiary"> {utcParts[1]}</span>
            </span>
        </span>
    );
}

export function HeroPlayer() {
    return (
        <div className="flex items-center justify-between gap-4">
            <AudioPlayer />
            <Clock />
        </div>
    );
}
