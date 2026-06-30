import Image from "next/image";
import Navbar from "@/components/Navbar";
import { MdRestaurantMenu, MdOutlineRequestQuote } from "react-icons/md";
import { GiMeal } from "react-icons/gi";

const whyChoose = [
  {
    title: "Fresh Food Prepared Daily",
    desc: "Every dish is made fresh the day of your event — no frozen shortcuts.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
        />
      </svg>
    ),
  },
  {
    title: "Delivered On Time & Within Budget",
    desc: "Reliable logistics so your event runs smoothly from start to finish.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-7 h-7"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: "Operating 7 Days a Week Across Perth Metro",
    desc: "We're available every day of the week, wherever you are in Perth.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Catering Available Within 24 Hours' Notice",
    desc: "Last-minute event? No problem — we'll make it happen.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative w-full bg-black flex items-center overflow-hidden min-h-80 max-h-[55vh] md:max-h-none md:min-h-screen">
        {/* Food image — right half, fading into black on the left */}
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 w-full h-full md:w-3/5">
            <Image
              src="/partyfood.webp"
              alt=""
              fill
              className="object-cover object-center"
              priority
            />
            {/* Fade: fully black on left edge, transparent on right */}
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent" />
          </div>
        </div>

        {/* Content — left aligned, compact on mobile */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-20 w-full">
          <div className="max-w-lg">
            <p className="text-secondary text-xs uppercase tracking-widest font-semibold mb-2 sm:mb-3">
              Perth&apos;s Trusted Catering Specialists
            </p>
            <h1 className="text-white text-xl sm:text-3xl md:text-5xl font-bold leading-tight mb-3 sm:mb-4">
              Catering That Makes
              <br />
              Every Event Memorable
            </h1>

            {/* Overall rating */}
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <div className="flex text-secondary text-sm sm:text-base leading-none tracking-tight">
                ★★★★★
              </div>
              <span className="text-white font-bold text-sm sm:text-base">4.9</span>
              <span className="text-white/40 text-xs">·</span>
              <span className="text-white/60 text-xs sm:text-sm">500+ happy clients</span>
            </div>

            <p className="text-white/75 text-xs sm:text-base md:text-lg max-w-md mb-4 sm:mb-5 hidden sm:block">
              From intimate gatherings to large corporate functions — fresh,
              delicious food delivered on time, every time across Perth Metro.
            </p>

            {/* 10% corporate offer card */}
            <div className="flex items-center gap-3 bg-linear-to-r from-orange-500/20 to-orange-400/5 border border-orange-500/50 rounded-2xl px-4 py-3.5 mb-6 sm:mb-7 w-fit">
              <div className="shrink-0 bg-secondary rounded-xl px-3 py-3 text-center shadow-md shadow-orange-600/40">
                <span className="text-white text-2xl sm:text-3xl font-black leading-none block">10%</span>
                <span className="text-white/90 text-[9px] font-bold uppercase tracking-widest">OFF</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse inline-block shrink-0" />
                  <span className="text-orange-300 text-[10px] font-bold uppercase tracking-wider">Limited Offer</span>
                </div>
                <p className="text-white font-bold text-sm leading-tight">First Corporate Order</p>
                <p className="text-white/60 text-xs mt-0.5">
                  Your first event, our treat — use code{" "}
                  <span className="text-secondary font-bold tracking-wide">CORP10</span>
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-2 sm:gap-3">
              {/* View Our Menu — outline, cloche badge top-right reveals 10% OFF */}
              <a
                href="/menu"
                className="relative flex items-center gap-1.5 sm:gap-2 border-2 border-white text-white px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm hover:bg-white hover:text-primary transition-colors whitespace-nowrap"
              >
                <span className="absolute -top-3.5 -right-2 flex items-center gap-0.5 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md shadow-orange-600/40 leading-none whitespace-nowrap">
                  <GiMeal className="text-xs shrink-0" />
                  10% OFF
                </span>
                <MdRestaurantMenu className="text-sm sm:text-base shrink-0" />
                View Our Menu
              </a>
              <a
                href="/contact"
                className="flex items-center gap-1.5 sm:gap-2 border-2 border-white text-white px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm hover:bg-white hover:text-primary transition-colors whitespace-nowrap"
              >
                <MdOutlineRequestQuote className="text-sm sm:text-base shrink-0" /> Request a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Pronto ── */}
      <section id="why-us" className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-primary text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Why Choose Pronto Gourmet Catering?
          </h2>
          <p className="text-center text-gray-500 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            We&apos;ve been helping Perth businesses and families celebrate with
            exceptional food since day one.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-secondary text-center"
              >
                <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
                  {item.icon}
                </div>
                <h3 className="text-primary font-semibold text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* ── Overall Rating Banner ── */}
          <div className="mt-8 sm:mt-12 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-0">

              {/* Score block */}
              <div className="w-full sm:w-48 bg-primary flex flex-col items-center justify-center py-8 sm:py-10 px-6 shrink-0">
                <p className="text-white text-5xl sm:text-6xl font-black leading-none">4.9</p>
                <div className="flex text-secondary text-xl sm:text-2xl my-2 tracking-tight">★★★★★</div>
                <p className="text-white/60 text-xs uppercase tracking-widest text-center">Overall Rating</p>
              </div>

              {/* Breakdown */}
              <div className="flex-1 px-6 sm:px-8 py-6 sm:py-8 w-full">
                <p className="text-gray-700 text-sm sm:text-base font-semibold mb-1">
                  Trusted by 500+ clients across Perth
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mb-5">
                  Based on verified reviews from corporate events, private functions, and daily catering orders.
                </p>
                <div className="space-y-2">
                  {[
                    { star: 5, pct: 82 },
                    { star: 4, pct: 14 },
                    { star: 3, pct: 3 },
                    { star: 2, pct: 1 },
                    { star: 1, pct: 0 },
                  ].map(({ star, pct }) => (
                    <div key={star} className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xs text-gray-400 w-3 shrink-0 text-right">{star}</span>
                      <span className="text-secondary text-xs leading-none">★</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-secondary h-2 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-7 shrink-0 text-right">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 2 Action Cards ── */}
      <section id="menu" className="py-12 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-primary text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">
            Ready to Get Started?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary rounded-2xl p-7 sm:p-10 text-white text-center flex flex-col items-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-3">Check Our Menu</h3>
              <p className="text-white/80 mb-6 text-sm sm:text-base">
                Browse our range of fresh, seasonal menus crafted for every
                occasion.
              </p>
              <a
                href="/menu"
                className="bg-white text-primary font-semibold px-6 py-3 rounded-full hover:bg-secondary hover:text-white transition-colors text-sm"
              >
                View Menu
              </a>
            </div>
            <div
              id="quote"
              className="bg-secondary rounded-2xl p-7 sm:p-10 text-white text-center flex flex-col items-center"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-3">Request a Quote</h3>
              <p className="text-white/80 mb-6 text-sm sm:text-base">
                Tell us about your event and we&apos;ll put together a
                personalised catering package.
              </p>
              <a
                href="/contact"
                className="bg-white text-secondary font-semibold px-6 py-3 rounded-full hover:bg-primary hover:text-white transition-colors text-sm"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="py-12 sm:py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Corporate, Party &amp; Event Catering Specialists in Perth
          </h2>
          <p className="text-white/80 text-sm sm:text-lg max-w-3xl mx-auto mb-6 sm:mb-8">
            Whether it&apos;s a boardroom lunch, a school fete, a wedding
            reception, or a backyard birthday — Pronto Gourmet Catering brings
            the same commitment to quality and service to every event, big or
            small.
          </p>
          <a
            href="/contact"
            className="inline-block bg-secondary text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-lg hover:opacity-90 transition-opacity"
          >
            Start Planning Your Event
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-white py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 sm:gap-8">
            <div>
              <Image
                src="/logo.jpg"
                alt="Pronto Catering"
                width={140}
                height={52}
                style={{ width: 140, height: "auto" }}
                className="brightness-0 invert mb-3"
              />
              <p className="text-gray-400 text-sm max-w-xs">
                Perth&apos;s trusted catering company for events, corporate
                functions, and private celebrations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-secondary">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a
                    href="#why-us"
                    className="hover:text-white transition-colors"
                  >
                    Why Choose Us
                  </a>
                </li>
                <li>
                  <a href="menu" className="hover:text-white transition-colors">
                    Our Menu
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Request a Quote
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-secondary">Contact Us</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Phone: 08 9307 3071</li>
                <li>Email: orders@prontocatering.com.au</li>
                <li>Perth Metro, WA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-400 text-sm">
            © 2025 Pronto Gourmet Catering. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
