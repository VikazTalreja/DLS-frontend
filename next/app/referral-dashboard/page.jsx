"use client";
import React, { useEffect, useState } from 'react';
import AuthModal from '@/components/AuthModal';
import { getUser, getToken } from '@/lib/clientAuth';

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

export default function ReferralDashboard() {
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({ successful: 0, goal: 3, minBooking: 10000 });
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState(true);

  const referralCode = user?.referralCode || '—';
  const messageToCopy = `🎉 Book premium electronics at DLS Electronics and get FREE delivery!\nUse my referral code: ${referralCode}\n📱 Visit dlsstore.com\n📞 Call: 7770007110\nTransform your home with smart appliances today!`;

  const handleCopy = async (text) => {
    try { await navigator.clipboard.writeText(text); alert('Copied to clipboard!'); } catch {}
  };

  useEffect(() => {
    const u = getUser();
    if (!u) { setLoading(false); setAuthOpen(true); return; }
    setUser(u);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    (async () => {
      try {
        const r1 = await fetch('/api/me/referrals/progress', { headers: { Authorization: `Bearer ${token}` } });
        const p = await r1.json();
        if (r1.ok) setProgress(p);
        const r2 = await fetch('/api/me/eligibility', { headers: { Authorization: `Bearer ${token}` } });
        const e = await r2.json();
        if (r2.ok) setEligible(!!e.eligible);
      } catch {}
      setLoading(false);
    })();
  }, [user]);

  if (loading) {
    return <section className="py-24"><div className="max-w-5xl mx-auto px-4">Loading…</div></section>;
  }

  if (!user) {
    return (
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold">Login to view your referral dashboard</h2>
          <p className="text-gray-600 mt-2">Track your code, referrals, and free delivery eligibility.</p>
          <button className="mt-6 px-5 py-2.5 rounded-xl bg-blue-600 text-white" onClick={()=>setAuthOpen(true)}>Login</button>
        </div>
        <AuthModal open={authOpen} onClose={()=>setAuthOpen(false)} onLoggedIn={(u)=>{ setUser(u); setAuthOpen(false); }} />
      </section>
    );
  }

  return (
    <section className="bg-[#f8faff] py-24 sm:py-32 lg:py-44 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute -top-1 -left-3 w-6 h-6 bg-blue-400/80 rounded-sm transform"></div>
            <h2 className="relative text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Referral Dashboard
            </h2>
          </div>
          <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
            Share with {progress.goal} friends and get your product FREE: simple, quick, and rewarding!
          </p>
          {eligible && <p className="mt-2 text-green-700 font-semibold">Congratulations! You are eligible for FREE delivery.</p>}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#f7f9fc] rounded-2xl p-6 text-center shadow-sm">
            <h3 className="text-sm font-semibold text-blue-600">Your Referral Code</h3>
            <div className="bg-white rounded-xl py-4 px-2 my-4 shadow-inner">
              <p className="text-2xl font-bold text-gray-800 tracking-widest">{referralCode}</p>
            </div>
            <button onClick={() => handleCopy(referralCode)} className="border border-blue-600 text-blue-600 font-semibold px-6 sm:px-8 py-2 rounded-full hover:bg-blue-50 transition-colors w-full sm:w-auto">
              Copy Code
            </button>
          </div>

          <div className="bg-[#f7f9fc] rounded-2xl p-6 text-center shadow-sm">
            <h3 className="text-sm font-semibold text-blue-600">Successful Referrals</h3>
            <div className="bg-white rounded-xl py-4 px-2 my-4 shadow-inner">
              <p className="text-5xl font-bold text-gray-800">{progress.successful}/{progress.goal}</p>
            </div>
            <p className="text-sm text-gray-500">Refer {progress.goal} friends to get FREE Delivery</p>
          </div>

          <div className="bg-[#f7f9fc] rounded-2xl p-6 text-center shadow-sm">
            <h3 className="text-sm font-semibold text-blue-600">Pending Referrals</h3>
            <div className="bg-white rounded-xl py-4 px-2 my-4 shadow-inner">
              <p className="text-5xl font-bold text-gray-800">—</p>
            </div>
            <p className="text-sm text-gray-500">Backlogs awaiting payment confirmation</p>
          </div>
        </div>

        <div className="mt-10 border-2 border-blue-500 rounded-2xl bg-[#f7f9fc] grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-1 p-6 flex flex-col items-center justify-center space-y-4 md:border-r-2 md:border-dotted md:border-gray-300">
            <h3 className="text-sm font-semibold text-blue-600">Share Code</h3>
            <button className="bg-blue-600 text-white font-semibold px-6 sm:px-8 py-3 rounded-lg w-full max-w-xs hover:bg-blue-700 transition-colors">
              Share On Website
            </button>
            <button onClick={() => handleCopy(referralCode)} className="border border-blue-600 text-blue-600 font-semibold px-6 sm:px-8 py-2 rounded-full w-full max-w-xs hover:bg-blue-50 transition-colors">
              Copy Code
            </button>
          </div>
          <div className="md:col-span-2 p-6 relative">
            <h3 className="text-sm font-semibold text-blue-600 mb-4">Share A Message</h3>
            <div className="text-gray-700 space-y-2 whitespace-pre-line">
                <p>🎉 Book premium electronics at DLS Electronics and get FREE delivery!</p>
                <p>Use my referral code: <strong className="text-gray-800">{referralCode}</strong></p>
                <p>📱 Visit <strong className="text-gray-800">dlsstore.com</strong></p>
                <p>📞 Call: <strong className="text-gray-800">7770007110</strong></p>
                <p>Transform your home with smart appliances today!</p>
            </div>
            <button onClick={() => handleCopy(messageToCopy)} className="sm:absolute sm:bottom-4 sm:right-4 mt-4 sm:mt-0 p-2 rounded-full hover:bg-gray-200 transition-colors w-full sm:w-10 flex items-center justify-center">
              <CopyIcon />
            </button>
          </div>
        </div>

        <div className="mt-10 bg-[#f7f9fc] rounded-2xl p-6 shadow-sm">
           <h3 className="text-sm font-semibold text-blue-600">Your Referrals</h3>
           <div className="mt-4 bg-white rounded-xl p-8 text-center">
            <p className="text-gray-500">No referrals yet. Start sharing your code!</p>
           </div>
        </div>
      </div>
      <AuthModal open={authOpen} onClose={()=>setAuthOpen(false)} onLoggedIn={(u)=>{ setUser(u); setAuthOpen(false); }} />
    </section>
  );
}