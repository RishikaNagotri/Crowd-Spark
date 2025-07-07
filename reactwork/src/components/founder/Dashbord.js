
import React, { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Dashbord.css';
import Header from "../Header";

const Founderdashboard = () => {
    const navigate = useNavigate();
  const [investors, setInvestors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/founder/dashboard')
      .then(response => {
        setInvestors(response.data.investors);
      })
      .catch(error => {
        console.error("Error fetching investors:", error);
      });
  }, []);

  return <>
  <Header/>
    <div  className="dashboard-wrapper">
      <h2 className="dashboard-title">💸 Investors Looking for Promising Startups</h2>
      <div className="founders-grid">
        {investors.map((investor, index) => (
          <div className="founder-card" key={index}>
            <h3 className="founder-name">{investor.username}</h3>
            <p><strong> Budget:</strong> $ {investor.budget.toLocaleString()}</p>
             <button  className="details-button" onClick={()=>navigate(`/founder/${investor._id}`)} >More Details...</button>
          </div>
        ))}
      </div>
    </div>
  </>
};

export default Founderdashboard;
