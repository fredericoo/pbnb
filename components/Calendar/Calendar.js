import styles from "./Calendar.module.scss";

import moment from "moment";
import { weekdays, monthsFull } from "./constants/dates";
import {
	getDayOfMonth,
	getMonth,
	getYear,
	getMonthDayYear,
} from "./utils/moment-utils";
import { getDatesInMonthDisplay, getMonthSet } from "./utils/date-utils";

import Button from "components/Button/Button";
import { useMemo } from "react";

const Calendar = ({
	onChange,
	value,
	name,
	dateFrom = moment().format("YYYY-MM-DD"),
}) => {
	const changeCondition = (date) =>
		!moment(date, "YYYY-MM-DD").isBefore(dateFrom);

	const handleDateChange = (date) => {
		if (changeCondition(date)) {
			onChange({ target: { name, value: date.toString() } });
		}
	};

	return (
		<div className={styles.calendar}>
			<MonthPicker
				changeCondition={changeCondition}
				selectDate={value || moment().format("YYYY-MM-DD")}
				setSelectDate={handleDateChange}
			/>
			<WeekDays />
			<DatePicker
				changeCondition={changeCondition}
				selectDate={value || moment().format("YYYY-MM-DD")}
				setSelectDate={handleDateChange}
			/>
		</div>
	);
};

const WeekDays = () => {
	return (
		<header className={styles.header}>
			{weekdays.map((weekday) => (
				<div key={weekday} className={`${styles.date} smcp`}>
					{weekday}
				</div>
			))}
		</header>
	);
};

const DatePicker = ({ selectDate, setSelectDate, changeCondition }) => {
	const datesInMonth = getDatesInMonthDisplay(
		getMonth(selectDate) + 1,
		getYear(selectDate)
	);

	return (
		<div className={styles.body}>
			{datesInMonth.map((i, key) => (
				<button
					type="button"
					className={`${styles.date} ${
						i.date.toString() === selectDate ? styles.active : ""
					}`}
					disabled={!changeCondition(i.date)}
					data-active-month={i.currentMonth}
					data-date={i.date.toString()}
					key={key}
					onClick={() => setSelectDate(i.date)}
				>
					{getDayOfMonth(i.date)}
				</button>
			))}
		</div>
	);
};

const MonthPicker = ({ selectDate, setSelectDate }) => {
	const changeMonth = (date) => {
		setSelectDate(date);
	};
	const monthSet = getMonthSet(selectDate);
	return (
		<div className={styles.footer}>
			<Button type="ghost" onClick={() => changeMonth(monthSet.prev)}>
				{monthsFull[getMonth(monthSet.prev)]}
			</Button>
			<h3 className={`${styles.month}`}>
				{monthsFull[getMonth(monthSet.current)]} {getYear(selectDate)}
			</h3>
			<Button type="ghost" onClick={() => changeMonth(monthSet.next)}>
				{monthsFull[getMonth(monthSet.next)]}
			</Button>
		</div>
	);
};

export default Calendar;
