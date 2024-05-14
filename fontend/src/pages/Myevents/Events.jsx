import React from 'react'
import {useEffect,useState } from 'react'
import Myeventcomponent from '../../componenets/Myevent/Myeventcomponent'

const Events = () => {

    const [events,setEvents] = useState([null])
    const  currentuser = localStorage.getItem('User')

    useEffect(() => {
        async function getEvent() {
        const response = await fetch(`http://localhost:5000/events/event/my/${currentuser}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          // body: JSON.stringify({ current })
        })
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          return;
        }
        const myevn = await response.json();
        setEvents(myevn);
      }
      getEvent();
    return;

    }, [currentuser])

  return (
    <div>
     {/* {events && events.map((event)=>(
      <Myeventcomponent key={event?._id } events={event} />
     ))} */}
      <div className="myevent">
        <p>event name:{events.name}</p>
        <p>event type: {events.type}</p>
        <p>event capacity {events.capcity}</p>
        <p> event price:{events.price}</p>
        <p>event date:{events.createOn}</p>
        <p>Status:{events.status}</p>
        <p> event rating:{events.rating}</p>
        <p>event description:{events.description}</p>
        <p>event total booking:{events.totalbooking}</p>
        <p>event no of comment:{events.noofcomment}</p>
      </div>
      <button> delete event</button>
    </div>
  )
}

export default Events
