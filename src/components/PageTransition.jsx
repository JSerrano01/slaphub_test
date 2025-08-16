// components/PageTransition.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function PageTransition({ setPageReady }) {
  const location = useLocation();
  const [display, setDisplay] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return; // ❌ no mostrar transición en el primer render
    }

    setPageReady(false); // 🚨 bloquear animaciones de página
    setDisplay(true);

    const timer = setTimeout(() => {
      setDisplay(false);
      setPageReady(true); // ✅ habilitar animaciones de página después de transición
    }, 800);

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
