const nodemailer = require("nodemailer");
const smtp = require("nodemailer-smtp-transport");
console.log(process.env.PASSWORD);
const sendMail = (orders) => {
	console.log(orders);
	let body = {
		from: "michealdunamis@yahoo.com",
		to: "micheal@psynthax.com",
		subject: "This is your receipt",
		html: `<p>${orders}</p>`,
	};

	const transporter = nodemailer.createTransport(
		smtp({
			service: "Yahoo",
			host: "smtp.mail.yahoo.com",
			auth: {
				user: "michealdunamis@yahoo.com",
				pass: "alsyoekcytpesnov",
			},
		}),
	);

	transporter.verify(function (error, success) {
		if (error) {
			throw new Error(err.message);
		} else {
			console.log("Server ready to send messages");
		}
	});

	transporter.sendMail(body, (err, result) => {
		if (err) {
			throw new Error(err.message);
		}
	});
};

module.exports = { sendMail };
