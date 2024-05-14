const express = require('express');
const http = require('http');
require('dotenv').config();
const connectToDB = require('./db');
const cors = require('cors');
const Razorpay = require('razorpay');


const port = process.env.PORT || 5000;
const app = express();
app.use(cors({origin:"https://scanserve-88.web.app", credentials:true}));
// app.use(cors({origin:"http://localhost:3000", credentials:true}));
connectToDB();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const server = http.createServer(app);

const instance = new Razorpay({  
    key_id: process.env.RAZORPAY_API_Key,  
    key_secret: process.env.RAZORPAY_API_Secret,
});
module.exports = instance;

//For admin mode
app.use('/api/qrcode', require('./routes/admin/QRcode')) //done
app.use('/api/auth', require('./routes/admin/Authentication')) //done
app.use('/api/admin/addmenu', require('./routes/admin/Addmenu')) //done
app.use('/api/admin/dashboard', require('./routes/admin/Dashboard'))

//For Customer
app.use('/api/customer/getitem', require('./routes/customer/GetItems')) //Get items for customer page
app.use('/api/customer/orders', require('./routes/customer/Orders')) //Handle order
app.use('/api/customer', require('./routes/customer/Payment')) //Handle payment routes

//For Chef
app.use('/api/admin/chef', require('./routes/chef/SimilarItems'))

server.listen(port, ()=>{
    console.log('server running successfully')
})