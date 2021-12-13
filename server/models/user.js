const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
	email: {
		required: true,
		type: String,
	},
	password: {
		required: true,
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	streetAddress: {
		type: String,
		required: false,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
	isLoggedIn: {
		type: Boolean,
		required: true,
		default: false,
	},
	token: {
		type: String,
	},
});

const User = model("User", userSchema);

module.exports = { User };
