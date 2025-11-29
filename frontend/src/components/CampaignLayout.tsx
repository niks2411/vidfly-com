import { ReactNode, useState } from "react";
import Navbar, { CampaignSidebarContext } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CampaignSidebar, { CampaignSidebarKey } from "@/components/CampaignSidebar";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <CampaignSidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white font-montserrat">
        <Navbar />

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40 top-16" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar Drawer */}
        <div
          className={cn(
            "lg:hidden fixed top-16 right-0 h-[calc(100vh-64px)] w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto",
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

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 flex flex-col gap-8 lg:flex-row">
          {/* Desktop Sidebar - Only visible on desktop */}
          <div className="hidden lg:block">
            <CampaignSidebar active={activeSidebar} />
          </div>
          {/* Main content - Full width on mobile, constrained on desktop */}
          <main className={cn("flex-1 space-y-6 w-full lg:max-w-4xl", className)}>{children}</main>
        </div>
        <Footer />
      </div>
    </CampaignSidebarContext.Provider>
  );
};

export default CampaignLayout;

