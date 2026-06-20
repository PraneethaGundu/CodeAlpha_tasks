import { useState } from "react";
import API from "../api/authApi";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/register",
        formData
      );

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);

      console.log(error.response);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn btn-primary"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;