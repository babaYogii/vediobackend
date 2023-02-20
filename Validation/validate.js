const {validationResult,check} =require('express-validator')


exports.validateSignUpRequest=[
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage("Please enter a valid email"),
    check('password').isLength({min:6,max:10}).withMessage('Enter the password').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/).withMessage('follow the password criteria'),
    check('confirmPassword').isLength({min:6,max:10}).withMessage('Confirm password is required').custom(async(confirmPassword,{req})=>{
      const password = req.body.password 
      if(password !== confirmPassword){
        throw new Error('Passwords && confirm password must be same')
      }
    })
]

exports.validateSignInrequest=[
  check('email').isEmail().withMessage("Please enter a valid email"),
  check('password').isLength({min:6}).withMessage('Enter the password'),
]

exports.validateMeetingDetails=[
  check("meetingName").isLength({min:1}).withMessage("Enter valid meeting name"),
  check('sizeOfMeeting').isInt({ min: 1, max: 15 }).withMessage("Users cannot be greater than 15 per meeting"),
  // check('scheduleDate').isLength({min:7}).withMessage("Enter a valid date"),
  check('user').isLength(10).withMessage("User is required")

]

exports.validateUrl=[
  check("meetingUrl").notEmpty().withMessage("Please Enter Valid url")
]

exports.isRequestValidated=(req,res,next)=>{
      const errors=validationResult(req);
      if(errors.array().length>0){
        return res.status(400).json({error:errors.array()[0].msg})
      }
      next();
}


