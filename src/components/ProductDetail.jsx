// ProductDetail.jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RotatingModel from "./RotatingModel";

export default function ProductDetail({ product }) {
  return (
    <div className="product-detail-container">
      <div className="product-model">
        <Canvas camera={{ position: [6, 1, 5] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} />
          <RotatingModel modelPath={product.modelPath} scale={15} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <div className="product-info">
        <h1>{product.title}</h1>
        <p>{product.desc}</p>

        <h3>Price</h3>
        <p>{`$${product.price}`}</p>

        <h3>Size</h3>
        <select>
          {product.sizes.map((size) => (
            <option key={size}>{size}</option>
          ))}
        </select>

        <h3>Quantity</h3>
        <input type="number" defaultValue="1" min="1" />

        <h3>Finish</h3>
        <select>
          <option value="matte">Matte</option>
          <option value="holographic">Holographic</option>
        </select>

        <h3>Label Material</h3>
        <select>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>

        <button className="upload-design-btn">Upload Design</button>
      </div>
    </div>
  );
}
