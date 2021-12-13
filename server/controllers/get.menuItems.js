const {
	errorResponse,
	successResponse,
} = require("../serverResponse/response");
const { getAllMenuItems } = require("../services/getAllMenuItems");

const getMenuItemsController = async (request, response) => {
	try {
		const menuItems = await getAllMenuItems();
		successResponse(response, { data: menuItems }, 200);
	} catch (error) {
		errorResponse(response, error.message, 500);
	}
};

module.exports = { getMenuItemsController };
