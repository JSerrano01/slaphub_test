// pages/ProductsPage.jsx
import { motion } from "framer-motion";
import ProductSidebar from "../components/ProductSidebar";
import ProductGrid from "../components/ProductGrid";
import InstagramFeed from "../components/InstagramFeed";
import AboutUsSummary from "../components/AboutUsSummary";
import Footer from "../components/Footer";

export default function ProductsPage({ pageReady }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={pageReady ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 pt-16 space-y-16"
    >
      {/* Layout principal */}
      <div className="max-w-7xl mx-auto px-6 flex gap-10">
        <ProductSidebar />
        <ProductGrid />
      </div>
      <Footer />
    </motion.div>
  );
}
