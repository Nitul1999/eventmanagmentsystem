const mongoose = require('mongoose')
const schema = mongoose.Schema

const usermodel = new schema({
   name : { type: String, require: "user must have an name"},
   email:{ type: String, require: "user must have an email" },
   usertype:{type: String},
   phone:{ type: Number},
   password: {type:String},
   location: {type:String}
},{timestamps: true})

module.exports = mongoose.model('user',usermodel)