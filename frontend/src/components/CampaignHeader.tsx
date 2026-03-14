import ChannelSelector from "./ChannelSelector";
import { Play } from "lucide-react";

type CampaignHeaderProps = {
  children?: React.ReactNode;
  verifiedEmail?: string;
  videoTitle?: string;
  stepNumber?: number;
  stepLabel?: string;
  showChannelSelector?: boolean;
};

const CampaignHeader = ({ 
  children, 
  verifiedEmail, 
  videoTitle, 
  stepNumber, 
  stepLabel,
  showChannelSelector = true 
}: CampaignHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-sm -mx-4 px-4 lg:-mx-8 lg:px-8 pb-2">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between py-2">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {verifiedEmail && (
            <div className="flex items-center gap-3 animate-slide-in-left">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg hover:scale-110 transition-transform duration-300">
                <Play className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                  Verified email
                </p>
                <p className="font-semibold text-sm text-slate-900 truncate max-w-[100px] sm:max-w-[200px]">
                  {verifiedEmail}
                </p>
              </div>
            </div>
          )}
          <div className="flex-1 space-y-1">
            {videoTitle && (
              <div>
                {stepNumber && stepLabel && (
                  <p className="text-[11px] text-slate-500 uppercase font-semibold tracking-wide mb-0.5">
                    Step {stepNumber} - {stepLabel}
                  </p>
                )}
                <h1 className="text-lg md:text-xl font-bold text-gray-800 leading-tight line-clamp-2">
                  {videoTitle}
                </h1>
              </div>
            )}
            {children}
          </div>
        </div>
        <div className="flex-shrink-0">
          {showChannelSelector && <ChannelSelector />}
        </div>
      </div>
    </div>
  );
};

export default CampaignHeader;

