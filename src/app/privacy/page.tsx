"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl text-charcoal font-bold"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-charcoal-light"
          >
            Last updated: September 2026
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-10 text-charcoal-light leading-relaxed">
            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                1. Information We Collect
              </h2>
              <p className="mb-4">
                When you visit NorthBrook, we automatically collect certain
                information about your device, including your web browser, IP
                address, time zone, and some cookies. We also collect
                information about your interaction with our site, including
                pages viewed and products browsed.
              </p>
              <p className="mb-4">
                When you make a purchase or attempt to make a purchase, we
                collect your name, billing address, shipping address, payment
                information, email address, and phone number. This is referred
                to as &quot;Order Information.&quot;
              </p>
              <p>
                When we refer to &quot;Personal Information&quot; in this
                policy, we mean both Device Information and Order Information.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                2. How We Use Your Information
              </h2>
              <p className="mb-4">
                We use your Personal Information to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and fulfil your orders</li>
                <li>Communicate with you about your orders, products, and services</li>
                <li>Screen our orders for potential risk or fraud</li>
                <li>Provide you with information or advertising relating to our products, when in line with your marketing preferences</li>
                <li>Improve and optimise our website and services</li>
                <li>Send you promotional communications (with your consent)</li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                3. Sharing Your Information
              </h2>
              <p className="mb-4">
                We share your Personal Information with third parties to help us
                process payments, fulfil orders, and provide our services. This
                includes payment processors, shipping carriers, and analytics
                providers.
              </p>
              <p>
                We may also share your information to comply with applicable
                laws and regulations, to respond to a subpoena, search warrant,
                or other lawful request for information, or to otherwise protect
                our rights.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                4. Cookies
              </h2>
              <p className="mb-4">
                Our website uses cookies to distinguish you from other users and
                to improve your browsing experience. Cookies are small data
                files placed on your device. We use both session cookies and
                persistent cookies.
              </p>
              <p>
                You can control and manage cookies through your browser
                settings. Please note that disabling cookies may affect the
                functionality of our website.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                5. Data Security
              </h2>
              <p>
                We take reasonable precautions to protect your Personal
                Information and follow industry best practices to ensure it is
                not lost, misused, accessed, disclosed, altered, or destroyed.
                Payment information is encrypted using SSL technology and is
                processed securely through our payment providers.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                6. Your Rights
              </h2>
              <p className="mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Withdraw consent where we rely on consent to process your data</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at{" "}
                <a
                  href="mailto:hello@northbook.com"
                  className="text-rust hover:text-rust-dark"
                >
                  hello@northbook.com
                </a>.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                7. Data Retention
              </h2>
              <p>
                When you place an order, we will retain your Personal
                Information for our records unless and until you ask us to
                delete this information. We retain order data for a minimum of
                7 years to comply with tax and legal obligations.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                8. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or for other operational, legal, or
                regulatory reasons. We will post the updated policy on this page
                with an revised &quot;Last updated&quot; date.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                9. Contact Us
              </h2>
              <p>
                For questions about this Privacy Policy or our data practices,
                please contact us at{" "}
                <a
                  href="mailto:hello@northbook.com"
                  className="text-rust hover:text-rust-dark"
                >
                  hello@northbook.com
                </a>{" "}
                or write to us at our registered business address.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
