// components/ReferralSteps.js
import React from 'react';
import Image from 'next/image';
import ConnectingLine from './ConnectingLine'; // Import our new SVG component


const OneIcon = () => {
    return (
<svg width="630" height="294" viewBox="0 0 630 294" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 0V143.5C1 156.203 11.2975 166.5 24 166.5H605C618.255 166.5 629 177.245 629 190.5V294" stroke="#0A58C9" stroke-dasharray="8 8"/>
</svg>
)
}



// --- Data for the referral steps (remains the same) ---
const stepsData = [
  {
    num: '01',
    title: 'Book Your Product',
    description: 'Pay booking amount (₹8,000 - ₹12,000) for any product',
    imageUrl: '/step1.svg',
    imageAlt: 'Illustration of a person booking a product online.',
  },
  {
    num: '02',
    title: 'Share Your Code',
    description: 'Get unique referral code and share with friends via WhatsApp.',
    imageUrl: '/step2.svg',
    imageAlt: 'Illustration of sharing a referral code from a smartphone.',
  },
  {
    num: '03',
    title: 'Friends Book Too',
    description: 'When 3 friends book the same or higher-priced product, you qualify instantly.',
    imageUrl: '/step3.svg',
    imageAlt: 'Illustration showing a successful referral between two people.',
  },
  {
    num: '04',
    title: 'Enjoy FREE Delivery',
    description: 'Get your product delivered absolutely FREE within 5 working days!',
    imageUrl: '/step4.svg',
    imageAlt: 'Illustration of a person receiving a delivered product.',
  },
];

const ReferralSteps = () => {
  return (
    <section className="bg-white  py-24 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="relative inline-block">
            <div className="absolute -top-1 -left-3 w-6 h-6 bg-blue-400/80 rounded-sm transform"></div>
            <h2 className="relative text-4xl font-extrabold text-gray-900 tracking-tight">
              Refer 3, Get Yours FREE!
            </h2>
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Share with 3 friends and get your product FREE: simple, quick, and rewarding!
          </p>
        </div>

        {/* Steps Container */}
        <div className="space-y-12 md:space-y-4">
          {stepsData.map((step, index) => (
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

                {/* <div className="flex absolute top-32 left-10 justify-center">
                  <OneIcon />
                </div> */}

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

              {/* Render the connecting line AFTER each step, except the last one */}
              {/* {index < stepsData.length - 1 && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-1/2 h-48 text-blue-300 hidden md:block" aria-hidden="true">
                  <ConnectingLine direction={index % 2 === 0 ? 'right' : 'left'} />
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReferralSteps;