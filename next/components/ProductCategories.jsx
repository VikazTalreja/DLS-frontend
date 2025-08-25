"use client";
// components/ProductCategories.js

import React from 'react';
import { useI18n } from "@/i18n/I18nProvider";

// A small SVG component for the arrow in the button.
const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

// Data for the product categories. This makes it easy to manage.
const categoryData = [
  {
    title: ["Washing", "Machines"],
    price: "₹25,000",
    bgColor: "bg-blue-200", // Placeholder color
    bgImageStyle: "bg-[url('/Category-1.png')] bg-cover bg-[90%_center]",
  },
  {
    title: ["Air", "Conditioners"],
    price: "₹25,000",
    bgColor: "bg-gray-200", // Placeholder color
    bgImageStyle: "bg-[url('/Category-2.png')] bg-cover bg-[30%_center]",

  },
  {
    title: ["Refrigerators"],
    price: "₹25,000",
    bgColor: "bg-slate-200", // Placeholder color
    bgImageStyle: "bg-[url('/Category-3.png')] bg-cover bg-center",
  },
  {
    title: ["Smart TVs"],
    price: "₹25,000",
    bgColor: "bg-neutral-200", // Placeholder color
    bgImageStyle: "bg-[url('/Category-4.png')] bg-cover bg-center",
  },
];

// Reusable Product Card Component
const ProductCard = ({ title, price, bgImageStyle, t, lang }) => (
  <div className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 h-96">
    {/* Background Placeholder */}
    <div className={`absolute inset-0 w-full h-full ${bgImageStyle}`}></div>
    
    {/* Card Content */}
    <div className="relative p-6 flex flex-col justify-between h-full">
      {/* Category Title */}
      <h3 className="text-3xl font-bold text-white">
        {title[0]}<br/>{title[1]}
      </h3>

      {/* Bottom price overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
        <p className="text-white text-lg font-semibold">
          {lang === 'mr' ? `${price} ${t('categories.startingFrom')}` : `${t('categories.startingFrom')} ${price}`}
        </p>
      </div>
    </div>
  </div>
);


const ProductCategories = () => {
  const { t, lang } = useI18n();
  return (
    <section className="bg-white py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          <div className="relative inline-block">
             {/* The small blue square icon */}
            <div className="absolute hidden md:block -top-1 -left-2 w-6 h-6 bg-blue-400/80 rounded-sm transform"></div>
            <h2 className="relative text-4xl font-extrabold text-gray-900">
              {t('categories.title')}
            </h2>
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            {t('categories.subtitle')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {categoryData.map((category, index) => (
            <ProductCard 
              key={index}
              title={category.title}
              price={category.price}
              bgImageStyle={category.bgImageStyle} // Using the gradient style from data
              t={t}
              lang={lang}
            />
          ))}
        </div>

        {/* Shop Here Button */}
        <div className="mt-16 text-center">
          <button className="inline-flex cursor-pointer  items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <span className='text-base mr-2'>{t('categories.shopHere')}</span>
            <ChevronRightIcon/>
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProductCategories;