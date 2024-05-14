const mongoose = require('mongoose')
const organise = require('../model/organisemodel')


//get all organise by  top rating
const getallorganise = async(req,res)=>{
    const allorganise = await organise.find({}).sort({ 'createdAt': 1})
    res.status(200).json(allorganise)
}
//get all organize by top rating
const getbytoprating = async(req,res)=>{
    const ratingtop = await organise.find().sort({'rating': 1})
    res.status(200).json(ratingtop)
}

//create a organise 
const createorganise = async(req,res)=>{

    const postorganisedata = req.body
    const userid = req.userid
    try{
      
        const postorganise = await organise.create({
            ...postorganisedata, userid
        })
        if(!postorganise){
            res.status(500).json({msg: ' Server Error'})
        }
        res.status(201).json(postorganise)

    }catch(error){
        res.status(500).json({error:error.message})

    }
}
//get organize by userId
// const getorgbyuserid = async(req,res)=>{
//      console.log("infinite here")
//     const {id:userid} = req.params
//     if(!mongoose.Types.ObjectId.isValid(userid)){
//         res.status(500).json({error:'event not found'})
//     }
   
//      const singleorganize = await organise.findOne({userId:userid})
//        if(!singleorganize){
//         res.status(404).json({error: 'user not found'})
//     }
//     res.status(201).json(singleorganize)
// }
// app.post('/organise/myorg', async (req, res) => {
//   const { userId } = req.body;
//   const organisation = await Organisation.findOne({ userId });
//   if (!organisation) {
//     return res.status(404).json({ message: 'Organisation not found' });
//   }
//   res.json(organisation);
// });
const getorgbyuserid = async(req,res)=>{
        const { userId } = req.params;
        const organisation = await organise.findOne(userId);
        if (!organisation) {
            return res.status(404).json({ message: 'Organisation not found' });
        }
        res.status(202).json(organisation);
}


//get single event
const  getsingleorganize = async (req , res )=> {
    const {id:_id}= req.params
    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(500).json({error:'event not found'})
    }
    const singleorganize = await organise.findById(_id)

    if(!singleorganize){
        res.status(404).json({error: 'user not found'})
    }
    res.status(201).json()
}



// update 
const updateone = async(req,res)=>{
    const updatesdata = req.body
    const {id:_id} = req.params

    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(404).json({error: " not found"})
    }
    const update = await organise.findByIdAndUpdate( _id,{ $set:{   ...updatesdata}
     
    })
    if(!update){
        res.status(500).json({error:" fail to update"})
    }
    res.status(201).json(update)

}

const deleteone = async(req,res)=>{
    const {id} = req.params
     if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'not vaild id'})
     }
  const deleteorganise = await organise.findOneAndDelete({_id: id})
     if(!deleteorganise){
        res.status(404).json({msg: ' not found'})
     }

     res.status(201).json(deleteorganise)

}

module.exports ={
    getallorganise,
    createorganise,
    getbytoprating,
    getsingleorganize,
    updateone,
    deleteone,
    getorgbyuserid
}