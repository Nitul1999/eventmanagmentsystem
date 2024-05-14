import React from 'react'
import './home.css'
export const Home = ({ event }) => {
  return (
    <div className="events">
        <p>event name:{event.name}</p>
        <p>event types :{event.type}</p>
        <p>event capacity: { event.capacity}</p>
        <p> event prices:{ event.price}</p>
    </div>
  )
}
