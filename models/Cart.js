const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    tableNo:{
        type:Number,
        required:true
    },
    TotalPrice:{
        type:Number,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('cartitem', CartSchema);