import type { Metadata } from "next";
import { Inter, Montserrat, Open_Sans, Source_Sans_3 } from "next/font/google";
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
import SmoothScroll from "@/components/SmoothScroll";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
});

const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-opensans",
});

const sourceSans = Source_Sans_3({
    subsets: ["latin"],
    variable: "--font-sourcesans",
});

import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata();

import { GoogleAnalytics, MetaPixel } from "@/components/Analytics";
import { OrganizationSchema, ServiceSchema } from "@/components/Schema";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.variable} ${openSans.variable} ${sourceSans.variable} antialiased font-montserrat`}>
                <GoogleAnalytics />
                <MetaPixel />
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
