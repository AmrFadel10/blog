const nodemailer = require("nodemailer");
const ApiError = require("./apiError");

module.exports = async (userEmail, subject, htmlTemplate) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			auth: {
				user: process.env.APP_EMAIL_ADDRESS,
				pass: process.env.APP_EMAIL_PASSWORD,
			},
		});

		const mailOptions = {
			from: process.env.APP_EMAIL_ADDRESS,
			to: userEmail,
			subject: subject,
			html: htmlTemplate,
		};

		const info = await transporter.sendMail(mailOptions);

		console.log("Email Send: " + info.response);
	} catch (error) {
		// console.log(error);
		throw new ApiError(error.message, 500);
	}
};
