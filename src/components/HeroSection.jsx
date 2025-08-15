// HeroSection.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const categories = [
  { title: "Custom Jars", modelPath: "/models/jar.glb", scale: 50, cameraPos: [0, 0, 25], position: [0, -5, 0] },
  { title: "Custom Pouches", modelPath: "/models/pouch.glb", scale: 30, cameraPos: [0, 0, 28], position: [0, -4, 0] },
  { title: "Custom Labels & Die Cuts", modelPath: "/models/label.glb", scale: 1, cameraPos: [0, 0, 600], position: [0, 0, 0] },
  { title: "Custom Accessories", modelPath: "/models/suitcase.glb", scale: 5, cameraPos: [9, 5, 600], position: [0, -3, 0] },
];

const RotatingModel = ({ modelPath, scale = 1, position = [0,0,0], rotationSpeed = 0.5 }) => {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();
  const clonedScene = scene.clone();

  useFrame((_, delta) => {
    if (modelRef.current) modelRef.current.rotation.y += delta * rotationSpeed;
  });

  return <primitive ref={modelRef} object={clonedScene} scale={scale} position={position} />;
};

useGLTF.preload("/models/jar.glb");
useGLTF.preload("/models/pouch.glb");
useGLTF.preload("/models/label.glb");
useGLTF.preload("/models/suitcase.glb");
useGLTF.preload("/models/soda_can_2.glb");

const HeroSection = () => {
  const textContainerRef = useRef(null); // contenedor del texto
  const textRef = useRef(null);          // elementos internos del texto
  const heroModelRef = useRef(null);
  const categoriesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animación del contenedor del texto
      tl.fromTo(
        textContainerRef.current,
        { opacity: 0, y: 30, filter: "blur(8px)", scale: 0.95 },
        { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 0.8, ease: "power3.out" }
      );

      // Animación de los elementos internos del texto
      tl.fromTo(
        textRef.current.children,
        { opacity: 0, y: 20, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out", stagger: 0.15 },
        "-=0.4"
      );

      // Animación del modelo 3D principal
      tl.fromTo(
        heroModelRef.current,
        { opacity: 0, y: 30, filter: "blur(8px)", scale: 0.95 },
        { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      // Animación de categorías
      tl.fromTo(
        ".category-card",
        { opacity: 0, y: 30, filter: "blur(8px)", scale: 0.95 },
        { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 0.8, ease: "power3.out", stagger: 0.2 },
        "-=0.3"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full px-0 py-0">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-12 max-w-7xl mx-auto">
        
        {/* Texto con contenedor animado */}
        <div
          ref={textContainerRef}
          className="relative z-10 max-w-lg p-6 rounded-2xl"
          style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
        >
          <div ref={textRef}>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight font-title">
              TURN YOUR IDEA INTO A REALITY.
            </h1>
            <p className="mt-3 text-gray-200 italic font-body text-sm md:text-base">
              From Concept to Creation
            </p>
          </div>
        </div>

        {/* Modelo 3D principal con animación */}
        <div ref={heroModelRef} className="w-full md:w-1/2 h-64 md:h-80">
          <Canvas camera={{ position: [8, 1, 6] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <RotatingModel modelPath="/models/soda_can_2.glb" scale={24} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      </div>

      {/* Categorías */}
      <div ref={categoriesRef} className="flex flex-wrap justify-center gap-6 mt-6 max-w-7xl mx-auto">
        {categories.map((cat) => (
          <div key={cat.title} className="category-card bg-white/25 backdrop-blur-md p-4 rounded-2xl shadow-md w-56">
            <div className="h-48 w-full">
              <Canvas camera={{ position: cat.cameraPos }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} />
                <RotatingModel 
                  modelPath={cat.modelPath} 
                  scale={cat.scale} 
                  position={cat.position} 
                />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </div>
            <h3 className="mt-2 text-md font-semibold text-pink-500 font-title">{cat.title}</h3>
            <button className="mt-1 bg-pink-200/80 hover:bg-pink-300 px-3 py-1.5 rounded-full font-title text-xs">
              View details →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
