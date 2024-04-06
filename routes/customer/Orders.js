const express = require('express');
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
            items:newOrder
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
    try{
        const orders = await Cart.find({user:user.id}).select('-user');
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