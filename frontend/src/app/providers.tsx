"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { HelmetProvider } from "react-helmet-async";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </HelmetProvider>
    );
}
