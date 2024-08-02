const express = require("express");
const router = express.Router();
const { getDailyCollection, getWeeklyCollection, getMonthlyCollection } = require('../controllers/collections-controller');

// Route to get daily collection
router.get("/daily", async (req, res) => {
  try {
    const dailyCollection = await getDailyCollection();
    res.json(dailyCollection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get weekly collection
router.get("/weekly", async (req, res) => {
  try {
    const weeklyCollection = await getWeeklyCollection();
    res.json(weeklyCollection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get monthly collection
router.get("/monthly", async (req, res) => {
  try {
    const monthlyCollection = await getMonthlyCollection();
    res.json(monthlyCollection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
