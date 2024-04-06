const express = require('express');
const http = require('http');
require('dotenv').config();
const connectToDB = require('./db');
const cors = require('cors');


const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
connectToDB();
app.use(express.json());

const server = http.createServer(app);



//For admin mode
app.use('/api/qrcode', require('./routes/admin/QRcode')) //done
app.use('/api/auth', require('./routes/admin/Authentication')) //done
app.use('/api/admin/addmenu', require('./routes/admin/Addmenu')) //done
app.use('/api/admin/dashboard', require('./routes/admin/Dashboard'))

//For Customer
app.use('/api/customer/getitem', require('./routes/customer/GetItems')) //Get items for customer page
app.use('/api/customer/orders', require('./routes/customer/Orders')) //Handle order

//For Chef
app.use('/api/admin/chef', require('./routes/chef/SimilarItems'))

server.listen(port, ()=>{
    console.log('server running successfully')
})