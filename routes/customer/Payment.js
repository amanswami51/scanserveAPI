const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const instance = require('../../index.js');

//GET method, "/api/customer/getkey"
router.get('/getkey', (req, res)=>{
    return res.status(200).json({key:process.env.RAZORPAY_API_Key})
})

//POST method, "/api/customer/createOrder"
router.post('/createOrder', async(req, res)=>{
    var options = {
        amount: Number(req.body.amount*100), 
        currency: "INR",
    };
    try {
        const order = await instance.orders.create(options);
        return res.status(200).json({success:true, order});
    } 
    catch(error){
        return res.status(500).json({success:false, error});
    }
      
});


//POST method, "/api/customer/paymentVerification"
router.post('/paymentVerification', (req, res)=>{
    try {
        const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_Secret)
            .update(body.toString())
            .digest("hex");
        
            if(expectedSignature===razorpay_signature){
                return res.status(200).json({
                    success:true, 
                    razorpay_order_id
                })
            }else{
                return res.status(400).json({success:false});
            } 
    }catch(error){
        console.log(error);
        return res.status(500).json({error:true})
    }
})

module.exports = router;
