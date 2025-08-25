"use client";
// components/Header.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/i18n/I18nProvider';
import AuthModal from '@/components/AuthModal';
import { getUser, clearSession } from '@/lib/clientAuth';

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

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const InPageLink = ({ href, children, className, onNavigate }) => {
  // href is expected like '#contact' or '#about'
  const handleClick = (e) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // update hash without reloading
      history.replaceState(null, '', href);
      if (onNavigate) onNavigate();
    }
  };
  return (
    <a href={href} onClick={handleClick} className={className}>{children}</a>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    setUser(getUser());
  }, []);

  const onLangChange = (e) => {
    setLang(e.target.value);
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  const isAdminEmail = !!(user?.email && process.env.NEXT_PUBLIC_ADMIN_EMAIL && user.email.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN_EMAIL.toLowerCase());

  return (
    <>
      <header className="px-3 sm:px-4">
        <div className="bg-blue-100/60 backdrop-blur-md rounded-xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between max-w-7xl mx-auto shadow-sm">
          {/* Left: Brand */}
          <div>
            <Link href="/" className="block">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#1e60c8] tracking-wide">
                {t('brand.title')}
              </h1>
              <p className="text-[12px] sm:text-sm italic text-gray-700 -mt-0.5">
                {t('brand.tagline')}
              </p>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1e60c8]">
            {pathname === '/' ? (
              <>
                <InPageLink href="#home" className="hover:underline">{t('nav.home') || 'Home'}</InPageLink>
                <InPageLink href="#products" className="hover:underline">{t('nav.products') || 'Products'}</InPageLink>
                <InPageLink href="#about" className="hover:underline">{t('nav.about') || 'About'}</InPageLink>
                <InPageLink href="#contact" className="hover:underline">{t('nav.contact')}</InPageLink>
              </>
            ) : (
              <>
                <Link href="/#home" className="hover:underline">{t('nav.home') || 'Home'}</Link>
                <Link href="/#products" className="hover:underline">{t('nav.products') || 'Products'}</Link>
                <Link href="/#about" className="hover:underline">{t('nav.about') || 'About'}</Link>
                <Link href="/#contact" className="hover:underline">{t('nav.contact')}</Link>
              </>
            )}
            <Link href="/booking" className="hover:underline">{t('nav.booking')}</Link>
            <Link href="/referral-dashboard" className="hover:underline">{t('nav.referral')}</Link>
            {isAdminEmail && (
              <Link href="/admin/bookings" className="hover:underline">Admin</Link>
            )}
          </nav>

          {/* Right: Language + Auth + Menu */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-[#1e60c8] font-semibold text-sm sm:text-base">
              <select
                aria-label="Language"
                value={lang}
                onChange={onLangChange}
                className="bg-transparent outline-none cursor-pointer"
              >
                <option value="en">{t('lang.en')}</option>
                <option value="mr">{t('lang.mr')}</option>
              </select>
              {/* <ChevronDownIcon /> */}
            </div>

            {user ? (
              <div className="hidden md:flex items-center gap-2 text-sm">
                <button onClick={logout} className="px-3 py-1.5 rounded-lg border border-blue-600 text-blue-700 hover:bg-blue-50">{t('common.logout') || 'Logout'}</button>
              </div>
            ) : (
              <button onClick={()=>setAuthOpen(true)} className="hidden md:inline-flex px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700">{t('common.login') || 'Login'}</button>
            )}

            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
              className="text-[#1e60c8] md:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        <div
          className={`md:hidden transition-all duration-200 ease-out overflow-hidden max-w-7xl mx-auto ${open ? 'mt-2 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="bg-white rounded-xl shadow p-4 border border-blue-100">
            <nav className="flex flex-col gap-3 text-[#1e60c8] font-medium">
              {pathname === '/' ? (
                <>
                  <InPageLink href="#home" onNavigate={() => setOpen(false)} className="py-2">{t('nav.home') || 'Home'}</InPageLink>
                  <InPageLink href="#products" onNavigate={() => setOpen(false)} className="py-2">{t('nav.products') || 'Products'}</InPageLink>
                  <InPageLink href="#about" onNavigate={() => setOpen(false)} className="py-2">{t('nav.about') || 'About'}</InPageLink>
                  <InPageLink href="#contact" onNavigate={() => setOpen(false)} className="py-2">{t('nav.contact')}</InPageLink>
                </>
              ) : (
                <>
                  <Link href="/#home" onClick={() => setOpen(false)} className="py-2">{t('nav.home') || 'Home'}</Link>
                  <Link href="/#products" onClick={() => setOpen(false)} className="py-2">{t('nav.products') || 'Products'}</Link>
                  <Link href="/#about" onClick={() => setOpen(false)} className="py-2">{t('nav.about') || 'About'}</Link>
                  <Link href="/#contact" onClick={() => setOpen(false)} className="py-2">{t('nav.contact')}</Link>
                </>
              )}
              <Link href="/booking" onClick={() => setOpen(false)} className="py-2">{t('nav.booking')}</Link>
              <Link href="/referral-dashboard" onClick={() => setOpen(false)} className="py-2">{t('nav.referral')}</Link>
              {!user ? (
                <button onClick={()=>{ setAuthOpen(true); setOpen(false); }} className="mt-2 px-3 py-2 rounded-lg bg-blue-600 text-white">{t('common.login') || 'Login'}</button>
              ) : (
                <button onClick={()=>{ logout(); setOpen(false); }} className="mt-2 px-3 py-2 rounded-lg border border-blue-600 text-blue-700">{t('common.logout') || 'Logout'}</button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <AuthModal open={authOpen} onClose={()=>setAuthOpen(false)} onLoggedIn={()=>setUser(getUser())} />
    </>
  );
};

export default Header;