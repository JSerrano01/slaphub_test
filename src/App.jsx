import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Model3D from "./components/Model3D";
import PageTransition from "./components/PageTransition";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Model3D />
      <PageTransition /> {/* <-- aquí va */}
      <div className="relative z-10 pt-16 space-y-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
