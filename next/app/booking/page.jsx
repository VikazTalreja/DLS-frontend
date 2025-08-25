"use client";

import { useMemo, useCallback, useState, useRef, Suspense } from "react";
import Link from "next/link";
// useSearchParams is not used directly here; it's consumed inside hooks in ./_utils/url
import { useQueryUrl, useStepFlow, normalizeQuery, mergeQuery } from "./_utils/url";
import { useI18n } from "@/i18n/I18nProvider";
import { getToken } from "@/lib/clientAuth";

export default function BookingFlowPage() {
  const { t } = useI18n();
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto pt-8 sm:pt-16 lg:pt-20 px-4 pb-16">{t('common.loading')}</div>}>
      <BookingFlowContent />
    </Suspense>
  );
}

function BookingFlowContent() {
  const { step, query, next, prev, set, pathname } = useStepFlow({ initialStep: 1 });
  const { replace, push, goto, searchParams } = useQueryUrl();
  const initial = useMemo(() => normalizeQuery(searchParams), [searchParams]);
  const { t } = useI18n();
  // Start with empty form; allow prefill from query params (e.g., when coming from Featured Products)
  const [form, setForm] = useState({ ...initial });
  const [paymentFile, setPaymentFile] = useState(null);
  const otpRefs = useRef([]);

  // Update local form state only; URL updates happen on step change
  const setField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const goSuccess = useCallback(async () => {
    // Submit booking to API
    try {
      const token = getToken();
      if (!token) {
        alert(t('booking.errors.loginRequired') || 'Please login first');
        return;
      }
      const fd = new FormData();
      fd.append('productId', form.product || '');
      fd.append('category', form.category || '');
      fd.append('mrp', String(form.mrp || 35000));
      fd.append('bookingAmount', String(form.amount || 10000));
      fd.append('balance', String(form.balance || 25000));
      fd.append('transactionId', form.txn || '');
      fd.append('referrerCode', form.referral || '');
      if (paymentFile) fd.append('paymentProof', paymentFile);

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Booking failed');
      const bookingId = data.id || `DLS-${Date.now().toString().slice(-6)}`;
      const updates = mergeQuery(searchParams, form, { keepEmpty: false });
      goto("/booking/success", { ...updates, back: pathname, bookingId });
    } catch (e) {
      const updates = mergeQuery(searchParams, { ...form, error: e.message }, { keepEmpty: false });
      goto("/booking/cancelled", { ...updates, back: pathname, retry: pathname });
    }
  }, [goto, searchParams, pathname, form, paymentFile, t]);

  const goCancelled = useCallback(() => {
    const updates = mergeQuery(searchParams, form, { keepEmpty: false });
    goto("/booking/cancelled", { ...updates, back: pathname, retry: pathname, error: form.error || t('booking.errors.generic') });
  }, [goto, searchParams, pathname, form, t]);

  return (
    <div className="max-w-5xl mx-auto pt-8 sm:pt-16 lg:pt-20 px-4 pb-16">
      <div className="mb-6 mt-3 inline-flex items-center gap-2 text-sm text-gray-600">
        <ArrowLeftIcon className="w-5 h-5" />
        <Link href="/" className="underline hover:text-gray-900">{t('common.goBack')}</Link>
      </div>

      <h1 className="text-3xl sm:text-4xl font-semibold text-center">{t('booking.title')}</h1>
      <p className="text-center text-gray-500 mt-1">{t('booking.subtitle')}</p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {/* Left: Step card */}
        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
          {step === 1 && (
            <StepTitle>{t('booking.steps.1')}</StepTitle>
          )}
          {step === 2 && (
            <StepTitle>{t('booking.steps.2')}</StepTitle>
          )}
          {step === 3 && (
            <StepTitle>{t('booking.steps.3')}</StepTitle>
          )}
          {step === 4 && (
            <StepTitle>{t('booking.steps.4')}</StepTitle>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <Field label={t('booking.fields.category')}>
                <Select value={form.category || ""} onChange={(v) => setField("category", v)} options={["AC", "TV", "Fridge", "Washing Machine"]} placeholder={t('booking.placeholders.category')} />
              </Field>
              <Field label={t('booking.fields.product')}>
                <Select value={form.product || ""} onChange={(v) => setField("product", v)} options={["LG 1.5 Ton 5 Star Split AC", "Samsung 55\" 4K TV", "Whirlpool 300L Fridge"]} placeholder={t('booking.placeholders.product')} />
              </Field>
              <div className="pt-2 flex justify-end">
                <Primary onClick={() => next(form)}>{t('booking.actions.nextEnterDetails')}</Primary>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <Field label={t('booking.fields.name')}>
                <Input value={form.name || ""} onChange={(v) => setField("name", v)} placeholder={t('booking.placeholders.name')} />
              </Field>
              <Field label={t('booking.fields.mobile')}>
                <Input value={form.mobile || ""} onChange={(v) => setField("mobile", v)} placeholder={t('booking.placeholders.mobile')} inputMode="numeric" />
              </Field>
              <Field label={t('booking.fields.state')}>
                <Input value={form.state || ""} onChange={(v) => setField("state", v)} placeholder={t('booking.placeholders.state')} />
              </Field>
              <Field label={t('booking.fields.address')}>
                <Textarea value={form.address || ""} onChange={(v) => setField("address", v)} placeholder={t('booking.placeholders.address')} />
              </Field>
              <Field label={t('booking.fields.referral')}>
                <Input value={form.referral || ""} onChange={(v) => setField("referral", v)} placeholder={t('booking.placeholders.referral')} />
              </Field>
              <div className="pt-2 flex justify-between">
                <Secondary onClick={() => prev(form)}>{t('common.previous')}</Secondary>
                <Primary onClick={() => next(form)}>{t('booking.actions.nextReview')}</Primary>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <Field label={t('booking.terms.title')}>
                <div className="bg-white rounded-xl p-4 text-sm text-gray-700 space-y-1">
                  <p>• {t('booking.terms.l1')}</p>
                  <p>• {t('booking.terms.l2')}</p>
                  <p>• {t('booking.terms.l3')}</p>
                  <p>• {t('booking.terms.l4')}</p>
                  <p>• {t('booking.terms.l5')}</p>
                  <p>• {t('booking.terms.l6')}</p>
                </div>
              </Field>

              <label className="flex items-center gap-2 text-sm text-gray-800">
                <input type="checkbox" className="size-4" checked={form.terms === "1"} onChange={(e) => setField("terms", e.target.checked ? "1" : "0")} />
                <span className="font-medium">{t('booking.terms.accept')}</span>
              </label>

              <div>
                <div className="text-sm font-medium text-gray-800">{t('booking.otp.title')}</div>
                <p className="text-sm text-gray-500">{t('booking.otp.info')}</p>
                <div className="mt-3 flex gap-3">
                  <Secondary onClick={() => alert(t('booking.otp.sentDemo'))}>{t('booking.otp.send')}</Secondary>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-3 max-w-xs">
                  {[0,1,2,3].map((i) => (
                    <input
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el)}
                      value={(form.otp || "")[i] || ""}
                      onChange={(e) => {
                        const input = e.target.value.replace(/\D/g, "").slice(-1);
                        const val = (form.otp || "").split("");
                        val[i] = input || "";
                        const nextOtp = val.join("");
                        setField("otp", nextOtp);
                        if (input && i < 3) {
                          otpRefs.current[i + 1]?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !(((form.otp || "")[i]) || "")) {
                          if (i > 0) {
                            e.preventDefault();
                            otpRefs.current[i - 1]?.focus();
                            const val = (form.otp || "").split("");
                            val[i - 1] = "";
                            setField("otp", val.join(""));
                          }
                        }
                        if (e.key === "ArrowLeft" && i > 0) otpRefs.current[i - 1]?.focus();
                        if (e.key === "ArrowRight" && i < 3) otpRefs.current[i + 1]?.focus();
                      }}
                      onPaste={(e) => {
                        const text = e.clipboardData.getData("text").replace(/\D/g, "");
                        if (!text) return;
                        e.preventDefault();
                        const digits = text.slice(0, 4).split("");
                        const val = ["", "", "", ""];
                        for (let j = 0; j < digits.length; j++) val[j] = digits[j];
                        const nextOtp = val.join("");
                        setField("otp", nextOtp);
                        const focusIndex = Math.min(digits.length, 3);
                        otpRefs.current[focusIndex]?.focus();
                      }}
                      className="h-12 rounded-xl border border-gray-300 text-center text-lg"
                      maxLength={1}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                    />
                  ))}
                </div>
                <div className="mt-3">
                  <Primary onClick={() => alert(t('booking.otp.verifiedDemo'))}>{t('booking.otp.verify')}</Primary>
                </div>
              </div>

              <div className="pt-2 flex justify-between">
                <Secondary onClick={() => prev(form)}>{t('common.previous')}</Secondary>
                <Primary onClick={() => next(form)}>{t('booking.actions.nextPayment')}</Primary>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <Field label={t('booking.payment.amountToPay')}>
                <div className="bg-white rounded-xl p-4 font-semibold">₹{Number(form.amount || 10000).toLocaleString("en-IN")}</div>
              </Field>

              <Field label={t('booking.payment.options')}>
                <div className="bg-white rounded-xl p-4 space-y-4 text-sm text-gray-700">
                  <div>
                    <div className="font-semibold">{t('booking.payment.upi')}</div>
                    <div className="text-gray-600">{t('booking.payment.payToLabel')} dlselectronics@paytm</div>
                    <div className="mt-2 w-32 h-32 bg-gray-200 rounded" />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="font-semibold">{t('booking.payment.bank')}</div>
                    <p>{t('booking.payment.account')} DLS Agro Infraventure Pvt Ltd</p>
                    <p>{t('booking.payment.accountNo')} XXXX-XXXX-XXXX</p>
                    <p>{t('booking.payment.ifsc')} XXXXXXXX</p>
                  </div>
                </div>
              </Field>

              <Field label={t('booking.payment.upload')}>
                <input type="file" className="w-full rounded-xl border border-gray-300 bg-white p-2.5" onChange={(e)=>setPaymentFile(e.target.files?.[0] || null)} />
              </Field>

              <Field label={t('booking.payment.txn')}>
                <Input value={form.txn || ""} onChange={(v) => setField("txn", v)} placeholder={t('booking.placeholders.enterHere')} />
              </Field>

              <div className="pt-2 flex justify-between">
                <Secondary onClick={() => prev()}>{t('common.previous')}</Secondary>
                <Primary onClick={goSuccess}>{t('booking.actions.complete')}</Primary>
              </div>

              <div className="flex justify-center">
                <button className="text-xs text-gray-500 underline" onClick={goCancelled}>{t('booking.actions.simulateFailure')}</button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Price breakdown */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-6 sm:p-8 h-fit">
          <h3 className="text-center font-semibold text-blue-700">{t('booking.price.title')}</h3>
          <div className="mt-4 space-y-3 text-sm">
            <Row label={`${t('booking.price.mrp')}`} value={`₹${Number(form.mrp || 35000).toLocaleString("en-IN")}`} />
            <Row label={`${t('booking.price.bookingAmount')}`} value={`₹${Number(form.amount || 10000).toLocaleString("en-IN")}`} />
            <div className="h-px bg-gray-200 my-3" />
            <Row label={`${t('booking.price.balance')}`} value={`₹${Number(form.balance || 25000).toLocaleString("en-IN")}`} highlight />
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
