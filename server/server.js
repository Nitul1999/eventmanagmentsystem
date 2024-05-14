const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')

const userrouter = require('./routes/user');
const organiserouter = require('./routes/organise')
const eventsrouter = require('./routes/event')
const commentrouter = require('./routes/postcomment')
const bookingrouter = require('./routes/booking')

const port = process.env.PORT || 5000
const app = express()

app.use(express.json())  // middleware 
app.use(cors())


app.use('/user',userrouter)
app.use('/organise',organiserouter)
app.use('/events',eventsrouter)
app.use('/comment',commentrouter)
app.use('/booking',bookingrouter)


const url = "mongodb+srv://nitulsonowal8133:nitul12345@events.6io85z4.mongodb.net/?retryWrites=true&w=majority"

// Connect to MongoDB ------------------------------
 mongoose.connect(url)
 .then(()=>{
     app.listen(port,()=>{
        console.log(`app running in port ${port}`)
     })
 })
  .catch((error)=>{
        console.log(error)
     })


