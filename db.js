const mongoose = require('mongoose');

const connectToDB = ()=>{
    mongoose.connect(process.env.URI).then(()=>{
        return console.log('database is connected successfully')
    }).then((err)=>{
        return console.log(err)
    })
}

module.exports = connectToDB;