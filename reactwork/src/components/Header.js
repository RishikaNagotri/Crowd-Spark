
import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Header.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from  "./log.png"

function Header() {
  const navigate = useNavigate();
   const[isLoggedIn,setIsLoggedIn] = useState(false);
 
   useEffect(()=>{
     setIsLoggedIn(!!localStorage.getItem('token'));
   },[]);

   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload(); 
  };
    const handleProfile = () => {
    const userType = localStorage.getItem("userType");
    const userId = localStorage.getItem("userId");

    if (!userType || !userId) {
      alert("Please login again.");
      navigate("/sign-in");
      return;
    }

    if (userType === "founder") {
      navigate(`/founder/profile/${userId}`);
    } else if (userType === "investor") {
      navigate(`/investor/profile/${userId}`);
    } else {
      alert("Unknown role.");
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="navbar">
        <ul className="nav-list">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link">About Us</Link></li>
          <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
        </ul>
        <div>
          {!isLoggedIn?(
            <>
            <Link to="/sign-in" className="btn">Sign-in</Link>
                <Link to="/sign-up" className="btn ml-2">Sign-up</Link>
                </>
          ):(
            <>
            <button className='btn' onClick={handleLogout}>logout</button>
            <AccountCircleIcon 
      onClick={handleProfile} 
      style={{ color: 'white', fontSize: 36, cursor: 'pointer',marginLeft:"15px" }}
    />
            
            </>
          )
          }
        </div>
      </nav>
    </header>
  );
}

export default Header;
