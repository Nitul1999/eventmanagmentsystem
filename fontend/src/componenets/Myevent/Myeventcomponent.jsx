import React from 'react'
import './myevent.css'
import StarRating from '../StarRating'
const Myeventcomponent = ({myev}) => {
  return (
    <div className='myevent-details'>
      <div className="card">
          <img src="" alt="Event Image"/>
          <div className="card-content">
              <h2>Event Name: {myev.name}</h2>
              <p>Type: {myev.type}</p>
              <p className="price">Price: {myev.price}</p>
              <p className="capacity">Capacity: {myev.capacity}</p>
              <p className="rating">Rating: <StarRating rating={myev.rating}/></p>
              <p className="status">Status: {myev.status}</p>
              <p className="create-on">Created On: {myev.createOn}</p>
              <p className="total-booking">Total Bookings: {myev.totalbooking}</p>
              <p className="no-of-comments">Number of Comments: {myev.noofcomment}</p>
              
              <div className="comments">
                  <h3>Comments:</h3>
                  <div className="comment">
                      {myev.comment &&
                            myev.comment.map((comment, index) => (
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
   </div>
    
  )
}

export default Myeventcomponent
