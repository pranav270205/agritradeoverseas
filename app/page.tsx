import HeroSection from '@/components/HeroSection';
import SocialMediaBar from '@/components/SocialMediaBar';
import AboutPreview from '@/components/AboutPreview';
import ProductShowcase from '@/components/ProductShowcase';
import ProcessSection from '@/components/ProcessSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import QualityAssurance from '@/components/QualityAssurance';
import ExportMarketsSection from '@/components/ExportMarketsSection';
import CertificationsSection from '@/components/CertificationsSection';
import CallToAction from '@/components/CallToAction';
import ContactPreview from '@/components/ContactPreview';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SocialMediaBar />
      <AboutPreview />
      <ProductShowcase />
      <ProcessSection />
      <WhyChooseUs />
      <QualityAssurance />
      <ExportMarketsSection />
      <CertificationsSection />
      <CallToAction />
      <ContactPreview />
    </>
  );
}
