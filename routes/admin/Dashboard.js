const express = require('express');
const router = express.Router();

//GET, "/api/admin/dashboard"
router.get('/', (req, res)=>{
    res.status(200).json({success:"GET method is call, /api/admin/dashboard"})
})

module.exports = router;