// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Model3D from "./components/Model3D";
import PageTransition from "./components/PageTransition";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  const [pageReady, setPageReady] = useState(true);

  return (
    <Router>
      <Navbar />
      <Model3D /> {/* ✅ El modelo siempre está activo */}
      <PageTransition setPageReady={setPageReady} />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage pageReady={pageReady} />} />
          <Route path="/about" element={<AboutPage pageReady={pageReady} />} />
          
          {/* Ruta para la página de productos, aceptando una categoría dinámica */}
          <Route path="/products/:category" element={<ProductsPage pageReady={pageReady} />} />
          
          {/* Si solo quieres que la ruta /products también funcione sin categoría */}
          <Route path="/products" element={<ProductsPage pageReady={pageReady} />} />
        </Routes>
      </div>
    </Router>
  );
}
