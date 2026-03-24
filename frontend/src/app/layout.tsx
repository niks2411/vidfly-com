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
            </head>
            <body className="antialiased font-founders text-[rgb(41,40,40)]">
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
