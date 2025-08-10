import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (auth.token) {
      if (auth.role === "patient") {
        navigate("/patient");
      } else if (auth.role === "admin") {
        navigate("/admin");
      }
    }
  }, [auth, navigate]);

  const handleRegister = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, {
        name,
        email,
        password,
      });
      alert("Registered successfully, please login");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create Your ClinicCare Account</h2>
      <input
        className="register-input"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="register-input"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="register-input"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="register-btn" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}
