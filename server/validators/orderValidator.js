const express_validator = require("express-validator");

const orderValidator = [
	express_validator
		.check("orders")
		.isObject()
		.withMessage("should be an array of ordered items"),
];

module.exports = { orderValidator };
