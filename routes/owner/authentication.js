const express = require('express');
const router = express.Router();
const Owner = require("../../models/Owner");
const bcrypt = require('bcryptjs');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


//POST, "/api/owner/auth/register"
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
            let user = await Owner.findOne({email:req.body.email});
            var success = false;
            if(user){
                return res.status(400).json({success, error:"Email already exists"});
            }

            //secure the password
            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt);

            //create new user
            user = await Owner.create({
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
            const ownerToken = jwt.sign(data, process.env.JWT_SECRET);
            success = true;
            return res.status(200).json({success, ownerToken})
        } 
        catch(error){
            console.log(error);
            success = false;
            return res.status(500).json({success, error})
        }
})

//POST, "/api/owner/auth/login"
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
            let user = await Owner.findOne({email:req.body.email});
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
            const ownerToken = jwt.sign(data, process.env.JWT_SECRET);
            success = true;
            return res.status(200).json({success, ownerToken})
        } 
        catch(error){
            console.log(error);
            success = false;
            return res.status(500).json({success, error})
        }

})


module.exports = router;