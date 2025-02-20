import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Make sure this file includes the styles

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/doctors/login", {
        email,
        password,
      });

      if (response.data.message === "Login successful") {
        // Save the token and doctorId to localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("doctorId", response.data.doctorId);

        // Redirect to the appointments page
        navigate("/appointments");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="fs-container">
      <div className="card">
        <h2>Doctor Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-text"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
              required
            />
          </div>
          <button type="submit" className="primary-button">
            Login
          </button>
        </form>
        <p style={{ marginTop: '8px' }}>
          Don't have an account? <a href="/register">Register here</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
