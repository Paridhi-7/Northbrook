"use client";

import { motion } from "framer-motion";

export default function ShippingPage() {
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
            Shipping &amp; Returns
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
                Shipping Policy
              </h2>
              <div className="space-y-4">
                <h3 className="font-heading text-lg text-charcoal font-semibold">
                  Domestic Shipping
                </h3>
                <p>
                  We offer standard and express shipping within the United
                  States. Standard shipping typically takes 5–7 business days,
                  while express shipping delivers within 2–3 business days.
                </p>
                <p>
                  Orders over $100 qualify for free standard shipping. Shipping
                  costs for orders under $100 are calculated at checkout based
                  on delivery location and method.
                </p>

                <h3 className="font-heading text-lg text-charcoal font-semibold pt-4">
                  International Shipping
                </h3>
                <p>
                  We ship to select international destinations. International
                  shipping times vary by location, typically 10–21 business
                  days. Customs duties and import taxes are the responsibility
                  of the customer and are not included in our shipping rates.
                </p>

                <h3 className="font-heading text-lg text-charcoal font-semibold pt-4">
                  Order Processing
                </h3>
                <p>
                  Orders are processed within 1–2 business days. You will
                  receive a shipping confirmation email with tracking
                  information once your order has been dispatched. Please allow
                  up to 48 hours for tracking information to update.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                Returns &amp; Exchanges
              </h2>
              <div className="space-y-4">
                <h3 className="font-heading text-lg text-charcoal font-semibold">
                  Return Policy
                </h3>
                <p>
                  We want you to love your NorthBrook knitwear. If you&apos;re
                  not completely satisfied with your purchase, you may return
                  unworn, unwashed items within 30 days of delivery for a full
                  refund or exchange.
                </p>
                <p>
                  To initiate a return, please contact us at{" "}
                  <a
                    href="mailto:orders@northbook.com"
                    className="text-rust hover:text-rust-dark"
                  >
                    orders@northbook.com
                  </a>{" "}
                  with your order number and reason for return. We will provide
                  you with a return shipping label and instructions.
                </p>

                <h3 className="font-heading text-lg text-charcoal font-semibold pt-4">
                  Exchange Policy
                </h3>
                <p>
                  We offer free exchanges for different sizes or colours within
                  30 days of delivery. Items must be unworn, unwashed, and in
                  their original packaging. If the desired exchange item is out
                  of stock, we will issue a full refund.
                </p>

                <h3 className="font-heading text-lg text-charcoal font-semibold pt-4">
                  Refund Processing
                </h3>
                <p>
                  Once we receive your returned item, we will inspect it and
                  process your refund within 5–7 business days. Refunds will be
                  credited to the original payment method. Please note that
                  shipping costs are non-refundable unless the return is due to
                  our error.
                </p>

                <h3 className="font-heading text-lg text-charcoal font-semibold pt-4">
                  Damaged or Defective Items
                </h3>
                <p>
                  If you receive a damaged or defective item, please contact us
                  immediately at{" "}
                  <a
                    href="mailto:orders@northbook.com"
                    className="text-rust hover:text-rust-dark"
                  >
                    orders@northbook.com
                  </a>{" "}
                  with photos of the damage. We will arrange a replacement or
                  full refund at no cost to you.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">
                Contact Us
              </h2>
              <p>
                For any shipping or returns questions, please reach out to us at{" "}
                <a
                  href="mailto:orders@northbook.com"
                  className="text-rust hover:text-rust-dark"
                >
                  orders@northbook.com
                </a>{" "}
                or call{" "}
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
