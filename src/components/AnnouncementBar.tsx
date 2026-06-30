"use client";

import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash

  useEffect(() => {
    if (sessionStorage.getItem("announcementDismissed") !== "1") {
      setDismissed(false);
    }
  }, []);

  if (dismissed) return null;

  return (
    <div className="bg-secondary text-white py-2 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-center relative">
        <p className="text-center text-xs sm:text-sm font-medium pr-6">
          🎉 First Corporate Order — 10% off with code{" "}
          <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded tracking-wide">
            CORP10
          </span>
        </p>
        <button
          onClick={() => {
            sessionStorage.setItem("announcementDismissed", "1");
            setDismissed(true);
          }}
          className="absolute right-0 text-white/80 hover:text-white transition-colors p-1"
          aria-label="Dismiss announcement"
        >
          <MdClose className="text-base" />
        </button>
      </div>
    </div>
  );
}
