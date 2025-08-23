
import React from 'react';
import { TrustedBrandsIcon, FreeDeliveryIcon, EasyEMIIcon } from './icons';

const featuresData = [
  {
    title: 'Trusted Brand',
    description: 'GST registered company with transparent business practices',
    icon: <TrustedBrandsIcon />,
  },
  {
    title: 'Free Delivery',
    description: 'Get free home delivery through our referral program',
    icon: <FreeDeliveryIcon />,
  },
  {
    title: 'Easy EMI',
    description: 'Flexible payment options with low booking amounts',
    icon: <EasyEMIIcon />,
  },
];

const AboutSection = () => {
  return (
    <section className="bg-[#f8faff] py-24 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute -top-1 -left-2 w-6 h-6 bg-blue-400/80 rounded-sm transform "></div>
            <h2 className="relative text-4xl font-extrabold text-gray-900 tracking-tight">
              About DLS Electronics
            </h2>
          </div>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
            DLS Electronics is a venture of <strong className="font-semibold text-gray-800">DLS Agro Infraventure Pvt Ltd</strong>, bringing you premium home appliances with innovative booking and referral solutions.
          </p>
        </div>

        <div className="mt-20 grid gap-12 grid-cols-1 md:grid-cols-3">
          {featuresData.map((feature, index) => (
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