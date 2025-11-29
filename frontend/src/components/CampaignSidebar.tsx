import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import ChannelSelector from "./ChannelSelector";

export type CampaignSidebarKey =
  | "promote"
  | "channel"
  | "packages"
  | "bulk"
  | "free"
  | "budget";

type SidebarProps = {
  active?: CampaignSidebarKey;
  onNavigate?: () => void;
  isMobile?: boolean;
};

const CampaignSidebar = ({ active = "promote", onNavigate: onNavigateCallback, isMobile = false }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const sections = [
    {
      title: "Promotion",
        items: [
          { label: "Promote Video / Short", path: "/campaign", key: "promote" },
          { label: "Promote Channel", path: "/campaign/channel", key: "channel" },
          { label: "My Campaigns", path: "/campaign/my-campaigns" },
          // { label: "Manage Channels", path: "/campaign/manage", key: "manage" },
          { label: "Buy Packages", path: "/campaign/packages", key: "packages" },
          { label: "Buy Bulk Views", path: "/campaign/bulk-views", key: "bulk" },
          { label: "Free Views", path: "/campaign/free-views", key: "free" },
        ],
    },
    {
      title: "Strategy Path",
      description: "Jump between critical campaign steps.",
      items: [
        { label: "Enter Link", path: "/campaign" },
        { label: "Select Videos", path: "/campaign" },
        { label: "Budget & Targeting", path: "/campaign/budget", key: "budget" },
        { label: "Payment", path: "/campaign/payment" },
      ],
    },
  ];

  const handleNavigate = (path?: string) => {
    if (!path) return;
    navigate(path);
    // Call the callback to close mobile menu if provided
    if (onNavigateCallback) {
      onNavigateCallback();
    }
  };

  return (
    <aside className={cn(
      "lg:w-64 bg-white h-fit lg:sticky lg:top-6 self-start",
      isMobile ? "w-full" : "rounded-3xl shadow-md p-6"
    )}>
      {sections.map((section) => (
        <div 
          key={section.title} 
          className={cn(
            "mb-8 last:mb-0",
            section.title === "Strategy Path" && "hidden lg:block"
          )}
        >
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide">
              {section.title}
            </p>
            {section.description && (
              <p className="text-xs text-slate-400 mt-1">{section.description}</p>
            )}
          </div>
          <ul className="mt-4 space-y-2">
            {section.items.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => handleNavigate(item.path)}
                  disabled={!item.path}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-colors",
                    item.path
                      ? "hover:bg-slate-100 text-slate-500"
                      : "text-slate-300 cursor-not-allowed",
                    (item.key && item.key === active) ||
                      (!item.key && item.path === location.pathname)
                      ? "bg-red-100 text-red-700"
                      : null
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default CampaignSidebar;

