import React from 'react'
import { useState} from 'react'
import {Link} from 'react-router-dom'
import StarRating from '../StarRating'
import "./organisecom.css"
export const Organise = ({organise}) => {
 
  const [details,setdetails]= useState(false)
 
  const viewdetails =()=>{
      setdetails(!details)
  }
  const toggleviewOff=()=>{
    setdetails(false)
  }

  return (
        <div className="organise-container">
          <div className="organise-card">
            <strong> <p> Organise Name:{organise.name}</p> </strong>
            <p>Email Id: {organise.email}</p>
            <div className="details">
              <p> Services: {organise.service.join(', ')} </p>
              <p>Status: {organise.status ? 'Active' : 'Inactive'}</p>
            </div>
            <StarRating rating={organise.rating} />
            <div className="more-btn-organise">
              <button onClick={()=>viewdetails()}>View More</button>
              <button> <Link to={`/organise/events/${organise._id}` }>View Events</Link></button> 
            </div>
          </div>
          <>{details && <div>
              <div className="details-views">
               <div className="all-details-view">
                          
                           <div className="popup-content">
                             <button className="close-btn" onClick={()=>toggleviewOff()}>Close</button>
                              <p>Owner: {organise.owner}</p>
                              <p>Conact No: {organise.phone}</p>
                              <p>Address: {organise.address}</p>
                              <p>Pin: {organise.pin}</p>
                              <p>State: {organise.state}</p>
                              <p>Office Location: {organise.location}</p>
                              <p>Post Office Address: {organise.postoffice}</p>
                              <p>Totalboking: {organise.totalboking}</p>
                              <p>Organise Create On: {organise.createdAt}</p>
                           </div>
                           
                        </div>
              </div>
            </div>}
          </>
        </div>
  )
}
