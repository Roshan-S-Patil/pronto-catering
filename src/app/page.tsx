import Image from "next/image";

const whyChoose = [
  {
    title: "Fresh Food Prepared Daily",
    desc: "Every dish is made fresh the day of your event — no frozen shortcuts.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
      </svg>
    ),
  },
  {
    title: "Delivered On Time & Within Budget",
    desc: "Reliable logistics so your event runs smoothly from start to finish.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: "Operating 7 Days a Week Across Perth Metro",
    desc: "We're available every day of the week, wherever you are in Perth.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Catering Available Within 24 Hours' Notice",
    desc: "Last-minute event? No problem — we'll make it happen.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <a href="/">
            <Image src="/logo.jpg" alt="Pronto Catering" width={110} height={42} style={{ width: 110, height: "auto" }} priority />
          </a>
          <div className="hidden md:flex items-center gap-6 text-xs font-medium">
            <a href="#menu" className="text-primary hover:text-secondary transition-colors">Menu</a>
            <a href="#why-us" className="text-primary hover:text-secondary transition-colors">Why Us</a>
            <a href="#quote" className="text-secondary border border-secondary px-4 py-1.5 rounded-full hover:bg-secondary hover:text-white transition-colors">
              Get a Quote
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative w-full min-h-screen bg-black flex items-center overflow-hidden">
        {/* Food image — right half, fading into black on the left */}
        <div className="absolute inset-0 flex">
          <div className="absolute right-0 top-0 w-full h-full md:w-3/5">
            <Image
              src="/partyfood.webp"
              alt=""
              fill
              className="object-cover object-center"
              priority
            />
            {/* Fade: fully black on left edge, transparent on right */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>
        </div>

        {/* Content — left aligned */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
          <div className="max-w-lg">
            <p className="text-secondary text-xs uppercase tracking-widest font-semibold mb-3">
              Perth&apos;s Trusted Catering Specialists
            </p>
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-4">
              Catering That Makes<br />Every Event Memorable
            </h1>
            <p className="text-white/75 text-base md:text-lg max-w-md mb-8">
              From intimate gatherings to large corporate functions — fresh, delicious food
              delivered on time, every time across Perth Metro.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#quote"
                className="bg-secondary text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Request a Quote
              </a>
              <a
                href="#menu"
                className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white hover:text-primary transition-colors"
              >
                View Our Menu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Pronto ── */}
      <section id="why-us" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-primary text-3xl md:text-4xl font-bold mb-4">
            Why Choose Pronto Gourmet Catering?
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            We&apos;ve been helping Perth businesses and families celebrate with exceptional food since day one.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-secondary text-center"
              >
                <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
                  {item.icon}
                </div>
                <h3 className="text-primary font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2 Action Cards ── */}
      <section id="menu" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-center text-primary text-3xl font-bold mb-12">
            Ready to Get Started?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary rounded-2xl p-10 text-white text-center flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-3">Check Our Menu</h3>
              <p className="text-white/80 mb-6">
                Browse our range of fresh, seasonal menus crafted for every occasion.
              </p>
              <a
                href="/menu"
                className="bg-white text-primary font-semibold px-6 py-3 rounded-full hover:bg-secondary hover:text-white transition-colors"
              >
                View Menu
              </a>
            </div>
            <div id="quote" className="bg-secondary rounded-2xl p-10 text-white text-center flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-3">Request a Quote</h3>
              <p className="text-white/80 mb-6">
                Tell us about your event and we&apos;ll put together a personalised catering package.
              </p>
              <a
                href="/quote"
                className="bg-white text-secondary font-semibold px-6 py-3 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Corporate, Party &amp; Event Catering Specialists in Perth
          </h2>
          <p className="text-white/80 text-lg max-w-3xl mx-auto mb-8">
            Whether it&apos;s a boardroom lunch, a school fete, a wedding reception, or a backyard birthday —
            Pronto Gourmet Catering brings the same commitment to quality and service to every event, big or small.
          </p>
          <a
            href="/quote"
            className="inline-block bg-secondary text-white font-semibold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity"
          >
            Start Planning Your Event
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
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
                Perth&apos;s trusted catering company for events, corporate functions, and private celebrations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-secondary">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">Our Menu</a></li>
                <li><a href="#quote" className="hover:text-white transition-colors">Request a Quote</a></li>
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
