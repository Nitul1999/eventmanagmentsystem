const express = require('express')
const { createbooking, getbookingall, getsinglebooking, updatebooking, getmybooking, deletebooking } = require('../controllers/bookingcontroller')
const router = express.Router()

router.get('/',getbookingall)
router.get('/:id',getsinglebooking)

//get booking by userId
router.get('/mybooking/:id',getmybooking)
//create booking
router.post('/post',createbooking)
//update booking
router.patch('/update/:id',updatebooking )
//delete booking
router.delete('/delete/:id',deletebooking)


module.exports = router