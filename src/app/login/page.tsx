'use client';

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-cream flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-charcoal/5"
      >
        <div className="text-center mb-8">
          <p className="text-rust text-xs font-semibold tracking-[0.25em] uppercase mb-2">Welcome Back</p>
          <h1 className="font-heading text-3xl font-bold text-charcoal">Sign In</h1>
          <p className="text-charcoal/50 text-xs mt-2">Access your NorthBrook account & orders</p>
        </div>

        {submitted ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6">
            <div className="w-16 h-16 bg-sage/20 text-sage rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-charcoal mb-2">Login Successful!</h3>
            <p className="text-charcoal/60 text-sm mb-6">Welcome back to NorthBrook. You are now logged in.</p>
            <Link
              href="/"
              className="inline-block bg-charcoal text-white px-8 py-3.5 text-xs font-semibold tracking-widest uppercase rounded-full hover:bg-rust transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/70 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3.5 rounded-xl bg-cream/50 border border-charcoal/15 text-charcoal placeholder:text-charcoal/30 text-sm focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust transition"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                  Password
                </label>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-rust hover:underline">
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-xl bg-cream/50 border border-charcoal/15 text-charcoal placeholder:text-charcoal/30 text-sm focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust transition"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                className="rounded border-charcoal/20 text-rust focus:ring-rust"
              />
              <label htmlFor="remember" className="text-xs text-charcoal/60 cursor-pointer">
                Remember me on this device
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-charcoal text-white text-xs font-semibold tracking-widest uppercase rounded-xl hover:bg-rust transition-colors duration-300 shadow-lg shadow-charcoal/10 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>

            <div className="pt-4 text-center border-t border-charcoal/10">
              <p className="text-xs text-charcoal/60">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-rust font-semibold hover:underline">
                  Create One
                </Link>
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
