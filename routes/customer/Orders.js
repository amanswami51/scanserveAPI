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

module.exports = router;