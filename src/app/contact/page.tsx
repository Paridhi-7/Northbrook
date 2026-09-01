"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      setTimeout(() => setSubmitted(true), 800);
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <>
      <section className="relative min-h-[35vh] flex items-center justify-center overflow-hidden bg-charcoal">
        <img src="/products/cord-sets/05.jpg" alt="Contact NorthBrook" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-charcoal/80" />
        <div className="relative z-10 text-center px-5">
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-cream/60 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Get in Touch</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading text-5xl sm:text-6xl text-white font-bold">Contact Us</motion.h1>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg shadow-charcoal/5 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-2">Name *</label>
                        <input type="text" name="name" value={form.name} onChange={onChange} required className="w-full px-4 py-3.5 bg-cream/50 border border-cream-dark rounded-xl text-charcoal placeholder:text-charcoal/30 text-sm focus:outline-none focus:ring-2 focus:ring-rust/30 focus:border-rust transition" placeholder="Your full name" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-2">Phone</label>
                        <input type="tel" name="phone" value={form.phone} onChange={onChange} className="w-full px-4 py-3.5 bg-cream/50 border border-cream-dark rounded-xl text-charcoal placeholder:text-charcoal/30 text-sm focus:outline-none focus:ring-2 focus:ring-rust/30 focus:border-rust transition" placeholder="9992442999" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-2">Email *</label>
                      <input type="email" name="email" value={form.email} onChange={onChange} required className="w-full px-4 py-3.5 bg-cream/50 border border-cream-dark rounded-xl text-charcoal placeholder:text-charcoal/30 text-sm focus:outline-none focus:ring-2 focus:ring-rust/30 focus:border-rust transition" placeholder="northbrook.official@gmail.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-2">Message *</label>
                      <textarea name="message" value={form.message} onChange={onChange} required rows={5} className="w-full px-4 py-3.5 bg-cream/50 border border-cream-dark rounded-xl text-charcoal placeholder:text-charcoal/30 text-sm focus:outline-none focus:ring-2 focus:ring-rust/30 focus:border-rust transition resize-none" placeholder="Tell us how we can help with your order or inquiry..." />
                    </div>
                    <button type="submit" disabled={pending} className="w-full bg-charcoal text-white py-4 text-sm font-semibold tracking-wider uppercase rounded-xl hover:bg-rust transition-colors duration-300 shadow-lg shadow-charcoal/20 disabled:opacity-60">
                      {pending ? "Sending..." : "Send Message"}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-12 shadow-lg shadow-charcoal/5 text-center">
                    <div className="w-16 h-16 bg-rust/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-rust" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    </div>
                    <h3 className="font-heading text-2xl text-charcoal font-bold mb-3">Message Sent!</h3>
                    <p className="text-charcoal/50 mb-6">Thank you for reaching out to NorthBrook. We&apos;ll get back to you shortly.</p>
                    <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", message: "" }); }} className="text-rust text-xs tracking-widest uppercase font-semibold hover:text-rust-dark transition">Send Another</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="right">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-lg shadow-charcoal/5">
                  <h3 className="font-heading text-xl text-charcoal font-bold mb-6">Direct Contact</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-rust/10 flex items-center justify-center text-rust flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold tracking-widest uppercase text-rust mb-0.5">Phone & Support</p>
                        <a href="tel:+919992442999" className="text-charcoal font-semibold hover:text-rust transition text-base block">
                          +91 99924 42999
                        </a>
                        <p className="text-charcoal/40 text-xs mt-0.5">Direct line / WhatsApp support</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-rust/10 flex items-center justify-center text-rust flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold tracking-widest uppercase text-rust mb-0.5">Official Email</p>
                        <a href="mailto:northbrook.official@gmail.com" className="text-charcoal font-semibold hover:text-rust transition text-sm break-all block">
                          northbrook.official@gmail.com
                        </a>
                        <p className="text-charcoal/40 text-xs mt-0.5">Replies within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-rust/10 flex items-center justify-center text-rust flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold tracking-widest uppercase text-rust mb-0.5">Working Hours</p>
                        <p className="text-charcoal text-sm font-medium">Monday — Saturday: 9:00 AM — 7:00 PM</p>
                        <p className="text-charcoal/40 text-xs mt-0.5">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-charcoal text-white rounded-2xl p-8 shadow-lg">
                  <h4 className="font-heading text-lg font-bold mb-2">Have a Bulk or Custom Order?</h4>
                  <p className="text-cream/60 text-xs leading-relaxed mb-4">
                    For studio collaborations, bulk knitwear orders, or custom sizing inquiries, reach out directly to our family team via WhatsApp or phone.
                  </p>
                  <a
                    href="https://wa.me/919992442999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-rust hover:bg-rust-dark text-white px-5 py-3 text-xs font-bold tracking-wider uppercase rounded-xl transition-all"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
