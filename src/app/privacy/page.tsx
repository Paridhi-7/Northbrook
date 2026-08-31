"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const sections = [
  { title: "1. Information We Collect", body: "When you visit NorthBrook, we collect device information (browser, IP, timezone) and interaction data. When you make a purchase, we collect your name, address, payment info, email, and phone number." },
  { title: "2. How We Use Your Information", body: "We use your data to process orders, communicate with you, screen for fraud, provide marketing (with consent), and improve our website." },
  { title: "3. Sharing Your Information", body: "We share data with payment processors, shipping carriers, and analytics providers to fulfil orders. We may share data to comply with legal requirements." },
  { title: "4. Cookies", body: "Our website uses cookies to improve your experience. You can control cookies through your browser settings. Disabling cookies may affect functionality." },
  { title: "5. Data Security", body: "We use industry best practices and SSL encryption to protect your data. Payment information is processed securely through our payment providers." },
  { title: "6. Your Rights", body: "Depending on your location, you may access, correct, or delete your personal information, and opt out of marketing at any time. Contact hello@northbrook.com to exercise these rights." },
  { title: "7. Data Retention", body: "We retain order data for a minimum of 7 years to comply with tax and legal obligations." },
  { title: "8. Contact", body: "For questions about this policy, contact hello@northbrook.com." },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="relative min-h-[30vh] flex items-center justify-center bg-white">
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
