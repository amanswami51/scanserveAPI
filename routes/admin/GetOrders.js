const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cart = require('../../models/Cart');
const Fetchuser = require('../../middleware/Fetchuser');

//get Current order for showing on the admin/dashboard.
//GET, "/api/admin/getOrders/current"
router.get('/current', Fetchuser, async(req, res)=>{
    var success = false;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const startOfDay = new Date(year, month - 1, day, 0, 0, 0); 
    const endOfDay = new Date(year, month - 1, day, 23, 59, 59);
    try{
        const queryArray = [
            {
                $match:{
                    user:new mongoose.Types.ObjectId(user.id)
                }
            },
            {
                $match:{
                    date:{$gte:startOfDay, $lte:endOfDay}
                }
            },
            { 
                $project:{ 
                    user: 0 
                } 
            }
        ]
        const orders = await Cart.aggregate((queryArray)).sort('-date');
        success = true;
        res.status(200).json({success, orders});

    } 
    catch(error){
        success = false;
        console.log(error);
        return res.status(500).json({success, error});
    }
})

//get Previous order for showing on the admin/dashboard.
//POST, "/api/admin/getOrders/previous"
router.post('/previous', Fetchuser, async(req, res)=>{

    const startOfDay = new Date(req.body.start); 
    const end = new Date(req.body.end);
    const year = end.getFullYear();
    const month = end.getMonth();
    const day = end.getDate();
    const endOfDay = new Date(year, month, day, 23, 59, 59);
   
    try{
        const queryArray = [
            {
                $match:{
                    user:new mongoose.Types.ObjectId(user.id)
                }
            },
            {
                $match:{
                    date:{$gte:startOfDay, $lte:endOfDay}
                }
            },
            { 
                $project:{ 
                    user: 0 
                } 
            }
        ]
        const orders = await Cart.aggregate((queryArray)).sort('-date');
        res.status(200).json({success:true, orders});
    } 
    catch(error){
        console.log(error);
        return res.status(500).json({success:false, error});
    }
})

  

module.exports = router;