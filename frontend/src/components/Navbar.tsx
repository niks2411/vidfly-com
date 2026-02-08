
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
    <nav className="bg-white shadow-sm sticky top-0 z-50 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center" onClick={scrollToTop}>
            <img src="/lovable-uploads/0b27d722-c6a7-47e3-ae7d-aeb8461db170.png" alt="Vidflyy" className="h-8 w-auto" />
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => handleNavClick("/")} className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
                HOME
              </button>
              <button onClick={() => handleNavClick("/features")} className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
                FEATURES
              </button>
              <button onClick={() => handleNavClick("/success-stories")} className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
                SUCCESS STORIES
              </button>
              <button onClick={() => handleNavClick("/pricing")} className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
                PRICING
              </button>
              <button onClick={() => handleNavClick("/contact")} className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
                CONTACT US
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <Button onClick={handleGetStartedClick} className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 hover:scale-105 active:scale-95 rounded-xl">
              Get Started
            </Button>
          </div>

          <div className="md:hidden">
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
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button onClick={() => handleNavClick("/")} className="text-gray-700 hover:text-red-600 block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300">
                HOME
              </button>
              <button onClick={() => handleNavClick("/features")} className="text-gray-700 hover:text-red-600 block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300">
                FEATURES
              </button>
              <button onClick={() => handleNavClick("/success-stories")} className="text-gray-700 hover:text-red-600 block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300">
                SUCCESS STORIES
              </button>
              <button onClick={() => handleNavClick("/pricing")} className="text-gray-700 hover:text-red-600 block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300">
                PRICING
              </button>
              <button onClick={() => handleNavClick("/contact")} className="text-gray-700 hover:text-red-600 block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300">
                CONTACT US
              </button>
              <Button onClick={handleGetStartedClick} className="bg-red-600 hover:bg-red-700 text-white w-full mt-4 transition-all duration-300 hover:scale-105 active:scale-95">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
