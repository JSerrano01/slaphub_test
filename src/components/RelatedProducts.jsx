// RelatedProducts.jsx
import { Link } from "react-router-dom";

export default function RelatedProducts({ related }) {
  return (
    <div className="related-products">
      <h3>Related Products</h3>
      <div className="product-cards">
        {related.map((product) => (
          <div key={product.title} className="product-card">
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <Link to={`/products/${product.id}`}>View Product</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

<style jsx>{`
  .related-products {
    margin-top: 3rem;
  }

  .product-cards {
    display: flex;
    gap: 1rem;
  }

  .product-card {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 1rem;
    max-width: 200px;
    text-align: center;
  }

  .product-card img {
    width: 100%;
    height: auto;
    border-radius: 0.75rem;
  }

  .product-card h4 {
    color: #fff;
    font-size: 1.25rem;
    margin-top: 1rem;
  }

  .product-card a {
    display: block;
    margin-top: 0.5rem;
    color: #9bdaef;
    font-weight: bold;
  }

  .product-card a:hover {
    text-decoration: underline;
  }
`}</style>
