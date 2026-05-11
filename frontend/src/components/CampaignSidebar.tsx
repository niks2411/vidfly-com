"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Play, Users, Package, Eye, LayoutGrid,
  Gift, Settings, HelpCircle, LogOut, MessageCircle, Headphones
} from "lucide-react";

export type CampaignSidebarKey =
  | "promote"
  | "channel"
  | "packages"
  | "bulk"
  | "free"
  | "budget"
  | "payment"
  | "campaigns"
  | "settings"
  | "support";

type SidebarProps = {
  active?: CampaignSidebarKey;
  onNavigate?: () => void;
  isMobile?: boolean;
};

const CampaignSidebar = ({ active = "promote", onNavigate: onNavigateCallback, isMobile = false }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const sections = [
    {
      title: "PROMOTION",
      items: [
        { label: "Promote Video", path: "/campaign", key: "promote", icon: Play },
        { label: "Promote Channel", path: "/campaign/channel", key: "channel", icon: Users },
        { label: "My Campaigns", path: "/campaign/my-campaigns", key: "campaigns", icon: LayoutGrid },
        { label: "Buy Packages", path: "/campaign/packages", key: "packages", icon: Package },
        { label: "Buy Bulk Views", path: "/campaign/bulk-views", key: "bulk", icon: Eye },
      ],
    },
    {
      title: "ACCOUNT",
      items: [
        { label: "Settings", path: "/profile", key: "settings", icon: Settings },
        { label: "Help & Support", path: "/contact", key: "support", icon: HelpCircle },
      ]
    }
  ];

  const handleNavigate = (path?: string) => {
    if (!path) return;
    router.push(path);
    if (onNavigateCallback) {
      onNavigateCallback();
    }
  };

  const checkIsActive = (item: typeof sections[0]["items"][0]) => {
    if (item.key && item.key === active) return true;
    if (!item.key && item.path === pathname) return true;
    return false;
  };

  return (
    <aside className={cn(
      "flex flex-col z-10 font-founders w-full",
      !isMobile && "h-full pt-0 pb-4"
    )}>
      <div className="flex-1 mt-0">
        {sections.map((section, sectionIndex) => (
          <div
            key={typeof section.title === 'string' ? section.title : sectionIndex}
            className="mb-8"
          >
            <div className="mb-5 px-6">
              <h3 className="text-[11px] text-[#8fa3b7] font-bold uppercase tracking-[0.08em]">
                {section.title}
              </h3>
            </div>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isItemSelected = checkIsActive(item);
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => handleNavigate(item.path)}
                      disabled={!item.path}
                      className={cn(
                        "w-[calc(100%-16px)] ml-3 text-left px-4 py-3 rounded-[14px] text-[16px] md:text-[17px] font-medium transition-all flex items-center gap-3.5 group relative mb-1",
                        item.path
                          ? isItemSelected
                            ? "text-[#c22143] font-bold bg-[#fae6e6] shadow-[inset_4.5px_0_0_0_#c22143]"
                            : "text-[#64748b] hover:text-[#0f172a] hover:bg-slate-50/80"
                          : "text-slate-300 cursor-not-allowed",
                      )}
                    >
                      <Icon className={cn(
                        "h-[19px] w-[19px] flex-shrink-0 transition-all duration-200",
                        isItemSelected ? "text-[#c22143]" : "text-[#94a3b8] group-hover:text-[#64748b]"
                      )} strokeWidth={isItemSelected ? 2.5 : 2} />
                      <span className="flex-1 tracking-tight">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>


  );
};

export default CampaignSidebar;

