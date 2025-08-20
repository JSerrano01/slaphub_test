// components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { animateHero } from "./HeroSection";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const buttonsRef = useRef([]);

  useEffect(() => {
    if (location.pathname === "/") {
      const tl = gsap.timeline({
        onComplete: () => {
          animateHero();
        },
      });

      tl.fromTo(
        navbarRef.current,
        { y: -80, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        }
      )
        .fromTo(
          logoRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          linksRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.25,
          },
          "-=0.2"
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.3,
          },
          "-=0.1"
        );
    }
  }, [location.pathname]);

  // ✅ Ahora acepta categoría + producto opcional
  const handleCategoryClick = (category, productId = null) => {
    if (productId) {
      navigate(`/products/${category}/${productId}`);
    } else {
      navigate(`/products/${category}`);
    }
    setIsProductsOpen(false);
  };

  return (
    <header ref={navbarRef} className="fixed top-4 left-0 w-full z-50 px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          ref={logoRef}
          to="/"
          className="flex items-center space-x-2 text-xl font-bold text-[#9BDAF2] font-title"
        >
          <img
            src="/images/Donatello.svg"
            alt="SlapHub Logo"
            className="h-8 w-8 object-contain"
          />
          <span>Stickerlab LA</span>
        </Link>

        {/* Links */}
        <div className="backdrop-blur-md bg-transparent rounded-2xl shadow-lg px-12 py-3 hidden md:flex space-x-10 font-title">
          <Link
            ref={(el) => (linksRef.current[0] = el)}
            className="text-[#9BDAF2] px-3 py-2"
            to="/"
          >
            Home
          </Link>

          {/* Products con dropdown */}
          <div
            ref={(el) => (linksRef.current[1] = el)}
            className="relative"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <Link
              className="text-[#9BDAF2] px-3 py-2 inline-block"
              to="/products"
            >
              Products
            </Link>

            <AnimatePresence>
              {isProductsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-1 
                             grid grid-cols-4 gap-8 bg-white text-black 
                             rounded-lg shadow-lg p-6 w-[900px] z-50 border border-gray-200"
                >
                  {/* Custom Jars */}
                  <div className="border-r border-gray-200 pr-6">
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">
                      Custom Jars
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <button
                          onClick={() =>
                            handleCategoryClick(
                              "CustomJars",
                              "custom-labeled-miron-jar"
                            )
                          }
                          className="flex items-center hover:text-[#9BDAF2]"
                        >
                          <span className="mr-1">-</span> Custom Labeled MIRON Jar
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handleCategoryClick(
                              "CustomJars",
                              "custom-label-only-miron"
                            )
                          }
                          className="flex items-center hover:text-[#9BDAF2]"
                        >
                          <span className="mr-1">-</span> Custom Label ONLY for Miron Jar
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handleCategoryClick(
                              "CustomJars",
                              "custom-label-uline"
                            )
                          }
                          className="flex items-center hover:text-[#9BDAF2]"
                        >
                          <span className="mr-1">-</span> Custom Label for ULINE Jar
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Custom Pouches */}
                  <div className="border-r border-gray-200 pr-6">
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">
                      Custom Pouches
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <button
                          onClick={() =>
                            handleCategoryClick(
                              "CustomPouches",
                              "direct-print-pouches"
                            )
                          }
                          className="flex items-center hover:text-[#9BDAF2]"
                        >
                          <span className="mr-1">-</span> Direct Print Pouches
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handleCategoryClick(
                              "CustomPouches",
                              "labeled-eighth-bag"
                            )
                          }
                          className="flex items-center hover:text-[#9BDAF2]"
                        >
                          <span className="mr-1">-</span> Labeled Eighth Bag
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handleCategoryClick(
                              "CustomPouches",
                              "labeled-pound-bag"
                            )
                          }
                          className="flex items-center hover:text-[#9BDAF2]"
                        >
                          <span className="mr-1">-</span> Labeled Pound Bag
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Custom Labels & Die Cuts */}
                  <div className="border-r border-gray-200 pr-6">
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">
                      Custom Labels & Die Cuts
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <button
                          onClick={() =>
                            handleCategoryClick(
                              "CustomLabelsDieCuts",
                              "die-cut-stickers"
                            )
                          }
                          className="flex items-center hover:text-[#9BDAF2]"
                        >
                          <span className="mr-1">-</span> Die Cut Stickers
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handleCategoryClick(
                              "CustomLabelsDieCuts",
                              "circle-square-stickers"
                            )
                          }
                          className="flex items-center hover:text-[#9BDAF2]"
                        >
                          <span className="mr-1">-</span> Circle/Square Stickers
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Accessories */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">
                      Custom Accessories
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <button
                          onClick={() =>
                            handleCategoryClick(
                              "CustomAccessories",
                              "custom-label-o2vape"
                            )
                          }
                          className="flex items-center hover:text-[#9BDAF2]"
                        >
                          <span className="mr-1">-</span> Custom Label for o2vape Traveler
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handleCategoryClick(
                              "CustomAccessories",
                              "custom-pre-roll-tubes"
                            )
                          }
                          className="flex items-center hover:text-[#9BDAF2]"
                        >
                          <span className="mr-1">-</span> Custom Pre-Roll Tubes
                        </button>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            ref={(el) => (linksRef.current[2] = el)}
            className="text-[#9BDAF2] px-3 py-2"
            to="/about"
          >
            About Us
          </Link>
        </div>

        {/* Botones */}
        <div className="flex items-center space-x-3">
          <Link
            ref={(el) => (buttonsRef.current[0] = el)}
            to="/login"
            className="bg-[#2A2D40] text-[#9BDAF2] px-5 py-2 rounded-full hover:bg-[#9BDAF2] hover:text-[#2A2D40] transition-colors font-title"
          >
            Login
          </Link>
          <button
            ref={(el) => (buttonsRef.current[1] = el)}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-[#2A2D40] text-[#9BDAF2] px-4 py-2 rounded-full hover:bg-[#9BDAF2] hover:text-[#2A2D40] transition-colors font-title md:hidden"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
