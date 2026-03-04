import { AlertTriangle, Info, Shield } from "lucide-react";

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-white font-founders">
            {/* Header Section */}
            <section className="py-20 bg-gradient-to-br from-red-50 to-gray-50 relative overflow-hidden">
                <div className="absolute inset-0">
                    <AlertTriangle className="absolute top-10 left-10 h-20 w-20 text-red-100 opacity-30 animate-pulse" />
                    <Info className="absolute top-32 right-20 h-16 w-16 text-red-200 opacity-40" />
                    <Shield className="absolute bottom-20 left-32 h-24 w-24 text-red-100 opacity-30" />
                    <AlertTriangle className="absolute bottom-10 right-10 h-32 w-32 text-red-100 opacity-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="section-heading text-center !mb-6">
                        Disclaimer
                    </h1>
                    <p className="section-desc text-center max-w-3xl mx-auto">
                        Last Updated: 11 Oct, 2025
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="space-y-8 animate-fade-in">

                        <div className="flex items-start gap-4">
                            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Vidflyy provides YouTube promotion services using genuine and compliant advertising channels.
                            </p>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                We do not guarantee specific subscriber counts or revenue increases. All promotions depend on audience engagement and YouTube's ad algorithms.
                            </p>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Vidflyy is not affiliated with YouTube, Google LLC, or any of their subsidiaries.
                            </p>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                While we strive for best results, YouTube may review or disapprove a video if it violates their advertising policies.
                            </p>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                We are not liable for any loss of data, account suspension, or other issues resulting from user-submitted content that breaches YouTube's policies.
                            </p>
                        </div>

                    </div>

                    {/* Contact Information */}
                    <div className="bg-gradient-to-br from-red-50 to-gray-50 rounded-2xl p-8 mt-12 animate-fade-in">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Need Clarification?</h3>
                        <p className="text-gray-600 mb-4">
                            If you have any questions regarding this Disclaimer, please contact us at:
                        </p>
                        <a
                            href="mailto:support@vidflyy.in"
                            className="text-red-600 hover:text-red-700 font-semibold transition-colors"
                        >
                            support@vidflyy.in
                        </a>
                    </div>

                </div>
            </section>
        </div>
    );
}
