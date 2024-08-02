const OrderBill = require('../models/order-bill-model')

const getDailyCollection = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dailyCollection = await OrderBill.aggregate([
    {
      $match: {
        date: {
          $gte: today,
          $lt: tomorrow
        }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$billAmount" }
      }
    }
  ]);

  return dailyCollection;
};

const getWeeklyCollection = async () => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  const weeklyCollection = await OrderBill.aggregate([
    {
      $match: {
        date: {
          $gte: startOfWeek,
          $lt: endOfWeek
        }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$billAmount" }
      }
    }
  ]);

  return weeklyCollection;
};

const getMonthlyCollection = async () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const monthlyCollection = await OrderBill.aggregate([
    {
      $match: {
        date: {
          $gte: startOfMonth,
          $lt: endOfMonth
        }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$billAmount" }
      }
    }
  ]);

  return monthlyCollection;
};

module.exports = { getDailyCollection, getWeeklyCollection, getMonthlyCollection };
