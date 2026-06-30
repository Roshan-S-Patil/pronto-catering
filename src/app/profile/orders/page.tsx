"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { MdLocalShipping, MdStorefront } from "react-icons/md";

type OrderItem = { id: number; name: string; price: number; img: string; quantity: number };

type Order = {
  id: string;
  placedAt: string;
  status: "pending" | "completed";
  items: OrderItem[];
  method: "delivery" | "pickup";
  date: string;
  time: string;
  subtotal: number;
  deliveryFee: number;
  discountRate: number;
  total: number;
};

const DUMMY_ORDER: Order = {
  id: "ORD-20240610-0001",
  placedAt: "2024-06-10T10:30:00Z",
  status: "completed",
  method: "delivery",
  date: "2024-06-10",
  time: "11:00",
  items: [
    {
      id: 101,
      name: "Assorted Sandwiches Platter",
      price: 45,
      img: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&q=80",
      quantity: 2,
    },
    {
      id: 102,
      name: "Morning Tea Selection",
      price: 28,
      img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80",
      quantity: 1,
    },
  ],
  subtotal: 118,
  deliveryFee: 22,
  discountRate: 0,
  total: 140,
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

function OrderItemRow({ item }: { item: OrderItem }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <img
        src={item.img}
        alt={item.name}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
      </div>
      <p className="text-sm font-semibold text-gray-700 shrink-0">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
}

function PriceSummary({ order }: { order: Order }) {
  return (
    <div className="bg-gray-50 rounded-xl px-4 py-3 mt-4 text-sm space-y-1.5">
      <div className="flex justify-between text-gray-500">
        <span>Subtotal</span>
        <span>${order.subtotal.toFixed(2)}</span>
      </div>
      {order.deliveryFee > 0 && (
        <div className="flex justify-between text-gray-500">
          <span>Delivery</span>
          <span>${order.deliveryFee.toFixed(2)}</span>
        </div>
      )}
      {order.discountRate > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Discount ({(order.discountRate * 100).toFixed(0)}% off)</span>
          <span>−${(order.subtotal * order.discountRate).toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between font-bold text-gray-800 pt-1.5 border-t border-gray-200 mt-1">
        <span>Total</span>
        <span className="text-secondary">AUD ${order.total.toFixed(2)}</span>
      </div>
    </div>
  );
}

function StarRating({ orderId }: { orderId: string }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    const entry = {
      id: `rev-${Date.now()}`,
      orderId,
      rating,
      review: review.trim(),
      submittedAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("pronto_reviews") ?? "[]");
    localStorage.setItem("pronto_reviews", JSON.stringify([entry, ...existing]));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-5 pt-5 border-t border-gray-100 text-center py-4">
        <p className="text-2xl mb-2">🎉</p>
        <p className="text-sm font-semibold text-gray-800">Thank you for your review!</p>
        <p className="text-xs text-gray-400 mt-1">Your feedback helps us improve.</p>
        {rating >= 4 && (
          <a
            href="/testimonials"
            className="inline-block mt-3 text-xs font-semibold text-secondary hover:underline"
          >
            View on Testimonials →
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="mt-5 pt-5 border-t border-gray-100">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Rate this order</p>

      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="text-3xl sm:text-4xl leading-none transition-colors"
          >
            <span className={(hovered || rating) >= star ? "text-secondary" : "text-gray-200"}>
              ★
            </span>
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-2 self-center text-xs text-gray-400 font-medium">
            {["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}
          </span>
        )}
      </div>

      {/* Review textarea — appears after a star is selected */}
      {rating > 0 && (
        <div className="space-y-3">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Tell us about your experience (optional)..."
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-primary transition-colors resize-none"
          />
          <button
            onClick={handleSubmit}
            className="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-secondary transition-colors"
          >
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const isPending = order.status === "pending";

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                isPending
                  ? "bg-orange-100 text-orange-600"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {isPending ? "Pending" : "Completed"}
            </span>
            <span className="text-xs text-gray-400">{order.id}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Placed {formatDate(order.placedAt)}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
          {order.method === "delivery" ? (
            <MdLocalShipping className="text-base text-primary" />
          ) : (
            <MdStorefront className="text-base text-primary" />
          )}
          {order.method === "delivery" ? "Delivery" : "Pick Up"} ·{" "}
          {formatDate(order.date)} at {formatTime(order.time)}
        </div>
      </div>

      {/* Items */}
      <div className="px-5 pt-4 pb-2">
        {order.items.map((item) => (
          <OrderItemRow key={item.id} item={item} />
        ))}
        <PriceSummary order={order} />
      </div>

      {/* Rating section — only for completed orders */}
      {!isPending && (
        <div className="px-5 pb-5">
          <StarRating orderId={order.id} />
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pronto_orders") ?? "[]") as Order[];
    setOrders([...saved, DUMMY_ORDER]);
  }, []);

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
            <a href="/profile" className="hover:text-white transition-colors">Profile</a>
            <span className="mx-2">/</span>
            <span className="text-secondary">Your Orders</span>
          </p>
          <h1 className="text-white text-2xl sm:text-3xl font-bold">Your Orders</h1>
          <p className="text-white/55 text-xs sm:text-sm mt-1">{orders.length} order{orders.length !== 1 ? "s" : ""}</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full flex-1 space-y-4 sm:space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-gray-500 font-semibold">No orders yet</p>
            <p className="text-gray-400 text-sm mt-1 mb-6">Your orders will appear here after checkout.</p>
            <a href="/menu" className="bg-primary text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-secondary transition-colors">
              Browse Menu
            </a>
          </div>
        ) : (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </main>

      <footer className="bg-gray-900 text-white py-6 mt-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center text-gray-400 text-sm">
          © 2025 Pronto Gourmet Catering. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
