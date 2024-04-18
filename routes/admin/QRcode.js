const express = require('express');
const router = express.Router();
const qrcode = require('qrcode');
const Fetchuser = require('../../middleware/Fetchuser');


// '/api/qrcode' route
router.get('/', Fetchuser, async(req, res)=>{

    const url = req.header('url');   // const url = 'https://scanserve-88.web.app/user/menufirstpage';
    const totalqrcode = req.header('totalqrcode');
    const userId = user.id;

    try{
        var qrCodeArr = []; 
        for(let table=1; table<=totalqrcode; table++){
            const websiteLink = `${url}/:${table}/:${userId}`;
            const x = await qrcode.toDataURL(websiteLink)
            qrCodeArr.push(x);
        } 
        return res.status(200).json({success:true, qrCodeArr});

    }
    catch(error){
        return res.status(500).json({success:false, error});
    }
})


module.exports = router;