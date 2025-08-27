"use client";
import { useState, useRef, useEffect } from 'react';
import { setSession } from '@/lib/clientAuth';
import { useI18n } from '@/i18n/I18nProvider';

export default function AuthModal({ open, onClose, onLoggedIn }) {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const otpRefs = useRef([]);
  const { t } = useI18n();

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
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 p-6 lg:grid-cols-2">
          {/* Left: Hero Image with headline */}
          <div className="relative min-h-[300px] lg:min-h-[560px] bg-[#eef5ff]">
            <div className="absolute rounded-2xl inset-0 bg-cover bg-right" style={{ backgroundImage: "url('/HeroBg.png')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-white/10 to-transparent" />
            <div className="relative h-full w-full p-6 sm:p-8 flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 max-w-xs">
                Everyday basics,
                <br />
                made better
              </h2>
            </div>
            {/* <button onClick={onClose} className="absolute top-3 right-3 rounded-full bg-white/80 hover:bg-white text-gray-700 w-9 h-9 flex items-center justify-center shadow">✕</button> */}
          </div>

          {/* Right: Brand + Form */}
          <div className="flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              <div className="text-center mb-6">
                <div className="text-[#1e60c8] font-extrabold tracking-wide text-lg">{t('brand.title')}</div>
                <div className="text-[#1e60c8] text-xs opacity-80">{t('brand.tagline')}</div>
              </div>

              <h3 className="text-xl font-semibold text-center text-gray-800">Sign In To Your Account</h3>
              <p className="text-sm text-center text-gray-500 mb-6">Welcome to {t('brand.title')}</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-xl text-black border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#1e60c8] focus:ring-2 focus:ring-[#1e60c8]/20"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>

                {!otpSent ? (
                  <button
                    disabled={loading || !email}
                    onClick={requestOTP}
                    className="w-full rounded-xl bg-blue-600 cursor-pointer hover:bg-[#1e60c8] text-white py-3 font-semibold disabled:opacity-60 disabled:cursor-not-allowed shadow"
                  >
                    {loading ? 'Sending…' : 'Send OTP'}
                  </button>
                ) : (
                  <div className="space-y-4">
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
                          className="h-12 text-black rounded-xl border border-gray-300 text-center text-lg focus:outline-none focus:border-[#1e60c8]"
                        />
                      ))}
                    </div>
                    <button
                      disabled={loading}
                      onClick={verifyOTP}
                      className="w-full rounded-xl bg-blue-600 cursor-pointer hover:bg-[#1e60c8] text-white py-3 font-semibold disabled:opacity-60 disabled:cursor-not-allowed shadow"
                    >
                      {loading ? 'Verifying…' : 'Verify OTP'}
                    </button>
                  </div>
                )}

                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
