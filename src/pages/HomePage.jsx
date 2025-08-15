// pages/HomePage.jsx
import HeroSection from "../components/HeroSection";
import ProductCategories from "../components/ProductCategories";
import InstagramFeed from "../components/InstagramFeed";
import AboutUsSummary from "../components/AboutUsSummary";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="relative z-10 pt-16 space-y-16">
      <HeroSection />
      {/* <ProductCategories /> */}
      <InstagramFeed />
      <AboutUsSummary />
      <Footer />
    </div>
  );
}
