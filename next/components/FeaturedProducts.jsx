import React from 'react';

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

const featuredProductsData = [
  {
    id: 1,
    title: "Samsung 43\" Smart LED TV",
    imagePlaceholder: <img src="/Tv.png" alt="" />,
    features: [
      { icon: <ScreenIcon />, text: "4K Ultra HD" },
      { icon: <TvIcon />, text: "Smart TV" },
      { icon: <HdrIcon />, text: "HDR Support" },
      { icon: <MicIcon />, text: "Voice Control" },
    ],
    price: "₹25,000",
    bookingPrice: "₹8,000",
  },
  {
    id: 2,
    title: "LG 1.5 Ton 5 Star Split AC",
    imagePlaceholder: <img src="/Ac.png" alt="" />,
    features: [
      { icon: <StarIcon />, text: "5 Star Rating" },
      // { icon: <img src="/icons/copper.png" alt="" />, text: "Copper Condenser" },
      { icon: <WifiIcon />, text: "Wi-Fi Enabled" },
      { icon: <BoltIcon />, text: "Dual Inverter" },
    ],
    price: "₹25,000",
    bookingPrice: "₹8,000",
  },
  {
    id: 3,
    title: "Whirlpool 265L Double Door",
    imagePlaceholder: <img src="/Fridge.png" alt="" />,
    features: [
      { icon: <SnowflakeIcon />, text: "Frost Free" },
      { icon: <EnergyEfficientIcon />, text: "Energy Efficient" },
      { icon: <VegetableIcon />, text: "Vegetable Crisper" },
      { icon: <LedLightingIcon />, text: "LED Lighting" },
    ],
    price: "₹25,000",
    bookingPrice: "₹8,000",
  },
];

// --- Main Component ---
const FeaturedProducts = () => {
  return (
    <section className="bg-gray-50 py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute -top-1 -left-2 w-6 h-6 bg-blue-400/80 rounded-sm transform "></div>
            <h2 className="relative text-4xl font-extrabold text-gray-900">
              Featured Products
            </h2>
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Most popular items with best referral success rates.
          </p>
        </div>

        {/* Products Grid */}
        <div className="mt-20 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {featuredProductsData.map((product) => (
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
                    <p className="text-sm text-gray-500">Book ₹{product.bookingPrice}</p>
                  </div>
                  <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                    Book Now
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