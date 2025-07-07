// src/InvestorProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import './Profile.css';
import Header from '../Header';

const InvestorProfile = ({ }) => {
    const { id } = useParams(); 
      const navigate = useNavigate();
  const [investor, setInvestor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
const [formData, setFormData] = useState({
  username: '',
  contact: '',
  budget: '',
  address: '',
  email: '',
  occupation: '',
  sectorsofinterest: ''
});

  

useEffect(() => {
       const token = localStorage.getItem("token");
         if(!token){
           alert('log in to continue');
           navigate('/sign-in');
             return;
         }
  console.log("Received ID:", id); 
  const fetchInvestor = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/investor/getprofile/${id}`,
                 { 
          headers: {
           Authorization: `Bearer ${token}`
          }
        }
        
      );
      console.log("API Response:", response.data);
      setInvestor(response.data.investor);
      setFormData(response.data.investor);
    } catch (error) {
      console.error("Error fetching investor profile:", error);
    }
  };

  fetchInvestor();
}, [id]);



  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.put(`http://localhost:3000/investor/editprofile/${id}`, formData);
    setInvestor(response.data.investor); // update state with response
    setIsEditing(false);
    alert('Profile updated successfully!');
  } catch (error) {
    console.error("Error updating profile:", error);
    alert('Failed to update profile');
  }
};


  const handleCancel = () => {
    setIsEditing(false);
    setFormData(investor);
  };

  if (!investor) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  // Get initials from username
  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  return (
    <><Header/>
    <div className='main'>
    <div className="profile-container">
      <div className="profile-background">
        {/* Background image placeholder */}
      </div>
      
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-initials">{getInitials(investor.username)}</div>
        </div>
        
        <div className="profile-info">
          <h1 className="profile-name">{investor.username}</h1>
          <p className="profile-email">{investor.email}</p>
        </div>
      </div>
    
      
      <div className="profile-content">
        {isEditing ? (
          <form className="edit-form" onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Contact</label>
              <input 
                type="text" 
                name="contact" 
                value={formData.contact} 
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Budget Range</label>
              <input 
                type="text" 
                name="budget" 
                value={formData.budget} 
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="form-group">
  <label>Occupation</label>
  <input 
    type="text" 
    name="occupation" 
    value={formData.occupation} 
    onChange={handleChange}
  />
</div>

<div className="form-group">
  <label>Sectors of Interest</label>
  <input 
    type="text" 
    name="sectorsofinterest" 
    value={formData.sectorsofinterest} 
    onChange={handleChange}
  />
</div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details" style={{marginLeft:"30px",gap:"100px"}}>
            <div className="detail-section">
              <h3>Contact Information</h3>
              <p><strong>Phone:</strong> {investor.contact}</p>
              <p><strong>Email:</strong> {investor.email}</p>
              <p><strong>Address:</strong> {investor.address}</p>
            </div>
            
            <div className="detail-section" >
              <h3>Investment Preferences</h3>
              <p><strong>Budget Range:</strong> {investor.budget}</p>
              <p><strong>Occupation:</strong> {investor.occupation || "N/A"}</p>
              <p><strong> Sectors of Interest:</strong> {investor. sectorsofinterest || "N/A"}</p>
            </div>
            
        
        
        <div className='ebtn'>
          <button className="edit-btn" onClick={handleEditClick} >
              Edit Profile
            </button>
        </div>
          </div>
        )}
      </div>
      
    </div>
    </div>
    </>
  );
};

export default InvestorProfile;