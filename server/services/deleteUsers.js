const { User } = require("../models/user");

const deleteUsers = async (userId) => {
	await User.findByIdAndDelete(userId);
};

module.exports = { deleteUsers };
