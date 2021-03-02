import { useState } from "react";

const ContactForm = ({ fields, url, subject }) => {
	const [values, setValues] = useState({});
	const [message, setMessage] = useState();

	const handleChange = (e) => {
		e.target && setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setMessage({});
		fetch(url, {
			method: "POST",
			body: JSON.stringify({ subject, fields: values }),
		})
			.then((res) => res.json())
			.then((res) => setMessage({ success: res.success, text: res.message }));
	};

	return (
		<form onSubmit={handleSubmit}>
			{fields.map((field, key) => {
				return (
					<InputComponent
						type={field.type}
						key={key}
						label={field.label}
						name={field.name}
						handleChange={handleChange}
						value={values[field.name]}
					/>
				);
			})}
			<input
				type="hidden"
				name="robot"
				className={"visually-hidden"}
				onChange={handleChange}
				value={values["robot"]}
			/>
			<input type="submit" value="submit" />
			{message && <div>{message.text}</div>}
		</form>
	);
};

const InputComponent = ({ type, label, handleChange, ...props }) => {
	switch (type) {
		case "text":
			return (
				<label>
					{label && <span>{label}</span>}
					<input type={type} {...props} onChange={handleChange} />
				</label>
			);
		case "textarea":
			return (
				<label>
					{label && <span>{label}</span>}
					<textarea type={type} {...props} onChange={handleChange} />
				</label>
			);
	}

	return null;
};

export default ContactForm;
