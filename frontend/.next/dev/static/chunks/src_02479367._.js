(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Input;
Input.displayName = "Input";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AdPreviewModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const AdPreviewModal = ({ isOpen, onClose, video, viewCount = "829,953" })=>{
    _s();
    const [adType, setAdType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("search");
    const adTitle = video.title.split("|")[0]?.trim() || video.title;
    const channelName = video.author?.trim() || "Your Channel";
    const viewsLabel = viewCount || "829,953";
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-4 animate-scale-in",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between p-6 border-b border-slate-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-slate-900",
                            children: "How will your Ad look like?"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-6 w-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdPreviewModal.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 space-y-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-inner flex flex-col gap-6 h-[460px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 pb-4 border-b border-slate-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1 rounded-lg bg-white border border-red-600 px-3 py-1 shadow-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        viewBox: "0 0 24 24",
                                                        className: "w-6 h-6 text-red-600",
                                                        fill: "currentColor",
                                                        "aria-hidden": "true",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8Z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                lineNumber: 60,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "m9.75 15.02 6-3.02-6-3.02Z",
                                                                fill: "#fff"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                lineNumber: 61,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                        lineNumber: 54,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-lg font-semibold text-slate-900",
                                                        children: "YouTube"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                        lineNumber: 63,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                lineNumber: 53,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                            lineNumber: 52,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 bg-white border border-slate-300 rounded-full px-4 py-2 text-sm text-slate-500",
                                            children: "Search YouTube"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 flex",
                                    children: [
                                        adType === "search" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full flex flex-col gap-4 h-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: video.thumbnail,
                                                                alt: adTitle,
                                                                className: "w-48 h-28 rounded-xl object-cover border border-slate-200"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                lineNumber: 77,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[9px] font-bold",
                                                                                children: "AD"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                                lineNumber: 84,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            " Sponsored"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                        lineNumber: 83,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "text-base font-semibold text-slate-900 mt-2 line-clamp-2",
                                                                        children: adTitle
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                        lineNumber: 86,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-slate-600 mt-1",
                                                                        children: channelName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                        lineNumber: 89,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-slate-500 mt-1",
                                                                        children: [
                                                                            viewsLabel,
                                                                            " views"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                        lineNumber: 90,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                lineNumber: 82,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3 flex-1",
                                                    children: [
                                                        1,
                                                        2,
                                                        3
                                                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-12 rounded-xl bg-gradient-to-r from-slate-200/70 to-slate-100"
                                                        }, i, false, {
                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                            lineNumber: 96,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                    lineNumber: 94,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                            lineNumber: 74,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        adType === "related" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full flex gap-6 h-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 space-y-4 flex flex-col",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative w-full rounded-2xl bg-slate-200 aspect-video overflow-hidden border border-slate-200",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: video.thumbnail,
                                                                    alt: adTitle,
                                                                    className: "w-full h-full object-cover"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                    lineNumber: 109,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute bottom-0 left-0 right-0 h-1 bg-red-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                    lineNumber: 114,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                            lineNumber: 108,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-4 bg-slate-200 rounded w-2/3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                    lineNumber: 117,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-3 bg-slate-200 rounded w-1/3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                    lineNumber: 118,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-3 bg-slate-100 rounded w-full"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                    lineNumber: 119,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                            lineNumber: 116,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1 space-y-3",
                                                            children: [
                                                                1,
                                                                2
                                                            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-16 bg-slate-100 rounded-xl"
                                                                }, i, false, {
                                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                    lineNumber: 123,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                            lineNumber: 121,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-64 space-y-3 overflow-hidden",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl shadow-md",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "relative flex-shrink-0",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                            src: video.thumbnail,
                                                                            alt: adTitle,
                                                                            className: "w-28 h-18 rounded-xl object-cover"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                            lineNumber: 130,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "absolute top-1 left-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded",
                                                                            children: "AD"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                            lineNumber: 135,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded",
                                                                            children: "10:30"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                            lineNumber: 138,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                    lineNumber: 129,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "font-semibold text-slate-900 line-clamp-2",
                                                                            children: adTitle
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                            lineNumber: 143,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-slate-600 mt-1",
                                                                            children: channelName
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                            lineNumber: 144,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-slate-500 mt-1",
                                                                            children: [
                                                                                viewsLabel,
                                                                                " views"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                            lineNumber: 145,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                    lineNumber: 142,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                            lineNumber: 128,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        [
                                                            1,
                                                            2,
                                                            3
                                                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-28 h-18 bg-slate-200 rounded-xl"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                        lineNumber: 150,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex-1 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-3 bg-slate-200 rounded"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                                lineNumber: 152,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-2 bg-slate-200 rounded w-3/4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                                lineNumber: 153,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-2 bg-slate-100 rounded w-1/2"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                                lineNumber: 154,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                        lineNumber: 151,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, i, true, {
                                                                fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                lineNumber: 149,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                            lineNumber: 106,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        adType === "commercial" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full flex flex-col gap-4 h-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative w-full rounded-3xl overflow-hidden bg-black shadow-xl flex-1 min-h-[260px] max-h-[280px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: video.thumbnail,
                                                            alt: adTitle,
                                                            className: "w-full h-full object-contain opacity-90"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                            lineNumber: 165,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 flex items-center justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-20 h-20 bg-white/30 border-2 border-white/50 rounded-full flex items-center justify-center backdrop-blur",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "w-10 h-10 text-white ml-1",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: "currentColor",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M8 5v14l11-7z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                        lineNumber: 173,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                    lineNumber: 172,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                lineNumber: 171,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                            lineNumber: 170,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-semibold",
                                                            children: adTitle
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                            lineNumber: 177,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute bottom-4 right-4 bg-white/90 text-slate-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg",
                                                            children: "Skip Ad"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                            lineNumber: 180,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-xs flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "inline-block w-2 h-2 bg-white rounded-sm"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                    lineNumber: 184,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                "0:03 / 0:15"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                            lineNumber: 183,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute bottom-0 left-0 right-0 h-1 bg-red-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                            lineNumber: 187,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between text-sm text-slate-600",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-semibold text-slate-900",
                                                                    children: channelName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                    lineNumber: 191,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs",
                                                                    children: [
                                                                        viewsLabel,
                                                                        " views"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                    lineNumber: 192,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                            lineNumber: 190,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-3 text-xs",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "px-3 py-1 rounded-full border border-slate-200 bg-white",
                                                                    children: "Like"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                    lineNumber: 195,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "px-3 py-1 rounded-full border border-slate-200 bg-white",
                                                                    children: "Share"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                                    lineNumber: 196,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                            lineNumber: 194,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                            lineNumber: 163,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 border-b border-slate-200",
                            children: [
                                {
                                    key: "search",
                                    label: "YouTube Search"
                                },
                                {
                                    key: "related",
                                    label: "YouTube Related"
                                },
                                {
                                    key: "commercial",
                                    label: "As a Commercial"
                                }
                            ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setAdType(tab.key),
                                    className: `pb-3 px-4 text-sm font-semibold transition-colors relative ${adType === tab.key ? "text-red-600" : "text-slate-500 hover:text-slate-700"}`,
                                    children: [
                                        tab.label,
                                        adType === tab.key && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                                            lineNumber: 221,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, tab.key, true, {
                                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                                    lineNumber: 211,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdPreviewModal.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AdPreviewModal.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AdPreviewModal.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/AdPreviewModal.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AdPreviewModal, "jP3GDcnYsG045tn+ZIW+qafKOz0=");
_c = AdPreviewModal;
const __TURBOPACK__default__export__ = AdPreviewModal;
var _c;
__turbopack_context__.k.register(_c, "AdPreviewModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/verifiedEmail.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearVerifiedEmail",
    ()=>clearVerifiedEmail,
    "getSelectedChannelKey",
    ()=>getSelectedChannelKey,
    "getVerifiedEmail",
    ()=>getVerifiedEmail,
    "saveVerifiedEmail",
    ()=>saveVerifiedEmail
]);
const STORAGE_KEY = "vidfly_verified_email";
const saveVerifiedEmail = (email)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const normalized = email.trim().toLowerCase();
    if (!normalized) return;
    try {
        // Store in sessionStorage for backward compatibility
        sessionStorage.setItem(STORAGE_KEY, normalized);
        // Also store in localStorage for cross-tab sync (as per GPT suggestion)
        localStorage.setItem("logged_user_email", normalized);
    } catch (err) {
        console.warn("Unable to store verified email", err);
    }
};
const getVerifiedEmail = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const value = sessionStorage.getItem(STORAGE_KEY);
        return value ? value.trim().toLowerCase() : undefined;
    } catch (err) {
        console.warn("Unable to read verified email", err);
        return undefined;
    }
};
const clearVerifiedEmail = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        sessionStorage.removeItem(STORAGE_KEY);
    } catch (err) {
        console.warn("Unable to clear verified email", err);
    }
};
const getSelectedChannelKey = ()=>{
    const email = getVerifiedEmail();
    if (email) {
        return `channel_${email}`;
    }
    // Fallback: try to get from localStorage directly
    const loggedEmail = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("logged_user_email") : "TURBOPACK unreachable";
    if (loggedEmail) {
        return `channel_${loggedEmail}`;
    }
    return "channel_default"; // Fallback for backward compatibility
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CampaignSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3x3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-client] (ecmascript) <export default as Grid3x3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [app-client] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const CampaignSidebar = ({ active = "promote", onNavigate: onNavigateCallback, isMobile = false })=>{
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const sections = [
        {
            title: "PROMOTION",
            items: [
                {
                    label: "Promote Video / Short",
                    path: "/campaign",
                    key: "promote",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"]
                },
                {
                    label: "Promote Channel",
                    path: "/campaign/channel",
                    key: "channel",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
                },
                {
                    label: "My Campaigns",
                    path: "/campaign/my-campaigns",
                    key: "campaigns",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3x3$3e$__["Grid3x3"]
                },
                {
                    label: "Buy Packages",
                    path: "/campaign/packages",
                    key: "packages",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"]
                },
                {
                    label: "Buy Bulk Views",
                    path: "/campaign/bulk-views",
                    key: "bulk",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"]
                },
                {
                    label: "Free Views",
                    path: "/campaign/free-views",
                    key: "free",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"]
                }
            ]
        },
        {
            title: "STRATEGY PATH",
            description: "Jump between critical campaign steps.",
            items: [
                {
                    label: "Enter Link",
                    path: "/campaign",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"]
                },
                {
                    label: "Select Videos",
                    path: "/campaign",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"]
                },
                {
                    label: "Budget & Targeting",
                    path: "/campaign/budget",
                    key: "budget",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"]
                },
                {
                    label: "Payment",
                    path: "/campaign/payment",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"]
                }
            ]
        }
    ];
    const handleNavigate = (path)=>{
        if (!path) return;
        router.push(path);
        // Call the callback to close mobile menu if provided
        if (onNavigateCallback) {
            onNavigateCallback();
        }
    };
    const isActive = (item)=>{
        if (item.key && item.key === active) return true;
        if (!item.key && item.path === pathname) return true;
        return false;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("lg:w-64 bg-white h-full lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto", isMobile ? "w-full" : "p-6"),
        children: sections.map((section, sectionIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(sectionIndex === 0 ? "mb-6" : "mb-8", section.title === "STRATEGY PATH" && "hidden lg:block"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-500 uppercase tracking-wide font-semibold",
                                children: section.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/CampaignSidebar.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            section.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-400 mt-1",
                                children: section.description
                            }, void 0, false, {
                                fileName: "[project]/src/components/CampaignSidebar.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CampaignSidebar.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-1",
                        children: section.items.map((item)=>{
                            const active = isActive(item);
                            const Icon = item.icon;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>handleNavigate(item.path),
                                    disabled: !item.path,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3", item.path ? active ? "bg-red-100 text-red-700 border border-red-200" : "hover:bg-slate-50 text-slate-600" : "text-slate-300 cursor-not-allowed"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-5 w-5 flex-shrink-0", active ? "text-red-700" : "text-slate-500")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CampaignSidebar.tsx",
                                            lineNumber: 106,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-1",
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CampaignSidebar.tsx",
                                            lineNumber: 110,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CampaignSidebar.tsx",
                                    lineNumber: 93,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            }, item.label, false, {
                                fileName: "[project]/src/components/CampaignSidebar.tsx",
                                lineNumber: 92,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/CampaignSidebar.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    sectionIndex === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-slate-200 mt-6 pt-6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CampaignSidebar.tsx",
                        lineNumber: 117,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, section.title, true, {
                fileName: "[project]/src/components/CampaignSidebar.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/src/components/CampaignSidebar.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CampaignSidebar, "0h+B63IiVHeDT9bDhB3JTwv8ebY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CampaignSidebar;
const __TURBOPACK__default__export__ = CampaignSidebar;
var _c;
__turbopack_context__.k.register(_c, "CampaignSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CampaignLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CampaignSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CampaignSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$campaign$2d$sidebar$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/campaign-sidebar-provider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const CampaignLayout = ({ children, activeSidebar = "promote", className })=>{
    _s();
    const sidebarContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$campaign$2d$sidebar$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCampaignSidebar"])();
    const isSidebarOpen = sidebarContext?.isSidebarOpen || false;
    const setIsSidebarOpen = sidebarContext?.setIsSidebarOpen || (()=>{});
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen font-montserrat",
        children: [
            isSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden fixed inset-0 bg-black/50 z-40 top-[108px]",
                onClick: ()=>setIsSidebarOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/CampaignLayout.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("lg:hidden fixed top-[108px] right-0 h-[calc(100vh-108px)] w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto", isSidebarOpen ? "translate-x-0" : "translate-x-full"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-red-600",
                                children: "Campaign Menu"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CampaignLayout.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsSidebarOpen(false),
                                className: "text-slate-500 hover:text-red-600 transition-colors",
                                "aria-label": "Close menu",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CampaignLayout.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/CampaignLayout.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/CampaignLayout.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CampaignSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            active: activeSidebar,
                            onNavigate: ()=>setIsSidebarOpen(false),
                            isMobile: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/CampaignLayout.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/CampaignLayout.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CampaignLayout.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col lg:flex-row min-h-[calc(100vh-72px)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden lg:block border-r border-slate-200 flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CampaignSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            active: activeSidebar
                        }, void 0, false, {
                            fileName: "[project]/src/components/CampaignLayout.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/CampaignLayout.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-1 space-y-6 w-full max-w-7xl mx-auto px-4 lg:px-8 py-10", className),
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/CampaignLayout.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CampaignLayout.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CampaignLayout.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CampaignLayout, "Ktgf1Xe7zjC/DWcjsZWix4rdHds=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$campaign$2d$sidebar$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCampaignSidebar"]
    ];
});
_c = CampaignLayout;
const __TURBOPACK__default__export__ = CampaignLayout;
var _c;
__turbopack_context__.k.register(_c, "CampaignLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AddChannelModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const API_BASE_URL = (("TURBOPACK compile-time value", "http://localhost:5000") || "").replace(/\/$/, "");
const AddChannelModal = ({ isOpen, onClose, onChannelAdded })=>{
    _s();
    const [channelInput, setChannelInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleSubmit = async (e)=>{
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
            const isChannelUrl = normalizedInput.includes("youtube.com/channel/") || normalizedInput.includes("youtube.com/@") || normalizedInput.includes("youtube.com/c/") || normalizedInput.includes("youtube.com/user/");
            let channelInfo;
            if (isVideoUrl) {
                // Fetch video info first to get channelId
                const videoResponse = await fetch(`${API_BASE_URL}/api/youtube/info`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        url: normalizedInput
                    }),
                    credentials: "include"
                });
                if (!videoResponse.ok) {
                    const errorData = await videoResponse.json().catch(()=>({}));
                    throw new Error(errorData?.message || "Could not fetch video information");
                }
                const videoData = await videoResponse.json();
                if (!videoData.channelId) {
                    throw new Error("Could not extract channel ID from video");
                }
                // Now fetch channel info using the channelId
                const channelResponse = await fetch(`${API_BASE_URL}/api/youtube/channel-info?channelId=${encodeURIComponent(videoData.channelId)}`, {
                    credentials: "include"
                });
                if (!channelResponse.ok) {
                    const errorData = await channelResponse.json().catch(()=>({}));
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
                    const channelResponse = await fetch(`${API_BASE_URL}/api/youtube/channel-info?channelId=${encodeURIComponent(channelId)}`, {
                        credentials: "include"
                    });
                    if (!channelResponse.ok) {
                        const errorData = await channelResponse.json().catch(()=>({}));
                        throw new Error(errorData?.message || "Could not fetch channel information");
                    }
                    channelInfo = await channelResponse.json();
                } else {
                    // For @username or /c/ or /user/ formats, use videoUrl approach
                    // The backend will search for the channel
                    const channelResponse = await fetch(`${API_BASE_URL}/api/youtube/channel-info?videoUrl=${encodeURIComponent(normalizedInput)}`, {
                        credentials: "include"
                    });
                    if (!channelResponse.ok) {
                        const errorData = await channelResponse.json().catch(()=>({}));
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
                    const channelResponse = await fetch(`${API_BASE_URL}/api/youtube/channel-info?channelId=${encodeURIComponent(normalizedInput)}`, {
                        credentials: "include"
                    });
                    if (channelResponse.ok) {
                        channelInfo = await channelResponse.json();
                    } else {
                        const errorData = await channelResponse.json().catch(()=>({}));
                        throw new Error(errorData?.message || "Invalid channel ID. Please enter a valid YouTube channel URL or video URL");
                    }
                } else {
                    // This should not happen if normalization worked correctly, but handle it anyway
                    // Try as videoUrl - backend will search for the channel
                    const channelResponse = await fetch(`${API_BASE_URL}/api/youtube/channel-info?videoUrl=${encodeURIComponent(normalizedInput)}`, {
                        credentials: "include"
                    });
                    if (!channelResponse.ok) {
                        const errorData = await channelResponse.json().catch(()=>({}));
                        const errorMessage = errorData?.message || "Could not find channel";
                        // If that fails and it was a name, provide helpful suggestions
                        if (isPlainName || !normalizedInput.includes("youtube.com") && !normalizedInput.includes("youtu.be")) {
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
            const existing = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
            // Check if channel already exists
            const channelExists = existing.some((v)=>v.channelId === channelInfo.channelId);
            if (!channelExists) {
                const placeholderVideo = {
                    title: `Video from ${channelInfo.name}`,
                    author: channelInfo.name,
                    videoId: `placeholder_${channelInfo.channelId}`,
                    thumbnail: channelInfo.avatar || "",
                    link: `https://www.youtube.com/channel/${channelInfo.channelId}`,
                    channelId: channelInfo.channelId
                };
                existing.unshift(placeholderVideo);
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
            }
            // Cache channel info
            const CHANNEL_INFO_STORAGE_KEY = "vidfly_channel_info";
            const cachedInfo = JSON.parse(sessionStorage.getItem(CHANNEL_INFO_STORAGE_KEY) || "[]");
            const channelInfoToCache = {
                channelId: channelInfo.channelId,
                name: channelInfo.name,
                avatar: channelInfo.avatar || ""
            };
            const existingChannelIndex = cachedInfo.findIndex((c)=>c.channelId === channelInfo.channelId);
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
        } finally{
            setLoading(false);
        }
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 animate-scale-in",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "https://www.youtube.com/img/desktop/yt_1200.png",
                                        alt: "YouTube",
                                        className: "w-8 h-8"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddChannelModal.tsx",
                                        lineNumber: 253,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-slate-900",
                                        children: "Add YouTube Channel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddChannelModal.tsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AddChannelModal.tsx",
                                lineNumber: 252,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "text-slate-400 hover:text-slate-600 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-6 w-6"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AddChannelModal.tsx",
                                    lineNumber: 264,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/AddChannelModal.tsx",
                                lineNumber: 260,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AddChannelModal.tsx",
                        lineNumber: 251,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-4 top-1/2 -translate-y-1/2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "https://www.youtube.com/img/desktop/yt_1200.png",
                                            alt: "YouTube",
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddChannelModal.tsx",
                                            lineNumber: 271,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddChannelModal.tsx",
                                        lineNumber: 270,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        type: "text",
                                        placeholder: "Search With Your Channel Name or Paste Channel Link",
                                        value: channelInput,
                                        onChange: (e)=>{
                                            setChannelInput(e.target.value);
                                            setError("");
                                        },
                                        className: "pl-12 pr-12 py-6 border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-2xl text-base",
                                        disabled: loading
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddChannelModal.tsx",
                                        lineNumber: 277,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-4 top-1/2 -translate-y-1/2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            className: "h-5 w-5 text-slate-400"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AddChannelModal.tsx",
                                            lineNumber: 289,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddChannelModal.tsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AddChannelModal.tsx",
                                lineNumber: 269,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 rounded-xl bg-red-50 border-2 border-red-200 text-sm text-red-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold mb-1",
                                        children: "Unable to add channel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddChannelModal.tsx",
                                        lineNumber: 295,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "whitespace-pre-line",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddChannelModal.tsx",
                                        lineNumber: 296,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AddChannelModal.tsx",
                                lineNumber: 294,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: "outline",
                                        onClick: onClose,
                                        className: "flex-1 rounded-2xl border-slate-200 hover:bg-slate-50",
                                        disabled: loading,
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddChannelModal.tsx",
                                        lineNumber: 301,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "submit",
                                        className: "flex-1 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold shadow-lg hover:shadow-xl disabled:opacity-50",
                                        disabled: loading,
                                        children: loading ? "Adding..." : "Add Channel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddChannelModal.tsx",
                                        lineNumber: 310,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AddChannelModal.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AddChannelModal.tsx",
                        lineNumber: 268,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AddChannelModal.tsx",
                lineNumber: 250,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/AddChannelModal.tsx",
            lineNumber: 249,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/AddChannelModal.tsx",
        lineNumber: 248,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AddChannelModal, "Ajgasro+p+98DTjs+BN+v79SBJ4=");
_c = AddChannelModal;
const __TURBOPACK__default__export__ = AddChannelModal;
var _c;
__turbopack_context__.k.register(_c, "AddChannelModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ManageChannelsModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/verifiedEmail.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const STORAGE_KEY = "vidfly_channel_videos";
const CHANNEL_INFO_STORAGE_KEY = "vidfly_channel_info";
const API_BASE_URL = (("TURBOPACK compile-time value", "http://localhost:5000") || "").replace(/\/$/, "");
const ManageChannelsModal = ({ isOpen, onClose, onChannelRemoved })=>{
    _s();
    const [channels, setChannels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [deleting, setDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ManageChannelsModal.useEffect": ()=>{
            if (isOpen) {
                loadChannels();
            }
        }
    }["ManageChannelsModal.useEffect"], [
        isOpen
    ]);
    const loadChannels = async ()=>{
        try {
            // First try to load from backend
            const userEmail = localStorage.getItem("logged_user_email") || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVerifiedEmail"])();
            if (userEmail) {
                try {
                    const response = await fetch(`${API_BASE_URL}/api/user-preferences/channels?email=${encodeURIComponent(userEmail)}`, {
                        credentials: "include"
                    });
                    if (response.ok) {
                        const data = await response.json();
                        if (data.channels && data.channels.length > 0) {
                            // Convert backend format to ChannelInfo format
                            const channelInfos = data.channels.map((ch)=>({
                                    channelId: ch.channelId,
                                    name: ch.channelName || "Channel",
                                    avatar: ""
                                }));
                            // Try to get avatars from cached info
                            const cachedInfo = sessionStorage.getItem(CHANNEL_INFO_STORAGE_KEY);
                            if (cachedInfo) {
                                const parsed = JSON.parse(cachedInfo);
                                const cachedMap = new Map(parsed.map((c)=>[
                                        c.channelId,
                                        c
                                    ]));
                                channelInfos.forEach((ch)=>{
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
                const parsed = JSON.parse(cachedInfo);
                setChannels(parsed);
            }
        } catch (err) {
            console.error("Failed to load channels", err);
        }
    };
    const handleRemoveChannel = async (channelId)=>{
        if (!confirm(`Are you sure you want to remove this channel? This will also remove all videos from this channel.`)) {
            return;
        }
        setDeleting(channelId);
        try {
            // Get user email
            const userEmail = localStorage.getItem("logged_user_email") || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVerifiedEmail"])();
            if (!userEmail) {
                throw new Error("User email not found");
            }
            // Remove from backend first
            try {
                const response = await fetch(`${API_BASE_URL}/api/user-preferences/channels`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: userEmail,
                        channelId: channelId
                    }),
                    credentials: "include"
                });
                if (!response.ok) {
                    const errorData = await response.json().catch(()=>({}));
                    console.warn("Failed to remove channel from backend:", errorData.message || "Unknown error");
                // Continue with local removal even if backend fails
                }
            } catch (err) {
                console.warn("Error removing channel from backend:", err);
            // Continue with local removal even if backend fails
            }
            // Remove from stored videos
            const storedVideos = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
            const filteredVideos = storedVideos.filter((v)=>v.channelId !== channelId);
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filteredVideos));
            // Remove from channel info cache
            const cachedInfo = JSON.parse(sessionStorage.getItem(CHANNEL_INFO_STORAGE_KEY) || "[]");
            const filteredChannels = cachedInfo.filter((c)=>c.channelId !== channelId);
            sessionStorage.setItem(CHANNEL_INFO_STORAGE_KEY, JSON.stringify(filteredChannels));
            // If this was the selected channel, clear selection (per email)
            const channelKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSelectedChannelKey"])();
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
        } finally{
            setDeleting(null);
        }
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col animate-scale-in",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-b border-slate-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold text-slate-900",
                                    children: "Manage Channels"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "text-slate-400 hover:text-slate-600 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-6 w-6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                    lineNumber: 164,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ManageChannelsModal.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-slate-500 mt-2",
                            children: "Remove channels you no longer need. This will also remove all videos from those channels."
                        }, void 0, false, {
                            fileName: "[project]/src/components/ManageChannelsModal.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ManageChannelsModal.tsx",
                    lineNumber: 161,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6",
                    children: channels.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-12 text-slate-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-semibold mb-2",
                                children: "No channels added yet"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                lineNumber: 179,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm",
                                children: "Add channels using the channel selector dropdown"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                lineNumber: 180,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ManageChannelsModal.tsx",
                        lineNumber: 178,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: channels.map((channel)=>{
                            const storedVideos = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
                            const videoCount = storedVideos.filter((v)=>v.channelId === channel.channelId).length;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-purple-300 bg-white hover:bg-purple-50/30 transition-all duration-200",
                                children: [
                                    channel.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: channel.avatar,
                                        alt: channel.name,
                                        className: "w-14 h-14 rounded-full object-cover border-2 border-purple-200 shadow-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                        lineNumber: 194,
                                        columnNumber: 23
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md",
                                        children: channel.name.charAt(0).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                        lineNumber: 200,
                                        columnNumber: 23
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-base font-bold text-slate-900 truncate",
                                                children: channel.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                                lineNumber: 205,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500 mt-1",
                                                children: [
                                                    videoCount,
                                                    " video",
                                                    videoCount !== 1 ? 's' : '',
                                                    " stored"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                                lineNumber: 206,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: `https://www.youtube.com/channel/${channel.channelId}`,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "text-xs text-purple-600 hover:text-purple-700 font-semibold mt-1 inline-flex items-center gap-1",
                                                children: "View on YouTube →"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                                lineNumber: 209,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                        lineNumber: 204,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        onClick: ()=>handleRemoveChannel(channel.channelId),
                                        disabled: deleting === channel.channelId,
                                        className: "text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300",
                                        children: deleting === channel.channelId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs",
                                            children: "Removing..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                            lineNumber: 226,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "h-4 w-4 mr-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 27
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Remove"
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                        lineNumber: 218,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, channel.channelId, true, {
                                fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                lineNumber: 189,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/ManageChannelsModal.tsx",
                        lineNumber: 183,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/ManageChannelsModal.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-t border-slate-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: onClose,
                        className: "w-full rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold shadow-lg hover:shadow-xl",
                        children: "Done"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ManageChannelsModal.tsx",
                        lineNumber: 242,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/ManageChannelsModal.tsx",
                    lineNumber: 241,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ManageChannelsModal.tsx",
            lineNumber: 160,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ManageChannelsModal.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ManageChannelsModal, "h73x7G44m4WCjLdPJJlOY0H9d1w=");
_c = ManageChannelsModal;
const __TURBOPACK__default__export__ = ManageChannelsModal;
var _c;
__turbopack_context__.k.register(_c, "ManageChannelsModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ChannelSelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AddChannelModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AddChannelModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ManageChannelsModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ManageChannelsModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/verifiedEmail.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const STORAGE_KEY = "vidfly_channel_videos";
const CHANNEL_INFO_STORAGE_KEY = "vidfly_channel_info";
const API_BASE_URL = (("TURBOPACK compile-time value", "http://localhost:5000") || "").replace(/\/$/, "");
const ChannelSelector = ({ onChannelSelect })=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [storedVideos, setStoredVideos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [channelInfoMap, setChannelInfoMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [selectedChannelId, setSelectedChannelId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showDropdown, setShowDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadingChannels, setLoadingChannels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [showAddModal, setShowAddModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showManageModal, setShowManageModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load all channels from backend (PRIMARY SOURCE - cross-device sync)
    const loadAllChannels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChannelSelector.useCallback[loadAllChannels]": async ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                // Get email from localStorage (stored after login)
                const userEmail = localStorage.getItem("logged_user_email") || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVerifiedEmail"])();
                if (!userEmail) return;
                // Step 1: Load selected channel from localStorage (fast, instant UI)
                const channelKey = `channel_${userEmail}`;
                const savedChannelId = localStorage.getItem(channelKey);
                if (savedChannelId) {
                    setSelectedChannelId(savedChannelId);
                }
                // Step 2: Load ALL channels from backend (PRIMARY SOURCE - cross-device)
                try {
                    const response = await fetch(`${API_BASE_URL}/api/user-preferences/channels?email=${encodeURIComponent(userEmail)}`, {
                        credentials: "include"
                    });
                    if (response.ok) {
                        const data = await response.json();
                        // Update selected channel from backend
                        if (data.selectedChannelId) {
                            setSelectedChannelId(data.selectedChannelId);
                            localStorage.setItem(channelKey, data.selectedChannelId);
                        }
                        // Load all channels DIRECTLY from backend - no YouTube API calls needed!
                        if (data.channels && data.channels.length > 0) {
                            const newChannelMap = new Map();
                            for (const ch of data.channels){
                                newChannelMap.set(ch.channelId, {
                                    channelId: ch.channelId,
                                    name: ch.channelName || "YouTube Channel",
                                    avatar: ch.channelAvatar || ""
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
                            const fallbackMap = new Map();
                            parsedInfo.forEach({
                                "ChannelSelector.useCallback[loadAllChannels]": (info)=>{
                                    fallbackMap.set(info.channelId, info);
                                }
                            }["ChannelSelector.useCallback[loadAllChannels]"]);
                            setChannelInfoMap(fallbackMap);
                        }
                    } catch (cacheErr) {
                        console.error("Failed to load from cache:", cacheErr);
                    }
                }
            } catch (err) {
                console.error("Failed to load channels", err);
            }
        }
    }["ChannelSelector.useCallback[loadAllChannels]"], []); // Remove channelInfoMap dependency to prevent infinite loops
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChannelSelector.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                const parsed = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
                setStoredVideos(parsed);
                // Load cached channel info
                const cachedChannelInfo = sessionStorage.getItem(CHANNEL_INFO_STORAGE_KEY);
                if (cachedChannelInfo) {
                    try {
                        const parsedInfo = JSON.parse(cachedChannelInfo);
                        const infoMap = new Map();
                        parsedInfo.forEach({
                            "ChannelSelector.useEffect": (info)=>{
                                infoMap.set(info.channelId, info);
                            }
                        }["ChannelSelector.useEffect"]);
                        setChannelInfoMap(infoMap);
                    } catch (err) {
                        console.error("Failed to parse cached channel info", err);
                    }
                }
            } catch (err) {
                console.error("Failed to load stored videos", err);
            }
        }
    }["ChannelSelector.useEffect"], []);
    // Load all channels from backend/localStorage on mount and when email changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChannelSelector.useEffect": ()=>{
            loadAllChannels();
        }
    }["ChannelSelector.useEffect"], [
        loadAllChannels
    ]);
    // Listen for channelChanged events (when channel is updated from other components)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChannelSelector.useEffect": ()=>{
            const handleChannelChanged = {
                "ChannelSelector.useEffect.handleChannelChanged": (event)=>{
                    const { channelId, channelName } = event.detail;
                    if (channelId) {
                        setSelectedChannelId(channelId);
                        // Save to localStorage for fast UI
                        const userEmail = localStorage.getItem("logged_user_email") || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVerifiedEmail"])();
                        if (userEmail) {
                            const channelKey = `channel_${userEmail}`;
                            localStorage.setItem(channelKey, channelId);
                        }
                        // If channel not in map, add it immediately for instant UI feedback
                        if (!channelInfoMap.has(channelId) && channelName) {
                            setChannelInfoMap({
                                "ChannelSelector.useEffect.handleChannelChanged": (prev)=>{
                                    const newMap = new Map(prev);
                                    newMap.set(channelId, {
                                        channelId,
                                        name: channelName,
                                        avatar: ""
                                    });
                                    return newMap;
                                }
                            }["ChannelSelector.useEffect.handleChannelChanged"]);
                        }
                        // Then reload all channels from backend to get full data
                        loadAllChannels();
                    }
                }
            }["ChannelSelector.useEffect.handleChannelChanged"];
            window.addEventListener('channelChanged', handleChannelChanged);
            return ({
                "ChannelSelector.useEffect": ()=>{
                    window.removeEventListener('channelChanged', handleChannelChanged);
                }
            })["ChannelSelector.useEffect"];
        }
    }["ChannelSelector.useEffect"], [
        channelInfoMap,
        loadAllChannels
    ]);
    const fetchChannelInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChannelSelector.useCallback[fetchChannelInfo]": async (channelId, channelName)=>{
            // Skip if already loading or already cached
            if (loadingChannels.has(channelId) || channelInfoMap.has(channelId)) {
                return;
            }
            setLoadingChannels({
                "ChannelSelector.useCallback[fetchChannelInfo]": (prev)=>new Set(prev).add(channelId)
            }["ChannelSelector.useCallback[fetchChannelInfo]"]);
            try {
                const response = await fetch(`${API_BASE_URL}/api/youtube/channel-info?channelId=${encodeURIComponent(channelId)}`, {
                    credentials: "include"
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch channel info");
                }
                const data = await response.json();
                const channelInfo = {
                    channelId: data.channelId,
                    name: data.name || channelName,
                    avatar: data.avatar || ""
                };
                setChannelInfoMap({
                    "ChannelSelector.useCallback[fetchChannelInfo]": (prev)=>{
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
                    }
                }["ChannelSelector.useCallback[fetchChannelInfo]"]);
            } catch (err) {
                console.error("Error fetching channel info:", err);
            } finally{
                setLoadingChannels({
                    "ChannelSelector.useCallback[fetchChannelInfo]": (prev)=>{
                        const newSet = new Set(prev);
                        newSet.delete(channelId);
                        return newSet;
                    }
                }["ChannelSelector.useCallback[fetchChannelInfo]"]);
            }
        }
    }["ChannelSelector.useCallback[fetchChannelInfo]"], [
        loadingChannels,
        channelInfoMap
    ]);
    // Fetch channel info for channels that don't have cached info
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChannelSelector.useEffect": ()=>{
            if (storedVideos.length === 0) return;
            const channelIdsToFetch = new Set();
            storedVideos.forEach({
                "ChannelSelector.useEffect": (video)=>{
                    if (video.channelId && video.author) {
                        if (!channelInfoMap.has(video.channelId) && !loadingChannels.has(video.channelId)) {
                            channelIdsToFetch.add(video.channelId);
                        }
                    }
                }
            }["ChannelSelector.useEffect"]);
            channelIdsToFetch.forEach({
                "ChannelSelector.useEffect": (channelId)=>{
                    const video = storedVideos.find({
                        "ChannelSelector.useEffect.video": (v)=>v.channelId === channelId
                    }["ChannelSelector.useEffect.video"]);
                    if (video?.author) {
                        fetchChannelInfo(channelId, video.author);
                    }
                }
            }["ChannelSelector.useEffect"]);
        }
    }["ChannelSelector.useEffect"], [
        storedVideos,
        channelInfoMap,
        loadingChannels,
        fetchChannelInfo
    ]);
    const availableChannels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ChannelSelector.useMemo[availableChannels]": ()=>{
            const channelMap = new Map();
            // Add channels from stored videos
            storedVideos.forEach({
                "ChannelSelector.useMemo[availableChannels]": (video)=>{
                    if (video.channelId && video.author) {
                        if (!channelMap.has(video.channelId)) {
                            const cachedInfo = channelInfoMap.get(video.channelId);
                            channelMap.set(video.channelId, {
                                channelId: video.channelId,
                                name: cachedInfo?.name || video.author,
                                avatar: cachedInfo?.avatar || ""
                            });
                        }
                    }
                }
            }["ChannelSelector.useMemo[availableChannels]"]);
            // Also include channels from channelInfoMap (saved channels from backend that may not be in storedVideos)
            channelInfoMap.forEach({
                "ChannelSelector.useMemo[availableChannels]": (info, channelId)=>{
                    if (!channelMap.has(channelId)) {
                        channelMap.set(channelId, {
                            channelId: info.channelId,
                            name: info.name,
                            avatar: info.avatar
                        });
                    }
                }
            }["ChannelSelector.useMemo[availableChannels]"]);
            return Array.from(channelMap.values());
        }
    }["ChannelSelector.useMemo[availableChannels]"], [
        storedVideos,
        channelInfoMap
    ]);
    const selectedChannel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ChannelSelector.useMemo[selectedChannel]": ()=>{
            return availableChannels.find({
                "ChannelSelector.useMemo[selectedChannel]": (ch)=>ch.channelId === selectedChannelId
            }["ChannelSelector.useMemo[selectedChannel]"]);
        }
    }["ChannelSelector.useMemo[selectedChannel]"], [
        availableChannels,
        selectedChannelId
    ]);
    // Listen for storage changes (when channel is changed in another tab) - GPT suggestion
    // This must be after availableChannels is defined
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChannelSelector.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const userEmail = localStorage.getItem("logged_user_email") || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVerifiedEmail"])();
            if (!userEmail) return;
            const channelKey = `channel_${userEmail}`;
            const handleStorageChange = {
                "ChannelSelector.useEffect.handleStorageChange": (e)=>{
                    // Check if the changed key is for the current email's selected channel
                    if (e.key === channelKey && e.newValue) {
                        setSelectedChannelId(e.newValue);
                        // Trigger channel change event for other components
                        const channel = availableChannels.find({
                            "ChannelSelector.useEffect.handleStorageChange.channel": (ch)=>ch.channelId === e.newValue
                        }["ChannelSelector.useEffect.handleStorageChange.channel"]);
                        if (channel) {
                            window.dispatchEvent(new CustomEvent('channelChanged', {
                                detail: {
                                    channelId: channel.channelId,
                                    channelName: channel.name
                                }
                            }));
                        }
                    }
                }
            }["ChannelSelector.useEffect.handleStorageChange"];
            window.addEventListener('storage', handleStorageChange);
            return ({
                "ChannelSelector.useEffect": ()=>window.removeEventListener('storage', handleStorageChange)
            })["ChannelSelector.useEffect"];
        }
    }["ChannelSelector.useEffect"], [
        availableChannels
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChannelSelector.useEffect": ()=>{
            const handleClickOutside = {
                "ChannelSelector.useEffect.handleClickOutside": (event)=>{
                    const target = event.target;
                    if (!target.closest('.channel-selector-container')) {
                        setShowDropdown(false);
                    }
                }
            }["ChannelSelector.useEffect.handleClickOutside"];
            if (showDropdown) {
                document.addEventListener('mousedown', handleClickOutside);
                return ({
                    "ChannelSelector.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
                })["ChannelSelector.useEffect"];
            }
        }
    }["ChannelSelector.useEffect"], [
        showDropdown
    ]);
    const handleChannelClick = async (channelId, channelName)=>{
        setSelectedChannelId(channelId);
        // Get email from localStorage (stored after login)
        const userEmail = localStorage.getItem("logged_user_email") || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVerifiedEmail"])();
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
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: userEmail,
                        channelId: channelId,
                        channelName: channelName,
                        channelAvatar: channelAvatar
                    }),
                    credentials: "include"
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
        window.dispatchEvent(new CustomEvent('channelChanged', {
            detail: {
                channelId,
                channelName
            }
        }));
    };
    const handleChannelAdded = async (channelInfo)=>{
        // Add to channel info map
        setChannelInfoMap((prev)=>{
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
            const parsed = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
            setStoredVideos(parsed);
            // Auto-select the newly added channel
            setSelectedChannelId(channelInfo.channelId);
            // Save to localStorage with email in key (fast, instant UI)
            const userEmail = localStorage.getItem("logged_user_email") || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVerifiedEmail"])();
            if (userEmail) {
                const channelKey = `channel_${userEmail}`;
                localStorage.setItem(channelKey, channelInfo.channelId);
                // Save to backend (adds to channels list and sets as selected)
                try {
                    await fetch(`${API_BASE_URL}/api/user-preferences/channels`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: userEmail,
                            channelId: channelInfo.channelId,
                            channelName: channelInfo.name,
                            channelAvatar: channelInfo.avatar || ''
                        }),
                        credentials: "include"
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
            window.dispatchEvent(new CustomEvent('channelChanged', {
                detail: {
                    channelId: channelInfo.channelId,
                    channelName: channelInfo.name
                }
            }));
        } catch (err) {
            console.error("Failed to reload stored videos", err);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "channel-selector-container relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>{
                    if (availableChannels.length === 0) {
                        setShowAddModal(true);
                    } else {
                        setShowDropdown(!showDropdown);
                    }
                },
                className: "flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all duration-200 min-w-0 max-w-full",
                children: selectedChannel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        selectedChannel.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: selectedChannel.avatar,
                            alt: selectedChannel.name,
                            className: "w-8 h-8 rounded-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChannelSelector.tsx",
                            lineNumber: 451,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs",
                            children: selectedChannel.name.charAt(0).toUpperCase()
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChannelSelector.tsx",
                            lineNumber: 457,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-semibold text-slate-900 truncate min-w-0",
                            children: selectedChannel.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChannelSelector.tsx",
                            lineNumber: 461,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: `https://www.youtube.com/channel/${selectedChannel.channelId}`,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            onClick: (e)=>e.stopPropagation(),
                            className: "hover:opacity-80 transition-opacity",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "https://www.youtube.com/img/desktop/yt_1200.png",
                                alt: "YouTube",
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChannelSelector.tsx",
                                lineNumber: 471,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChannelSelector.tsx",
                            lineNumber: 464,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        availableChannels.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                            className: `w-4 h-4 text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChannelSelector.tsx",
                            lineNumber: 478,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs",
                            children: availableChannels.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChannelSelector.tsx",
                                lineNumber: 484,
                                columnNumber: 49
                            }, ("TURBOPACK compile-time value", void 0)) : "?"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChannelSelector.tsx",
                            lineNumber: 483,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-slate-500",
                            children: availableChannels.length === 0 ? "Add channel" : "Select channel"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChannelSelector.tsx",
                            lineNumber: 486,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        availableChannels.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                            className: "w-4 h-4 text-slate-400"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChannelSelector.tsx",
                            lineNumber: 490,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/components/ChannelSelector.tsx",
                lineNumber: 437,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            showDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-20 right-0 sm:right-0 mt-2 bg-white border-2 border-red-200 rounded-2xl shadow-2xl max-h-80 overflow-y-auto w-[calc(100vw-32px)] sm:min-w-[380px] sm:w-max animate-fade-in backdrop-blur-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-3",
                    children: [
                        availableChannels.map((channel)=>{
                            const channelVideos = storedVideos.filter((v)=>v.channelId === channel.channelId);
                            const isLoading = loadingChannels.has(channel.channelId);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>handleChannelClick(channel.channelId, channel.name),
                                className: `w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-200 text-left mb-1 ${selectedChannelId === channel.channelId ? 'bg-gradient-to-r from-red-50 to-red-100 border border-red-200' : ''}`,
                                children: [
                                    channel.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: channel.avatar,
                                        alt: channel.name,
                                        className: "w-12 h-12 rounded-full object-cover border-2 border-red-200 shadow-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChannelSelector.tsx",
                                        lineNumber: 512,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-md",
                                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChannelSelector.tsx",
                                            lineNumber: 520,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)) : channel.name.charAt(0).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChannelSelector.tsx",
                                        lineNumber: 518,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-bold text-slate-900 truncate",
                                            children: channel.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChannelSelector.tsx",
                                            lineNumber: 527,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChannelSelector.tsx",
                                        lineNumber: 526,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    selectedChannelId === channel.channelId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-6 h-6 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-md flex-shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white text-xs font-bold",
                                            children: "✓"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChannelSelector.tsx",
                                            lineNumber: 531,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChannelSelector.tsx",
                                        lineNumber: 530,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, channel.channelId, true, {
                                fileName: "[project]/src/components/ChannelSelector.tsx",
                                lineNumber: 504,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0));
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: (e)=>{
                                e.stopPropagation();
                                setShowDropdown(false);
                                setTimeout(()=>setShowAddModal(true), 100);
                            },
                            className: "w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-200 text-left border-2 border-dashed border-red-200 bg-red-50/30 mt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white flex-shrink-0 shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "h-6 w-6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChannelSelector.tsx",
                                        lineNumber: 547,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChannelSelector.tsx",
                                    lineNumber: 546,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-bold text-red-600",
                                            children: "Add another channel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChannelSelector.tsx",
                                            lineNumber: 550,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-slate-500",
                                            children: "Add a new YouTube channel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChannelSelector.tsx",
                                            lineNumber: 551,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ChannelSelector.tsx",
                                    lineNumber: 549,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ChannelSelector.tsx",
                            lineNumber: 537,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        availableChannels.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: (e)=>{
                                e.stopPropagation();
                                setShowDropdown(false);
                                setTimeout(()=>setShowManageModal(true), 100);
                            },
                            className: "w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 transition-all duration-200 text-left border-t-2 border-slate-200 mt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                        className: "h-6 w-6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChannelSelector.tsx",
                                        lineNumber: 566,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChannelSelector.tsx",
                                    lineNumber: 565,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-bold text-slate-700",
                                            children: "Manage Channels"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChannelSelector.tsx",
                                            lineNumber: 569,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-slate-500",
                                            children: "Remove channels you no longer need"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChannelSelector.tsx",
                                            lineNumber: 570,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ChannelSelector.tsx",
                                    lineNumber: 568,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ChannelSelector.tsx",
                            lineNumber: 556,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ChannelSelector.tsx",
                    lineNumber: 498,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ChannelSelector.tsx",
                lineNumber: 497,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AddChannelModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showAddModal,
                onClose: ()=>setShowAddModal(false),
                onChannelAdded: handleChannelAdded
            }, void 0, false, {
                fileName: "[project]/src/components/ChannelSelector.tsx",
                lineNumber: 578,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ManageChannelsModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showManageModal,
                onClose: ()=>setShowManageModal(false),
                onChannelRemoved: ()=>{
                    // Reload channels and videos
                    try {
                        const parsed = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
                        setStoredVideos(parsed);
                        const cachedChannelInfo = sessionStorage.getItem(CHANNEL_INFO_STORAGE_KEY);
                        if (cachedChannelInfo) {
                            const parsedInfo = JSON.parse(cachedChannelInfo);
                            const infoMap = new Map();
                            parsedInfo.forEach((info)=>{
                                infoMap.set(info.channelId, info);
                            });
                            setChannelInfoMap(infoMap);
                        }
                        // Check if selected channel still exists
                        const channelKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSelectedChannelKey"])();
                        const currentSelected = localStorage.getItem(channelKey);
                        if (currentSelected) {
                            const stillExists = parsed.some((v)=>v.channelId === currentSelected);
                            if (!stillExists) {
                                localStorage.removeItem(channelKey);
                                setSelectedChannelId(null);
                                // Select first available channel
                                const firstChannel = parsed.find((v)=>v.channelId);
                                if (firstChannel?.channelId) {
                                    setSelectedChannelId(firstChannel.channelId);
                                    localStorage.setItem(channelKey, firstChannel.channelId);
                                }
                            }
                        }
                    } catch (err) {
                        console.error("Failed to reload after channel removal", err);
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ChannelSelector.tsx",
                lineNumber: 584,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ChannelSelector.tsx",
        lineNumber: 436,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ChannelSelector, "PFfCKGqV166AdcaSnG03G8Ngc7g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ChannelSelector;
const __TURBOPACK__default__export__ = ChannelSelector;
var _c;
__turbopack_context__.k.register(_c, "ChannelSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/campaign/budget/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CampaignBudget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdPreviewModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AdPreviewModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/verifiedEmail.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CampaignLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CampaignLayout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChannelSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ChannelSelector.tsx [app-client] (ecmascript)");
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
;
const API_BASE_URL = (("TURBOPACK compile-time value", "http://localhost:5000") || "").replace(/\/$/, "");
const STORAGE_KEY = "vidfly_channel_videos";
const BUDGET_STATE_KEY = "vidfly_budget_state";
function CampaignBudget() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [verifiedEmail, setVerifiedEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CampaignBudget.useEffect": ()=>{
            const email = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVerifiedEmail"])();
            if (!email) {
                router.replace("/get-started");
                return;
            }
            setVerifiedEmail(email);
            try {
                // 1. Check current campaign video from sessionStorage
                const currentVideo = sessionStorage.getItem("vidfly_current_campaign_video");
                const currentVideos = sessionStorage.getItem("vidfly_current_campaign_videos");
                if (currentVideo) {
                    const videoInfo = JSON.parse(currentVideo);
                    const videos = currentVideos ? JSON.parse(currentVideos) : [
                        videoInfo
                    ];
                    const newState = {
                        email,
                        youtubeLink: videoInfo.link,
                        videoInfo,
                        videos
                    };
                    setState(newState);
                    sessionStorage.setItem(BUDGET_STATE_KEY, JSON.stringify(newState));
                } else {
                    // 2. Check for existing budget state
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
        }
    }["CampaignBudget.useEffect"], [
        router
    ]);
    const [selectedVideos, setSelectedVideos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CampaignBudget.useEffect": ()=>{
            if (state?.videos) setSelectedVideos(state.videos);
            else if (state?.videoInfo) setSelectedVideos([
                state.videoInfo
            ]);
        }
    }["CampaignBudget.useEffect"], [
        state
    ]);
    const isBulkViews = state?.campaignType === "bulk-views" && state?.bulkViewsPackage || false;
    const bulkViewsPackage = state?.bulkViewsPackage || null;
    const bulkViewsPrice = bulkViewsPackage ? parseFloat(bulkViewsPackage.price.replace(/[^0-9.]/g, "")) : null;
    const [budget, setBudget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(800);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CampaignBudget.useEffect": ()=>{
            if (isBulkViews && bulkViewsPrice) {
                setBudget(bulkViewsPrice);
            }
        }
    }["CampaignBudget.useEffect"], [
        isBulkViews,
        bulkViewsPrice
    ]);
    const [pricingData, setPricingData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingPricing, setLoadingPricing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [targetCountry, setTargetCountry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [campaignDuration, setCampaignDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("3-7 Days");
    const [customDurationDays, setCustomDurationDays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(7);
    const [autoTargeting, setAutoTargeting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showTargetingModal, setShowTargetingModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [goalType, setGoalType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Engagement");
    const [createError, setCreateError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [creating, setCreating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showPreview, setShowPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [freeViewsBalance, setFreeViewsBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Manual targeting options
    const [selectedGender, setSelectedGender] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [selectedAges, setSelectedAges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        "all"
    ]);
    const [selectedInterests, setSelectedInterests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        "all"
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CampaignBudget.useEffect": ()=>{
            if (verifiedEmail) {
                loadFreeViewsBalance();
            }
        }
    }["CampaignBudget.useEffect"], [
        verifiedEmail
    ]);
    const loadFreeViewsBalance = async ()=>{
        try {
            const response = await fetch(`${API_BASE_URL}/api/free-views/balance?email=${encodeURIComponent(verifiedEmail)}`, {
                credentials: "include"
            });
            if (response.ok) {
                const data = await response.json();
                setFreeViewsBalance(data.balance || 0);
            }
        } catch (err) {
            console.error("Failed to load free views balance", err);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CampaignBudget.useEffect": ()=>{
            if (!isBulkViews) {
                const timeout = setTimeout({
                    "CampaignBudget.useEffect.timeout": ()=>calculatePricing(budget)
                }["CampaignBudget.useEffect.timeout"], 300);
                return ({
                    "CampaignBudget.useEffect": ()=>clearTimeout(timeout)
                })["CampaignBudget.useEffect"];
            }
        }
    }["CampaignBudget.useEffect"], [
        budget,
        isBulkViews
    ]);
    const calculatePricing = async (value)=>{
        try {
            setLoadingPricing(true);
            const response = await fetch(`${API_BASE_URL}/api/pricing/calculate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    price: value
                })
            });
            if (!response.ok) throw new Error("Unable to calculate views");
            const data = await response.json();
            setPricingData(data);
        } catch (err) {
            console.error(err);
        } finally{
            setLoadingPricing(false);
        }
    };
    if (!state || !selectedVideos.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"
            }, void 0, false, {
                fileName: "[project]/src/app/campaign/budget/page.tsx",
                lineNumber: 180,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/campaign/budget/page.tsx",
            lineNumber: 179,
            columnNumber: 13
        }, this);
    }
    const primaryVideo = selectedVideos[0];
    const channelName = primaryVideo.author || "Your Channel";
    const youtubeLink = state.youtubeLink || primaryVideo.link;
    const effectiveTotalViews = (()=>{
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
    const handleCreateCampaign = async ()=>{
        try {
            setCreating(true);
            setCreateError(null);
            const payload = {
                customerName: channelName,
                email: verifiedEmail,
                channel: {
                    name: channelName,
                    channelId: primaryVideo.channelId || null,
                    link: youtubeLink,
                    avatar: primaryVideo.avatarUrl || null
                },
                videos: selectedVideos.map((video)=>({
                        videoId: video.videoId,
                        title: video.title,
                        link: video.link,
                        thumbnail: video.thumbnail,
                        viewsRequested: video.viewsRequested || perVideoViews
                    })),
                package: isBulkViews && bulkViewsPackage ? {
                    id: bulkViewsPackage.id,
                    name: bulkViewsPackage.label,
                    price: budget,
                    currency: "INR",
                    quantity: effectiveTotalViews,
                    type: "bulk-views",
                    description: `${bulkViewsPackage.label} - ${bulkViewsPackage.price}`
                } : {
                    id: "custom-campaign",
                    name: "Custom Campaign",
                    price: budget,
                    currency: "INR",
                    quantity: effectiveTotalViews,
                    type: "views",
                    description: `Budget ${budget} with estimated ${pricingData?.totalViews ? `${pricingData.totalViews.min}-${pricingData.totalViews.max} views` : "views"}`
                },
                targeting: {
                    country: targetCountry,
                    goal: goalType,
                    duration: campaignDuration === "Custom" ? `Custom (${customDurationDays} days)` : campaignDuration,
                    customDurationDays: campaignDuration === "Custom" ? customDurationDays : undefined,
                    autoTargeting,
                    ...!autoTargeting && {
                        gender: selectedGender,
                        ages: selectedAges,
                        interests: selectedInterests
                    }
                },
                budget,
                source: selectedVideos.length > 1 ? "promote_channel" : "promote_video"
            };
            const response = await fetch(`${API_BASE_URL}/api/orders/campaign`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
                credentials: "include"
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.message || "Unable to create campaign");
            if (data.paymentCheckoutUrl) {
                window.location.href = data.paymentCheckoutUrl;
                return;
            }
            router.push(`/campaign/my-campaigns`);
        } catch (err) {
            setCreateError(err instanceof Error ? err.message : "Failed to create campaign");
        } finally{
            setCreating(false);
        }
    };
    const handleRemoveVideo = (videoId)=>{
        setSelectedVideos((prev)=>prev.filter((v)=>v.videoId !== videoId));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CampaignLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        activeSidebar: "budget",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-xl border border-slate-200 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-semibold text-slate-600 uppercase",
                                    children: "STEP 3 - BUDGET & TARGETING"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/campaign/budget/page.tsx",
                                    lineNumber: 296,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                lineNumber: 295,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    "ENTER LINK",
                                    "SELECT VIDEOS",
                                    "BUDGET & TARGETING",
                                    "PAYMENT"
                                ].map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 flex items-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `h-2 flex-1 rounded-full ${index <= 2 ? "bg-red-600" : "bg-slate-200"}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                    lineNumber: 302,
                                                    columnNumber: 37
                                                }, this),
                                                index < 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `h-2 w-2 rounded-full ${index <= 2 ? "bg-red-600" : "bg-slate-200"}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 51
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/campaign/budget/page.tsx",
                                            lineNumber: 301,
                                            columnNumber: 33
                                        }, this)
                                    }, step, false, {
                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                        lineNumber: 300,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                lineNumber: 298,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                        lineNumber: 294,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid lg:grid-cols-3 gap-6 items-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded-xl border border-slate-200 p-3 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 flex-1 min-w-0 w-full",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0",
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] font-semibold text-slate-500 uppercase",
                                                                children: "Verified Email"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                lineNumber: 316,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-semibold text-slate-900 truncate",
                                                                children: verifiedEmail
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                lineNumber: 317,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                lineNumber: 313,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-shrink-0 w-full sm:w-auto",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChannelSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                    lineNumber: 321,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                lineNumber: 320,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                        lineNumber: 312,
                                        columnNumber: 25
                                    }, this),
                                    !isBulkViews && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded-xl border border-slate-200 p-4 shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-base font-semibold text-slate-900 flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                                className: "h-4 w-4 text-red-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                lineNumber: 329,
                                                                columnNumber: 41
                                                            }, this),
                                                            " Enter Budget"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-medium text-slate-500",
                                                                children: "Custom Budget:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                lineNumber: 332,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative w-32",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium",
                                                                        children: "₹"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                        lineNumber: 334,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                        type: "number",
                                                                        min: 800,
                                                                        max: 10000,
                                                                        value: budget,
                                                                        onChange: (e)=>setBudget(Number(e.target.value)),
                                                                        className: `pl-6 h-9 text-sm font-semibold border-slate-200 focus:ring-red-100 ${budget < 800 || budget > 10000 ? "border-red-500" : ""}`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                        lineNumber: 335,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                lineNumber: 333,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                        lineNumber: 331,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                lineNumber: 327,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative pt-4 pb-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "range",
                                                        min: 800,
                                                        max: 10000,
                                                        step: 100,
                                                        value: budget,
                                                        onChange: (e)=>setBudget(Number(e.target.value)),
                                                        className: "w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer",
                                                        style: {
                                                            background: `linear-gradient(to right, #dc2626 ${(budget - 800) / 9200 * 100}%, #e2e8f0 0%)`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                        lineNumber: 347,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-xs text-slate-400 font-medium mt-2",
                                                        children: [
                                                            800,
                                                            2000,
                                                            4000,
                                                            6000,
                                                            8000,
                                                            10000
                                                        ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: m.toLocaleString()
                                                            }, m, false, {
                                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                lineNumber: 358,
                                                                columnNumber: 88
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                        lineNumber: 357,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                lineNumber: 346,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                        lineNumber: 326,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-base font-semibold text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                        className: "h-4 w-4 text-red-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 33
                                                    }, this),
                                                    " Targeting & Settings"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                lineNumber: 365,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid md:grid-cols-2 gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                                        className: "h-3.5 w-3.5 text-slate-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                        lineNumber: 371,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    " Target Country"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                lineNumber: 370,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                className: "w-full border border-slate-300 rounded-xl p-2.5 text-sm bg-slate-50",
                                                                value: targetCountry,
                                                                onChange: (e)=>setTargetCountry(e.target.value),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "",
                                                                        children: "All Countries (Recommended)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                        lineNumber: 378,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "IN",
                                                                        children: "India"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                        lineNumber: 379,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "US",
                                                                        children: "United States"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                        lineNumber: 380,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                lineNumber: 373,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                        lineNumber: 369,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-slate-700 mb-2",
                                                                children: "Goal"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                lineNumber: 384,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                className: "w-full border border-slate-300 rounded-xl p-2.5 text-sm bg-slate-50",
                                                                value: goalType,
                                                                onChange: (e)=>setGoalType(e.target.value),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "Engagement",
                                                                    children: "Engagement"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                    lineNumber: 386,
                                                                    columnNumber: 41
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                lineNumber: 385,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                        lineNumber: 383,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                lineNumber: 368,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                        lineNumber: 364,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                lineNumber: 311,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sticky top-20 space-y-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-slate-50 p-4 border-b border-slate-100 font-bold flex justify-between",
                                                children: [
                                                    "Estimated Results ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                                                        className: "h-4 w-4 text-slate-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 55
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                lineNumber: 396,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between text-xs font-semibold text-slate-500 mb-2 uppercase",
                                                                children: [
                                                                    "Estimated Views ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-green-600 bg-green-50 px-2 rounded-full",
                                                                        children: "+6% Bonus"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                        lineNumber: 402,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                lineNumber: 401,
                                                                columnNumber: 41
                                                            }, this),
                                                            loadingPricing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-4 bg-slate-100 rounded w-full animate-pulse"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                lineNumber: 405,
                                                                columnNumber: 45
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-bold text-slate-900",
                                                                children: pricingData ? `${(pricingData.totalViews.min + freeViewsBalance).toLocaleString()} - ${(pricingData.totalViews.max + freeViewsBalance).toLocaleString()}` : "Set budget"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                lineNumber: 407,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                        lineNumber: 400,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border-t border-slate-100 pt-4 flex justify-between items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-semibold text-slate-600",
                                                                children: "Total Budget"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                lineNumber: 413,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xl font-bold text-red-600",
                                                                children: [
                                                                    "₹ ",
                                                                    budget
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                                lineNumber: 414,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                        lineNumber: 412,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        onClick: handleCreateCampaign,
                                                        disabled: creating || budget < 800,
                                                        className: "w-full rounded-xl py-6 bg-red-600 hover:bg-red-700 text-white font-bold",
                                                        children: creating ? "Processing..." : "Pay & Launch"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                        lineNumber: 416,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        onClick: ()=>setShowPreview(true),
                                                        className: "w-full rounded-xl",
                                                        children: "Preview Ad"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                        lineNumber: 423,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                                lineNumber: 399,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                                        lineNumber: 395,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/campaign/budget/page.tsx",
                                    lineNumber: 394,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/campaign/budget/page.tsx",
                                lineNumber: 393,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/campaign/budget/page.tsx",
                        lineNumber: 310,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/campaign/budget/page.tsx",
                lineNumber: 293,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdPreviewModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showPreview,
                onClose: ()=>setShowPreview(false),
                video: {
                    title: primaryVideo.title,
                    thumbnail: primaryVideo.thumbnail,
                    author: primaryVideo.author || channelName,
                    videoId: primaryVideo.videoId,
                    link: primaryVideo.link
                },
                viewCount: effectiveTotalViews.toLocaleString()
            }, void 0, false, {
                fileName: "[project]/src/app/campaign/budget/page.tsx",
                lineNumber: 431,
                columnNumber: 13
            }, this),
            showTargetingModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl max-w-2xl w-full p-6 relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold mb-4",
                            children: "Ad Targeting Advice"
                        }, void 0, false, {
                            fileName: "[project]/src/app/campaign/budget/page.tsx",
                            lineNumber: 447,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-slate-700 mb-6",
                            children: "Automatic Targeting generally yields the best outcomes."
                        }, void 0, false, {
                            fileName: "[project]/src/app/campaign/budget/page.tsx",
                            lineNumber: 448,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    className: "flex-1",
                                    onClick: ()=>{
                                        setShowTargetingModal(false);
                                        setAutoTargeting(false);
                                    },
                                    children: "Select Manually"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/campaign/budget/page.tsx",
                                    lineNumber: 450,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "flex-1 bg-red-600",
                                    onClick: ()=>{
                                        setShowTargetingModal(false);
                                        setAutoTargeting(true);
                                    },
                                    children: "Keep Automatic"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/campaign/budget/page.tsx",
                                    lineNumber: 451,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/campaign/budget/page.tsx",
                            lineNumber: 449,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/campaign/budget/page.tsx",
                    lineNumber: 446,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/campaign/budget/page.tsx",
                lineNumber: 445,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/campaign/budget/page.tsx",
        lineNumber: 292,
        columnNumber: 9
    }, this);
}
_s(CampaignBudget, "UhkroRIHF2hhaKSYKen3BAbnymg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CampaignBudget;
var _c;
__turbopack_context__.k.register(_c, "CampaignBudget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_02479367._.js.map