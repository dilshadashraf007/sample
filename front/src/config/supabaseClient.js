require('dotenv').config();
const mongoose = require('mongoose'); 
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in the environment variables.');
}

const connectDB = ()=> {
    mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log("connected to mongodb"))
        .catch((err)=>console.log(err))
};

module.exports= {connectDB};
