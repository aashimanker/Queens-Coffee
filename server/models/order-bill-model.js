const mongoose = require('mongoose')

const orderBillSchema = new mongoose.Schema({
    billId :{
      type:String,
      required:true,
      unique:true
    },
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    billAmount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      // required: true,
    },
  });

const OrderBill = mongoose.model("OrderBill",orderBillSchema)

module.exports = OrderBill