// pages/ProductDetailPage.jsx
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductSidebar from "../components/ProductSidebar";
import ProductDetail from "../components/ProductDetail";
import RelatedProducts from "../components/RelatedProducts";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

// Datos de ejemplo (puedes reemplazarlo con datos reales o API)
const productsData = {
  "custom-labeled-miron-jar": {
    title: "Custom Labeled MIRON Jar",
    desc: "An official MIRON customizer and retailer. Perfectly labeled MIRON Violetglass jars, available in any finish.",
    price: 350,
    sizes: ["5ML", "150ML", "250ML", "500ML"],
    modelPath: "/models/soda_can_2.glb",
    relatedProducts: [
      { title: "Labeled Eighth Bag", image: "/images/product1.jpg", id: "labeled-eighth-bag" },
      { title: "Die Cut Stickers", image: "/images/product2.jpg", id: "die-cut-stickers" }
    ]
  },
  // Puedes agregar más productos aquí
};

export default function ProductDetailPage({ pageReady }) {
  const { productId } = useParams(); // Obtenemos el ID del producto desde la URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Cargar los datos del producto basado en el `productId`
    if (productsData[productId]) {
      setProduct(productsData[productId]);
    }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>; // O puedes mostrar un mensaje si no se encuentra el producto
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={pageReady ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 pt-16 space-y-16"
    >
      {/* Layout principal */}
      <div className="max-w-7xl mx-auto px-6 flex gap-10">
        <ProductSidebar />
        <ProductDetail product={product} />
      </div>

      <RelatedProducts related={product.relatedProducts} />

      <Footer />
    </motion.div>
  );
}
