import Link from "next/link";
import styles from "./Button.module.scss";

const Button = ({
	children,
	href,
	onClick,
	type = "primary",
	size = "md",
	submit,
}) => {
	const buttonClass = `${styles.button} ${
		type ? styles[`type--${type}`] : ""
	} ${size ? styles[`size--${size}`] : ""}`;

	if (href)
		return (
			<Link href={href}>
				<a className={buttonClass}>{children}</a>
			</Link>
		);

	return (
		<button
			onClick={onClick}
			type={submit ? "submit" : "button"}
			className={buttonClass}
		>
			{children}
		</button>
	);
};
export default Button;
