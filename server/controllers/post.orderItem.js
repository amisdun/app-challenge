const {
	errorResponse,
	successResponse,
} = require("../serverResponse/response");
const { sendMail } = require("../services/mailer/sendMail");
const { placeOrder } = require("../services/placeOrder");

const userOrderItemController = async (request, response) => {
	try {
		const { _id: user, email } = request.user;
		const { orders } = request.body;
		const orderDetails = Object.freeze({
			user,
			...orders,
		});
		const orderItem = await placeOrder(orderDetails);
		sendMail(orders);
		successResponse(response, { data: orderItem });
	} catch (error) {
		errorResponse(response, error.message, 500);
	}
};

module.exports = { userOrderItemController };
