import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { forwardRef } from "react";

const categories = [
  { title: "Custom Jars", modelPath: "/models/soda_can_2.glb" },
  { title: "Custom Pouches", modelPath: "/models/soda_can_2.glb" },
  { title: "Custom Labels & Die Cuts", modelPath: "/models/soda_can_2.glb" },
  { title: "Custom Accessories", modelPath: "/models/soda_can_2.glb" },
];

const RotatingModel = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();
  const clonedScene = scene.clone();

  useFrame((_, delta) => {
    if (modelRef.current) modelRef.current.rotation.y += delta * 0.5;
  });

  return <primitive ref={modelRef} object={clonedScene} scale={24} />;
};

useGLTF.preload("/models/soda_can_2.glb");

const ProductCategories = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="flex flex-wrap justify-center gap-6 mt-6 max-w-7xl mx-auto px-4">
      {categories.map((cat) => (
        <div key={cat.title} className="category-card bg-white/25 backdrop-blur-md p-4 rounded-2xl shadow-md w-56">
          <div className="h-48 w-full">
            <Canvas camera={{ position: [8, 1, 5] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />
              <RotatingModel modelPath={cat.modelPath} />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
          <h3 className="mt-2 text-md font-semibold text-pink-500 font-title">{cat.title}</h3>
          <button className="mt-1 bg-pink-200/80 hover:bg-pink-300 px-3 py-1.5 rounded-full font-title text-xs">
            View details →
          </button>
        </div>
      ))}
    </section>
  );
});

export default ProductCategories;
