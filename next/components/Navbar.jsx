// components/Header.js

import React from 'react';

// Inline SVGs
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const Header = () => {
  return (
    <header className="px-3 sm:px-4">
      <div className="bg-blue-100/60 backdrop-blur-md rounded-xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between max-w-7xl mx-auto shadow-sm">
        {/* Left: Brand */}
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#1e60c8] tracking-wide">
            DLS ELECTRONICS
          </h1>
          <p className="text-[12px] sm:text-sm italic text-gray-700 -mt-0.5">
            Simple Life, Smart Life
          </p>
        </div>

        {/* Right: Language + Menu */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button className="flex items-center gap-2 text-[#1e60c8] font-semibold text-sm sm:text-base">
            <span>English</span>
            <ChevronDownIcon />
          </button>
          <button aria-label="Open menu" className="text-[#1e60c8]">
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;