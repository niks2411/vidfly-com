import { useState, useEffect } from "react";
import { X, Trash2 } from "lucide-react";
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
                avatar: "", // Backend doesn't store avatar, will be loaded from cache or API
              }));

              // Try to get avatars from cached info
              const cachedInfo = sessionStorage.getItem(CHANNEL_INFO_STORAGE_KEY);
              if (cachedInfo) {
                const parsed: ChannelInfo[] = JSON.parse(cachedInfo);
                const cachedMap = new Map(parsed.map(c => [c.channelId, c]));
                channelInfos.forEach(ch => {
                  const cached = cachedMap.get(ch.channelId);
                  if (cached) {
                    ch.avatar = cached.avatar;
                    ch.name = cached.name || ch.name; // Prefer cached name if available
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
          // Continue with local removal even if backend fails
        }
      } catch (err) {
        console.warn("Error removing channel from backend:", err);
        // Continue with local removal even if backend fails
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col animate-scale-in">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Manage Channels</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            Remove channels you no longer need. This will also remove all videos from those channels.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {channels.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="text-lg font-semibold mb-2">No channels added yet</p>
              <p className="text-sm">Add channels using the channel selector dropdown</p>
            </div>
          ) : (
            <div className="space-y-3">
              {channels.map((channel) => {
                const storedVideos = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
                const videoCount = storedVideos.filter((v: any) => v.channelId === channel.channelId).length;

                return (
                  <div
                    key={channel.channelId}
                    className="flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-purple-300 bg-white hover:bg-purple-50/30 transition-all duration-200"
                  >
                    {channel.avatar ? (
                      <img
                        src={channel.avatar}
                        alt={channel.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-purple-200 shadow-sm"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {channel.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-bold text-slate-900 truncate">{channel.name}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {videoCount} video{videoCount !== 1 ? 's' : ''} stored
                      </p>
                      <a
                        href={`https://www.youtube.com/channel/${channel.channelId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-purple-600 hover:text-purple-700 font-semibold mt-1 inline-flex items-center gap-1"
                      >
                        View on YouTube →
                      </a>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveChannel(channel.channelId)}
                      disabled={deleting === channel.channelId}
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                    >
                      {deleting === channel.channelId ? (
                        <span className="text-xs">Removing...</span>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-200">
          <Button
            onClick={onClose}
            className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold shadow-lg hover:shadow-xl"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageChannelsModal;

