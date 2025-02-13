const mongoose = require('mongoose')
require('dotenv').config()

exports.connect = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("DB conneceted successfully"))
    .catch((error)=>{
        console.log("DB connection failed")
        console.error(error);
        process.exit(1)
    })
};