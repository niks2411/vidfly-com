import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { FileText, Shield, AlertCircle } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Navbar />
      
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <Shield className="absolute top-10 left-10 h-20 w-20 text-red-100 opacity-30 animate-pulse" />
          <FileText className="absolute top-32 right-20 h-16 w-16 text-red-200 opacity-40" />
          <AlertCircle className="absolute bottom-20 left-32 h-24 w-24 text-red-100 opacity-30" />
          <Shield className="absolute bottom-10 right-10 h-32 w-32 text-red-100 opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            Terms & Conditions
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
              Welcome to Vidflyy.com ("we," "our," "us"). By accessing or using our website and services, you agree to comply with and be bound by these Terms & Conditions. Please read them carefully before proceeding.
            </p>
          </div>

          {/* Services */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-red-600 rounded"></div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                1.1. Services
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-5">
              Vidflyy provides YouTube video promotion services through legitimate advertising methods (primarily Google Ads and partner networks). We do not use bots, fake traffic, or any practices that violate YouTube's Terms of Service.
            </p>
          </div>

          {/* User Responsibilities */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-red-600 rounded"></div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                1.2. User Responsibilities
              </h2>
            </div>
            <div className="ml-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">
                  You agree to provide accurate and complete information (including your YouTube video link, name, email, and phone number).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">
                  You confirm that the video you submit does not violate YouTube's Community Guidelines, copyright policies, or applicable laws.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">
                  You understand that results (views, engagement, etc.) depend on audience behavior and campaign type.
                </p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-red-600 rounded"></div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                1.3. Payment
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-5">
              All payments are processed securely through our integrated payment gateway. Once an order is confirmed, the campaign setup begins within 24 hours.
            </p>
          </div>

          {/* Order Cancellation */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-red-600 rounded"></div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                1.4. Order Cancellation
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-5">
              Once your campaign is activated, it cannot be canceled unless the video violates YouTube or Google advertising policies (see refund policy below).
            </p>
          </div>

          {/* Intellectual Property */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-red-600 rounded"></div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                1.5. Intellectual Property
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-5">
              All materials, designs, and content on Vidflyy.com are the intellectual property of Vidflyy and cannot be copied, distributed, or used without permission.
            </p>
          </div>

          {/* Modification of Terms */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-red-600 rounded"></div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                1.6. Modification of Terms
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-5">
              We reserve the right to modify or update these Terms at any time. Updates will be posted on this page with the revised date.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-red-50 to-gray-50 rounded-2xl p-8 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Questions About Our Terms?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions regarding these Terms & Conditions, please contact us at:
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

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
