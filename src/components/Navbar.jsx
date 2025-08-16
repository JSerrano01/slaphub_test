import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { animateHero } from "./HeroSection"; // Importamos la función

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const buttonsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        animateHero();
      }
    });

    tl.fromTo(navbarRef.current, { y: -80, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" })
      .fromTo(logoRef.current, { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .fromTo(linksRef.current, { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.25 }, "-=0.2")
      .fromTo(buttonsRef.current, { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.3 }, "-=0.1");
  }, []);

  return (
    <header ref={navbarRef} className="fixed top-4 left-0 w-full z-50 px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link ref={logoRef} to="/" className="flex items-center space-x-2 text-xl font-bold text-black font-title">
          <img src="/images/logo.png" alt="SlapHub Logo" className="h-8 w-8 object-contain" />
          <span>SlapHub</span>
        </Link>

        <div className="backdrop-blur-md bg-transparent rounded-2xl shadow-lg px-12 py-3 hidden md:flex space-x-10 font-title">
          {["Home", "Products", "About Us"].map((text, i) => (
            <Link
              key={text}
              ref={(el) => (linksRef.current[i] = el)}
              className="text-black px-3 py-2"
              to={text === "Home" ? "/" : `/${text.toLowerCase().replace(" ", "")}`}
            >
              {text}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <Link ref={(el) => (buttonsRef.current[0] = el)} to="/login"
            className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors font-title">
            Login
          </Link>
          <button ref={(el) => (buttonsRef.current[1] = el)}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors font-title md:hidden">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
