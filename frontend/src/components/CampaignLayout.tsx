"use client";

import { ReactNode } from "react";
import CampaignSidebar, { CampaignSidebarKey } from "@/components/CampaignSidebar";
import { cn } from "@/lib/utils";
import { X, Menu } from "lucide-react";
import { useCampaignSidebar } from "@/app/campaign-sidebar-provider";
import ChannelSelector from "./ChannelSelector";
import { User, ChevronDown, LogOut, Settings, LayoutDashboard, Gift } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type CampaignLayoutProps = {
  children: ReactNode;
  activeSidebar?: CampaignSidebarKey;
  className?: string;
  hideSidebar?: boolean;
};

const CampaignLayout = ({
  children,
  activeSidebar = "promote",
  className,
  hideSidebar = false,
}: CampaignLayoutProps) => {
  const sidebarContext = useCampaignSidebar();
  const isSidebarOpen = sidebarContext?.isSidebarOpen || false;
  const setIsSidebarOpen = sidebarContext?.setIsSidebarOpen || (() => { });

  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen w-full font-montserrat flex flex-col">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && !hideSidebar && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 top-0"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      {!hideSidebar && (
        <div
          className={cn(
            "lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto",
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
      )}

      {/* Full Width Shared Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100/50 px-4 lg:px-8 h-16 lg:h-[72px] flex items-center justify-between">
        {/* Left Side: Logo & Mobile Menu Toggle & Channel Selector */}
        <div className="flex items-center gap-3 lg:gap-6 text-slate-600">
          <Link href="/" className="lg:mr-2">
            <img src="/lovable-uploads/0b27d722-c6a7-47e3-ae7d-aeb8461db170.png" alt="Vidflyy" className="h-6 lg:h-7 w-auto cursor-pointer object-contain" />
          </Link>
          {!hideSidebar && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-red-600 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={2} />
            </button>
          )}
          <div className="flex items-center ml-16 lg:ml-36">
            <ChannelSelector />
          </div>
        </div>

        {/* Right Side: User Profile */}
        <div className="flex items-center">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 lg:gap-3 cursor-pointer hover:bg-slate-50 p-1 rounded-full transition-colors border border-transparent hover:border-slate-100 group">
                  <Avatar className="w-9 h-9 lg:w-10 lg:h-10 border-2 border-white shadow-sm group-hover:border-red-500 transition-all duration-300">
                    <AvatarImage src={user.avatar || "/avatars/boy.png"} alt={user.name || user.email} referrerPolicy="no-referrer" />
                    <AvatarFallback><User className="w-5 h-5 text-slate-400" /></AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex flex-col items-start translate-y-[1px] pr-2">
                    <span className="text-[13px] lg:text-[14px] font-bold text-slate-800 leading-tight">
                      {user.email ? user.email.split('@')[0] : (user.name || "My Account")}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] lg:text-[12px] text-slate-500 font-medium">
                      Account <ChevronDown className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                    </div>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 mt-2 p-2 rounded-2xl shadow-2xl border-gray-200 bg-white z-[1001]">
                <DropdownMenuLabel className="font-founders text-xs text-gray-400 px-3 py-2">
                  MY ACCOUNT
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => handleNavClick("/campaign")}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-50 focus:bg-gray-50 transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold text-[14px]">Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavClick("/profile")}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-50 focus:bg-gray-50 transition-colors"
                >
                  <Settings className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold text-[14px]">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavClick("/campaign/free-views")}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-50 focus:bg-gray-50 transition-colors"
                >
                  <Gift className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold text-[14px]">Free Views</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2 bg-gray-50" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-red-50 focus:bg-red-50 text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-semibold text-[14px]">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              <button onClick={() => handleNavClick("/get-started")} className="text-sm font-semibold text-slate-700 hover:text-red-600">
                Login
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 pt-16 lg:pt-[72px]">
        {/* Desktop Sidebar */}
        {!hideSidebar && (
          <div className="hidden lg:block z-30 fixed left-0 top-16 lg:top-[72px] bottom-0 w-[260px] border-r border-gray-100 bg-white overflow-y-auto">
            <CampaignSidebar active={activeSidebar} />
          </div>
        )}

        {/* Main content area */}
        <div className={cn(
          "flex-1 w-full bg-white flex flex-col min-h-[calc(100vh-72px)]",
          !hideSidebar && "lg:pl-[260px]"
        )}>
          <main className={cn("flex-1 w-full", className)}>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default CampaignLayout;

