const express = require('express')

const router = express.Router()

const itemController = require("../controllers/items-controller")

router.route("/addItem").post(itemController.add)
router.route("/getItem").get(itemController.fetch)
router.route("/updateItem/:name").put(itemController.update)
router.route("/deleteItem/:name").delete(itemController.remove)

module.exports = router