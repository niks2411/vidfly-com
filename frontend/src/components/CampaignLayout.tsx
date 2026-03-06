"use client";

import { ReactNode } from "react";
import CampaignSidebar, { CampaignSidebarKey } from "@/components/CampaignSidebar";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useCampaignSidebar } from "@/app/campaign-sidebar-provider";

type CampaignLayoutProps = {
  children: ReactNode;
  activeSidebar?: CampaignSidebarKey;
  className?: string;
};

const CampaignLayout = ({
  children,
  activeSidebar = "promote",
  className,
}: CampaignLayoutProps) => {
  const sidebarContext = useCampaignSidebar();
  const isSidebarOpen = sidebarContext?.isSidebarOpen || false;
  const setIsSidebarOpen = sidebarContext?.setIsSidebarOpen || (() => { });

  return (
    <div className="min-h-screen font-montserrat">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 top-[108px]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={cn(
          "lg:hidden fixed top-[108px] right-0 h-[calc(100vh-108px)] w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto",
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Mobile Drawer Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-red-600">
            Campaign Menu
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-slate-500 hover:text-red-600 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <CampaignSidebar
            active={activeSidebar}
            onNavigate={() => setIsSidebarOpen(false)}
            isMobile={true}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-72px)] pt-[108px]">
        {/* Desktop Sidebar - Only visible on desktop, touching left edge */}
        <div className="hidden lg:block border-r border-slate-200 flex-shrink-0 sticky top-[108px] h-[calc(100vh-108px)]">
          <CampaignSidebar active={activeSidebar} />
        </div>
        {/* Main content - Full width on mobile and desktop */}
        <main className={cn("flex-1 space-y-6 w-full max-w-7xl mx-auto px-4 lg:px-8 py-10", className)}>{children}</main>
      </div>
    </div>
  );
};

export default CampaignLayout;

