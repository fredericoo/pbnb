import moment from "moment";

async function submit(req, res) {
	const timestamp = moment().format();

	const body = JSON.parse(req.body);

	if (req.method !== "POST") {
		res.json({
			timestamp,
			success: false,
			status: 401,
			message: "wrong-method",
		});
		return;
	}
	if (!Object.values(body.fields).length) {
		res.json({
			timestamp,
			success: false,
			status: 401,
			message: "no-fields",
		});
		return;
	}
	if (!!body.fields.robot) {
		res.json({
			timestamp,
			success: false,
			status: 401,
			message: "spam",
		});
		return;
	}

	const sgMail = require("@sendgrid/mail");
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	const text = Object.entries(body.fields)
		.map(([key, value]) => `${key}: ${value}`)
		.join("\n");
	const html = Object.entries(body.fields)
		.map(([key, value]) => `<strong>${key}:</strong> ${value}`)
		.join("<br/>");

	const msg = {
		to: "hello@belo.re",
		from: "noreply@pbnb.re",
		subject: body.subject || "Form submission",
		text,
		html,
	};

	await sgMail
		.send(msg)
		.then(() => {
			res.json({ timestamp, success: true, message: "sent" });
		})
		.catch((error) => {
			res.json({ timestamp, success: false, message: "sg-error", ...error });
		});
}

export default submit;
