import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";

// Lista original de categorías
const categories = [
  { title: "Custom Jars", /*modelPath: "/models/jar.glb",*/ geometry: "cylinder", scale: 2, cameraPos: [0, 0, 6], position: [0, 0, 0] },
  { title: "Custom Pouches", /*modelPath: "/models/pouch.glb",*/ geometry: "box", scale: 2.5, cameraPos: [0, 0, 7], position: [0, 0, 0] },
  { title: "Custom Labels & Die Cuts", /*modelPath: "/models/label.glb",*/ geometry: "sphere", scale: 1.5, cameraPos: [0, 0, 5], position: [0, 0, 0] },
  { title: "Custom Accessories", /*modelPath: "/models/suitcase.glb",*/ geometry: "cone", scale: 2, cameraPos: [0, 0, 6], position: [0, 0, 0] }
];

// Componente para figuras geométricas
const RotatingShape = ({ type = "box", scale = 1, position = [0, 0, 0], rotationSpeed = 0.5 }) => {
  const shapeRef = useRef();

  useFrame((_, delta) => {
    if (shapeRef.current) shapeRef.current.rotation.y += delta * rotationSpeed;
  });

  let geometry;
  switch (type) {
    case "cylinder":
      geometry = <cylinderGeometry args={[1, 1, 2, 32]} />;
      break;
    case "sphere":
      geometry = <sphereGeometry args={[1, 32, 32]} />;
      break;
    case "cone":
      geometry = <coneGeometry args={[1, 2, 32]} />;
      break;
    default:
      geometry = <boxGeometry args={[1, 1, 1]} />;
  }

  return (
    <mesh ref={shapeRef} scale={scale} position={position}>
      {geometry}
      <meshStandardMaterial color="#ff69b4" metalness={0.3} roughness={0.4} />
    </mesh>
  );
};

// Componente para modelos 3D (comentado en uso)
// const RotatingModel = ({ modelPath, scale = 1, position = [0, 0, 0], rotationSpeed = 0.5 }) => {
//   const { scene } = useGLTF(modelPath);
//   const modelRef = useRef();
//   const clonedScene = useMemo(() => scene.clone(), [scene]);

//   useFrame((_, delta) => {
//     if (modelRef.current) modelRef.current.rotation.y += delta * rotationSpeed;
//   });

//   return <primitive ref={modelRef} object={clonedScene} scale={scale} position={position} />;
// };

// Preload de modelos (comentado)
// [...categories, { modelPath: "/models/soda_can_2.glb" }].forEach((m) => {
//   if (m.modelPath) useGLTF.preload(m.modelPath);
// });

let animateHero;

const HeroSection = () => {
  const textContainerRef = useRef(null);
  const textRef = useRef(null);
  const heroModelRef = useRef(null);
  const categoryRefs = useRef([]);

  useEffect(() => {
    gsap.set([textContainerRef.current, heroModelRef.current, categoryRefs.current], {
      opacity: 0,
      y: 30,
      scale: 0.95
    });
    if (textRef.current) {
      gsap.set(textRef.current.children, { opacity: 0, y: 20 });
    }
  }, []);

  animateHero = () => {
    const tl = gsap.timeline();

    tl.to(textContainerRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" })
      .to(textRef.current.children, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.15 }, "-=0.4")
      .to(heroModelRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }, "-=0.3")
      .to(categoryRefs.current, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", stagger: 0.2 }, "-=0.3");
  };

  return (
    <section className="w-full px-0 py-0">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 max-w-7xl mx-auto">
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

        <div ref={heroModelRef} className="w-full md:w-1/2 h-64 md:h-80">
          <Canvas camera={{ position: [8, 1, 6] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <RotatingShape type="sphere" scale={2.5} />
            {/* <RotatingModel modelPath="/models/soda_can_2.glb" scale={24} /> */}
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-6 max-w-7xl mx-auto">
        {categories.map((cat, i) => (
          <div
            key={cat.title}
            ref={(el) => (categoryRefs.current[i] = el)}
            className="category-card bg-white/25 backdrop-blur-md p-4 rounded-2xl shadow-md w-56"
          >
            <div className="h-48 w-full">
              <Canvas camera={{ position: cat.cameraPos }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} />
                <RotatingShape type={cat.geometry} scale={cat.scale} position={cat.position} />
                {/* <RotatingModel modelPath={cat.modelPath} scale={cat.scale} position={cat.position} /> */}
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

export { animateHero };
export default HeroSection;
