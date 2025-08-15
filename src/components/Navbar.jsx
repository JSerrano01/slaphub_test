import { useState, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const Navbar = forwardRef((props, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!ref?.current) return;
    // Inicialmente el navbar aparece desde arriba
    gsap.fromTo(
      ref.current,
      { y: -80, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" }
    );
  }, [ref]);

  return (
    <header
      ref={ref}
      className="fixed top-4 left-0 w-full z-50 px-6"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl font-bold text-black font-title"
        >
          <img
            src="/images/logo.png"
            alt="SlapHub Logo"
            className="h-8 w-8 object-contain"
          />
          <span>SlapHub</span>
        </Link>

        {/* Navbar central */}
        <div className="backdrop-blur-md bg-transparent rounded-2xl shadow-lg px-12 py-3 hidden md:flex space-x-10 font-title">
          <Link className="text-black px-3 py-2" to="/">Home</Link>
          <Link className="text-black px-3 py-2" to="/products">Products</Link>
          <Link className="text-black px-3 py-2" to="/about">About Us</Link>
        </div>

        {/* Botones a la derecha */}
        <div className="flex items-center space-x-3">
          <Link
            to="/login"
            className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors font-title"
          >
            Login
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors font-title md:hidden"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Menú mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/30 backdrop-blur-md rounded-2xl shadow-lg mt-2 px-4 py-2 space-y-2 font-title">
          <Link className="block text-white hover:bg-blue-500/30 px-3 py-2 rounded" to="/">Home</Link>
          <Link className="block text-white hover:bg-blue-500/30 px-3 py-2 rounded" to="/products">Products</Link>
          <Link className="block text-white hover:bg-blue-500/30 px-3 py-2 rounded" to="/about">About Us</Link>
          <Link className="block text-white hover:bg-blue-500/30 px-3 py-2 rounded" to="/login">Login</Link>
        </div>
      )}
    </header>
  );
});

export default Navbar;
