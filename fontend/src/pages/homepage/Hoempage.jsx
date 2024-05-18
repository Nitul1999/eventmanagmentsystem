import React from 'react'
import {useEffect, useState} from 'react'
import { Home } from '../../componenets/home/home'
import {Booking } from '../../componenets/bookingcomp'
import './home.css'
import { Link} from "react-router-dom"
import image from"../../assets/homeimgae.png"
import noticeimag from"../../assets/Biirthday.png"
import { TopRatingorganise } from '../../componenets/Events/TopRatingorganise'
import { Homeorganisecomp } from '../../componenets/organise/Homeorganisecomp'

export const Hoempage = () => {
  
  const [events, setevents] = useState(null)
  const [latestevent,setlatestevent] =useState(null)
  const [toporg , settoporg] =useState(null)
   useEffect(() => {
      async function getRecords() {
          const response = await fetch(`http://localhost:5000/events`);
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
          }
          const events = await response.json();
          setevents(events);
      }
    async function Getlatestevents() {
      const response = await fetch(`http://localhost:5000/events/latest/event`);
      if(!response.ok){
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
      }
      const latestevent = await response.json();
      setlatestevent(latestevent)
    }
    async function gettoporg(){
      const response = await fetch (`http://localhost:5000/organise/rating`);
      if(!response.ok){
        const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
      }
      const toporganise = await response.json()
      settoporg(toporganise)
    }
     gettoporg()
     Getlatestevents()
     getRecords();
    return;
  }, [])

  return (
    
        <>
            <div className="home">
                <div className="left">
                  <p className='heading'> All in One Event Managment Software</p>
                  <h1>Booked Your Events Today</h1>
                  <p className='para'>'We provide you high quality products'</p>
                  <Link to='/signup' className="create-account">Create Account</Link>
                </div>

                <div className="right">
                  <img src={image}></img>
                </div>
            </div>
            <div className="notice">
              <div className="image-area">
                  <img src={noticeimag} alt="" />
              </div>
              <div className="text-area">
                <h2>Event planning software that handles everything all in one place</h2>
                <p>No matter what stage of the event process you’re in, we offer a complete set of tools that’s flexible enough to work with your event program. From small meetings, large conferences or internal meetings, we’ve got you covered.</p>
              </div>
              
            </div>
          
            <div className='item-section'>
              <div className="top-events">
                    <h2>Top Events</h2>
                    <div className="event-card-container">
                  
                    {
                    events && events.map((event)=>
                    <Link to={`/event-view/${event._id}`} className='linkcard'><TopRatingorganise key={event._id} event={event} /></Link> 
                    )
                    }
                    </div>
              </div>
              <div className="recent-events">
                <h2>Latest Events</h2>
                    <div className="recent-card-container">
                  
                    {
                      latestevent && latestevent.map((events)=>
                      <Link to={`/event/${events._id}`} className='linkcard'><TopRatingorganise key={events._id} event={events} /></Link> 
                    )
                    }
                    </div>
              </div>
            </div>
            <div className="our-patner">
                    <h2>Our Patner</h2>
                    <p className='collab'>We Collaborate With Several Organisation</p>
                    <div className="organisation-section">
                      <div className="organisation-container">
                        { toporg && toporg.map((org)=>
                        <Link to={`/oranise-view/${org._id}`} className='linkcardorganise'> <Homeorganisecomp key={org._id} org={org}/></Link> 
                        )}
                        
                      </div>
                    </div>
             </div>

             <div className="contact-us">
              <div className="contact-flex-box">
                  <div className="contact-us-container">
                    <form   className="contact-form">
                      <label htmlFor="name">Name</label>
                      <input type="text" placeholder='Your Name' required/>
                      <label htmlFor="email">Email</label>
                      <input type="email" placeholder='Your Email' required/>
                      <label htmlFor="massage">Massage</label>
                      <textarea row="5"  required> </textarea>
                      <button type="submit">Send Message</button>
                    </form>
                  </div>
                  <div className="text-contact">
                    <h1>Contact-us</h1>
                    <p>Any Quaries!! You Can Freely Ask</p>
                    <p>24*7</p>
                    <div className="contact-details-quary">
                      <p>Phone: 8133820226/9101233239 </p>
                      <p>Gmail: nitulsonowal8133@gmail.com </p>
                    </div>
                  </div>
              </div>
             </div>



            <footer></footer>
        </>
  )
}
