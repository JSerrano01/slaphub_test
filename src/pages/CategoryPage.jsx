// pages/CategoryPage.jsx
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import ProductSidebar from "../components/ProductSidebar";
import ProductGrid from "../components/ProductGrid";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function CategoryPage({ pageReady }) {
  const { category } = useParams();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={pageReady ? "show" : "hidden"}
      className="relative z-10 pt-25 space-y-16"
    >
      <motion.div variants={item}>
        <div className="max-w-7xl mx-auto px-6 flex gap-10">
          <ProductSidebar />
          <ProductGrid category={category} />
        </div>
      </motion.div>
    </motion.div>
  );
}
