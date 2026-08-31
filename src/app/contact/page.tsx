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
        <img src="/products/cord-sets/01.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
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
                        <input type="tel" name="phone" value={form.phone} onChange={onChange} className="w-full px-4 py-3.5 bg-cream/50 border border-cream-dark rounded-xl text-charcoal placeholder:text-charcoal/30 text-sm focus:outline-none focus:ring-2 focus:ring-rust/30 focus:border-rust transition" placeholder="Your phone number" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-2">Email *</label>
                      <input type="email" name="email" value={form.email} onChange={onChange} required className="w-full px-4 py-3.5 bg-cream/50 border border-cream-dark rounded-xl text-charcoal placeholder:text-charcoal/30 text-sm focus:outline-none focus:ring-2 focus:ring-rust/30 focus:border-rust transition" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-2">Message *</label>
                      <textarea name="message" value={form.message} onChange={onChange} required rows={5} className="w-full px-4 py-3.5 bg-cream/50 border border-cream-dark rounded-xl text-charcoal placeholder:text-charcoal/30 text-sm focus:outline-none focus:ring-2 focus:ring-rust/30 focus:border-rust transition resize-none" placeholder="Tell us how we can help..." />
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
                    <p className="text-charcoal/50 mb-6">Thank you. We&apos;ll get back to you within 24 hours.</p>
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
                  <h3 className="font-heading text-lg text-charcoal font-bold mb-5">Contact Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-rust mb-1">Phone</p>
                      <a href="tel:+1234567890" className="text-charcoal hover:text-rust transition text-sm">+1 (234) 567-890</a>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-rust mb-1">Email</p>
                      <a href="mailto:hello@northbrook.com" className="text-charcoal hover:text-rust transition text-sm">hello@northbrook.com</a>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold tracking-widest uppercase text-rust mb-1">Instagram</p>
                      <a href="https://instagram.com/northbrook" target="_blank" rel="noopener noreferrer" className="text-charcoal hover:text-rust transition text-sm">@northbrook</a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg shadow-charcoal/5">
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-charcoal/50 mb-3">Business Hours</h4>
                  <div className="text-sm text-charcoal/60 space-y-1">
                    <p>Monday — Friday: 9am — 6pm</p>
                    <p>Saturday: 10am — 4pm</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-charcoal/5">
                  <div className="h-48 bg-cream-dark flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-8 h-8 text-charcoal/20 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <p className="text-charcoal/30 text-xs">Map coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
