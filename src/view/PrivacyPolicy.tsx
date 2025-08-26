import MainLayout from "@/components/layouts/MainLayout";

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 ">
        <div className="w-full max-w-6xl mx-auto bg-white rounded p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#363636] mb-6">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#363636] max-w-3xl mx-auto">
              At HandyMe, your privacy matters. We are committed to protecting
              your personal information and being transparent about how we use
              it.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 lg:space-y-10">
            {/* What We Collect */}
            <section>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#363636] mb-4 lg:mb-6">
                What We Collect
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#363636] mb-4">
                We collect the following information to help connect you with
                service providers:
              </p>
              <ul className="space-y-2 lg:space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#363636] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base lg:text-lg text-[#363636]">
                    Name, email, phone number
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#363636] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base lg:text-lg text-[#363636]">
                    Location data (to find nearby helpers)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#363636] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base lg:text-lg text-[#363636]">
                    Service request details
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#363636] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base lg:text-lg text-[#363636]">
                    Payment information (processed securely via trusted
                    gateways)
                  </span>
                </li>
              </ul>
            </section>

            {/* How We Use It */}
            <section>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#363636] mb-4 lg:mb-6">
                How We Use It
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#363636] mb-4">
                We use your information to:
              </p>
              <ul className="space-y-2 lg:space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#363636] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base lg:text-lg text-[#363636]">
                    Match you with nearby service providers
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#363636] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base lg:text-lg text-[#363636]">
                    Communicate booking updates
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#363636] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base lg:text-lg text-[#363636]">
                    Improve our services and personalize your experience
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#363636] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base lg:text-lg text-[#363636]">
                    Process payments and protect against fraud
                  </span>
                </li>
              </ul>
            </section>

            {/* Who We Share It With */}
            <section>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#363636] mb-4 lg:mb-6">
                Who We Share It With
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#363636] mb-4">
                We only share necessary information with:
              </p>
              <ul className="space-y-2 lg:space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#363636] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base lg:text-lg text-[#363636]">
                    Verified service providers (e.g., name, task details,
                    location)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#363636] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base lg:text-lg text-[#363636]">
                    Payment processors (for transactions)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#363636] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base lg:text-lg text-[#363636]">
                    Law enforcement, only when legally required
                  </span>
                </li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#363636] mb-4 lg:mb-6">
                Your Rights
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#363636] mb-4">
                You can:
              </p>
              <ul className="space-y-2 lg:space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#363636] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base lg:text-lg text-[#363636]">
                    Access or update your data anytime
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#363636] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base lg:text-lg text-[#363636]">
                    Request deletion of your account and personal data
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-[#363636] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-sm sm:text-base lg:text-lg text-[#363636]">
                    Opt out of marketing communications
                  </span>
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#363636] mb-4 lg:mb-6">
                Data Security
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#363636]">
                We use encryption and secure systems to protect your data. Your
                information is never sold or shared without your consent.
              </p>
            </section>

            {/* Questions */}
            <section>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#363636] mb-4 lg:mb-6">
                Questions?
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#363636]">
                Contact us at:{" "}
                <a
                  href="mailto:support@handyme.app"
                  className="text-[#00C2A8] hover:underline font-medium"
                >
                  [support@handyme.app]
                </a>{" "}
                or through the Help section in the app.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicy;
