import { createContext, useState, useRef, useEffect } from "react";
import gsap from "gsap";

export const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef(null);

  const startTransition = (callback) => {
    setIsTransitioning(true);

    // Animar la capa negra hacia arriba (cubrir)
    gsap.to(overlayRef.current, {
      y: "0%",
      duration: 0.6,
      ease: "power4.inOut",
      onComplete: () => {
        if (callback) callback();

        // Animar la capa hacia abajo (descubrir)
        gsap.to(overlayRef.current, {
          y: "-100%",
          duration: 0.6,
          ease: "power4.inOut",
          delay: 0.2,
          onComplete: () => {
            setIsTransitioning(false);
          }
        });
      }
    });
  };

  useEffect(() => {
    // Posición inicial fuera de pantalla
    gsap.set(overlayRef.current, { y: "100%" });
  }, []);

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      {children}

      {/* Overlay para transiciones */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full bg-black z-[9999]"
      ></div>
    </TransitionContext.Provider>
  );
};
