"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const sections = [
  { title: "1. General", body: "Welcome to NorthBrook. By accessing or using our website (northbrook.com) and purchasing our products, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website." },
  { title: "2. Products & Pricing", body: "We strive to display products as accurately as possible. Colours, descriptions, and pricing may vary slightly from what appears on screen. All prices are in USD and subject to change without notice. We reserve the right to cancel orders placed at incorrect prices." },
  { title: "3. Orders & Payment", body: "Placing an order constitutes an offer to purchase. All orders are subject to availability and confirmation. We accept major credit cards and other methods displayed at checkout. Payment must be received before dispatch." },
  { title: "4. Intellectual Property", body: "All content on this website — text, graphics, logos, images, product designs — is the property of NorthBrook and protected by copyright and trademark laws. You may not reproduce or distribute any content without written consent." },
  { title: "5. Limitation of Liability", body: "To the fullest extent permitted by law, NorthBrook shall not be liable for indirect, incidental, or consequential damages. Our total liability shall not exceed the price paid for the product." },
  { title: "6. Governing Law", body: "These terms are governed by applicable laws. Any disputes shall be resolved in the appropriate courts of the relevant jurisdiction." },
  { title: "7. Changes to Terms", body: "We reserve the right to update these terms at any time. Changes will be posted on this page with an updated date. Continued use constitutes acceptance of revised terms." },
  { title: "8. Contact", body: "For questions about these terms, contact us at hello@northbrook.com or call +1 (234) 567-890." },
];

export default function TermsPage() {
  return (
    <>
      <section className="relative min-h-[30vh] flex items-center justify-center bg-white">
        <div className="text-center px-5">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl sm:text-5xl text-charcoal font-bold">Terms &amp; Conditions</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-3 text-charcoal/40 text-sm">Last updated: September 2026</motion.p>
        </div>
      </section>
      <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl mx-auto space-y-10">
          {sections.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <h2 className="font-heading text-2xl text-charcoal font-bold mb-3">{s.title}</h2>
              <p className="text-charcoal/55 leading-relaxed">{s.body}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
