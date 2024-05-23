import React from 'react'

import {useState,useEffect} from 'react'
import { Mybookingcomponent } from '../../componenets/mybookingcomponent/mybookingcomponent'
import './mybooking.css'


const Mybooking = () => {

  const [mybookings, setmybookings] = useState(null)
  const [organizers, setOrganizers] = useState({});
  const currentuser = localStorage.getItem('User')  
  useEffect(() => {
    async function myrecord() {
       try {
         const response =await fetch(`http://localhost:5000/booking/mybooking/${currentuser}`);
         if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
          }
        const mybooks = await response.json()
        console.log(mybooks)
        setmybookings(mybooks)

        // Fetch organizer details for each booking
        const organizersDetails = {};
        for (const booking of mybooks) {
          const organizerResponse = await fetch(`http://localhost:5000/organise/${booking.organiseId}`);
          if (organizerResponse.ok) {
            const organizer = await organizerResponse.json();
            organizersDetails[booking.organiseId] = organizer;
          } else {
            console.error(`Failed to fetch organizer details for ID ${booking.organiseId}`);
          }
        }
        setOrganizers(organizersDetails);


       } catch (error) {
        console.error('Error fetching booking data:');
       }
    }
    myrecord();
     document.title = 'EventCraft-My Booking';
    return()=>{
      document.title='Welcome-EventCraft'
    };
  }, [currentuser])

  return (
    <div className='my-booking-section'>
     <h1>My Bookings</h1>
     <div className="bookings">
      {mybookings && mybookings.map((booking) =>(
         <Mybookingcomponent key={booking._id} booking={booking} organizer={organizers[booking.organiseId]} />
      ))}
     </div>
    </div>
  )
} 

export default Mybooking
