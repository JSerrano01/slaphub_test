import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    title: "Custom Jars",
    items: [
      "Custom Labeled MIRON Jar",
      "Custom Label ONLY for Miron Jar",
      "Custom Label for ULINE Jar",
    ],
  },
  {
    title: "Custom Pouches",
    items: [
      "Direct Print Pouches",
      "Labeled Eighth Bag",
      "Labeled Pound Bag",
    ],
  },
  {
    title: "Custom Labels & Die Cuts",
    items: ["Die Cut Stickers", "Circle/Square Stickers"],
  },
  {
    title: "Custom Accessories",
    items: ["Custom Label for o2vape Traveler", "Custom Pre-Roll Tubes"],
  },
];

export default function ProductSidebar() {
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (title) => {
    setOpenCategories((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside className="sidebar-container">
      <h2 className="sidebar-title">CATEGORIES</h2>
      <nav className="sidebar-nav">
        {categories.map((cat) => {
          const isOpen = openCategories[cat.title] ?? false;

          return (
            <div key={cat.title} className="category-container">
              {/* Category Title */}
              <button
                onClick={() => toggleCategory(cat.title)}
                className="category-button"
              >
                <span>{cat.title}</span>
                {isOpen ? (
                  <ChevronDown className="icon" />
                ) : (
                  <ChevronRight className="icon" />
                )}
              </button>

              {/* Items con animación */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="items-list"
                  >
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="item"
                      >
                        {item}
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
          height: fit-content; /* Esto hace que la altura se ajuste al contenido */
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
        
        .category-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          font-weight: 600;
          color: #9BDAF2;
          transition: color 0.2s;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-family: inherit;
          font-size: inherit;
        }
        
        .category-button:hover {
          color: white;
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
          color: #D1D5DB;
          overflow: hidden;
        }
        
        .item {
          transition: color 0.2s;
          cursor: pointer;
        }
        
        .item:hover {
          color: #9BDAF2;
        }
      `}</style>
    </aside>
  );
}