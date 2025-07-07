import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import "./Register.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { TextField } from '@mui/material';

function FounderRegister() {
  const navigate = useNavigate();
  const location = useLocation();
const initialEmail = location.state?.email || JSON.parse(localStorage.getItem("user"))?.email || "";
const initialUsername = location.state?.username || JSON.parse(localStorage.getItem("user"))?.username || "";
const initialPassword = location.state?.password || "";

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    contact: "",
    startupName: "",
    sector: "",
    requiredBudget: "",
    startupDescription: ""
  });
    useEffect(() => {
      setForm((prevForm) => ({
        ...prevForm,
        email: initialEmail,
        username: initialUsername,
        password: initialPassword,
      }));
    }, [initialEmail, initialUsername , initialPassword]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async () => {
    console.log("Sending data to server:", form); 
    try {
      const res = await axios.post("http://localhost:3000/founder/register", form);
      navigate("/founder/dashboard");
      alert(res.data.message);
    } catch (error) {
         console.error("Error response:", error.response);
      alert(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <>
      <Header />
      <div className="founder-register-container">
        <div className="founder-register-box">
          {/* Left Greeting Section */}
          <div className="founder-register-left">
            <h2 className="founder-register-left-content">Welcome Founder!</h2>
            <p className="founder-register-left-content">
              Startup crowdfunding empowers bold founders like you
              to bring innovative ideas to life and connect with supporters who believe in your vision.
            </p>
          </div>

          {/* Right Form Section */}
          <div className="founder-register-right">
            <h2>Registration</h2>

            <div className="founder-register-fields">
              <div className="field-group">
                <TextField
                  type="text"
                  label="Full Name"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>

              <div className="field-group">
                <TextField
                  type="text"
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </div>

              <div className="field-group">
                <TextField
                  type="password"
                  label="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </div>

              <div className="field-group">
                <TextField
                  type="text"
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>

              <div className="field-group">
                <TextField
                  type="text"
                  label="Contact No."
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>

              <div className="field-group">
                <TextField
                  type="text"
                  label="Startup Name"
                  name="startupName"
                  value={form.startupName}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>

              <div className="field-group">
                <TextField
                  type="text"
                  label="Startup Sector"
                  name="sector"
                  value={form.sector}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>

              <div className="field-group">
                <TextField
                  type="text"
                  label="Funding Required"
                  name="requiredBudget"
                  value={form.requiredBudget}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>

              <div className="field-group-full">
                <TextField
                  type="text"
                  label="Startup Description"
                  name="startupDescription"
                  value={form.startupDescription}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>

            {/* Register Button */}
            <div className="register-button" >
              <button className="register-btn" onClick={handleSubmit}>Register</button>
            </div>

            {/* Sign-in Redirect */}
            <p className="signin-redirect">
              Already have an account?{" "}
              <Link to="/sign-in">Sign-in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FounderRegister;
