const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require('bcryptjs');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


//POST, "/api/auth/register"
router.post('/register',[body('name', 'Enter valid name').isLength({min:3}),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter strong password').isLength({min:5})], 
    async(req, res)=>{
        try {
            //check the validation of input get from frontend
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()})
            }

            //find the user if already exists
            let user = await User.findOne({email:req.body.email});
            var success = false;
            if(user){
                return res.status(400).json({success, error:"Email already exists"});
            }

            //secure the password
            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt);

            //create new user
            user = await User.create({
                name:req.body.name,
                email:req.body.email,
                password:securePassword
            })

            //generate token
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET);
            success = true;
            return res.status(200).json({success, token})
        } 
        catch(error){
            console.log(error);
            success = false;
            return res.status(500).json({success, error})
        }
})

//POST, "/api/auth/login"
router.post('/login', [body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter strong password').isLength({min:5})], 
    async(req, res)=>{
        try {
            //check the validation of input get from frontend
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()})
            }
            
            //find the user before loged in
            let user = await User.findOne({email:req.body.email});
            var success = false;
            if(!user){
                return res.status(400).json({success, error:"Please try to login with correct crendentials"});
            }

            //check the password is correct or not
            const comparePassword = await bcrypt.compare(req.body.password, user.password);
            if(!comparePassword){
                return res.status(400).json({success, error:"Please try to login with correct crendentials."});
            }
           
            //generate token
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET);
            success = true;
            return res.status(200).json({success, token})
        } 
        catch(error){
            console.log(error);
            success = false;
            return res.status(500).json({success, error})
        }

})

//POST, "/api/auth/forgetpassword"
router.post('/forgetpassword', (req, res)=>{
    res.status(200).json({success:"POST method is call, /api/auth/forgetpassword"})
})

//POST, "/api/auth/changepassword"
router.post('/changepassword', (req, res)=>{
    res.status(200).json({success:"POST method is call, /api/auth/changepassword"})
})


module.exports = router;