const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Cart = require('../../models/Cart');
const Fetchuser = require('../../middleware/Fetchuser');

//Receive orders from customers
//Post, '/api/customer/orders'
router.post('/', Fetchuser, async(req, res) =>{
    const {newOrder, table, TotalPrice} = req.body;
    var success = false;
    try{
        const cartItem = new Cart({
            user:user.id,
            tableNo:table,
            TotalPrice:TotalPrice,
            items:newOrder,
            date: new Date()
        })
        const cartItemIsSaveOrNot = await cartItem.save();
        success = true;
        return res.status(200).json({success, cartItemIsSaveOrNot});
    } 
    catch(error){
        console.log(error);
        success = false;
        return res.status(500).json({success, error});
    }
});

//get order for showing on the admin/dashboard.
//GET, "/api/admin/addmenu"
router.get('/', Fetchuser, async(req, res)=>{
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

  

module.exports = router;