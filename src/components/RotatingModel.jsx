// components/RotatingModel.jsx
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function RotatingModel({ modelPath, scale = 1 }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();
  const clonedScene = scene.clone();

  // Rotación automática
  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5;
    }
  });

  return <primitive ref={modelRef} object={clonedScene} scale={scale} />;
}

// Pre-carga del modelo (opcional)
useGLTF.preload("/models/soda_can_2.glb");
