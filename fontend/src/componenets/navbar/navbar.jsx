import React from 'react'
import './navbar.css'
import {Link} from 'react-router-dom'
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { UserProfile } from '../../pages/UserProfile/UserProfile';
import { Sidenav } from '../Sidenav/Sidenav';
 import logo from '../../assets/mainlogo.png'

export const Navbar = () => {

   const navigate = useNavigate();
   const [usertype, setUserType] = useState("");
   const [currentuser, setCurrentUser] = useState("")
   const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('profile'));
    useEffect(() => {
      const userType = localStorage.getItem("userType");
      setUserType(userType);
      const currentUser = localStorage.getItem("User");
      setCurrentUser(currentUser);
    }, []);
   

  const handleLogout = () => {
      localStorage.removeItem("profile");
      localStorage.removeItem("userType");
      localStorage.removeItem("User")
      navigate("/");
      window.location.reload();
    };
  return (
    <>
        <div className="navbar-container">
         <nav className="navbar">
          <div className="logo">
            <img src="" alt="logo here" />
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to='/' className="nav-link">Home</Link>
            </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events">Events</Link>
            </li> 
            <li className="nav-item">
               <Link to='/organise' className="nav-link">Organise</Link>
             
            </li>
          </ul>
          {isAuthenticated ? (
              <>
                {/* <div className="profile">
                  {usertype ==="Organiser" &&
                  <Link to={`/profile/${currentuser}`}> <FontAwesomeIcon icon={faUser} className='icon' /></Link>
                  }
               </div> */}
              </>
            ) : (
              <>
                <ul className='auth'>
                  <li className="nav-item">
                      <Link to='/login' className="nav-link login-btn">LogIn</Link>
                    </li>   
                </ul>
              </>
            )}
        </nav>
        </div>
        {
          isAuthenticated && <Sidenav/>
        }
    </>
  )
}
 