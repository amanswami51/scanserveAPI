const express = require('express');
const router = express.Router();
const Fetchuser = require('../../middleware/Fetchuser');
const Items = require('../../models/Items');

//GET, "/api/customer/getitem"
router.get('/', Fetchuser, async(req, res)=>{
    console.log(req.query)
    try{
        const items = await Items.find({user:user.id}).select('-user');
        res.status(200).json(items);
    } 
    catch(error){
        console.log(error);
        return res.status(500).json({error});
    }
})


module.exports = router;