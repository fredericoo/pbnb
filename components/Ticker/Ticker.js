import styles from "./Ticker.module.scss";
import { withSeparator } from "./utils/numbers";
import { useRef, useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

const Ticker = ({ entry, label }) => {
	if (!entry) return null;
	const numberRef = useRef();

	const [lastValue, setLastValue] = useState(entry.change);
	useEffect(() => {
		if (entry.change != lastValue) {
			setLastValue(entry.change);
			if (numberRef.current) {
				numberRef.current.animate(
					[
						{
							backgroundColor: lastValue > entry.change ? "#fce0b2" : "#73b0a6",
						},
						{ backgroundColor: "transparent" },
					],
					{ duration: 2000 }
				);
			}
		}
	}, [entry]);
	if (entry.symbol) {
		const { t } = useTranslation();
		const direction =
			entry.change > 0 ? "positive" : entry.change < 0 ? "negative" : "neutral";
		return (
			<li className={`s-xs ${styles.entry} ${styles[direction]}`}>
				<div className={`${styles.label}`}>{label || entry.name}</div>
				{/* <div ref={numberRef} className={`${styles.price}`}>
					{withSeparator(
						entry.price,
						t("common:separator.decimal"),
						t("common:separator.thousands")
					)}
				</div> */}
				<div className={styles.arrow}></div>
				<div className={`${styles.value}`}>
					{withSeparator(
						entry.change,
						t("common:separator.decimal"),
						t("common:separator.thousands")
					)}
					&ensp;(
					{withSeparator(
						entry.changesPercentage,
						t("common:separator.decimal"),
						t("common:separator.thousands")
					)}
					%)
				</div>
			</li>
		);
	}
	return (
		<li className={`s-xs ${styles.entry} ${styles.skeleton}`}>
			<div className={`${styles.label}`}>Stock Label</div>
			<div className={`${styles.price}`}>123.456</div>
			<div className={styles.arrow}></div>
			<div className={`${styles.value}`}>1.2345&emsp;1.2345%</div>
		</li>
	);
};

export default Ticker;
