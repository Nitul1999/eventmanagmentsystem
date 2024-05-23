import React from 'react'
import { Routes,Route } from "react-router-dom"
import { Hoempage } from "./pages/homepage/Hoempage";
import { Organisepage } from "./pages/organisepage/Organisepage";
import { Signup } from './pages/auth/Signup';
import { Login } from './pages/auth/Login';
import { Eventpage } from './pages/EventPages/Eventpage';
import { ProfileBio } from './pages/UserProfile/ProfileBio';
import { UserProfile } from './pages/UserProfile/UserProfile';
import { Myoranization } from './pages/Oranization/Myoranization';
import { Vieworganise } from './pages/Oranization/Vieworganise';
import Events from './pages/Myevents/Events';
import Mybooking from './pages/Mybookings/Mybooking';
import { Recentbooking } from './pages/Mybookings/Recentbooking';

const Allroutes = () => {
  return (
          <Routes>
                    <Route path="/" element={<Hoempage /> } />
                    <Route path="/organise" element={<Organisepage /> } />
                    <Route path="/events" element={<Eventpage/>}/>
                    <Route path='/profile/:id' element={<UserProfile/>}/>
                    <Route path="/signup" element={ <Signup />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path='/createorganization' element ={<Myoranization/>}/>
                    <Route path='/myorg/:id' element={<Vieworganise/>}/>
                    <Route path='/myevent/:id' element={<Events /> }/>
                    <Route path='/mybooking/:id'element ={ <Mybooking/>}/>
                    <Route path='/viewbooking/:id' element={<Recentbooking/>} />
         </Routes>
  )
}
export default Allroutes
