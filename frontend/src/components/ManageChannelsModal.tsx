import { useState, useEffect } from "react";
import { X, Trash2, Youtube, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSelectedChannelKey, getVerifiedEmail } from "@/lib/verifiedEmail";

const STORAGE_KEY = "vidfly_channel_videos";
const CHANNEL_INFO_STORAGE_KEY = "vidfly_channel_info";
const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

type ChannelInfo = {
  channelId: string;
  name: string;
  avatar: string;
};

type ManageChannelsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onChannelRemoved: () => void;
};

const ManageChannelsModal = ({ isOpen, onClose, onChannelRemoved }: ManageChannelsModalProps) => {
  const [channels, setChannels] = useState<ChannelInfo[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadChannels();
    }
  }, [isOpen]);

  const loadChannels = async () => {
    try {
      // First try to load from backend
      const userEmail = localStorage.getItem("logged_user_email") || getVerifiedEmail();
      if (userEmail) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/user-preferences/channels?email=${encodeURIComponent(userEmail)}`,
            { credentials: "include" }
          );
          if (response.ok) {
            const data = await response.json();
            if (data.channels && data.channels.length > 0) {
              // Convert backend format to ChannelInfo format
              const channelInfos: ChannelInfo[] = data.channels.map((ch: any) => ({
                channelId: ch.channelId,
                name: ch.channelName || "Channel",
                avatar: ch.channelAvatar || "", // Use avatar from backend if available
              }));

              // Try to get avatars from cached info if backend doesn't have them
              const cachedInfo = sessionStorage.getItem(CHANNEL_INFO_STORAGE_KEY);
              if (cachedInfo) {
                const parsed: ChannelInfo[] = JSON.parse(cachedInfo);
                const cachedMap = new Map(parsed.map(c => [c.channelId, c]));
                channelInfos.forEach(ch => {
                  const cached = cachedMap.get(ch.channelId);
                  if (cached && !ch.avatar) {
                    ch.avatar = cached.avatar;
                    ch.name = cached.name || ch.name;
                  }
                });
              }

              setChannels(channelInfos);
              return;
            }
          }
        } catch (err) {
          console.warn("Failed to load channels from backend:", err);
        }
      }

      // Fallback to sessionStorage
      const cachedInfo = sessionStorage.getItem(CHANNEL_INFO_STORAGE_KEY);
      if (cachedInfo) {
        const parsed: ChannelInfo[] = JSON.parse(cachedInfo);
        setChannels(parsed);
      }
    } catch (err) {
      console.error("Failed to load channels", err);
    }
  };

  const handleRemoveChannel = async (channelId: string) => {
    if (!confirm(`Are you sure you want to remove this channel? This will also remove all videos from this channel.`)) {
      return;
    }

    setDeleting(channelId);

    try {
      // Get user email
      const userEmail = localStorage.getItem("logged_user_email") || getVerifiedEmail();
      if (!userEmail) {
        throw new Error("User email not found");
      }

      // Remove from backend first
      try {
        const response = await fetch(`${API_BASE_URL}/api/user-preferences/channels`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            channelId: channelId,
          }),
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.warn("Failed to remove channel from backend:", errorData.message || "Unknown error");
        }
      } catch (err) {
        console.warn("Error removing channel from backend:", err);
      }

      // Remove from stored videos
      const storedVideos = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
      const filteredVideos = storedVideos.filter((v: any) => v.channelId !== channelId);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filteredVideos));

      // Remove from channel info cache
      const cachedInfo = JSON.parse(sessionStorage.getItem(CHANNEL_INFO_STORAGE_KEY) || "[]");
      const filteredChannels = cachedInfo.filter((c: ChannelInfo) => c.channelId !== channelId);
      sessionStorage.setItem(CHANNEL_INFO_STORAGE_KEY, JSON.stringify(filteredChannels));

      // If this was the selected channel, clear selection (per email)
      const channelKey = getSelectedChannelKey();
      const selectedChannelId = localStorage.getItem(channelKey);
      if (selectedChannelId === channelId) {
        localStorage.removeItem(channelKey);
        // Select first remaining channel if any
        if (filteredChannels.length > 0) {
          const firstChannel = filteredChannels[0];
          localStorage.setItem(channelKey, firstChannel.channelId);
        }
      }

      // Update state
      setChannels(filteredChannels);
      onChannelRemoved();
    } catch (err) {
      console.error("Failed to remove channel", err);
      alert("Failed to remove channel. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-fade-in px-4">
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-in border border-slate-200">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-founders tracking-tight">Connected Channels</h2>
            <p className="text-[13px] text-slate-500 mt-1 font-medium">
              Manage your linked YouTube accounts and properties.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all flex-shrink-0"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {channels.length === 0 ? (
            <div className="text-center py-16 px-8 rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/30">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Youtube className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-lg font-bold text-slate-900 mb-2">No channels connected</p>
              <p className="text-sm text-slate-500 max-w-[240px] mx-auto">
                Connect your YouTube channel to start promoting your content.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {channels.map((channel) => {
                const storedVideos = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
                const videoCount = storedVideos.filter((v: any) => v.channelId === channel.channelId).length;

                return (
                  <div
                    key={channel.channelId}
                    className="group flex items-center gap-5 p-5 rounded-2xl border-2 border-slate-100 hover:border-red-100 bg-white hover:bg-red-50/10 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <div className="relative shrink-0">
                        {channel.avatar ? (
                        <img
                            src={channel.avatar}
                            alt={channel.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md ring-1 ring-slate-100"
                        />
                        ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {channel.name.charAt(0).toUpperCase()}
                        </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-red-600 border-2 border-white flex items-center justify-center">
                            <Youtube className="w-3.5 h-3.5 text-white" />
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-slate-900 truncate">{channel.name}</p>
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-[10px] font-black text-green-700 uppercase tracking-tighter shrink-0">
                            Active
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 underline-offset-4 decoration-slate-200">
                          <p className="text-[12px] text-slate-500 font-medium">
                            {videoCount} cached promotional video{videoCount !== 1 ? 's' : ''}
                          </p>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <a
                            href={`https://www.youtube.com/channel/${channel.channelId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[12px] text-red-600 hover:text-red-700 font-bold flex items-center gap-1 group/link"
                          >
                            Explore Channel <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                          </a>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveChannel(channel.channelId)}
                      disabled={deleting === channel.channelId}
                      className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl px-4 py-6 transition-all border border-transparent hover:border-red-100 font-bold shrink-0"
                    >
                      {deleting === channel.channelId ? (
                        <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                            <Trash2 className="h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-8 bg-slate-50/80 border-t border-slate-100 flex gap-4">
          <Button
            onClick={onClose}
            className="flex-1 rounded-[20px] py-7 bg-white hover:bg-slate-100 text-slate-900 font-bold border border-slate-200 shadow-sm transition-all"
          >
            Close Settings
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 rounded-[20px] py-7 bg-red-600 hover:bg-red-700 text-white font-bold shadow-xl shadow-red-500/20 active:scale-95 transition-all"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageChannelsModal;

