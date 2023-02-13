const express = require("express");
const {requiresignin} = require('../Middleware/middleware')
const {deleteMeeting,updateMeeting} = require('../controller/meeting')
const {isRequestValidated,validateMeetingDetails} = require('../Validation/validate')
const router=express.Router()

router.delete('/deletemeeting/:id',requiresignin,deleteMeeting);


router.put('/updatemeeting/:id',requiresignin,validateMeetingDetails,isRequestValidated,updateMeeting)


module.exports = router;