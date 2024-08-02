const mongoose = require('mongoose')
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Successful connection to DB")
    } catch (error) {
        console.log("Failed connection to database")
        process.exit(0)
    }
}

module.exports = connectDB