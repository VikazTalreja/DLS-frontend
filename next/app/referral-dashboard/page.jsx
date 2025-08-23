// components/ReferralDashboard.js
"use client"; // Recommended for components with interactive elements like buttons

import React from 'react';

// A small, self-contained SVG for the copy icon
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);


const ReferralDashboard = () => {
  const referralCode = "DLS-QJ5MATQ";
  const messageToCopy = `🎉 Book premium electronics at DLS Electronics and get FREE delivery!
Use my referral code: ${referralCode}
📱 Visit dlsstore.com
📞 Call: 7770007110
Transform your home with smart appliances today!`;

  // Basic copy-to-clipboard function
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  };


  return (
    <section className="bg-[#f8faff] py-24 sm:py-32 lg:py-44 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute -top-1 -left-3 w-6 h-6 bg-blue-400/80 rounded-sm transform"></div>
            <h2 className="relative text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Referral Dashboard
            </h2>
          </div>
          <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
            Share with 3 friends and get your product FREE: simple, quick, and rewarding!
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Referral Code */}
          <div className="bg-[#f7f9fc] rounded-2xl p-6 text-center shadow-sm">
            <h3 className="text-sm font-semibold text-blue-600">Your Referral Code</h3>
            <div className="bg-white rounded-xl py-4 px-2 my-4 shadow-inner">
              <p className="text-2xl font-bold text-gray-800 tracking-widest">{referralCode}</p>
            </div>
            <button onClick={() => handleCopy(referralCode)} className="border border-blue-600 text-blue-600 font-semibold px-6 sm:px-8 py-2 rounded-full hover:bg-blue-50 transition-colors w-full sm:w-auto">
              Copy Code
            </button>
          </div>

          {/* Card 2: Successful Referrals */}
          <div className="bg-[#f7f9fc] rounded-2xl p-6 text-center shadow-sm">
            <h3 className="text-sm font-semibold text-blue-600">Successful Referrals</h3>
            <div className="bg-white rounded-xl py-4 px-2 my-4 shadow-inner">
              <p className="text-5xl font-bold text-gray-800">0/3</p>
            </div>
            <p className="text-sm text-gray-500">Refer 3 friends to get FREE Delivery</p>
          </div>

          {/* Card 3: Pending Referrals */}
          <div className="bg-[#f7f9fc] rounded-2xl p-6 text-center shadow-sm">
            <h3 className="text-sm font-semibold text-blue-600">Pending Referrals</h3>
            <div className="bg-white rounded-xl py-4 px-2 my-4 shadow-inner">
              <p className="text-5xl font-bold text-gray-800">0</p>
            </div>
            <p className="text-sm text-gray-500">Backlogs awaiting payment confirmation</p>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-10 border-2 border-blue-500 rounded-2xl bg-[#f7f9fc] grid grid-cols-1 md:grid-cols-3">
          {/* Left Side */}
          <div className="md:col-span-1 p-6 flex flex-col items-center justify-center space-y-4 md:border-r-2 md:border-dotted md:border-gray-300">
            <h3 className="text-sm font-semibold text-blue-600">Share Code</h3>
            <button className="bg-blue-600 text-white font-semibold px-6 sm:px-8 py-3 rounded-lg w-full max-w-xs hover:bg-blue-700 transition-colors">
              Share On Website
            </button>
            <button onClick={() => handleCopy(referralCode)} className="border border-blue-600 text-blue-600 font-semibold px-6 sm:px-8 py-2 rounded-full w-full max-w-xs hover:bg-blue-50 transition-colors">
              Copy Code
            </button>
          </div>
          {/* Right Side */}
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

        {/* Your Referrals List */}
        <div className="mt-10 bg-[#f7f9fc] rounded-2xl p-6 shadow-sm">
           <h3 className="text-sm font-semibold text-blue-600">Your Referrals</h3>
           <div className="mt-4 bg-white rounded-xl p-8 text-center">
            <p className="text-gray-500">No referrals yet. Start sharing your code!</p>
           </div>
        </div>
      </div>
    </section>

  );
};

export default ReferralDashboard;