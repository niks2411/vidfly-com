import { useState } from "react";
import { X, ArrowRight, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

type AddChannelModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onChannelAdded: (channelInfo: { channelId: string; name: string; avatar: string }) => void;
};

const AddChannelModal = ({ isOpen, onClose, onChannelAdded }: AddChannelModalProps) => {
  const [channelInput, setChannelInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelInput.trim()) {
      setError("Please enter a channel name or link");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Normalize input - add https:// if missing
      let normalizedInput = channelInput.trim();
      let isPlainName = false;

      if (!normalizedInput.startsWith("http://") && !normalizedInput.startsWith("https://")) {
        // If it looks like a URL path, add https://
        if (normalizedInput.includes("youtube.com") || normalizedInput.includes("youtu.be")) {
          normalizedInput = `https://${normalizedInput}`;
        } else if (normalizedInput.startsWith("@")) {
          // Handle @username format
          normalizedInput = `https://www.youtube.com/${normalizedInput}`;
        } else if (normalizedInput.startsWith("UC") && normalizedInput.length >= 24) {
          // Likely a channel ID (starts with UC and is long)
          // Keep as is, will be handled below
        } else {
          // It's likely a plain channel name - mark it and convert to @username format
          isPlainName = true;
          // Remove spaces and special characters, keep only alphanumeric, underscores, and hyphens
          const cleanName = normalizedInput.replace(/^@/, "").replace(/\s+/g, "").replace(/[^a-zA-Z0-9_-]/g, "");
          if (cleanName && cleanName.length > 0) {
            normalizedInput = `https://www.youtube.com/@${cleanName}`;
          } else {
            throw new Error(`Invalid channel name "${channelInput}". Please enter a valid channel name, @username, or channel URL.`);
          }
        }
      }

      // Check if it's a video URL - if so, extract channel info from video
      const isVideoUrl = normalizedInput.includes("youtube.com/watch") || normalizedInput.includes("youtu.be");
      const isChannelUrl = normalizedInput.includes("youtube.com/channel/") ||
        normalizedInput.includes("youtube.com/@") ||
        normalizedInput.includes("youtube.com/c/") ||
        normalizedInput.includes("youtube.com/user/");

      let channelInfo;

      if (isVideoUrl) {
        // Fetch video info first to get channelId
        const videoResponse = await fetch(`${API_BASE_URL}/api/youtube/info`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: normalizedInput }),
          credentials: "include",
        });

        if (!videoResponse.ok) {
          const errorData = await videoResponse.json().catch(() => ({}));
          throw new Error(errorData?.message || "Could not fetch video information");
        }

        const videoData = await videoResponse.json();
        if (!videoData.channelId) {
          throw new Error("Could not extract channel ID from video");
        }

        // Now fetch channel info using the channelId
        const channelResponse = await fetch(
          `${API_BASE_URL}/api/youtube/channel-info?channelId=${encodeURIComponent(videoData.channelId)}`,
          { credentials: "include" }
        );

        if (!channelResponse.ok) {
          const errorData = await channelResponse.json().catch(() => ({}));
          throw new Error(errorData?.message || "Could not fetch channel information");
        }

        channelInfo = await channelResponse.json();
      } else if (isChannelUrl) {
        // Extract channel ID from channel URL
        let channelId = null;

        // Handle different channel URL formats
        const channelMatch = normalizedInput.match(/youtube\.com\/channel\/([^/?]+)/);
        if (channelMatch) {
          channelId = channelMatch[1];
        }

        if (channelId) {
          // Direct channel ID - fetch channel info
          const channelResponse = await fetch(
            `${API_BASE_URL}/api/youtube/channel-info?channelId=${encodeURIComponent(channelId)}`,
            { credentials: "include" }
          );

          if (!channelResponse.ok) {
            const errorData = await channelResponse.json().catch(() => ({}));
            throw new Error(errorData?.message || "Could not fetch channel information");
          }

          channelInfo = await channelResponse.json();
        } else {
          // For @username or /c/ or /user/ formats, use videoUrl approach
          // The backend will search for the channel
          const channelResponse = await fetch(
            `${API_BASE_URL}/api/youtube/channel-info?videoUrl=${encodeURIComponent(normalizedInput)}`,
            { credentials: "include" }
          );

          if (!channelResponse.ok) {
            const errorData = await channelResponse.json().catch(() => ({}));
            const errorMessage = errorData?.message || "Could not find channel";

            // Provide helpful error message
            if (normalizedInput.includes('@')) {
              throw new Error(`${errorMessage}. Please try:\n• Entering a video URL from this channel\n• Using the full channel URL: youtube.com/channel/CHANNEL_ID\n• Verifying the @username is correct`);
            } else {
              throw new Error(`${errorMessage}. Please try entering a video URL from this channel, or use the full channel URL format: youtube.com/channel/CHANNEL_ID`);
            }
          }

          channelInfo = await channelResponse.json();

          // Verify we got valid channel info
          if (!channelInfo || !channelInfo.channelId) {
            throw new Error("Could not retrieve channel information. Please try entering a video URL from this channel instead.");
          }
        }
      } else {
        // Try treating it as a channel ID first
        if (normalizedInput.startsWith("UC") && normalizedInput.length >= 24) {
          // Likely a channel ID
          const channelResponse = await fetch(
            `${API_BASE_URL}/api/youtube/channel-info?channelId=${encodeURIComponent(normalizedInput)}`,
            { credentials: "include" }
          );

          if (channelResponse.ok) {
            channelInfo = await channelResponse.json();
          } else {
            const errorData = await channelResponse.json().catch(() => ({}));
            throw new Error(errorData?.message || "Invalid channel ID. Please enter a valid YouTube channel URL or video URL");
          }
        } else {
          // This should not happen if normalization worked correctly, but handle it anyway
          // Try as videoUrl - backend will search for the channel
          const channelResponse = await fetch(
            `${API_BASE_URL}/api/youtube/channel-info?videoUrl=${encodeURIComponent(normalizedInput)}`,
            { credentials: "include" }
          );

          if (!channelResponse.ok) {
            const errorData = await channelResponse.json().catch(() => ({}));
            const errorMessage = errorData?.message || "Could not find channel";

            // If that fails and it was a name, provide helpful suggestions
            if (isPlainName || (!normalizedInput.includes("youtube.com") && !normalizedInput.includes("youtu.be"))) {
              throw new Error(`Could not find channel "${channelInput}". Please try:\n• A video URL from this channel (e.g., youtube.com/watch?v=...)\n• Full channel URL: youtube.com/@username or youtube.com/channel/ID\n• Channel ID (starts with UC)\n• Make sure the channel name or @username is spelled correctly`);
            }

            throw new Error(`${errorMessage}. Please enter a valid YouTube video URL, channel URL (youtube.com/channel/ID or youtube.com/@username), or channel ID`);
          }

          channelInfo = await channelResponse.json();

          // Verify we got valid channel info
          if (!channelInfo || !channelInfo.channelId) {
            throw new Error("Could not retrieve channel information. Please try entering a video URL from this channel instead.");
          }
        }
      }

      if (!channelInfo.channelId) {
        throw new Error("Invalid channel information received");
      }

      // Add a placeholder video to sessionStorage so the channel appears
      const STORAGE_KEY = "vidfly_channel_videos";
      const existing: any[] = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");

      // Check if channel already exists
      const channelExists = existing.some((v) => v.channelId === channelInfo.channelId);
      if (!channelExists) {
        const placeholderVideo = {
          title: `Video from ${channelInfo.name}`,
          author: channelInfo.name,
          videoId: `placeholder_${channelInfo.channelId}`,
          thumbnail: channelInfo.avatar || "",
          link: `https://www.youtube.com/channel/${channelInfo.channelId}`,
          channelId: channelInfo.channelId,
        };
        existing.unshift(placeholderVideo);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      }

      // Cache channel info
      const CHANNEL_INFO_STORAGE_KEY = "vidfly_channel_info";
      const cachedInfo: any[] = JSON.parse(sessionStorage.getItem(CHANNEL_INFO_STORAGE_KEY) || "[]");
      const channelInfoToCache = {
        channelId: channelInfo.channelId,
        name: channelInfo.name,
        avatar: channelInfo.avatar || "",
      };

      const existingChannelIndex = cachedInfo.findIndex((c) => c.channelId === channelInfo.channelId);
      if (existingChannelIndex >= 0) {
        cachedInfo[existingChannelIndex] = channelInfoToCache;
      } else {
        cachedInfo.push(channelInfoToCache);
      }
      sessionStorage.setItem(CHANNEL_INFO_STORAGE_KEY, JSON.stringify(cachedInfo));

      // Notify parent component
      onChannelAdded(channelInfoToCache);

      // Reset and close
      setChannelInput("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add channel");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-fade-in px-4">
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        <div className="bg-gradient-to-br from-red-600 to-red-700 p-8 text-white relative overflow-hidden text-center">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/30">
                <Youtube className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-founders tracking-tight">Add YouTube Channel</h2>
                <p className="text-red-100 text-sm font-medium opacity-90">Enter details to connect your channel</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-all"
            >
              <X className="h-5 w-5" />
            </button>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-1">
                    Channel Search
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Channel Name, @handle or Link"
                    value={channelInput}
                    onChange={(e) => {
                      setChannelInput(e.target.value);
                      setError("");
                    }}
                    className="pl-12 pr-12 py-7 border-2 border-slate-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 rounded-[20px] text-[15px] font-semibold transition-all shadow-sm"
                    disabled={loading}
                    autoFocus
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <ArrowRight className="h-5 w-5 text-slate-300" />
                    )}
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 pl-4">Example: @MrBeast or youtube.com/c/vidfly</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-red-50 border border-red-100 text-[13px] text-red-600 flex gap-3"
              >
                <div className="shrink-0 pt-0.5">⚠️</div>
                <div className="space-y-1">
                    <p className="font-bold underline">Error adding channel</p>
                    <p className="leading-relaxed opacity-90">{error}</p>
                </div>
              </motion.div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="flex-1 rounded-2xl py-6 hover:bg-slate-50 text-slate-500 font-bold"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-[1.5] rounded-2xl py-6 bg-red-600 hover:bg-red-700 text-white font-bold shadow-xl shadow-red-500/20 active:scale-95 transition-all disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Discovering..." : "Connect Channel"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChannelModal;

