import styles from "./ContactForm.module.scss";
import Button from "components/Button/Button";
import { useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

const ContactForm = ({ fields, url, subject }) => {
	const { t } = useTranslation();

	const [values, setValues] = useState(
		Object.fromEntries(fields.map((field) => [field.name, ""]))
	);
	const [message, setMessage] = useState();
	const [enabled, setEnabled] = useState(true);

	const handleChange = (e) => {
		e.target && setValues({ ...values, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		let reEnable;
		if (!enabled) {
			reEnable = window.setTimeout(
				() => setEnabled(true),
				message?.success ? 5000 : 1500
			);
		}
		return () => window.clearTimeout(reEnable);
	}, [enabled]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setMessage();
		setEnabled(false);
		fetch(url, {
			method: "POST",
			body: JSON.stringify({ subject, fields: values }),
		})
			.then((res) => res.json())
			.then((res) => {
				setMessage({ success: res.success, text: res.message });
			});
	};

	return (
		<form
			className={`${styles.form} ${enabled ? "" : styles.disabled}`}
			onSubmit={handleSubmit}
		>
			{fields.map((field, key) => {
				return (
					<label>
						{field.label && (
							<span>{`${field.label} ${
								field.required ? "" : t("common:optional")
							}`}</span>
						)}
						<InputComponent
							type={field.type}
							key={key}
							name={field.name}
							required={field.required}
							handleChange={handleChange}
							value={values[field.name]}
							options={field.options}
						/>
						{field.helpText && (
							<div className="smcp l-3 s-xs">{field.helpText}</div>
						)}
					</label>
				);
			})}
			<input
				type="hidden"
				name="robot"
				className={"visually-hidden"}
				onChange={handleChange}
				value={values["robot"]}
			/>
			<Button type="primary" disabled={!enabled} submit>
				{t("common:submit")}
			</Button>
			{message && (
				<div
					className={`${styles.message} ${
						message.success ? styles.success : styles.error
					}`}
				>
					{t(`common:form.${message.text}`)}
				</div>
			)}
		</form>
	);
};

const InputComponent = ({ type, label, handleChange, ...props }) => {
	switch (type) {
		case "text":
			return <input type={type} {...props} onChange={handleChange} />;
		case "email":
			return <input type={type} {...props} onChange={handleChange} />;
		case "phone":
			return <input type={type} {...props} onChange={handleChange} />;
		case "textarea":
			return <textarea type={type} {...props} onChange={handleChange} />;
		case "select":
			return (
				<div className={styles.select}>
					<select onChange={handleChange}>
						{props.options.map((option, key) => (
							<option key={key} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>
			);
	}

	return null;
};

export default ContactForm;
