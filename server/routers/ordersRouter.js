const express = require("express");
const { authenticate } = require("../auth/userAuth");
const { getMenuItemsController } = require("../controllers/get.menuItems");
const { userOrderItemController } = require("../controllers/post.orderItem");
const { orderValidator } = require("../validators/orderValidator");
const { ValidationChecker } = require("../validators/validatorChecker");
const router = express.Router();

// user route for CRUD
router.post(
	"/placeOrder",
	authenticate,
	orderValidator,
	ValidationChecker,
	userOrderItemController,
);
router.get("/menuItems", getMenuItemsController);

module.exports = router;
