// pages/AboutPage.jsx
import { motion } from "framer-motion";

export default function AboutPage({ pageReady }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={pageReady ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 pt-16 space-y-16"
    >
      <h1 className="text-4xl font-bold">About Us</h1>
      <p>Un poco sobre nosotros...</p>
    </motion.div>
  );
}
