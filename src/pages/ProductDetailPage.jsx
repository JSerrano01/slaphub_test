// pages/ProductDetailPage.jsx
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RotatingModel from "../components/RotatingModel";
import { categories } from "../data/products";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ProductDetailPage({ pageReady }) {
  const { category, productId } = useParams();
  const product = categories[category]?.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="text-center text-red-400 pt-16">
        Producto no encontrado.
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={pageReady ? "show" : "hidden"}
      className="relative z-10 pt-16 max-w-4xl mx-auto px-6 text-center mt-18"
    >
      <motion.h1
        variants={item}
        className="text-3xl font-bold text-[#9BDAF2]"
      >
        {product.title}
      </motion.h1>

      <motion.p variants={item} className="text-gray-300 mt-4 text-lg">
        {product.desc}
      </motion.p>

      <motion.div variants={item} className="mt-10 h-96">
        <Canvas camera={{ position: [6, 1, 5] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} />
          <RotatingModel modelPath={product.modelPath} scale={15} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </motion.div>

      <motion.div variants={item}>
        <Link
          to={`/products/${category}`}
          className="inline-block mt-8 bg-[#9BDAF2] hover:bg-[#2A2D40] px-6 py-2 rounded-full text-[#2A2D40] hover:text-[#9BDAF2] text-sm font-title transition-colors"
        >
          ← Back to {category}
        </Link>
      </motion.div>
    </motion.div>
  );
}
