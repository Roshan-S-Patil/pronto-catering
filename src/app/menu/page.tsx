import Navbar from "@/components/Navbar";
import { MdOutlineRequestQuote } from "react-icons/md";

const categories = [
  {
    name: "Breakfast Menu",
    desc: "Start the day right with fresh pastries, eggs, fruit, and more.",
    img: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80",
  },
  {
    name: "Set Breakfast Menus",
    desc: "Pre-set packages for teams and groups — easy to order, easy to enjoy.",
    img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&q=80",
  },
  {
    name: "Morning Tea Menu",
    desc: "Sweet and savoury bites perfect for mid-morning breaks.",
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80",
  },
  {
    name: "Set Morning Tea Platters",
    desc: "Curated platters designed to impress at any corporate gathering.",
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
  },
  {
    name: "Sandwiches, Rolls & Wraps",
    desc: "Freshly made to order with quality fillings and artisan breads.",
    img: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&q=80",
  },
  {
    name: "Set Lunch Menus",
    desc: "Complete lunch packages for offices, events, and working lunches.",
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
  },
  {
    name: "Salads Menu",
    desc: "Light, vibrant salads made from the freshest seasonal ingredients.",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  },
  {
    name: "Finger Food & Canapés",
    desc: "Elegant bite-sized pieces ideal for cocktail parties and events.",
    img: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=600&q=80",
  },
  {
    name: "Hot Meals",
    desc: "Hearty, warming dishes perfect for workforce and team events.",
    img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80",
  },
  {
    name: "Afternoon Tea Menu",
    desc: "Delightful treats and beverages for relaxed afternoon occasions.",
    img: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=600&q=80",
  },
  {
    name: "Special Dietary Menu",
    desc: "Gluten-free, vegan, and allergy-aware options for every guest.",
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
  },
  {
    name: "Corporate Platters",
    desc: "Impressive sharing platters built for boardrooms and big occasions.",
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80",
  },
];

export default function MenuPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Navbar />

      {/* ── Page Header ── */}
      <header className="relative bg-primary overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-24 -left-12 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-8 right-1/3 w-32 h-32 rounded-full bg-secondary/20" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-16">
          {/* breadcrumb */}
          <p className="text-white/50 text-xs mb-3 sm:mb-4 tracking-widest uppercase">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-secondary">Our Menus</span>
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-6">
            <div>
              <span className="inline-block bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full mb-2 sm:mb-4 uppercase tracking-widest">
                Fresh · Local · Delicious
              </span>
              <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-2 sm:mb-3">
                Our Menu<br />
                <span className="text-secondary">Categories</span>
              </h1>
              <p className="text-white/70 text-xs sm:text-base max-w-lg hidden sm:block">
                Browse our full range of catering menus — crafted fresh daily for every
                occasion, from boardroom breakfasts to lavish event spreads.
              </p>
            </div>

            <a
              href="/contact"
              className="flex items-center gap-2 self-start md:self-auto bg-secondary text-white font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <MdOutlineRequestQuote className="text-base sm:text-lg" />
              Request a Quote
            </a>
          </div>

          {/* stat strip */}
          <div className="flex flex-wrap gap-4 sm:gap-8 mt-4 sm:mt-10 pt-4 sm:pt-8 border-t border-white/10">
            {[
              { value: "12+", label: "Menu Categories" },
              { value: "100+", label: "Individual Items" },
              { value: "7", label: "Days a Week" },
              { value: "24hr", label: "Notice Available" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-secondary text-lg sm:text-2xl font-bold">{s.value}</p>
                <p className="text-white/60 text-xs uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Category Grid ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={`/menu/${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              {/* image */}
              <div className="relative h-52 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* dark overlay on hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>

              {/* card body */}
              <div className="p-5 border-b-4 border-transparent group-hover:border-secondary transition-colors duration-300">
                <h2 className="text-primary font-bold text-base uppercase tracking-wide mb-1">
                  {cat.name}
                </h2>
                <p className="text-gray-500 text-sm mb-4">{cat.desc}</p>
                <span className="inline-flex items-center gap-1 text-secondary text-xs font-semibold uppercase tracking-widest group-hover:gap-2 transition-all">
                  View More
                  <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </main>

      {/* ── Footer strip ── */}
      <footer className="mt-auto bg-gray-900 text-white py-6">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400 text-sm">
          © 2025 Pronto Gourmet Catering. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
