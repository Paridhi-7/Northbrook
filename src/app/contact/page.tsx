"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-earth-brown text-sm tracking-[0.3em] uppercase mb-4"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-5xl md:text-6xl text-charcoal font-bold mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-charcoal-light text-lg max-w-2xl mx-auto"
          >
            Have a question about an order, need sizing advice, or just want to
            say hello? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Form & Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs tracking-widest uppercase text-charcoal mb-2">
                            Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-offwhite border border-warmbeige text-charcoal placeholder:text-warmbeige-dark text-sm focus:outline-none focus:border-rust transition-colors"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs tracking-widest uppercase text-charcoal mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-offwhite border border-warmbeige text-charcoal placeholder:text-warmbeige-dark text-sm focus:outline-none focus:border-rust transition-colors"
                            placeholder="Your phone number"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs tracking-widest uppercase text-charcoal mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-offwhite border border-warmbeige text-charcoal placeholder:text-warmbeige-dark text-sm focus:outline-none focus:border-rust transition-colors"
                          placeholder="Your email address"
                        />
                      </div>
                      <div>
                        <label className="block text-xs tracking-widest uppercase text-charcoal mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 bg-offwhite border border-warmbeige text-charcoal placeholder:text-warmbeige-dark text-sm focus:outline-none focus:border-rust transition-colors resize-none"
                          placeholder="Tell us how we can help..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-8 py-4 bg-charcoal text-offwhite text-sm tracking-widest uppercase hover:bg-rust transition-colors duration-300"
                      >
                        Send Message
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-cream p-12 rounded-sm text-center"
                    >
                      <div className="text-5xl mb-6">✓</div>
                      <h3 className="font-heading text-2xl text-charcoal font-bold mb-3">
                        Message Sent!
                      </h3>
                      <p className="text-charcoal-light mb-6">
                        Thank you for reaching out. We&apos;ll get back to you
                        within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: "",
                            phone: "",
                            email: "",
                            message: "",
                          });
                        }}
                        className="text-rust text-xs tracking-widest uppercase border-b border-rust pb-1 hover:text-rust-dark hover:border-rust-dark transition-colors"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ScrollReveal direction="right">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-heading text-lg text-charcoal font-bold mb-4">
                      Contact Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs tracking-widest uppercase text-earth-brown mb-1">
                          Phone
                        </p>
                        <a
                          href="tel:+1234567890"
                          className="text-charcoal hover:text-rust transition-colors"
                        >
                          +1 (234) 567-890
                        </a>
                      </div>
                      <div>
                        <p className="text-xs tracking-widest uppercase text-earth-brown mb-1">
                          Email
                        </p>
                        <a
                          href="mailto:hello@northbook.com"
                          className="text-charcoal hover:text-rust transition-colors"
                        >
                          hello@northbook.com
                        </a>
                      </div>
                      <div>
                        <p className="text-xs tracking-widest uppercase text-earth-brown mb-1">
                          Instagram
                        </p>
                        <a
                          href="https://instagram.com/northbook"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-charcoal hover:text-rust transition-colors"
                        >
                          @northbook
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-cream rounded-sm">
                    <h4 className="font-heading text-sm text-charcoal font-bold mb-2 uppercase tracking-wider">
                      Business Hours
                    </h4>
                    <div className="text-sm text-charcoal-light space-y-1">
                      <p>Monday — Friday: 9am — 6pm</p>
                      <p>Saturday: 10am — 4pm</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>

                  <div className="p-6 bg-charcoal rounded-sm text-center">
                    <h4 className="font-heading text-sm text-offwhite font-bold mb-2 uppercase tracking-wider">
                      Order Enquiries
                    </h4>
                    <p className="text-warmbeige-dark text-sm mb-4">
                      Need help with an existing order or have a wholesale
                      enquiry?
                    </p>
                    <a
                      href="mailto:orders@northbook.com"
                      className="text-rust-light text-xs tracking-widest uppercase hover:text-rust transition-colors"
                    >
                      orders@northbook.com →
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
