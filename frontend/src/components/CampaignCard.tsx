import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CampaignCardProps = {
  children: ReactNode;
  className?: string;
  accent?: "default" | "subtle";
};

const baseClass =
  "bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-4 md:p-5 animate-fade-in transition-all duration-300";

const accentMap: Record<NonNullable<CampaignCardProps["accent"]>, string> = {
  default: "",
  subtle: "bg-white/70 border-white/20 shadow-lg",
};

const CampaignCard = ({
  children,
  className,
  accent = "default",
}: CampaignCardProps) => {
  return <section className={cn(baseClass, accentMap[accent], className)}>{children}</section>;
};

export default CampaignCard;

