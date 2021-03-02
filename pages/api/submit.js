import moment from "moment";

async function submit(req, res) {
	const timestamp = moment().format();
	const sgMail = require("@sendgrid/mail");
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const msg = {
		to: "rincofrederico@gmail.com", // Change to your recipient
		from: "noreply@pbnb.re", // Change to your verified sender
		subject: "Sending with SendGrid is Fun",
		text: "and easy to do anywhere, even with Node.js",
		html: "<strong>and easy to do anywhere, even with Node.js</strong>",
	};

	sgMail
		.send(msg)
		.then(() => {
			res.json({ timestamp, success: true });
		})
		.catch((error) => {
			res.json({ timestamp, success: false, error });
		});
}

export default submit;
