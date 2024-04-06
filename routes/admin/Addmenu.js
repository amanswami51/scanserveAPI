const express = require('express');
const router = express.Router();
const Fetchuser = require('../../middleware/Fetchuser');
const Items = require('../../models/Items');

//GET, "/api/admin/addmenu"
router.get('/', Fetchuser, async(req, res)=>{
    try{
        const items = await Items.find({user:user.id}).select('-user');
        res.status(200).json(items);
    } 
    catch(error){
        console.log(error);
        return res.status(500).json({error});
    }
})

//POST, "/api/admin/addmenu"
router.post('/', Fetchuser, async(req, res)=>{
    const {category, name, description, price, rating, itemPic} = req.body;
    var success = false;
    try{
        const item = new Items({
            category,name,price,itemPic,rating,description,
            user:user.id
        })
        const itemIsSaveOrNot = await item.save();
        success = true;
        res.status(200).json({success, itemIsSaveOrNot});
    } 
    catch(error){
        console.log(error);
        success = false;
        return res.status(500).json({success, error});
    }

})

//PUT, "/api/admin/addmenu"
router.put('/:id', Fetchuser, async(req, res)=>{
    let success = false;
    try{
        //Check Item is found or not
        let item =  await Items.findById(req.params.id);
        if(!item){
            return res.status(400).json({error:"Item Not found"});
        }
        //check the "admin" or "Our user", who want to update item inside the database
        if(item.user.toString()!== user.id){
            return res.status(400).json({error:"Item is not updated"});
        } 
    
        item = await Items.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true}).select('-user');
        success = true;
        res.status(200).json({success, message:"Item is updated successfully", item})
    } 
    catch(error){
        success = false;
        return res.status(500).json({success, error});  
    }
})

//DELETE, "/api/admin/addmenu"
router.delete('/:id', Fetchuser, async(req, res)=>{
    let success = false;
    try{
        //Check Item is found or not
        let item =  await Items.findById(req.params.id);
        if(!item){
            return res.status(400).json({error:"Item Not found"});
        }
        //check the "admin" or "Our user", who want to update item inside the database
        if(item.user.toString()!== user.id){
            return res.status(400).json({error:"Item is not updated"});
        } 
    
        item = await Items.findByIdAndDelete(req.params.id).select('-user');
        success = true;
        res.status(200).json({success, message:"Item is deleted successfully", item})
    } 
    catch(error){
        success = false;
        return res.status(500).json({success, error});  
    }
})

module.exports = router;