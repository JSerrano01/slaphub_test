import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ progress }) => {
  // solo se muestra mientras progress < 100
  const visible = progress < 100;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white z-[9999] select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <div className="text-5xl font-bold tabular-nums tracking-wider">
            {Math.floor(progress)}%
          </div>
          <div className="mt-6 w-64 h-1 bg-white/20 overflow-hidden rounded">
            <motion.div
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
            />
          </div>
          <div className="mt-4 text-xs uppercase tracking-widest opacity-70">
            Cargando experiencias…
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
