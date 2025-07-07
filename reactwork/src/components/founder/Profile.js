// src/founderProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Profile.css';
import Header from '../Header';

const FounderProfile = ({ }) => {
    const { id } = useParams();
      const navigate = useNavigate();
    const [founder, setFounder] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        contact: '',
        requiredBudget: '',
        address: '',
        email: '',
        startupName: '',
        sector: '',
        startupDescription: ''
    });



    useEffect(() => {
         const token = localStorage.getItem("token");
         if(!token){
           alert('log in to continue');
           navigate('/sign-in');
         }
        console.log("Received ID:", id); // <-- check this
        const fetchFounder = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/founder/getprofile/${id}`,
                             { 
          headers: {
           Authorization: `Bearer ${token}`
          }
        }
                );
                console.log("API Response:", response.data);
                setFounder(response.data.founder);
                setFormData(response.data.founder);
            } catch (error) {
                console.error("Error fetching founder profile:", error);
            }
        };

        fetchFounder();
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
            const response = await axios.put(`http://localhost:3000/founder/editprofile/${id}`, formData);
            setFounder(response.data.founder);
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Error updating profile:", error);
            alert('Failed to update profile');
        }
    };


    const handleCancel = () => {
        setIsEditing(false);
        setFormData(founder);
    };

    if (!founder) {
        return <div className="profile-loading">Loading profile...</div>;
    }

    // Get initials from username
    const getInitials = (name) => {
        if (!name) return '';
        const names = name.split(' ');
        return names.map(n => n[0]).join('').toUpperCase();
    };

    return (
        <><Header />
            <div className='main'>
                <div className="profile-container">
                    <div className="profile-background">
                        {/* Background image placeholder */}
                    </div>

                    <div className="profile-header">
                        <div className="profile-avatar">
                            <div className="avatar-initials">{getInitials(founder.username)}</div>
                        </div>

                        <div className="profile-info">
                            <h1 className="profile-name">{founder.username}</h1>
                            <p className="profile-email">{founder.email}</p>
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
                                    <label>Startup Name</label>
                                    <input
                                        type="text"
                                        name="startupName"
                                        value={formData.startupName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Required Budget</label>
                                    <input
                                        type="text"
                                        name="requiredBudget"
                                        value={formData.requiredBudget}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Sector</label>
                                    <input
                                        type="text"
                                        name="sector"
                                        value={formData.sector}
                                        onChange={handleChange}
                                        placeholder='e.g.-Tech,Health,etc.'
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Startup Description</label>
                                    <input
                                        type="text"
                                        name="startupDescription"
                                        value={formData.startupDescription}
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
                            <div className="profile-details" style={{ marginLeft: "30px", gap: "100px" }}>
                                <div className="detail-section">
                                    <h3>Contact Information</h3>
                                    <p><strong>Phone:</strong> {founder.contact}</p>
                                    <p><strong>Email:</strong> {founder.email}</p>
                                    <p><strong>Address:</strong> {founder.address}</p>
                                </div>

                                <div className="detail-section" >
                                    <h3>Startup Preferences</h3>
                                    <p><strong>Startup Name:</strong> {founder.startupName}</p>
                                    <p><strong>Required Budget: $</strong> {founder.requiredBudget}</p>
                                    <p><strong>Sector:</strong> {founder.sector || "N/A"}</p>
                                    <p><strong> Startup Description:</strong> {founder.startupDescription || "N/A"}</p>
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

export default FounderProfile;