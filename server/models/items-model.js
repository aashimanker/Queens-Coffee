const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image_url:{
        type:String,
        required:false,
        default:"https://i.pinimg.com/736x/ff/dc/be/ffdcbea5092e55edab36678c1db1586a.jpg"
    }
})

const Item = mongoose.model("Item",itemSchema)

module.exports = Item