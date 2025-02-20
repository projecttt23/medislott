import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
    hospital: {
      name: "",
      address: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
    },
    photo: "",
    keywords: [],
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("hospital.")) {
      const hospitalField = name.split(".")[1];
      setFormData({
        ...formData,
        hospital: {
          ...formData.hospital,
          [hospitalField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/doctors/register", formData);

      if (response.data.message === "Doctor registered successfully") {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="fs-container">
      <div className="card scrollable-container">
        <h2>Doctor Registration</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Hospital Name</label>
            <input
              type="text"
              name="hospital.name"
              value={formData.hospital.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Hospital Address</label>
            <input
              type="text"
              name="hospital.address"
              value={formData.hospital.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Hospital Area</label>
            <input
              type="text"
              name="hospital.area"
              value={formData.hospital.area}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Hospital City</label>
            <input
              type="text"
              name="hospital.city"
              value={formData.hospital.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Hospital State</label>
            <input
              type="text"
              name="hospital.state"
              value={formData.hospital.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Hospital Pincode</label>
            <input
              type="text"
              name="hospital.pincode"
              value={formData.hospital.pincode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Photo URL (Optional)</label>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Keywords (Comma Separated)</label>
            <input
              type="text"
              name="keywords"
              value={formData.keywords.join(",")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  keywords: e.target.value.split(","),
                })
              }
              required
            />
          </div>

          <button type="submit" className="primary-button">
            Register
          </button>
        </form>

        <p>
          Already have an account? <a href="/login">Login here</a>.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
