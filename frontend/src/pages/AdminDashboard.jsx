import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!auth.token || auth.role !== "admin") {
      navigate("/login");
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (!auth.token) return;

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/all-bookings`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, [auth.token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="ad-wrap">
      <h2 className="ad-title">Admin Dashboard</h2>
      <h3 className="ad-subtitle">All Bookings</h3>
      {bookings.length === 0 ? (
        <p className="ad-empty">No bookings found</p>
      ) : (
        <ul className="ad-list">
          {bookings.map((booking) => (
            <li key={booking._id} className="ad-item">
              <strong>Patient:</strong> {booking.user?.name} (
              {booking.user?.email}) <br />
              <strong>Slot:</strong>{" "}
              {new Date(booking.slot?.startAt).toLocaleString()} -{" "}
              {new Date(booking.slot?.endAt).toLocaleString()} <br />
              <strong>Booked On:</strong>{" "}
              {new Date(booking.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
