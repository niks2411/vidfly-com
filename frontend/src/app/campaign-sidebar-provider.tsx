"use client";

import { useState, createContext, useContext, ReactNode } from "react";

type CampaignSidebarContextType = {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (open: boolean) => void;
};

export const CampaignSidebarContext = createContext<CampaignSidebarContextType | null>(null);

export const useCampaignSidebar = () => useContext(CampaignSidebarContext);

export function CampaignSidebarProvider({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <CampaignSidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
            {children}
        </CampaignSidebarContext.Provider>
    );
}
