import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token) {
      if (auth.role === "patient") {
        navigate("/patient");
      } else if (auth.role === "admin") {
        navigate("/admin");
      }
    }
  }, [auth, navigate]);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          email,
          password,
        }
      );
      login(res.data.token, res.data.role);
      navigate(res.data.role === "patient" ? "/patient" : "/admin");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">ClinicCare Login</h2>
      <input
        className="login-input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="login-input"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
