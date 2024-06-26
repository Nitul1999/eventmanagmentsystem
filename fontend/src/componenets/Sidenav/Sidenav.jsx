import React from 'react'
import {useState,useRef,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { Link,useNavigate } from 'react-router-dom'

import './Side.css'

export const Sidenav = () => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [currentuser, setcurrentuser] = useState('')
    const [user,setuser] =useState('')
    const ref = useRef(null);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
        }
    };
   
    const userId = localStorage.getItem('User')
   
    useEffect(() => {
        setuser(userId)
        const currentuser = localStorage.getItem("userType");
        setcurrentuser(currentuser);
        document.addEventListener('click', handleClickOutside, true);
        return () => {
        document.removeEventListener('click', handleClickOutside, true);
        };
        
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("profile");
      localStorage.removeItem("userType");
      localStorage.removeItem("User")
      navigate("/");
      window.location.reload();
    };
    

  return (
    <div ref={ref} className={`snavbar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-button" onClick={toggleNavbar}>
        ☰
      </button>
      <ul className="snavbar-links">
          
          <Link to={`/profile/${userId}`}> <FontAwesomeIcon icon={faUser} className='icon' /></Link>
         
          {currentuser ==="Organiser" && 
              <li><Link to='/createorganization'>Create Oranizaion</Link></li>
          } 
          {currentuser ==="Organiser" &&
              <li><Link to={`/myorg/${user}`}>Manage My organize</Link></li> 
          }
          {currentuser ==="Organiser" &&
              <li><Link to ={`/myevent/${user}`}>My Events</Link></li>
          }
           {currentuser ==="Organiser" && 
            <li> <Link to={`/viewbooking`}>View Booking</Link></li>
          } 
          {/*
          {currentuser ==="Organiser" && 
            <li><Link href="#">All Booking</Link></li>
          }
        */}
          { currentuser ==="User" &&
           <li><Link to={`/mybooking/${userId}`}>My Booking</Link></li>
           }
         
          <li><Link onClick={handleLogout}> Logo Out</Link></li>
      </ul>
    </div>
  );
}
