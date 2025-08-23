// components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold">DLS ELECTRONICS</h3>
            <p className="text-sm text-blue-200 mt-1">Simple Life, Smart Life</p>
            <p className="mt-4 text-blue-200">
              A venture of DLS Agro Infraventure Pvt Ltd
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-200">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Products</a></li>
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Refer & Earn</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-blue-200">
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Refund Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-2 text-blue-200">
              <li className="flex items-center"><span className="mr-2">[P]</span> 770007110</li>
              <li className="flex items-center"><span className="mr-2">[E]</span> waffco4@gmail.com</li>
              <li className="flex items-center"><span className="mr-2">[G]</span> GST: 27AAGCD7282A2ZQ</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-blue-800">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-blue-300">
          © 2020 Lift Media. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;