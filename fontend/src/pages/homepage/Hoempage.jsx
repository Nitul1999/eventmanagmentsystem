import React from 'react'
import {useEffect, useState} from 'react'
import { Home } from '../../componenets/home/home'
import {Booking } from '../../componenets/bookingcomp'
import './home.css'
import { Link} from "react-router-dom"

export const Hoempage = () => {
  
  const [events, setevents] = useState(null)

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
    

    getRecords();
    return;
  }, [])

  return (
    
        <div className="items">
              <div className="evetns-items">
                <h2>events</h2>
                <div className="events">
                {
                  events && events.map((events)=>(
                    <Home key={events._id} event={ events } />
                  ))
                }
                </div>
               

                <div className="booking">
                </div>
              </div>
              
        </div>
  )
}
