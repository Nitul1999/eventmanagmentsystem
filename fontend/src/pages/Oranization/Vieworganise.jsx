import React from 'react'
import {useState,useEffect} from 'react'
import {useParams, useNavigate } from 'react-router-dom'
import './vieworg.css'
export const Vieworganise = () => {

    const [org, setorg] = useState('')
    const userId = localStorage.getItem('User') //get current logIn user 
    // const current = userId;
    const navigate = useNavigate()
    //get organise details using current user id
    useEffect(() => {
            async function getOrg() {
              const response = await fetch(`http://localhost:5000/organise/myorg/${userId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ current })
              })
              if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.error(message);
                return;
              }
              const myorg = await response.json();
              setorg(myorg);
              const orgId = myorg._id
              setorganiseid(orgId)
              //  localStorage.setItem('OrganiseId',orgId);
            }
            if (userId) {
                getOrg(); // Only fetch if userId is available
              }
              // getOrg();
              return;
          }, [userId])

  //get organise details using current user id
    const [organiseId,setorganiseid]=useState('')
    const [name, setname]= useState('')
    const [type , settype] = useState('')
    const [capacity,setcapacity] = useState('')
    const [price,setprice] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [updateopen,setupdateopen] = useState(false)

    // update data
    const [orgname,setorgname] =useState(org.name)
    const [orgemail, setorgemail]=useState('')
    const [orgowner,setorgowner]=useState('')
    const [orgcontact, setorgcontact]=useState('')
    const [orgaddress, setorgaddress]=useState('')
    const [orglocation, setorglocation]=useState('')
    const [orgpin,setorgpin] =useState('')
    const [orgpostoffice,setorgpostoffice]=useState('')
    const [orgstate,setorgstate]=useState('')
    const [orgservice,setorgservice]=useState([])
    const [orgstatus,setorgstatus] =useState( false)
// Initialize update form with organization data when it's available
  useEffect(() => {
    if (org) {
    
      setorgname(org.name || '');
      setorgemail(org.email || '');
      setorgowner(org.owner || '');
      setorgcontact(org.phone || '');
      setorgaddress(org.address || '');
      setorglocation(org.location || '');
      setorgpin(org.pin || '');
      setorgpostoffice(org.postoffice || '');
      setorgstate(org.state || '');
      setorgservice(org.service || []);
      setorgstatus(org.status ||  false);
    }
  }, [org]);
    
     const toggleForm = () => {
      setIsFormOpen(!isFormOpen);
    };

    const toggleupdateform=()=>{
      setupdateopen(!updateopen)
    }

    const handlesubmit =async(e)=>{
        e.preventDefault()
        const data ={userId,organiseId,name,type,capacity,price}
         try {
           const response = await fetch(`http://localhost:5000/events/post`,{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-type': 'application/json'
                }
           })
            const json = await response.json();

            if (!response.ok) {
              throw new Error(json.error);
            } 
          setIsFormOpen(false);
          // setReloadComponent(!reloadComponent);
            navigate(`/myevent/${userId}`)
        } catch (error) {
          console.log("could not submit the form data")
        }
    }
    const handleorgupsubmit =async(e)=>{
      e.preventDefault();
          const data = { 
            name: orgname,
            email: orgemail,
            owner: orgowner,
            phone: orgcontact,
            address: orgaddress,
            location: orglocation,
            pin: orgpin,
            postoffice: orgpostoffice,
            state: orgstate,
            service: orgservice,
            status: orgstatus
          };
          try {
            const response = await fetch(`http://localhost:5000/organise/update/${organiseId}`, {
              method: 'PATCH',
              body: JSON.stringify(data),
              headers: {
                'Content-type': 'application/json'
              }
            });
            if (!response.ok) {
              const json = await response.json();
              throw new Error(json.error);
            }
            setupdateopen(false);
            navigate(`/myorg/${userId}`);
            window.location.reload()
          } catch (error) {
            console.error("Could not submit the form data:", error);
          }
        };
const [newService, setNewService] = useState('');

  const addService = () => {
    if (newService) {
      setorgservice([...orgservice, newService]);
      setNewService('');
    }
  };

  const removeService = (index) => {
    setorgservice(orgservice.filter((_, i) => i !== index));
  };

  if(!org) return( <div> Create Your Organise</div>)

  return (
    <div className='org-outer-section'>
      <div className="org-section">
      
          <div className="myorg"> 
            <h1>My Organisations</h1>
              <div className="heading-org">
                <p> <strong>Organization Name:</strong>  {org.name}</p>
                <p> <strong>Email:</strong> {org.email}</p>
              </div>
              <div className="heading-org">
                <p> <strong>Owner Name:</strong>  {org.owner}</p>
                <p> <strong>Contact Number: </strong> {org.phone }</p>
              </div>
               
              <div className="org-details">
                <p><strong>Start Date:</strong>      {org.startdate}</p>
                <p><strong>Office Location:</strong> {org.location}</p>
                <p><strong>Office Address:</strong>  {org.address}</p>
                <p><strong>PIN No:</strong>      {org.pin}</p>
                <p><strong>Post Office:</strong> {org.postoffice}</p>
                <p><strong>State:</strong>    {org.state}</p>
                <p><strong>Services:</strong> {org.service.join(', ')}</p>
                <p><strong>Status:</strong>  {org.status ? 'Active' : 'Inactive'}</p>
                <p><strong>Rating:</strong>   {org.rating}</p>
              </div>
            
          </div>
            <> {isFormOpen && (
                              <div className="form-popup">
                                  <div className="form-container">
                                    <form onSubmit={handlesubmit}>
                                      <h2>Add Event details</h2>
                                      <label>
                                        <span>Event name:</span>
                                        <input type="text" placeholder="Event Name" onChange={(e)=>setname(e.target.value)} value={name}required  />
                                      </label>
                                      <label>
                                        <span>Event Type:</span>
                                        <input type="text" placeholder="Type" onChange={(e)=>settype(e.target.value)} value={type} required/>
                                      </label>
                                      <label>
                                        <span> Person Capacity:</span>
                                        <input type="number" placeholder="Capacity"  onChange={(e)=>setcapacity(e.target.value)} value={capacity} required/>
                                      </label>
                                      <label>
                                        <span>Price:</span>
                                        <input type="number" placeholder="price" onChange={(e)=>setprice(e.target.value)} value={price} />
                                      </label>
                                      <button type="submit">Save</button>
                                      <button type="button" onClick={() => toggleForm()}>Cancel</button>
                                    </form>
                                  </div>
                                </div>
                              )}
            </>
                  <div className="items">
                    <button onClick={() => toggleForm()} >Add Event</button>
                    <button>view Events</button>
                    <button onClick={()=>toggleupdateform()}> Update Org Details</button>
                  </div>
                  <>
                  {updateopen &&(  <div className="form-popup-update-details">
                                  <div className="form-container-update-details">
                                    <form onSubmit={handleorgupsubmit}>
                                      <h2>Update Organize Details</h2>
                                      <label>Oganize Name  </label>
                                        <input type="text"onChange={(e)=>setorgname(e.target.value)} value={orgname}  />
                                    
                                      <label> Organize Email  </label>
                                        <input type="text"  onChange={(e)=>setorgemail(e.target.value)} value={orgemail} />
                                        <label> Owner  </label>
                                        <input type="text"  onChange={(e)=>setorgowner(e.target.value)} value={orgowner} />
                                   
                                      <label>Contact No </label>
                                      <input type="number"  onChange={(e)=>setorgcontact(e.target.value)} value={orgcontact}/>
                                     
                                      <label>Address</label>
                                      <input type="text" onChange={(e)=>setorgaddress(e.target.value)} value={orgaddress} />
                                      <label>Location</label>
                                      <input type="text"  onChange={(e)=>setorglocation(e.target.value)} value={orglocation} />
                                      <label>PIN</label>
                                      <input type="number"  onChange={(e)=>setorgpin(e.target.value)} value={orgpin} />
                                      <label>Post Office</label>
                                      <input type="text"  onChange={(e)=>setorgpostoffice(e.target.value)} value={orgpostoffice} />
                                      <label>State</label>
                                      <input type="text"  onChange={(e)=>setorgstate(e.target.value)} value={orgstate} />
                                      {/* <label>Service</label>
                                      <input type="text"  onChange={(e)=>setorgservice(e.target.value)} value={orgservice} /> */}
                                       {/* Services Input */}
                                        <label>Service</label>
                                        <div>
                                          <input
                                            type="text"
                                            placeholder="Add a service"
                                            value={newService}
                                            onChange={(e) => setNewService(e.target.value)}
                                          />
                                          <button type="button" className='add-service' onClick={addService}>Add Service</button>
                                        </div>
                                        <ul>
                                          {orgservice.map((service, index) => (
                                            <li key={index}>
                                              {service}
                                              <button type="button" className="remove-service" onClick={() => removeService(index)}>X</button>
                                            </li>
                                          ))}
                                        </ul>
                                      <label>Status</label>
                                       <select className='selectbtn' onChange={(e) => setorgstatus(e.target.value === 'true')} value={orgstatus}>
                                          <option value={true}>Active</option>
                                          <option value={false}>Inactive</option>
                                        </select>
                          
                                      <button type="submit">Save</button>
                                      <button className="update-cancel-org-btn"type="button" onClick={() => toggleupdateform()}>Cancel</button>
                                    </form>
                                  </div>
                                </div>)}
                  </>
      </div>
    </div>
  )
}
