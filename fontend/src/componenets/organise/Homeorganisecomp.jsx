import React from 'react'
import './homeorganisecomp.css'
import imagemy from '../../assets/homeimgae.png'
export const Homeorganisecomp = ({org}) => {
  return (
    <>
        <div className="organise-card-section">
            <div className="text">
               <p>Orgnaise-Name : {org.name}</p>
               <p>Own By : {org.owner} </p>
               <p>Status: {org.status ? 'Active' : 'Inactive'}</p>
            </div>
            <div className="image-section">
              <img src={imagemy} alt="img" className="img" />
            </div>
        </div>
    </>
  )
}
