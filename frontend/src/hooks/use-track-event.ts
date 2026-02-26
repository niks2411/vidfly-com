"use client";

import { useCallback } from "react";

export const useTrackEvent = () => {
    const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
        // Track Google Analytics
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("event", eventName, properties);
        }

        // Track Meta Pixel
        if (typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq("trackCustom", eventName, properties);
        }

        console.log(`[Event Tracked]: ${eventName}`, properties);
    }, []);

    return trackEvent;
};
