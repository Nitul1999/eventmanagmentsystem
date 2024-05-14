import React from 'react'

export const Booking = ({booking}) => {
  return (
    <div className="booking">
        <h2>all booking</h2>
        <p>booking id: { booking._id}</p>
        <p> booking date : {booking.bookingDate}</p>
    </div>
  )
}
