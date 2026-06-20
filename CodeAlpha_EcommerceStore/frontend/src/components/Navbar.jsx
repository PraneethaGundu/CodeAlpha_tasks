import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <h2 className="logo">ShopEase</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/cart">
          Cart ({cart.length})
        </Link>

        <Link to="/orders"
         className="nav-link">
          Orders
         </Link>
        
        <Link
          to="/profile"
          style={{color: "white",textDecoration: "none",}}>
          Profile
        </Link>

        {token && user && (
          <span
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Welcome, {user.name}
          </span>
        )}

        {token ? (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;