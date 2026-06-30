export type Offer = "B1G1" | "B3G1";

export const OFFER_LABELS: Record<Offer, string> = {
  B1G1: "Buy 1 Get 1 Free",
  B3G1: "Buy 3 Get 1 Free",
};

export const OFFER_COLOURS: Record<Offer, string> = {
  B1G1: "bg-emerald-500 text-white",
  B3G1: "bg-orange-500 text-white",
};

// B1G1: for every 2 items, 1 is free  →  floor(qty / 2)
// B3G1: for every 4 items, 1 is free  →  floor(qty / 4)
export function freeQty(offer: Offer | null | undefined, qty: number): number {
  if (!offer) return 0;
  if (offer === "B1G1") return Math.floor(qty / 2);
  if (offer === "B3G1") return Math.floor(qty / 4);
  return 0;
}

// minimum qty to trigger the first free item
export function offerMinQty(offer: Offer): number {
  return offer === "B1G1" ? 2 : 4;
}

// value of free items at a given price and qty
export function offerDiscount(
  offer: Offer | null | undefined,
  price: number,
  qty: number
): number {
  return freeQty(offer, qty) * price;
}
