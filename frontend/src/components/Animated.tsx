"use client";

import { useEffect, useRef, useState } from "react";

function useInView(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setInView(true);
                        observer.unobserve(node);
                    }
                });
            },
            { threshold: 0.15, ...options }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [ref, options]);

    return { ref, inView };
}

export const Animated: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
    const { ref, inView } = useInView();
    return (
        <div
            ref={ref as any}
            style={{ transitionDelay: `${delay}ms` }}
            className={`${className} transform transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
        >
            {children}
        </div>
    );
};
