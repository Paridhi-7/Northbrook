"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

export default function ShippingPage() {
  return (
    <>
      <section className="relative min-h-[30vh] flex items-center justify-center bg-white pt-28">
        <div className="text-center px-5">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl sm:text-5xl text-charcoal font-bold">Shipping &amp; Returns</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-3 text-charcoal/40 text-sm">Last updated: September 2026</motion.p>
        </div>
      </section>
      <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl mx-auto space-y-12">
          <ScrollReveal>
            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">Shipping Policy</h2>
              <div className="text-charcoal/55 leading-relaxed space-y-4">
                <p><strong className="text-charcoal">Pan-India Delivery:</strong> Standard shipping (3–5 business days) and Express shipping (1–2 business days). Orders over ₹999 ship completely free across India.</p>
                <p><strong className="text-charcoal">Tracking:</strong> Once your order is dispatched, you will receive an SMS and email notification with your live courier tracking link.</p>
                <p><strong className="text-charcoal">Dispatch:</strong> All handcrafted knitwear items are quality checked and dispatched within 24 to 48 hours of order confirmation.</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">Returns &amp; Exchanges</h2>
              <div className="text-charcoal/55 leading-relaxed space-y-4">
                <p><strong className="text-charcoal">Hassle-Free Returns:</strong> Unworn, unwashed items with original tags may be returned or exchanged within 30 days. Contact <a href="mailto:northbrook.official@gmail.com" className="text-rust underline">northbrook.official@gmail.com</a> or WhatsApp us at <a href="https://wa.me/919992442999" className="text-rust underline">+91 99924 42999</a> to initiate.</p>
                <p><strong className="text-charcoal">Size Exchanges:</strong> Free doorstep exchange for alternate sizes. We arrange reverse pickup directly from your address.</p>
                <p><strong className="text-charcoal">Refunds:</strong> Processed to original payment method within 3–5 business days of return inspection.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
