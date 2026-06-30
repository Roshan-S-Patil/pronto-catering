import Navbar from "@/components/Navbar";
import { MdChevronRight, MdReceiptLong, MdPerson } from "react-icons/md";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Navbar />

      {/* Header */}
      <header className="relative bg-primary overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-8 w-72 h-72 rounded-full bg-white/5" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <p className="text-white/50 text-xs mb-3 tracking-widest uppercase">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-secondary">Profile</span>
          </p>

          {/* Avatar + name */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <MdPerson className="text-white text-3xl sm:text-4xl" />
            </div>
            <div>
              <h1 className="text-white text-xl sm:text-2xl font-bold leading-tight">Guest User</h1>
              <p className="text-white/55 text-xs sm:text-sm mt-0.5">Perth, WA</p>
            </div>
          </div>
        </div>
      </header>

      {/* Menu items */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full flex-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Account</p>
        <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100 overflow-hidden">
          <a
            href="/profile/orders"
            className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
              <MdReceiptLong className="text-secondary text-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors">Your Orders</p>
              <p className="text-xs text-gray-400 mt-0.5">Track and review your catering orders</p>
            </div>
            <MdChevronRight className="text-gray-300 text-xl shrink-0 group-hover:text-secondary transition-colors" />
          </a>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-6 mt-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center text-gray-400 text-sm">
          © 2025 Pronto Gourmet Catering. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
