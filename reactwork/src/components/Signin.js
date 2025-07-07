import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./Signin.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Divider, Button } from "@mui/material";
import { auth } from "../firebase";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [googleBtnLoading, setGoogleBtnLoading] = useState(false);  // <-- Added loading state

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:3000/sign-in", {
        email,
        password,
      });

      const { userType, user, token } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userType", userType);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("token", token);

      if (userType === "founder") {
        navigate("/founder/dashboard");
      } else if (userType === "investor") {
        navigate("/investor/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Sign in failed");
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleBtnLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      const idToken = await googleUser.getIdToken();

      const response = await axios.post("http://localhost:3000/google-login", {
        token: idToken,
      });

      const { userType, user, token } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userType", userType);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("token", token);

      if (userType === "founder") {
        navigate("/founder/dashboard");
      } else if (userType === "investor") {
        navigate("/investor/dashboard");
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed");
    } finally {
      setGoogleBtnLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="signin-container">
        <div className="signin-card d-flex">
          <div className="signin-welcome">
            <h2>WELCOME BACK!</h2>
            <p>
              Sign in to continue your journey as an investor, support
              innovative startups, and grow your impact.
            </p>
          </div>

          <div className="signin-form">
            <h3 className="signin-title">Sign in</h3>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="input-icon">
              <span className="icon">👤</span>
              <input
                type="text"
                placeholder="Email"
                className="signin-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-icon">
              <span className="icon">🔒</span>
              <input
                type="password"
                placeholder="Password"
                className="signin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="extra-options">
              <div className="forgot-password-link">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </div>

            <button className="signin-btn btn btn-primary" onClick={handleSignIn}>
              Sign in
            </button>

            <Divider sx={{ my: 2 }}>or</Divider>

            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleGoogleLogin}
              disabled={googleBtnLoading}
              startIcon={
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="google"
                  style={{ width: 20, height: 20 }}
                />
              }
            >
              Sign in with Google
            </Button>

            <p className="register-text">
              Don't have an account?{" "}
              <Link to="/sign-up" className="register-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
