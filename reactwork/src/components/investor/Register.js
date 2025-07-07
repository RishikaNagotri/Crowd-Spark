

import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import "./Register.css";
import { useState ,  useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { TextField } from '@mui/material';

function Investorregister() {
  const navigate = useNavigate();
  const location = useLocation();
const initialEmail = location.state?.email || "";
const initialUsername = location.state?.username || "";
const initialPassword = location.state?.password || "";
 const [form, setForm] = useState({
  username: "",
  email:"",
  password: "",
  budget: "",
  address: "",
  contact: ""
});
  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      email: initialEmail,
      username: initialUsername,
      password: initialPassword
    }));
  }, [initialEmail, initialUsername, initialPassword]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/investor/register", form);
      navigate("/investor/dashboard"); 
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <>
      <Header />
      <div className="register-container">
        <div className="register-card">
          <div className="register-left">
            <h1 className="register-left-content">Welcome Investor!</h1>
            <p className="register-left-content">Join our investor community and empower startups.<br />
              Connect with passionate founders and shape the future.<br />
              Discover, invest, and grow with innovative minds.</p>
          </div>
          <div className="register-right">
            <h2>Create An Account</h2>
            <div className="register-form">
              <TextField
                type="text"
                label="Full Name"
                name="username"
                value={form.username}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                type="email"
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                 disabled
              />
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
              <TextField
                type="text"
                label="Budget"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                type="text"
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                type="text"
                label="Contact No."
                name="contact"
                value={form.contact}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <button onClick={handleSubmit}>Register</button>
              <p>Already have an account? <Link to="/sign-in">Sign In</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Investorregister;