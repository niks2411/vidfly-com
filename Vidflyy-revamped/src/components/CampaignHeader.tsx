import ChannelSelector from "./ChannelSelector";

type CampaignHeaderProps = {
  children?: React.ReactNode;
};

const CampaignHeader = ({ children }: CampaignHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 bg-slate-50 pb-4 -mx-4 px-4 lg:-mx-8 lg:px-8">
      <div className="flex items-center justify-between gap-4 py-4">
        <div className="flex-1">{children}</div>
        <div className="flex-shrink-0">
          <ChannelSelector />
        </div>
      </div>
    </div>
  );
};

export default CampaignHeader;

