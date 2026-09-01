"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const sections = [
  { title: "1. General", body: "Welcome to NorthBrook. By accessing or using our website and purchasing our handcrafted knitwear products, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website." },
  { title: "2. Products & Pricing", body: "We strive to display products, natural fibre textures, and colors as accurately as possible. All prices are listed in Indian Rupees (INR) inclusive of applicable taxes." },
  { title: "3. Orders & Payment", body: "Placing an order constitutes an offer to purchase. We accept UPI, Net Banking, major credit/debit cards, and Cash on Delivery (COD) across eligible pin codes." },
  { title: "4. Intellectual Property", body: "All content on this website — photography, designs, typography, brand marks — is the property of NorthBrook and protected under copyright laws." },
  { title: "5. Limitation of Liability", body: "To the fullest extent permitted by law, NorthBrook shall not be liable for indirect or consequential damages. Our total liability shall not exceed the price paid for the purchased item." },
  { title: "6. Governing Law", body: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the competent courts." },
  { title: "7. Changes to Terms", body: "We reserve the right to update these terms at any time. Updates will be posted directly to this page." },
  { title: "8. Contact Us", body: "For any questions or support regarding these terms, reach us at northbrook.official@gmail.com or call +91 99924 42999." },
];

export default function TermsPage() {
  return (
    <>
      <section className="relative min-h-[30vh] flex items-center justify-center bg-white pt-28">
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
