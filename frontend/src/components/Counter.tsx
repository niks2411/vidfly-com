"use client";

import { useEffect, useRef, useState } from "react";

export const Counter: React.FC<{ to: number; duration?: number }> = ({ to, duration = 1200 }) => {
    const [value, setValue] = useState(0);
    const [mounted, setMounted] = useState(false);
    const start = useRef<number | null>(null);

    useEffect(() => {
        setMounted(true);
        let rafId: number;
        const step = (ts: number) => {
            if (!start.current) start.current = ts;
            const progress = Math.min((ts - start.current) / duration, 1);
            setValue(Math.floor(progress * to));
            if (progress < 1) rafId = requestAnimationFrame(step);
        };
        rafId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafId);
    }, [to, duration]);

    return (
        <span className="font-bold text-3xl lg:text-4xl text-red-600" suppressHydrationWarning>
            {mounted ? value.toLocaleString() : "0"}
        </span>
    );
};
