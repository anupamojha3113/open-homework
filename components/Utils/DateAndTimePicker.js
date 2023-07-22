import DateAdapter from '@mui/lab/AdapterDateFns';

import { TextField, Tooltip } from '@mui/material';
import { red, grey } from '@mui/material/colors';
import {
	LocalizationProvider,
	DateTimePicker,
	PickersDay,
	CalendarPickerSkeleton,
} from '@mui/lab';

const RenderDay = ({ day, DayComponentProps, highlightDays }) => {
	const disabled = DayComponentProps.disabled;
	const freq = highlightDays[parseInt(day.getDate()) - 1];
	const color = freq < 1 ? grey[200] : red[Math.min(freq * 100, 900)];

	if (!disabled) {
		return (
			<Tooltip
				title={freq ? `${freq} existing assignments` : ''}
				placement="right"
				arrow
			>
				<PickersDay
					{...DayComponentProps}
					sx={{ bgcolor: color, '&:hover': { bgcolor: color } }}
				/>
			</Tooltip>
		);
	} else {
		return <PickersDay {...DayComponentProps} />;
	}
};

const Picker = ({
	date,
	onChange,
	onError,
	label,
	onMonthChange,
	highlightDays = [],
	isLoading = false,
	error,
}) => {
	const handleDateChange = newDate => {
		onChange(newDate);
	};

	const handleMonthChange = newDate => {
		if (onMonthChange) {
			onMonthChange(newDate);
		}
	};

	return (
		<LocalizationProvider dateAdapter={DateAdapter}>
			<DateTimePicker
				value={date}
				onChange={handleDateChange}
				renderInput={props => <TextField {...props} fullWidth error={error} />}
				label={label || 'Date and time picker'}
				minDate={new Date()}
				onYearChange={handleMonthChange}
				onMonthChange={handleMonthChange}
				renderDay={(day, _value, DayComponentProps) => (
					<RenderDay
						day={day}
						DayComponentProps={DayComponentProps}
						key={day.getDate()}
						highlightDays={highlightDays}
					/>
				)}
				desktopModeMediaQuery="@media (min-width:600px)"
				onError={onError ? onError : null}
			/>
		</LocalizationProvider>
	);
};

export default Picker;
