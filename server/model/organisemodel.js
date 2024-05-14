const mongoose = require('mongoose')
const schema = mongoose.Schema

const organisemodel = new schema({
   name : { type: String, require:"please provide name"},
   email:{ type: String, require: "Please enter a valid email address" },  //
   owner:{type:String},
   userId: {type:String},
   phone:{ type: Number},
   startdate:{type: Date},
   location: {type:String},
   address:{ type: String},
   pin: {type: Number},
   postoffice:{ type:String},
   state:{type: String},
   service: {type:[String]},
   totalboking:{ type: Number,default: 0},
   status:{type: Boolean},
   rating:{type:Number,default: 0},
  
},{timestamps: true})

module.exports = mongoose.model('organise',organisemodel)