const mongoose = require('mongoose')
const schema = mongoose.Schema

const bookingmodel = new schema({
    userId:{type: String},  //user who is making the booking
    eventId:{type:String },
    organiseId :{type:String} , //event for which the    
    bookingDate:{ type: Date ,default: Date.now},
    bookingday:{ type : String},
    noofday:{type: Number},
    bookingstatus:{type: Boolean},
    Status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    paymentstatus:{type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",}

},{timestamps: true})

module.exports = mongoose.model('booking',bookingmodel)