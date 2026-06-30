"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { MdLocationOn, MdPhone, MdEmail, MdOutlineRequestQuote, MdCheckCircle } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";

const INFO = [
  {
    icon: <MdLocationOn className="text-secondary text-xl shrink-0 mt-0.5" />,
    label: "Address",
    value: "36 Grantham Street, Wembley",
    href: "https://maps.google.com/?q=36+Grantham+Street+Wembley+WA",
  },
  {
    icon: <MdPhone className="text-secondary text-xl shrink-0 mt-0.5" />,
    label: "Phone",
    value: "(08) 9387 1677",
    href: "tel:0893871677",
  },
  {
    icon: <MdEmail className="text-secondary text-xl shrink-0 mt-0.5" />,
    label: "Email",
    value: "orders@prontos.com.au",
    href: "mailto:orders@prontos.com.au",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !phone || !message) return;
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Navbar />

      {/* ── Header ── */}
      <header className="relative bg-primary overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-24 -left-12 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-8 right-1/3 w-32 h-32 rounded-full bg-secondary/20" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
          <p className="text-white/50 text-xs mb-4 tracking-widest uppercase">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-secondary">Contact Us</span>
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="inline-block bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
                Get in Touch
              </span>
              <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Contact Us<br />
                <span className="text-secondary">for a Quote</span>
              </h1>
            </div>
            <p className="text-white/60 text-xs sm:text-sm max-w-xs hidden sm:block">
              Fill in your details and our team will get back to you within one business day.
            </p>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 items-start">

          {/* ── Form ── */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MdCheckCircle className="text-green-500 text-5xl mb-4" />
                <h3 className="text-primary text-xl font-bold mb-2">Request Sent!</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Thank you, <span className="font-semibold text-primary">{name}</span>. We&apos;ve received your enquiry and will be in touch shortly.
                </p>
                <button
                  onClick={() => { setName(""); setEmail(""); setPhone(""); setMessage(""); setSubmitted(false); }}
                  className="mt-6 text-xs font-semibold text-secondary hover:underline"
                >
                  Send another enquiry →
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-primary text-xl sm:text-2xl font-bold mb-1">Contact us for a Quote</h2>
                <p className="text-xs text-gray-400 mb-6">
                  <span className="text-secondary font-bold">&quot;*&quot;</span> indicates required fields
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                      Name <span className="text-secondary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                        Email <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                        Phone <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone"
                        className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                      Message <span className="text-secondary">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Message"
                      className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-secondary text-white font-semibold px-7 py-3 rounded-full text-sm hover:opacity-90 transition-opacity self-start"
                  >
                    <MdOutlineRequestQuote className="text-base" />
                    Request a Quote
                  </button>
                </form>
              </>
            )}
          </div>

          {/* ── Additional Information ── */}
          <div className="lg:col-span-2 bg-primary/5 border border-primary/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-primary text-xl sm:text-2xl font-bold mb-6">Additional Information</h2>

            <div className="flex flex-col divide-y divide-primary/10">
              {INFO.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "Address" ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-start gap-3 py-4 group"
                >
                  {item.icon}
                  <span className="text-sm text-primary font-medium group-hover:text-secondary transition-colors">
                    {item.label === "Phone" ? `Call us : ${item.value}` :
                     item.label === "Email" ? `Email : ${item.value}` :
                     item.value}
                  </span>
                </a>
              ))}

              {/* Facebook */}
              <div className="pt-4">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary hover:bg-secondary hover:text-white transition-colors"
                >
                  <FaFacebook className="text-lg" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-gray-400 text-sm">
          © 2025 Pronto Gourmet Catering. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
