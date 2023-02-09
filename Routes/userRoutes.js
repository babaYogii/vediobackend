const express = require("express");
const { signup, signin } = require("../Controller/userAuth");
// const { requiresignin } = require("../middleware/MiddleWare");
const { validateSignUpRequest,isRequestValidated, validateSignInrequest } = require("../validation/validate");
const router = express.Router();

router.post('/signin',validateSignInrequest,isRequestValidated,signin);

router.post('/signup',validateSignUpRequest,isRequestValidated,signup);



module.exports = router;