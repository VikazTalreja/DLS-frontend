"use client";

import { useMemo, useCallback, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQueryUrl, useStepFlow, buildHref, normalizeQuery, mergeQuery } from "./_utils/url";

export default function BookingFlowPage() {
  const { step, query, next, prev, set, pathname } = useStepFlow({ initialStep: 1 });
  const { replace, push, goto, searchParams } = useQueryUrl();
  const initial = useMemo(() => normalizeQuery(searchParams), [searchParams]);
  const demoDefaults = {
    category: "AC",
    product: "LG 1.5 Ton 5 Star Split AC",
    name: "Demo User",
    mobile: "9999999999",
    state: "Maharashtra",
    address: "123 Demo Street, Pune",
    referral: "DLS-DEMO",
    amount: "10000",
    mrp: "35000",
    balance: "25000",
    terms: "1",
    otp: "1234",
  };
  const [form, setForm] = useState({ ...demoDefaults, ...initial });

  // Update local form state only; URL updates happen on step change
  const setField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const goSuccess = useCallback(() => {
    const bookingId = `DLS-${Date.now().toString().slice(-6)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const updates = mergeQuery(searchParams, form, { keepEmpty: false });
    goto("/booking/success", { ...updates, back: pathname, bookingId });
  }, [goto, searchParams, pathname, form]);

  const goCancelled = useCallback(() => {
    const updates = mergeQuery(searchParams, form, { keepEmpty: false });
    goto("/booking/cancelled", { ...updates, back: pathname, retry: pathname, error: form.error || "Something went wrong" });
  }, [goto, searchParams, pathname, form]);

  return (
    <div className="max-w-5xl mx-auto pt-8 sm:pt-16 lg:pt-20 px-4 pb-16">
      <div className="mb-6 mt-3 inline-flex items-center gap-2 text-sm text-gray-600">
        <ArrowLeftIcon className="w-5 h-5" />
        <Link href="/" className="underline hover:text-gray-900">Go back</Link>
      </div>

      <h1 className="text-3xl sm:text-4xl font-semibold text-center">Book Your Product</h1>
      <p className="text-center text-gray-500 mt-1">Book with minimum amount and get free delivery through referrals</p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {/* Left: Step card */}
        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
          {step === 1 && (
            <StepTitle>Step 1: Product Selection</StepTitle>
          )}
          {step === 2 && (
            <StepTitle>Step 2: Personal Details</StepTitle>
          )}
          {step === 3 && (
            <StepTitle>Step 3: Terms & OTP Verification</StepTitle>
          )}
          {step === 4 && (
            <StepTitle>Step 4: Payment Instructions</StepTitle>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <Field label="Choose Product Category">
                <Select value={form.category || ""} onChange={(v) => setField("category", v)} options={["AC", "TV", "Fridge", "Washing Machine"]} placeholder="Select Category" />
              </Field>
              <Field label="Select Product">
                <Select value={form.product || ""} onChange={(v) => setField("product", v)} options={["LG 1.5 Ton 5 Star Split AC", "Samsung 55\" 4K TV", "Whirlpool 300L Fridge"]} placeholder="Select A Product" />
              </Field>
              <div className="pt-2 flex justify-end">
                <Primary onClick={() => next(form)}>Next: Enter Details</Primary>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <Field label="Full Name">
                <Input value={form.name || ""} onChange={(v) => setField("name", v)} placeholder="Full Name" />
              </Field>
              <Field label="Mobile Number">
                <Input value={form.mobile || ""} onChange={(v) => setField("mobile", v)} placeholder="Mobile Number" inputMode="numeric" />
              </Field>
              <Field label="State">
                <Input value={form.state || ""} onChange={(v) => setField("state", v)} placeholder="State" />
              </Field>
              <Field label="Complete Address">
                <Textarea value={form.address || ""} onChange={(v) => setField("address", v)} placeholder="Complete Address" />
              </Field>
              <Field label="Referral Code (Optional)">
                <Input value={form.referral || ""} onChange={(v) => setField("referral", v)} placeholder="Referral Code (Optional)" />
              </Field>
              <div className="pt-2 flex justify-between">
                <Secondary onClick={() => prev(form)}>Previous</Secondary>
                <Primary onClick={() => next(form)}>Next: Review & Confirm</Primary>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <Field label="Terms & Conditions">
                <div className="bg-white rounded-xl p-4 text-sm text-gray-700 space-y-1">
                  <p>• Booking amount is non-refundable after confirmation</p>
                  <p>• Balance payment due within 45 days of booking</p>
                  <p>• Free delivery applicable only through referral program completion</p>
                  <p>• Products subject to availability</p>
                  <p>• EMI options available on balance amount</p>
                  <p>• Customer must accept terms via OTP for legal validity</p>
                </div>
              </Field>

              <label className="flex items-center gap-2 text-sm text-gray-800">
                <input type="checkbox" className="size-4" checked={form.terms === "1"} onChange={(e) => setField("terms", e.target.checked ? "1" : "0")} />
                <span className="font-medium">I accept the terms and conditions</span>
              </label>

              <div>
                <div className="text-sm font-medium text-gray-800">OTP Verification</div>
                <p className="text-sm text-gray-500">We'll send an OTP to your mobile number for verification</p>
                <div className="mt-3 flex gap-3">
                  <Secondary onClick={() => alert("OTP sent (demo)")}>Send OTP</Secondary>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-3 max-w-xs">
                  {[0,1,2,3].map((i) => (
                    <input key={i} value={(form.otp || "")[i] || ""} onChange={(e)=>{
                      const val = (form.otp || "").split("");
                      val[i] = e.target.value.slice(-1);
                      setField("otp", val.join(""));
                    }}
                    className="h-12 rounded-xl border border-gray-300 text-center text-lg" maxLength={1} inputMode="numeric" />
                  ))}
                </div>
                <div className="mt-3">
                  <Primary onClick={() => alert("OTP verified (demo)")}>Verify OTP</Primary>
                </div>
              </div>

              <div className="pt-2 flex justify-between">
                <Secondary onClick={() => prev(form)}>Previous</Secondary>
                <Primary onClick={() => next(form)}>Next: Payment</Primary>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <Field label="Amount to Pay:">
                <div className="bg-white rounded-xl p-4 font-semibold">₹{Number(form.amount || 10000).toLocaleString("en-IN")}</div>
              </Field>

              <Field label="Payment Options">
                <div className="bg-white rounded-xl p-4 space-y-4 text-sm text-gray-700">
                  <div>
                    <div className="font-semibold">UPI Payment:</div>
                    <div className="text-gray-600">Pay to: dlselectronics@paytm</div>
                    <div className="mt-2 w-32 h-32 bg-gray-200 rounded" />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="font-semibold">Bank Transfer:</div>
                    <p>Account: DLS Agro Infraventure Pvt Ltd</p>
                    <p>Account No: XXXX-XXXX-XXXX</p>
                    <p>IFSC: XXXXXXXX</p>
                  </div>
                </div>
              </Field>

              <Field label="Upload Payment Screenshot">
                <input type="file" className="w-full rounded-xl border border-gray-300 bg-white p-2.5" />
              </Field>

              <Field label="Transaction ID (optional)">
                <Input value={form.txn || ""} onChange={(v) => setField("txn", v)} placeholder="Enter Here" />
              </Field>

              <div className="pt-2 flex justify-between">
                <Secondary onClick={() => prev()}>Previous</Secondary>
                <Primary onClick={goSuccess}>Complete Booking</Primary>
              </div>

              <div className="flex justify-center">
                <button className="text-xs text-gray-500 underline" onClick={goCancelled}>Simulate failure</button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Price breakdown */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 sm:p-8 h-fit">
          <h3 className="text-center font-semibold text-blue-700">Price Breakdown</h3>
          <div className="mt-4 space-y-3 text-sm">
            <Row label="MRP (मूल्य किंमत):" value={`₹${Number(form.mrp || 35000).toLocaleString("en-IN")}`} />
            <Row label="Booking Amount:" value={`₹${Number(form.amount || 10000).toLocaleString("en-IN")}`} />
            <div className="h-px bg-gray-200 my-3" />
            <Row label="Balance Payable:" value={`₹${Number(form.balance || 25000).toLocaleString("en-IN")}`} highlight />
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div className={`flex items-center justify-between ${highlight ? "text-blue-700 font-semibold" : "text-gray-700"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function StepTitle({ children }) {
  return (
    <div className="text-center text-blue-700 font-semibold mb-5">{children}</div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div className="mb-1 text-sm text-gray-800 font-medium">{label}</div>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, inputMode }) {
  return (
    <input value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} inputMode={inputMode}
      className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 placeholder:text-gray-400" />
  );
}

function Textarea({ value, onChange, placeholder }) {
  return (
    <textarea value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} rows={4}
      className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 placeholder:text-gray-400" />
  );
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <select value={value} onChange={(e)=>onChange(e.target.value)}
      className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-gray-800">
      <option value="">{placeholder}</option>
      {options.map((o)=> (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

function Primary({ children, onClick }) {
  return (
    <button onClick={onClick} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition">{children}</button>
  );
}
function Secondary({ children, onClick }) {
  return (
    <button onClick={onClick} className="px-5 py-2.5 rounded-xl border border-blue-600 text-blue-700 font-medium hover:bg-blue-50 transition">{children}</button>
  );
}

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
