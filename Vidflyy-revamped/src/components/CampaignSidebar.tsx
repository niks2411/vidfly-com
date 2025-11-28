import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import ChannelSelector from "./ChannelSelector";

type SidebarProps = {
  active?: "promote" | "budget";
};

const CampaignSidebar = ({ active = "promote" }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const sections = [
    {
      title: "Promotion",
        items: [
          { label: "Promote Video / Short", path: "/campaign", key: "promote" },
          { label: "Promote Channel", path: "/campaign/channel" },
          { label: "My Campaigns", path: "/campaign/my-campaigns" },
          // { label: "Manage Channels", path: "/campaign/manage" },
          { label: "Buy Packages", path: "/campaign/packages" },
          { label: "Buy Bulk Views", path: "/campaign/bulk-views" },
          { label: "Free Views", path: "/campaign/free-views" },
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
  };

  return (
    <aside className="lg:w-64 bg-white rounded-3xl shadow-md p-6 h-fit lg:sticky lg:top-6 self-start">
      {sections.map((section) => (
        <div key={section.title} className="mb-8 last:mb-0">
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
                      ? "bg-purple-100 text-purple-700"
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

