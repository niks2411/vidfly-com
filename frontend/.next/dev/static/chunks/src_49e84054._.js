(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Animated.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Animated",
    ()=>Animated
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
function useInView(options) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [inView, setInView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInView.useEffect": ()=>{
            const node = ref.current;
            if (!node) return;
            const observer = new IntersectionObserver({
                "useInView.useEffect": (entries)=>{
                    entries.forEach({
                        "useInView.useEffect": (e)=>{
                            if (e.isIntersecting) {
                                setInView(true);
                                observer.unobserve(node);
                            }
                        }
                    }["useInView.useEffect"]);
                }
            }["useInView.useEffect"], {
                threshold: 0.15,
                ...options
            });
            observer.observe(node);
            return ({
                "useInView.useEffect": ()=>observer.disconnect()
            })["useInView.useEffect"];
        }
    }["useInView.useEffect"], [
        ref,
        options
    ]);
    return {
        ref,
        inView
    };
}
_s(useInView, "K+dCFMkCcTyPMHOI0MxAWPXS6Js=");
const Animated = ({ children, delay = 0, className = "" })=>{
    _s1();
    const { ref, inView } = useInView();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        style: {
            transitionDelay: `${delay}ms`
        },
        className: `${className} transform transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/Animated.tsx",
        lineNumber: 33,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(Animated, "oyd/E8SD7Fx4uOp6P7gVV2pVlaE=", false, function() {
    return [
        useInView
    ];
});
_c = Animated;
var _c;
__turbopack_context__.k.register(_c, "Animated");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/youtube-music-promotion/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>YoutubeMusicPromotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript) <export default as Youtube>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/music.js [app-client] (ecmascript) <export default as Music>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Animated.tsx [app-client] (ecmascript)");
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
function YoutubeMusicPromotion() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [videoUrl, setVideoUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isValidUrl, setIsValidUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleUrlChange = (e)=>{
        const url = e.target.value;
        setVideoUrl(url);
        const isValid = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
        setIsValidUrl(isValid);
    };
    const handlePromoteClick = ()=>{
        if (isValidUrl) {
            if (videoUrl && ("TURBOPACK compile-time value", "object") !== 'undefined') {
                sessionStorage.setItem("vidfly_promoted_video", JSON.stringify({
                    link: videoUrl,
                    timestamp: Date.now()
                }));
            }
            router.push('/campaign');
        }
    };
    const handleWhatsApp = (preset)=>{
        const text = preset ? `Promote my music: ${preset}` : "I want to promote my music video on YouTube";
        window.open(`https://wa.me/917355518761?text=${encodeURIComponent(text)}`, "_blank");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-68da8dac6f06e6dd" + " " + "min-h-screen bg-white font-montserrat",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "jsx-68da8dac6f06e6dd" + " " + "relative overflow-hidden bg-[#1a1a2e] py-16 lg:py-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-68da8dac6f06e6dd" + " " + "absolute -left-20 top-10 w-96 h-96 bg-red-600 rounded-full opacity-10 blur-3xl animate-blob pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                        lineNumber: 43,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-68da8dac6f06e6dd" + " " + "absolute right-10 bottom-10 w-80 h-80 bg-red-500 rounded-full opacity-10 blur-3xl animate-blob animation-delay-2000 pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                        lineNumber: 44,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-68da8dac6f06e6dd" + " " + "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-68da8dac6f06e6dd" + " " + "grid lg:grid-cols-2 gap-16 items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 50,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-68da8dac6f06e6dd" + " " + "space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-68da8dac6f06e6dd" + " " + "inline-block",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-68da8dac6f06e6dd" + " " + "inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            viewBox: "0 0 272 92",
                                                            className: "jsx-68da8dac6f06e6dd" + " " + "h-4 w-auto sm:h-5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    fill: "#EA4335",
                                                                    d: "M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z",
                                                                    className: "jsx-68da8dac6f06e6dd"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                    lineNumber: 53,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    fill: "#FBBC05",
                                                                    d: "M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z",
                                                                    className: "jsx-68da8dac6f06e6dd"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                    lineNumber: 54,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    fill: "#4285F4",
                                                                    d: "M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z",
                                                                    className: "jsx-68da8dac6f06e6dd"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                    lineNumber: 55,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    fill: "#34A853",
                                                                    d: "M225 3v65h-9.5V3h9.5z",
                                                                    className: "jsx-68da8dac6f06e6dd"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                    lineNumber: 56,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    fill: "#EA4335",
                                                                    d: "M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z",
                                                                    className: "jsx-68da8dac6f06e6dd"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                    lineNumber: 57,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    fill: "#4285F4",
                                                                    d: "M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z",
                                                                    className: "jsx-68da8dac6f06e6dd"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                    lineNumber: 58,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                            lineNumber: 52,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-68da8dac6f06e6dd" + " " + "text-white font-medium text-xs sm:text-sm",
                                                            children: "Premier Partner"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                            lineNumber: 60,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                    lineNumber: 51,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 50,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "jsx-68da8dac6f06e6dd" + " " + "text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-68da8dac6f06e6dd" + " " + "text-white mb-2 whitespace-nowrap",
                                                        children: "YouTube Music Video"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 65,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-68da8dac6f06e6dd" + " " + "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-68da8dac6f06e6dd" + " " + "bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent font-extrabold",
                                                                children: "Promotion"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                lineNumber: 67,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-68da8dac6f06e6dd" + " " + "text-white",
                                                                children: "Service"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                lineNumber: 70,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 66,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 64,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-68da8dac6f06e6dd" + " " + "text-gray-400 text-base lg:text-lg leading-relaxed max-w-lg",
                                                children: [
                                                    "Reach thousands of targeted real music fans",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                        className: "jsx-68da8dac6f06e6dd"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 75,
                                                        columnNumber: 80
                                                    }, this),
                                                    "with your YouTube video!"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 74,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-68da8dac6f06e6dd" + " " + "pt-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-68da8dac6f06e6dd" + " " + `bg-white rounded-full p-1 pl-4 flex items-center gap-2 w-full max-w-[380px] transition-all duration-300 ring-2 ${isValidUrl ? 'ring-red-500/50 shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)]' : 'ring-transparent focus-within:ring-red-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)]'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-68da8dac6f06e6dd" + " " + "flex items-center gap-2 flex-1 py-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__["Youtube"], {
                                                                    className: `h-4 w-4 flex-shrink-0 transition-colors ${isValidUrl ? 'text-red-600' : 'text-gray-400'}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                    lineNumber: 82,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    value: videoUrl,
                                                                    onChange: handleUrlChange,
                                                                    placeholder: "Enter your YouTube video URL",
                                                                    className: "jsx-68da8dac6f06e6dd" + " " + "flex-1 border-0 focus:outline-none text-sm bg-transparent placeholder:text-gray-400 text-gray-900 min-w-0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                    lineNumber: 83,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                            lineNumber: 81,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            disabled: !isValidUrl,
                                                            onClick: handlePromoteClick,
                                                            className: "jsx-68da8dac6f06e6dd" + " " + `px-5 py-2 rounded-full font-bold text-xs transition-all duration-300 whitespace-nowrap ${isValidUrl ? 'bg-red-600 text-white shadow-lg shadow-red-500/30 hover:bg-red-700 hover:scale-105 cursor-pointer transform translate-x-0 opacity-100 w-auto' : 'bg-gray-100 text-gray-400 cursor-not-allowed hidden sm:block opacity-0 w-0 p-0 overflow-hidden translate-x-4'}`,
                                                            children: "Promote Now"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                            lineNumber: 91,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 79,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-68da8dac6f06e6dd" + " " + "space-y-4 pt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-68da8dac6f06e6dd" + " " + "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-68da8dac6f06e6dd" + " " + "flex items-center justify-center w-5 h-5 rounded-full bg-gray-700/50",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                    className: "h-3.5 w-3.5 text-green-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                    lineNumber: 107,
                                                                    columnNumber: 45
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                lineNumber: 106,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-68da8dac6f06e6dd" + " " + "text-gray-300 text-sm",
                                                                children: "Legal. We use YouTube Ads only"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                lineNumber: 109,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 105,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-68da8dac6f06e6dd" + " " + "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-68da8dac6f06e6dd" + " " + "flex items-center justify-center w-5 h-5 rounded-full bg-gray-700/50",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                    className: "h-3.5 w-3.5 text-green-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                    lineNumber: 113,
                                                                    columnNumber: 45
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                lineNumber: 112,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-68da8dac6f06e6dd" + " " + "text-gray-300 text-sm",
                                                                children: "Start as low as ₹999"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                lineNumber: 115,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 111,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-68da8dac6f06e6dd" + " " + "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-68da8dac6f06e6dd" + " " + "flex items-center justify-center w-5 h-5 rounded-full bg-gray-700/50",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                    className: "h-3.5 w-3.5 text-green-400"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                    lineNumber: 119,
                                                                    columnNumber: 45
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                lineNumber: 118,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-68da8dac6f06e6dd" + " " + "text-gray-300 text-sm",
                                                                children: "Real followers, views, likes and comments"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                lineNumber: 121,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 117,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 104,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                        lineNumber: 49,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 48,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 150,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-68da8dac6f06e6dd" + " " + "flex justify-center lg:justify-end overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-68da8dac6f06e6dd" + " " + "relative w-full max-w-md",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: "/lovable-uploads/music.png",
                                                alt: "Music Promotion Visualization",
                                                className: "jsx-68da8dac6f06e6dd" + " " + "w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-700"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 130,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 129,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                        lineNumber: 128,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 127,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                            lineNumber: 47,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                        lineNumber: 46,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                lineNumber: 42,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-68da8dac6f06e6dd" + " " + "py-20 bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-68da8dac6f06e6dd" + " " + "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-68da8dac6f06e6dd" + " " + "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                delay: 100,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-68da8dac6f06e6dd" + " " + "flex justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-68da8dac6f06e6dd" + " " + "relative w-72 h-72 xs:w-80 xs:h-80 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                viewBox: "0 0 300 300",
                                                className: "jsx-68da8dac6f06e6dd" + " " + "absolute inset-0 w-full h-full animate-spin-slow",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                        className: "jsx-68da8dac6f06e6dd",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            id: "circlePath",
                                                            d: "M 150, 150 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0",
                                                            className: "jsx-68da8dac6f06e6dd"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                            lineNumber: 151,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 150,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                        fill: "#9333ea",
                                                        fontWeight: "600",
                                                        fontSize: "15",
                                                        className: "jsx-68da8dac6f06e6dd",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textPath", {
                                                            href: "#circlePath",
                                                            startOffset: "0%",
                                                            className: "jsx-68da8dac6f06e6dd",
                                                            children: "promote your music videos to millions of people • promote your music videos to millions of people •"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                            lineNumber: 154,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 149,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-68da8dac6f06e6dd" + " " + "absolute inset-16 xs:inset-20 sm:inset-24 lg:inset-28 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-68da8dac6f06e6dd" + " " + "flex items-center gap-2 px-3 py-2 bg-gray-100 border-b border-gray-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-68da8dac6f06e6dd" + " " + "flex gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-68da8dac6f06e6dd" + " " + "w-2 h-2 rounded-full bg-red-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                        lineNumber: 162,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-68da8dac6f06e6dd" + " " + "w-2 h-2 rounded-full bg-yellow-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                        lineNumber: 163,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-68da8dac6f06e6dd" + " " + "w-2 h-2 rounded-full bg-green-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                        lineNumber: 164,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                lineNumber: 161,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__["Youtube"], {
                                                                className: "h-3 w-3 text-red-600 ml-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                lineNumber: 166,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-68da8dac6f06e6dd" + " " + "text-[10px] text-gray-500 font-medium",
                                                                children: "YouTube"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                lineNumber: 167,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-68da8dac6f06e6dd" + " " + "flex-1 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: "/lovable-uploads/music-thumbnail.png",
                                                                alt: "Music video thumbnail",
                                                                className: "jsx-68da8dac6f06e6dd" + " " + "w-full h-full object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                lineNumber: 170,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-68da8dac6f06e6dd" + " " + "absolute inset-0 flex items-center justify-center",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-68da8dac6f06e6dd" + " " + "w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                                        className: "h-5 w-5 text-white fill-white ml-0.5"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                        lineNumber: 177,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                    lineNumber: 176,
                                                                    columnNumber: 49
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                                lineNumber: 175,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 159,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 147,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                lineNumber: 146,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                delay: 200,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-68da8dac6f06e6dd" + " " + "space-y-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-68da8dac6f06e6dd" + " " + "text-2xl lg:text-3xl font-bold text-gray-900 leading-tight",
                                            children: [
                                                "What is a YouTube music",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                    className: "jsx-68da8dac6f06e6dd"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 60
                                                }, this),
                                                "video promotion"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 188,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-68da8dac6f06e6dd" + " " + "text-gray-600 text-sm leading-relaxed",
                                            children: "The Music industry has changed tremendously over the years. In order to remain competitive in today's market, you must grow visibility on YouTube. That's where we come in! Vidflyy helps music artists from any genre promote their music. We help major and indie artists focus on presenting their content to audiences who may be interested. We help you run structured campaigns for your music videos."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 191,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-68da8dac6f06e6dd",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/get-started",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    className: "bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full text-sm font-semibold",
                                                    children: "Start your promotion now"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 195,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 194,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-68da8dac6f06e6dd" + " " + "flex flex-wrap gap-6 pt-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-68da8dac6f06e6dd" + " " + "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            className: "h-4 w-4 text-red-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                            lineNumber: 203,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-68da8dac6f06e6dd" + " " + "text-xs text-gray-600",
                                                            children: "We only use YouTube Ads"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                            lineNumber: 204,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-68da8dac6f06e6dd" + " " + "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            className: "h-4 w-4 text-red-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                            lineNumber: 207,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-68da8dac6f06e6dd" + " " + "text-xs text-gray-600",
                                                            children: "Start as low as ₹999"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                            lineNumber: 208,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-68da8dac6f06e6dd" + " " + "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            className: "h-4 w-4 text-red-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-68da8dac6f06e6dd" + " " + "text-xs text-gray-600",
                                                            children: "Relevant audiences"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                            lineNumber: 212,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 201,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 187,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                lineNumber: 186,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                        lineNumber: 145,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                    lineNumber: 144,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                lineNumber: 143,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-68da8dac6f06e6dd" + " " + "py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-68da8dac6f06e6dd" + " " + "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                            delay: 60,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-68da8dac6f06e6dd" + " " + "text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center",
                                    children: "Why Music Promotion Works"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 225,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-68da8dac6f06e6dd" + " " + "text-gray-600 text-center max-w-2xl mx-auto mb-10",
                                    children: "We combine YouTube ad placements with music-focused targeting to reach listeners that convert into subscribers and playlist followers."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 226,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                            lineNumber: 224,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-68da8dac6f06e6dd" + " " + "grid md:grid-cols-3 gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 120,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-68da8dac6f06e6dd" + " " + "p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform transition hover:-translate-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-68da8dac6f06e6dd" + " " + "flex items-center gap-3 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"], {
                                                        className: "h-6 w-6 text-red-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 232,
                                                        columnNumber: 79
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "jsx-68da8dac6f06e6dd" + " " + "text-lg font-semibold",
                                                        children: "Genre & Mood Targeting"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 232,
                                                        columnNumber: 121
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 232,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-68da8dac6f06e6dd" + " " + "text-gray-600 text-sm",
                                                children: "Reach listeners by genre (EDM, Indie, Hip-hop) and mood (chill, workout, study)."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 233,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                        lineNumber: 231,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 230,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 180,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-68da8dac6f06e6dd" + " " + "p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform transition hover:-translate-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-68da8dac6f06e6dd" + " " + "flex items-center gap-3 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                        className: "h-6 w-6 text-red-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 238,
                                                        columnNumber: 79
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "jsx-68da8dac6f06e6dd" + " " + "text-lg font-semibold",
                                                        children: "Smart Placements"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 238,
                                                        columnNumber: 120
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 238,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-68da8dac6f06e6dd" + " " + "text-gray-600 text-sm",
                                                children: "In-stream, in-feed, and recommended placements tuned to music listeners increase discovery & saves."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 239,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                        lineNumber: 237,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 236,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 240,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-68da8dac6f06e6dd" + " " + "p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform transition hover:-translate-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-68da8dac6f06e6dd" + " " + "flex items-center gap-3 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                        className: "h-6 w-6 text-red-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 244,
                                                        columnNumber: 79
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "jsx-68da8dac6f06e6dd" + " " + "text-lg font-semibold",
                                                        children: "Fan Conversion"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 244,
                                                        columnNumber: 127
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 244,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-68da8dac6f06e6dd" + " " + "text-gray-600 text-sm",
                                                children: "Focus on long-term subscribers and playlist adds — not just one-time views."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 245,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                        lineNumber: 243,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 242,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                            lineNumber: 229,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                    lineNumber: 223,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                lineNumber: 222,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-68da8dac6f06e6dd" + " " + "py-20 bg-[#1a1a2e]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-68da8dac6f06e6dd" + " " + "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                            delay: 60,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "jsx-68da8dac6f06e6dd" + " " + "text-2xl lg:text-3xl font-bold text-white mb-16 text-center",
                                children: "How Vidflyy music promotion works"
                            }, void 0, false, {
                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                lineNumber: 256,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                            lineNumber: 255,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-68da8dac6f06e6dd" + " " + "grid grid-cols-2 lg:flex lg:flex-row items-start justify-center gap-y-12 lg:gap-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 100,
                                    className: "flex flex-col items-center text-center px-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-68da8dac6f06e6dd" + " " + "relative w-14 h-14 lg:w-16 lg:h-16 mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-68da8dac6f06e6dd" + " " + "absolute inset-0 rounded-full bg-gradient-to-tr from-red-500 via-pink-500 to-purple-500 p-[2px]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-68da8dac6f06e6dd" + " " + "w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-68da8dac6f06e6dd" + " " + "text-white font-bold text-lg",
                                                        children: "1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 264,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 263,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "jsx-68da8dac6f06e6dd" + " " + "text-white font-semibold text-sm lg:text-base mb-2",
                                            children: "Setup"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 270,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-68da8dac6f06e6dd" + " " + "text-gray-400 text-xs leading-relaxed max-w-[140px] lg:max-w-[180px]",
                                            children: "Add your YouTube music video, choose your budget and targeting."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 271,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 262,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-68da8dac6f06e6dd" + " " + "hidden lg:flex items-center justify-center pt-6 px-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-68da8dac6f06e6dd" + " " + "text-gray-500 text-xl",
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                        lineNumber: 276,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 275,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 200,
                                    className: "flex flex-col items-center text-center px-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-68da8dac6f06e6dd" + " " + "relative w-14 h-14 lg:w-16 lg:h-16 mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-68da8dac6f06e6dd" + " " + "absolute inset-0 rounded-full bg-gradient-to-tr from-red-500 via-pink-500 to-purple-500 p-[2px]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-68da8dac6f06e6dd" + " " + "w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-68da8dac6f06e6dd" + " " + "text-white font-bold text-lg",
                                                        children: "2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 282,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                    lineNumber: 281,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 280,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 279,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "jsx-68da8dac6f06e6dd" + " " + "text-white font-semibold text-sm lg:text-base mb-2",
                                            children: "Payment"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 286,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-68da8dac6f06e6dd" + " " + "text-gray-400 text-xs leading-relaxed max-w-[140px] lg:max-w-[180px]",
                                            children: "Pay securely with credit cards or UPI."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 287,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 278,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-68da8dac6f06e6dd" + " " + "hidden lg:flex items-center justify-center pt-6 px-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-68da8dac6f06e6dd" + " " + "text-gray-500 text-xl",
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 291,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 300,
                                    className: "flex flex-col items-center text-center px-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-68da8dac6f06e6dd" + " " + "relative w-14 h-14 lg:w-16 lg:h-16 mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-68da8dac6f06e6dd" + " " + "absolute inset-0 rounded-full bg-gradient-to-tr from-red-500 via-pink-500 to-purple-500 p-[2px]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-68da8dac6f06e6dd" + " " + "w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-68da8dac6f06e6dd" + " " + "text-white font-bold text-lg",
                                                        children: "3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 298,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                    lineNumber: 297,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 296,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 295,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "jsx-68da8dac6f06e6dd" + " " + "text-white font-semibold text-sm lg:text-base mb-2",
                                            children: "Promotion"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 302,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-68da8dac6f06e6dd" + " " + "text-gray-400 text-xs leading-relaxed max-w-[140px] lg:max-w-[180px]",
                                            children: "Your video is shown to interested audiences."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 303,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 294,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-68da8dac6f06e6dd" + " " + "hidden lg:flex items-center justify-center pt-6 px-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-68da8dac6f06e6dd" + " " + "text-gray-500 text-xl",
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                        lineNumber: 308,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 307,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Animated$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Animated"], {
                                    delay: 400,
                                    className: "flex flex-col items-center text-center px-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-68da8dac6f06e6dd" + " " + "relative w-14 h-14 lg:w-16 lg:h-16 mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-68da8dac6f06e6dd" + " " + "absolute inset-0 rounded-full bg-gradient-to-tr from-red-500 via-pink-500 to-purple-500 p-[2px]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-68da8dac6f06e6dd" + " " + "w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-68da8dac6f06e6dd" + " " + "text-white font-bold text-lg",
                                                        children: "4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                                lineNumber: 312,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 311,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "jsx-68da8dac6f06e6dd" + " " + "text-white font-semibold text-sm lg:text-base mb-2",
                                            children: "Results"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 318,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-68da8dac6f06e6dd" + " " + "text-gray-400 text-xs leading-relaxed max-w-[140px] lg:max-w-[180px]",
                                            children: "Track performance in your Vidflyy dashboard."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                            lineNumber: 319,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 310,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                            lineNumber: 261,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                    lineNumber: 254,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                lineNumber: 253,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-68da8dac6f06e6dd" + " " + "py-16 bg-gradient-to-br from-red-600 to-red-700 text-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-68da8dac6f06e6dd" + " " + "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-68da8dac6f06e6dd",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "jsx-68da8dac6f06e6dd" + " " + "text-2xl font-bold",
                                    children: "Ready to get real listeners for your music?"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 331,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-68da8dac6f06e6dd" + " " + "text-sm text-red-100 mt-2",
                                    children: "Start a campaign optimized for streams, playlist adds & long-term subscribers."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 332,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                            lineNumber: 330,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-68da8dac6f06e6dd" + " " + "flex gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: ()=>handleWhatsApp("Start music campaign"),
                                    className: "bg-white text-red-600 px-6 py-4 rounded-full font-semibold",
                                    children: "Start Promotion"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 335,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/pricing",
                                    className: "inline-flex items-center justify-center px-6 py-4 rounded-full border border-white/30",
                                    children: "View Plans"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                                    lineNumber: 336,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                            lineNumber: 334,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                    lineNumber: 329,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
                lineNumber: 328,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "68da8dac6f06e6dd",
                children: "@keyframes blob{0%,to{transform:translate(0)scale(1)}33%{transform:translate(30px,-40px)scale(1.05)}66%{transform:translate(-20px,20px)scale(.95)}}.animate-blob{animation:8s infinite blob}.animation-delay-2000{animation-delay:2s}@keyframes spin-slow{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.animate-spin-slow{animation:15s linear infinite spin-slow}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/youtube-music-promotion/page.tsx",
        lineNumber: 40,
        columnNumber: 9
    }, this);
}
_s(YoutubeMusicPromotion, "d6UX9/GYjSzmPTpKJOhI4wzgzoo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = YoutubeMusicPromotion;
var _c;
__turbopack_context__.k.register(_c, "YoutubeMusicPromotion");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_49e84054._.js.map