import { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronDown, Plus, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import AddChannelModal from "./AddChannelModal";
import ManageChannelsModal from "./ManageChannelsModal";
import { getVerifiedEmail, getSelectedChannelKey } from "@/lib/verifiedEmail";

const STORAGE_KEY = "vidfly_channel_videos";
const CHANNEL_INFO_STORAGE_KEY = "vidfly_channel_info";
const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

type StoredVideo = {
  title: string;
  author?: string;
  videoId: string;
  thumbnail: string;
  link: string;
  channelId?: string | null;
  avatarUrl?: string | null;
};

type ChannelInfo = {
  channelId: string;
  name: string;
  avatar: string;
};

type ChannelSelectorProps = {
  onChannelSelect?: (channelId: string, channelName: string) => void;
};

const ChannelSelector = ({ onChannelSelect }: ChannelSelectorProps) => {
  const router = useRouter();
  const [storedVideos, setStoredVideos] = useState<StoredVideo[]>([]);
  const [channelInfoMap, setChannelInfoMap] = useState<Map<string, ChannelInfo>>(new Map());
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingChannels, setLoadingChannels] = useState<Set<string>>(new Set());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);

  // Load all channels from backend (PRIMARY SOURCE - cross-device sync)
  const loadAllChannels = useCallback(async () => {
    if (typeof window === "undefined") return;

    try {
      // Get email from localStorage (stored after login)
      const userEmail = localStorage.getItem("logged_user_email") || getVerifiedEmail();
      if (!userEmail) return;

      // Step 1: Load selected channel from localStorage (fast, instant UI)
      const channelKey = `channel_${userEmail}`;
      const savedChannelId = localStorage.getItem(channelKey);
      if (savedChannelId) {
        setSelectedChannelId(savedChannelId);
      } else {
        // Fallback: Use the channel from the current campaign video if available
        const currentVideoJSON = sessionStorage.getItem("vidfly_current_campaign_video");
        if (currentVideoJSON) {
          try {
            const currentVideo = JSON.parse(currentVideoJSON);
            if (currentVideo.channelId) {
              setSelectedChannelId(currentVideo.channelId);
              localStorage.setItem(channelKey, currentVideo.channelId);
            }
          } catch (e) { }
        }
      }

      // Step 2: Load ALL channels from backend (PRIMARY SOURCE - cross-device)
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/user-preferences/channels?email=${encodeURIComponent(userEmail)}`,
          { credentials: "include" }
        );

        if (response.ok) {
          const data = await response.json();

          // Update selected channel from backend
          if (data.selectedChannelId) {
            setSelectedChannelId(data.selectedChannelId);
            localStorage.setItem(channelKey, data.selectedChannelId);
          }

          // Load all channels DIRECTLY from backend - no YouTube API calls needed!
          if (data.channels && data.channels.length > 0) {
            const newChannelMap = new Map<string, ChannelInfo>();

            for (const ch of data.channels) {
              newChannelMap.set(ch.channelId, {
                channelId: ch.channelId,
                name: ch.channelName || "YouTube Channel",
                avatar: ch.channelAvatar || "",
              });
            }

            // Update channelInfoMap with all backend channels at once
            setChannelInfoMap(newChannelMap);


          }
        } else if (response.status === 401) {
          console.warn("Channel fetch returned 401 - user may need to re-verify email");
        }
      } catch (err) {
        console.warn("Failed to load channels from backend:", err);
        // Fallback: try to use cached sessionStorage data
        try {
          const cached = sessionStorage.getItem(CHANNEL_INFO_STORAGE_KEY);
          if (cached) {
            const parsedInfo = JSON.parse(cached);
            const fallbackMap = new Map<string, ChannelInfo>();
            parsedInfo.forEach((info: ChannelInfo) => {
              fallbackMap.set(info.channelId, info);
            });
            setChannelInfoMap(fallbackMap);
          }
        } catch (cacheErr) {
          console.error("Failed to load from cache:", cacheErr);
        }
      }
    } catch (err) {
      console.error("Failed to load channels", err);
    }
  }, []); // Remove channelInfoMap dependency to prevent infinite loops

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const parsed: StoredVideo[] = JSON.parse(
        sessionStorage.getItem(STORAGE_KEY) || "[]"
      );
      // Also check the current campaign video (from the budget page)
      const currentVideoJSON = sessionStorage.getItem("vidfly_current_campaign_video");
      if (currentVideoJSON) {
        try {
          const currentVideo: StoredVideo = JSON.parse(currentVideoJSON);
          if (currentVideo.channelId && !parsed.some(v => v.videoId === currentVideo.videoId)) {
            parsed.unshift(currentVideo);
          }
        } catch (err) {
          console.error("Failed to parse current campaign video", err);
        }
      }

      setStoredVideos(parsed);

      // Load cached channel info
      const cachedChannelInfo = sessionStorage.getItem(CHANNEL_INFO_STORAGE_KEY);
      if (cachedChannelInfo) {
        try {
          const parsedInfo: ChannelInfo[] = JSON.parse(cachedChannelInfo);
          const infoMap = new Map<string, ChannelInfo>();
          parsedInfo.forEach((info) => {
            infoMap.set(info.channelId, info);
          });
          setChannelInfoMap(infoMap);
        } catch (err) {
          console.error("Failed to parse cached channel info", err);
        }
      }
    } catch (err) {
      console.error("Failed to load stored videos", err);
    }
  }, []);

  // Load all channels from backend/localStorage on mount and when email changes
  useEffect(() => {
    loadAllChannels();
  }, [loadAllChannels]);

  // Listen for channelChanged events (when channel is updated from other components)
  useEffect(() => {
    const handleChannelChanged = (event: CustomEvent) => {
      const { channelId, channelName, channelAvatar } = event.detail;
      if (channelId) {
        setSelectedChannelId(channelId);
        // Save to localStorage for fast UI
        const userEmail = localStorage.getItem("logged_user_email") || getVerifiedEmail();
        if (userEmail) {
          const channelKey = `channel_${userEmail}`;
          localStorage.setItem(channelKey, channelId);
        }

        // If channel not in map, add it immediately for instant UI feedback
        if (!channelInfoMap.has(channelId) && channelName) {
          setChannelInfoMap((prev) => {
            const newMap = new Map(prev);
            newMap.set(channelId, {
              channelId,
              name: channelName,
              avatar: channelAvatar || "",
            });
            return newMap;
          });
        }

        // Then reload all channels from backend to get full data
        loadAllChannels();
      }
    };

    window.addEventListener('channelChanged', handleChannelChanged as EventListener);
    return () => {
      window.removeEventListener('channelChanged', handleChannelChanged as EventListener);
    };
  }, [channelInfoMap, loadAllChannels]);

  const fetchChannelInfo = useCallback(async (channelId: string, channelName: string) => {
    // Skip if already loading or already cached
    if (loadingChannels.has(channelId) || channelInfoMap.has(channelId)) {
      return;
    }

    setLoadingChannels((prev) => new Set(prev).add(channelId));

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/youtube/channel-info?channelId=${encodeURIComponent(channelId)}`,
        { credentials: "include" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch channel info");
      }

      const data = await response.json();
      const channelInfo: ChannelInfo = {
        channelId: data.channelId,
        name: data.name || channelName,
        avatar: data.avatar || "",
      };

      setChannelInfoMap((prev) => {
        const newMap = new Map(prev);
        newMap.set(channelId, channelInfo);

        // Cache in sessionStorage
        try {
          const cached = Array.from(newMap.values());
          sessionStorage.setItem(CHANNEL_INFO_STORAGE_KEY, JSON.stringify(cached));
        } catch (err) {
          console.error("Failed to cache channel info", err);
        }

        return newMap;
      });
    } catch (err) {
      console.error("Error fetching channel info:", err);
    } finally {
      setLoadingChannels((prev) => {
        const newSet = new Set(prev);
        newSet.delete(channelId);
        return newSet;
      });
    }
  }, [loadingChannels, channelInfoMap]);

  // Fetch channel info for channels that don't have cached info
  useEffect(() => {
    if (storedVideos.length === 0) return;

    const channelIdsToFetch = new Set<string>();
    storedVideos.forEach((video) => {
      if (video.channelId && video.author) {
        if (!channelInfoMap.has(video.channelId) && !loadingChannels.has(video.channelId)) {
          channelIdsToFetch.add(video.channelId);
        }
      }
    });

    channelIdsToFetch.forEach((channelId) => {
      const video = storedVideos.find((v) => v.channelId === channelId);
      if (video?.author) {
        fetchChannelInfo(channelId, video.author);
      }
    });
  }, [storedVideos, channelInfoMap, loadingChannels, fetchChannelInfo]);

  const availableChannels = useMemo(() => {
    const channelMap = new Map<string, { channelId: string; name: string; avatar: string }>();

    // Add channels from stored videos
    storedVideos.forEach((video) => {
      if (video.channelId && video.author) {
        if (!channelMap.has(video.channelId)) {
          const cachedInfo = channelInfoMap.get(video.channelId);
          channelMap.set(video.channelId, {
            channelId: video.channelId,
            name: cachedInfo?.name || video.author,
            avatar: cachedInfo?.avatar || video.avatarUrl || "",
          });
        }
      }
    });

    // Also include channels from channelInfoMap (saved channels from backend that may not be in storedVideos)
    channelInfoMap.forEach((info, channelId) => {
      if (!channelMap.has(channelId)) {
        channelMap.set(channelId, {
          channelId: info.channelId,
          name: info.name,
          avatar: info.avatar,
        });
      }
    });

    return Array.from(channelMap.values());
  }, [storedVideos, channelInfoMap]);

  const selectedChannel = useMemo(() => {
    return availableChannels.find((ch) => ch.channelId === selectedChannelId);
  }, [availableChannels, selectedChannelId]);

  // Listen for storage changes (when channel is changed in another tab) - GPT suggestion
  // This must be after availableChannels is defined
  useEffect(() => {
    if (typeof window === "undefined") return;

    const userEmail = localStorage.getItem("logged_user_email") || getVerifiedEmail();
    if (!userEmail) return;

    const channelKey = `channel_${userEmail}`;

    const handleStorageChange = (e: StorageEvent) => {
      // Check if the changed key is for the current email's selected channel
      if (e.key === channelKey && e.newValue) {
        setSelectedChannelId(e.newValue);
        // Trigger channel change event for other components
        const channel = availableChannels.find(ch => ch.channelId === e.newValue);
        if (channel) {
          window.dispatchEvent(new CustomEvent('channelChanged', {
            detail: { channelId: channel.channelId, channelName: channel.name }
          }));
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [availableChannels]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.channel-selector-container')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown]);

  const handleChannelClick = async (channelId: string, channelName: string) => {
    setSelectedChannelId(channelId);

    // Get email from localStorage (stored after login)
    const userEmail = localStorage.getItem("logged_user_email") || getVerifiedEmail();
    if (userEmail) {
      // Save to localStorage with email in key (fast, instant UI)
      const channelKey = `channel_${userEmail}`;
      localStorage.setItem(channelKey, channelId);

      // Save to backend (adds to channels list and sets as selected)
      try {
        // Get avatar from channelInfoMap if available
        const channelAvatar = channelInfoMap.get(channelId)?.avatar || '';

        await fetch(`${API_BASE_URL}/api/user-preferences/channels`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            channelId: channelId,
            channelName: channelName,
            channelAvatar: channelAvatar,
          }),
          credentials: "include",
        });
      } catch (err) {
        console.warn("Failed to save channel to backend:", err);
        // Don't block the user if backend save fails
      }
    }

    setShowDropdown(false);
    if (onChannelSelect) {
      onChannelSelect(channelId, channelName);
    }
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('channelChanged', { detail: { channelId, channelName } }));
  };

  const handleChannelAdded = async (channelInfo: ChannelInfo) => {
    // Add to channel info map
    setChannelInfoMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(channelInfo.channelId, channelInfo);

      // Cache in sessionStorage
      try {
        const cached = Array.from(newMap.values());
        sessionStorage.setItem(CHANNEL_INFO_STORAGE_KEY, JSON.stringify(cached));
      } catch (err) {
        console.error("Failed to cache channel info", err);
      }

      return newMap;
    });

    // Reload stored videos to include the new channel
    try {
      const parsed: StoredVideo[] = JSON.parse(
        sessionStorage.getItem(STORAGE_KEY) || "[]"
      );
      setStoredVideos(parsed);

      // Auto-select the newly added channel
      setSelectedChannelId(channelInfo.channelId);

      // Save to localStorage with email in key (fast, instant UI)
      const userEmail = localStorage.getItem("logged_user_email") || getVerifiedEmail();
      if (userEmail) {
        const channelKey = `channel_${userEmail}`;
        localStorage.setItem(channelKey, channelInfo.channelId);

        // Save to backend (adds to channels list and sets as selected)
        try {
          await fetch(`${API_BASE_URL}/api/user-preferences/channels`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: userEmail,
              channelId: channelInfo.channelId,
              channelName: channelInfo.name,
              channelAvatar: channelInfo.avatar || '',
            }),
            credentials: "include",
          });
        } catch (err) {
          console.warn("Failed to save channel to backend:", err);
          // Don't block the user if backend save fails
        }
      }

      if (onChannelSelect) {
        onChannelSelect(channelInfo.channelId, channelInfo.name);
      }
      // Trigger channel change event
      window.dispatchEvent(new CustomEvent('channelChanged', { detail: { channelId: channelInfo.channelId, channelName: channelInfo.name } }));
    } catch (err) {
      console.error("Failed to reload stored videos", err);
    }
  };

  return (
    <div className="channel-selector-container relative">
      <button
        type="button"
        onClick={() => {
          if (availableChannels.length === 0) {
            setShowAddModal(true);
          } else {
            setShowDropdown(!showDropdown);
          }
        }}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all duration-200 min-w-0 max-w-full"
      >
        {selectedChannel ? (
          <>
            {selectedChannel.avatar ? (
              <img
                src={selectedChannel.avatar}
                alt={selectedChannel.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">
                {selectedChannel.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-sm font-semibold text-slate-900 truncate min-w-0">
              {selectedChannel.name}
            </span>
            <a
              href={`https://www.youtube.com/channel/${selectedChannel.channelId}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src="https://www.youtube.com/img/desktop/yt_1200.png"
                alt="YouTube"
                className="w-4 h-4"
              />
            </a>
            {availableChannels.length > 0 && (
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            )}
          </>
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">
              {availableChannels.length === 0 ? <Plus className="h-4 w-4" /> : "?"}
            </div>
            <span className="text-sm text-slate-500">
              {availableChannels.length === 0 ? "Add channel" : "Select channel"}
            </span>
            {availableChannels.length > 0 && (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </>
        )}
      </button>

      {showDropdown && (
        <div className="absolute z-20 right-0 sm:right-0 mt-2 bg-white border-2 border-red-200 rounded-2xl shadow-2xl max-h-80 overflow-y-auto w-[calc(100vw-32px)] sm:min-w-[380px] sm:w-max animate-fade-in backdrop-blur-sm">
          <div className="p-3">
            {availableChannels.map((channel) => {
              const channelVideos = storedVideos.filter((v) => v.channelId === channel.channelId);
              const isLoading = loadingChannels.has(channel.channelId);

              return (
                <button
                  key={channel.channelId}
                  type="button"
                  onClick={() => handleChannelClick(channel.channelId, channel.name)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-200 text-left mb-1 ${selectedChannelId === channel.channelId ? 'bg-gradient-to-r from-red-50 to-red-100 border border-red-200' : ''
                    }`}
                >
                  {channel.avatar ? (
                    <img
                      src={channel.avatar}
                      alt={channel.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-red-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-md">
                      {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        channel.name.charAt(0).toUpperCase()
                      )}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{channel.name}</p>
                  </div>
                  {selectedChannelId === channel.channelId && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-md flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                </button>
              );
            })}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(false);
                setTimeout(() => setShowAddModal(true), 100);
              }}
              className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-200 text-left border-2 border-dashed border-red-200 bg-red-50/30 mt-2"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                <Plus className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-red-600">Add another channel</p>
                <p className="text-xs text-slate-500">Add a new YouTube channel</p>
              </div>
            </button>

            {availableChannels.length > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(false);
                  setTimeout(() => setShowManageModal(true), 100);
                }}
                className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 transition-all duration-200 text-left border-t-2 border-slate-200 mt-2"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                  <Settings className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-700">Manage Channels</p>
                  <p className="text-xs text-slate-500">Remove channels you no longer need</p>
                </div>
              </button>
            )}
          </div>
        </div>
      )}

      <AddChannelModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onChannelAdded={handleChannelAdded}
      />

      <ManageChannelsModal
        isOpen={showManageModal}
        onClose={() => setShowManageModal(false)}
        onChannelRemoved={() => {
          // Reload channels and videos
          try {
            const parsed: StoredVideo[] = JSON.parse(
              sessionStorage.getItem(STORAGE_KEY) || "[]"
            );
            setStoredVideos(parsed);

            const cachedChannelInfo = sessionStorage.getItem(CHANNEL_INFO_STORAGE_KEY);
            if (cachedChannelInfo) {
              const parsedInfo: ChannelInfo[] = JSON.parse(cachedChannelInfo);
              const infoMap = new Map<string, ChannelInfo>();
              parsedInfo.forEach((info) => {
                infoMap.set(info.channelId, info);
              });
              setChannelInfoMap(infoMap);
            }

            // Check if selected channel still exists
            const channelKey = getSelectedChannelKey();
            const currentSelected = localStorage.getItem(channelKey);
            if (currentSelected) {
              const stillExists = parsed.some((v) => v.channelId === currentSelected);
              if (!stillExists) {
                localStorage.removeItem(channelKey);
                setSelectedChannelId(null);
                // Select first available channel
                const firstChannel = parsed.find((v) => v.channelId);
                if (firstChannel?.channelId) {
                  setSelectedChannelId(firstChannel.channelId);
                  localStorage.setItem(channelKey, firstChannel.channelId);
                }
              }
            }
          } catch (err) {
            console.error("Failed to reload after channel removal", err);
          }
        }}
      />
    </div>
  );
};

export default ChannelSelector;


