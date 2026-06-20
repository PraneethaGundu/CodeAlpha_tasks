import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

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
      alert("Login Failed");
      console.log(error);
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
        <div className="col-md-5 col-lg-4">
          <div
            className="card shadow-lg border-0"
            style={{
              borderRadius: "20px",
            }}
          >
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h1>🌐</h1>

                <h2 className="fw-bold">
                  SocialConnect
                </h2>

                <p className="text-muted">
                  Welcome Back
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    Email
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

                <div className="mb-4">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading
                    ? "Logging in..."
                    : "Login"}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-success w-100 mt-3"
                  onClick={() =>
                    navigate("/register")
                  }
                >
                  Create Account
                </button>
              </form>

              <hr />

              <p className="text-center text-muted mb-0">
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