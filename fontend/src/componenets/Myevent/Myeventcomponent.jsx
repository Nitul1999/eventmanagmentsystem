import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './myevent.css'
import StarRating from '../StarRating'
import { Link } from 'react-router-dom'
const Myeventcomponent = ({myev}) => {
 
  const navigate = useNavigate()
  const userId = localStorage.getItem('User') 
  const [eventId,seteventId]=useState(myev._id)
  const [showform, setshowform] = useState(false)

  const [eventname, seteventname ] = useState(myev.name)
  const [eventtype,seteventtype] =useState(myev.type)
  const [eventprice,seteventprice]=useState(myev.price)
  const [eventcapacity,seteventcapacity]=useState(myev.capacity)  
  const [eventstatus,seteventstatus] =useState( false)
  
  const toggleform=()=>{
    setshowform(!showform)
  }

  const toggleupdateform =()=>{
    setshowform(false)
  }


  const event = myev._id

  const deleteevent=async()=>{
    console.log(event)
    try {
      const response = await fetch(`http://localhost:5000/events/delete/${event}`,{
       method: 'DELETE',
      });
       const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error); // Throw error with the message from the backend
        }
      window.location.reload()
      console.log("event delete successfuly")
    } catch (error) {
      
    }
  }

  //add price
  const [newPrice, setNewPrice] = useState('');

  const addPrice = () => {
    if (newPrice) {
      seteventprice([...eventprice, newPrice]);
      setNewPrice('');
    }
  };

  const removeprice = (index) => {
    seteventprice(eventprice.filter((_, i) => i !== index));
  };

  //add capacity
  const [newCapacity, setnewcapacity] =useState('')

  const addCapacity =()=>{
    if(newCapacity){
      seteventcapacity([...eventcapacity,newCapacity]);
      setnewcapacity('');
    }
  }
  const removeCapacity=(index)=>{
    seteventcapacity(eventcapacity.filter((_,i)=>i !==index));
  }

  const handlesubmit =async(e)=>{
            e.preventDefault();
            const data ={
              name:eventname,
              type: eventtype,
              price:eventprice,
              capacity:eventcapacity,
              status:eventstatus
            };
            try {
              const response= await fetch(`http://localhost:5000/events/update/${eventId}`,{
                method:'PATCH',
                body:JSON.stringify(data),
                headers:{
                  'Content-type':'application/json'
                }
              });
              if(!response.ok){
                const json =await response.json();
                throw new Error(json.error)
              }
              setshowform(false)
              navigate(`/myevent/${userId}`)
              window.location.reload()
            } catch (error) {
                 console.log("could not submit the form data")
            }
  }

  return (
      <div className="card">
          <img src="" alt="Event Image"/>
          <div className="card-content">
              <h2>Event Name: {myev.name}</h2> 
              <p>Type: {myev.type}</p>
              <p className="price">Price: {myev.price.join(", ")}</p>
              <p className="capacity">Capacity: {myev.capacity.join(", ")}</p>
              <p className="rating">Rating: <StarRating rating={myev.rating}/></p>
              <p className="status">Status: {myev.status ? 'Active' : 'Inactive'}</p>
              <p className="create-on">Created On: {myev.createOn}</p>
              <p className="total-booking">Total Bookings: {myev.totalbooking}</p>
              <p className="no-of-comments">Number of Comments: {myev.noofcomment}</p>
               {/* <Link to={`/viewbooking/${myev._id}`}>View Booking</Link> */}
               <button onClick={()=>toggleform()}>Update Event</button>
               <button onClick={()=>deleteevent()}>Delete Event</button>
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
                                <button>Delete Comment</button>
                              </div>
                            ))}
                  </div>
              </div>
          </div>
          <>{showform && (
              <div className="formpopup">
                <form className="form" onSubmit={handlesubmit}>
                    <label htmlFor="event name"> Event Name</label>
                    <input type="text" onChange={(e)=> seteventname(e.target.value)} value={eventname} />
                    <label htmlFor="type"> Event Types </label>
                    <input type="text" onChange={(e)=> seteventtype(e.target.value)} value={eventtype}/>
                    <label htmlFor="price">Prices</label>
                       <div>
                          <input
                            type="text"
                            placeholder="Add a Price"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                          />
                          <button type="button" className='add-service' onClick={addPrice}>Add Service</button>
                        </div>
                        <ul>
                          {eventprice.map((price, index) => (
                            <li key={index}>
                              {price}
                              <button type="button" className="remove-service" onClick={() => removeprice(index)}>X</button>
                            </li>
                          ))}
                        </ul>

                        <label htmlFor="capacity"> Capacity</label>
                        <div>
                            <input type="number" placeholder='add capacity' onChange={(e)=>setnewcapacity(e.target.value)} />
                            <button type='button' className='add-service' onClick={addCapacity}> Add Capacity</button>
                        </div>
                        <ul>
                          {eventcapacity.map((capacity,index)=>
                              <li key={index}>
                                {capacity}
                                <button type='button' className='remove-service' onClick={()=> removeCapacity(index)}>X</button>
                              </li>
                          )}
                        </ul>
                        <label>Status</label>
                              <select className='selectbtn' onChange={(e) => seteventstatus(e.target.value === 'true')} value={eventstatus}>
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                              </select>
                        <button type="submit" >Save</button>
                        <button className="update-cancel-org-btn"type="button" onClick={() => toggleupdateform()}>Cancel</button>
                </form>
              </div>)}
          </>
        </div>
    
  )
}

export default Myeventcomponent
