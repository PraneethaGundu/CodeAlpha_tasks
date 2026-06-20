import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded shadow px-3 mb-4">
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold"
          to="/home"
        >
          🌐 SocialConnect
        </Link>

        <div>
          <Link
            to="/home"
            className="btn btn-outline-light me-2"
          >
            🏠 Home
          </Link>

          <Link
            to="/profile"
            className="btn btn-outline-light me-2"
          >
            👤 Profile
          </Link>

          <Link
            to="/users"
            className="btn btn-outline-light me-2"
          >
            👥 Users
          </Link>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;