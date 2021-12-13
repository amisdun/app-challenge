const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const menuItemSchema = new Schema({
	name: {
		required: true,
		type: String,
	},
	itemDescription: {
		required: true,
		type: String,
	},
	price: {
		type: String,
		required: true,
	},
});

const MenuItem = model("menuItem", menuItemSchema);

module.exports = { MenuItem };
