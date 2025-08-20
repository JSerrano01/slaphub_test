// src/pages/ProductDetailPage.jsx
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RotatingModel from "../components/RotatingModel";
import ProductSidebar from "../components/ProductSidebar";
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
      className="relative z-10 pt-16 max-w-7xl mx-auto px-6 mt-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
        {/* ✅ Sidebar */}
        <motion.div variants={item} className="lg:col-span-1">
          <ProductSidebar />
        </motion.div>

        {/* ✅ Contenido principal */}
        <motion.div variants={item} className="lg:col-span-3 space-y-10">
          {/* Breadcrumb + título */}
          <h1 className="text-3xl font-bold text-[#9BDAF2]">{product.title}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* ✅ Modelo 3D */}
            <motion.div variants={item} className="glass-container h-[420px] flex">
              <Canvas camera={{ position: [6, 1, 5] }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} />
                <RotatingModel modelPath={product.modelPath} scale={15} />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </motion.div>

            {/* ✅ Calculadora */}
            <motion.div variants={item} className="glass-container min-h-[420px] flex flex-col justify-between">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Price Calculator</h2>

                {/* Size */}
                <div>
                  <label className="block text-sm mb-2">Size</label>
                  <select className="w-full p-2 rounded bg-white/10 border border-gray-600">
                    <option>5ml</option>
                    <option>150ml</option>
                    <option>250ml</option>
                    <option>500ml</option>
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm mb-2">Quantity</label>
                  <input
                    type="number"
                    defaultValue={50}
                    className="w-full p-2 rounded bg-white/10 border border-gray-600"
                  />
                </div>

                {/* Label Material */}
                <div>
                  <p className="font-semibold">Label Material</p>
                  <div className="space-y-2 mt-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="material" /> Matte
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="material" /> Holographic
                    </label>
                  </div>
                </div>

                {/* Finish */}
                <div>
                  <p className="font-semibold">Finish</p>
                  <div className="space-y-2 mt-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="finish" /> Standard
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="finish" /> Spot-UV(+0.25)
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="finish" /> Embossed(+0.60)
                    </label>
                  </div>
                </div>
              </div>

              <div className="text-right text-lg font-bold text-[#9BDAF2] mt-6">
                Total: $350.00
              </div>
            </motion.div>
          </div>

          {/* ✅ Descripción */}
          <motion.div variants={item} className="glass-container">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p>{product.desc}</p>
          </motion.div>

          {/* ✅ Upload */}
          <motion.div variants={item} className="glass-container text-center">
            <h2 className="text-lg mb-4">What would you like to do?</h2>
            <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg">
              Upload Design
            </button>
            <p className="mt-4 text-sm text-gray-400">
              Artwork not ready?{" "}
              <span className="text-[#9BDAF2] cursor-pointer">
                Buy now and upload later
              </span>
            </p>
          </motion.div>

          {/* ✅ Relacionados */}
          <motion.div variants={item}>
            <h2 className="text-xl font-semibold mb-4 text-gray-200">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories[category]
                ?.filter((p) => p.id !== productId)
                .slice(0, 4)
                .map((related) => (
                  <Link
                    key={related.id}
                    to={`/products/${category}/${related.id}`}
                    className="glass-container p-4 text-center hover:scale-105 transition"
                  >
                    <div className="h-32 bg-white/10 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-sm">{related.title}</span>
                    </div>
                  </Link>
                ))}
            </div>
          </motion.div>

          {/* ✅ Back */}
          <motion.div variants={item} className="mt-8">
            <Link
              to={`/products/${category}`}
              className="inline-block bg-[#9BDAF2] hover:bg-[#2A2D40] px-6 py-2 rounded-full text-[#2A2D40] hover:text-[#9BDAF2] text-sm font-title transition-colors"
            >
              ← Back to {category}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ✅ Estilos reutilizados */}
      <style jsx>{`
        .glass-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 1rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          padding: 1.5rem;
          color: white;
        }
      `}</style>
    </motion.div>
  );
}
