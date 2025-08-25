"use client";

import React from 'react';
import { TrustedBrandsIcon, FreeDeliveryIcon, EasyEMIIcon } from './icons';
import { useI18n } from "@/i18n/I18nProvider";

const featuresData = (t) => [
  {
    title: t('about.features.trustedBrand.title'),
    description: t('about.features.trustedBrand.desc'),
    icon: <TrustedBrandsIcon />,
  },
  {
    title: t('about.features.freeDelivery.title'),
    description: t('about.features.freeDelivery.desc'),
    icon: <FreeDeliveryIcon />,
  },
  {
    title: t('about.features.easyEmi.title'),
    description: t('about.features.easyEmi.desc'),
    icon: <EasyEMIIcon />,
  },
];

const AboutSection = () => {
  const { t } = useI18n();
  return (
    <section className="bg-[#f8faff] py-24 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute -top-1 -left-2 w-6 h-6 bg-blue-400/80 rounded-sm transform "></div>
            <h2 className="relative text-4xl font-extrabold text-gray-900 tracking-tight">
              {t('about.title')}
            </h2>
          </div>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('about.description') }} />
        </div>

        <div className="mt-20 grid gap-12 grid-cols-1 md:grid-cols-3">
          {featuresData(t).map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center">
                <div className={`w-24 h-24 p-4 bg-blue-600 rounded-full flex items-center justify-center shadow-lg`}>
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="mt-8 text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-lg text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;