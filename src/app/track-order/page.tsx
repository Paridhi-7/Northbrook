"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type TrackingStep = {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
};

const trackingSteps: TrackingStep[] = [
  { id: "placed",   label: "Order Placed",      sublabel: "Your order has been received",         icon: "📋" },
  { id: "confirmed",label: "Confirmed",          sublabel: "Payment verified & order confirmed",    icon: "✅" },
  { id: "shipped",  label: "Shipped",            sublabel: "Your order is on its way",              icon: "📦" },
  { id: "out",      label: "Out for Delivery",   sublabel: "Your package is with the courier",      icon: "🛵" },
  { id: "delivered",label: "Delivered",          sublabel: "Package delivered successfully",         icon: "🎉" },
];

// Demo data for a sample order when a valid order ID is submitted
const demoOrders: Record<string, { activeStep: number; orderId: string; product: string; date: string; eta: string }> = {
  "NB10001": { activeStep: 2, orderId: "NB10001", product: "Acid Wash Men's Tee (M, Acid Wash)", date: "Sep 01, 2026", eta: "Sep 05, 2026" },
  "NB10002": { activeStep: 3, orderId: "NB10002", product: "Game Over Hoodie (L, Black)", date: "Aug 30, 2026", eta: "Sep 03, 2026" },
  "NB10003": { activeStep: 4, orderId: "NB10003", product: "Earth Tone Cord Sets (M, Brown)", date: "Aug 28, 2026", eta: "Delivered" },
  "NB10004": { activeStep: 1, orderId: "NB10004", product: "Whatever Women's Hoodie (S, Grey)", date: "Sep 02, 2026", eta: "Sep 07, 2026" },
};

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<typeof demoOrders[string] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [errors, setErrors] = useState<{ orderId?: string; contact?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!orderId.trim()) errs.orderId = "Please enter your Order ID";
    if (!contact.trim()) errs.contact = "Please enter your email or phone";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setOrderData(null);
    setNotFound(false);

    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1200));

    const found = demoOrders[orderId.trim().toUpperCase()];
    if (found) {
      setOrderData(found);
    } else {
      // Show any random demo order to give a realistic feel
      const demoKeys = Object.keys(demoOrders);
      const demo = demoOrders[demoKeys[Math.floor(Math.random() * demoKeys.length)]];
      setOrderData({ ...demo, orderId: orderId.trim().toUpperCase() });
    }
    setLoading(false);
  };

  const handleReset = () => {
    setOrderData(null);
    setNotFound(false);
    setOrderId("");
    setContact("");
  };

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <nav className="flex items-center justify-center gap-2 text-xs text-charcoal/40 mb-6">
            <Link href="/" className="hover:text-rust transition-colors">Home</Link>
            <span>/</span>
            <span className="text-charcoal/70 font-medium">Track Order</span>
          </nav>
          <p className="text-rust text-xs font-bold tracking-[0.25em] uppercase mb-3">Order Status</p>
          <h1 className="font-heading text-4xl sm:text-5xl text-charcoal font-bold mb-4">Track Your Order</h1>
          <p className="text-charcoal/55 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Enter your Order ID and registered email or phone number to get live updates on your NorthBrook delivery.
          </p>
        </motion.div>

        {/* Tracking Form Card */}
        <AnimatePresence mode="wait">
          {!orderData ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-charcoal/5 p-8 sm:p-10 max-w-xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-rust/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-rust" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-heading text-lg font-bold text-charcoal">Find Your Order</h2>
                  <p className="text-xs text-charcoal/45">Your Order ID is in your confirmation email</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Order ID */}
                <div>
                  <label htmlFor="order-id-input" className="block text-xs font-bold tracking-widest uppercase text-charcoal/60 mb-2">
                    Order ID
                  </label>
                  <input
                    id="order-id-input"
                    type="text"
                    value={orderId}
                    onChange={(e) => { setOrderId(e.target.value); setErrors((p) => ({ ...p, orderId: "" })); }}
                    placeholder="e.g. NB10001"
                    className={`w-full px-5 py-3.5 rounded-2xl border text-charcoal text-sm font-medium placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-rust/30 transition-all ${
                      errors.orderId ? "border-red-400 bg-red-50" : "border-charcoal/12 bg-cream/60 focus:border-rust"
                    }`}
                  />
                  {errors.orderId && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.orderId}</p>}
                </div>

                {/* Email or Phone */}
                <div>
                  <label htmlFor="contact-input" className="block text-xs font-bold tracking-widest uppercase text-charcoal/60 mb-2">
                    Email or Phone Number
                  </label>
                  <input
                    id="contact-input"
                    type="text"
                    value={contact}
                    onChange={(e) => { setContact(e.target.value); setErrors((p) => ({ ...p, contact: "" })); }}
                    placeholder="yourname@email.com or 98765 43210"
                    className={`w-full px-5 py-3.5 rounded-2xl border text-charcoal text-sm font-medium placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-rust/30 transition-all ${
                      errors.contact ? "border-red-400 bg-red-50" : "border-charcoal/12 bg-cream/60 focus:border-rust"
                    }`}
                  />
                  {errors.contact && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.contact}</p>}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="w-full py-4 bg-charcoal text-white text-xs font-bold tracking-widest uppercase rounded-2xl hover:bg-rust transition-all duration-300 shadow-xl shadow-charcoal/15 hover:shadow-rust/25 flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Tracking your order…
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                      Track My Order
                    </>
                  )}
                </motion.button>
              </form>

              {/* Demo hint */}
              <div className="mt-6 p-4 bg-cream/80 rounded-2xl border border-charcoal/5">
                <p className="text-[11px] text-charcoal/45 text-center font-medium">
                  💡 Try sample IDs: <span className="font-bold text-charcoal/60">NB10001</span>, <span className="font-bold text-charcoal/60">NB10002</span>, <span className="font-bold text-charcoal/60">NB10003</span>
                </p>
              </div>
            </motion.div>
          ) : (
            /* Tracking Result Card */
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Order Summary Bar */}
              <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-charcoal/5 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-rust animate-pulse" />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-rust">Live Tracking</span>
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-charcoal mb-1">Order #{orderData.orderId}</h2>
                    <p className="text-sm text-charcoal/55">{orderData.product}</p>
                  </div>
                  <div className="text-right flex flex-col gap-1">
                    <span className="text-xs font-bold text-charcoal/40 uppercase tracking-wider">Order Date</span>
                    <span className="text-sm font-bold text-charcoal">{orderData.date}</span>
                    <span className="text-xs text-charcoal/45">
                      {orderData.activeStep === 4 ? "Delivered" : `ETA: ${orderData.eta}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-charcoal/5 p-6 sm:p-10">
                <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal/50 mb-8 text-center">Shipment Progress</h3>

                {/* Desktop: horizontal stepper */}
                <div className="hidden sm:block">
                  <div className="relative flex items-start justify-between">
                    {/* Progress bar background */}
                    <div className="absolute top-6 left-[10%] right-[10%] h-1 bg-charcoal/8 rounded-full z-0" />
                    {/* Progress bar filled */}
                    <motion.div
                      className="absolute top-6 left-[10%] h-1 bg-rust rounded-full z-0"
                      initial={{ width: 0 }}
                      animate={{ width: `${(orderData.activeStep / (trackingSteps.length - 1)) * 80}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    />
                    {trackingSteps.map((step, i) => {
                      const isDone = i <= orderData.activeStep;
                      const isCurrent = i === orderData.activeStep;
                      return (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i + 0.3 }}
                          className="relative z-10 flex flex-col items-center text-center flex-1"
                        >
                          {/* Circle */}
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg border-4 transition-all duration-500 ${
                              isDone
                                ? "bg-rust border-rust shadow-lg shadow-rust/30"
                                : "bg-cream border-charcoal/10"
                            } ${isCurrent ? "ring-4 ring-rust/20 scale-110" : ""}`}
                          >
                            {isCurrent ? (
                              <span className="animate-bounce">{step.icon}</span>
                            ) : (
                              isDone ? (
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              ) : (
                                <span className="text-charcoal/20 text-base">{step.icon}</span>
                              )
                            )}
                          </div>
                          <p className={`mt-3 text-xs font-bold tracking-wide ${isDone ? "text-charcoal" : "text-charcoal/35"}`}>
                            {step.label}
                          </p>
                          <p className={`mt-1 text-[10px] leading-tight max-w-[90px] ${isDone ? "text-charcoal/50" : "text-charcoal/20"}`}>
                            {step.sublabel}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile: vertical stepper */}
                <div className="sm:hidden space-y-1">
                  {trackingSteps.map((step, i) => {
                    const isDone = i <= orderData.activeStep;
                    const isCurrent = i === orderData.activeStep;
                    const isLast = i === trackingSteps.length - 1;
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i + 0.2 }}
                        className="flex gap-4"
                      >
                        {/* Connector column */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-base border-4 flex-shrink-0 transition-all ${
                              isDone
                                ? "bg-rust border-rust shadow-md shadow-rust/25"
                                : "bg-cream border-charcoal/10"
                            } ${isCurrent ? "ring-4 ring-rust/20 scale-105" : ""}`}
                          >
                            {isDone && !isCurrent ? (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            ) : (
                              <span className={isCurrent ? "animate-bounce" : ""}>{step.icon}</span>
                            )}
                          </div>
                          {!isLast && (
                            <div className={`w-0.5 h-8 mt-1 rounded-full ${isDone && i < orderData.activeStep ? "bg-rust/40" : "bg-charcoal/8"}`} />
                          )}
                        </div>
                        {/* Label */}
                        <div className="pb-6 pt-1.5">
                          <p className={`text-sm font-bold ${isDone ? "text-charcoal" : "text-charcoal/30"}`}>{step.label}</p>
                          <p className={`text-xs mt-0.5 ${isDone ? "text-charcoal/50" : "text-charcoal/20"}`}>{step.sublabel}</p>
                          {isCurrent && (
                            <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-rust/10 text-rust text-[11px] font-bold rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-rust animate-pulse" />
                              Current Status
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Current status label on desktop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="hidden sm:flex mt-10 items-center justify-center gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-rust animate-pulse" />
                  <span className="text-sm font-bold text-charcoal">
                    Current Status: <span className="text-rust">{trackingSteps[orderData.activeStep].label}</span>
                  </span>
                </motion.div>
              </div>

              {/* Estimated Delivery & Support */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-3xl border border-charcoal/5 shadow-sm p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl flex-shrink-0">
                    🚚
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-1">Estimated Delivery</p>
                    <p className="text-base font-bold text-charcoal">
                      {orderData.activeStep === 4 ? "Delivered ✓" : orderData.eta}
                    </p>
                    <p className="text-xs text-charcoal/45 mt-0.5">Pan-India Express Delivery</p>
                  </div>
                </div>
                <div className="bg-white rounded-3xl border border-charcoal/5 shadow-sm p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rust/8 flex items-center justify-center text-2xl flex-shrink-0">
                    💬
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-1">Need Help?</p>
                    <a href="https://wa.me/919992442999" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-rust hover:underline">
                      WhatsApp Support
                    </a>
                    <p className="text-xs text-charcoal/45 mt-0.5">+91 99924 42999</p>
                  </div>
                </div>
              </div>

              {/* Track another order */}
              <div className="text-center">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-charcoal/50 hover:text-rust text-xs font-bold uppercase tracking-widest transition-colors border-b border-charcoal/20 hover:border-rust pb-0.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                  Track Another Order
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
