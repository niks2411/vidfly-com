"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, Layers, Settings, CreditCard, X, ChevronRight, Play, ArrowLeft, Info, Eye, Users, ChevronDown, Search, Star, Rocket, ShieldCheck, Trash2 } from "lucide-react";
import AdPreviewModal from "@/components/AdPreviewModal";
import { getVerifiedEmail, getSelectedChannelKey } from "@/lib/verifiedEmail";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignCard from "@/components/CampaignCard";
import ChannelSelector from "@/components/ChannelSelector";
import { useAuth } from "@/context/AuthContext";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
const CASHFREE_MODE = process.env.NEXT_PUBLIC_CASHFREE_MODE || "sandbox";

type PricingBreakdown = {
    baseViews: { min: number; max: number; exact: number };
    bonusViews: { min: number; max: number; exact: number; percentage: number };
    totalViews: { min: number; max: number; exact: number };
    totalSubscribers?: { min: number; max: number };
};

type SelectedVideo = {
    title: string;
    author?: string;
    videoId: string;
    thumbnail: string;
    link: string;
    channelId?: string | null;
    avatarUrl?: string | null;
    publishedAt?: string | null;
    duration?: string | null;
    viewCount?: string | number | null;
    likeCount?: string | number | null;
    commentCount?: string | number | null;
    viewsRequested?: number | null;
};

type CampaignState = {
    email?: string;
    youtubeLink: string;
    videoInfo: SelectedVideo;
    videos?: SelectedVideo[];
    bulkViewsPackage?: {
        id: string;
        label: string;
        price: string;
        views: number;
    };
    campaignType?: string;
};

const STORAGE_KEY = "vidfly_channel_videos";
const BUDGET_STATE_KEY = "vidfly_budget_state";

const formatNumber = (num: string | number | null | undefined) => {
    if (!num) return "0";
    const n = typeof num === "string" ? parseInt(num) : num;
    if (isNaN(n)) return "0";
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toLocaleString();
};

const parseISO8601Duration = (duration: string | null | undefined) => {
    if (!duration) return "";
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "";

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const getRelativeTime = (dateString: string | null | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 0) return "just now";

    const units = [
        { name: 'year', seconds: 31536000 },
        { name: 'month', seconds: 2592000 },
        { name: 'week', seconds: 604800 },
        { name: 'day', seconds: 86400 },
        { name: 'hour', seconds: 3600 },
        { name: 'minute', seconds: 60 }
    ];

    for (const unit of units) {
        const count = Math.floor(diffInSeconds / unit.seconds);
        if (count >= 1) {
            return `${count} ${unit.name}${count !== 1 ? 's' : ''} ago`;
        }
    }
    return "just now";
};

const COUNTRIES = [
    { code: "AF", name: "Afghanistan" },
    { code: "AL", name: "Albania" },
    { code: "DZ", name: "Algeria" },
    { code: "AS", name: "American Samoa" },
    { code: "AD", name: "Andorra" },
    { code: "AO", name: "Angola" },
    { code: "AI", name: "Anguilla" },
    { code: "AQ", name: "Antarctica" },
    { code: "AG", name: "Antigua and Barbuda" },
    { code: "AR", name: "Argentina" },
    { code: "AM", name: "Armenia" },
    { code: "AW", name: "Aruba" },
    { code: "AU", name: "Australia" },
    { code: "AT", name: "Austria" },
    { code: "AZ", name: "Azerbaijan" },
    { code: "BS", name: "Bahamas" },
    { code: "BH", name: "Bahrain" },
    { code: "BD", name: "Bangladesh" },
    { code: "BB", name: "Barbados" },
    { code: "BY", name: "Belarus" },
    { code: "BE", name: "Belgium" },
    { code: "BZ", name: "Belize" },
    { code: "BJ", name: "Benin" },
    { code: "BM", name: "Bermuda" },
    { code: "BT", name: "Bhutan" },
    { code: "BO", name: "Bolivia" },
    { code: "BA", name: "Bosnia and Herzegovina" },
    { code: "BW", name: "Botswana" },
    { code: "BR", name: "Brazil" },
    { code: "BN", name: "Brunei Darussalam" },
    { code: "BG", name: "Bulgaria" },
    { code: "BF", name: "Burkina Faso" },
    { code: "BI", name: "Burundi" },
    { code: "KH", name: "Cambodia" },
    { code: "CM", name: "Cameroon" },
    { code: "CA", name: "Canada" },
    { code: "CV", name: "Cape Verde" },
    { code: "KY", name: "Cayman Islands" },
    { code: "CF", name: "Central African Republic" },
    { code: "TD", name: "Chad" },
    { code: "CL", name: "Chile" },
    { code: "CN", name: "China" },
    { code: "CO", name: "Colombia" },
    { code: "KM", name: "Comoros" },
    { code: "CG", name: "Congo" },
    { code: "CD", name: "Congo, The Democratic Republic of the" },
    { code: "CR", name: "Costa Rica" },
    { code: "CI", name: "Cote D'Ivoire" },
    { code: "HR", name: "Croatia" },
    { code: "CU", name: "Cuba" },
    { code: "CY", name: "Cyprus" },
    { code: "CZ", name: "Czech Republic" },
    { code: "DK", name: "Denmark" },
    { code: "DJ", name: "Djibouti" },
    { code: "DM", name: "Dominica" },
    { code: "DO", name: "Dominican Republic" },
    { code: "EC", name: "Ecuador" },
    { code: "EG", name: "Egypt" },
    { code: "SV", name: "El Salvador" },
    { code: "GQ", name: "Equatorial Guinea" },
    { code: "ER", name: "Eritrea" },
    { code: "EE", name: "Estonia" },
    { code: "ET", name: "Ethiopia" },
    { code: "FJ", name: "Fiji" },
    { code: "FI", name: "Finland" },
    { code: "FR", name: "France" },
    { code: "GA", name: "Gabon" },
    { code: "GM", name: "Gambia" },
    { code: "GE", name: "Georgia" },
    { code: "DE", name: "Germany" },
    { code: "GH", name: "Ghana" },
    { code: "GI", name: "Gibraltar" },
    { code: "GR", name: "Greece" },
    { code: "GL", name: "Greenland" },
    { code: "GD", name: "Grenada" },
    { code: "GP", name: "Guadeloupe" },
    { code: "GU", name: "Guam" },
    { code: "GT", name: "Guatemala" },
    { code: "GN", name: "Guinea" },
    { code: "GW", name: "Guinea-Bissau" },
    { code: "GY", name: "Guyana" },
    { code: "HT", name: "Haiti" },
    { code: "VA", name: "Holy See (Vatican City State)" },
    { code: "HN", name: "Honduras" },
    { code: "HK", name: "Hong Kong" },
    { code: "HU", name: "Hungary" },
    { code: "IS", name: "Iceland" },
    { code: "IN", name: "India" },
    { code: "ID", name: "Indonesia" },
    { code: "IR", name: "Iran, Islamic Republic of" },
    { code: "IQ", name: "Iraq" },
    { code: "IE", name: "Ireland" },
    { code: "IL", name: "Israel" },
    { code: "IT", name: "Italy" },
    { code: "JM", name: "Jamaica" },
    { code: "JP", name: "Japan" },
    { code: "JO", name: "Jordan" },
    { code: "KZ", name: "Kazakhstan" },
    { code: "KE", name: "Kenya" },
    { code: "KI", name: "Kiribati" },
    { code: "KP", name: "Korea, Democratic People's Republic of" },
    { code: "KR", name: "Korea, Republic of" },
    { code: "KW", name: "Kuwait" },
    { code: "KG", name: "Kyrgyzstan" },
    { code: "LA", name: "Lao People's Democratic Republic" },
    { code: "LV", name: "Latvia" },
    { code: "LB", name: "Lebanon" },
    { code: "LS", name: "Lesotho" },
    { code: "LR", name: "Liberia" },
    { code: "LY", name: "Libyan Arab Jamahiriya" },
    { code: "LI", name: "Liechtenstein" },
    { code: "LT", name: "Lithuania" },
    { code: "LU", name: "Luxembourg" },
    { code: "MO", name: "Macao" },
    { code: "MK", name: "Macedonia, The Former Yugoslav Republic of" },
    { code: "MG", name: "Madagascar" },
    { code: "MW", name: "Malawi" },
    { code: "MY", name: "Malaysia" },
    { code: "MV", name: "Maldives" },
    { code: "ML", name: "Mali" },
    { code: "MT", name: "Malta" },
    { code: "MH", name: "Marshall Islands" },
    { code: "MQ", name: "Martinique" },
    { code: "MR", name: "Mauritania" },
    { code: "MU", name: "Mauritius" },
    { code: "YT", name: "Mayotte" },
    { code: "MX", name: "Mexico" },
    { code: "FM", name: "Micronesia, Federated States of" },
    { code: "MD", name: "Moldova, Republic of" },
    { code: "MC", name: "Monaco" },
    { code: "MN", name: "Mongolia" },
    { code: "MS", name: "Montserrat" },
    { code: "MA", name: "Morocco" },
    { code: "MZ", name: "Mozambique" },
    { code: "MM", name: "Myanmar" },
    { code: "NA", name: "Namibia" },
    { code: "NR", name: "Nauru" },
    { code: "NP", name: "Nepal" },
    { code: "NL", name: "Netherlands" },
    { code: "NC", name: "New Caledonia" },
    { code: "NZ", name: "New Zealand" },
    { code: "NI", name: "Nicaragua" },
    { code: "NE", name: "Niger" },
    { code: "NG", name: "Nigeria" },
    { code: "NU", name: "Niue" },
    { code: "NF", name: " Norfolk Island" },
    { code: "MP", name: "Northern Mariana Islands" },
    { code: "NO", name: "Norway" },
    { code: "OM", name: "Oman" },
    { code: "PK", name: "Pakistan" },
    { code: "PW", name: "Palau" },
    { code: "PS", name: "Palestinian Territory, Occupied" },
    { code: "PA", name: "Panama" },
    { code: "PG", name: "Papua New Guinea" },
    { code: "PY", name: "Paraguay" },
    { code: "PE", name: "Peru" },
    { code: "PH", name: "Philippines" },
    { code: "PN", name: "Pitcairn" },
    { code: "PL", name: "Poland" },
    { code: "PT", name: "Portugal" },
    { code: "PR", name: "Puerto Rico" },
    { code: "QA", name: "Qatar" },
    { code: "RE", name: "Reunion" },
    { code: "RO", name: "Romania" },
    { code: "RU", name: "Russian Federation" },
    { code: "RW", name: "Rwanda" },
    { code: "SH", name: "Saint Helena" },
    { code: "KN", name: "Saint Kitts and Nevis" },
    { code: "LC", name: "Saint Lucia" },
    { code: "PM", name: "Saint Pierre and Miquelon" },
    { code: "VC", name: "Saint Vincent and the Grenadines" },
    { code: "WS", name: "Samoa" },
    { code: "SM", name: "San Marino" },
    { code: "ST", name: "Sao Tome and Principe" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "SN", name: "Senegal" },
    { code: "SC", name: "Seychelles" },
    { code: "SL", name: "Sierra Leone" },
    { code: "SG", name: "Singapore" },
    { code: "SK", name: "Slovakia" },
    { code: "SI", name: "Slovenia" },
    { code: "SB", name: "Solomon Islands" },
    { code: "SO", name: "Somalia" },
    { code: "ZA", name: "South Africa" },
    { code: "GS", name: "South Georgia and the South Sandwich Islands" },
    { code: "ES", name: "Spain" },
    { code: "LK", name: "Sri Lanka" },
    { code: "SD", name: "Sudan" },
    { code: "SR", name: "Suriname" },
    { code: "SZ", name: "Swaziland" },
    { code: "SE", name: "Sweden" },
    { code: "CH", name: "Switzerland" },
    { code: "SY", name: "Syrian Arab Republic" },
    { code: "TW", name: "Taiwan, Province of China" },
    { code: "TJ", name: "Tajikistan" },
    { code: "TZ", name: "Tanzania, United Republic of" },
    { code: "TH", name: "Thailand" },
    { code: "TL", name: "Timor-Leste" },
    { code: "TG", name: "Togo" },
    { code: "TK", name: "Tokelau" },
    { code: "TO", name: "Tonga" },
    { code: "TT", name: "Trinidad and Tobago" },
    { code: "TN", name: "Tunisia" },
    { code: "TR", name: "Turkey" },
    { code: "TM", name: "Turkmenistan" },
    { code: "TC", name: "Turks and Caicos Islands" },
    { code: "TV", name: "Tuvalu" },
    { code: "UG", name: "Uganda" },
    { code: "UA", name: "Ukraine" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "GB", name: "United Kingdom" },
    { code: "US", name: "United States" },
    { code: "UM", name: "United States Minor Outlying Islands" },
    { code: "UY", name: "Uruguay" },
    { code: "UZ", name: "Uzbekistan" },
    { code: "VU", name: "Vanuatu" },
    { code: "VE", name: "Venezuela" },
    { code: "VN", name: "Viet Nam" },
    { code: "VG", name: "Virgin Islands, British" },
    { code: "VI", name: "Virgin Islands, U.S." },
    { code: "WF", name: "Wallis and Futuna" },
    { code: "EH", name: "Western Sahara" },
    { code: "YE", name: "Yemen" },
    { code: "ZM", name: "Zambia" },
    { code: "ZW", name: "Zimbabwe" },
];

export default function CampaignBudget() {
    const router = useRouter();
    const { user } = useAuth();
    const [state, setState] = useState<CampaignState | null>(null);
    const [verifiedEmail, setVerifiedEmail] = useState("");

    useEffect(() => {
        const email = getVerifiedEmail();
        if (!email) {
            router.replace("/get-started");
            return;
        }
        setVerifiedEmail(email);

        try {
            const currentVideo = sessionStorage.getItem("vidfly_current_campaign_video");
            const currentVideos = sessionStorage.getItem("vidfly_current_campaign_videos");

            if (currentVideo) {
                const videoInfo = JSON.parse(currentVideo);
                const videos = currentVideos ? JSON.parse(currentVideos) : [videoInfo];
                const newState: CampaignState = {
                    email,
                    youtubeLink: videoInfo.link,
                    videoInfo,
                    videos,
                };
                setState(newState);
                sessionStorage.setItem(BUDGET_STATE_KEY, JSON.stringify(newState));
            } else {
                const stored = sessionStorage.getItem(BUDGET_STATE_KEY);
                if (stored) {
                    setState(JSON.parse(stored));
                } else {
                    router.replace("/campaign");
                }
            }
        } catch (err) {
            console.error("Failed to restore campaign state", err);
            router.replace("/campaign");
        }
    }, [router]);

    const [selectedVideos, setSelectedVideos] = useState<SelectedVideo[]>([]);
    useEffect(() => {
        if (state?.videos) setSelectedVideos(state.videos);
        else if (state?.videoInfo) setSelectedVideos([state.videoInfo]);
    }, [state]);

    const isBulkViews = (state?.campaignType === "bulk-views" && state?.bulkViewsPackage) || false;
    const bulkViewsPackage = state?.bulkViewsPackage || null;
    const bulkViewsPrice = bulkViewsPackage
        ? parseFloat(bulkViewsPackage.price.replace(/[^0-9.]/g, ""))
        : null;

    const [budget, setBudget] = useState(800);
    const [sliderMax, setSliderMax] = useState(10000);

    // Dynamic slider range logic
    useEffect(() => {
        if (budget > sliderMax) {
            setSliderMax(Math.ceil(budget / 1000) * 1000 + 5000); // Add buffer
        } else if (budget < 10000 && sliderMax > 10000) {
            setSliderMax(10000); // Reset to base max if low
        }
    }, [budget, sliderMax]);

    const removeVideo = (videoId: string) => {
        if (selectedVideos.length <= 1) return;
        const updated = selectedVideos.filter(v => v.videoId !== videoId);
        setSelectedVideos(updated);
        sessionStorage.setItem("vidfly_current_campaign_videos", JSON.stringify(updated));
        sessionStorage.setItem("vidfly_current_campaign_video", JSON.stringify(updated[0]));
        if (state) {
            setState({ ...state, videos: updated, videoInfo: updated[0] });
        }
    };

    useEffect(() => {
        if (isBulkViews && bulkViewsPrice) {
            setBudget(bulkViewsPrice);
        }
    }, [isBulkViews, bulkViewsPrice]);

    const [pricingData, setPricingData] = useState<PricingBreakdown | null>(null);
    const [loadingPricing, setLoadingPricing] = useState(false);
    const [targetCountries, setTargetCountries] = useState<string[]>([]);
    const [countrySearch, setCountrySearch] = useState("");
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".searchable-country-selector")) {
                setIsCountryDropdownOpen(false);
                setCountrySearch("");
            }
        };
        if (isCountryDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isCountryDropdownOpen]);

    const [campaignDuration, setCampaignDuration] = useState("3-7 Days");
    const [customDurationDays, setCustomDurationDays] = useState<number>(7);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [selectedCustomDate, setSelectedCustomDate] = useState<Date>(() => {
        const d = new Date();
        d.setDate(d.getDate() + 7);
        return d;
    });
    const [viewingMonth, setViewingMonth] = useState<Date>(new Date());

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".custom-date-picker-container") && !target.closest(".date-picker-trigger")) {
                setIsDatePickerOpen(false);
            }
        };
        if (isDatePickerOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isDatePickerOpen]);

    const formatDatePickerDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const generateCalendarDays = (month: Date) => {
        const year = month.getFullYear();
        const firstDayOfMonth = new Date(year, month.getMonth(), 1);
        const lastDayOfMonth = new Date(year, month.getMonth() + 1, 0);
        
        // Adjust to start from Monday (0: Su, 1: Mo ... 6: Sa) -> (0: Mo ... 6: Su)
        let firstDayWeekday = firstDayOfMonth.getDay(); 
        firstDayWeekday = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;

        const days = [];
        
        // Previous month days
        const prevMonthLastDay = new Date(year, month.getMonth(), 0).getDate();
        for (let i = firstDayWeekday - 1; i >= 0; i--) {
            days.push({ day: prevMonthLastDay - i, currentMonth: false, date: new Date(year, month.getMonth() - 1, prevMonthLastDay - i) });
        }

        // Current month days
        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            days.push({ day: i, currentMonth: true, date: new Date(year, month.getMonth(), i) });
        }

        // Next month days
        const remainingCells = 42 - days.length;
        for (let i = 1; i <= remainingCells; i++) {
            days.push({ day: i, currentMonth: false, date: new Date(year, month.getMonth() + 1, i) });
        }

        return days;
    };

    const handleMonthNav = (direction: number) => {
        setViewingMonth(new Date(viewingMonth.getFullYear(), viewingMonth.getMonth() + direction, 1));
    };

    const [autoTargeting, setAutoTargeting] = useState(true);
    const [showTargetingModal, setShowTargetingModal] = useState(false);
    const [goalType, setGoalType] = useState("Engagement");
    const [createError, setCreateError] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [sdkLoaded, setSdkLoaded] = useState(false);
    const [freeViewsBalance, setFreeViewsBalance] = useState(0);

    const [selectedGender, setSelectedGender] = useState("all");
    const [selectedAges, setSelectedAges] = useState<string[]>(["all"]);
    const [selectedInterests, setSelectedInterests] = useState<string[]>(["all"]);
    const [keywords, setKeywords] = useState<string[]>([]);
    const [keywordInput, setKeywordInput] = useState("");

    useEffect(() => {
        if (verifiedEmail) {
            loadFreeViewsBalance();
        }
    }, [verifiedEmail]);

    const loadFreeViewsBalance = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/free-views/balance?email=${encodeURIComponent(verifiedEmail)}`, {
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setFreeViewsBalance(data.balance || 0);
            }
        } catch (err) {
            console.error("Failed to load free views balance", err);
        }
    };

    useEffect(() => {
        if (!isBulkViews) {
            const timeout = setTimeout(() => calculatePricing(budget), 300);
            return () => clearTimeout(timeout);
        }
    }, [budget, isBulkViews]);

    const calculatePricing = async (value: number) => {
        try {
            setLoadingPricing(true);
            const response = await fetch(`${API_BASE_URL}/api/pricing/calculate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ price: value }),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Backend Error Response:", errorData);
                throw new Error(errorData.message || "Unable to calculate views");
            }
            const data = await response.json();
            setPricingData(data);
        } catch (err: any) {
            console.error("Pricing estimation error:", err.message);
        } finally {
            setLoadingPricing(false);
        }
    };

    if (!state || !selectedVideos.length) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    const primaryVideo = selectedVideos[0];
    const channelName = primaryVideo.author || "Your Channel";
    const youtubeLink = state.youtubeLink || primaryVideo.link;

    const effectiveTotalViews = (() => {
        let baseViews = 0;
        if (isBulkViews && bulkViewsPackage) {
            baseViews = bulkViewsPackage.views;
        } else if (pricingData?.totalViews?.exact) {
            baseViews = pricingData.totalViews.exact;
        } else {
            baseViews = budget;
        }
        return baseViews + freeViewsBalance;
    })();

    const perVideoViews = Math.max(1, Math.round(effectiveTotalViews / selectedVideos.length));

    const handleCreateCampaign = async () => {
        try {
            setCreating(true);
            setCreateError(null);

            if (budget < 499) {
                setCreateError("Minimum campaign budget is ₹499. Please adjust the slider.");
                setCreating(false);
                return;
            }

            const payload = {
                customerName: channelName,
                email: verifiedEmail,
                channel: {
                    name: channelName,
                    channelId: primaryVideo.channelId || null,
                    link: youtubeLink,
                    avatar: primaryVideo.avatarUrl || null,
                },
                videos: selectedVideos.map((video) => ({
                    videoId: video.videoId,
                    title: video.title,
                    link: video.link,
                    thumbnail: video.thumbnail,
                    viewsRequested: video.viewsRequested || perVideoViews,
                })),
                package: isBulkViews && bulkViewsPackage
                    ? {
                        id: bulkViewsPackage.id,
                        name: bulkViewsPackage.label,
                        price: budget,
                        currency: "INR",
                        quantity: effectiveTotalViews,
                        type: "bulk-views",
                        description: `${bulkViewsPackage.label} - ${bulkViewsPackage.price}`,
                    }
                    : {
                        id: "custom-campaign",
                        name: "Custom Campaign",
                        price: budget,
                        currency: "INR",
                        quantity: effectiveTotalViews,
                        type: "views",
                        description: `Budget ${budget} with estimated ${pricingData?.totalViews
                            ? `${pricingData.totalViews.min}-${pricingData.totalViews.max} views`
                            : "views"
                            }`,
                    },
                targeting: {
                    country: targetCountries.join(', '),
                    countries: targetCountries,
                    goal: goalType,
                    duration: campaignDuration === "Custom"
                        ? `Custom (${customDurationDays} days)`
                        : campaignDuration,
                    customDurationDays: campaignDuration === "Custom" ? customDurationDays : undefined,
                    autoTargeting,
                    ...(!autoTargeting && {
                        gender: selectedGender,
                        ages: selectedAges,
                        interests: selectedInterests,
                        keywords: keywords,
                    }),
                },
                budget,
                source: selectedVideos.length > 1 ? "promote_channel" : "promote_video",
            };

            const response = await fetch(`${API_BASE_URL}/api/orders/campaign`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include",
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data?.message || "Unable to create campaign");

            // Initiate payment immediately
            try {
                const paymentResponse = await fetch(`${API_BASE_URL}/api/payments/create`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ orderId: data.order.orderId, gateway: "cashfree" }),
                });

                const paymentData = await paymentResponse.json();
                if (!paymentResponse.ok) {
                    if (data.paymentCheckoutUrl) {
                        window.location.href = data.paymentCheckoutUrl;
                        return;
                    }
                    throw new Error(paymentData?.message || "Failed to initiate payment");
                }

                if (paymentData.paymentSessionId && sdkLoaded) {
                    const cashfree = (window as any).Cashfree({ mode: CASHFREE_MODE });
                    cashfree.checkout({ paymentSessionId: paymentData.paymentSessionId, redirectTarget: "_self" });
                    return;
                } else if (paymentData.paymentUrl) {
                    window.location.href = paymentData.paymentUrl;
                    return;
                } else if (data.paymentCheckoutUrl) {
                    window.location.href = data.paymentCheckoutUrl;
                    return;
                }
            } catch (paymentErr) {
                console.error("Direct payment initiation failed:", paymentErr);
                // Fallback to internal checkout page on error
                if (data.paymentCheckoutUrl) {
                    window.location.href = data.paymentCheckoutUrl;
                    return;
                }
            }

            router.push(`/campaign/my-campaigns`);
        } catch (err) {
            setCreateError(err instanceof Error ? err.message : "Failed to create campaign");
        } finally {
            setCreating(false);
        }
    };

    return (
        <CampaignLayout activeSidebar="budget" hideSidebar={true} showChannelSelector={!isBulkViews}>
            <Script
                src="https://sdk.cashfree.com/js/v3/cashfree.js"
                onLoad={() => setSdkLoaded(true)}
            />
            <div className="w-full max-w-4xl mx-auto px-4 lg:px-6 space-y-4 pb-8 pt-4">
                {/* Header Section with Go Back and Multi-step Progress */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-[14px] font-bold text-slate-800 hover:text-indigo-600 transition-colors group whitespace-nowrap"
                    >
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-50 transition-all">
                            <ArrowLeft className="w-4 h-4 text-slate-900" />
                        </div>
                        Go Back
                    </button>

                    {/* Progress Stepper - Compact Gaps */}
                    <div className="flex-1 max-w-xl pt-0.5 ml-16">
                        <div className="flex items-center gap-4">
                            {[
                                { label: "Enter Link", active: true, color: "bg-gradient-to-r from-blue-400 to-emerald-300" },
                                { label: "Select Videos", active: true, color: "bg-gradient-to-r from-blue-400 to-emerald-300" },
                                { label: "Budget & Targeting", active: false, color: "bg-slate-200" }
                            ].map((step, index) => (
                                <div key={index} className="flex-1 flex flex-col items-start gap-2.5">
                                    <div className={`h-[5px] w-full rounded-full ${step.color}`} />
                                    <span className="text-[11px] font-bold text-slate-900 tracking-tight">{step.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-4 items-start">
                    {/* Left Side: Budget and Targeting Cards */}
                    <div className="lg:col-span-8 space-y-3">
                        {/* Enter Budget Card */}
                        <div className="bg-white rounded-[12px] border border-slate-100 p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[17px] font-bold text-slate-900">Enter Your Budget</h3>
                                <div className="flex items-center gap-4">
                                    {budget >= 1000 && (
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f5f3ff] text-[#7c3aed] rounded-[8px] border border-indigo-100 shadow-sm animate-pulse-subtle">
                                            <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center">
                                                <span className="text-[10px]">
                                                    {budget >= 7000 ? "🚀" : budget >= 4000 ? "⭐" : "🌱"}
                                                </span>
                                            </div>
                                            <span className="text-[12px] font-extrabold uppercase tracking-tight">
                                                {budget >= 7000 ? "Impact" : budget >= 4000 ? "Smart" : "Starter"}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex items-center">
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                value={budget.toLocaleString()}
                                                onChange={(e) => {
                                                    const val = Number(e.target.value.replace(/,/g, ""));
                                                    if (!isNaN(val)) setBudget(val);
                                                }}
                                                className="h-[42px] w-[100px] rounded-l-[8px] border-2 border-slate-100 bg-white text-[16px] font-bold text-slate-900 px-3 focus:border-indigo-500 focus:ring-0 transition-all text-center border-r-0"
                                            />
                                        </div>
                                        <div className="h-[42px] w-[32px] bg-slate-50 flex items-center justify-center rounded-r-[8px] border-2 border-slate-100 border-l-0">
                                            <span className="text-[16px] font-bold text-slate-400 italic">₹</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Budget Slider with Tick Marks */}
                            <div className="px-2 mb-2 relative pt-4">
                                {/* Tick marks background */}
                                <div className="absolute inset-x-0 top-[22px] h-3 flex justify-between pointer-events-none px-1">
                                    {Array.from({ length: 25 }).map((_, i) => (
                                        <div key={i} className="w-[1.5px] h-full bg-slate-100 rounded-full" />
                                    ))}
                                </div>
                                <div className="relative h-1.5 mb-8">
                                    <div className="absolute inset-x-0 h-1.5 bg-slate-100 rounded-full top-1/2 -translate-y-1/2" />
                                    <div
                                        className="absolute left-0 h-1.5 bg-[#7c3aed] rounded-full top-1/2 -translate-y-1/2"
                                        style={{ width: `${((budget - 499) / (sliderMax - 499)) * 100}%` }}
                                    />
                                    <input
                                        type="range"
                                        min={499}
                                        max={sliderMax}
                                        value={Math.min(budget, sliderMax)}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            setBudget(val);
                                            // Expand range if at edge
                                            if (val >= sliderMax && sliderMax < 50000) {
                                                setSliderMax(prev => prev + 5000);
                                            }
                                        }}
                                        className="absolute inset-x-0 h-8 opacity-0 cursor-pointer -top-3 z-30"
                                    />

                                    {/* Thumb Icon */}
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-[3px] border-[#7c3aed] rounded-full shadow-lg z-40 pointer-events-none flex items-center justify-center"
                                        style={{ left: `calc(${((budget - 499) / (sliderMax - 499)) * 100}% - 12px)` }}
                                    >
                                        <div className="w-2 h-2 bg-[#7c3aed] rounded-full" />
                                    </div>

                                    {/* Gamified Milestone Badges on Line - Dynamic Placement */}
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0 pointer-events-none">
                                        {/* Milestone: Starter (Plant) - ₹1,000 */}
                                        <div
                                            className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 shadow-sm flex items-center justify-center text-[13px] z-10 transition-all duration-500 ${budget >= 1000 ? 'border-indigo-500 scale-125 shadow-indigo-100' : 'border-slate-100'}`}
                                            style={{ left: `${((1000 - 499) / (sliderMax - 499)) * 100}%` }}
                                        >
                                            🌱
                                        </div>
                                        {/* Milestone: Smart (Star) - ₹4,000 */}
                                        <div
                                            className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 shadow-sm flex items-center justify-center text-[13px] z-10 transition-all duration-500 ${budget >= 4000 ? 'border-indigo-500 scale-125 shadow-indigo-100' : 'border-slate-100'}`}
                                            style={{ left: `${((4000 - 499) / (sliderMax - 499)) * 100}%` }}
                                        >
                                            ⭐
                                        </div>
                                        {/* Milestone: Success (Rocket) - ₹7,000 */}
                                        <div
                                            className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 shadow-sm flex items-center justify-center text-[13px] z-10 transition-all duration-500 ${budget >= 7000 ? 'border-indigo-500 scale-125 shadow-indigo-100' : 'border-slate-100'}`}
                                            style={{ left: `${((7000 - 499) / (sliderMax - 499)) * 100}%` }}
                                        >
                                            🚀
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-[12px] font-bold text-slate-400 mt-2 px-1">
                                    {[0, 0.25, 0.5, 0.75, 1].map((p) => {
                                        const val = 499 + (sliderMax - 499) * p;
                                        return <span key={p}>₹ {Math.round(val / 50) * 50 > 1000 ? (Math.round(val / 100) / 10).toFixed(1) + 'K' : Math.round(val)}</span>;
                                    })}
                                </div>
                            </div>

                            {/* Offers dropdown */}
                            <div className="mt-5 pt-3 flex items-center justify-between group cursor-pointer border-t border-slate-50">
                                <span className="text-[15px] font-bold text-slate-900">Offers</span>
                                <div className="flex items-center gap-2 text-[13px] font-bold text-slate-400 group-hover:text-indigo-600">
                                    View all Offers <ChevronDown className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Target Country Card */}
                        <div className="bg-white rounded-[12px] border border-slate-100 p-4 shadow-sm">
                            <h3 className="text-[16px] font-bold text-slate-900 mb-4">Target by Country <span className="text-slate-400 font-medium">(Optional)</span></h3>
                            <div className="relative group searchable-country-selector">
                                <div 
                                    className={`w-full h-[48px] border-2 bg-white rounded-[10px] px-4 flex items-center justify-between cursor-pointer transition-all ${
                                        isCountryDropdownOpen ? "border-indigo-500 ring-4 ring-indigo-50/50" : "border-slate-100 hover:border-slate-200"
                                    }`}
                                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                >
                                     <div className="flex items-center gap-3 overflow-hidden">
                                         <Globe className={`w-4 h-4 ${targetCountries.length > 0 ? "text-indigo-500" : "text-slate-300"}`} />
                                         <span className={`text-[14px] font-bold truncate ${targetCountries.length > 0 ? "text-slate-800" : "text-slate-400"}`}>
                                             {targetCountries.length > 0 
                                                 ? targetCountries.map(code => COUNTRIES.find(c => c.code === code)?.name).filter(Boolean).join(', ')
                                                 : "Choose a Country"}
                                         </span>
                                     </div>
                                     <ChevronDown className={`w-4 h-4 text-slate-300 transition-transform duration-300 ${isCountryDropdownOpen ? "rotate-180" : ""}`} strokeWidth={3} />
                                </div>

                                {isCountryDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-[12px] shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="p-2 border-b border-slate-50">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                                <input 
                                                    type="text"
                                                    autoFocus
                                                    placeholder="Search country..."
                                                    className="w-full h-[36px] bg-slate-50 border-none rounded-[7px] pl-9 pr-4 text-[13px] font-bold text-slate-800 focus:ring-2 focus:ring-indigo-100 outline-none placeholder:text-slate-400"
                                                    value={countrySearch}
                                                    onChange={(e) => setCountrySearch(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </div>
                                        </div>
                                        <div className="max-h-[144px] overflow-y-auto py-1 custom-scrollbar">
                                            {COUNTRIES.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase())).length > 0 ? (
                                                COUNTRIES.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase())).map((c) => (
                                                     <div 
                                                         key={c.code}
                                                         className={`px-4 py-2.5 text-[13px] font-bold cursor-pointer transition-colors flex items-center justify-between ${
                                                             targetCountries.includes(c.code) ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"
                                                         }`}
                                                         onClick={(e) => {
                                                             e.stopPropagation();
                                                             setTargetCountries(prev => 
                                                                 prev.includes(c.code) 
                                                                     ? prev.filter(code => code !== c.code)
                                                                     : [...prev, c.code]
                                                             );
                                                         }}
                                                     >
                                                         <span>{c.name}</span>
                                                         {targetCountries.includes(c.code) && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                                                     </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-6 text-center">
                                                    <p className="text-[12px] font-bold text-slate-400">No results found</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <p className="mt-3 text-[12px] text-slate-400 font-medium leading-relaxed">Targeting reduces views because your video is shown only to a specific audience.</p>

                             <div className="mt-6 flex items-center gap-2.5">
                                 <div className="w-4 h-4 rounded-[4px] bg-[#0ea5e9] flex items-center justify-center">
                                     <div className="w-[9px] h-[5px] border-l-2 border-b-2 border-white -rotate-45 mb-0.5" />
                                 </div>
                                 <label className="text-[14px] font-bold text-slate-700">Campaign Duration</label>
                             </div>

                             <div className="mt-4 flex items-center gap-2.5">
                                 {["1-2 Days", "3-7 Days", "7-10 Days", "Custom End Date"].map((d) => (
                                     <div key={d} className="relative group flex-1 max-w-[140px]">
                                         {d === "Custom End Date" && (
                                             <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-1 py-[1px] bg-[#ecfdf5] border border-emerald-400/50 rounded-[2px] z-10 whitespace-nowrap pointer-events-none">
                                                 <span className="text-[6.5px] text-emerald-600 font-extrabold uppercase tracking-wider block leading-none">Recommended</span>
                                             </div>
                                         )}
                                         <button
                                             onClick={() => {
                                                 if (d === "Custom End Date") {
                                                     setIsDatePickerOpen(true);
                                                 } else {
                                                     setCampaignDuration(d);
                                                     setIsDatePickerOpen(false);
                                                 }
                                             }}
                                             className={`w-full py-2.5 rounded-[6px] text-[13px] font-extrabold transition-all date-picker-trigger ${campaignDuration === d || (d === "Custom End Date" && !["1-2 Days", "3-7 Days", "7-10 Days"].includes(campaignDuration))
                                                 ? "bg-[#1f2937] text-white shadow-md"
                                                 : "bg-slate-200/60 text-slate-600 hover:bg-slate-200"
                                                 }`}
                                         >
                                             {d === "Custom End Date" && !["1-2 Days", "3-7 Days", "7-10 Days"].includes(campaignDuration) 
                                                ? campaignDuration.split(',')[0] // Show "Apr 9" part
                                                : d}
                                         </button>

                                         {d === "Custom End Date" && isDatePickerOpen && (
                                             <div className="absolute bottom-full right-0 mb-2 w-[320px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-slate-100 z-[100] p-5 animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-200 custom-date-picker-container">
                                                 {/* Calendar Header */}
                                                 <div className="flex items-center justify-between mb-6">
                                                     <button onClick={() => handleMonthNav(-1)} className="p-1.5 hover:bg-slate-50 rounded-full transition-colors">
                                                         <X className="w-4 h-4 text-slate-400 rotate-45" />
                                                     </button>
                                                     <h4 className="text-[15px] font-bold text-slate-800">
                                                         {viewingMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                     </h4>
                                                     <button onClick={() => handleMonthNav(1)} className="p-1.5 hover:bg-slate-50 rounded-full transition-colors">
                                                         <ChevronRight className="w-4 h-4 text-slate-400" />
                                                     </button>
                                                 </div>

                                                 {/* Date Input Box */}
                                                 <div className="flex gap-3 mb-6">
                                                     <div className="flex-1 h-[44px] border border-slate-200 rounded-xl px-4 flex items-center bg-white shadow-sm">
                                                         <span className="text-[14px] font-bold text-slate-700">{formatDatePickerDate(selectedCustomDate)}</span>
                                                     </div>
                                                     <button 
                                                        onClick={() => {
                                                            const today = new Date();
                                                            setSelectedCustomDate(today);
                                                            setViewingMonth(new Date(today.getFullYear(), today.getMonth(), 1));
                                                        }}
                                                        className="h-[44px] px-6 border border-slate-200 rounded-xl text-[14px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                                                     >
                                                         Today
                                                     </button>
                                                 </div>

                                                 {/* Weekday Labels */}
                                                 <div className="grid grid-cols-7 mb-2">
                                                     {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                                                         <div key={day} className="text-center text-[13px] font-bold text-slate-400 py-2">{day}</div>
                                                     ))}
                                                 </div>

                                                 {/* Calendar Grid */}
                                                 <div className="grid grid-cols-7 gap-y-1">
                                                     {generateCalendarDays(viewingMonth).map((item, idx) => {
                                                         const isSelected = item.date.toDateString() === selectedCustomDate.toDateString();
                                                         const isToday = item.date.toDateString() === new Date().toDateString();
                                                         const isPast = item.date < new Date(new Date().setHours(0,0,0,0));
                                                         const isTooFar = item.date > new Date(new Date().setDate(new Date().getDate() + 30));
                                                         const isDisabled = isPast || isTooFar;

                                                         return (
                                                             <div 
                                                                 key={idx}
                                                                 onClick={() => !isDisabled && setSelectedCustomDate(item.date)}
                                                                 className={`
                                                                     h-9 w-9 mx-auto flex items-center justify-center rounded-full text-[13px] font-bold cursor-pointer transition-all
                                                                     ${!item.currentMonth ? "text-slate-300" : "text-slate-600"}
                                                                     ${isSelected ? "bg-[#7c3aed] text-white !text-white shadow-lg shadow-indigo-200" : "hover:bg-slate-50"}
                                                                     ${isDisabled ? "opacity-30 cursor-not-allowed hover:bg-transparent" : ""}
                                                                     ${isToday && !isSelected ? "text-indigo-600" : ""}
                                                                 `}
                                                             >
                                                                 {item.day}
                                                             </div>
                                                         );
                                                     })}
                                                 </div>

                                                 {/* Footer Actions */}
                                                 <div className="grid grid-cols-2 gap-3 mt-8">
                                                     <button 
                                                         onClick={() => setIsDatePickerOpen(false)}
                                                         className="h-[48px] rounded-2xl border border-slate-200 text-[15px] font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                                                     >
                                                         Cancel
                                                     </button>
                                                     <button 
                                                         onClick={() => {
                                                             setCampaignDuration(formatDatePickerDate(selectedCustomDate));
                                                             setIsDatePickerOpen(false);
                                                         }}
                                                         className="h-[48px] rounded-2xl bg-[#7c3aed] text-white text-[15px] font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-100"
                                                     >
                                                         Apply
                                                     </button>
                                                 </div>
                                             </div>
                                         )}
                                     </div>
                                 ))}
                             </div>
                            <p className="mt-5 text-[12px] text-slate-400 font-medium italic">While we can't guarantee it, we will attempt to deliver the campaign in your selected time frame.</p>
                        </div>

                        {/* Targeting Mode Card */}
                        <div className="bg-white rounded-[12px] border border-slate-100 overflow-hidden shadow-sm">
                            <div className="p-4 space-y-4">
                                {/* Automatic Targeting Option */}
                                <div 
                                    className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                        autoTargeting 
                                        ? "border-indigo-500 bg-indigo-50/30" 
                                        : "border-slate-100 bg-white hover:border-slate-200"
                                    }`}
                                    onClick={() => setAutoTargeting(true)}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                         <div className="flex items-center gap-2">
                                             <h3 className="text-[16px] font-bold text-slate-900">Automatic Targeting</h3>
                                             <div className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-sm text-[8px] font-black uppercase tracking-wider">Recommended</div>
                                         </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                            autoTargeting ? "border-indigo-500 bg-indigo-500" : "border-slate-200"
                                        }`}>
                                            {autoTargeting && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4 mt-4">
                                        <div className="relative shrink-0">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                                                <img 
                                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" 
                                                    alt="AI Assistant" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                                        </div>
                                        <div className="flex-1 bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm relative">
                                            <div className="absolute -left-[7px] top-0 w-2 h-3 bg-white border-l border-slate-100" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                                            <p className="text-[13px] font-bold text-slate-700 leading-tight">Sit back and relax! Vidfly finds the best audience for your videos.</p>
                                            <p className="text-[11px] text-slate-400 font-medium mt-1">(Tailored based on your selections and channel profile.)</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Manual Targeting Option */}
                                             <div 
                                     className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                         !autoTargeting 
                                         ? "border-indigo-500 bg-indigo-50/30" 
                                         : "border-slate-100 bg-white hover:border-slate-200"
                                     }`}
                                     onClick={() => setAutoTargeting(false)}
                                 >
                                     <div className="flex items-center justify-between">
                                         <div>
                                             <h3 className="text-[15px] font-bold text-slate-800">Manual Targeting</h3>
                                             <p className="text-[12px] text-slate-400 font-medium mt-0.5">Set your targeting preferences manually</p>
                                         </div>
                                         <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                             !autoTargeting ? "border-indigo-500 bg-indigo-500" : "border-slate-200"
                                         }`}>
                                             {!autoTargeting && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                         </div>
                                     </div>

                                     {!autoTargeting && (
                                         <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300" onClick={(e) => e.stopPropagation()}>
                                             {/* Gender */}
                                             <div className="space-y-4">
                                                 <h4 className="text-[16px] font-bold text-slate-800">Gender</h4>
                                                 <div className="flex items-center gap-6">
                                                     {[
                                                         { id: 'all', label: 'All genders' },
                                                         { id: 'male', label: 'Male' },
                                                         { id: 'female', label: 'Female' }
                                                     ].map((g) => (
                                                         <label key={g.id} className="flex items-center gap-3 cursor-pointer group">
                                                             <div className="relative flex items-center justify-center">
                                                                 <input 
                                                                     type="radio" 
                                                                     name="gender" 
                                                                     className="sr-only" 
                                                                     checked={selectedGender === g.id}
                                                                     onChange={() => setSelectedGender(g.id)}
                                                                 />
                                                                 <div className={`w-5 h-5 rounded-full border-2 transition-all ${selectedGender === g.id ? 'border-indigo-600' : 'border-slate-300 group-hover:border-slate-400'}`} />
                                                                 {selectedGender === g.id && <div className="absolute w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                                                             </div>
                                                             <span className={`text-[15px] font-bold transition-colors ${selectedGender === g.id ? 'text-slate-800' : 'text-slate-500'}`}>{g.label}</span>
                                                         </label>
                                                     ))}
                                                 </div>
                                             </div>

                                             {/* Age */}
                                             <div className="space-y-4">
                                                 <h4 className="text-[16px] font-bold text-slate-800">Age</h4>
                                                 <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                                                     {[
                                                         { id: 'all', label: 'All Ages' },
                                                         { id: '18-24', label: '18 - 24' },
                                                         { id: '25-34', label: '25 - 34' },
                                                         { id: '35-44', label: '35 - 44' },
                                                         { id: '45-54', label: '45 - 54' },
                                                         { id: '55-64', label: '55 - 64' },
                                                         { id: '65+', label: '65+' }
                                                     ].map((a) => (
                                                         <label key={a.id} className="flex items-center gap-3 cursor-pointer group">
                                                             <div className="relative flex items-center justify-center">
                                                                 <input 
                                                                     type="checkbox" 
                                                                     className="sr-only" 
                                                                     checked={selectedAges.includes(a.id)}
                                                                     onChange={() => {
                                                                         if (a.id === 'all') {
                                                                             setSelectedAges(['all']);
                                                                         } else {
                                                                             const newAges = selectedAges.filter(age => age !== 'all');
                                                                             if (newAges.includes(a.id)) {
                                                                                 const updated = newAges.filter(age => age !== a.id);
                                                                                 setSelectedAges(updated.length === 0 ? ['all'] : updated);
                                                                             } else {
                                                                                 setSelectedAges([...newAges, a.id]);
                                                                             }
                                                                         }
                                                                     }}
                                                                 />
                                                                 <div className={`w-5 h-5 rounded-[4px] border-2 transition-all flex items-center justify-center ${selectedAges.includes(a.id) ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300 group-hover:border-slate-400'}`}>
                                                                     {selectedAges.includes(a.id) && <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[4] text-white"><path d="M20 6L9 17l-5-5" /></svg>}
                                                                 </div>
                                                             </div>
                                                             <span className={`text-[15px] font-bold transition-colors ${selectedAges.includes(a.id) ? 'text-slate-800' : 'text-slate-500'}`}>{a.label}</span>
                                                         </label>
                                                     ))}
                                                 </div>
                                             </div>

                                             {/* Interests */}
                                             <div className="space-y-4">
                                                 <h4 className="text-[16px] font-bold text-slate-800">Interests (Max 3)</h4>
                                                 <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                                     {[
                                                         { id: 'all', label: 'All interest' },
                                                         { id: 'traveling', label: 'Traveling' },
                                                         { id: 'business', label: 'Business and career' },
                                                         { id: 'education', label: 'Children and education' },
                                                         { id: 'finance', label: 'Banking and Finance' },
                                                         { id: 'hobbies', label: 'Hobbies and interests' },
                                                         { id: 'cookery', label: 'Cookery' },
                                                         { id: 'construction', label: 'Construction and repair' },
                                                         { id: 'fitness', label: 'Sports and fitness' },
                                                         { id: 'music', label: 'Music and music videos' },
                                                         { id: 'beauty', label: 'Beauty and health' },
                                                         { id: 'technology', label: 'Science and technology' },
                                                         { id: 'cars', label: 'Cars and transportation' },
                                                         { id: 'gaming', label: 'Video games' },
                                                     ].map((i) => (
                                                         <label key={i.id} className="flex items-center gap-3 cursor-pointer group">
                                                             <div className="relative flex items-center justify-center">
                                                                 <input 
                                                                     type="checkbox" 
                                                                     className="sr-only" 
                                                                     checked={selectedInterests.includes(i.id)}
                                                                     onChange={() => {
                                                                         if (i.id === 'all') {
                                                                             setSelectedInterests(['all']);
                                                                         } else {
                                                                             const newInterests = selectedInterests.filter(int => int !== 'all');
                                                                             if (newInterests.includes(i.id)) {
                                                                                 const updated = newInterests.filter(int => int !== i.id);
                                                                                 setSelectedInterests(updated.length === 0 ? ['all'] : updated);
                                                                             } else if (newInterests.length < 3) {
                                                                                 setSelectedInterests([...newInterests, i.id]);
                                                                             }
                                                                         }
                                                                     }}
                                                                 />
                                                                 <div className={`w-5 h-5 rounded-[4px] border-2 transition-all flex items-center justify-center ${selectedInterests.includes(i.id) ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300 group-hover:border-slate-400'}`}>
                                                                     {selectedInterests.includes(i.id) && <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[4] text-white"><path d="M20 6L9 17l-5-5" /></svg>}
                                                                 </div>
                                                             </div>
                                                             <span className={`text-[15px] font-bold transition-colors ${selectedInterests.includes(i.id) ? 'text-slate-800' : 'text-slate-500'}`}>{i.label}</span>
                                                         </label>
                                                     ))}
                                                 </div>
                                             </div>

                                             {/* Keywords */}
                                             <div className="space-y-4">
                                                 <div className="flex items-center gap-3">
                                                    <h4 className="text-[14px] font-bold text-slate-800">Describe your Video using Keywords and Phrases.</h4>
                                                    <button 
                                                        className="px-4 py-1.5 bg-indigo-600 text-white text-[11px] font-bold rounded-full hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
                                                        onClick={() => {
                                                            const tags = primaryVideo.tags || [];
                                                            if (tags.length > 0) setKeywords(prev => Array.from(new Set([...prev, ...tags])));
                                                        }}
                                                    >
                                                        Add Keywords from Video <Info className="w-3 h-3" />
                                                    </button>
                                                 </div>
                                                 
                                                 <div className="w-full bg-slate-50 rounded-xl border border-slate-100 p-3 min-h-[50px] flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-200 transition-all">
                                                     {keywords.map((kw, idx) => (
                                                         <div key={idx} className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-[13px] font-bold text-slate-700 flex items-center gap-1.5 shadow-sm group">
                                                             {kw}
                                                             <button onClick={() => setKeywords(keywords.filter((_, i) => i !== idx))} className="hover:text-red-500 transition-colors">
                                                                 <X className="w-3 h-3" />
                                                             </button>
                                                         </div>
                                                     ))}
                                                     <input 
                                                         type="text"
                                                         placeholder="Enter new tags separated by Enter or SpaceBar"
                                                         className="bg-transparent border-none outline-none flex-1 min-w-[200px] text-[13px] font-bold text-slate-700 placeholder:text-slate-400"
                                                         value={keywordInput}
                                                         onChange={(e) => setKeywordInput(e.target.value)}
                                                         onKeyDown={(e) => {
                                                             if (e.key === 'Enter' || e.key === ' ') {
                                                                 e.preventDefault();
                                                                 const tag = keywordInput.trim();
                                                                 if (tag && !keywords.includes(tag)) {
                                                                     setKeywords([...keywords, tag]);
                                                                     setKeywordInput("");
                                                                 }
                                                             }
                                                         }}
                                                     />
                                                 </div>
                                             </div>
                                         </div>
                                     )}
                                 </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Sidebar */}
                    <div className="lg:col-span-4 space-y-4 sticky top-[100px] self-start">
                        {/* Channel Block */}
                        <div className="bg-white rounded-[16px] border border-slate-100 p-3.5 flex items-center gap-3.5 shadow-sm">
                            <div className="shrink-0 w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-50 flex items-center justify-center">
                                {primaryVideo.avatarUrl ? (
                                    <img src={primaryVideo.avatarUrl} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <Users className="w-5 h-5 text-slate-400" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-[15px] font-extrabold text-slate-900 truncate tracking-tight mb-0.5">{channelName}</h4>
                                <div className="flex items-center gap-2">
                                    <p className="text-[12px] text-slate-400 font-bold tracking-tight">{selectedVideos.length} Videos selected</p>
                                </div>
                            </div>
                        </div>

                        {/* Selected Videos List */}
                        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
                            {selectedVideos.map((video) => (
                                <div key={video.videoId} className="bg-slate-50/50 rounded-[12px] border border-slate-100 p-2 flex gap-3 relative group">
                                    <div className="shrink-0 w-[94px] aspect-video bg-black rounded-[8px] overflow-hidden shadow-inner relative">
                                        <img src={video.thumbnail} alt="V" className="w-full h-full object-cover" />
                                        {video.duration && (
                                            <div className="absolute bottom-1 right-1 bg-black/80 text-[8px] text-white px-1 rounded-sm font-bold">
                                                {parseISO8601Duration(video.duration)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex flex-col justify-center gap-0.5 pr-6">
                                        <h5 className="text-[11px] font-bold text-slate-800 leading-tight line-clamp-2">"{video.title}"</h5>
                                        <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-tight">
                                            <span className="flex items-center gap-0.5"><Eye className="w-2 h-2" /> {formatNumber(video.viewCount)}</span>
                                            {video.publishedAt && (
                                                <>
                                                    <span>•</span>
                                                    <span>{getRelativeTime(video.publishedAt)}</span>
                                                </>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold uppercase tracking-tight">
                                            <span className="flex items-center gap-0.5 opacity-60">👍 {formatNumber(video.likeCount)}</span>
                                            <span className="flex items-center gap-0.5 opacity-60">💬 {formatNumber(video.commentCount)}</span>
                                        </div>
                                    </div>
                                    
                                    {selectedVideos.length > 1 && (
                                        <button 
                                            onClick={() => removeVideo(video.videoId)}
                                            className="absolute top-2 right-2 p-1.5 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-red-500 hover:border-red-100 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
                                            title="Remove from selection"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Estimation Sidebar */}
                        <div className="bg-white rounded-[12px] border border-slate-100 shadow-sm p-4 space-y-5">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                                    <div className="flex items-center gap-1">Estimated Views <div className="w-4 h-4 rounded-full border border-slate-200 flex items-center justify-center text-[10px]"><Info className="w-2.5 h-2.5" /></div></div>
                                    <div className="flex items-center gap-1 whitespace-nowrap">Bonus views (30%) <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px]"><Info className="w-2.5 h-2.5" /></div></div>
                                </div>

                                <div className="h-[7px] w-full bg-slate-100 rounded-full flex overflow-hidden">
                                    <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: '60%' }} />
                                    <div className="h-full bg-slate-200" style={{ width: '40%' }} />
                                </div>

                                <div className="flex items-center justify-between font-extrabold text-[12px]">
                                    <span className="text-blue-600">
                                        {loadingPricing ? "..." : pricingData ? `${(pricingData.totalViews.min).toLocaleString()} - ${(pricingData.totalViews.max).toLocaleString()}` : "909 - 1.1K"}
                                    </span>
                                    <span className="text-blue-500 font-bold">273 - 324</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-1">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 px-0.5">
                                        <span className="text-[14px] font-extrabold text-slate-600">Views</span>
                                        <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px]"><Info className="w-3 h-3" /></div>
                                    </div>
                                    <span className="text-[18px] font-black text-blue-600">
                                        {pricingData ? `${(pricingData.totalViews.min + 300).toLocaleString()} - ${(pricingData.totalViews.max + 400).toLocaleString()}` : "1.2K - 1.4K"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 px-0.5">
                                        <span className="text-[14px] font-extrabold text-slate-600">New Subscribers</span>
                                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-slate-400 mb-0.5"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" /></svg>
                                    </div>
                                    <span className="text-[18px] font-black text-blue-500">36-45</span>
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                {createError && (
                                    <p className="text-[12px] font-bold text-red-500 text-center bg-red-50 py-2 rounded-lg border border-red-100 px-3">
                                        {createError}
                                    </p>
                                )}
                                <button
                                    onClick={() => setShowPreview(true)}
                                    className="w-full h-[46px] rounded-full border border-slate-300 flex items-center justify-center gap-2 text-[15px] font-bold text-slate-500 hover:bg-slate-50 transition-all"
                                >
                                    Preview Your Ad <Eye className="w-4 h-4" />
                                </button>

                                <button
                                    onClick={handleCreateCampaign}
                                    disabled={creating}
                                    className={`w-full h-[52px] rounded-[100px] flex items-center justify-center gap-2 text-[17px] font-black shadow-lg transition-all ${
                                        creating 
                                        ? "bg-slate-300 cursor-not-allowed text-slate-500" 
                                        : "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-indigo-100"
                                    }`}
                                >
                                    {creating ? "Launching..." : "Next: Pay & Launch"}
                                    <ChevronRight className="w-5 h-5 stroke-[4]" />
                                </button>
                            </div>
                        </div>

                        {/* Trust & Payment Section (Outside the card) */}
                        <div className="mt-6 flex flex-col items-center text-center space-y-4 px-4">
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Powered by</p>
                                <div className="flex items-center justify-center gap-3">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-3 opacity-70" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-3 opacity-70" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-3 opacity-70" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center justify-center gap-2 text-[12px] font-bold text-slate-500">
                                    <span>4.5 rating</span>
                                    <div className="w-[1px] h-2.5 bg-slate-200" />
                                    <span>883 reviews</span>
                                </div>
                                <div className="flex justify-center gap-0.5">
                                    {[1, 2, 3, 4].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                                    <div className="relative">
                                        <Star className="w-3 h-3 text-slate-200 fill-slate-200" />
                                        <div className="absolute inset-0 overflow-hidden w-1/2">
                                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5 opacity-80">
                                <div className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center shadow-indigo-100 shadow-lg">
                                    <Rocket className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-[18px] font-black text-slate-700 tracking-tighter">sitejabber</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="shrink-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-sm">
                                    <ShieldCheck className="w-3 h-3" />
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 tracking-tight leading-none">
                                    Real views. Real people. Money Back Guarantee !
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AdPreviewModal
                isOpen={showPreview}
                onClose={() => setShowPreview(false)}
                video={{
                    title: primaryVideo.title,
                    thumbnail: primaryVideo.thumbnail,
                    author: primaryVideo.author || channelName,
                    videoId: primaryVideo.videoId,
                    link: primaryVideo.link,
                }}
                viewCount={effectiveTotalViews.toLocaleString()}
            />
        </CampaignLayout>
    );
}
