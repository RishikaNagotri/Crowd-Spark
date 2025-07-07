
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./Forgotpassword.css";

function Forgotpassword() {
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    const { email, newPassword, confirmPassword } = form;

    if (!email || !newPassword || !confirmPassword) {
      return setError("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const response = await axios.post("http://localhost:3000/forgot-password", {
        email,
        newPassword,
        confirmPassword,
      });

      setSuccess(response.data.message);
      setTimeout(() => navigate("/sign-in"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <div className="forgot-container">
        <div className="forgot-card d-flex">
          <div className="forgot-left">
            <h2>NEED A FRESH START?</h2>
            <p>
              Enter your new password and regain access in seconds.
              <br />
              We're here to help you move forward.
            </p>
          </div>

          <div className="forgot-right">
            <h3 className="forgot-title">Reset Password</h3>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <div className="input-icon">
              <span className="icon">📧</span>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="forgot-input"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-icon">
              <span className="icon">🔒</span>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter New Password"
                className="forgot-input"
                value={form.newPassword}
                onChange={handleChange}
              />
            </div>

            <div className="input-icon">
              <span className="icon">🔒</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="forgot-input"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button className="forgot-btn btn btn-primary" onClick={handleSubmit}>
              Set Password
            </button>

            <p className="back-to-signin">
              Go back to <Link to="/sign-in">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forgotpassword;
