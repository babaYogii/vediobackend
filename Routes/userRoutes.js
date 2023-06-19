const express = require("express");
const { signup, signin } = require("../controller/userAuth");
// const { requiresignin } = require("../middleware/MiddleWare");
const { validateSignUpRequest,isRequestValidated, validateSignInrequest } = require("../Validation/validate");
const router = express.Router();

router.post('/signin',validateSignInrequest,isRequestValidated,signin);

router.post('/signup',validateSignUpRequest,isRequestValidated,signup);



module.exports = router;