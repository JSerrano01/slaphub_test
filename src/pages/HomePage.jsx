// pages/HomePage.jsx
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import InstagramFeed from "../components/InstagramFeed";
import AboutUsSummary from "../components/AboutUsSummary";
import Footer from "../components/Footer";

export default function HomePage({ pageReady }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={pageReady ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 pt-16 space-y-16"
    >
      <HeroSection />
      <InstagramFeed />
      <AboutUsSummary />
      <Footer />
    </motion.div>
  );
}
