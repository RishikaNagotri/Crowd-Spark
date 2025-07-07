import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './verifyOTP.css'; 
import Header from './Header';

function VerifyOTP() {
const location = useLocation();
const navigate = useNavigate();
const email = location.state?.email;
const username = location.state?.username;
const password = location.state?.password;
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const inputs = useRef([]);

  const handleChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');

    try {
      const res = await axios.post("http://localhost:3000/verify-otp", {
        email,
        otp: otpCode,
      });
      setMessage(res.data.message);
      setError('');
      setTimeout(() => navigate("/are-you-here",{state:{email,username , password}}), 2000);
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.error || 'Failed to verify OTP');
    }
  };

  const handleResend = async () => {
    try {
      const res = await axios.post("http://localhost:3000/resend-otp", { email });
      setMessage(res.data.message);
      setError('');
      setOtp(Array(6).fill(''));
      alert("Otp send to your email");
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.error || 'Failed to resend OTP');
    }
  };

  return (
    <>
    <Header/>
    <div className="verify-container">
      <div className="verify-card">
        <h2>Verify Your Email</h2>
        <p>Enter the 6-digit OTP sent to your email address</p>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => inputs.current[index] = el}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(index, e)}
                className="otp-input"
              />
            ))}
          </div>

          <button type="submit" className="verify-button">Verify OTP</button>
        </form>

        <p className="resend-text">
          Didn't receive OTP?{' '}
          <span onClick={handleResend} className="resend-link">Resend</span>
        </p>
      </div>
    </div>
    </>
  );
}

export default VerifyOTP;
