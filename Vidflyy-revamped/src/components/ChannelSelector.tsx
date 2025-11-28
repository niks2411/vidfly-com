import { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronDown, Plus, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddChannelModal from "./AddChannelModal";
import ManageChannelsModal from "./ManageChannelsModal";

const STORAGE_KEY = "vidfly_channel_videos";
const CHANNEL_INFO_STORAGE_KEY = "vidfly_channel_info";
const SELECTED_CHANNEL_KEY = "vidfly_selected_channel";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

type StoredVideo = {
  title: string;
  author?: string;
  videoId: string;
  thumbnail: string;
  link: string;
  channelId?: string | null;
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
  const navigate = useNavigate();
  const [storedVideos, setStoredVideos] = useState<StoredVideo[]>([]);
  const [channelInfoMap, setChannelInfoMap] = useState<Map<string, ChannelInfo>>(new Map());
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingChannels, setLoadingChannels] = useState<Set<string>>(new Set());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const parsed: StoredVideo[] = JSON.parse(
        sessionStorage.getItem(STORAGE_KEY) || "[]"
      );
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
      
      // Load selected channel from sessionStorage
      const savedChannelId = sessionStorage.getItem(SELECTED_CHANNEL_KEY);
      if (savedChannelId) {
        setSelectedChannelId(savedChannelId);
      } else if (parsed.length > 0 && !selectedChannelId) {
        // Auto-select first channel with channelId if no saved selection
        const videoWithChannel = parsed.find((v) => v.channelId);
        if (videoWithChannel?.channelId) {
          setSelectedChannelId(videoWithChannel.channelId);
          sessionStorage.setItem(SELECTED_CHANNEL_KEY, videoWithChannel.channelId);
        }
      }
    } catch (err) {
      console.error("Failed to load stored videos", err);
    }
  }, []);

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
    
    storedVideos.forEach((video) => {
      if (video.channelId && video.author) {
        if (!channelMap.has(video.channelId)) {
          const cachedInfo = channelInfoMap.get(video.channelId);
          channelMap.set(video.channelId, {
            channelId: video.channelId,
            name: cachedInfo?.name || video.author,
            avatar: cachedInfo?.avatar || "",
          });
        }
      }
    });
    
    return Array.from(channelMap.values());
  }, [storedVideos, channelInfoMap]);

  const selectedChannel = useMemo(() => {
    return availableChannels.find((ch) => ch.channelId === selectedChannelId);
  }, [availableChannels, selectedChannelId]);

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

  const handleChannelClick = (channelId: string, channelName: string) => {
    setSelectedChannelId(channelId);
    sessionStorage.setItem(SELECTED_CHANNEL_KEY, channelId);
    setShowDropdown(false);
    if (onChannelSelect) {
      onChannelSelect(channelId, channelName);
    }
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('channelChanged', { detail: { channelId, channelName } }));
  };

  const handleChannelAdded = (channelInfo: ChannelInfo) => {
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
      sessionStorage.setItem(SELECTED_CHANNEL_KEY, channelInfo.channelId);
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
        className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl hover:border-purple-400 hover:shadow-md transition-all duration-200 shadow-sm"
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
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">
                {selectedChannel.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-sm font-semibold text-slate-900">
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
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">
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
        <div className="absolute z-20 left-0 mt-2 bg-white border-2 border-purple-200 rounded-2xl shadow-2xl max-h-80 overflow-y-auto min-w-[380px] w-max animate-fade-in backdrop-blur-sm">
          <div className="p-3">
            {availableChannels.map((channel) => {
              const channelVideos = storedVideos.filter((v) => v.channelId === channel.channelId);
              const isLoading = loadingChannels.has(channel.channelId);
              
              return (
                <button
                  key={channel.channelId}
                  type="button"
                  onClick={() => handleChannelClick(channel.channelId, channel.name)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 transition-all duration-200 text-left mb-1 ${
                    selectedChannelId === channel.channelId ? 'bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200' : ''
                  }`}
                >
                  {channel.avatar ? (
                    <img
                      src={channel.avatar}
                      alt={channel.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-md">
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
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-md flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setShowDropdown(false);
                setShowAddModal(true);
              }}
              className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 transition-all duration-200 text-left border-2 border-dashed border-purple-200 bg-purple-50/30 mt-2"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                <Plus className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-purple-600">Add another channel</p>
                <p className="text-xs text-slate-500">Add a new YouTube channel</p>
              </div>
            </button>
            
            {availableChannels.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setShowDropdown(false);
                  setShowManageModal(true);
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
            const currentSelected = sessionStorage.getItem(SELECTED_CHANNEL_KEY);
            if (currentSelected) {
              const stillExists = parsed.some((v) => v.channelId === currentSelected);
              if (!stillExists) {
                sessionStorage.removeItem(SELECTED_CHANNEL_KEY);
                setSelectedChannelId(null);
                // Select first available channel
                const firstChannel = parsed.find((v) => v.channelId);
                if (firstChannel?.channelId) {
                  setSelectedChannelId(firstChannel.channelId);
                  sessionStorage.setItem(SELECTED_CHANNEL_KEY, firstChannel.channelId);
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

