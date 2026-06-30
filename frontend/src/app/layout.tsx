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
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";
import { constructMetadata } from "@/lib/seo";
import Testimonials from "@/components/Testimonials";

export const metadata = constructMetadata();

import { OrganizationSchema, ServiceSchema } from "@/components/Schema";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* DOM resilience patch — must load before any third-party scripts */}
                <Script id="dom-patch" strategy="beforeInteractive">
                    {`(function(){if(typeof Node==='undefined')return;var ct=0;var oRC=Node.prototype.removeChild;Node.prototype.removeChild=function(c){if(c.parentNode!==this){ct++;console.warn('[DOM-Patch] removeChild blocked #'+ct,{parent:this.tagName||'#text',child:c.tagName||'#text',childId:c.id||'',url:location.pathname});return c}return oRC.call(this,c)};var oIB=Node.prototype.insertBefore;Node.prototype.insertBefore=function(n,r){if(r&&r.parentNode!==this){ct++;console.warn('[DOM-Patch] insertBefore blocked #'+ct,{parent:this.tagName||'#text',newNode:n.tagName||'#text',ref:r.tagName||'#text',refId:r.id||'',url:location.pathname});return oIB.call(this,n,null)}return oIB.call(this,n,r)}})();`}
                </Script>
                {/* Google Tag Manager */}
                <Script id="gtm-head" strategy="afterInteractive">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-WPF67LK9');`}
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
                {/* Microsoft Clarity */}
                <Script id="microsoft-clarity" strategy="afterInteractive">
                    {`(function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "wmcpvkuyhc");`}
                </Script>
                <OrganizationSchema />
            </head>
            <body className="antialiased font-founders text-[rgb(41,40,40)]" suppressHydrationWarning>
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-WPF67LK9"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                <ServiceSchema />
                <CampaignSidebarProvider>
                    <AuthProvider>
                        <Providers>
                            <TooltipProvider>
                                <SmoothScroll>
                                    <Navbar />
                                    <main>{children}</main>
                                    <Testimonials />
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
