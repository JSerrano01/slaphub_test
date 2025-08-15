// src/components/AboutUsSummary.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUsSummary = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Cargar la fuente desde Google Fonts
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Animación con GSAP
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-6xl mx-auto px-6 py-12 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
      <p className="text-lg text-gray-700 mb-6">
        Welcome to <span className="font-semibold">SlapHub LA</span>, your
        premier destination for custom print and packaging solutions since 2019.
        Official partner of leading brands worldwide.
      </p>

      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        Our Specialty: Custom MIRON Jars
      </h3>
      <p className="text-gray-700 mb-6">
        We specialize in{" "}
        <span className="font-semibold">custom MIRON Violetglass jars</span> with
        high-quality labels featuring raised gloss and holographic finishes.
        Whether you need labeled jars or labels only, we’ve got you covered.
      </p>

      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        Other Services
      </h3>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Custom Pouches – fully customizable with premium finishes</li>
        <li>Custom Labels & Die Cuts – tailored for any product</li>
        <li>Specialty Finishes – high-quality printing & varnishes</li>
        <li>
          Custom Projects – jars, labels, boxes, vape hardware, and more
        </li>
      </ul>

      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        Why Choose SlapHub LA?
      </h3>
      <ul className="list-disc list-inside text-gray-700">
        <li>Trusted by industry leaders</li>
        <li>Innovative packaging solutions</li>
        <li>Exceptional customer service</li>
      </ul>
    </section>
  );
};

export default AboutUsSummary;
