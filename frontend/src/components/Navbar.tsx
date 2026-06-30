"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useCampaignSidebar } from "@/app/campaign-sidebar-provider";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  LogOut,
  ChevronDown,
  Settings,
  LayoutDashboard,
  Gift
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Campaign Hamburger Button Component - Must be defined before Navbar
function CampaignHamburgerButton() {
  const sidebarContext = useCampaignSidebar();

  if (!sidebarContext) return null;

  const { isSidebarOpen, setIsSidebarOpen } = sidebarContext;

  return (
    <button
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      className="text-gray-700 hover:text-red-600 transition-colors duration-300 p-2"
      aria-label="Toggle campaign menu"
    >
      {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  );
}

const TopBanner = () => {
  const content = (
    <div className="flex items-center whitespace-nowrap pr-24">
      <p className="text-[13px] md:text-[14px] font-bold tracking-tight text-white uppercase flex items-center gap-6">
        <span>WELCOME OFFER! Get 30% Extra Views On Your First Campaign with Vidflyy. Use Promo Code - <span className="text-yellow-300">FIRST50</span></span>
        <Link
          href="/get-started"
          className="bg-[#FF8C00] hover:bg-[#e67e00] text-white px-4 py-1 rounded text-[12px] md:text-[14px] font-extrabold transition-all duration-300 shadow-lg"
        >
          Get Started
        </Link>
      </p>
    </div>
  );

  return (
    <div className="w-full bg-gradient-to-r from-[#E52D27] via-[#D42621] to-[#7b2ff7] py-2 overflow-hidden border-b border-white/10">
      {/* Mobile Marquee */}
      <div className="flex sm:hidden overflow-hidden relative">
        <div className="animate-marquee flex items-center">
          {content}
          {content}
        </div>
      </div>

      {/* Desktop Static Display */}
      <div className="hidden sm:flex w-full items-center justify-center gap-6 text-white text-center">
        <p className="text-[14px] font-bold tracking-tight uppercase">
          WELCOME OFFER! Get 30% Extra Views On Your First Campaign with Vidflyy. Use Promo Code - <span className="text-yellow-300">FIRST50</span>
        </p>
        <Link
          href="/get-started"
          className="bg-[#FF8C00] hover:bg-[#e67e00] text-white px-4 py-1 rounded text-[14px] font-extrabold transition-all duration-300 shadow-lg whitespace-nowrap"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileChannelOpen, setIsMobileChannelOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isCampaignPage = pathname?.startsWith('/campaign') || false;
  const { user, logout } = useAuth();
  const [avatar, setAvatar] = useState<string>("boy");

  useEffect(() => {
    setMounted(true);
    const savedAvatar = localStorage.getItem("vidfly_avatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    } else {
      setAvatar("boy");
    }

    const handleStorage = () => {
      const updatedAvatar = localStorage.getItem("vidfly_avatar");
      setAvatar(updatedAvatar || "boy");
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isExcluded = pathname === "/get-started" || pathname === "/profile" || pathname?.startsWith('/campaign') || pathname?.startsWith('/payment') || pathname?.startsWith('/admin');

  const handleNavClick = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const handleGetStartedClick = () => {
    if (user) {
      handleNavClick("/campaign");
    } else {
      handleNavClick("/get-started");
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="sticky top-0 z-50 w-full flex flex-col" style={isExcluded ? { display: "none" } : undefined}>
      <TopBanner />
      <nav className="bg-white footer-shadow font-montserrat w-full">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 lg:h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 mr-8 lg:mr-12 lg:ml-4">
              <Image
                src="/lovable-uploads/0b27d722-c6a7-47e3-ae7d-aeb8461db170.png"
                alt="Vidflyy"
                width={120}
                height={36}
                className="h-11 w-auto"
                priority
              />
            </Link>

            {/* Desktop Nav Links - sit right next to the logo */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <button onClick={() => handleNavClick("/how-it-works")} className="text-[#0E172B] hover:text-red-600 text-[16px] font-semibold transition-colors duration-300 whitespace-nowrap">
                How Vidflyy Works
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-[#0E172B] hover:text-red-600 text-[16px] font-semibold transition-colors duration-300 whitespace-nowrap flex items-center gap-1 hover:cursor-pointer outline-none">
                    Channel Promotion <ChevronDown className="h-4 w-4 shrink-0" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-72 mt-2 p-2 rounded-2xl shadow-2xl border border-gray-100 bg-white z-[1001] opacity-100">
                  <DropdownMenuLabel className="font-founders text-xs text-gray-400 px-3 py-2">
                    SELECT CHANNEL TYPE
                  </DropdownMenuLabel>
                  {[
                    { label: "Youtube Music Promotion", path: "/youtube-music-promotion" },
                    { label: "Youtube Gaming Channel Promotion", path: "/youtube-gaming-promotion" },
                    { label: "Youtube Travel Promotion", path: "/youtube-travel-promotion" },
                    { label: "Youtube Health & Beauty Promotion", path: "/youtube-health-beauty-promotion" },
                    { label: "Youtube Motivation Promotion", path: "/youtube-motivation-promotion" },
                    { label: "Youtube Vlogging Promotion", path: "/youtube-vlogging-promotion" },
                  ].map((item) => (
                    <DropdownMenuItem
                      key={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className="flex items-center px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-50 focus:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-[14px] text-gray-800 hover:text-red-600 transition-colors">
                        {item.label}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <button onClick={() => handleNavClick("/pricing")} className="text-[#0E172B] hover:text-red-600 text-[16px] font-semibold transition-colors duration-300 whitespace-nowrap">
                Pricing
              </button>
              <button onClick={() => handleNavClick("/contact")} className="text-[#0E172B] hover:text-red-600 text-[16px] font-semibold transition-colors duration-300 whitespace-nowrap">
                Contact Us
              </button>
            </div>

            {/* Right side: Login + CTA pushed to the far right */}
            {/* Both logged-in and logged-out views are always in the DOM, toggled via CSS to prevent React DOM reconciliation crashes from third-party script injections */}
            <div className="hidden lg:flex items-center gap-6 ml-auto shrink-0">
              <div className="flex items-center gap-4" style={mounted && user ? undefined : { display: 'none' }}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 outline-none group">
                      <Avatar className="h-9 w-9 border-2 border-transparent group-hover:border-red-500 transition-all duration-300">
                        <AvatarImage src={(user?.avatar) || `/avatars/${avatar}.png`} alt={(user?.name) || (user?.email) || ''} referrerPolicy="no-referrer" />
                        <AvatarFallback className="bg-slate-100 text-slate-600">
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <span className="text-[14px] font-bold text-[#0E172B] leading-none">
                          {user?.email ? user.email.split('@')[0] : (user?.name || "My Account")}
                        </span>
                        <span className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                          Account <ChevronDown className="h-3 w-3" />
                        </span>
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-60 mt-2 p-2 rounded-2xl shadow-2xl border-gray-200 bg-white opacity-100 z-[1001]">
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
              </div>
              <div className="flex items-center gap-6" style={mounted && user ? { display: 'none' } : undefined}>
                <button onClick={() => handleNavClick("/get-started")} className="text-[#0E172B] hover:text-red-600 text-[16px] font-semibold whitespace-nowrap">
                  Login
                </button>
                <Button
                  onClick={handleGetStartedClick}
                  className="bg-[#E52D27] hover:bg-[#D42621] text-white px-9 py-2.5 h-11 rounded-lg text-[16px] font-bold transition-all duration-300 transform hover:scale-105 whitespace-nowrap normal-case"
                >
                  Get started now
                </Button>
              </div>
            </div>

            {/* Hamburger Menu Icon - Visible below 1024px */}
            <div className="lg:hidden ml-auto">
              {!isCampaignPage ? (
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-700 hover:text-red-600 transition-colors duration-300 p-2"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              ) : (
                <CampaignHamburgerButton />
              )}
            </div>
          </div>

          {isOpen && (
            <div className="lg:hidden animate-fade-in pb-6">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                {/* How Vidflyy Works */}
                <button
                  onClick={() => handleNavClick("/how-it-works")}
                  className="text-[#0E172B] hover:text-red-600 block px-3 py-4 text-lg font-bold w-full text-left transition-colors duration-300 border-b border-gray-50"
                >
                  How Vidflyy Works
                </button>

                {/* Collapsible Channel Promotion */}
                <div className="border-b border-gray-50">
                  <button
                    onClick={() => setIsMobileChannelOpen(!isMobileChannelOpen)}
                    className="text-[#0E172B] hover:text-red-600 flex justify-between items-center px-3 py-4 text-lg font-bold w-full text-left transition-colors duration-300"
                  >
                    <span>Channel Promotion</span>
                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isMobileChannelOpen ? "rotate-180 text-red-600" : ""}`} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isMobileChannelOpen ? "max-h-[400px] pb-4 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    {[
                      { label: "Youtube Music Promotion", path: "/youtube-music-promotion" },
                      { label: "Youtube Gaming Channel Promotion", path: "/youtube-gaming-promotion" },
                      { label: "Youtube Travel Promotion", path: "/youtube-travel-promotion" },
                      { label: "Youtube Health & Beauty Promotion", path: "/youtube-health-beauty-promotion" },
                      { label: "Youtube Motivation Promotion", path: "/youtube-motivation-promotion" },
                      { label: "Youtube Vlogging Promotion", path: "/youtube-vlogging-promotion" },
                    ].map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleNavClick(item.path)}
                        className="text-gray-600 hover:text-red-600 block pl-8 pr-3 py-3 text-[16px] font-semibold w-full text-left transition-colors duration-300"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <button
                  onClick={() => handleNavClick("/pricing")}
                  className="text-[#0E172B] hover:text-red-600 block px-3 py-4 text-lg font-bold w-full text-left transition-colors duration-300 border-b border-gray-50"
                >
                  Pricing
                </button>

                {/* Contact Us */}
                <button
                  onClick={() => handleNavClick("/contact")}
                  className="text-[#0E172B] hover:text-red-600 block px-3 py-4 text-lg font-bold w-full text-left transition-colors duration-300 border-b border-gray-50"
                >
                  Contact Us
                </button>
                <div className="pt-6 space-y-4 px-3">
                  {/* Both views always in DOM, toggled via CSS for DOM stability */}
                  <div className="space-y-4" style={mounted && user ? undefined : { display: 'none' }}>
                    <div className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl mb-4 shadow-sm">
                      <Avatar className="h-12 w-12 border border-slate-100">
                        <AvatarImage src={(user?.avatar) || `/avatars/${avatar}.png`} alt={(user?.name) || (user?.email) || ''} referrerPolicy="no-referrer" />
                        <AvatarFallback className="bg-slate-100 text-slate-600">
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-[#0E172B]">{user?.email ? user.email.split('@')[0] : (user?.name || "My Account")}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNavClick("/campaign")}
                      className="text-[#0E172B] font-bold w-full text-left text-lg flex items-center gap-3 py-2"
                    >
                      <LayoutDashboard className="h-5 w-5" /> Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-red-600 font-bold w-full text-left text-lg flex items-center gap-3 py-2"
                    >
                      <LogOut className="h-5 w-5" /> Log out
                    </button>
                  </div>
                  <div style={mounted && user ? { display: 'none' } : undefined}>
                    <button onClick={() => handleNavClick("/get-started")} className="text-[#0E172B] font-bold w-full text-left text-lg">
                      Login
                    </button>
                    <Button onClick={handleGetStartedClick} className="bg-[#E52D27] hover:bg-[#D42621] text-white w-full py-7 text-lg font-bold rounded-xl shadow-lg normal-case mt-4">
                      Get started now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}




        </div>
      </nav>
    </div>
  );
};

export default Navbar;
