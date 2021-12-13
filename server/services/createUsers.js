const { User } = require("../models/user");

const createUser = async (userDetails) => {
	const user = await User.create(userDetails);
	return user;
};

module.exports = { createUser };
