// src/components/ProductSidebar.jsx
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ⚠️ Usamos las MISMAS keys de categoría y productId que en products.js y en el Navbar
const categories = [
  {
    title: "Custom Jars",
    key: "CustomJars",
    items: [
      { label: "Custom Labeled MIRON Jar", id: "custom-labeled-miron-jar" },
      { label: "Custom Label ONLY for Miron Jar", id: "custom-label-only-miron" },
      { label: "Custom Label for ULINE Jar", id: "custom-label-uline" },
    ],
  },
  {
    title: "Custom Pouches",
    key: "CustomPouches",
    items: [
      { label: "Direct Print Pouches", id: "direct-print-pouches" },
      { label: "Labeled Eighth Bag", id: "labeled-eighth-bag" },
      { label: "Labeled Pound Bag", id: "labeled-pound-bag" },
    ],
  },
  {
    title: "Custom Labels & Die Cuts",
    key: "CustomLabelsDieCuts",
    items: [
      { label: "Die Cut Stickers", id: "die-cut-stickers" },
      { label: "Circle/Square Stickers", id: "circle-square-stickers" },
    ],
  },
  {
    title: "Custom Accessories",
    key: "CustomAccessories",
    items: [
      { label: "Custom Label for o2vape Traveler", id: "custom-label-o2vape" },
      { label: "Custom Pre-Roll Tubes", id: "custom-pre-roll-tubes" },
    ],
  },
];

export default function ProductSidebar() {
  const [openCategories, setOpenCategories] = useState({});
  const navigate = useNavigate();

  const toggleCategory = (title) => {
    setOpenCategories((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // ✅ Igual que en el Navbar: navegamos a /products/:category/:productId
  const goToProduct = (categoryKey, productId) => {
    navigate(`/products/${categoryKey}/${productId}`);
  };

  // (Opcional) Ir a la página de la categoría completa
  const goToCategory = (categoryKey) => {
    navigate(`/products/${categoryKey}`);
  };

  return (
    <aside className="sidebar-container">
      <h2 className="sidebar-title">CATEGORIES</h2>
      <nav className="sidebar-nav">
        {categories.map((cat) => {
          const isOpen = openCategories[cat.title] ?? false;

          return (
            <div key={cat.title} className="category-container">
              {/* Título de categoría: toggle + ir a la categoría con click secundario */}
              <div className="category-header">
                <button
                  onClick={() => toggleCategory(cat.title)}
                  className="category-button"
                  aria-expanded={isOpen}
                  aria-controls={`panel-${cat.key}`}
                >
                  <span>{cat.title}</span>
                  {isOpen ? (
                    <ChevronDown className="icon" />
                  ) : (
                    <ChevronRight className="icon" />
                  )}
                </button>

                <button
                  className="view-all"
                  onClick={() => goToCategory(cat.key)}
                  title="Ver todos"
                >
                  View all →
                </button>
              </div>

              {/* Items con animación */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul
                    id={`panel-${cat.key}`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="items-list"
                  >
                    {cat.items.map((item) => (
                      <li key={item.id}>
                        <button
                          className="item"
                          onClick={() => goToProduct(cat.key, item.id)}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      <style jsx>{`
        .sidebar-container {
          width: 300px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 1rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          padding: 1.5rem;
          color: white;
          display: none;
          margin-top: 4.5rem;
          height: fit-content;
        }

        @media (min-width: 768px) {
          .sidebar-container {
            display: block;
          }
        }

        .sidebar-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          font-family: 'Title Font', sans-serif;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .category-container {
          overflow: hidden;
        }

        .category-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .category-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex: 1;
          font-weight: 600;
          color: #9Bdaf2;
          transition: color 0.2s;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-family: inherit;
          font-size: inherit;
          text-align: left;
        }

        .category-button:hover {
          color: white;
        }

        .view-all {
          background: transparent;
          border: none;
          color: #d1d5db;
          font-size: 0.85rem;
          cursor: pointer;
          padding: 0;
        }
        .view-all:hover {
          color: #9bdaf2;
          text-decoration: underline;
        }

        .icon {
          width: 1rem;
          height: 1rem;
        }

        .items-list {
          margin-left: 1rem;
          margin-top: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #d1d5db;
          overflow: hidden;
        }

        .item {
          background: none;
          border: none;
          color: #d1d5db;
          padding: 0;
          text-align: left;
          cursor: pointer;
          transition: color 0.2s;
          font-size: inherit;
          font-family: inherit;
        }

        .item:hover {
          color: #9bdaf2;
        }
      `}</style>
    </aside>
  );
}
