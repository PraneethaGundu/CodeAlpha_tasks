import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await API.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");
      navigate("/home");
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #667eea, #764ba2)",
      }}
    >
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 col-lg-4">
          <div
            className="card shadow-lg border-0"
            style={{
              borderRadius: "20px",
            }}
          >
            <div className="card-body p-4 p-md-5">
              {/* Header */}
              <div className="text-center mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white mb-3"
                  style={{
                    width: "70px",
                    height: "70px",
                    fontSize: "30px",
                  }}
                >
                  🌐
                </div>

                <h2 className="fw-bold mb-1">
                  SocialConnect
                </h2>

                <p className="text-muted mb-0">
                  Welcome back! Login to continue
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger py-2">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Password
                  </label>

                  <div className="input-group">
                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your password"
                      required
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mt-2"
                  disabled={loading}
                >
                  {loading
                    ? "Logging in..."
                    : "Login"}
                </button>

                {/* Register Button */}
                <button
                  type="button"
                  className="btn btn-outline-success w-100 mt-3 py-2"
                  onClick={() =>
                    navigate("/register")
                  }
                >
                  Create Account
                </button>
              </form>

              <hr className="my-4" />

              <p className="text-center text-muted mb-0 small">
                Connect • Share • Follow
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;