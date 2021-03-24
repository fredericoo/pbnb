import styles from "./Ticker.module.scss";
import { withSeparator } from "./utils/numbers";
import { useRef, useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

const Ticker = ({ entry, label }) => {
	const numberRef = useRef();

	const [lastValue, setLastValue] = useState(entry?.change);
	useEffect(() => {
		if (entry && entry.change != lastValue) {
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

	const { t } = useTranslation();
	const direction =
		entry?.change > 0 ? "positive" : entry?.change < 0 ? "negative" : "neutral";
	return (
		<div className={`s-md ${styles.entry} ${styles[direction]}`}>
			<span className={`${styles.label}`}>{label || entry?.name}</span>
			{/* <div ref={numberRef} className={`${styles.price}`}>
					{withSeparator(
						entry.price,
						t("common:separator.decimal"),
						t("common:separator.thousands")
					)}
				</div> */}
			{entry?.change && (
				<>
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
				</>
			)}
		</div>
	);
};

export default Ticker;
