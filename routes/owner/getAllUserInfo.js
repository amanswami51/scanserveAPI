const express = require('express');
const router = express.Router();
const User = require('../../models/User');

//method: GET, Route: "/api/owner/get/allUserInfo"
router.get('/', async(req, res)=>{
    try {
        const user = await User.find().select("-password -_id").sort("-date");
        res.status(200).json({success:true, user});
    }
    catch(error){
        return res.status(400).json({success:false, error})
    }
})

module.exports = router;