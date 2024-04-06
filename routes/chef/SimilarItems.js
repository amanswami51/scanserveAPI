const express = require('express');
const router = express.Router();

//GET, "/api/admin/chef"
router.get('/', (req, res)=>{
    res.status(200).json({success:"GET method is call, /api/admin/chef"})
})

module.exports = router;