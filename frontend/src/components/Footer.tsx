import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/917355518761', '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: Facebook, url: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, url: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, url: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, url: "https://youtube.com", label: "YouTube" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-montserrat overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600 rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500 rounded-full opacity-5 blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                  Subscribe to Our <span className="text-red-500">Newsletter</span>
                </h3>
                <p className="text-gray-400">Get the latest YouTube promotion tips and exclusive offers delivered to your inbox.</p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500 h-12 pr-4"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 h-12 font-semibold transition-all duration-300 hover:scale-105 rounded-xl"
                >
                  <Send className="h-4 w-4 mr-2 " />
                  Subscribe
                </Button>
              </form>
              {isSubscribed && (
                <p className="text-green-400 text-sm mt-2 md:col-start-2">✓ Successfully subscribed!</p>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6 group cursor-pointer">
                <div className="text-white text-3xl font-bold">
                  <span className="text-red-500 group-hover:text-red-400 transition-colors duration-300">Vidflyy</span>
                  <span className="group-hover:text-gray-300 transition-colors duration-300"> LLP</span>
                </div>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed text-base">
                Empowering content creators to reach their full potential through strategic YouTube promotion and organic growth solutions. Your success is our mission.
              </p>
              
              {/* Contact Info Cards */}
              <div className="space-y-4 mb-8">
                <a href="mailto:info@videopromotion.digital" className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors duration-300 group">
                  <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-red-600 transition-colors duration-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span>info@videopromotion.digital</span>
                </a>
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="bg-gray-800 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-red-400" />
                  </div>
                  <span>+91 7355518761</span>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="bg-gray-800 p-3 rounded-full hover:bg-red-600 transition-all duration-300 hover:scale-110 group"
                  >
                    <social.icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white relative inline-block">
                Quick Links
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-500"></span>
              </h3>
              <ul className="space-y-3">
                {['Home', 'Features', 'Success Stories', 'Pricing', 'Contact'].map((link) => (
                  <li key={link}>
                    <a
                      href={`/${link.toLowerCase().replace(' ', '-')}`}
                      onClick={scrollToTop}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-300 hover:translate-x-2 inline-block"
                    >
                      → {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Channel Promotion */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white relative inline-block">
                Services
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-500"></span>
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Music Promotion', url: '/youtube-music-promotion' },
                  { name: 'Gaming Channel', url: '/youtube-gaming-promotion' },
                  { name: 'Travel Videos', url: '/youtube-travel-promotion' },
                  { name: 'Health & Beauty', url: '/youtube-health-beauty-promotion' },
                  { name: 'Motivation', url: '/youtube-motivation-promotion' },
                  { name: 'Vlogging', url: '/youtube-vlogging-promotion' }
                ].map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.url}
                      onClick={scrollToTop}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-300 hover:translate-x-2 inline-block text-sm"
                    >
                      → {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white relative inline-block">
                Legal
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-500"></span>
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Terms & Conditions', url: '/terms-and-conditions' },
                  { name: 'Privacy Policy', url: '/privacy-policy' },
                  { name: 'Disclaimer', url: '/disclaimer' },
                  { name: 'Refund Policy', url: '/refund-policy' }
                ].map((legal) => (
                  <li key={legal.name}>
                    <a
                      href={legal.url}
                      onClick={scrollToTop}
                      className="text-gray-400 hover:text-red-400 transition-colors duration-300 hover:translate-x-2 inline-block text-sm"
                    >
                      → {legal.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

         
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © 2025 <span className="text-red-500 font-semibold">Vidflyy</span>. All rights reserved. | Empowering YouTube creators worldwide.
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={scrollToTop}
                  className="bg-red-600 hover:bg-red-700 p-2 rounded-full transition-all duration-300 hover:scale-110 group"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="h-5 w-5 group-hover:animate-bounce" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
