(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "promotionPackages",
    ()=>promotionPackages
]);
const promotionPackages = [
    {
        id: "starter",
        name: "Starter",
        price: 999,
        views: 5000,
        hasAI: false,
        accent: "bg-blue-50",
        borderColor: "border-blue-200"
    },
    {
        id: "boost",
        name: "Boost",
        price: 1999,
        views: 10000,
        hasAI: false,
        accent: "bg-green-50",
        borderColor: "border-green-200"
    },
    {
        id: "growth",
        name: "Growth",
        price: 3499,
        views: 20000,
        hasAI: false,
        accent: "bg-purple-50",
        borderColor: "border-purple-200"
    },
    {
        id: "premium-ai",
        name: "Premium AI",
        price: 5499,
        views: 35000,
        bonusViews: 2000,
        totalViews: 37000,
        hasAI: true,
        discount: 5,
        aiFeatures: [
            "AI Smart Targeting for precise audience reach",
            "Higher watch time & stronger engagement"
        ],
        accent: "bg-orange-50",
        borderColor: "border-orange-300",
        isPopular: true
    },
    {
        id: "viral-ai",
        name: "Viral AI",
        price: 8999,
        views: 55000,
        bonusViews: 4000,
        totalViews: 59000,
        hasAI: true,
        discount: 8,
        aiFeatures: [
            "Advanced AI Interest Targeting",
            "Optimized placements for rapid growth"
        ],
        accent: "bg-red-50",
        borderColor: "border-red-300"
    },
    {
        id: "ultra-viral-ai",
        name: "Ultra Viral AI",
        price: 12999,
        views: 80000,
        bonusViews: 6500,
        totalViews: 86500,
        hasAI: true,
        discount: 10,
        aiFeatures: [
            "AI Behaviour + Interest + Demographic Targeting",
            "Maximum reach & best viral potential"
        ],
        accent: "bg-gradient-to-br from-purple-50 to-pink-50",
        borderColor: "border-purple-400",
        isPremium: true
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Animated.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Animated",
    ()=>Animated
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
"use client";
;
;
const Animated = ({ children, delay = 0, className = "", direction = "up", duration = 0.7 })=>{
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 24 : direction === "down" ? -24 : 0,
            x: direction === "left" ? 24 : direction === "right" ? -24 : 0
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration,
                delay: delay / 1000,
                ease: "easeOut"
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: "hidden",
        whileInView: "visible",
        viewport: {
            once: true,
            margin: "-10% 0px"
        },
        variants: variants,
        className: className,
        style: {
            willChange: "opacity, transform"
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/Animated.tsx",
        lineNumber: 37,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Animated;
var _c;
__turbopack_context__.k.register(_c, "Animated");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Counter.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Counter",
    ()=>Counter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const Counter = ({ to, duration = 1200 })=>{
    _s();
    const [value, setValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Counter.useEffect": ()=>{
            let rafId;
            const step = {
                "Counter.useEffect.step": (ts)=>{
                    if (!start.current) start.current = ts;
                    const progress = Math.min((ts - start.current) / duration, 1);
                    setValue(Math.floor(progress * to));
                    if (progress < 1) rafId = requestAnimationFrame(step);
                }
            }["Counter.useEffect.step"];
            rafId = requestAnimationFrame(step);
            return ({
                "Counter.useEffect": ()=>cancelAnimationFrame(rafId)
            })["Counter.useEffect"];
        }
    }["Counter.useEffect"], [
        to,
        duration
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "font-bold text-3xl lg:text-4xl text-red-600",
        children: value.toLocaleString()
    }, void 0, false, {
        fileName: "[project]/src/components/Counter.tsx",
        lineNumber: 21,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Counter, "wFb81glaVy83ujF5urUIXd34c04=");
_c = Counter;
var _c;
__turbopack_context__.k.register(_c, "Counter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/youtube-vlogging-promotion/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>YoutubeVloggingPromotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-client] (ecmascript) <export default as Video>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2d$4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock4$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock-4.js [app-client] (ecmascript) <export default as Clock4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Animated.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Counter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Counter.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function YoutubeVloggingPromotion() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleGetStartedClick = ()=>{
        router.push("/campaign");
    };
    const viewPlans = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["promotionPackages"].map((pkg)=>{
        const totalViews = pkg.totalViews || pkg.views;
        const hasAI = pkg.hasAI;
        const discount = pkg.discount;
        const bonusViews = pkg.bonusViews;
        const isPopular = pkg.isPopular;
        const isPremium = pkg.isPremium;
        return {
            name: pkg.name,
            price: `₹${pkg.price.toLocaleString()}`,
            originalPrice: undefined,
            description: "YouTube Video Promotion",
            subscribers: undefined,
            watchHours: `${totalViews.toLocaleString()}+ Views`,
            popular: isPopular || isPremium,
            badge: isPremium ? "PREMIUM" : isPopular ? "MOST POPULAR" : undefined,
            features: [
                `${totalViews.toLocaleString()}+ real, high-intent viewers`,
                hasAI ? "AI targeting included" : "Standard niche-based targeting",
                "Multi-format promotion (TrueView, In-Feed & Shorts)",
                "Safe, Google Ads–compliant delivery",
                ...discount && bonusViews ? [
                    `${discount}% instant discount`,
                    `+${bonusViews.toLocaleString()} bonus views included`
                ] : []
            ],
            borderColor: pkg.borderColor,
            hasAI: hasAI
        };
    });
    const handleWhatsApp = (preset)=>{
        const text = preset ? `Promote my vlog: ${preset}` : "I want to promote my vlogging channel on YouTube";
        window.open(`https://wa.me/917355518761?text=${encodeURIComponent(text)}`, "_blank");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-bde8482bec195583" + " " + "min-h-screen bg-white font-montserrat",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "jsx-bde8482bec195583" + " " + "relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-24 lg:py-32",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-bde8482bec195583" + " " + "absolute -left-32 -top-24 w-80 h-80 bg-red-100 rounded-full opacity-25 animate-blob pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-bde8482bec195583" + " " + "absolute right-8 top-20 w-64 h-64 bg-red-200 rounded-full opacity-18 animate-blob animation-delay-2500 pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                        lineNumber: 62,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-bde8482bec195583" + " " + "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-bde8482bec195583" + " " + "grid lg:grid-cols-2 gap-12 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                        delay: 60,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-bde8482bec195583",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-bde8482bec195583" + " " + "inline-flex items-center gap-3 mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                            className: "h-6 w-6 text-red-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                            lineNumber: 69,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-bde8482bec195583" + " " + "text-xs font-semibold text-red-600 uppercase",
                                                            children: "Vlogging Promotion"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                            lineNumber: 70,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                    lineNumber: 68,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "jsx-bde8482bec195583" + " " + "text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6",
                                                    children: "Grow Your Vlog — Turn Casual Viewers Into Loyal Fans"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                    lineNumber: 73,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-bde8482bec195583" + " " + "text-gray-600 max-w-2xl mb-6",
                                                    children: "Promote daily vlogs, travel diaries, lifestyle & behind-the-scenes content to viewers who binge, comment and subscribe. We optimize for watch-time, repeat views and community growth."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-bde8482bec195583" + " " + "flex flex-col sm:flex-row gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            onClick: ()=>handleWhatsApp("Vlog starter pack"),
                                                            className: "bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform",
                                                            children: "Promote My Vlog"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                            lineNumber: 83,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: "/pricing",
                                                            className: "inline-flex items-center justify-center px-6 py-4 rounded-full border border-gray-200 hover:shadow-md mt-2 sm:mt-0",
                                                            children: "See Pricing"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                            lineNumber: 87,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-bde8482bec195583" + " " + "mt-6 flex gap-6 text-sm text-gray-600",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bde8482bec195583" + " " + "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"], {
                                                                    className: "h-4 w-4 text-red-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                    lineNumber: 93,
                                                                    columnNumber: 78
                                                                }, this),
                                                                " Shorts + Long-form"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                            lineNumber: 93,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bde8482bec195583" + " " + "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                    className: "h-4 w-4 text-red-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                    lineNumber: 94,
                                                                    columnNumber: 78
                                                                }, this),
                                                                " Community-focused"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                            lineNumber: 94,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                            lineNumber: 67,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                        lineNumber: 66,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                        delay: 160,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-bde8482bec195583" + " " + "flex justify-center lg:justify-end",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-bde8482bec195583" + " " + "bg-white rounded-3xl p-6 shadow-2xl w-full max-w-md transform hover:-translate-y-3 transition",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-bde8482bec195583" + " " + "relative overflow-hidden rounded-xl",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: "/lovable-uploads/vlog-hero.png",
                                                                alt: "Vlog promotion",
                                                                className: "jsx-bde8482bec195583" + " " + "w-full h-56 object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                lineNumber: 103,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-bde8482bec195583" + " " + "absolute inset-0 flex items-center justify-center pointer-events-none",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bde8482bec195583" + " " + "bg-black/40 rounded-full p-4 animate-pulse",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                                        className: "h-8 w-8 text-white"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                        lineNumber: 106,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                    lineNumber: 105,
                                                                    columnNumber: 45
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                lineNumber: 104,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-bde8482bec195583" + " " + "mt-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-bde8482bec195583" + " " + "text-sm text-gray-500",
                                                                children: "Starter"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                lineNumber: 112,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-bde8482bec195583" + " " + "text-lg font-semibold text-gray-900",
                                                                children: "Start from ₹650"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                lineNumber: 113,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-bde8482bec195583" + " " + "text-sm text-gray-600",
                                                                children: "Perfect for daily vloggers and lifestyle creators testing content fit."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                lineNumber: 114,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-bde8482bec195583" + " " + "mt-4 flex gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        onClick: ()=>handleWhatsApp("Starter ₹650"),
                                                                        className: "bg-red-600 text-white rounded-full px-4 py-2",
                                                                        children: "Promote"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                        lineNumber: 117,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>handleWhatsApp("Need custom plan"),
                                                                        className: "jsx-bde8482bec195583" + " " + "ml-auto text-sm text-gray-500 hover:underline",
                                                                        children: "Custom plan"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                        lineNumber: 118,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                lineNumber: 116,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                        lineNumber: 111,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 101,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                            lineNumber: 100,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                lineNumber: 65,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                delay: 260,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-bde8482bec195583" + " " + "mt-12 bg-white rounded-2xl p-6 shadow-lg border border-gray-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-bde8482bec195583" + " " + "grid grid-cols-2 sm:grid-cols-4 gap-6 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-bde8482bec195583",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Counter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Counter"], {
                                                        to: 58000
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 38
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-bde8482bec195583" + " " + "text-sm text-gray-600",
                                                        children: "Creators"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 60
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 130,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-bde8482bec195583",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Counter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Counter"], {
                                                        to: 42000000
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                        lineNumber: 131,
                                                        columnNumber: 38
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-bde8482bec195583" + " " + "text-sm text-gray-600",
                                                        children: "Real Views"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                        lineNumber: 131,
                                                        columnNumber: 63
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 131,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-bde8482bec195583",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Counter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Counter"], {
                                                        to: 76000
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                        lineNumber: 132,
                                                        columnNumber: 38
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-bde8482bec195583" + " " + "text-sm text-gray-600",
                                                        children: "Campaigns Run"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                        lineNumber: 132,
                                                        columnNumber: 60
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 132,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-bde8482bec195583",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Counter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Counter"], {
                                                        to: 1300000
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 38
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-bde8482bec195583" + " " + "text-sm text-gray-600",
                                                        children: "Subs Gained"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 62
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 133,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                    lineNumber: 128,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                lineNumber: 127,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                        lineNumber: 64,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-bde8482bec195583" + " " + "py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-bde8482bec195583" + " " + "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                            delay: 80,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-bde8482bec195583" + " " + "text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center",
                                    children: "Why Vloggers Scale With Our Campaigns"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                    lineNumber: 144,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-bde8482bec195583" + " " + "text-gray-600 text-center max-w-2xl mx-auto mb-10",
                                    children: "We target binge-watchers, niche audiences, and local viewers — the ones who subscribe, comment and share your life."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                    lineNumber: 145,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                            lineNumber: 143,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-bde8482bec195583" + " " + "grid md:grid-cols-3 gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 120,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-bde8482bec195583" + " " + "p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform hover:-translate-y-2 transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-bde8482bec195583" + " " + "flex items-center gap-3 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                        className: "h-6 w-6 text-red-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 79
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "jsx-bde8482bec195583" + " " + "text-lg font-semibold",
                                                        children: "Creative Testing"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 120
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 151,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-bde8482bec195583" + " " + "text-gray-600 text-sm",
                                                children: "Multiple thumbnails and hooks to discover what drives subscriptions for your vibe."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 152,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                    lineNumber: 149,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 180,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-bde8482bec195583" + " " + "p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform hover:-translate-y-2 transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-bde8482bec195583" + " " + "flex items-center gap-3 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        className: "h-6 w-6 text-red-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 79
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "jsx-bde8482bec195583" + " " + "text-lg font-semibold",
                                                        children: "Geo & Local Reach"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 122
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 158,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-bde8482bec195583" + " " + "text-gray-600 text-sm",
                                                children: "Grow viewership in target cities, languages and communities that matter to your niche."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 159,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                        lineNumber: 157,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 240,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-bde8482bec195583" + " " + "p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform hover:-translate-y-2 transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-bde8482bec195583" + " " + "flex items-center gap-3 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2d$4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock4$3e$__["Clock4"], {
                                                        className: "h-6 w-6 text-red-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 79
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "jsx-bde8482bec195583" + " " + "text-lg font-semibold",
                                                        children: "Retention-first"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 122
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 165,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-bde8482bec195583" + " " + "text-gray-600 text-sm",
                                                children: "We optimize for watch-time and return viewers — which helps YouTube recommend your channel more."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 166,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                        lineNumber: 164,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                    lineNumber: 163,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                            lineNumber: 148,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                    lineNumber: 142,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                lineNumber: 141,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-bde8482bec195583" + " " + "py-16 bg-gray-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-bde8482bec195583" + " " + "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                            delay: 80,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "jsx-bde8482bec195583" + " " + "text-2xl font-bold text-center mb-6",
                                children: "How It Works — 4 Simple Steps"
                            }, void 0, false, {
                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                lineNumber: 177,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                            lineNumber: 176,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-bde8482bec195583" + " " + "grid md:grid-cols-4 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 120,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-bde8482bec195583" + " " + "bg-white rounded-2xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-bde8482bec195583" + " " + "w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-bde8482bec195583" + " " + "font-bold text-red-600",
                                                    children: "1"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 183,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "jsx-bde8482bec195583" + " " + "font-semibold mb-2",
                                                children: "Share your vlog link"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 186,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-bde8482bec195583" + " " + "text-sm text-gray-600",
                                                children: "Provide video or channel link and campaign brief."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 187,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 210,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-bde8482bec195583" + " " + "bg-white rounded-2xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-bde8482bec195583" + " " + "w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-bde8482bec195583" + " " + "font-bold text-red-600",
                                                    children: "2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 192,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "jsx-bde8482bec195583" + " " + "font-semibold mb-2",
                                                children: "Choose target"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 195,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-bde8482bec195583" + " " + "text-sm text-gray-600",
                                                children: "Locations, interests, and audience type."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 196,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                        lineNumber: 191,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                    lineNumber: 190,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 300,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-bde8482bec195583" + " " + "bg-white rounded-2xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-bde8482bec195583" + " " + "w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-bde8482bec195583" + " " + "font-bold text-red-600",
                                                    children: "3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 201,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "jsx-bde8482bec195583" + " " + "font-semibold mb-2",
                                                children: "We run tests"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 204,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-bde8482bec195583" + " " + "text-sm text-gray-600",
                                                children: "Creative + placement testing for retention."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 205,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                        lineNumber: 200,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                    lineNumber: 199,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 390,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-bde8482bec195583" + " " + "bg-white rounded-2xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-bde8482bec195583" + " " + "w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-bde8482bec195583" + " " + "font-bold text-red-600",
                                                    children: "4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 210,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "jsx-bde8482bec195583" + " " + "font-semibold mb-2",
                                                children: "Scale what works"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 213,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-bde8482bec195583" + " " + "text-sm text-gray-600",
                                                children: "Weekly reports and campaign scaling."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 214,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                    lineNumber: 208,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                            lineNumber: 180,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                    lineNumber: 175,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                lineNumber: 174,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-bde8482bec195583" + " " + "py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-bde8482bec195583" + " " + "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                            delay: 80,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "jsx-bde8482bec195583" + " " + "text-2xl font-bold text-center mb-6",
                                children: "Recommended Packages"
                            }, void 0, false, {
                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                lineNumber: 224,
                                columnNumber: 42
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                            lineNumber: 224,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-bde8482bec195583" + " " + "flex flex-col items-center gap-6",
                            children: viewPlans.length >= 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-bde8482bec195583" + " " + "flex justify-center gap-6 w-full flex-wrap",
                                children: viewPlans.slice(0, 3).map((plan, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-bde8482bec195583" + " " + "w-full max-w-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-bde8482bec195583" + " " + `relative rounded-2xl border-2 ${plan.borderColor || 'border-blue-200'} bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col justify-between`,
                                            children: [
                                                plan.popular && plan.badge !== "PREMIUM" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-bde8482bec195583" + " " + "absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap",
                                                    children: "MOST POPULAR"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 49
                                                }, this),
                                                plan.badge === "PREMIUM" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-bde8482bec195583" + " " + "absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap",
                                                    children: "PREMIUM"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-bde8482bec195583",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bde8482bec195583" + " " + "text-center mb-6",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: "jsx-bde8482bec195583" + " " + "text-2xl font-bold text-slate-900 mb-2",
                                                                    children: plan.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                    lineNumber: 245,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-bde8482bec195583" + " " + "flex items-center justify-center gap-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-bde8482bec195583" + " " + "text-3xl font-bold text-red-600",
                                                                        children: plan.price
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                        lineNumber: 247,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                    lineNumber: 246,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                            lineNumber: 244,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bde8482bec195583" + " " + "mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "jsx-bde8482bec195583" + " " + "text-2xl font-bold text-slate-900",
                                                                    children: plan.watchHours
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                    lineNumber: 252,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "jsx-bde8482bec195583" + " " + "text-sm text-slate-600 mt-1",
                                                                    children: "Real, High-Intent Viewers"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                    lineNumber: 253,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                            lineNumber: 251,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-bde8482bec195583" + " " + "mb-6 p-3 bg-slate-100 rounded-lg flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-bde8482bec195583" + " " + "text-sm font-semibold text-slate-700",
                                                                    children: "AI Targeting:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                    lineNumber: 257,
                                                                    columnNumber: 53
                                                                }, this),
                                                                plan.hasAI ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-bde8482bec195583" + " " + "text-green-600 font-bold text-sm",
                                                                    children: "✓ Included"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                    lineNumber: 259,
                                                                    columnNumber: 57
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-bde8482bec195583" + " " + "text-red-500 font-bold text-sm",
                                                                    children: "✗ Not Included"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                    lineNumber: 261,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                            lineNumber: 256,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                            className: "jsx-bde8482bec195583" + " " + "space-y-3 mb-6",
                                                            children: plan.features.slice(2).map((feature, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                    className: "jsx-bde8482bec195583" + " " + "flex items-start gap-2 text-sm text-slate-700",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                            className: "h-4 w-4 text-green-600 mt-0.5 flex-shrink-0"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                            lineNumber: 268,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-bde8482bec195583",
                                                                            children: feature
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                            lineNumber: 269,
                                                                            columnNumber: 61
                                                                        }, this)
                                                                    ]
                                                                }, idx, true, {
                                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                                    lineNumber: 267,
                                                                    columnNumber: 57
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                            lineNumber: 265,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    onClick: handleGetStartedClick,
                                                    className: `w-full rounded-xl py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${plan.badge === "PREMIUM" ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white" : plan.hasAI ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white" : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"}`,
                                                    children: "🚀 GET STARTED NOW"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                    lineNumber: 275,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                            lineNumber: 231,
                                            columnNumber: 41
                                        }, this)
                                    }, index, false, {
                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                        lineNumber: 230,
                                        columnNumber: 37
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                lineNumber: 228,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                            lineNumber: 226,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                    lineNumber: 223,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                lineNumber: 222,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-bde8482bec195583" + " " + "py-16 bg-gray-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-bde8482bec195583" + " " + "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                            delay: 80,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "jsx-bde8482bec195583" + " " + "text-2xl font-bold mb-6",
                                children: "Creators Who Grew With Us"
                            }, void 0, false, {
                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                lineNumber: 298,
                                columnNumber: 42
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                            lineNumber: 298,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-bde8482bec195583" + " " + "grid md:grid-cols-3 gap-6",
                            children: [
                                {
                                    ch: "DailyRohit",
                                    stat: "+11K subs",
                                    desc: "Shorts + long-form combo increased retention."
                                },
                                {
                                    ch: "FoodWalks",
                                    stat: "+7K subs",
                                    desc: "Local geo-targeting for food vlogs."
                                },
                                {
                                    ch: "HomeWithMira",
                                    stat: "+9K subs",
                                    desc: "Playlist promotion and creative testing."
                                }
                            ].map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 120 + i * 80,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-bde8482bec195583" + " " + "bg-white p-6 rounded-2xl shadow hover:-translate-y-2 transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-bde8482bec195583" + " " + "text-sm text-gray-500 mb-2",
                                                children: [
                                                    "Channel: ",
                                                    t.ch
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 308,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-bde8482bec195583" + " " + "font-semibold text-gray-900 mb-2",
                                                children: t.stat
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 309,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-bde8482bec195583" + " " + "text-sm text-gray-600",
                                                children: t.desc
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 310,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                        lineNumber: 307,
                                        columnNumber: 33
                                    }, this)
                                }, t.ch, false, {
                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                    lineNumber: 306,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                            lineNumber: 300,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                    lineNumber: 297,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                lineNumber: 296,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-bde8482bec195583" + " " + "py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-bde8482bec195583" + " " + "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                            delay: 80,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "jsx-bde8482bec195583" + " " + "text-2xl font-semibold mb-6",
                                children: "Frequently Asked Questions"
                            }, void 0, false, {
                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                lineNumber: 321,
                                columnNumber: 42
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                            lineNumber: 321,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-bde8482bec195583" + " " + "space-y-4 text-gray-700",
                            children: [
                                {
                                    q: "Will these be real viewers?",
                                    a: "Yes — campaigns use Google Ads to reach genuine YouTube users."
                                },
                                {
                                    q: "Do you promote across Shorts and long-form?",
                                    a: "Yes — we use a mix based on content and audience."
                                },
                                {
                                    q: "How soon will I see results?",
                                    a: "Initial signals appear within 48-72 hours; optimization continues over weeks."
                                }
                            ].map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 120 + i * 70,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                        className: "jsx-bde8482bec195583" + " " + "p-4 border rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                                className: "jsx-bde8482bec195583" + " " + "font-semibold cursor-pointer",
                                                children: f.q
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 331,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-bde8482bec195583" + " " + "mt-2 text-sm",
                                                children: f.a
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                                lineNumber: 332,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                        lineNumber: 330,
                                        columnNumber: 33
                                    }, this)
                                }, f.q, false, {
                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                    lineNumber: 329,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                            lineNumber: 323,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                    lineNumber: 320,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                lineNumber: 319,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-bde8482bec195583" + " " + "py-16 bg-gradient-to-br from-red-600 to-red-700 text-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-bde8482bec195583" + " " + "max-w-6xl mx-auto px-4 p-10 lg:p-12 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-bde8482bec195583",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "jsx-bde8482bec195583" + " " + "text-2xl font-bold",
                                    children: "Ready to grow your vlog with real fans?"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                    lineNumber: 344,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-bde8482bec195583" + " " + "text-sm text-red-100 mt-2",
                                    children: "Start a campaign optimized for retention, community and watch-time."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                    lineNumber: 345,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                            lineNumber: 343,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-bde8482bec195583" + " " + "flex gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: ()=>handleWhatsApp("Start vlog campaign"),
                                    className: "bg-white text-red-600 px-6 py-4 rounded-full font-semibold",
                                    children: "Start Promotion"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                    lineNumber: 349,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/pricing",
                                    className: "inline-flex items-center justify-center px-6 py-4 rounded-full border border-white/30",
                                    children: "View Plans"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                                    lineNumber: 350,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                            lineNumber: 348,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                    lineNumber: 342,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
                lineNumber: 341,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "bde8482bec195583",
                children: "@keyframes blob{0%,to{transform:translate(0)scale(1)}33%{transform:translate(30px,-40px)scale(1.05)}66%{transform:translate(-20px,20px)scale(.95)}}.animate-blob{animation:8s infinite blob}.animation-delay-2500{animation-delay:2.5s}.animate-pulse{animation:1.8s ease-in-out infinite pulse}@keyframes pulse{0%{opacity:.95;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}to{opacity:.95;transform:scale(1)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/youtube-vlogging-promotion/page.tsx",
        lineNumber: 58,
        columnNumber: 9
    }, this);
}
_s(YoutubeVloggingPromotion, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = YoutubeVloggingPromotion;
var _c;
__turbopack_context__.k.register(_c, "YoutubeVloggingPromotion");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1c876050._.js.map