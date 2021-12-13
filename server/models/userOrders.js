const mongoose = require("mongoose");

const { Schema, model, Types } = mongoose;

const userOrdersSchema = new Schema(
	{
		user: {
			required: true,
			type: Types.ObjectId,
			ref: "User",
		},
		ordersList: [
			{
				item: {
					required: true,
					type: Types.ObjectId,
					ref: "menuItem",
				},
				numberOfItems: {
					type: Number,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	},
);

const UserOrders = model("userOrdersSchema", userOrdersSchema);

module.exports = { UserOrders };
