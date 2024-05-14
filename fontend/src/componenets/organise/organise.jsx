import React from 'react'

export const Organise = ({organise}) => {
  return (
        <div className="organise">
            <p> Organise Name:{organise.name}</p>
            <p>Email Id: {organise.email}</p>
        </div>
  )
}
