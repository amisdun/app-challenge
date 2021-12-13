const { User } = require("../models/user");
const { errorResponse } = require("../serverResponse/response");

const isAdmin = async (request, response, next) => {
	try {
		const { _id } = request.user;
		const user = await User.findById(_id);
		if (user && !user.isAdmin) {
			throw new Error("UnAuthorized Access");
		}
		return next();
	} catch (error) {
		errorResponse(response, error.message, 401);
	}
};

module.exports = { isAdmin };
