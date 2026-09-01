"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const sections = [
  { title: "1. Information We Collect", body: "When you visit NorthBrook, we collect device information (browser, IP, device type) and shopping interaction data. When you make a purchase, we collect your name, shipping address, contact email, and phone number for delivery fulfillment." },
  { title: "2. How We Use Your Information", body: "We use your data strictly to process orders, communicate shipment updates, provide support, and improve your shopping experience." },
  { title: "3. Sharing Your Information", body: "We share necessary shipping details only with trusted logistics partners (e.g. Bluedart, Delhivery) and verified payment gateways. We never sell your personal information." },
  { title: "4. Cookies & Security", body: "We utilize SSL 256-bit encryption for all transactional data. Cookies are used to retain your shopping bag and provide a seamless navigation experience." },
  { title: "5. Your Rights", body: "You may access, update, or request deletion of your account details at any time by emailing us at northbrook.official@gmail.com." },
  { title: "6. Contact Us", body: "If you have questions or concerns about privacy and data protection, please write to northbrook.official@gmail.com or call +91 99924 42999." },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="relative min-h-[30vh] flex items-center justify-center bg-white pt-28">
        <div className="text-center px-5">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl sm:text-5xl text-charcoal font-bold">Privacy Policy</motion.h1>
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
