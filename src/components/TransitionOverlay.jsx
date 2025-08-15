// components/TransitionOverlay.jsx
import { motion } from "framer-motion";

export default function TransitionOverlay({ children }) {
  return (
    <>
      {/* Animación que tapa/destapa */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-white z-50"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      {children}
    </>
  );
}
