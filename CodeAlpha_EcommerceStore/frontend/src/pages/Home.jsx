import { useEffect, useState } from "react";
import API from "../api/authApi";
import ProductCard from "../components/ProductCard";

function Home() {
  
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1 className="home-title">
        Our Products
      </h1>

      <input
        type="text"
        placeholder="Search Products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="search-box"
      />

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <h3>No Products Found</h3>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;