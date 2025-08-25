"use client";
// components/ContactSection.js

import React from 'react';
import { useI18n } from "@/i18n/I18nProvider";

// --- Icon Components ---
// Self-contained SVG icons for easy use and styling.

const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>;

// --- Data for contact details ---
const contactDetails = (t) => [
  { icon: <PhoneIcon />, mainText: '+91 770007110', subText: t('contact.items.phoneSub') },
  { icon: <MailIcon />, mainText: 'waffco4@gmail.com', subText: t('contact.items.emailSub') },
  { icon: <ChatIcon />, mainText: t('contact.items.chat'), subText: t('contact.items.chatSub'), isLink: true },
  { icon: <DocumentIcon />, mainText: '27AAGCD7282A2ZQ', subText: t('contact.items.gst') },
];

const ContactSection = () => {
  const { t } = useI18n();
  return (
    <section className="bg-[#f8faff] py-16 sm:py-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          
          {/* Left Column: Contact Info */}
          <div>
            <div className="relative inline-block">
              <div className="hidden md:block absolute -top-1 -left-3 w-6 h-6 bg-blue-400/80 rounded-sm transform"></div>
              <h2 className="relative text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
                {t('contact.title')}
              </h2>
            </div>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">
              {t('contact.subtitle')}
            </p>
            
            <ul className="mt-10 sm:mt-12 space-y-6 sm:space-y-8">
              {contactDetails(t).map((item, index) => (
                <li key={index} className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 pt-0.5 sm:pt-1">{item.icon}</div>
                  <div>
                    {item.isLink ? (
                      <a href="#" className="text-lg sm:text-xl font-semibold text-blue-600 hover:underline flex items-center">
                        {item.mainText} <ArrowRightIcon />
                      </a>
                    ) : (
                      <p className="text-lg sm:text-xl font-semibold text-gray-900">{item.mainText}</p>
                    )}
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{item.subText}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right Column: Contact Form */}
          <div className="pt-2">
            <form action="#" method="POST">
              <div className="space-y-8 sm:space-y-12">
                {/* Your Name Field */}
                <div>
                  <label htmlFor="name" className="block text-base sm:text-lg font-semibold text-gray-700">{t('contact.form.name')}</label>
                  <input type="text" id="name" className="mt-2 block w-full bg-transparent border-0 border-b border-gray-300 pb-2 pt-1 sm:pt-2 focus:outline-none focus:ring-0 focus:border-blue-500" />
                </div>
                
                {/* Phone Number Field */}
                <div>
                  <label htmlFor="phone" className="block text-base sm:text-lg font-semibold text-gray-700">{t('contact.form.phone')}</label>
                  <input type="tel" id="phone" className="mt-2 block w-full bg-transparent border-0 border-b border-gray-300 pb-2 pt-1 sm:pt-2 focus:outline-none focus:ring-0 focus:border-blue-500" />
                </div>
                
                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-base sm:text-lg font-semibold text-gray-700">{t('contact.form.message')}</label>
                  <textarea id="message" rows="4" className="mt-2 block w-full bg-transparent border-0 border-b border-gray-300 pb-2 pt-1 sm:pt-2 focus:outline-none focus:ring-0 focus:border-blue-500"></textarea>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="mt-10 sm:mt-12 flex justify-center sm:justify-end">
                <button type="submit" className="w-full sm:w-auto inline-flex items-center px-6 sm:px-8 py-3 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                  {t('contact.form.submit')}
                  <ArrowRightIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;