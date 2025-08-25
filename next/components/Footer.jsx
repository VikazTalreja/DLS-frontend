"use client";
// components/Footer.js

import React from 'react';
import { useI18n } from '@/i18n/I18nProvider';

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold">{t('brand.title')}</h3>
            <p className="text-sm text-blue-200 mt-1">{t('brand.tagline')}</p>
            <p className="mt-4 text-blue-200">
              {t('footer.companyNote')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.quickLinks.title')}</h4>
            <ul className="space-y-2 text-blue-200">
              <li><a href="#" className="hover:text-white">{t('footer.quickLinks.items.home')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.quickLinks.items.products')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.quickLinks.items.about')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.quickLinks.items.contact')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.quickLinks.items.referEarn')}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.legal.title')}</h4>
            <ul className="space-y-2 text-blue-200">
              <li><a href="#" className="hover:text-white">{t('footer.legal.terms')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.legal.privacy')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.legal.refund')}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.contact.title')}</h4>
            <ul className="space-y-2 text-blue-200">
              <li className="flex items-center"><span className="mr-2">{t('footer.contact.labels.phone')}</span> 770007110</li>
              <li className="flex items-center"><span className="mr-2">{t('footer.contact.labels.email')}</span> waffco4@gmail.com</li>
              <li className="flex items-center"><span className="mr-2">{t('footer.contact.labels.gst')}</span> GST: 27AAGCD7282A2ZQ</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-blue-800">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-blue-300">
          {t('footer.copy')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;