import React from 'react'
import {Link} from 'react-router-dom'
import StarRating from "../StarRating";
export const TopRatingorganise = ({event}) => {
  return (
    <div>
      {/* <Link to={`/event-view/${event._id}`} className='linkcard'> view</Link> */}
         <div className="event-card">
                    <img src="" alt="Event" className="event-image" />
                    <h1 className="event-title">{event.name}</h1>
                    <p className="event-description">{event.description}</p>
                
                    <p className='event-type'>{event.type}</p>     
                    <div className="event-rating-price">
                      <span className="event-rating">  <StarRating rating={event.rating} /></span>
                      <span className="event-price">₹ - {event.price}</span>
                    </div>
            </div>
        
    </div>
  )
}
