import React from 'react'
import './navbar.css'
import {Link} from 'react-router-dom'
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { UserProfile } from '../../pages/UserProfile/UserProfile';
import { Sidenav } from '../Sidenav/Sidenav';


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
                <a className="nav-link" href="/about">About</a>
              </li>
            <li className="nav-item">
              <a className="nav-link" href="/events">Events</a>
            </li> 
            <li className="nav-item">
               <Link to='/organise' className="nav-link">Organise</Link>
             
            </li>
             {/* <li className="nav-item">
             { usertype ==="Organiser" && <Link to='' className="nav-link"> {usertype}</Link>} 
            </li> */}
          </ul>
          {isAuthenticated ? (
              <>
                <div className="profile">
                  {/* <Avater backgroundColor="purple" color='white' fontSize='50px' px='40px' py='30px'/> */}
                  {usertype ==="Organiser" &&
                  <Link to={`/profile/${currentuser}`}> <FontAwesomeIcon icon={faUser} className='icon' /></Link>
                  }
               </div>
              </>
            ) : (
              <>
                <ul className='auth'>
                  <li className="nav-item">
                      <Link to='/login' className="nav-link">Sign In</Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/signup' className="nav-link">Sign Up</Link>
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
 