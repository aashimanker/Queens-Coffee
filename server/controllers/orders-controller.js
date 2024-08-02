const mongoose = require('mongoose')
const OrderBill = require("../models/order-bill-model");
const calculateBill = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { billId, items, billAmount } = req.body;

    let existingBill = await OrderBill.findOne({ billId }).session(session);
    if (existingBill) {
      await session.commitTransaction();
      session.endSession();
      res.json({ _id: existingBill._id });
    } else {
      const orderBill = new OrderBill({ billId, items, billAmount });
      const result = await orderBill.save({ session });
      await session.commitTransaction();
      session.endSession();
      res.json({ _id: result._id });
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error saving order bill:', error);
    res.status(500).json({ msg: 'Error saving order bill' });
  }
}
module.exports = { calculateBill };