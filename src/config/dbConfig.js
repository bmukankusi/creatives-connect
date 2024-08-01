const mongoose= require("mongoose")
const dotenv= require("dotenv").config

async function dbConnet(){
    mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
}

module.exports= dbConnet;

