
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Viewmore.css';
import Header from '../Header';

function FounderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [founder, setFounder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  useEffect(() => {
     const token = localStorage.getItem("token");
         if(!token){
           alert('log in to continue');
           navigate('/sign-in');
         }
    const fetchFounder = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/investor/${id}`,
          { 
          headers: {
           Authorization: `Bearer ${token}`
          }
        }
        );

        setFounder(data.founders);
        setError(null);
      } catch (err) {
        console.error("Error fetching founder:", err);
        setError(err.response?.data?.message || 'Failed to fetch founder details');
      } finally {
        setLoading(false);
      }
    };

    fetchFounder();
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

  if (!founder) {
    return (
    
      <div className="not-found-card">
        <p>No founder found with this ID.</p>
        <button onClick={handleBackClick} className="back-btn">
          ← Back to List
        </button>
      </div>
    );
  }

  return (
      <>
      <Header/>
    <div className="founder-profile-container">
      <div className="founder-card">
        <div className="card-header">
          <h2 className="founder-name">{founder.username}</h2>
          <div className="verification-badge">
            {founder.verified ? '✓ Verified' : 'Unverified'}
          </div>
        </div>

        <div className="startup-info">
          <h3 className="startup-name">{founder.startupName}</h3>
          <span className="sector-tag">{founder.sector}</span>
        </div>

        <div className="budget-section">
          <span className="budget-label">Funding Required:</span>
          <span className="budget-amount">${founder.requiredBudget.toLocaleString()}</span>
        </div>

        <div className="description-box">
          <p>{founder.startupDescription || "No description provided."}</p>
        </div>

        <div className="contact-details">
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <span>{founder.contact}</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <span>{founder.address}</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">🔒</span>
            <span>Status: {founder.isLoggedIn ? "Online" : "Offline"}</span>
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

export default FounderDetails;