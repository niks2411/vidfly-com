import { RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react";

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-white font-montserrat">
            {/* Header Section */}
            <section className="py-20 bg-gradient-to-br from-red-50 to-gray-50 relative overflow-hidden">
                <div className="absolute inset-0">
                    <RefreshCw className="absolute top-10 left-10 h-20 w-20 text-red-100 opacity-30 animate-pulse" />
                    <CheckCircle className="absolute top-32 right-20 h-16 w-16 text-red-200 opacity-40" />
                    <Clock className="absolute bottom-20 left-32 h-24 w-24 text-red-100 opacity-30" />
                    <RefreshCw className="absolute bottom-10 right-10 h-32 w-32 text-red-100 opacity-20" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
                        Refund Policy
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
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
                            We aim for 100% client satisfaction. Refunds are processed only under specific conditions as outlined below:
                        </p>
                    </div>

                    {/* Eligible Refunds */}
                    <div className="mb-12 animate-fade-in">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-8 bg-red-600 rounded"></div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                                4.1. Eligible Refunds
                            </h2>
                        </div>
                        <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg ml-5 mb-6">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                                <p className="text-gray-700 leading-relaxed">
                                    A full refund will be issued if your video is disapproved by YouTube or Google Ads due to policy violations that cannot be resolved through appeal.
                                </p>
                            </div>
                        </div>
                        <div className="ml-5">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Refund Timeline:</h3>
                            <div className="flex items-start gap-3">
                                <Clock className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                                <p className="text-gray-600 leading-relaxed">
                                    Refunds are processed within 24–48 hours after confirmation of ineligibility.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Non-Eligible Refunds */}
                    <div className="mb-12 animate-fade-in">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-8 bg-red-600 rounded"></div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                                4.2. Non-Eligible Refunds
                            </h2>
                        </div>
                        <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg ml-5 mb-4">
                            <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                                Refunds will not be issued if:
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <XCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                                    <p className="text-gray-700 leading-relaxed">
                                        The campaign has already started and the video is running successfully.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <XCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                                    <p className="text-gray-700 leading-relaxed">
                                        The user provides incorrect or misleading information (invalid YouTube link, wrong details).
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <XCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                                    <p className="text-gray-700 leading-relaxed">
                                        The video or channel violates YouTube's content policies (hate speech, copyright infringement, adult content, etc.).
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <XCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                                    <p className="text-gray-700 leading-relaxed">
                                        User requests cancellation after the campaign is live.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Refund Process */}
                    <div className="mb-12 animate-fade-in">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-8 bg-red-600 rounded"></div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                                4.3. Refund Process
                            </h2>
                        </div>
                        <div className="ml-5">
                            <p className="text-gray-600 leading-relaxed mb-6">
                                To request a refund:
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                                        1
                                    </div>
                                    <p className="text-gray-600 leading-relaxed mt-1">
                                        Contact us at <a href="mailto:support@vidflyy.in" className="text-red-600 hover:text-red-700 font-semibold">support@vidflyy.in</a> with your Order ID.
                                    </p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                                        2
                                    </div>
                                    <p className="text-gray-600 leading-relaxed mt-1">
                                        Our team will review and confirm eligibility.
                                    </p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                                        3
                                    </div>
                                    <p className="text-gray-600 leading-relaxed mt-1">
                                        Refund will be issued to your original payment method within 24–48 hours.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gradient-to-br from-red-50 to-gray-50 rounded-2xl p-8 animate-fade-in">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help With a Refund?</h3>
                        <p className="text-gray-600 mb-4">
                            If you have any questions regarding our Refund Policy, please contact us at:
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
