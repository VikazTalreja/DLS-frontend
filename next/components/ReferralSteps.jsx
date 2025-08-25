"use client";
// components/ReferralSteps.js
import React from 'react';
import Image from 'next/image';
import ConnectingLine from './ConnectingLine'; // Import our new SVG component
import { useI18n } from "@/i18n/I18nProvider";

// --- Data for the referral steps (i18n) ---
const stepsData = (t) => [
  {
    num: '01',
    title: t('referral.steps.1.title'),
    description: t('referral.steps.1.desc'),
    imageUrl: '/step1.svg',
    imageAlt: t('referral.steps.1.alt'),
  },
  {
    num: '02',
    title: t('referral.steps.2.title'),
    description: t('referral.steps.2.desc'),
    imageUrl: '/step2.svg',
    imageAlt: t('referral.steps.2.alt'),
  },
  {
    num: '03',
    title: t('referral.steps.3.title'),
    description: t('referral.steps.3.desc'),
    imageUrl: '/step3.svg',
    imageAlt: t('referral.steps.3.alt'),
  },
  {
    num: '04',
    title: t('referral.steps.4.title'),
    description: t('referral.steps.4.desc'),
    imageUrl: '/step4.svg',
    imageAlt: t('referral.steps.4.alt'),
  },
];

const ReferralSteps = () => {
  const { t } = useI18n();
  return (
    <section className="bg-white  py-24 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="relative w-fit inline-block">
            <div className="hidden absolute md:block  -top-1 -left-3 w-6 h-6 bg-blue-400/80 rounded-sm transform"></div>
            <h2 className="relative text-4xl font-extrabold text-gray-900 tracking-tight">
              {t('referral.title')}
            </h2>
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            {t('referral.subtitle')}
          </p>
        </div>

        {/* Steps Container */}
        <div className="space-y-12 md:space-y-4">
          {stepsData(t).map((step, index) => (
            <div key={step.num} className="relative px-4 py-8">
              <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center">
                
                {/* Text Content - Order changes for alternating layout */}
                <div className={`text-left ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-blue-100 relative rounded-full flex items-center justify-center text-blue-600 font-bold text-xl z-10">
                      {step.num}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="mt-4 text-gray-600 text-lg md:ml-[70px]">
                    {step.description}
                  </p>
                </div>

                {/* Image - Order changes for alternating layout */}
                <div className={`mt-8 md:mt-0 ${index % 2 !== 0 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                  <div className="flex justify-center">
                    <Image 
                      src={step.imageUrl} 
                      alt={step.imageAlt}
                      width={300} 
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReferralSteps;