"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
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
            Terms &amp; Conditions
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
        <div className="max-w-4xl mx-auto prose prose-charcoal">
          <div className="space-y-10 text-charcoal-light leading-relaxed">
            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                1. General
              </h2>
              <p className="mb-4">
                Welcome to NorthBrook. By accessing or using our website
                (northbook.com) and purchasing our products, you agree to be
                bound by these Terms &amp; Conditions. If you do not agree with
                any part of these terms, please do not use our website.
              </p>
              <p>
                NorthBrook is a family-run knitwear brand. These terms apply to
                all visitors, users, and customers of our website and services.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                2. Products &amp; Pricing
              </h2>
              <p className="mb-4">
                We strive to display our products as accurately as possible,
                including colours, descriptions, and pricing. However, we cannot
                guarantee that your screen&apos;s display accurately reflects the
                actual product colours.
              </p>
              <p className="mb-4">
                All prices are listed in USD and are subject to change without
                notice. We reserve the right to modify or discontinue any
                product at any time.
              </p>
              <p>
                In the event of a pricing error, we reserve the right to cancel
                any orders placed at the incorrect price and issue a full
                refund.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                3. Orders &amp; Payment
              </h2>
              <p className="mb-4">
                By placing an order, you are making an offer to purchase a
                product subject to these terms. All orders are subject to
                availability and confirmation of the order price.
              </p>
              <p className="mb-4">
                We accept payment via major credit cards, debit cards, and other
                payment methods as displayed at checkout. Payment must be
                received in full before an order is dispatched.
              </p>
              <p>
                We reserve the right to refuse or cancel any order for any
                reason, including limitations on quantities available for
                purchase and inaccuracies in product or pricing information.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                4. Intellectual Property
              </h2>
              <p className="mb-4">
                All content on this website — including text, graphics, logos,
                images, and product designs — is the property of NorthBrook and
                is protected by copyright, trademark, and other intellectual
                property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, or create derivative
                works from any content on this website without our prior written
                consent.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                5. Limitation of Liability
              </h2>
              <p className="mb-4">
                To the fullest extent permitted by law, NorthBrook shall not be
                liable for any indirect, incidental, special, or consequential
                damages arising from your use of our website or products.
              </p>
              <p>
                Our total liability to you for any claim arising from a product
                purchase shall not exceed the price you paid for that product.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                6. Governing Law
              </h2>
              <p>
                These Terms &amp; Conditions are governed by and construed in
                accordance with applicable laws. Any disputes shall be resolved
                in the appropriate courts of the relevant jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                7. Changes to Terms
              </h2>
              <p>
                We reserve the right to update these terms at any time. Changes
                will be posted on this page with an updated &quot;Last
                updated&quot; date. Your continued use of the website after
                changes are posted constitutes acceptance of the revised terms.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                8. Contact
              </h2>
              <p>
                If you have any questions about these Terms &amp; Conditions,
                please contact us at{" "}
                <a href="mailto:hello@northbook.com" className="text-rust hover:text-rust-dark">
                  hello@northbook.com
                </a>{" "}
                or call us at{" "}
                <a href="tel:+1234567890" className="text-rust hover:text-rust-dark">
                  +1 (234) 567-890
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
