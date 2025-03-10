import { DatePicker as MuiDatePicker, LocalizationProvider, DatePickerProps } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

interface Props extends Omit<DatePickerProps<Date>, 'minDate' | 'maxDate'> {
  minDate?: Date | null;
  maxDate?: Date | null;
}

const DatePicker = ({minDate, maxDate, ...props}: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        // label="End Date"
        slotProps={{
          textField: {
            size: 'small',
            fullWidth: true,
            classes: { root: 'h-9 border border-input shadow-sm' }
          }
        }}
        minDate={minDate || undefined}
        maxDate={maxDate || undefined}
        {...props}
        // className="flex h-9 w-full rounded-md"
        // views={["year", "month"]}
        // value={experience.endDate ? new Date(experience.endDate) : null}
        // disabled={experience.isCurrent}
        // disableFuture={experience.isCurrent}
        // onChange={updateEndDate}
      // renderInput={(params) => <Input {...params} />}
      />
    </LocalizationProvider>
  )
}

export default DatePicker;