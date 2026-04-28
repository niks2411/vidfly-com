import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Providers from "./providers";
import { AuthProvider } from "@/context/AuthContext";
import { CampaignSidebarProvider } from "./campaign-sidebar-provider";
import ScrollToTop from "@/components/ScrollToTop";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata();

import { OrganizationSchema, ServiceSchema } from "@/components/Schema";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Google Tag Manager */}
                <Script id="gtm-head" strategy="afterInteractive">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-PN9K7TGV');`}
                </Script>
                {/* Google tag (gtag.js) - GA4 */}
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-7T7YS01LWV" strategy="afterInteractive" />
                <Script id="ga4-init" strategy="afterInteractive">
                    {`window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-7T7YS01LWV');`}
                </Script>
                {/* Google tag (gtag.js) - Google Ads */}
                <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17928293635" strategy="afterInteractive" />
                <Script id="gads-init" strategy="afterInteractive">
                    {`window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'AW-17928293635');`}
                </Script>
            </head>
            <body className="antialiased font-founders text-[rgb(41,40,40)]">
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-PN9K7TGV"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                <OrganizationSchema />
                <ServiceSchema />
                <CampaignSidebarProvider>
                    <AuthProvider>
                        <Providers>
                            <TooltipProvider>
                                <SmoothScroll>
                                    <ScrollToTop />
                                    <Navbar />
                                    <main>{children}</main>
                                    <Footer />
                                    <WhatsAppFloat />
                                    <Toaster />
                                    <Sonner />
                                </SmoothScroll>
                            </TooltipProvider>
                        </Providers>
                    </AuthProvider>
                </CampaignSidebarProvider>
            </body>
        </html>
    );
}
