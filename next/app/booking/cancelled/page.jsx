"use client";

import Link from "next/link";
import { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { normalizeQuery } from "../_utils/url";

// This page renders a pixel-perfect error/cancelled state for the booking flow.
// Data can be passed via URL, e.g. /booking/cancelled?bookingId=...&product=...&amount=10000&balance=25000&error=OTP%20failed
export default function BookingCancelledPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 pb-16">Loading...</div>}>
      <BookingCancelledContent />
    </Suspense>
  );
}

function BookingCancelledContent() {
  const sp = useSearchParams();
  const q = useMemo(() => normalizeQuery(sp), [sp]);
  const data = useMemo(() => {
    const amount = q.amount;
    const balance = q.balance;
    return {
      bookingId: q.bookingId || "—",
      product: q.product || "—",
      amount: amount ? formatINR(amount) : "—",
      balance: balance ? formatINR(balance) : "—",
      error: q.error || "Your booking could not be completed.",
      back: q.back || "/",
      retry: q.retry || "/",
    };
  }, [q]);

  return (
    <div className="max-w-4xl mx-auto pt-28 px-4 pb-16">
      <div className="mb-6 mt-3 inline-flex items-center gap-2 text-sm text-gray-600">
        <ArrowLeftIcon className="w-5 h-5" />
        <Link href={data.back} className="underline hover:text-gray-900">Go back</Link>
      </div>

    <h1 className="text-3xl sm:text-4xl font-semibold text-center">Book Your Product</h1>
      <p className="text-center text-gray-500 mt-1">Book with minimum amount and get free delivery through referrals</p>

      <div className="mt-8 bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <ErrorBadge />
          </div>
          <h2 className="mt-4 text-xl sm:text-2xl font-bold text-red-600">BOOKING FAILED</h2>
          <p className="mt-2 text-gray-600 max-w-xl">{data.error}</p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <InfoCard label="Booking ID" value={data.bookingId} />
          <InfoCard label="Amount Attempted" value={data.amount} />
          <InfoCard label="Product" value={data.product} />
          <InfoCard label="Balance" value={data.balance} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link href={data.retry} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition">Try Again</Link>
          <Link href={data.back} className="px-5 py-2.5 rounded-xl border border-blue-600 text-blue-700 font-medium hover:bg-blue-50 transition">Go to Previous Step</Link>
        </div>

        <div className="mt-8 text-xs text-gray-500 text-center">
          If the amount was deducted, it will be auto‑refunded by your bank within 3–7 business days.
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4 sm:p-5">
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="mt-1 font-semibold text-gray-900">{value}</div>
    </div>
  );
}

function ErrorBadge() {
  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-50 border border-red-200 flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.34 3.94 3.94 10.34a2.25 2.25 0 0 0 0 3.18l6.4 6.4a2.25 2.25 0 0 0 3.18 0l6.4-6.4a2.25 2.25 0 0 0 0-3.18l-6.4-6.4a2.25 2.25 0 0 0-3.18 0Z" />
      </svg>
    </div>
  );
}

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function formatINR(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);
}
