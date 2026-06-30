"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

type Testimonial = {
  id: string;
  rating: number;
  review: string;
  name: string;
  event?: string;
  submittedAt: string;
  isUserSubmitted?: boolean;
};

const SEEDED: Testimonial[] = [
  {
    id: "s1",
    rating: 5,
    review:
      "Pronto Gourmet delivered exceptional food for our annual company conference. Every dish was fresh, beautifully presented, and the team handled last-minute changes flawlessly.",
    name: "Sarah M.",
    event: "Corporate Conference",
    submittedAt: "2024-05-15T09:00:00Z",
  },
  {
    id: "s2",
    rating: 5,
    review:
      "We've used Pronto for our Friday morning teas for the past 6 months and the quality never drops. Always on time, always delicious. Highly recommend!",
    name: "James T.",
    event: "Weekly Office Catering",
    submittedAt: "2024-06-01T10:00:00Z",
  },
  {
    id: "s3",
    rating: 5,
    review:
      "Our wedding reception catering was handled perfectly. The finger foods and canapés were a massive hit with all our guests. Thank you Pronto!",
    name: "Emily & Rob",
    event: "Wedding Reception",
    submittedAt: "2024-04-20T14:00:00Z",
  },
  {
    id: "s4",
    rating: 4,
    review:
      "Great food and professional service. The set breakfast menus were perfect for our team of 30. Will definitely order again for our next team day.",
    name: "Michael K.",
    event: "Team Breakfast",
    submittedAt: "2024-05-28T08:00:00Z",
  },
  {
    id: "s5",
    rating: 5,
    review:
      "Ordered with less than 24 hours notice and they pulled it off perfectly. The hot meals for our staff event were hearty and delicious. Incredible service.",
    name: "Linda P.",
    event: "Staff Event",
    submittedAt: "2024-06-10T12:00:00Z",
  },
  {
    id: "s6",
    rating: 5,
    review:
      "The corporate platters were absolutely stunning — guests kept asking who catered the event. Professional, punctual, and genuinely delicious.",
    name: "Tom W.",
    event: "Product Launch",
    submittedAt: "2024-03-18T11:00:00Z",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-secondary text-base leading-none">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? "text-secondary" : "text-gray-200"}>
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const date = new Date(t.submittedAt).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 flex flex-col gap-3 border-t-4 border-secondary">
      <Stars rating={t.rating} />
      {t.review ? (
        <p className="text-gray-700 text-sm leading-relaxed flex-1">
          &ldquo;{t.review}&rdquo;
        </p>
      ) : (
        <p className="text-gray-400 text-sm italic flex-1">No written review.</p>
      )}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-primary">{t.name}</p>
          {t.event && (
            <p className="text-xs text-gray-400 mt-0.5">{t.event}</p>
          )}
          {t.isUserSubmitted && (
            <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Verified Order
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 shrink-0">{date}</p>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  const [userReviews, setUserReviews] = useState<Testimonial[]>([]);

  useEffect(() => {
    type StoredReview = { id: string; rating: number; review: string; submittedAt: string };
    const raw = JSON.parse(localStorage.getItem("pronto_reviews") ?? "[]") as StoredReview[];
    const filtered: Testimonial[] = raw
      .filter((r) => r.rating >= 4)
      .map((r) => ({
        id: r.id,
        rating: r.rating,
        review: r.review,
        name: "Guest User",
        submittedAt: r.submittedAt,
        isUserSubmitted: true,
      }));
    setUserReviews(filtered);
  }, []);

  const all = [...userReviews, ...SEEDED].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  const fiveStarCount = all.filter((t) => t.rating === 5).length;
  const fourStarCount = all.filter((t) => t.rating === 4).length;

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Navbar />

      {/* Header */}
      <header className="relative bg-primary overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-24 -left-12 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-8 right-1/3 w-32 h-32 rounded-full bg-secondary/20" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
          <p className="text-white/50 text-xs mb-4 tracking-widest uppercase">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-secondary">Reviews</span>
          </p>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="inline-block bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
                What Our Clients Say
              </span>
              <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-2">
                Client<br />
                <span className="text-secondary">Testimonials</span>
              </h1>
              <p className="text-white/65 text-xs sm:text-sm max-w-md hidden sm:block">
                Real feedback from Perth businesses and families who trust Pronto Gourmet Catering.
              </p>
            </div>

            {/* Rating summary */}
            <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl px-5 py-4 w-fit">
              <div className="text-center">
                <p className="text-white text-3xl sm:text-4xl font-black leading-none">4.9</p>
                <div className="flex text-secondary text-sm my-1 tracking-tight">★★★★★</div>
                <p className="text-white/50 text-[10px] uppercase tracking-widest">Overall</p>
              </div>
              <div className="border-l border-white/20 pl-4 space-y-1">
                <p className="text-white/70 text-xs"><span className="text-white font-bold">{fiveStarCount}</span> five-star reviews</p>
                <p className="text-white/70 text-xs"><span className="text-white font-bold">{fourStarCount}</span> four-star reviews</p>
                <p className="text-white/70 text-xs"><span className="text-white font-bold">{all.length}</span> total reviews</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 w-full flex-1">
        {all.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">💬</p>
            <p className="text-gray-500 font-semibold">No reviews yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Be the first to leave a review after your order.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {all.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-gray-400 text-sm">
          © 2025 Pronto Gourmet Catering. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
