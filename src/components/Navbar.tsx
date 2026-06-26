"use client";

import { useState } from "react";
import Image from "next/image";
import { MdRestaurantMenu, MdOutlineRequestQuote, MdShoppingCart, MdMenu, MdClose } from "react-icons/md";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <a href="/">
          <Image
            src="/logo.jpg"
            alt="Pronto Catering"
            width={100}
            height={38}
            style={{ width: 100, height: "auto" }}
            priority
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium">
          <a href="/menu" className="flex items-center gap-1 text-primary hover:text-secondary transition-colors">
            <MdRestaurantMenu className="text-base" /> Menu
          </a>
          <a href="/#why-us" className="text-primary hover:text-secondary transition-colors">Why Us</a>
          <a href="/#quote" className="flex items-center gap-1 text-secondary border border-secondary px-4 py-1.5 rounded-full hover:bg-secondary hover:text-white transition-colors">
            <MdOutlineRequestQuote className="text-base" /> Get a Quote
          </a>
          <a href="/cart" className="relative text-primary hover:text-secondary transition-colors">
            <MdShoppingCart className="text-xl" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </a>
        </div>

        {/* Mobile right: cart + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <a href="/cart" className="relative text-primary">
            <MdShoppingCart className="text-2xl" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="text-primary p-1"
            aria-label="Toggle menu"
          >
            {open ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 text-sm font-medium shadow-lg">
          <a href="/menu" onClick={() => setOpen(false)} className="flex items-center gap-2 text-primary hover:text-secondary transition-colors py-2 border-b border-gray-50">
            <MdRestaurantMenu className="text-lg" /> Menu
          </a>
          <a href="/#why-us" onClick={() => setOpen(false)} className="text-primary hover:text-secondary transition-colors py-2 border-b border-gray-50">
            Why Us
          </a>
          <a href="/#quote" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 text-secondary border border-secondary px-4 py-2.5 rounded-full hover:bg-secondary hover:text-white transition-colors mt-1">
            <MdOutlineRequestQuote className="text-base" /> Get a Quote
          </a>
        </div>
      )}
    </nav>
  );
}
