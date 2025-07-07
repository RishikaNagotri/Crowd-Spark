import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Viewmore.css';
import Header from '../Header'; 

function InvestorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [investor, setInvestor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
       const token = localStorage.getItem("token");
         if(!token){
           alert('log in to continue');
           navigate('/sign-in');
         }
    const fetchInvestor = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/founder/${id}`,
          { 
          headers: {
           Authorization: `Bearer ${token}`
          }
        }
        );
        setInvestor(data.investors); 
        setError(null);
      } catch (err) {
        console.error("Error fetching investor:", err);
        setError(err.response?.data?.message || 'Failed to fetch investor details');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestor();
  }, [id]);

  const handleBackClick = () => navigate(-1);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-card">
        <p>{error}</p>
        <button onClick={handleBackClick} className="back-btn">
          ← Back to List
        </button>
      </div>
    );
  }

  if (!investor) {
    return (
      <div className="not-found-card">
        <p>No investor found with this ID.</p>
        <button onClick={handleBackClick} className="back-btn">
          ← Back to List
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="founder-profile-container">
        <div className="founder-card">
          <div className="card-header">
            <h2 className="founder-name">{investor.username}</h2>
            <div className="verification-badge">
              {investor.verified ? '✓ Verified' : 'Unverified'}
            </div>
          </div>

          <div className="startup-info">
            <h3 className="startup-name">Investor Details</h3>
            
          </div>

          <div className="budget-section">
            <span className="budget-label">Budget:</span>
            <span className="budget-amount">${investor.budget}</span>
          </div>

          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>{investor.contact}</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>{investor.address}</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🔒</span>
              <span>Status: {investor.isLoggedIn ? "Online" : "Offline"}</span>
            </div>
          </div>

          <button onClick={handleBackClick} className="back-btn">
            ← Back to List
          </button>
        </div>
      </div>
    </>
  );
}

export default InvestorDetails;
