const express = require('express');
const router = express.Router();
const Fetchuser = require('../../middleware/Fetchuser');
const Items = require('../../models/Items');

//GET, "/api/customer/getitem"
router.get('/', Fetchuser, async(req, res)=>{
    var success = false;
    try{
        const items = await Items.find({user:user.id}).select('-user');
        success = true;
        res.status(200).json({success, items});
    } 
    catch(error){
        success = false;
        return res.status(500).json({success, error});
    }
})


module.exports = router;