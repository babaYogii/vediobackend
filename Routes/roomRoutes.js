const express = require("express");
const {requiresignin,isUrlValid,safeGaurd} = require('../Middleware/middleware')
const {createMeeting, getMeetings} = require('../controller/dynamicUrl')
const {isRequestValidated,validateMeetingDetails} = require('../Validation/validate')
const router=express.Router()

router.post('/createMeeting',requiresignin,validateMeetingDetails,isRequestValidated,createMeeting);

router.get('/getMeetings',requiresignin,getMeetings)

router.post('/joinRoom',isUrlValid)

router.post('/room',safeGaurd)


module.exports = router;