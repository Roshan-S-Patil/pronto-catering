"use client";

import { use, useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { MdFilterList, MdSearch, MdClose, MdOutlineRequestQuote } from "react-icons/md";

// ── Types ──────────────────────────────────────────────────────────────────

type DietaryTag = {
  key: string;
  abbrev: string;
  label: string;
  bg: string;
  text: string;
};

type Item = {
  id: number;
  name: string;
  category: string;
  price: number;
  dietary: string[];
  img: string;
  desc: string;
};

type UmbrellaKey = "category" | "dietary" | "price";
type PriceSort = "low" | "high" | null;

// ── Constants ──────────────────────────────────────────────────────────────

const DIETARY_TAGS: DietaryTag[] = [
  { key: "nuts",        abbrev: "CN", label: "Contains Nuts",      bg: "bg-red-500",     text: "text-white" },
  { key: "gluten",      abbrev: "CG", label: "Contains Gluten",    bg: "bg-orange-600",  text: "text-white" },
  { key: "soya",        abbrev: "CY", label: "Contains Soya",      bg: "bg-amber-500",   text: "text-white" },
  { key: "sulphites",   abbrev: "CU", label: "Contains Sulphites", bg: "bg-slate-500",   text: "text-white" },
  { key: "vegetarian",  abbrev: "V",  label: "Vegetarian",         bg: "bg-white border border-green-500", text: "text-green-600" },
  { key: "vegan",       abbrev: "VG", label: "Vegan",              bg: "bg-green-500",   text: "text-white" },
  { key: "pescatarian", abbrev: "PS", label: "Pescatarian",        bg: "bg-teal-500",    text: "text-white" },
  { key: "halal",       abbrev: "H",  label: "Halal",              bg: "bg-lime-500",    text: "text-white" },
  { key: "dairy-free",  abbrev: "DF", label: "Dairy Free",         bg: "bg-pink-400",    text: "text-white" },
  { key: "gluten-free", abbrev: "GF", label: "Gluten Free",        bg: "bg-emerald-500", text: "text-white" },
  { key: "lactose-free",abbrev: "LF", label: "Lactose Free",       bg: "bg-purple-500",  text: "text-white" },
];

const CATEGORIES = [
  "Breakfast Menu",
  "Set Breakfast Menus",
  "Morning Tea Menu",
  "Set Morning Tea Platters",
  "Sandwiches, Rolls & Wraps",
  "Set Lunch Menus",
  "Salads Menu",
  "Finger Food & Canapés",
  "Hot Meals",
  "Afternoon Tea Menu",
  "Special Dietary Menu",
  "Corporate Platters",
];

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

const ITEMS: Item[] = [
  // Breakfast Menu
  { id: 1,  name: "Smashed Avo & Feta Toast",     category: "breakfast-menu",         price: 8.5,  dietary: ["vegetarian","gluten"],                      img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80", desc: "Sourdough toast topped with smashed avocado, crumbled feta and dukkah." },
  { id: 2,  name: "Bircher Muesli Cup",            category: "breakfast-menu",         price: 6.0,  dietary: ["vegetarian","gluten","nuts"],                img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=600&q=80", desc: "Overnight oats with apple, yoghurt, toasted almonds and honey." },
  { id: 3,  name: "Bacon & Egg Roll",              category: "breakfast-menu",         price: 7.5,  dietary: ["gluten","halal"],                            img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80", desc: "Soft brioche roll with free-range eggs, bacon and tomato relish." },
  // Morning Tea
  { id: 4,  name: "Assorted Mini Muffins",         category: "morning-tea-menu",       price: 3.5,  dietary: ["vegetarian","gluten","nuts"],                img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=80", desc: "Blueberry, banana choc-chip and raspberry lemon mini muffins." },
  { id: 5,  name: "Fruit Skewers",                 category: "morning-tea-menu",       price: 4.0,  dietary: ["vegan","gluten-free","dairy-free"],          img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&q=80", desc: "Seasonal fresh fruit on bamboo skewers with a mint yoghurt dip." },
  { id: 6,  name: "Almond Croissant",              category: "morning-tea-menu",       price: 5.5,  dietary: ["vegetarian","gluten","nuts"],                img: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=600&q=80", desc: "Flaky butter croissant filled with almond frangipane and icing sugar." },
  // Set Morning Tea
  { id: 7,  name: "Classic Morning Tea Platter",   category: "set-morning-tea-platters",price: 22.0, dietary: ["vegetarian","nuts","gluten"],               img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80", desc: "Scones, mini muffins, fruit skewers and assorted biscuits for 4." },
  // Salads
  { id: 8,  name: "Mediterranean Chickpea Salad",  category: "salads-menu",            price: 12.0, dietary: ["vegan","gluten-free","dairy-free"],          img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80", desc: "Chickpeas, cucumber, tomato, olives and red onion in lemon-herb dressing." },
  { id: 9,  name: "Grilled Salmon Nicoise",        category: "salads-menu",            price: 16.5, dietary: ["pescatarian","gluten-free","dairy-free"],    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80", desc: "Green beans, eggs, olives and cherry tomatoes with grilled Atlantic salmon." },
  { id: 10, name: "Caesar Salad Pot",              category: "salads-menu",            price: 11.0, dietary: ["gluten","halal"],                            img: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&q=80", desc: "Baby cos, parmesan, croutons and house-made Caesar dressing." },
  // Finger Food
  { id: 11, name: "Vegetable Spring Rolls",        category: "finger-food-canap-s",    price: 5.0,  dietary: ["vegan","gluten","soya"],                     img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80", desc: "Crispy rolls filled with cabbage, carrot, vermicelli and ginger." },
  { id: 12, name: "Prawn Twisters",                category: "finger-food-canap-s",    price: 7.5,  dietary: ["pescatarian","gluten","sulphites"],           img: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=600&q=80", desc: "Tiger prawns wrapped in wonton pastry with sweet chilli sauce." },
  { id: 13, name: "Stuffed Mushrooms",             category: "finger-food-canap-s",    price: 6.0,  dietary: ["vegetarian","gluten-free","halal"],           img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", desc: "Button mushrooms filled with herbed ricotta and sun-dried tomato." },
  // Hot Meals
  { id: 14, name: "Beef Lasagne",                  category: "hot-meals",              price: 14.0, dietary: ["gluten","soya"],                             img: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&q=80", desc: "Slow-cooked beef bolognese layered with béchamel and fresh pasta." },
  { id: 15, name: "Butter Chicken with Rice",      category: "hot-meals",              price: 13.5, dietary: ["halal","gluten-free"],                       img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80", desc: "Tender chicken thighs in a rich tomato-cream sauce on steamed basmati." },
  { id: 16, name: "Pumpkin & Spinach Quiche",      category: "hot-meals",              price: 9.5,  dietary: ["vegetarian","gluten"],                       img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600&q=80", desc: "Shortcrust pastry filled with roasted pumpkin, spinach and gruyère." },
  // Sandwiches
  { id: 17, name: "Club Sandwich",                 category: "sandwiches-rolls-wraps", price: 10.5, dietary: ["gluten","halal"],                            img: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&q=80", desc: "Triple-decker with chicken, bacon, egg, lettuce and tomato on white toast." },
  { id: 18, name: "Falafel Wrap",                  category: "sandwiches-rolls-wraps", price: 9.0,  dietary: ["vegan","gluten","dairy-free"],               img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80", desc: "Crispy falafel, hummus, tabouleh and pickled turnips in a soft tortilla." },
  // Set Lunch
  { id: 19, name: "Working Lunch Box",             category: "set-lunch-menus",        price: 18.0, dietary: ["gluten","halal"],                            img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80", desc: "Sandwich, side salad, fruit and a cookie — all in one neat box." },
  // Afternoon Tea
  { id: 20, name: "Scones with Jam & Cream",       category: "afternoon-tea-menu",     price: 5.5,  dietary: ["vegetarian","gluten"],                       img: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=600&q=80", desc: "Buttermilk scones with strawberry jam and whipped cream." },
  { id: 21, name: "Macarons (Box of 6)",           category: "afternoon-tea-menu",     price: 14.0, dietary: ["vegetarian","gluten-free","nuts"],            img: "https://images.unsplash.com/photo-1558326567-98166e232c52?w=600&q=80", desc: "Vanilla, pistachio, raspberry and salted caramel French macarons." },
  // Special Dietary
  { id: 22, name: "Vegan Grain Bowl",              category: "special-dietary-menu",   price: 13.0, dietary: ["vegan","gluten-free","dairy-free","nuts"],    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80", desc: "Quinoa, roasted veg, edamame, pickled slaw and tahini dressing." },
  // Corporate Platters
  { id: 23, name: "Antipasto Sharing Platter",     category: "corporate-platters",     price: 45.0, dietary: ["gluten","sulphites","nuts"],                 img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80", desc: "Cured meats, marinated olives, cheeses, dips and artisan crackers." },
  { id: 24, name: "Set Breakfast Basket",          category: "set-breakfast-menus",    price: 16.0, dietary: ["vegetarian","gluten","nuts"],                img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&q=80", desc: "Mini pastries, yoghurt, seasonal fruit and freshly squeezed juice." },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function DietaryPill({ tag }: { tag: DietaryTag }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${tag.bg} ${tag.text}`}>
      <span className="font-bold">{tag.abbrev}</span>
      <span className="hidden sm:inline">{tag.label}</span>
    </span>
  );
}

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = use(params);

  const categoryName = CATEGORIES.find((c) => toSlug(c) === slug) ?? slug.replace(/-/g, " ");

  // filter state
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [activeUmbrella, setActiveUmbrella] = useState<UmbrellaKey>("category");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([slug]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [priceSort, setPriceSort] = useState<PriceSort>(null);
  const [search, setSearch] = useState("");

  // pending state (applied only when user clicks Apply)
  const [pendingCategories, setPendingCategories] = useState<string[]>([slug]);
  const [pendingDietary, setPendingDietary] = useState<string[]>([]);
  const [pendingPrice, setPendingPrice] = useState<PriceSort>(null);

  const popoverRef = useRef<HTMLDivElement>(null);

  // close popover on outside click
  useEffect(() => {
    if (!popoverOpen) return;
    function handler(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopoverOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [popoverOpen]);

  // sync pending state when popover opens
  function openPopover() {
    setPendingCategories(selectedCategories);
    setPendingDietary(selectedDietary);
    setPendingPrice(priceSort);
    setPopoverOpen(true);
  }

  function applyFilters() {
    setSelectedCategories(pendingCategories);
    setSelectedDietary(pendingDietary);
    setPriceSort(pendingPrice);
    setPopoverOpen(false);
  }

  function clearAll() {
    setPendingCategories([]);
    setPendingDietary([]);
    setPendingPrice(null);
    setSelectedCategories([]);
    setSelectedDietary([]);
    setPriceSort(null);
    setPopoverOpen(false);
  }

  // total active filter count (for badge on filter button)
  const totalActive = selectedCategories.length + selectedDietary.length + (priceSort ? 1 : 0);
  const pendingTotal = pendingCategories.length + pendingDietary.length + (pendingPrice ? 1 : 0);

  // derived filtered + sorted items
  let visible = ITEMS;
  if (selectedCategories.length) visible = visible.filter((i) => selectedCategories.includes(i.category));
  if (selectedDietary.length) visible = visible.filter((i) => selectedDietary.every((d) => i.dietary.includes(d)));
  if (search.trim()) visible = visible.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
  if (priceSort === "low") visible = [...visible].sort((a, b) => a.price - b.price);
  if (priceSort === "high") visible = [...visible].sort((a, b) => b.price - a.price);

  const umbrellaCounts = {
    category: pendingCategories.length,
    dietary: pendingDietary.length,
    price: pendingPrice ? 1 : 0,
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Navbar />

      {/* ── Header ── */}
      <header className="relative bg-primary overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-8 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute top-6 right-1/3 w-24 h-24 rounded-full bg-secondary/20" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
          <p className="text-white/50 text-xs mb-3 tracking-widest uppercase">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/menu" className="hover:text-white transition-colors">Our Menus</a>
            <span className="mx-2">/</span>
            <span className="text-secondary">{categoryName}</span>
          </p>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                <span className="text-secondary">{categoryName}</span>
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Browse and filter individual items — add to your event enquiry.
              </p>
            </div>
            <a
              href="/#quote"
              className="flex items-center gap-2 self-start md:self-auto bg-secondary text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <MdOutlineRequestQuote className="text-base" />
              Request a Quote
            </a>
          </div>
        </div>
      </header>

      {/* ── Filter & Search Bar ── */}
      <div className="sticky top-[52px] z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-3">

          {/* Filter button + popover wrapper */}
          <div className="relative" ref={popoverRef}>
            <button
              onClick={() => popoverOpen ? setPopoverOpen(false) : openPopover()}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <MdFilterList className="text-base" />
              Filter
              {totalActive > 0 && (
                <span className="bg-secondary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalActive}
                </span>
              )}
            </button>

            {/* Popover */}
            {popoverOpen && (
              <div className="absolute top-full left-0 mt-2 w-[520px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                <div className="flex">

                  {/* Left — umbrella terms */}
                  <div className="w-44 bg-gray-50 border-r border-gray-100 p-3 flex flex-col gap-1">
                    {(["category", "dietary", "price"] as UmbrellaKey[]).map((key) => {
                      const labels: Record<UmbrellaKey, string> = { category: "Menu Category", dietary: "Dietary", price: "Price" };
                      const count = umbrellaCounts[key];
                      return (
                        <button
                          key={key}
                          onClick={() => setActiveUmbrella(key)}
                          className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                            activeUmbrella === key ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {labels[key]}
                          {count > 0 && (
                            <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${activeUmbrella === key ? "bg-white text-primary" : "bg-secondary text-white"}`}>
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right — panel */}
                  <div className="flex-1 p-4 max-h-72 overflow-y-auto">
                    {activeUmbrella === "category" && (
                      <div className="flex flex-col gap-2">
                        {CATEGORIES.map((cat) => {
                          const s = toSlug(cat);
                          const checked = pendingCategories.includes(s);
                          return (
                            <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-primary">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => setPendingCategories(toggle(pendingCategories, s))}
                                className="accent-primary w-4 h-4"
                              />
                              {cat}
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {activeUmbrella === "dietary" && (
                      <div className="flex flex-col gap-2">
                        {DIETARY_TAGS.map((tag) => {
                          const checked = pendingDietary.includes(tag.key);
                          return (
                            <label key={tag.key} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-primary">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => setPendingDietary(toggle(pendingDietary, tag.key))}
                                className="accent-primary w-4 h-4"
                              />
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${tag.bg} ${tag.text}`}>
                                {tag.abbrev}
                              </span>
                              {tag.label}
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {activeUmbrella === "price" && (
                      <div className="flex flex-col gap-3">
                        {(["low", "high"] as const).map((val) => (
                          <label key={val} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-primary">
                            <input
                              type="radio"
                              checked={pendingPrice === val}
                              onChange={() => setPendingPrice(val)}
                              className="accent-primary w-4 h-4"
                            />
                            Price: {val === "low" ? "Low to High" : "High to Low"}
                          </label>
                        ))}
                        {pendingPrice && (
                          <button onClick={() => setPendingPrice(null)} className="text-xs text-secondary hover:underline self-start mt-1">
                            Clear price sort
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Popover footer */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
                  <button onClick={clearAll} className="text-sm text-secondary hover:underline font-medium">
                    Clear All
                  </button>
                  <div className="flex items-center gap-2">
                    {pendingTotal > 0 && (
                      <span className="text-xs text-gray-500">{pendingTotal} filter{pendingTotal > 1 ? "s" : ""} selected</span>
                    )}
                    <button
                      onClick={applyFilters}
                      className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search */}
          <div className="flex-1 relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items…"
              className="w-full border border-gray-300 rounded-full pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <MdClose className="text-base" />
              </button>
            )}
          </div>

          {/* Active filter chips */}
          {totalActive > 0 && (
            <button onClick={clearAll} className="text-xs text-secondary font-semibold hover:underline whitespace-nowrap">
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* ── Items Grid ── */}
      <main className="max-w-6xl mx-auto px-6 py-10 w-full">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🍽️</div>
            <h3 className="text-gray-600 font-semibold text-lg mb-1">No items found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your filters or search term.</p>
            <button onClick={clearAll} className="mt-4 text-secondary text-sm font-semibold hover:underline">
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-400 text-xs mb-6">{visible.length} item{visible.length !== 1 ? "s" : ""} found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((item) => {
                const dietaryDetails = DIETARY_TAGS.filter((t) => item.dietary.includes(t.key));
                return (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {/* Price badge */}
                      <span className="absolute top-3 right-3 bg-secondary text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-primary font-bold text-base mb-1">{item.name}</h3>
                      <p className="text-gray-500 text-sm mb-3 flex-1">{item.desc}</p>

                      {/* Dietary pills */}
                      {dietaryDetails.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {dietaryDetails.map((tag) => (
                            <DietaryPill key={tag.key} tag={tag} />
                          ))}
                        </div>
                      )}

                      <button className="w-full border-2 border-primary text-primary font-semibold text-sm py-2 rounded-full hover:bg-primary hover:text-white transition-colors mt-auto">
                        Add to Enquiry →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="mt-auto bg-gray-900 text-white py-6">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400 text-sm">
          © 2025 Pronto Gourmet Catering. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
