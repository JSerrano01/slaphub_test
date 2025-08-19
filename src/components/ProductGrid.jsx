import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RotatingModel from "./RotatingModel";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const categories = {
  CustomJars: [
    {
      title: "Custom Labeled MIRON Jar",
      desc: "An official MIRON customizer and retailer. Perfectly labeled MIRON Violetglass jars, available in any finish.",
      modelPath: "/models/soda_can_2.glb",
    },
    {
      title: "Custom Label ONLY for Miron Jar",
      desc: "Perfectly labeled MIRON Violetglass jars, available in any finish.",
      modelPath: "/models/soda_can_2.glb",
    },
    {
      title: "Custom Label for ULINE Jar",
      desc: "Custom Uline Glass Jar Labels. Multiple sizes available. Perfect fit with Uline® Jars.",
      modelPath: "/models/soda_can_2.glb",
    }
  ],
  CustomPouches: [
    {
      title: "Direct Print Pouches",
      desc: "For square and rectangle pouches. Full color print/full pouch printing. Several finishes available.",
      modelPath: "/models/soda_can_2.glb",
    },
    {
      title: "Labeled Eighth Bag",
      desc: "Best for smaller quantities/runs, or fastest turn-around. Customize your eighth pouch design with any label material and finish.",
      modelPath: "/models/soda_can_2.glb",
    },
    {
      title: "Labeled Pound Bag",
      desc: "Best for smaller quantities/runs, or fastest turn-around. Customize your pound pouch design with any label material and finish.",
      modelPath: "/models/soda_can_2.glb",
    }
  ],
  CustomLabelsDieCuts: [
    {
      title: "Die Cut Stickers",
      desc: "Die cut stickers have custom contour cuts to the shape of your design. Size is measured by the largest dimension in inches.",
      modelPath: "/models/soda_can_2.glb",
    },
    {
      title: "Circle/Square Stickers",
      desc: "Customize your own circular/square sticker with SlapHub! Multiple finishes and options available.",
      modelPath: "/models/soda_can_2.glb",
    }
  ],
  CustomAccessories: [
    {
      title: "Custom Label for o2vape Traveler",
      desc: "Fits o2vape Traveler Extreme®.",
      modelPath: "/models/soda_can_2.glb",
    },
    {
      title: "Custom Pre-Roll Tubes",
      desc: "Customize your own PLASTIC POP TOP pre-roll tubes with our design tool.",
      modelPath: "/models/soda_can_2.glb",
    }
  ]
};

export default function ProductGrid({ category }) {
  const [products, setProducts] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    if (category) {
      setProducts(categories[category] || []);
      setShowCategories(false);
    } else {
      setShowCategories(true);
    }
  }, [category]);

  if (showCategories) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 flex-1 max-w-7xl mx-auto mt-18">
        {Object.keys(categories).map((categoryKey) => (
          <div
            key={categoryKey}
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
          >
            <div className="h-64 w-full">
              {/* Modelo 3D para la categoría */}
              <Canvas camera={{ position: [6, 1, 5] }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} />
                <RotatingModel modelPath="/models/soda_can_2.glb" scale={15} />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </div>
            <h3 className="mt-6 text-[#9BDAF2] font-bold text-lg text-center">
              {categoryKey.replace(/([A-Z])/g, " $1").trim()}
            </h3>
            <p className="mt-3 text-sm text-gray-300 text-center">
              Click to view products in this category.
            </p>
            <Link
              to={`/products/${categoryKey}`}
              className="mt-4 bg-[#2A2D40] hover:bg-[#9BDAF2] px-6 py-2 rounded-full text-[#9BDAF2] hover:text-[#2A2D40] text-sm font-title transition-colors"
            >
              View products →
            </Link>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 flex-1 max-w-7xl mx-auto mt-8">
      {products.map((p) => (
        <div
          key={p.title}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300"
        >
          {/* Modelo 3D para el producto */}
          <div className="h-64 w-full">
            <Canvas camera={{ position: [6, 1, 5] }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} />
              <RotatingModel modelPath={p.modelPath} scale={15} />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>

          {/* Product Info */}
          <h3 className="mt-6 text-[#9BDAF2] font-bold text-lg text-center">
            {p.title}
          </h3>
          <p className="mt-3 text-sm text-gray-300 text-center">{p.desc}</p>

          {/* Button */}
          <button className="mt-4 bg-[#2A2D40] hover:bg-[#9BDAF2] px-6 py-2 rounded-full text-[#9BDAF2] hover:text-[#2A2D40] text-sm font-title transition-colors">
            View details →
          </button>
        </div>
      ))}
    </div>
  );
}
