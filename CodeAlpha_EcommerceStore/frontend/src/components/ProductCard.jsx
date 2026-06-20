import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  console.log(product.name,product.image);
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-content">
        <h3>{product.name}</h3>

        <p className="price">
          ₹{product.price}
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          <button
            className="btn btn-secondary"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>

          <Link to={`/product/${product._id}`}>
            <button className="btn btn-primary">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}


export default ProductCard;