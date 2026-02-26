"use client";

import Link from "next/link";
import { Youtube, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer-section bg-white font-montserrat pt-12 pb-8">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top thin red border */}
        <div className="w-full h-[1px] bg-[#E52D27] mb-12 opacity-80"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Column 1: Logo, Desc, Social, Badge */}
          <div className="flex flex-col gap-6">
            <Link href="/" onClick={scrollToTop}>
              <img
                src="/lovable-uploads/0b27d722-c6a7-47e3-ae7d-aeb8461db170.png"
                alt="Vidflyy"
                className="h-7 w-auto object-contain"
              />
            </Link>
            <p className="text-[14px] text-[rgb(41,40,40)] font-medium leading-[1.6] max-w-[260px]">
              Run YouTube growth campaigns with real audience reach, full control, and transparent results.
            </p>

            {/* Social Icons - Red Squares matching reference */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-[30px] h-[30px] bg-[#E52D27] rounded-[4px] flex items-center justify-center hover:bg-[#CC2420] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.751.79 1.751 1.764-.784 1.764-1.751 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="w-[30px] h-[30px] bg-[#E52D27] rounded-[4px] flex items-center justify-center hover:bg-[#CC2420] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a href="#" className="w-[30px] h-[30px] bg-[#E52D27] rounded-[4px] flex items-center justify-center hover:bg-[#CC2420] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-[30px] h-[30px] bg-[#E52D27] rounded-[4px] flex items-center justify-center hover:bg-[#CC2420] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
            {/* Premium Google Partner Badge */}
            <div className="mt-2 w-[115px] border border-[#dadce0] rounded-[4px] overflow-hidden bg-white">
              <div className="p-2 flex flex-col items-center gap-1">
                <svg width="28" height="28" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                <span className="text-[10px] font-bold text-[#5f6368] whitespace-nowrap">Google Partner</span>
              </div>
              <div className="bg-[#5f6368] text-white text-[8px] font-bold py-1.5 w-full text-center uppercase tracking-wider">
                Premier 2025
              </div>
            </div>
          </div>

          {/* Column 2: Youtube Promotion */}
          <div className="lg:pl-8">
            <h4 className="text-[15px] font-bold text-[#111] mb-5">Youtube Promotion</h4>
            <ul className="flex flex-col gap-3 font-medium">
              {[
                { text: "Buy Youtube Views", path: "/get-started" },
                { text: "Buy Youtube Subscribers", path: "/get-started" },
                { text: "Buy Youtube Likes", path: "/get-started" },
                { text: "Free Youtube Views", path: "/campaign/free-views" }
              ].map((item) => (
                <li key={item.text}>
                  <Link href={item.path} onClick={scrollToTop} className="text-[14px] text-[rgb(41,40,40)] hover:text-[#E52D27] transition-colors">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Channel Promotion */}
          <div>
            <h4 className="text-[15px] font-bold text-[#111] mb-5">Channel Promotion</h4>
            <ul className="flex flex-col gap-3 font-medium">
              {[
                { text: "Youtube Music Promotion", path: "/youtube-music-promotion" },
                { text: "Youtube Gaming Channel Promotion", path: "/youtube-gaming-promotion" },
                { text: "Youtube Travel Promotion", path: "/youtube-travel-promotion" },
                { text: "Youtube Health & Beauty Promotion", path: "/youtube-health-beauty-promotion" },
                { text: "Youtube Motivation Promotion", path: "/youtube-motivation-promotion" },
                { text: "Youtube Vlogging Promotion", path: "/youtube-vlogging-promotion" }
              ].map((link) => (
                <li key={link.text}>
                  <Link href={link.path} onClick={scrollToTop} className="text-[14px] text-[rgb(41,40,40)] hover:text-[#E52D27] transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Action */}
          <div className="flex flex-col items-start gap-6">
            <Link href="/get-started" onClick={scrollToTop}>
              <button className="bg-[#E52D27] hover:bg-[#CC2420] text-white font-extrabold text-[14px] px-8 py-3 rounded-[4px] transition-all transform hover:scale-[1.02]">
                Get started now
              </button>
            </Link>

            <div className="space-y-4">
              <div>
                <h5 className="text-[14px] font-bold text-[#111] mb-2">FIND US:</h5>
                <p className="text-[13px] text-[rgb(41,40,40)] leading-[1.6]">
                  3rd Floor, SC0-40, Janta Nagar,
                  <br />
                  Sahibzada Ajit Singh Nagar,
                  <br />
                  Kharar, Punjab 160062
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <a href="tel:+917355518761" className="text-[14px] font-bold text-[#111] hover:text-[#E52D27]">
                  +91 7355518761
                </a>
                <a href="mailto:Support@vidflyy.in" className="text-[14px] font-bold text-[#111] hover:text-[#E52D27]">
                  Support@vidflyy.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom thin red border */}
        <div className="w-full h-[1px] bg-[#E52D27] mb-8 opacity-80"></div>

        {/* Last Line: Policies, Copyright, Payments */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-[13px] font-bold text-[rgb(41,40,40)]">
              <Link href="/privacy-policy" className="hover:text-[#111]">Privacy Policy</Link>
              <span>|</span>
              <Link href="/terms-and-conditions" className="hover:text-[#111]">Terms & Conditions</Link>
            </div>

            <div className="flex items-center gap-6 saturate-[0.8]">
              {/* Visual Payment Logos */}
              <div className="flex items-center gap-5">
                <span className="text-[14px] font-black italic text-[#1A1F71] tracking-tighter">VISA</span>
                <div className="flex items-center -gap-1">
                  <div className="w-4 h-4 rounded-full bg-[#EB001B] z-10"></div>
                  <div className="w-4 h-4 rounded-full bg-[#F79E1B] -ml-2 opacity-90"></div>
                </div>
                <div className="flex items-center">
                  <span className="text-[14px] font-extrabold text-[#003087]">Pay<span className="text-[#009CDE]">Pal</span></span>
                </div>
                <div className="flex items-center gap-1 opacity-70">
                  <svg width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                  </svg>
                  <span className="font-bold text-[14px]">Pay</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-[12px] font-bold text-[rgb(41,40,40)]">© 2026, Vidflyy</p>
              <p className="text-[11px] text-[rgb(41,40,40)] opacity-80 leading-relaxed max-w-2xl">
                Vidflyy is an independent advertising service and is not associated with or endorsed by YouTube.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
                alt="India"
                className="h-3 w-auto rounded-[1px] shadow-sm"
              />
              <span className="text-[11px] font-bold text-[rgb(41,40,40)]">Proud Indian Company</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
