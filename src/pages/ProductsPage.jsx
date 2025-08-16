// pages/ProductsPage.jsx
import { motion } from "framer-motion";

export default function ProductsPage({ pageReady }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={pageReady ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 pt-16 space-y-16"
    >
      <h1 className="text-4xl font-bold">Productos</h1>
      <p>Aquí van tus productos.</p>
    </motion.div>
  );
}
