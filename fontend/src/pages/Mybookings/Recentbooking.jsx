import React from 'react'
import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
export const Recentbooking = () => {

    const {id: eventId}= useParams();
    const currentuser = localStorage.getItem('User')
    const [recentbooking,setrecentbooking] = useState('') 
    useEffect(() => {
    async function Recentbooks() {
        const response = await fetch(`http://localhost:5000/booking/event/recent/booking/${eventId}`) 
        if(!response.ok){
           console.log('an error occurred')
           return;
        }
        const recentall = await response.json()
        setrecentbooking(recentall)
        console.log(recentall)
    }
    Recentbooks()
    return;
    }, [eventId])

  return (
    <div>
        <h1>Recent Booking</h1>
       
    </div>
  )
}

