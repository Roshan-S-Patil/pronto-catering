import Image from "next/image";
import { MdRestaurantMenu, MdOutlineRequestQuote } from "react-icons/md";

export default function Navbar() {
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
        </div>
      </div>
    </nav>
  );
}
