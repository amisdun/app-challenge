const { User } = require("../models/user");

const updateUser = async (userDetails) => {
	const { userId, ...userDetail } = userDetails;
	const userUpdate = await User.findByIdAndUpdate(userId, userDetail, {
		new: true,
	});
	return userUpdate;
};

module.exports = { updateUser };
