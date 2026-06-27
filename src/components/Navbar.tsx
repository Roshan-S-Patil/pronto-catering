"use client";

import Image from "next/image";
import { MdRestaurantMenu, MdOutlineRequestQuote, MdShoppingCart } from "react-icons/md";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        <a href="/">
          <Image
            src="/logo.jpg"
            alt="Pronto Catering"
            width={110}
            height={42}
            style={{ width: 110, height: "auto" }}
            priority
          />
        </a>
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
      </div>
    </nav>
  );
}
