"use client";

import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { MdAdd, MdRemove, MdDelete, MdShoppingCart } from "react-icons/md";
import { freeQty, offerDiscount, OFFER_COLOURS, OFFER_LABELS } from "@/lib/offers";

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, totalItems, totalPrice } = useCart();

  const totalSavings = items.reduce(
    (s, i) => s + offerDiscount(i.offer, i.price, i.quantity),
    0
  );

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Navbar />

      {/* ── Header ── */}
      <header className="relative bg-primary overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-8 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute top-6 right-1/3 w-24 h-24 rounded-full bg-secondary/20" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <p className="text-white/50 text-xs mb-3 tracking-widest uppercase">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-secondary">Your Cart</span>
          </p>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                Your <span className="text-secondary">Cart</span>
              </h1>
              <p className="text-white/60 text-sm mt-1">
                {totalItems > 0 ? `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart` : "Your cart is empty"}
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-medium transition-colors"
              >
                <MdDelete className="text-base" /> Clear cart
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full flex-1">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <MdShoppingCart className="text-6xl text-gray-300 mb-4" />
            <h3 className="text-gray-500 font-semibold text-xl mb-2">Your cart is empty</h3>
            <p className="text-gray-400 text-sm mb-6">Browse our menus and add items to get started.</p>
            <a
              href="/menu"
              className="bg-primary text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-secondary transition-colors"
            >
              Browse Menu
            </a>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">

            {/* ── Item list ── */}
            <div className="flex-1 flex flex-col gap-3 sm:gap-4 w-full">
              {items.map((item) => {
                const free = freeQty(item.offer, item.quantity);
                const saving = offerDiscount(item.offer, item.price, item.quantity);
                const lineTotal = item.price * item.quantity - saving;

                return (
                  <div key={item.id} className="bg-white rounded-2xl shadow-sm p-4">
                    {/* Top row: image + details + delete */}
                    <div className="flex gap-3 sm:gap-4 items-start">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-primary font-bold text-sm leading-tight">{item.name}</h3>
                          {item.offer && (
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${OFFER_COLOURS[item.offer]}`}
                              title={OFFER_LABELS[item.offer]}>
                              {item.offer}
                            </span>
                          )}
                        </div>
                        <p className="text-secondary font-semibold text-sm mt-0.5">${item.price.toFixed(2)} each</p>
                        <p className="text-gray-400 text-xs mt-0.5 capitalize">{item.category.replace(/-/g, " ")}</p>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors shrink-0 p-1"
                      >
                        <MdDelete className="text-lg" />
                      </button>
                    </div>

                    {/* Offer savings notice */}
                    {item.offer && free > 0 && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1.5">
                        <span>🎁</span>
                        <span className="font-semibold">{OFFER_LABELS[item.offer]}:</span>
                        <span>{free} item{free > 1 ? "s" : ""} free — saving ${saving.toFixed(2)}</span>
                      </div>
                    )}

                    {/* Bottom row: qty + line total */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => item.quantity === 1 ? removeItem(item.id) : updateQty(item.id, item.quantity - 1)}
                          className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                        >
                          <MdRemove className="text-sm" />
                        </button>
                        <span className="w-8 text-center font-bold text-sm text-gray-700">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                        >
                          <MdAdd className="text-sm" />
                        </button>
                      </div>

                      <div className="text-right">
                        {saving > 0 ? (
                          <>
                            <p className="text-xs text-gray-400 line-through">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="font-bold text-emerald-600 text-sm">${lineTotal.toFixed(2)}</p>
                          </>
                        ) : (
                          <p className="font-bold text-gray-800 text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Order summary ── */}
            <div className="w-full lg:w-72 shrink-0">
              <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 lg:sticky lg:top-15">
                <h2 className="text-primary font-bold text-lg mb-4">Order Summary</h2>

                <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
                  {items.map((item) => {
                    const saving = offerDiscount(item.offer, item.price, item.quantity);
                    const lineTotal = item.price * item.quantity - saving;
                    return (
                      <div key={item.id} className="flex justify-between">
                        <span className="truncate mr-2">{item.name} × {item.quantity}</span>
                        <span className={`shrink-0 font-medium ${saving > 0 ? "text-emerald-600" : ""}`}>
                          ${lineTotal.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-1.5 border-t border-gray-100 pt-3 mb-5 text-sm">
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>🎁 Offer Savings</span>
                      <span>−${totalSavings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-base mt-1">
                    <span className="text-gray-800">Total</span>
                    <span className="text-secondary">${totalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">Pricing is indicative. Final quote confirmed on enquiry.</p>
                </div>

                <a
                  href="/checkout"
                  className="flex items-center justify-center gap-2 w-full bg-secondary text-white font-semibold py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
                >
                  Proceed to Checkout →
                </a>
                <a
                  href="/menu"
                  className="flex items-center justify-center w-full mt-3 text-primary border-2 border-primary font-semibold py-2.5 rounded-full hover:bg-primary hover:text-white transition-colors text-sm"
                >
                  Continue Browsing
                </a>
              </div>
            </div>

          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-gray-400 text-sm">
          © 2025 Pronto Gourmet Catering. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
