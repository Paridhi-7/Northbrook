"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

export default function ShippingPage() {
  return (
    <>
      <section className="relative min-h-[30vh] flex items-center justify-center bg-white">
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
                <p><strong className="text-charcoal">Domestic:</strong> Standard shipping (5–7 business days) and express (2–3 business days). Orders over $100 ship free.</p>
                <p><strong className="text-charcoal">International:</strong> 10–21 business days depending on destination. Customs duties are the customer&apos;s responsibility.</p>
                <p><strong className="text-charcoal">Processing:</strong> Orders are processed within 1–2 business days. You&apos;ll receive a tracking email once dispatched.</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-4">Returns &amp; Exchanges</h2>
              <div className="text-charcoal/55 leading-relaxed space-y-4">
                <p><strong className="text-charcoal">Returns:</strong> Unworn, unwashed items may be returned within 30 days for a full refund. Contact orders@northbrook.com to initiate.</p>
                <p><strong className="text-charcoal">Exchanges:</strong> Free exchanges for different sizes or colours within 30 days. Items must be in original packaging.</p>
                <p><strong className="text-charcoal">Refunds:</strong> Processed within 5–7 business days of receiving the return. Shipping costs are non-refundable unless our error.</p>
                <p><strong className="text-charcoal">Damaged Items:</strong> Contact us immediately with photos for a free replacement or refund.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
