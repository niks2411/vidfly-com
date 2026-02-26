module.exports = [
"[project]/src/components/CampaignSidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-ssr] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3x3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-ssr] (ecmascript) <export default as Grid3x3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-ssr] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [app-ssr] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
"use client";
;
;
;
;
const CampaignSidebar = ({ active = "promote", onNavigate: onNavigateCallback, isMobile = false })=>{
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const sections = [
        {
            title: "PROMOTION",
            items: [
                {
                    label: "Promote Video / Short",
                    path: "/campaign",
                    key: "promote",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"]
                },
                {
                    label: "Promote Channel",
                    path: "/campaign/channel",
                    key: "channel",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
                },
                {
                    label: "My Campaigns",
                    path: "/campaign/my-campaigns",
                    key: "campaigns",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3x3$3e$__["Grid3x3"]
                },
                {
                    label: "Buy Packages",
                    path: "/campaign/packages",
                    key: "packages",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"]
                },
                {
                    label: "Buy Bulk Views",
                    path: "/campaign/bulk-views",
                    key: "bulk",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"]
                },
                {
                    label: "Free Views",
                    path: "/campaign/free-views",
                    key: "free",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"]
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
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"]
                },
                {
                    label: "Select Videos",
                    path: "/campaign",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"]
                },
                {
                    label: "Budget & Targeting",
                    path: "/campaign/budget",
                    key: "budget",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"]
                },
                {
                    label: "Payment",
                    path: "/campaign/payment",
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"]
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("lg:w-64 bg-white h-full lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto", isMobile ? "w-full" : "p-6"),
        children: sections.map((section, sectionIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(sectionIndex === 0 ? "mb-6" : "mb-8", section.title === "STRATEGY PATH" && "hidden lg:block"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-500 uppercase tracking-wide font-semibold",
                                children: section.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/CampaignSidebar.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            section.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-1",
                        children: section.items.map((item)=>{
                            const active = isActive(item);
                            const Icon = item.icon;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>handleNavigate(item.path),
                                    disabled: !item.path,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3", item.path ? active ? "bg-red-100 text-red-700 border border-red-200" : "hover:bg-slate-50 text-slate-600" : "text-slate-300 cursor-not-allowed"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-5 w-5 flex-shrink-0", active ? "text-red-700" : "text-slate-500")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CampaignSidebar.tsx",
                                            lineNumber: 106,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    sectionIndex === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
const __TURBOPACK__default__export__ = CampaignSidebar;
}),
"[project]/src/components/CampaignLayout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CampaignSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CampaignSidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$campaign$2d$sidebar$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/campaign-sidebar-provider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const CampaignLayout = ({ children, activeSidebar = "promote", className })=>{
    const sidebarContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$campaign$2d$sidebar$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCampaignSidebar"])();
    const isSidebarOpen = sidebarContext?.isSidebarOpen || false;
    const setIsSidebarOpen = sidebarContext?.setIsSidebarOpen || (()=>{});
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen font-montserrat",
        children: [
            isSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden fixed inset-0 bg-black/50 z-40 top-[108px]",
                onClick: ()=>setIsSidebarOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/CampaignLayout.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("lg:hidden fixed top-[108px] right-0 h-[calc(100vh-108px)] w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto", isSidebarOpen ? "translate-x-0" : "translate-x-full"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-red-600",
                                children: "Campaign Menu"
                            }, void 0, false, {
                                fileName: "[project]/src/components/CampaignLayout.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsSidebarOpen(false),
                                className: "text-slate-500 hover:text-red-600 transition-colors",
                                "aria-label": "Close menu",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CampaignSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col lg:flex-row min-h-[calc(100vh-72px)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden lg:block border-r border-slate-200 flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CampaignSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex-1 space-y-6 w-full max-w-7xl mx-auto px-4 lg:px-8 py-10", className),
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
const __TURBOPACK__default__export__ = CampaignLayout;
}),
"[project]/src/components/CampaignCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
const baseClass = "bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-4 md:p-5 animate-fade-in transition-all duration-300";
const accentMap = {
    default: "",
    subtle: "bg-white/70 border-white/20 shadow-lg"
};
const CampaignCard = ({ children, className, accent = "default" })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(baseClass, accentMap[accent], className),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/CampaignCard.tsx",
        lineNumber: 23,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = CampaignCard;
}),
"[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Input.displayName = "Input";
;
}),
"[project]/src/components/AddChannelModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
const API_BASE_URL = (("TURBOPACK compile-time value", "http://localhost:5000") || "").replace(/\/$/, "");
const AddChannelModal = ({ isOpen, onClose, onChannelAdded })=>{
    const [channelInput, setChannelInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 animate-scale-in",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "https://www.youtube.com/img/desktop/yt_1200.png",
                                        alt: "YouTube",
                                        className: "w-8 h-8"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddChannelModal.tsx",
                                        lineNumber: 253,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "text-slate-400 hover:text-slate-600 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-4 top-1/2 -translate-y-1/2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-4 top-1/2 -translate-y-1/2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
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
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 rounded-xl bg-red-50 border-2 border-red-200 text-sm text-red-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold mb-1",
                                        children: "Unable to add channel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AddChannelModal.tsx",
                                        lineNumber: 295,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
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
const __TURBOPACK__default__export__ = AddChannelModal;
}),
"[project]/src/lib/verifiedEmail.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const normalized = undefined;
};
const getVerifiedEmail = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return undefined;
    //TURBOPACK unreachable
    ;
};
const clearVerifiedEmail = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
};
const getSelectedChannelKey = ()=>{
    const email = getVerifiedEmail();
    if (email) {
        return `channel_${email}`;
    }
    // Fallback: try to get from localStorage directly
    const loggedEmail = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return "channel_default"; // Fallback for backward compatibility
};
}),
"[project]/src/components/ManageChannelsModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/verifiedEmail.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const STORAGE_KEY = "vidfly_channel_videos";
const CHANNEL_INFO_STORAGE_KEY = "vidfly_channel_info";
const API_BASE_URL = (("TURBOPACK compile-time value", "http://localhost:5000") || "").replace(/\/$/, "");
const ManageChannelsModal = ({ isOpen, onClose, onChannelRemoved })=>{
    const [channels, setChannels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [deleting, setDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen) {
            loadChannels();
        }
    }, [
        isOpen
    ]);
    const loadChannels = async ()=>{
        try {
            // First try to load from backend
            const userEmail = localStorage.getItem("logged_user_email") || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVerifiedEmail"])();
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
            const userEmail = localStorage.getItem("logged_user_email") || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVerifiedEmail"])();
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
            const channelKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSelectedChannelKey"])();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col animate-scale-in",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-b border-slate-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold text-slate-900",
                                    children: "Manage Channels"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "text-slate-400 hover:text-slate-600 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6",
                    children: channels.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-12 text-slate-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-semibold mb-2",
                                children: "No channels added yet"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                lineNumber: 179,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: channels.map((channel)=>{
                            const storedVideos = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
                            const videoCount = storedVideos.filter((v)=>v.channelId === channel.channelId).length;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-purple-300 bg-white hover:bg-purple-50/30 transition-all duration-200",
                                children: [
                                    channel.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: channel.avatar,
                                        alt: channel.name,
                                        className: "w-14 h-14 rounded-full object-cover border-2 border-purple-200 shadow-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                        lineNumber: 194,
                                        columnNumber: 23
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md",
                                        children: channel.name.charAt(0).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                        lineNumber: 200,
                                        columnNumber: 23
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-base font-bold text-slate-900 truncate",
                                                children: channel.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                                lineNumber: 205,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        onClick: ()=>handleRemoveChannel(channel.channelId),
                                        disabled: deleting === channel.channelId,
                                        className: "text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300",
                                        children: deleting === channel.channelId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs",
                                            children: "Removing..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ManageChannelsModal.tsx",
                                            lineNumber: 226,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-t border-slate-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
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
const __TURBOPACK__default__export__ = ManageChannelsModal;
}),
"[project]/src/components/ChannelSelector.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AddChannelModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AddChannelModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ManageChannelsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ManageChannelsModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/verifiedEmail.ts [app-ssr] (ecmascript)");
;
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
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [storedVideos, setStoredVideos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [channelInfoMap, setChannelInfoMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const [selectedChannelId, setSelectedChannelId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showDropdown, setShowDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadingChannels, setLoadingChannels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [showAddModal, setShowAddModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showManageModal, setShowManageModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load all channels from backend (PRIMARY SOURCE - cross-device sync)
    const loadAllChannels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }, []); // Remove channelInfoMap dependency to prevent infinite loops
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }, []);
    // Load all channels from backend/localStorage on mount and when email changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadAllChannels();
    }, [
        loadAllChannels
    ]);
    // Listen for channelChanged events (when channel is updated from other components)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleChannelChanged = (event)=>{
            const { channelId, channelName } = event.detail;
            if (channelId) {
                setSelectedChannelId(channelId);
                // Save to localStorage for fast UI
                const userEmail = localStorage.getItem("logged_user_email") || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVerifiedEmail"])();
                if (userEmail) {
                    const channelKey = `channel_${userEmail}`;
                    localStorage.setItem(channelKey, channelId);
                }
                // If channel not in map, add it immediately for instant UI feedback
                if (!channelInfoMap.has(channelId) && channelName) {
                    setChannelInfoMap((prev)=>{
                        const newMap = new Map(prev);
                        newMap.set(channelId, {
                            channelId,
                            name: channelName,
                            avatar: ""
                        });
                        return newMap;
                    });
                }
                // Then reload all channels from backend to get full data
                loadAllChannels();
            }
        };
        window.addEventListener('channelChanged', handleChannelChanged);
        return ()=>{
            window.removeEventListener('channelChanged', handleChannelChanged);
        };
    }, [
        channelInfoMap,
        loadAllChannels
    ]);
    const fetchChannelInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (channelId, channelName)=>{
        // Skip if already loading or already cached
        if (loadingChannels.has(channelId) || channelInfoMap.has(channelId)) {
            return;
        }
        setLoadingChannels((prev)=>new Set(prev).add(channelId));
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
            setChannelInfoMap((prev)=>{
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
        } finally{
            setLoadingChannels((prev)=>{
                const newSet = new Set(prev);
                newSet.delete(channelId);
                return newSet;
            });
        }
    }, [
        loadingChannels,
        channelInfoMap
    ]);
    // Fetch channel info for channels that don't have cached info
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (storedVideos.length === 0) return;
        const channelIdsToFetch = new Set();
        storedVideos.forEach((video)=>{
            if (video.channelId && video.author) {
                if (!channelInfoMap.has(video.channelId) && !loadingChannels.has(video.channelId)) {
                    channelIdsToFetch.add(video.channelId);
                }
            }
        });
        channelIdsToFetch.forEach((channelId)=>{
            const video = storedVideos.find((v)=>v.channelId === channelId);
            if (video?.author) {
                fetchChannelInfo(channelId, video.author);
            }
        });
    }, [
        storedVideos,
        channelInfoMap,
        loadingChannels,
        fetchChannelInfo
    ]);
    const availableChannels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const channelMap = new Map();
        // Add channels from stored videos
        storedVideos.forEach((video)=>{
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
        });
        // Also include channels from channelInfoMap (saved channels from backend that may not be in storedVideos)
        channelInfoMap.forEach((info, channelId)=>{
            if (!channelMap.has(channelId)) {
                channelMap.set(channelId, {
                    channelId: info.channelId,
                    name: info.name,
                    avatar: info.avatar
                });
            }
        });
        return Array.from(channelMap.values());
    }, [
        storedVideos,
        channelInfoMap
    ]);
    const selectedChannel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return availableChannels.find((ch)=>ch.channelId === selectedChannelId);
    }, [
        availableChannels,
        selectedChannelId
    ]);
    // Listen for storage changes (when channel is changed in another tab) - GPT suggestion
    // This must be after availableChannels is defined
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const userEmail = undefined;
        const channelKey = undefined;
        const handleStorageChange = undefined;
    }, [
        availableChannels
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            const target = event.target;
            if (!target.closest('.channel-selector-container')) {
                setShowDropdown(false);
            }
        };
        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
            return ()=>document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [
        showDropdown
    ]);
    const handleChannelClick = async (channelId, channelName)=>{
        setSelectedChannelId(channelId);
        // Get email from localStorage (stored after login)
        const userEmail = localStorage.getItem("logged_user_email") || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVerifiedEmail"])();
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
            const userEmail = localStorage.getItem("logged_user_email") || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVerifiedEmail"])();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "channel-selector-container relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>{
                    if (availableChannels.length === 0) {
                        setShowAddModal(true);
                    } else {
                        setShowDropdown(!showDropdown);
                    }
                },
                className: "flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all duration-200 min-w-0 max-w-full",
                children: selectedChannel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        selectedChannel.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: selectedChannel.avatar,
                            alt: selectedChannel.name,
                            className: "w-8 h-8 rounded-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChannelSelector.tsx",
                            lineNumber: 451,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs",
                            children: selectedChannel.name.charAt(0).toUpperCase()
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChannelSelector.tsx",
                            lineNumber: 457,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-semibold text-slate-900 truncate min-w-0",
                            children: selectedChannel.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChannelSelector.tsx",
                            lineNumber: 461,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: `https://www.youtube.com/channel/${selectedChannel.channelId}`,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            onClick: (e)=>e.stopPropagation(),
                            className: "hover:opacity-80 transition-opacity",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                        availableChannels.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                            className: `w-4 h-4 text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChannelSelector.tsx",
                            lineNumber: 478,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs",
                            children: availableChannels.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-slate-500",
                            children: availableChannels.length === 0 ? "Add channel" : "Select channel"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ChannelSelector.tsx",
                            lineNumber: 486,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        availableChannels.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
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
            showDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-20 right-0 sm:right-0 mt-2 bg-white border-2 border-red-200 rounded-2xl shadow-2xl max-h-80 overflow-y-auto w-[calc(100vw-32px)] sm:min-w-[380px] sm:w-max animate-fade-in backdrop-blur-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-3",
                    children: [
                        availableChannels.map((channel)=>{
                            const channelVideos = storedVideos.filter((v)=>v.channelId === channel.channelId);
                            const isLoading = loadingChannels.has(channel.channelId);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>handleChannelClick(channel.channelId, channel.name),
                                className: `w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-200 text-left mb-1 ${selectedChannelId === channel.channelId ? 'bg-gradient-to-r from-red-50 to-red-100 border border-red-200' : ''}`,
                                children: [
                                    channel.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: channel.avatar,
                                        alt: channel.name,
                                        className: "w-12 h-12 rounded-full object-cover border-2 border-red-200 shadow-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChannelSelector.tsx",
                                        lineNumber: 512,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-md",
                                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                    selectedChannelId === channel.channelId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-6 h-6 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-md flex-shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: (e)=>{
                                e.stopPropagation();
                                setShowDropdown(false);
                                setTimeout(()=>setShowAddModal(true), 100);
                            },
                            className: "w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-200 text-left border-2 border-dashed border-red-200 bg-red-50/30 mt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white flex-shrink-0 shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-bold text-red-600",
                                            children: "Add another channel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChannelSelector.tsx",
                                            lineNumber: 550,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                        availableChannels.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: (e)=>{
                                e.stopPropagation();
                                setShowDropdown(false);
                                setTimeout(()=>setShowManageModal(true), 100);
                            },
                            className: "w-full flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 transition-all duration-200 text-left border-t-2 border-slate-200 mt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-bold text-slate-700",
                                            children: "Manage Channels"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChannelSelector.tsx",
                                            lineNumber: 569,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AddChannelModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showAddModal,
                onClose: ()=>setShowAddModal(false),
                onChannelAdded: handleChannelAdded
            }, void 0, false, {
                fileName: "[project]/src/components/ChannelSelector.tsx",
                lineNumber: 578,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ManageChannelsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                        const channelKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSelectedChannelKey"])();
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
const __TURBOPACK__default__export__ = ChannelSelector;
}),
"[project]/src/app/campaign/channel/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CampaignChannel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CampaignLayout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CampaignLayout.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CampaignCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CampaignCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChannelSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ChannelSelector.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/verifiedEmail.ts [app-ssr] (ecmascript)");
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
;
const STORAGE_KEY = "vidfly_channel_videos";
const CHANNEL_INFO_STORAGE_KEY = "vidfly_channel_info";
const API_BASE_URL = (("TURBOPACK compile-time value", "http://localhost:5000") || "").replace(/\/$/, "");
function CampaignChannel() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const verifiedEmail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVerifiedEmail"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!verifiedEmail) {
            router.replace("/get-started");
        }
    }, [
        verifiedEmail,
        router
    ]);
    const [videos, setVideos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedIds, setSelectedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("recent");
    const [channelVideos, setChannelVideos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [channelId, setChannelId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingChannel, setLoadingChannel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [channelError, setChannelError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchLoading, setSearchLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchError, setSearchError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [hasSavedChannel, setHasSavedChannel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadingInitialChannel, setLoadingInitialChannel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Load channels from backend and sessionStorage on mount
    const loadSavedChannels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            setLoadingInitialChannel(false);
            return;
        }
        //TURBOPACK unreachable
        ;
    }, [
        verifiedEmail
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadSavedChannels();
    }, [
        loadSavedChannels
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleChannelChange = (event)=>{
            const { channelId: newChannelId } = event.detail;
            if (newChannelId) {
                setChannelId(newChannelId);
                const channelKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSelectedChannelKey"])();
                localStorage.setItem(channelKey, newChannelId);
            }
        };
        window.addEventListener('channelChanged', handleChannelChange);
        return ()=>{
            window.removeEventListener('channelChanged', handleChannelChange);
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchChannelVideos = async ()=>{
            if (!channelId) return;
            try {
                setLoadingChannel(true);
                setChannelError("");
                const params = new URLSearchParams({
                    channelId,
                    maxResults: "15",
                    order: "date"
                });
                const response = await fetch(`${API_BASE_URL}/api/youtube/channel-videos?${params.toString()}`);
                if (!response.ok) {
                    const data = await response.json().catch(()=>({}));
                    throw new Error(data?.message || "Unable to load channel videos");
                }
                const data = await response.json();
                const mapped = (data.videos || []).map((video)=>({
                        title: video.title,
                        author: video.author,
                        videoId: video.videoId,
                        thumbnail: video.thumbnail,
                        link: `https://www.youtube.com/watch?v=${video.videoId}`,
                        channelId
                    }));
                setChannelVideos(mapped);
                if (mapped.length > 0 && mapped[0].author) {
                    try {
                        const userEmail = verifiedEmail;
                        if (userEmail) {
                            let channelAvatar = "";
                            try {
                                const channelInfoResponse = await fetch(`${API_BASE_URL}/api/youtube/channel-info?channelId=${encodeURIComponent(channelId)}`);
                                if (channelInfoResponse.ok) {
                                    const channelInfoData = await channelInfoResponse.json();
                                    channelAvatar = channelInfoData.avatar || "";
                                }
                            } catch (infoErr) {
                                console.warn("Failed to fetch channel avatar:", infoErr);
                            }
                            await fetch(`${API_BASE_URL}/api/user-preferences/channels`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    email: userEmail,
                                    channelId: channelId,
                                    channelName: mapped[0].author,
                                    channelAvatar: channelAvatar
                                }),
                                credentials: "include"
                            });
                            window.dispatchEvent(new CustomEvent('channelChanged', {
                                detail: {
                                    channelId,
                                    channelName: mapped[0].author
                                }
                            }));
                        }
                    } catch (err) {
                        console.warn("Failed to save channel to backend:", err);
                    }
                }
            } catch (err) {
                setChannelError(err instanceof Error ? err.message : "Unable to load channel videos");
            } finally{
                setLoadingChannel(false);
            }
        };
        fetchChannelVideos();
    }, [
        channelId,
        verifiedEmail
    ]);
    const mergedVideos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (channelVideos.length) return channelVideos;
        if (channelId) return videos.filter((video)=>video.channelId === channelId);
        return videos;
    }, [
        channelVideos,
        videos,
        channelId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (channelVideos.length > 0 && selectedIds.length === 0) {
            const availableIds = channelVideos.slice(0, 5).map((v)=>v.videoId);
            setSelectedIds(availableIds);
        }
    }, [
        channelVideos,
        selectedIds.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchSearch = async ()=>{
            if (!channelId || !search.trim() || tab !== "all") {
                setSearchResults([]);
                setSearchError("");
                return;
            }
            try {
                setSearchLoading(true);
                setSearchError("");
                const params = new URLSearchParams({
                    channelId,
                    maxResults: "5",
                    query: search,
                    order: "relevance"
                });
                const response = await fetch(`${API_BASE_URL}/api/youtube/channel-videos?${params.toString()}`);
                if (!response.ok) {
                    const data = await response.json().catch(()=>({}));
                    throw new Error(data?.message || "Unable to search channel videos");
                }
                const data = await response.json();
                const mapped = (data.videos || []).slice(0, 5).map((video)=>({
                        title: video.title,
                        author: video.author,
                        videoId: video.videoId,
                        thumbnail: video.thumbnail,
                        link: `https://www.youtube.com/watch?v=${video.videoId}`,
                        channelId
                    }));
                setSearchResults(mapped);
            } catch (err) {
                setSearchError(err instanceof Error ? err.message : "Unable to search channel videos");
            } finally{
                setSearchLoading(false);
            }
        };
        fetchSearch();
    }, [
        channelId,
        search,
        tab
    ]);
    const filteredVideos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (tab === "all" && search.trim()) return searchResults.slice(0, 5);
        if (channelVideos.length) return channelVideos.slice(0, 5);
        return mergedVideos.slice(0, 5);
    }, [
        tab,
        channelVideos,
        mergedVideos,
        search,
        searchResults
    ]);
    const toggleVideo = (videoId)=>{
        const video = mergedVideos.find((v)=>v.videoId === videoId);
        if (video?.channelId && video.channelId !== channelId) {
            setChannelId(video.channelId);
            const channelKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSelectedChannelKey"])();
            localStorage.setItem(channelKey, video.channelId);
            window.dispatchEvent(new CustomEvent("channelChanged", {
                detail: {
                    channelId: video.channelId,
                    channelName: video.author || "Channel"
                }
            }));
        }
        setSelectedIds((prev)=>{
            if (prev.includes(videoId)) return prev.filter((id)=>id !== videoId);
            if (prev.length >= 5) return prev;
            return [
                ...prev,
                videoId
            ];
        });
    };
    const handleNext = ()=>{
        if (!selectedIds.length) return;
        const videoMap = new Map(mergedVideos.map((video)=>[
                video.videoId,
                video
            ]));
        const selectedVideos = selectedIds.map((id)=>videoMap.get(id)).filter(Boolean);
        if (!selectedVideos.length) return;
        const primary = selectedVideos[0];
        if (primary.channelId) {
            const channelKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSelectedChannelKey"])();
            localStorage.setItem(channelKey, primary.channelId);
            window.dispatchEvent(new CustomEvent("channelChanged", {
                detail: {
                    channelId: primary.channelId,
                    channelName: primary.author || "Channel"
                }
            }));
        }
        sessionStorage.setItem("vidfly_current_campaign_video", JSON.stringify(primary));
        sessionStorage.setItem("vidfly_current_campaign_videos", JSON.stringify(selectedVideos));
        router.push("/campaign/budget");
    };
    if (loadingInitialChannel) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CampaignLayout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            activeSidebar: "promote",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CampaignCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                className: "text-center space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/app/campaign/channel/page.tsx",
                            lineNumber: 343,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/campaign/channel/page.tsx",
                        lineNumber: 342,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-500",
                        children: "Loading your channels..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/campaign/channel/page.tsx",
                        lineNumber: 345,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/campaign/channel/page.tsx",
                lineNumber: 341,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/campaign/channel/page.tsx",
            lineNumber: 340,
            columnNumber: 13
        }, this);
    }
    if (!videos.length && !hasSavedChannel && !channelId) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CampaignLayout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            activeSidebar: "promote",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CampaignCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                className: "text-center space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-slate-900",
                        children: "Add a Channel First"
                    }, void 0, false, {
                        fileName: "[project]/src/app/campaign/channel/page.tsx",
                        lineNumber: 355,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-500",
                        children: 'We couldn\'t find any stored videos yet. Add a video link on the "Promote Video / Short" step to populate your channel library.'
                    }, void 0, false, {
                        fileName: "[project]/src/app/campaign/channel/page.tsx",
                        lineNumber: 356,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>router.replace("/campaign"),
                        className: "bg-red-600 hover:bg-red-700 rounded-2xl px-6",
                        children: "Go to Promote Video"
                    }, void 0, false, {
                        fileName: "[project]/src/app/campaign/channel/page.tsx",
                        lineNumber: 360,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/campaign/channel/page.tsx",
                lineNumber: 354,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/campaign/channel/page.tsx",
            lineNumber: 353,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CampaignLayout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        activeSidebar: "channel",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl border border-slate-200 p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col sm:flex-row items-center justify-between mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-semibold text-slate-600 uppercase",
                                    children: "STEP 2 - SELECT VIDEOS"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/campaign/channel/page.tsx",
                                    lineNumber: 376,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ChannelSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    onChannelSelect: (newChannelId)=>{
                                        setChannelId(newChannelId);
                                        setChannelVideos([]);
                                        setSelectedIds([]);
                                        const channelKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$verifiedEmail$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSelectedChannelKey"])();
                                        localStorage.setItem(channelKey, newChannelId);
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/campaign/channel/page.tsx",
                                    lineNumber: 377,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/campaign/channel/page.tsx",
                            lineNumber: 375,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                "ENTER LINK",
                                "SELECT VIDEOS",
                                "BUDGET & TARGETING",
                                "PAYMENT"
                            ].map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 flex items-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `h-2 flex-1 rounded-full ${index <= 1 ? "bg-red-600" : "bg-slate-200"}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/campaign/channel/page.tsx",
                                                lineNumber: 392,
                                                columnNumber: 41
                                            }, this),
                                            index < 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `h-2 w-2 rounded-full ${index <= 1 ? "bg-red-600" : "bg-slate-200"}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/campaign/channel/page.tsx",
                                                lineNumber: 394,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/campaign/channel/page.tsx",
                                        lineNumber: 391,
                                        columnNumber: 37
                                    }, this)
                                }, step, false, {
                                    fileName: "[project]/src/app/campaign/channel/page.tsx",
                                    lineNumber: 390,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/campaign/channel/page.tsx",
                            lineNumber: 387,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/campaign/channel/page.tsx",
                    lineNumber: 374,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CampaignCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-500 uppercase font-semibold mb-2",
                                    children: "Step 2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/campaign/channel/page.tsx",
                                    lineNumber: 405,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl font-bold text-slate-900 mb-3",
                                    children: "Select videos to promote"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/campaign/channel/page.tsx",
                                    lineNumber: 406,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-600 text-base leading-relaxed",
                                    children: "You can select up to five videos from your stored channel links."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/campaign/channel/page.tsx",
                                    lineNumber: 409,
                                    columnNumber: 25
                                }, this),
                                !channelId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 mt-3 inline-block",
                                    children: "💡 Tip: paste a video link from the same channel on the previous step to unlock channel-wide recommendations."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/campaign/channel/page.tsx",
                                    lineNumber: 413,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/campaign/channel/page.tsx",
                            lineNumber: 404,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-3",
                            children: [
                                [
                                    {
                                        label: "Recent videos",
                                        value: "recent"
                                    },
                                    {
                                        label: "All Videos",
                                        value: "all"
                                    }
                                ].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setTab(option.value),
                                        className: `px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-300 ${tab === option.value ? "bg-red-600 text-white border-red-600 shadow-lg" : "border-slate-200 text-slate-600 hover:border-red-300 hover:bg-red-50"}`,
                                        children: option.label
                                    }, option.value, false, {
                                        fileName: "[project]/src/app/campaign/channel/page.tsx",
                                        lineNumber: 425,
                                        columnNumber: 29
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-semibold text-amber-700 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 px-4 py-2 rounded-xl shadow-sm",
                                    children: "Max 5 videos"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/campaign/channel/page.tsx",
                                    lineNumber: 437,
                                    columnNumber: 25
                                }, this),
                                filteredVideos.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 ml-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "button",
                                            variant: "outline",
                                            size: "sm",
                                            className: "text-xs rounded-xl border-red-300 text-red-600 hover:bg-red-50",
                                            onClick: ()=>{
                                                const availableIds = filteredVideos.slice(0, 5).map((v)=>v.videoId);
                                                setSelectedIds(availableIds);
                                            },
                                            disabled: selectedIds.length >= 5,
                                            children: "Select All"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/campaign/channel/page.tsx",
                                            lineNumber: 442,
                                            columnNumber: 33
                                        }, this),
                                        selectedIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "button",
                                            variant: "outline",
                                            size: "sm",
                                            className: "text-xs rounded-xl border-slate-300 text-slate-600 hover:bg-slate-50",
                                            onClick: ()=>setSelectedIds([]),
                                            children: "Deselect All"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/campaign/channel/page.tsx",
                                            lineNumber: 458,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/campaign/channel/page.tsx",
                                    lineNumber: 441,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/campaign/channel/page.tsx",
                            lineNumber: 420,
                            columnNumber: 21
                        }, this),
                        channelError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 p-3 rounded-2xl bg-red-50 border border-red-100 text-sm text-red-600",
                            children: channelError
                        }, void 0, false, {
                            fileName: "[project]/src/app/campaign/channel/page.tsx",
                            lineNumber: 473,
                            columnNumber: 25
                        }, this),
                        tab === "all" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 bg-slate-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            className: "text-slate-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/campaign/channel/page.tsx",
                                            lineNumber: 481,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                            placeholder: "Search using your YouTube video title",
                                            value: search,
                                            onChange: (e)=>setSearch(e.target.value),
                                            className: "border-0 shadow-none focus-visible:ring-0 bg-transparent"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/campaign/channel/page.tsx",
                                            lineNumber: 482,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "button",
                                            variant: "ghost",
                                            className: "text-slate-600",
                                            onClick: ()=>setSearch(""),
                                            children: "Clear"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/campaign/channel/page.tsx",
                                            lineNumber: 488,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/campaign/channel/page.tsx",
                                    lineNumber: 480,
                                    columnNumber: 29
                                }, this),
                                searchError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600",
                                    children: searchError
                                }, void 0, false, {
                                    fileName: "[project]/src/app/campaign/channel/page.tsx",
                                    lineNumber: 498,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/campaign/channel/page.tsx",
                            lineNumber: 479,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                loadingChannel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm",
                                    children: searchLoading ? "Searching..." : "Loading channel videos..."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/campaign/channel/page.tsx",
                                    lineNumber: 507,
                                    columnNumber: 29
                                }, this),
                                filteredVideos.map((video)=>{
                                    const isSelected = selectedIds.includes(video.videoId);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex flex-col md:flex-row items-center gap-4 border rounded-xl p-4 ${isSelected ? "bg-red-50 border-red-200" : "bg-white border-slate-200"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: video.thumbnail,
                                                        alt: video.title,
                                                        className: "w-32 h-20 rounded-xl object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/campaign/channel/page.tsx",
                                                        lineNumber: 520,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-semibold text-slate-900",
                                                                children: video.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/campaign/channel/page.tsx",
                                                                lineNumber: 526,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-500 mt-1",
                                                                children: video.author
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/campaign/channel/page.tsx",
                                                                lineNumber: 529,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/campaign/channel/page.tsx",
                                                        lineNumber: 525,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/campaign/channel/page.tsx",
                                                lineNumber: 519,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>toggleVideo(video.videoId),
                                                className: `w-10 h-10 rounded-full flex items-center justify-center border ${isSelected ? "bg-red-600 text-white border-red-600" : "border-slate-300 text-slate-400"}`,
                                                children: isSelected ? "✓" : ""
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/campaign/channel/page.tsx",
                                                lineNumber: 532,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, video.videoId, true, {
                                        fileName: "[project]/src/app/campaign/channel/page.tsx",
                                        lineNumber: 514,
                                        columnNumber: 33
                                    }, this);
                                })
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/campaign/channel/page.tsx",
                            lineNumber: 505,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-slate-500",
                                    children: [
                                        selectedIds.length,
                                        " / 5 videos selected"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/campaign/channel/page.tsx",
                                    lineNumber: 548,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            className: "rounded-xl border-slate-300 text-slate-600 px-6",
                                            onClick: ()=>router.push("/campaign"),
                                            children: "Back"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/campaign/channel/page.tsx",
                                            lineNumber: 552,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            className: "rounded-xl bg-red-600 hover:bg-red-700 px-6",
                                            disabled: !selectedIds.length,
                                            onClick: handleNext,
                                            children: "Continue"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/campaign/channel/page.tsx",
                                            lineNumber: 559,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/campaign/channel/page.tsx",
                                    lineNumber: 551,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/campaign/channel/page.tsx",
                            lineNumber: 547,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/campaign/channel/page.tsx",
                    lineNumber: 403,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/campaign/channel/page.tsx",
            lineNumber: 373,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/campaign/channel/page.tsx",
        lineNumber: 372,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=src_b1758d1c._.js.map