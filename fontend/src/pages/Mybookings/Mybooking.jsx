import React from 'react'

import {useState,useEffect} from 'react'
import { Mybookingcomponent } from '../../componenets/mybookingcomponent/mybookingcomponent'
import './mybooking.css'


const Mybooking = () => {

  const [mybookings, setmybookings] = useState(null)
  const currentuser = localStorage.getItem('User')  
  useEffect(() => {
    async function myrecord() {
        const response =await fetch(`http://localhost:5000/booking/mybooking/${currentuser}`);
         if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
          }
        const mybooks = await response.json()
        console.log(mybooks)
        setmybookings(mybooks)
    }
    myrecord();
    return;
  }, [currentuser])

  return (
    <div className='my-booking-section'>
     <h1>My Bookings</h1>
     <div className="bookings">
      {mybookings && mybookings.map((booking) =>(
         <Mybookingcomponent key={booking._id} booking={booking} />
      ))}
     </div>
    </div>
  )
}

export default Mybooking
