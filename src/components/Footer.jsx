import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%", // Animación al entrar casi en pantalla
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="py-10 px-6">
      {/* Contenedor principal */}
      <div className="backdrop-blur-md bg-transparent rounded-2xl shadow-lg px-8 py-6 hidden md:grid grid-cols-2 gap-12 font-title text-white">
        
        {/* Contacto */}
        <div>
          <h3 className="text-xl font-bold">Contact Us</h3>
          <p className="mt-2 font-semibold">Sticker LA</p>
          <p>Call/Text: (424) 266-1054</p>
          <p>Email: slaphubla@gmail.com</p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-bold">Exclusive Email Offers</h3>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-gray-300 px-4 py-2 rounded-l-md bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#2A2D40] text-[#9BDAF2] px-4 py-2 rounded-r-md hover:bg-[#9BDAF2] hover:text-[#2A2D40] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Derechos reservados */}
        <div className="col-span-2 mt-8 text-center text-sm">
          <p>© 2025 Stickerlab LA. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
