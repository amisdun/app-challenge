const { UserOrders } = require("../models/userOrders");

const placeOrder = async (orderDetails) => {
	const placeOrders = await UserOrders.create(orderDetails);
	return placeOrders;
};

module.exports = { placeOrder };
