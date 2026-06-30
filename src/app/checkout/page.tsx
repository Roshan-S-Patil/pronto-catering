"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { MdAdd, MdRemove, MdClose, MdLocalShipping, MdStorefront, MdDiscount } from "react-icons/md";

const DELIVERY_FEE = 22.0;
const TAX_DIVISOR = 11;
const DISCOUNT_CODES: Record<string, number> = {
  CORP10: 0.1,
  PRONTO10: 0.1,
  PRONTO20: 0.2,
  WELCOME15: 0.15,
};

type Method = "delivery" | "pickup";

export default function CheckoutPage() {
  const { items, updateQty, removeItem, clearCart } = useCart();
  const router = useRouter();

  const [method, setMethod] = useState<Method>("delivery");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [discountInput, setDiscountInput] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [discountApplied, setDiscountApplied] = useState("");

  const updateNote = useCallback((id: number, val: string) => {
    setNotes((prev) => ({ ...prev, [id]: val }));
  }, []);

  function applyDiscount() {
    const code = discountInput.trim().toUpperCase();
    if (DISCOUNT_CODES[code]) {
      setDiscountRate(DISCOUNT_CODES[code]);
      setDiscountApplied(code);
      setDiscountError("");
    } else {
      setDiscountRate(0);
      setDiscountApplied("");
      setDiscountError("Invalid discount code.");
    }
  }

  function removeDiscount() {
    setDiscountRate(0);
    setDiscountApplied("");
    setDiscountInput("");
    setDiscountError("");
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryFee = method === "delivery" ? DELIVERY_FEE : 0;
  const discountAmount = subtotal * discountRate;
  const total = subtotal + deliveryFee - discountAmount;
  const tax = total / TAX_DIVISOR;

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen font-sans bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-1 py-28 text-center px-4">
          <p className="text-5xl mb-4">🛒</p>
          <h2 className="text-gray-600 font-bold text-xl mb-2">Your cart is empty</h2>
          <p className="text-gray-400 text-sm mb-6">Add items from the menu before checking out.</p>
          <a href="/menu" className="bg-primary text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-secondary transition-colors">
            Browse Menu
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Navbar />

      {/* ── Header ── */}
      <header className="relative bg-primary overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-8 w-72 h-72 rounded-full bg-white/5" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <p className="text-white/50 text-xs mb-3 tracking-widest uppercase">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/cart" className="hover:text-white transition-colors">Cart</a>
            <span className="mx-2">/</span>
            <span className="text-secondary">Checkout</span>
          </p>
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
            Checkout
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full flex-1">

        {/* ── Methods ── */}
        <section className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Methods</h2>
          <div className="flex flex-col sm:flex-row gap-3 mb-5 sm:mb-6">
            <button
              onClick={() => setMethod("delivery")}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg border-2 font-semibold text-sm transition-colors ${
                method === "delivery"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              <MdLocalShipping className="text-lg" /> Delivery
            </button>
            <button
              onClick={() => setMethod("pickup")}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg border-2 font-semibold text-sm transition-colors ${
                method === "pickup"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              <MdStorefront className="text-lg" /> Pick Up
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                {method === "delivery" ? "Delivery Date" : "Pick Up Date"}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:w-48">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        </section>

        {/* ── Items Table ── */}
        <section className="bg-white rounded-2xl shadow-sm mb-4 sm:mb-6 overflow-hidden">
          {/* Desktop header */}
          <div className="hidden md:grid grid-cols-[1fr_180px_90px_130px_100px_100px_32px] gap-3 px-6 py-3 border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span>Product</span>
            <span>Notes</span>
            <span className="text-right">Price</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Total Price</span>
            <span className="text-right">Tax (Incl.)</span>
            <span />
          </div>

          {items.map((item, idx) => {
            const lineTotal = item.price * item.quantity;
            const lineTax = lineTotal / TAX_DIVISOR;
            return (
              <div
                key={item.id}
                className={`px-4 sm:px-6 py-4 sm:py-5 ${idx < items.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                {/* Desktop layout */}
                <div className="hidden md:grid grid-cols-[1fr_180px_90px_130px_100px_100px_32px] gap-3 items-center">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400 capitalize mt-0.5">{item.category.replace(/-/g, " ")}</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Notes"
                    value={notes[item.id] ?? ""}
                    onChange={(e) => updateNote(item.id, e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-primary transition-colors w-full"
                  />
                  <p className="text-right text-sm text-gray-700 font-medium">${item.price.toFixed(2)}</p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => item.quantity === 1 ? removeItem(item.id) : updateQty(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                    >
                      <MdRemove className="text-xs" />
                    </button>
                    <span className="w-7 text-center font-bold text-sm text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                    >
                      <MdAdd className="text-xs" />
                    </button>
                  </div>
                  <p className="text-right text-sm font-semibold text-gray-800">${lineTotal.toFixed(2)}</p>
                  <p className="text-right text-sm text-gray-500">${lineTax.toFixed(2)} <span className="text-xs">(10%)</span></p>
                  <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-400 transition-colors justify-self-center">
                    <MdClose className="text-lg" />
                  </button>
                </div>

                {/* Mobile layout */}
                <div className="md:hidden">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400 capitalize mt-0.5">{item.category.replace(/-/g, " ")}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-400 transition-colors p-1">
                      <MdClose className="text-lg" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Add notes..."
                    value={notes[item.id] ?? ""}
                    onChange={(e) => updateNote(item.id, e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-primary transition-colors w-full mb-3"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => item.quantity === 1 ? removeItem(item.id) : updateQty(item.id, item.quantity - 1)}
                        className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                      >
                        <MdRemove className="text-sm" />
                      </button>
                      <span className="w-8 text-center font-bold text-sm text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                      >
                        <MdAdd className="text-sm" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800 text-sm">${lineTotal.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">Tax: ${lineTax.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* ── Summary card (discount + totals) ── */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-5 sm:gap-6">

            {/* Discount code */}
            <div className="md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-100 pb-5 md:pb-0 md:pr-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Discount Code</h3>
              {discountApplied ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2 text-green-700 text-sm font-semibold">
                    <MdDiscount className="text-base" /> {discountApplied} ({(discountRate * 100).toFixed(0)}% off)
                  </div>
                  <button onClick={removeDiscount} className="text-green-400 hover:text-red-400 transition-colors">
                    <MdClose className="text-base" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountInput}
                      onChange={(e) => { setDiscountInput(e.target.value); setDiscountError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && applyDiscount()}
                      placeholder="Enter code"
                      className="flex-1 min-w-0 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors uppercase"
                    />
                    <button
                      onClick={applyDiscount}
                      className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-secondary transition-colors whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                  {discountError && <p className="text-red-500 text-xs mt-1.5">{discountError}</p>}
                  <p className="text-gray-400 text-xs mt-2">Try: CORP10, PRONTO10, PRONTO20, WELCOME15</p>
                </>
              )}
            </div>

            {/* Price summary */}
            <div className="flex-1 flex flex-col gap-2 text-sm justify-end">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal (Incl. Tax)</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              {method === "delivery" && (
                <div className="flex justify-between text-gray-600">
                  <span>Delivery (Incl. Tax 10%)</span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
              )}
              {discountApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discountApplied})</span>
                  <span className="font-medium">−${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Tax 10%</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-3 border-t border-gray-100 mt-1">
                <span className="text-gray-800">Total</span>
                <span className="text-secondary text-lg">AUD ${total.toFixed(2)}</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between sm:justify-end gap-3 mt-6 sm:mt-8">
          <a
            href="/menu"
            className="text-center text-primary font-semibold text-sm hover:text-secondary transition-colors py-2"
          >
            ← Continue Shopping
          </a>
          <button
            onClick={() => {
              if (!date) { alert("Please select a date."); return; }
              if (!time) { alert("Please select a time."); return; }
              const order = {
                id: `ORD-${Date.now()}`,
                placedAt: new Date().toISOString(),
                status: "pending" as const,
                items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, img: i.img, quantity: i.quantity })),
                method,
                date,
                time,
                subtotal,
                deliveryFee,
                discountRate,
                total,
              };
              const existing = JSON.parse(localStorage.getItem("pronto_orders") ?? "[]");
              localStorage.setItem("pronto_orders", JSON.stringify([order, ...existing]));
              router.push("/profile/orders");
              clearCart();
            }}
            className="bg-primary text-white font-semibold px-8 py-3 rounded-full text-sm hover:bg-secondary transition-colors text-center"
          >
            Proceed to Checkout →
          </button>
        </div>

      </main>

      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-gray-400 text-sm">
          © 2025 Pronto Gourmet Catering. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
