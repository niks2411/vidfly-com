import { MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const LiveChatSupport = () => {
  const handleOpenLiveChat = () => {
    window.open('https://wa.me/917355518761?text=Hi, I need help with YouTube promotion', '_blank');
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Container with Border */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-10 border-4 border-red-400 relative overflow-hidden">
          {/* Light Red Gradient Overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-400 via-red-500 to-red-400 opacity-10 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Content */}
              <div className="order-2 lg:order-1">
                {/* Online Status Badge */}
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-700 font-medium text-base">We are online</span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  We are always here to help you
                </h2>

                {/* Description */}
                <p className="text-base lg:text-lg text-gray-600 mb-2 leading-relaxed">
                  If you have questions, please, contact us via Live Chat or email at
                </p>
                <a
                  href="mailto:support@vidflyy.in"
                  className="text-red-600 font-medium text-base hover:underline mb-8 inline-block"
                >
                  support@vidflyy.in
                </a>

                {/* Open Live Chat Button */}
                <div className="mt-6">
                  <Button
                    onClick={handleOpenLiveChat}
                    className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 inline-flex items-center gap-2 hover:scale-105"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Open Live Chat
                  </Button>
                </div>
              </div>

              {/* Right Side - Chat Mockup with Border and Light Grey Background */}
              <div className="order-1 lg:order-2">
                <div className="bg-gray-100 rounded-3xl p-8 shadow-xl border-2 border-red-200 relative overflow-hidden">
                  {/* Chat Messages */}
                  <div className="space-y-6 relative z-10">
                    {/* User Message 1 */}
                    <div className="flex items-start gap-3 justify-end">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Customer</p>
                        <div className="bg-red-500 rounded-2xl rounded-tr-sm px-4 py-3 inline-block shadow-md">
                          <p className="text-white text-sm leading-relaxed">
                            Is the promotion safe<br />for my channel?
                          </p>
                        </div>
                      </div>
                      <div className="relative flex-shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                          alt="Customer"
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-red-200 shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-100"></div>
                      </div>
                    </div>

                    {/* Support Message */}
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
                          alt="Support"
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-red-200 shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-100"></div>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Support Manager</p>
                        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 inline-block max-w-xs shadow-md border border-gray-200">
                          <p className="text-gray-700 text-sm leading-relaxed">
                            We use official YouTube tools only, so your channel won't violate any rules
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* User Message 2 */}
                    <div className="flex items-start gap-3 justify-end">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Customer</p>
                        <div className="bg-red-500 rounded-2xl rounded-tr-sm px-4 py-3 inline-block shadow-md">
                          <p className="text-white text-sm">
                            Cool! Thanks!
                          </p>
                        </div>
                      </div>
                      <div className="relative flex-shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                          alt="Customer"
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-red-200 shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveChatSupport;
