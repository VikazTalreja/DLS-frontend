// components/HeroSection.js
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/i18n/I18nProvider';

// slide data will read from i18n messages
const buildSlides = (t) => ([
  {
    id: 1,
    headline: [t('hero.slides.1.h0'), t('hero.slides.1.h1'), t('hero.slides.1.h2')],
    thumbnailPlaceholder:"bg-[url('/Frame9.png')]", 
    bgImage:"bg-[url('/HeroBg.png')]"
  },
  {
    id: 2,
    headline: ["Cool Comfort,", "Anytime You Need It.", ""],
    thumbnailPlaceholder:"bg-[url('/Frame10.png')]",
    bgImage:"bg-[url('/cara-2.png')]"
  },
  {
    id: 3,  
    headline: ["Advanced smart cooling", "for smarter kitchens.", ""],
    thumbnailPlaceholder: "bg-[url('/Frame11.png')]",
    bgImage:"bg-[url('/cara-3.png')]"
  },
  {
    id: 4,
    headline: ["Your screen to endless", "entertainment.", ""],
    thumbnailPlaceholder: "bg-[url('/Frame12.png')]",
    bgImage:"bg-[url('/cara-4.png')]"
  },
]);

const SLIDE_DURATION = 5000; // 5 seconds

// Helper component to inject custom animation styles directly into the document head.
const HeroAnimationStyles = () => (
  <style>
    {`
      @keyframes fade-in-up {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes progress-bar {
        from { width: 0%; }
        to { width: 100%; }
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.8s ease-out forwards;
      }
      .animate-progress-bar {
        animation: progress-bar ${SLIDE_DURATION / 1000}s linear forwards;
      }
    `}
  </style>
);

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef(null);
  const router = useRouter();
  const { t } = useI18n();

  const slideData = buildSlides(t);
  const isFirstSlide = activeIndex === 0;

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
      SLIDE_DURATION
    );
    return () => resetTimeout();
  }, [activeIndex, slideData.length]);

  const handleThumbnailClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const currentSlide = slideData[activeIndex];

  return (
    <>
      <HeroAnimationStyles />
      <section 
        id="home"
        className="scroll-mt-28 font-sans w-full min-h-[560px] sm:min-h-[600px] lg:h-screen relative flex items-center overflow-hidden"
      >
        {/* Background Images Container for Cross-Fade Effect */}
        <div className="absolute inset-0 w-full h-full z-0">
          {slideData.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${slide.bgImage} ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>

        {/* Content & Controls Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full h-full px-4 sm:px-6 lg:px-8">
          {/* Main content area that will shift left or right */}
          <div className={`w-full h-full flex items-center transition-all duration-700 ease-out ${isFirstSlide ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-2xl ${isFirstSlide ? 'text-left' : 'text-right mb-10'}`}>
              <div key={activeIndex} className="animate-fade-in-up">
                <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 leading-tight">
                  {currentSlide.headline.map((line, index) => {
                    if (!line) return null;
                    if (index === 1) {
                      return <span key={index} className="text-blue-600 block">{line}</span>;
                    }
                    return <React.Fragment key={index}>{line}<br/></React.Fragment>;
                  })}
                </h1>
                
                <div className={`mt-6 sm:mt-10 flex items-center space-x-3 sm:space-x-4 ${isFirstSlide ? 'justify-start' : 'justify-end'}`}>
                  <button onClick={() => router.push("/booking")} className="bg-[#1e60c8] cursor-pointer text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-700 transition-colors shadow-md">
                    {t('cta.bookNow')}
                  </button>
                  <button onClick={() => router.push("/referral-dashboard")} className="border-2 border-[#1e60c8] cursor-pointer text-[#1e60c8] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-50 transition-colors">
                    {t('cta.referEarn')}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Thumbnail Slider Controls - Positioned relative to the main container, so they won't move */}
          <div className="hidden sm:flex absolute bottom-10 left-4 sm:left-6 lg:left-8 justify-start items-center space-x-2">
            {slideData.map((slide, index) => (
              <React.Fragment key={slide.id}>
                <div
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-md cursor-pointer border-4 transition-all duration-300 relative overflow-hidden ${activeIndex === index ? 'border-blue-900' : 'border-transparent'}`}
                >
                  <div className={`w-full h-full bg-cover bg-center bg-no-repeat rounded-sm ${slide.thumbnailPlaceholder}`}></div>
                  {activeIndex === index && (
                     <div 
                        key={activeIndex}
                        className="absolute bottom-0 left-0 h-1 bg-blue-600 animate-progress-bar"
                     ></div>
                  )}
                </div>
                {index < slideData.length - 1 && (
                  <div className="w-2 h-0.5 bg-gray-400"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;