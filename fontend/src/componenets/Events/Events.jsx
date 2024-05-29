import React from 'react';
import { useState } from "react";
import StarRating from "../StarRating";
import { Link, useNavigate} from "react-router-dom";
import "./style.css";


export const Events = ({ event,organizer }) => {
   const [showPopup, setShowPopup] = useState(false);
   const [showbookingform,setshowbookingform] = useState(false)
   const navigate = useNavigate()
   const userId = localStorage.getItem("User")
  
   const [name ,setname]= useState('')
   const [bookingDate,setbookingDate] = useState('')
   const [noofday,setnoofday] = useState('')
   const [location,setlocation] = useState('')
   const [pin,setpin] =useState('')
   const [district,setdistrict] = useState('')
   const [contact,setcontact]=useState('')
   const [email ,setemail]= useState('')
   const[panno,setpanno]=useState('')
   
   const organiseId = event.organiseId
   const eventId = event._id
   const eventname = event.name
   const eventtype =event.type
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const togglebooking =()=>{
   setshowbookingform(!showbookingform)
  }
  const toggleOff=()=>{
    setshowbookingform(false)
  }
  const Createbooking =async(e)=>{
    e.preventDefault();
    const data = {name,userId,organiseId,eventId,bookingDate,noofday,location,pin,district,contact,email,panno,eventname,eventtype}
    try {
      const response = await fetch(`http://localhost:5000/booking/post`,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
          'Content-Type':'application/json'
        }
      })
      if(!response.ok){
        throw new Error('Data not submitted ');
      }
      const mybooking =await response.json()
      console.log(mybooking)
      window.alert(`Booking Created`)
      navigate(`/mybooking/${userId}`)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="event-container">
      
      <div className="events-card">
        {organizer ? (
        <div className="event-details">
           <p> <strong>Organize Name:</strong>  {organizer.name}</p>
            <p> <strong>Email:</strong>  {organizer.email}</p>
        </div>
      ): (
                  <p>Loading organizer details...</p>
          )} 
        <p>Event Name: <strong> {event.name.toUpperCase()} </strong></p>
        <p>Event Created: {event.createOn}</p>
        <div className="edetails">
          <p>Event type: {event.type}</p>
          <p>Status: {event.status}</p>
        </div>
       
        <StarRating rating={event.rating} />

        {/* Popup Card */}
        <div
          className={`popup-overlay ${showPopup ? "active" : ""}`}
          onClick={togglePopup}
        ></div>
        <button className="view-details-btn" onClick={togglePopup}>
          {showPopup ? "Close Details" : "View Details"}
        </button>
      </div>
      <div className="event-popup" >
        <div
          aria-colspan={2}
          className={`popup-card ${showPopup ? "active" : ""}`}
        >
          <button className="close-btn" onClick={togglePopup}>
            Close
          </button>
          <div className="event-images box ">
            <img  alt="Event Images" />
          </div>

          <h2>{event.name.toUpperCase()}</h2>

          <div className="event-info box">
            <p>
              <strong>Created date:</strong> {event.createOn}
            </p>
            <p>
              <strong>Total Booking:</strong> {event.totalbooking}
            </p>
          </div>
          <div className="event-info box">
            <p className='list'>
              <strong>Capacity:</strong>{event.capacity && event.capacity.map((capacity,index)=>(
                <div key={index}>
                  <div className='itemlist'>{capacity}</div>
                </div>
              ))}
            </p>
            <p className='list'>
              <strong>Price:</strong> {event.price && event.price.map((price,index)=>(
                <div key={index}>
                  <div className='itemlist'>{price}</div>
                </div>
              ))}
            </p>
          </div>
           
              <button className="book-btn" onClick={() => togglebooking()}>Book Now</button>
              
              <> {showbookingform &&(
              <div className="container-create-booking">
                <p>Notes: Payment Status/Booking Status will be update by Event manager later,Somthing price will increase depand on no of days... </p>
                <form onSubmit={Createbooking}>
                  <div>
                    <label htmlFor="name">Your Name</label>
                    <input type="text" placeholder='Enter your name' required onChange={(e)=>setname(e.target.value)} value={name}/>
                    <label htmlFor="date">Pick a date</label>
                    <input type="date" required onChange={(e)=>setbookingDate(e.target.value)} value={bookingDate}/>
                    <label htmlFor="duration">Number of Days</label>
                    <input type="number" placeholder='No of days' required onChange={(e)=>setnoofday(e.target.value)} value={noofday}/>
                    <label htmlFor="location"> Location </label>
                    <input type="text" placeholder='Event location' required onChange={(e)=>setlocation(e.target.value)} value={location}/>
                    <label htmlFor="pin">Pin Number</label>
                    <input type="number" placeholder='Pin number' required onChange={(e)=>setpin(e.target.value)} value={pin}/>
                    <label htmlFor="district"> District </label>
                    <input type="text" placeholder='District' required onChange={(e)=>setdistrict(e.target.value)} value={district} />
                    <label htmlFor="contect no">Contact-No</label>
                    <input type="tel" placeholder='Your Contact Number' required onChange={(e)=>setcontact(e.target.value)} value={contact}/>
                    <label htmlFor="email"> Email Id</label>
                    <input type="email"  placeholder='Email Id' required onChange={(e)=>setemail(e.target.value)} value={email}/>
                    <label htmlFor="pan no"> Pan Number</label>
                    <input type="text" required placeholder='Pan card no' onChange={(e)=>setpanno(e.target.value)} value={panno} />
                  </div>
                  <div className="btn-section-book">
                       <button className='submit-btn' type='submit'>Booked</button>
                       <button onClick={()=>toggleOff()} > Close </button>
                  </div>
                 
                </form>
               
              </div>
              )}</>

            {/* </Link> */}
          <div className="comment-cotainer box">
            {event.comment &&
              event.comment.map((comment, index) => (
                <div key={index}>
                  <p className="p3">
                    <strong>Comment Body: {comment.commentBody} </strong>
                  </p>
                  <p className="p3"> Comment On: {comment.commentDate}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
