
import { useState, createContext, useContext } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Context for campaign sidebar toggle
type CampaignSidebarContextType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
};

export const CampaignSidebarContext = createContext<CampaignSidebarContextType | null>(null);

export const useCampaignSidebar = () => {
  const context = useContext(CampaignSidebarContext);
  return context;
};

// Campaign Hamburger Button Component - Must be defined before Navbar
function CampaignHamburgerButton() {
  const sidebarContext = useCampaignSidebar();

  if (!sidebarContext) return null;

  const { isSidebarOpen, setIsSidebarOpen } = sidebarContext;

  return (
    <button
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      className="text-gray-700 hover:text-red-600 transition-colors duration-300 p-2"
      aria-label="Toggle campaign menu"
    >
      {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on a campaign page
  const isCampaignPage = location.pathname.startsWith('/campaign');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    scrollToTop();
    setIsOpen(false);
  };

  const handleGetStartedClick = () => {
    handleNavClick("/get-started");
  };

  return (
    <nav className="bg-white footer-shadow sticky top-0 z-50 font-montserrat w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 lg:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 mr-8 lg:mr-12" onClick={scrollToTop}>
            <img src="/lovable-uploads/0b27d722-c6a7-47e3-ae7d-aeb8461db170.png" alt="Vidflyy" className="h-9 w-auto" />
          </Link>

          {/* Desktop Nav Links - sit right next to the logo */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button onClick={() => handleNavClick("/how-it-works")} className="text-[#0E172B] hover:text-red-600 text-[14px] font-semibold transition-colors duration-300 whitespace-nowrap">
              How Vidflyy Works
            </button>
            <button onClick={() => handleNavClick("/pricing")} className="text-[#0E172B] hover:text-red-600 text-[14px] font-semibold transition-colors duration-300 whitespace-nowrap">
              Pricing
            </button>
            <button onClick={() => handleNavClick("/features")} className="text-[#0E172B] hover:text-red-600 text-[14px] font-semibold transition-colors duration-300 whitespace-nowrap">
              Features
            </button>
            <button onClick={() => handleNavClick("/success-stories")} className="text-[#0E172B] hover:text-red-600 text-[14px] font-semibold transition-colors duration-300 whitespace-nowrap">
              Success Stories
            </button>
            <button onClick={() => handleNavClick("/faq")} className="text-[#0E172B] hover:text-red-600 text-[14px] font-semibold transition-colors duration-300 whitespace-nowrap">
              FAQ
            </button>
            <button onClick={() => handleNavClick("/contact")} className="text-[#0E172B] hover:text-red-600 text-[14px] font-semibold transition-colors duration-300 whitespace-nowrap">
              Contact Us
            </button>
          </div>

          {/* Right side: Login + CTA pushed to the far right */}
          <div className="hidden lg:flex items-center gap-6 ml-auto shrink-0">
            <button onClick={() => handleNavClick("/")} className="text-[#0E172B] hover:text-red-600 text-[14px] font-semibold whitespace-nowrap">
              Login
            </button>
            <Button
              onClick={handleGetStartedClick}
              className="bg-[#E52D27] hover:bg-[#D42621] text-white px-6 py-5 rounded-lg text-[14px] font-bold transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
            >
              Get started now
            </Button>
          </div>

          {/* Hamburger Menu Icon - Visible below 1024px */}
          <div className="lg:hidden ml-auto">
            {!isCampaignPage ? (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-red-600 transition-colors duration-300 p-2"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            ) : (
              <CampaignHamburgerButton />
            )}
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden animate-fade-in pb-6">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {[
                { label: "How Vidflyy Works", path: "/how-it-works" },
                { label: "Pricing", path: "/pricing" },
                { label: "Features", path: "/features" },
                { label: "Success Stories", path: "/success-stories" },
                { label: "FAQ", path: "/faq" },
                { label: "Contact Us", path: "/contact" },
              ].map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className="text-[#0E172B] hover:text-red-600 block px-3 py-4 text-lg font-bold w-full text-left transition-colors duration-300 border-b border-gray-50"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-6 space-y-4 px-3">
                <button onClick={() => handleNavClick("/")} className="text-[#0E172B] font-bold w-full text-left text-lg">
                  Login
                </button>
                <Button onClick={handleGetStartedClick} className="bg-[#E52D27] hover:bg-[#D42621] text-white w-full py-7 text-lg font-bold rounded-xl shadow-lg">
                  Get started now
                </Button>
              </div>
            </div>
          </div>
        )}




      </div>
    </nav>
  );
};

export default Navbar;
