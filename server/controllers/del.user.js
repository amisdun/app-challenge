const { User } = require("../models/user");
const {
	errorResponse,
	successResponse,
} = require("../serverResponse/response");
const { deleteUsers } = require("../services/deleteUsers");
const { documentExist } = require("../utils/documentExist");

const delUserController = async (request, response) => {
	try {
		const { userId: _id } = request.params;
		await documentExist(User, { _id });
		await deleteUsers(_id);
		successResponse(response, {}, "No Content", 204);
	} catch (error) {
		console.log(error.message);
		errorResponse(response, error.message, 500);
	}
};

module.exports = { delUserController };
