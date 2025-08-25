// pages/index.js

import Navbar from '../components/Navbar';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';
import ProductCategories from '../components/ProductCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import ReferralSteps from '../components/ReferralSteps';
import AboutSection from '../components/AboutSection';
import ContactSection from '@/components/ContactSection';
export default function HomePage() {
  return (
    <div className='flex flex-col gap-4'>

      <MainContent />
      <div className="flex flex-col p-3">
      <ProductCategories />
      <FeaturedProducts />
      <ReferralSteps />
      <AboutSection />
      <ContactSection />
      </div>
    </div>
  );
}