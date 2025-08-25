// components/HeroSection.js
"use client"; // This is a client component because it uses state and effects

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/i18n/I18nProvider';

// slide data will read from i18n messages
const buildSlides = (t) => ([
  {
    id: 1,
    headline: [t('hero.slides.1.h0'), t('hero.slides.1.h1'), t('hero.slides.1.h2')],
    thumbnailPlaceholder: "bg-gray-600",
  },
  {
    id: 2,
    headline: [t('hero.slides.2.h0'), t('hero.slides.2.h1'), t('hero.slides.2.h2')],
    thumbnailPlaceholder: "bg-sky-600",
  },
  {
    id: 3,
    headline: [t('hero.slides.3.h0'), t('hero.slides.3.h1'), t('hero.slides.3.h2')],
    thumbnailPlaceholder: "bg-slate-600",
  },
  {
    id: 4,
    headline: [t('hero.slides.4.h0'), t('hero.slides.4.h1'), t('hero.slides.4.h2')],
    thumbnailPlaceholder: "bg-indigo-600",
  },
]);

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef(null);
  const router = useRouter();
  const { t } = useI18n();

  const slideData = buildSlides(t);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setActiveIndex((prevIndex) =>
          prevIndex === slideData.length - 1 ? 0 : prevIndex + 1
        ),
      5000 // Change slide every 5 seconds
    );

    return () => {
      resetTimeout();
    };
  }, [activeIndex, slideData.length]);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const currentSlide = slideData[activeIndex];

  return (
    <section 
      id="home"
      className="scroll-mt-28 font-sans w-full min-h-[560px] sm:min-h-[600px] lg:h-screen bg-[url('/HeroBg.png')] bg-cover bg-center flex items-center pt-6 sm:pt-10"
    >
      <div className="max-w-7xl mx-auto  w-full flex items-center justify-start h-full relative">
        <div className="max-w-2xl text-left">
          
          {/* Left Side: Text Content - this will change */}
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 leading-tight">
            {currentSlide.headline[0]}
            <span className="text-blue-600 w-full">{currentSlide.headline[1]}</span>
            <br />
            {currentSlide.headline[2]}
          </h1>
          <div className="mt-6 sm:mt-10 flex items-center space-x-3 sm:space-x-4">
            <button onClick={() => router.push("/booking")} className="bg-[#1e60c8] cursor-pointer text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-700 transition-colors shadow-md">
              {t('cta.bookNow')}
            </button>
            <button onClick={() => router.push("/referral-dashboard")} className="border-2 border-[#1e60c8] cursor-pointer text-[#1e60c8] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-50 transition-colors">
              {t('cta.referEarn')}
            </button>
          </div>

          {/* Bottom Left: Thumbnail Slider Controls */}
          <div className="hidden sm:flex absolute bottom-10 left-0 justify-start items-center space-x-2">
            {slideData.map((slide, index) => (
              <React.Fragment key={slide.id}>
                <div
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-12 h-10 sm:w-16 sm:h-12 rounded-md cursor-pointer border-4 transition-all duration-300 ${activeIndex === index ? 'border-blue-600' : 'border-transparent'}`}
                >
                  {/* Using a simple colored div as the thumbnail */}
                  <div className={`w-full h-full rounded-sm ${slide.thumbnailPlaceholder}`}></div>
                </div>
                {index < slideData.length - 1 && (
                  <div className="w-2 h-0.5 bg-gray-400"></div>
                )}
              </React.Fragment>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;