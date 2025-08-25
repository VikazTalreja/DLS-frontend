"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import {
  ScreenIcon,
  TvIcon,
  HdrIcon,
  MicIcon,
  StarIcon,
  SnowflakeIcon,
  WifiIcon,
  BoltIcon,
  EnergyEfficientIcon,
  VegetableIcon,
  LedLightingIcon,
} from "@/components/icons";

import { useI18n } from "@/i18n/I18nProvider";

const featuredProductsData = (t) => [
  {
    id: 1,
    title: t('featured.products.1.title'),
    imagePlaceholder: <img src="/Tv.png" alt="" />,
    features: [
      { icon: <ScreenIcon />, text: t('featured.products.1.features.uhd') },
      { icon: <TvIcon />, text: t('featured.products.1.features.smart') },
      { icon: <HdrIcon />, text: t('featured.products.1.features.hdr') },
      { icon: <MicIcon />, text: t('featured.products.1.features.voice') },
    ],
    price: "₹25,000",
    priceValue: 25000,
    bookingPrice: "₹8,000",
    bookingValue: 8000,
    category: 'TV',
  },
  {
    id: 2,
    title: t('featured.products.2.title'),
    imagePlaceholder: <img src="/Ac.png" alt="" />,
    features: [
      { icon: <StarIcon />, text: t('featured.products.2.features.fiveStar') },
      { icon: <WifiIcon />, text: t('featured.products.2.features.wifi') },
      { icon: <BoltIcon />, text: t('featured.products.2.features.inverter') },
    ],
    price: "₹35,000",
    priceValue: 35000,
    bookingPrice: "₹10,000",
    bookingValue: 10000,
    category: 'AC',
  },
  {
    id: 3,
    title: t('featured.products.3.title'),
    imagePlaceholder: <img src="/Fridge.png" alt="" />,
    features: [
      { icon: <SnowflakeIcon />, text: t('featured.products.3.features.frostFree') },
      { icon: <EnergyEfficientIcon />, text: t('featured.products.3.features.energyEfficient') },
      { icon: <VegetableIcon />, text: t('featured.products.3.features.vegetableCrisper') },
      { icon: <LedLightingIcon />, text: t('featured.products.3.features.ledLighting') },
    ],
    price: "₹30,000",
    priceValue: 30000,
    bookingPrice: "₹8,000",
    bookingValue: 8000,
    category: 'Fridge',
  },
];

// --- Main Component ---
const FeaturedProducts = () => {
  const { t, lang } = useI18n();
  const router = useRouter();
  return (
    <section className="bg-gray-50 py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute -top-1 -left-2 w-6 h-6 hidden md:block bg-blue-400/80 rounded-sm transform "></div>
            <h2 className="relative text-4xl font-extrabold text-gray-900">
              {t('featured.title')}
            </h2>
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            {t('featured.subtitle')}
          </p>
        </div>

        {/* Products Grid */}
        <div className="mt-20 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {featuredProductsData(t).map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
              {/* Image Area */}
              <div className="bg-[#c5d1e0] h-60 flex justify-center items-center p-8">
                {product.imagePlaceholder}
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-blue-600">{product.title}</h3>
                
                <ul className="mt-4 space-y-2 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      {feature.icon}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Price and Button Footer */}
                <div className="mt-auto pt-6 flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{product.price}</p>
                    <p className="text-sm text-gray-500">
                      {lang === 'mr'
                        ? `${product.bookingPrice} ${t('featured.bookFrom')}`
                        : `${t('featured.bookFrom')} ${product.bookingPrice}`}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const p = product;
                      const balance = Math.max(0, (p.priceValue || 0) - (p.bookingValue || 0));
                      const params = new URLSearchParams({
                        category: p.category || '',
                        product: p.title || '',
                        mrp: String(p.priceValue || ''),
                        amount: String(p.bookingValue || ''),
                        balance: String(balance || ''),
                      });
                      router.push(`/booking?${params.toString()}`);
                    }}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                  >
                    {t('cta.bookNow')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;