const { User } = require("../models/user");
const {
	errorResponse,
	successResponse,
} = require("../serverResponse/response");
const { updateUser } = require("../services/updateUser");
const { documentExist } = require("../utils/documentExist");

const updateUserController = async (request, response) => {
	try {
		const { userId: _id } = request.params;
		await documentExist(User, { _id });
		request.body.userId = _id;
		const user = await updateUser(request.body);
		successResponse(response, { data: user });
	} catch (error) {
		console.log(error.message);
		errorResponse(response, error.message, 500);
	}
};

module.exports = { updateUserController };
