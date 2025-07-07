
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Dashbord.css';
import Header from "../Header";

const Investordashboard = () => {
  const navigate = useNavigate();
  const [founders, setFounders] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:3000/investor/dashboard')
      .then(response => setFounders(response.data.founders))
      .catch(error => console.error("Error fetching founders:", error));
  }, []);

  return (
    <>
      <Header />
      <div className="dashboard-wrapper">
        <h2 className="dashboard-title">📊 Founders You Can Invest In</h2>
        <div className="founders-grid">
          {founders.map((founder, index) => (
            <div className="founder-card" key={index}>
              <h3 className="founder-name">{founder.username}</h3>
              <p><strong>Startup:</strong> {founder.startupName}</p>
              <p><strong>Sector:</strong> {founder.sector}</p>
              <p><strong>Required Budget:</strong> ${founder.requiredBudget.toLocaleString()}</p>
              <button
                className="details-button"
                onClick={() => navigate(`/investor/${founder._id}`)}
              >
                More Details…
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Investordashboard;
