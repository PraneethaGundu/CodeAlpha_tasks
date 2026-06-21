import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);
  const [error, setError] = useState("");

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
        "/auth/register",
        form
      );

      alert(
        res.data.message ||
          "Registration successful"
      );

      setForm({
        username: "",
        email: "",
        password: "",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
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
                  className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white mb-3"
                  style={{
                    width: "70px",
                    height: "70px",
                    fontSize: "30px",
                  }}
                >
                  🚀
                </div>

                <h2 className="fw-bold mb-1">
                  Create Account
                </h2>

                <p className="text-muted mb-0">
                  Join SocialConnect today
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
                {/* Username */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Choose a username"
                    required
                  />
                </div>

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
                      placeholder="Create a password"
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

                {/* Register Button */}
                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 mt-2"
                  disabled={loading}
                >
                  {loading
                    ? "Creating Account..."
                    : "Register"}
                </button>

                {/* Back to Login */}
                <button
                  type="button"
                  className="btn btn-outline-primary w-100 mt-3 py-2"
                  onClick={() => navigate("/")}
                >
                  Back to Login
                </button>
              </form>

              <hr className="my-4" />

              <p className="text-center text-muted mb-0 small">
                Connect • Share • Grow
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;