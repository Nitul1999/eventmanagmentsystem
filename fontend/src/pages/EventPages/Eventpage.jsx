import React,{ useState, useEffect }  from 'react'
import { Events } from '../../componenets/Events/Events';
import './eventpages.css'
import { colors } from '@mui/material';
export const Eventpage = () => {

     const [events, setEvents] = useState(null);
     const [organizers, setOrganizers] = useState({});


  useEffect(() => {
   
       async function getEventRecords() {
        try {
          const response = await fetch(`http://localhost:5000/events`);
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
          }
          const allevents = await response.json();
          setEvents(allevents);
          
            const orgdetails ={}
            for (const event of events){
              const organizerResponse = await fetch(`http://localhost:5000/organise/${event.organiseId}`)
              if (organizerResponse.ok) {
              const organizer = await organizerResponse.json();
              orgdetails[event.organiseId] = organizer;
              } else {
                console.error(`Failed to fetch organizer details for ID ${event.organiseId}`);
              }
              }
          setOrganizers(orgdetails);
        
        }
        catch (error) {
           console.error('Error fetching data:');
        }
      }
    getEventRecords();
            document.title='EventCraft-Events'
            return()=>{
              document.title ='Welcome-EventCraft'
            };
  }, []);
  
  return (
    <>
    <div className="container">
        <div className="container-items">
          <div className="evetns-items">
            <h2>Events</h2>
            <div className="events">
              {events &&
                events.map((Event) => <Events key={Event._id} event={Event} organizer={organizers[Event.organiseId]} />)}
            </div>
          </div>
        </div>
    </div>
    </>
  )
}
