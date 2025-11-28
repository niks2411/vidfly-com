import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 animate-scale-in">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img
                src="https://www.youtube.com/img/desktop/yt_1200.png"
                alt="YouTube"
                className="w-8 h-8"
              />
              <h2 className="text-2xl font-bold text-slate-900">Add YouTube Channel</h2>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <img
                  src="https://www.youtube.com/img/desktop/yt_1200.png"
                  alt="YouTube"
                  className="w-5 h-5"
                />
              </div>
              <Input
                type="text"
                placeholder="Search With Your Channel Name or Paste Channel Link"
                value={channelInput}
                onChange={(e) => {
                  setChannelInput(e.target.value);
                  setError("");
                }}
                className="pl-12 pr-12 py-6 border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-2xl text-base"
                disabled={loading}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <ArrowRight className="h-5 w-5 text-slate-400" />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200 text-sm text-red-600">
                <p className="font-semibold mb-1">Unable to add channel</p>
                <p className="whitespace-pre-line">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 rounded-2xl border-slate-200 hover:bg-slate-50"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold shadow-lg hover:shadow-xl disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Channel"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChannelModal;

