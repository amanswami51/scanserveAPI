const express = require('express');
const router = express.Router();
const qrcode = require('qrcode');


// '/api/qrcode' route
router.get('/', (req, res)=>{
    const url = 'https://scanserve-88.web.app/user/menufirstpage';
    qrcode.toDataURL(url, (err, qrCodeUrl)=>{
        if(err){
            return res.status(500).json({success:false, err});
        }else{
            return res.json({success:true, qrCodeUrl});
        }
    })
})

module.exports = router;