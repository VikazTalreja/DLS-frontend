"use client";

import Link from "next/link";
import { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { normalizeQuery } from "../_utils/url";

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 pb-16">Loading...</div>}>
      <BookingSuccessContent />
    </Suspense>
  );
}

function BookingSuccessContent() {
  const sp = useSearchParams();
  const q = useMemo(() => normalizeQuery(sp), [sp]);

  const data = useMemo(() => {
    const formatINR = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(n));
    return {
      bookingId: q.bookingId || "—",
      product: q.product || "—",
      amount: q.amount ? formatINR(q.amount) : "—",
      balance: q.balance ? formatINR(q.balance) : "—",
      referral: q.referral || "—",
      back: q.back || "/",
      shareUrl: typeof window !== "undefined" ? window.location.origin : "",
    };
  }, [q]);

  const copyReferral = async () => {
    if (!data.referral || data.referral === "—") return;
    try {
      await navigator.clipboard.writeText(data.referral);
      alert("Referral code copied!");
    } catch {}
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
      <div className="mb-6 mt-3 inline-flex items-center gap-2 text-sm text-gray-600">
        <ArrowLeftIcon className="w-5 h-5" />
        <Link href={data.back} className="underline hover:text-gray-900">Go back</Link>
      </div>

      <h1 className="text-3xl sm:text-4xl font-semibold text-center">Book Your Product</h1>
      <p className="text-center text-gray-500 mt-1">Book with minimum amount and get free delivery through referrals</p>

      <div className="mt-8 bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <SuccessBadge />
          <h2 className="mt-4 text-xl sm:text-2xl font-bold text-blue-700">BOOKING SUCCESSFUL!</h2>
          <p className="mt-2 text-gray-600 max-w-xl">Your booking has been confirmed. You will receive a receipt via email and WhatsApp.</p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <InfoCard label="Booking ID" value={data.bookingId} />
          <InfoCard label="Amount Paid" value={data.amount} />
          <InfoCard label="Product" value={data.product} />
          <InfoCard label="Balance" value={data.balance} />
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4 items-stretch">
          <div className="rounded-xl bg-gray-50 p-4 sm:p-5">
            <div className="text-gray-500 text-sm">Your Referral Code</div>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-semibold text-gray-900 tracking-wide">{data.referral}</span>
              <button onClick={copyReferral} className="ml-auto px-3 py-1.5 rounded-lg border border-blue-600 text-blue-700 text-sm font-medium hover:bg-blue-50">Copy Code</button>
            </div>
          </div>
          <div className="rounded-xl bg-gray-50 p-4 sm:p-5">
            <div className="text-gray-500 text-sm">What's Next?</div>
            <ol className="mt-1 list-decimal list-inside text-gray-800 space-y-1 text-sm">
              <li>Share your referral code with friends</li>
              <li>When 3 friends book same/higher value products</li>
              <li>Your product will be delivered FREE!</li>
            </ol>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition">Go to Home</Link>
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

function SuccessBadge() {
  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
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
