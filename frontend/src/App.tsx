import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Features from "./pages/Features";
import SuccessStoriesPage from "./pages/SuccessStories";
import Contact from "./pages/Contact";
import PricingPage from "./pages/Pricing";
import TermsAndConditions from "./pages/terms-and-conditions";
import PrivacyPolicy from "./pages/privacy-policy";
import Disclaimer from "./pages/disclaimer";
import RefundPolicy from "./pages/refund-policy";
import NotFound from "./pages/NotFound";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Blog from "./pages/Blog";
import YoutubeMusicPromotion from "./pages/YoutubeMusicPromotion";
import YoutubeGamingPromotion from "./pages/YoutubeGamingPromotion";
import YoutubeTravelPromotion from "./pages/YoutubeTravelPromotion";
import YoutubeHealthBeautyPromotion from "./pages/YoutubeHealthBeautyPromotion";
import YoutubeMotivationPromotion from "./pages/YoutubeMotivationPromotion";
import YoutubeVloggingPromotion from "./pages/YoutubeVloggingPromotion";
import GetStarted from "./pages/GetStarted";
import CampaignDashboard from "./pages/CampaignDashboard";
import CampaignBudget from "./pages/CampaignBudget";
import CampaignChannel from "./pages/CampaignChannel";
import CampaignPackages from "./pages/CampaignPackages";
import CampaignPackageDetail from "./pages/CampaignPackageDetail";
import CampaignBulkViews from "./pages/CampaignBulkViews";
import CampaignBulkViewsSelect from "./pages/CampaignBulkViewsSelect";
import CampaignFreeViews from "./pages/CampaignFreeViews";
import MyCampaigns from "./pages/MyCampaigns";
import AdminPanel from "./pages/AdminPanel";
import AdminCompleted from "./pages/AdminCompleted";
import PaymentCheckout from "./pages/PaymentCheckout";
import PaymentCallback from "./pages/PaymentCallback";
import ScrollToTop from "./components/ScrollToTop";
import CanonicalTag from "./components/CanonicalTag";
import { AuthProvider } from "./context/AuthContext";
const queryClient = new QueryClient();


const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/youtube-vlogging-promotion" element={<YoutubeVloggingPromotion />} />
            <Route path="/youtube-motivation-promotion" element={<YoutubeMotivationPromotion />} />
            <Route path="/youtube-health-beauty-promotion" element={<YoutubeHealthBeautyPromotion />} />
            <Route path="/youtube-travel-promotion" element={<YoutubeTravelPromotion />} />
            <Route path="/youtube-gaming-promotion" element={<YoutubeGamingPromotion />} />
            <Route path="/youtube-music-promotion" element={<YoutubeMusicPromotion />} />
            <Route path="/features" element={<Features />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/campaign" element={<CampaignDashboard />} />
            <Route path="/campaign/channel" element={<CampaignChannel />} />
            <Route path="/campaign/budget" element={<CampaignBudget />} />
            <Route path="/campaign/packages" element={<CampaignPackages />} />
            <Route path="/campaign/packages/:id" element={<CampaignPackageDetail />} />
            <Route path="/campaign/bulk-views" element={<CampaignBulkViews />} />
            <Route path="/campaign/bulk-views/select" element={<CampaignBulkViewsSelect />} />
            <Route path="/campaign/free-views" element={<CampaignFreeViews />} />
            <Route path="/campaign/my-campaigns" element={<MyCampaigns />} />
            <Route path="/payment/checkout" element={<PaymentCheckout />} />
            <Route path="/payment/callback" element={<PaymentCallback />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/completed" element={<AdminCompleted />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppFloat />
          <CanonicalTag />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);


export default App;
