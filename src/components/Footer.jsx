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
          start: "top 90%", // Comienza cuando el footer esté casi visible
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="py-10 px-6"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold font-title">Contact us</h3>
          <p className="mt-2 font-semibold font-title">SlapHub LA</p>
          <p className="font-title">Call/Text: (424) 266-1054</p>
          <p className="font-title">Email: slaphubla@gmail.com</p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-bold font-title">Exclusive Email Offers</h3>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter email"
              className="flex-1 border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none text-black font-title"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded-r-md hover:bg-pink-600 font-title"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-300 font-title">
        <p>©2025 SlapHub LA. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
