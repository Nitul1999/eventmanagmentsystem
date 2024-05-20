const mongoose = require('mongoose')
const event = require('../model/eventsmodel')


//get all
const getallevent =async(req,res)=>{
 const allevent = await event.find()
    res.status(200).json(allevent)
}
//get a single event
const singlevent = async(req,res)=>{
    const {id:_id}= req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(500).json({error:'event not found'})
    }
    const eventdata=await event.findOne({_id})
    if(!eventdata){
        res.status(404).json({error:"event not found"})
    }
    res.status(201).json(eventdata)
}
//return top rating events
const toprating = async(req,res)=>{
     try {
        // Assuming 'event' is your mongoose model
        const top = await event.find({ rating: 1 });
        // Send the response back to the client
        res.status(200).json({ success: true, data: top });
    } catch (error) {
        // If an error occurs during the database operation or response sending, handle it
        console.error("Error fetching top rating events:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

//get event by user id
const geteventuser = async(req,res)=>{
        const { userId } = req.params;
        const events = await event.find(userId);
        if (!events) {
            return res.status(404).json({ message: 'Events not found' });
        }
        res.status(202).json(events);

}

//create one
const createevent = async(req,res)=>{
  
    const posteventdata = req.body
    // const userId = req.userId
    // const organiseId = req.body
    try{
      
        const postevent = await event.create({
            ...posteventdata
        })
        if(!postevent){
            res.status(500).json({msg: ' Server Error'})
        }
        res.status(201).json(postevent)

    }catch(error){
        res.status(500).json({error:error.message})

    }
}


//update one event details
const updateevent = async(req,res) =>{
          const updatesdata = req.body
          const {id:_id} = req.params

    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(404).json({error: " not found"})
    }
    const update = await event.findByIdAndUpdate(_id,{$set:{ ...updatesdata}
       
    })
    if(!update){
        res.status(500).json({error:" fail to update"})
    }
    res.status(201).json(update)

}

//update total no of comment
const updatnoofcomment = async (_id, noofcomment) => {
    try {
        await event.findByIdAndUpdate( _id, { $set: { 'noofcomment' : noofcomment}})
    } catch (error) {
        console.log(error)
    }
}



//delete a event
const deletevent =async(req,res)=>{
    const {id:_id}= req.params

    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(404).json({error:"not a vaild id"})
    }
    const deleteone = await event.findByIdAndDelete(_id)
    if(!deleteone){
        res.status(404).json({error:"not deleted"})
    }
    res.status(200).json(deleteone)
}

//update price
const updateprice = async(req,res)=>{
    const {id:_id} = req.params
    const { index, value} = req.body
try{ 
    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(404).json({error:"not a vaild id"})
    }

    const update = {}  ;
    update[`price.${index}`] = value

    const data = await event.findByIdAndUpdate( {_id},{$set:update })

    if(!data){
        res.status(400).json({error:"fail to update"})
    }
    res.status(200).json(data)

   }catch(error){
     res.status(400).json(error)
   }

}
//update capacity
const updatecapacity = async(req,res)=>{
    const {id:_id} = req.params
     const { index, value} = req.body
try{ 
    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(404).json({error:"not a vaild id"})
    }

    const update = {}  ;
    update[`capacity.${index}`] = value

    const data = await event.findByIdAndUpdate( {_id},{$set:update })

    if(!data){
        res.status(400).json({error:"fail to update"})
    }
    res.status(200).json(data)

   }catch(error){
     res.status(400).json(error)
   }
}

//latest create date
const latest = async(req,res)=>{
    try{
            const latestevent = await event.find().sort({ createdAt: -1 }).limit(3);
            if(!latestevent){
                res.status(400).json({error:"nothing to show"})
            }
            res.status(200).json(latestevent)
    }catch(error){
         res.status(400).json(error)
    }
}

module.exports ={ 
  getallevent ,
  deletevent,
  createevent,
  updateevent,
  geteventuser,
  singlevent,
  updateprice,
  updatecapacity,
  toprating,
  latest
}