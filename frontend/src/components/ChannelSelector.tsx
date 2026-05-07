import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { ChevronDown, Plus, Settings, Check, ExternalLink, Youtube } from "lucide-react";
import { useRouter } from "next/navigation";
import AddChannelModal from "./AddChannelModal";
import ManageChannelsModal from "./ManageChannelsModal";
import { getVerifiedEmail, getSelectedChannelKey } from "@/lib/verifiedEmail";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [storedVideos, setStoredVideos] = useState<StoredVideo[]>([]);
  const [channelInfoMap, setChannelInfoMap] = useState<Map<string, ChannelInfo>>(new Map());
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingChannels, setLoadingChannels] = useState<Set<string>>(new Set());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const lastLoadedEmailRef = useRef<string | null>(null);

  // Load all channels from backend (PRIMARY SOURCE - cross-device sync)
  const loadAllChannels = useCallback(async (force = false) => {
    if (typeof window === "undefined") return;

    try {
      // Get email from localStorage (stored after login)
      const userEmail = localStorage.getItem("logged_user_email") || getVerifiedEmail();
      if (!userEmail) return;

      // Prevent redundant loads for the same email unless forced
      if (!force && lastLoadedEmailRef.current === userEmail) {
        return;
      }
      lastLoadedEmailRef.current = userEmail;

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
  }, [user?.email]);

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

  useEffect(() => {
    loadAllChannels();
  }, [loadAllChannels]);

  // Listen for channelChanged events
  useEffect(() => {
    const handleChannelChanged = (event: CustomEvent) => {
      const { channelId, channelName, channelAvatar } = event.detail;
      if (channelId) {
        setSelectedChannelId(channelId);
        const userEmail = localStorage.getItem("logged_user_email") || getVerifiedEmail();
        if (userEmail) {
          const channelKey = `channel_${userEmail}`;
          localStorage.setItem(channelKey, channelId);
        }

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
        loadAllChannels(true); // Force reload when channel explicitly changed
      }
    };

    window.addEventListener('channelChanged', handleChannelChanged as EventListener);
    return () => {
      window.removeEventListener('channelChanged', handleChannelChanged as EventListener);
    };
  }, [channelInfoMap, loadAllChannels]);

  const fetchChannelInfo = useCallback(async (channelId: string, channelName: string) => {
    if (loadingChannels.has(channelId) || channelInfoMap.has(channelId)) return;

    setLoadingChannels((prev) => new Set(prev).add(channelId));

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/youtube/channel-info?channelId=${encodeURIComponent(channelId)}`,
        { credentials: "include" }
      );

      if (!response.ok) throw new Error("Failed to fetch channel info");

      const data = await response.json();
      const channelInfo: ChannelInfo = {
        channelId: data.channelId,
        name: data.name || channelName,
        avatar: data.avatar || "",
      };

      setChannelInfoMap((prev) => {
        const newMap = new Map(prev);
        newMap.set(channelId, channelInfo);
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
    const channelMap = new Map<string, ChannelInfo>();
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const userEmail = localStorage.getItem("logged_user_email") || getVerifiedEmail();
    if (!userEmail) return;
    const channelKey = `channel_${userEmail}`;
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === channelKey && e.newValue) {
        setSelectedChannelId(e.newValue);
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
    const userEmail = localStorage.getItem("logged_user_email") || getVerifiedEmail();
    if (userEmail) {
      const channelKey = `channel_${userEmail}`;
      localStorage.setItem(channelKey, channelId);
      try {
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
      }
    }

    setShowDropdown(false);
    setIsDrawerOpen(false);
    if (onChannelSelect) {
      onChannelSelect(channelId, channelName);
    }
    window.dispatchEvent(new CustomEvent('channelChanged', { detail: { channelId, channelName } }));
  };

  const handleChannelAdded = async (channelInfo: ChannelInfo) => {
    setChannelInfoMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(channelInfo.channelId, channelInfo);
      try {
        const cached = Array.from(newMap.values());
        sessionStorage.setItem(CHANNEL_INFO_STORAGE_KEY, JSON.stringify(cached));
      } catch (err) {
        console.error("Failed to cache channel info", err);
      }
      return newMap;
    });

    try {
      const parsed: StoredVideo[] = JSON.parse(
        sessionStorage.getItem(STORAGE_KEY) || "[]"
      );
      setStoredVideos(parsed);
      setSelectedChannelId(channelInfo.channelId);
      const userEmail = localStorage.getItem("logged_user_email") || getVerifiedEmail();
      if (userEmail) {
        const channelKey = `channel_${userEmail}`;
        localStorage.setItem(channelKey, channelInfo.channelId);
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
        }
      }
      if (onChannelSelect) {
        onChannelSelect(channelInfo.channelId, channelInfo.name);
      }
      window.dispatchEvent(new CustomEvent('channelChanged', { detail: { channelId: channelInfo.channelId, channelName: channelInfo.name } }));
    } catch (err) {
      console.error("Failed to reload stored videos", err);
    }
  };

  const ChannelList = () => (
    <div className="p-3 sm:p-4 space-y-2">
      <div className="grid gap-1.5">
        {availableChannels.map((channel) => {
          const isLoading = loadingChannels.has(channel.channelId);
          const isSelected = selectedChannelId === channel.channelId;

          return (
            <button
              key={channel.channelId}
              type="button"
              onClick={() => handleChannelClick(channel.channelId, channel.name)}
              className={cn(
                "w-full flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                isSelected
                  ? "bg-red-50/80 border-2 border-red-200 shadow-sm"
                  : "hover:bg-slate-50 border-2 border-transparent hover:border-slate-100"
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="active-bg"
                  className="absolute inset-0 bg-gradient-to-r from-red-50/50 to-transparent z-0"
                />
              )}

              <div className="relative z-10 flex items-center gap-3 w-full">
                <div className="relative">
                  {channel.avatar ? (
                    <img
                      src={channel.avatar}
                      alt={channel.name}
                      className={cn(
                        "w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 shadow-sm transition-transform duration-300 group-hover:scale-105",
                        isSelected ? "border-red-500" : "border-slate-100"
                      )}
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-md">
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        channel.name.charAt(0).toUpperCase()
                      )}
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-white shadow-sm">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <p className={cn(
                    "text-sm sm:text-[15px] font-bold truncate transition-colors",
                    isSelected ? "text-red-700" : "text-slate-900"
                  )}>
                    {channel.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[11px] text-slate-400 font-medium">YouTube Channel</span>
                    <a
                      href={`https://www.youtube.com/channel/${channel.channelId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {isSelected && (
                  <div className="hidden sm:flex w-6 h-6 rounded-full bg-red-100 items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-red-600" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="space-y-2 mt-4 pt-4 border-t border-slate-100/60">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(false);
            setIsDrawerOpen(false);
            setTimeout(() => setShowAddModal(true), 100);
          }}
          className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-200 hover:bg-red-50/50 transition-all duration-300 group"
        >
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
            <Plus className="h-5 w-5 text-red-600" />
          </div>
          <div className="text-left">
            <p className="text-[14px] font-bold text-slate-700">Add Channel</p>
            <p className="text-[11px] text-slate-500">Promote another business</p>
          </div>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(false);
            setIsDrawerOpen(false);
            setTimeout(() => setShowManageModal(true), 100);
          }}
          className="w-full flex items-center gap-3 p-3.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-300 group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:scale-110 transition-transform">
            <Settings className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-[14px] font-bold text-slate-700">Manage Channels</p>
            <p className="text-[11px] text-slate-500">View or remove connections</p>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="channel-selector-container relative">
      {isMobile ? (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <button
              type="button"
              className="group flex items-center gap-2 p-1.5 pr-3 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-full transition-all duration-300 shadow-sm hover:shadow-md max-w-[160px] sm:max-w-none animate-fade-in"
            >
              {selectedChannel ? (
                <>
                  <div className="relative">
                    {selectedChannel.avatar ? (
                      <img
                        src={selectedChannel.avatar}
                        alt={selectedChannel.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-slate-100 group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-100 flex items-center justify-center shadow-sm">
                        <Youtube className="w-4 h-4 text-red-600" />
                      </div>
                    )}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-red-600 border border-white flex items-center justify-center">
                      <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-slate-800 truncate mr-1">
                    {selectedChannel.name}
                  </span>
                  <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform", isDrawerOpen && "rotate-180")} />
                </>
              ) : (
                <>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-50 flex items-center justify-center border border-red-100 group-hover:scale-110 transition-transform">
                    <Plus className="h-3.5 w-3.5 text-red-600" />
                  </div>
                  <span className="text-[13px] font-bold text-red-600">Add channel</span>
                </>
              )}
            </button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[85vh] rounded-t-[32px] border-t-2 border-red-100 bg-white/95 backdrop-blur-xl">
            <DrawerHeader className="pb-2">
              <div className="flex items-center justify-center mb-1">
                <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center">
                  <Youtube className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <DrawerTitle className="text-xl font-bold font-founders text-slate-900 text-center tracking-tight">
                Switch Channels
              </DrawerTitle>
              <p className="text-xs text-slate-500 text-center -mt-0.5">Manage your active YouTube accounts</p>
            </DrawerHeader>
            <div className="overflow-y-auto pb-8">
              <ChannelList />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              if (availableChannels.length === 0) {
                setShowAddModal(true);
              } else {
                setShowDropdown(!showDropdown);
              }
            }}
            className={cn(
              "group flex items-center gap-2.5 px-3.5 py-2 bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl hover:border-red-200 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-0.5 min-w-0",
              showDropdown && "ring-2 ring-red-100 border-red-300 shadow-xl -translate-y-0.5"
            )}
          >
            {selectedChannel ? (
              <>
                <div className="relative">
                  {selectedChannel.avatar ? (
                    <img
                      src={selectedChannel.avatar}
                      alt={selectedChannel.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-100 group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center text-red-600 font-bold text-xs border border-red-200 shadow-sm">
                      {selectedChannel.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-white flex items-center justify-center shadow-md">
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="flex flex-col items-start leading-tight pr-1">
                  <span className="text-[13px] font-bold text-slate-900 truncate max-w-[120px]">
                    {selectedChannel.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Verified Channel</span>
                </div>
                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-300", showDropdown ? 'rotate-180' : 'group-hover:translate-y-0.5')} />
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600 ring-1 ring-red-200/50 group-hover:scale-110 transition-transform shadow-inner">
                  <Plus className="h-4 w-4 stroke-[3]" />
                </div>
                <span className="text-[14px] font-bold text-red-600 pr-2">Add YouTube</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
              </>
            )}
          </button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute z-50 right-0 mt-3 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] max-h-[500px] overflow-hidden w-[400px]"
              >
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
                  <h3 className="font-founders text-lg font-bold text-slate-900 tracking-tight">Switch Account</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">Sync Active</span>
                  </div>
                </div>
                <div className="overflow-y-auto max-h-[380px] custom-scrollbar">
                  <ChannelList />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
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
            const channelKey = getSelectedChannelKey();
            const currentSelected = localStorage.getItem(channelKey);
            if (currentSelected) {
              const stillExists = availableChannels.some((v) => v.channelId === currentSelected);
              if (!stillExists) {
                localStorage.removeItem(channelKey);
                setSelectedChannelId(null);
                const firstChannel = availableChannels.find((v) => v.channelId);
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
