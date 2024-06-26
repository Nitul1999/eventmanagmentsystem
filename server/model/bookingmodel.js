const mongoose = require('mongoose')
const schema = mongoose.Schema

const bookingmodel = new schema({
    name:{type:String},
    userId:{type: String},  //user who is making the booking
    eventId:{type:String },
    organiseId :{type:String} , //event for which the    
    bookingDate:{ type: String},
    noofday:{type: Number},
    location:{type:String},
    pin:{type:Number},
    district:{type:String},
    contact:{type:Number},
    email:{type:String},
    panno:{type:String},
    bookingstatus:{type: Boolean},
    capacity:{type:Number},
    Status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    price:{type:Number},
    paymentstatus:{type: String,
      enum: ["Pending","Unpaid", "Paid"],
      default: "Pending",},
    eventname:{type: String},
    eventtype:{type:String}

},{timestamps: true})

module.exports = mongoose.model('booking',bookingmodel)