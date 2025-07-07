
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./Signup.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Divider, Button } from "@mui/material";
import { auth } from "../firebase";

function Signup() {
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:3000/sign-up", {
        username,
        email,
        password,
      });
        navigate("/verify-otp", { state: { email ,username ,password} }); 
        alert ("Sign up successful ! OTP sent to your email.")
        
        setName("");
         setEmail("");
          setPassword("");
    } catch (err) {
      setError(err.response?.data?.error || "Sign up failed");
    }
  };
  const handleGoogleLogin= async () => {
      
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
      } 
    };

  return (
    <>
      <Header />
      <div className="signup-container">
        <div className="signup-card d-flex">
         
          <div className="signup-welcome">
            <h2>WELCOME !</h2>
            <p>
              Sign up to start your journey as an investor, support
              innovative startups, and grow your impact.
            </p>
          </div>

          <div className="signup-form">
            <h3 className="signup-title">Sign up</h3>

            {error && <p style={{ color: "red" }}>{error}</p>}

                 <div className="input-icon">
              <span className="icon">👤</span>
              <input
                type="text"
                placeholder="Full Name"
                className="signup-input"
                value={username}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-icon">
              <span className="icon">📩</span>
              <input
                type="text"
                placeholder="Email"
                className="signup-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-icon">
              <span className="icon">🔒</span>
              <input
                type="password"
                placeholder="Password"
                className="signup-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>


            <button className="signup-btn btn btn-primary" onClick={handleSignUp}>
              Sign up
            </button>

            <div className="divider">Or</div>
         
                     <Button
                       variant="outlined"
                       color="secondary"
                       fullWidth
                       onClick={handleGoogleLogin}
                      
                       startIcon={
                         <img
                           src="https://developers.google.com/identity/images/g-logo.png"
                           alt="google"
                           style={{ width: 20, height: 20}}
                         />
                       }
                     >
                       Sign in with Google
                     </Button>

            <p className="register-text">
              Already have an account?{" "}
              <Link to="/sign-in" className="register-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
