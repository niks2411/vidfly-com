"use client";

import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Play, Users, Grid3x3, Package, ShoppingCart, Gift, ChevronRight } from "lucide-react";

export type CampaignSidebarKey =
  | "promote"
  | "channel"
  | "packages"
  | "bulk"
  | "free"
  | "budget"
  | "payment"
  | "campaigns";

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
        { label: "Promote Video / Short", path: "/campaign", key: "promote", icon: Play },
        { label: "Promote Channel", path: "/campaign/channel", key: "channel", icon: Users },
        { label: "My Campaigns", path: "/campaign/my-campaigns", key: "campaigns", icon: Grid3x3 },
        { label: "Buy Packages", path: "/campaign/packages", key: "packages", icon: Package },
        { label: "Buy Bulk Views", path: "/campaign/bulk-views", key: "bulk", icon: ShoppingCart },
        { label: "Free Views", path: "/campaign/free-views", key: "free", icon: Gift },
      ],
    },
    {
      title: "STRATEGY PATH",
      description: "Jump between critical campaign steps.",
      items: [
        { label: "Enter Link", path: "/campaign", icon: ChevronRight },
        { label: "Select Videos", path: "/campaign", icon: ChevronRight },
        { label: "Budget & Targeting", path: "/campaign/budget", key: "budget", icon: ChevronRight },
        { label: "Payment", path: "/campaign/payment", icon: ChevronRight },
      ],
    },
  ];

  const handleNavigate = (path?: string) => {
    if (!path) return;
    router.push(path);
    // Call the callback to close mobile menu if provided
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
      "lg:w-64 bg-white h-full lg:sticky lg:top-[108px] lg:h-[calc(100vh-108px)] lg:overflow-y-auto custom-scrollbar",
      isMobile ? "w-full" : "p-6"
    )}>
      {sections.map((section, sectionIndex) => (
        <div
          key={section.title}
          className={cn(
            sectionIndex === 0 ? "mb-6" : "mb-8",
            section.title === "STRATEGY PATH" && "hidden lg:block"
          )}
        >
          <div className="mb-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">
              {section.title}
            </p>
            {section.description && (
              <p className="text-xs text-slate-400 mt-1">{section.description}</p>
            )}
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
                      "w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3",
                      item.path
                        ? isItemSelected
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : "hover:bg-slate-50 text-slate-600"
                        : "text-slate-300 cursor-not-allowed",
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isItemSelected ? "text-red-700" : "text-slate-500"
                    )} />
                    <span className="flex-1">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          {sectionIndex === 0 && (
            <div className="border-t border-slate-200 mt-6 pt-6"></div>
          )}
        </div>
      ))}
    </aside>
  );
};

export default CampaignSidebar;

