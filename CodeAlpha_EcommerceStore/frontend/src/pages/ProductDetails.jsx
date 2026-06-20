import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/authApi";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <div className="home-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="details-container">
      <img
        src={product.image}
        alt={product.name}
        className="details-image"
      />

      <div className="details-info">
        <h1>{product.name}</h1>

        <h2 className="price">
          ₹{product.price}
        </h2>

        <p
          style={{
            lineHeight: "1.8",
            marginTop: "15px",
            marginBottom: "25px",
          }}
        >
          {product.description}
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            className="btn btn-secondary"
            onClick={() => {
              addToCart(product);
              alert("Product Added To Cart");
            }}
          >
            Add To Cart
          </button>

          <Link to="/">
            <button className="btn btn-primary">
              Back To Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;