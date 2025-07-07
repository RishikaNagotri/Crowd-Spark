

import React from 'react';
import { useNavigate ,useLocation } from 'react-router-dom';
import Header from './Header';

const Areyouhere = () => {
  const navigate = useNavigate();
  const location = useLocation();
const email = location.state?.email || "";
const username = location.state?.username || "";
const password = location.state?.password || "";

  const handleInvestorClick = () => {
     navigate('/investor/register', { state: { email, username ,password} });
  };

  const handleFounderClick = () => {
  navigate('/founder/register', { state: { email, username ,password} });
  };

  return (
    <>
      <Header/>
      <div style={{
        height: '735px',
        backgroundColor: '#f8f9fa',
        fontFamily: "'Poppins', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '100px 60px',
        backgroundImage: 'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Overlay to improve text readability */}
        <div style={{
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(248, 249, 250, 0.85)',
          zIndex: 0
        }}></div>
        
        {/* Content container with z-index to appear above overlay */}
        <div style={{
          zIndex: 1,
          width: '100%',
          maxWidth: '1200px'
        }}>
          {/* Header Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '20px',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#003576',
              marginBottom: '20px'
            }}>Get Started With Crowd Spark!</h1>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: '#555',
            }}>
              Startup crowdfunding bridges the gap between visionary founders seeking support 
              and passionate investors ready to back innovation. Together, we build the future — 
              one idea, one investment at a time.
            </p>
          </div>

          {/* Divider */}
          <div style={{
            width: '200px',
            height: '3px',
            backgroundColor: '#003576',
            margin: '40px auto',
          }}></div>

          {/* Role Selection Section */}
          <h3 style={{
            fontSize: '1.8rem',
            color: '#333',
            marginBottom: '50px',
            textAlign: 'center'
          }}>Are you here to...</h3>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '100px',
            width: '100%',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            {/* Investor Card */}
            <div 
              onClick={handleInvestorClick}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 5px 15px rgba(0, 200, 255, 0.438)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '2px solid rgba(0, 200, 255, 0.438)',
                width: '400px',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  borderColor: '#6e48aa'
                }
              }}
            >
              <h3 style={{
                fontSize: '1.5rem',
                color: '#6e48aa',
                marginBottom: '15px'
              }}>Invest in Startups</h3>
              <p style={{
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Startup crowdfunding empowers passionate investors like you to support 
                groundbreaking ideas and turn dreams into reality.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}>
                <span style={{
                  color: '#6e48aa',
                  fontWeight: '600',
                  marginTop:"20px"
                }}>Start Investing</span>
                <span style={{
                  marginLeft: '10px',
                  color: '#6e48aa',
                  fontSize: '1.2rem',
                  marginTop:"20px"
                }}>→</span>
              </div>
            </div>
            
            {/* Founder Card */}
            <div 
              onClick={handleFounderClick}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '30px',

                boxShadow: '0 5px 15px rgba(0, 200, 255, 0.438)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '2px solid rgba(0, 200, 255, 0.438)',
                width: '400px',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  borderColor: '#4a90e2'
                }
              }}
            >
              <h3 style={{
                fontSize: '1.5rem',
                color: '#4a90e2',
                marginBottom: '15px'
              }}>Get Funding</h3>
              <p style={{
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Startup crowdfunding empowers bold founders like you to bring innovative 
                ideas to life and connect with supporters who believe in your vision.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}>
                <span style={{
                  color: '#4a90e2',
                  fontWeight: '600'
                }}>Find Supporters</span>
                <span style={{
                  marginLeft: '10px',
                  color: '#4a90e2',
                  fontSize: '1.2rem'
                }}>→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Areyouhere;