import { Lock, Shield, Eye, Database } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white font-founders">
            {/* Header Section */}
            <section className="py-20 bg-gradient-to-br from-red-50 to-gray-50 relative overflow-hidden">
                <div className="absolute inset-0">
                    <Lock className="absolute top-10 left-10 h-20 w-20 text-red-100 opacity-30 animate-pulse" />
                    <Shield className="absolute top-32 right-20 h-16 w-16 text-red-200 opacity-40" />
                    <Eye className="absolute bottom-20 left-32 h-24 w-24 text-red-100 opacity-30" />
                    <Database className="absolute bottom-10 right-10 h-32 w-32 text-red-100 opacity-20" />
                </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left sm:text-center relative z-10">
                  <h1 className="section-heading text-left sm:text-center !mb-6">
                      Privacy Policy
                  </h1>
                  <p className="section-desc !text-left sm:!text-center !mx-0 sm:!mx-auto max-w-3xl">
                      Last Updated: 11 Oct, 2025
                  </p>
              </div>
            </section>

            {/* Content Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Introduction */}
                    <div className="mb-12 animate-fade-in">
                        <p className="text-gray-600 leading-relaxed text-lg">
                            At Vidflyy, your privacy is our priority. This policy explains how we collect, use, and protect your information.
                        </p>
                    </div>

                    {/* Information We Collect */}
                    <div className="mb-12 animate-fade-in">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-8 bg-red-600 rounded"></div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                                2.1. Information We Collect
                            </h2>
                        </div>
                        <div className="ml-5 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-600 leading-relaxed">
                                    Personal details (name, email, phone number)
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-600 leading-relaxed">
                                    YouTube video links
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-600 leading-relaxed">
                                    Payment information (processed securely through our gateway)
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-600 leading-relaxed">
                                    Technical data (cookies, browser info, IP address)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* How We Use Your Information */}
                    <div className="mb-12 animate-fade-in">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-8 bg-red-600 rounded"></div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                                2.2. How We Use Your Information
                            </h2>
                        </div>
                        <div className="ml-5 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-600 leading-relaxed">
                                    To process your order and deliver services
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-600 leading-relaxed">
                                    To send order confirmations and updates via email & WhatsApp
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-600 leading-relaxed">
                                    To improve our website and marketing performance
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-600 leading-relaxed">
                                    To send targeted follow-up reminders for incomplete orders
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Data Protection */}
                    <div className="mb-12 animate-fade-in">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-8 bg-red-600 rounded"></div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                                2.3. Data Protection
                            </h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed ml-5">
                            We use encryption, firewalls, and secure servers to protect your data. We do not sell, rent, or share your information with third parties except as required for payment processing and communication.
                        </p>
                    </div>

                    {/* Communication */}
                    <div className="mb-12 animate-fade-in">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-8 bg-red-600 rounded"></div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                                2.4. Communication
                            </h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed ml-5">
                            By submitting your details, you consent to receive order-related emails and WhatsApp messages from Vidflyy. You may opt out of promotional messages anytime.
                        </p>
                    </div>

                    {/* Third-Party Links */}
                    <div className="mb-12 animate-fade-in">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-8 bg-red-600 rounded"></div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                                2.5. Third-Party Links
                            </h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed ml-5">
                            Our website may contain links to third-party platforms (like YouTube or Google Ads). We are not responsible for their privacy practices.
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gradient-to-br from-red-50 to-gray-50 rounded-2xl p-8 animate-fade-in">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Questions About Your Privacy?</h3>
                        <p className="text-gray-600 mb-4">
                            If you have any questions regarding our Privacy Policy, please contact us at:
                        </p>
                        <a
                            href="mailto:support@vidflyy.com"
                            className="text-red-600 hover:text-red-700 font-semibold transition-colors"
                        >
                            support@vidflyy.com
                        </a>
                    </div>

                </div>
            </section>
        </div>
    );
}
