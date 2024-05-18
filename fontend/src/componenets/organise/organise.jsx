import React from 'react'
import StarRating from '../StarRating'
import "./organisecom.css"
export const Organise = ({organise}) => {
  return (
        <div className="organise-container">
          <div className="organise-card">
            <p> Organise Name:{organise.name}</p>
            <p>Email Id: {organise.email}</p>
            <div className="details">
              {/* {organise.service && organise.service.map((service, index)=>(
                <div key={index}>
                  <div className="list">{service}</div>
                </div>
              ))} */} 
              {organise.service}
            </div>
            <StarRating rating={organise.rating} />
          </div>
           
        </div>
  )
}
