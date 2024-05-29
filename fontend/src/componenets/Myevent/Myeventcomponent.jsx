import React from 'react'
import {useState} from 'react'

import './myevent.css'
import StarRating from '../StarRating'
import { Link } from 'react-router-dom'
const Myeventcomponent = ({myev}) => {
 
  const [showform, setshowform] = useState(false)

  const toggleform=()=>{
    setshowform(!showform)
  }
  return (
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
               {/* <Link to={`/viewbooking/${myev._id}`}>View Booking</Link> */}
               <button onClick={()=>toggleform()}>Update</button>
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
          <>{showform && (
          <div className="form-popup">
            <form className="form">
                <label htmlFor=""></label>
                <input type="text" />
            </form>
          </div>)}
          </>
        </div>
    
  )
}

export default Myeventcomponent
