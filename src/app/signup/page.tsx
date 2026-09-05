'use client';

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
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
          <p className="text-rust text-xs font-semibold tracking-[0.25em] uppercase mb-2">Join NorthBrook</p>
          <h1 className="font-heading text-3xl font-bold text-charcoal">Create Account</h1>
          <p className="text-charcoal/50 text-xs mt-2">Sign up for exclusive access & welcome rewards</p>
        </div>

        {submitted ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6">
            <div className="w-16 h-16 bg-sage/20 text-sage rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-charcoal mb-2">Account Created!</h3>
            <p className="text-charcoal/60 text-sm mb-6">Welcome to the NorthBrook family, {name}. Your account is ready.</p>
            <Link
              href="/"
              className="inline-block bg-charcoal text-white px-8 py-3.5 text-xs font-semibold tracking-widest uppercase rounded-full hover:bg-rust transition-colors"
            >
              Start Exploring
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/70 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-cream/50 border border-charcoal/15 text-charcoal placeholder:text-charcoal/30 text-sm focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/70 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl bg-cream/50 border border-charcoal/15 text-charcoal placeholder:text-charcoal/30 text-sm focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/70 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 rounded-xl bg-cream/50 border border-charcoal/15 text-charcoal placeholder:text-charcoal/30 text-sm focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust transition"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                required
                id="terms"
                className="rounded border-charcoal/20 text-rust focus:ring-rust"
              />
              <label htmlFor="terms" className="text-xs text-charcoal/60 cursor-pointer">
                I agree to the Terms of Service & Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-charcoal text-white text-xs font-semibold tracking-widest uppercase rounded-xl hover:bg-rust transition-colors duration-300 shadow-lg shadow-charcoal/10 flex items-center justify-center mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>

            <div className="pt-4 text-center border-t border-charcoal/10">
              <p className="text-xs text-charcoal/60">
                Already have an account?{" "}
                <Link href="/login" className="text-rust font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
