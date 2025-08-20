// src/data/categories.js
export const categories = [
  {
    title: "Custom Jars",
    items: [
      { label: "Custom Labeled MIRON Jar", slug: "custom-labeled-miron-jar" },
      { label: "Custom Label ONLY for Miron Jar", slug: "custom-label-only-miron" },
      { label: "Custom Label for ULINE Jar", slug: "custom-label-uline" }
    ]
  },
  {
    title: "Custom Pouches",
    items: [
      { label: "Direct Print Pouches", slug: "direct-print-pouches" },
      { label: "Labeled Eighth Bag", slug: "labeled-eighth-bag" },
      { label: "Labeled Pound Bag", slug: "labeled-pound-bag" }
    ]
  },
  {
    title: "Custom Labels & Die Cuts",
    items: [
      { label: "Die Cut Stickers", slug: "die-cut-stickers" },
      { label: "Circle/Square Stickers", slug: "circle-square-stickers" }
    ]
  },
  {
    title: "Custom Accessories",
    items: [
      { label: "Custom Label for o2vape Traveler", slug: "custom-label-o2vape" },
      { label: "Custom Pre-Roll Tubes", slug: "custom-pre-roll-tubes" }
    ]
  }
];

// Mapa para acceso rápido desde el navbar
export const categoryMap = {
  "miron-jar": "custom-labeled-miron-jar",
  "miron-label-only": "custom-label-only-miron",
  "uline-jar": "custom-label-uline",
  "direct-print": "direct-print-pouches",
  "eighth-bag": "labeled-eighth-bag",
  "pound-bag": "labeled-pound-bag",
  "die-cut-stickers": "die-cut-stickers",
  "circle-square": "circle-square-stickers",
  "o2vape": "custom-label-o2vape",
  "pre-roll": "custom-pre-roll-tubes"
};