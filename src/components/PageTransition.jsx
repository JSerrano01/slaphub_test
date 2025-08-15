// components/PageTransition.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function PageTransition() {
  const location = useLocation();
  const [display, setDisplay] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return; // ❌ no mostrar transición en el primer render
    }

    setDisplay(true);
    const timer = setTimeout(() => setDisplay(false), 800); // duración total
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <AnimatePresence>
      {display && (
        <motion.div
          className="fixed inset-0 bg-white z-[9999]"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
}
