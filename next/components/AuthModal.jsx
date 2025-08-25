"use client";
import { useState, useRef, useEffect } from 'react';
import { setSession } from '@/lib/clientAuth';

export default function AuthModal({ open, onClose, onLoggedIn }) {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const otpRefs = useRef([]);

  useEffect(() => {
    if (otpSent) {
      // Focus first box when OTP step starts
      otpRefs.current[0]?.focus();
    }
  }, [otpSent]);

  const requestOTP = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/request-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to send OTP');
      setOtpSent(true);
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  const verifyOTP = async () => {
    setLoading(true); setError('');
    const code = digits.join('');
    try {
      const res = await fetch('/api/auth/verify-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, code }) });
      const data = await res.json();
      if (!res.ok || !data.token) throw new Error(data.error || 'Invalid OTP');
      setSession(data.token, data.user);
      onLoggedIn?.(data.user);
      onClose?.();
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  const setDigit = (i, val) => {
    const v = val.replace(/\D/g, '').slice(-1);
    setDigits((d) => {
      const nd = [...d];
      nd[i] = v;
      return nd;
    });
    if (v && i < 5) {
      otpRefs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i]) {
      if (i > 0) {
        e.preventDefault();
        otpRefs.current[i - 1]?.focus();
        setDigits((d) => {
          const nd = [...d];
          nd[i - 1] = '';
          return nd;
        });
      }
    }
    if (e.key === 'ArrowLeft' && i > 0) otpRefs.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!text) return;
    e.preventDefault();
    const arr = Array.from({ length: 6 }, (_, idx) => text[idx] || '');
    setDigits(arr);
    const focusIndex = Math.min(text.length, 5);
    otpRefs.current[focusIndex]?.focus();
  };

  return open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Login / Signup</h3>
          <button className="text-gray-500" onClick={onClose}>✕</button>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
          </div>

          {!otpSent ? (
            <button disabled={loading || !email} onClick={requestOTP} className="w-full rounded-xl bg-blue-600 text-white py-2.5 font-medium disabled:opacity-60">
              {loading ? 'Sending…' : 'Send OTP'}
            </button>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-6 gap-2">
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => setDigit(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    autoComplete="one-time-code"
                    className="h-12 rounded-xl border border-gray-300 text-center text-lg"
                  />
                ))}
              </div>
              <button disabled={loading} onClick={verifyOTP} className="w-full rounded-xl bg-blue-600 text-white py-2.5 font-medium disabled:opacity-60">
                {loading ? 'Verifying…' : 'Verify OTP'}
              </button>
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  ) : null;
}
