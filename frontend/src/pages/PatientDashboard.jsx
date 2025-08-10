import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PatientDashboard() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (!auth.token || auth.role !== "patient") {
      navigate("/login");
    }
  }, [auth, navigate]);

  const fetchSlots = () => {
    if (!auth.token || !fromDate || !toDate) return;
    axios
      .get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/slots?from=${fromDate}&to=${toDate}`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      )
      .then((res) => setSlots(res.data))
      .catch((err) => console.error(err));
  };

  const fetchMyBookings = () => {
    if (!auth.token) return;
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/my-bookings`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  };

  const handleBookSlot = (slotId) => {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/book`,
        { slotId },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      )
      .then(() => {
        alert("Slot booked successfully!");
        fetchSlots();
        fetchMyBookings();
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Booking failed");
      });
  };



  return (
    <div className="pd-container">
      <div className="pd-header">
        <h2>Patient Dashboard</h2>
      </div>

      {/* Date range picker */}
      <div className="pd-section">
        <h3>Search Available Slots</h3>
        <div className="pd-date-picker">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button className="pd-btn" onClick={fetchSlots}>
            Search
          </button>
        </div>
      </div>

      {/* Available Slots */}
      <div className="pd-section">
        <h3>Available Slots</h3>
        <ul className="pd-list">
          {slots.map((slot) => (
            <li key={slot._id} className="pd-item">
              <span>
                {new Date(slot.startAt).toLocaleString()} -{" "}
                {new Date(slot.endAt).toLocaleString()}
              </span>
              <button
                className="pd-btn pd-book"
                onClick={() => handleBookSlot(slot._id)}
              >
                Book
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* My Bookings */}
      <div className="pd-section">
        <h3>My Bookings</h3>
        <button className="pd-btn" onClick={fetchMyBookings}>
          Refresh My Bookings
        </button>
        <ul className="pd-list">
          {bookings.map((b) => (
            <li key={b._id} className="pd-item">
              Slot: {new Date(b.slot.startAt).toLocaleString()} -{" "}
              {new Date(b.slot.endAt).toLocaleString()} | Booked on:{" "}
              {new Date(b.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
