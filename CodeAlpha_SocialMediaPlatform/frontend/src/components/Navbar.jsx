import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded shadow px-3 mb-4">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-4" to="/home">
          🌐 SocialConnect
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarContent"
        >
          {/* Left Links */}
          <div className="navbar-nav ms-auto me-3">
            <Link
              to="/home"
              className={`nav-link px-3 ${
                isActive("/home") ? "fw-bold text-warning" : ""
              }`}
            >
              🏠 Home
            </Link>

            <Link
              to="/profile"
              className={`nav-link px-3 ${
                isActive("/profile") ? "fw-bold text-warning" : ""
              }`}
            >
              👤 Profile
            </Link>

            <Link
              to="/users"
              className={`nav-link px-3 ${
                isActive("/users") ? "fw-bold text-warning" : ""
              }`}
            >
              👥 Users
            </Link>
          </div>

          {/* Logout */}
          <div className="d-flex">
            <button
              className="btn btn-danger px-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;