const mongoose = require('mongoose')
const booking = require('../model/bookingmodel')
const organise =require('../model/organisemodel')
//get all booking
const getbookingall = async(req,res)=>{
    const allbooking = await booking.find({}).sort({ 'createdAt': 1})
    res.status(200).json(allbooking)
}
const getsinglebooking = async(req,res)=>{
    const {id:_id} = req.params

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({error:" booking not found"})

    }
    const getdata= await booking.findById( _id )
    if(!getdata){
       return res.status(500).json({error:" data not found"})
    }
    res.status(200).json(getdata)
}

//create a booking
const createbooking = async(req,res)=>{

    const postbookingdata = req.body
    const createbook = await booking.create({...postbookingdata})
    
  if(!createbook){
    return res.status(500).json({error: "booking not create"})
  }
  res.status(201).json(createbook)

}

//get booking by userId
const getmybooking =async(req,res)=>{
    const {id:userId} = req.params
    const mybooking = await booking.find({userId})
     if(!mybooking){
       return res.status(500).json({error: "booking not found"})
     }
  res.status(201).json(mybooking)
}
//delete a booking
const deletebooking = async(req,res)=>{

    const { id:_id} = req.params

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json("booking not found")
    }
    const  removeData = await booking.findOneAndDelete({_id})
    if (!removeData) {
      return res.status(404).json({ error: 'Booking not found' });
    }
  
    res.status(200).json(removeData);
}
//update booking
const updatebooking = async(req,res)=> {
    const{id:_id}= req.params;
    const updates = req.body
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
       return res.status(404).json({error: "booking details not found"})
    }
    const bookingData =await booking.findByIdAndUpdate(_id,{$set:{...updates}})  
    if(!bookingData){
        return res.status(500).json({error:'Error updating the booking'})
    }
    res.status(201).json(bookingData)
}

//recent booking for organiser
const recentbooking = async(req,res)=>{
    const { id: eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(404).json({ error: "Booking details not found" });
    }

    try {
        const bookingData = await booking.find({ eventId });
        if (!bookingData) {
            return res.status(404).json({ error: "Booking not found" });
        }
        return res.status(200).json(bookingData); // Changed to 200 OK as this is a successful data retrieval
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports={
    getbookingall,
    createbooking,
    getsinglebooking,
    deletebooking,
    updatebooking,
    getmybooking,
    recentbooking 
}