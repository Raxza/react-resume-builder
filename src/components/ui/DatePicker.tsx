import { DatePicker as MuiDatePicker, LocalizationProvider, DatePickerProps, DateTimePickerFieldProps, DateTimePickerProps } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import React from 'react'
import { Input } from './input'
import { cn } from '@/lib/utils'
import { styled, TextField } from '@mui/material'

type Props = DatePickerProps<any>;

const DatePicker = (props: Props) => {
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

export default DatePicker

// Custom styled TextField component
const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    height: '20px',
    borderRadius: '12px',
    '& fieldset': {
      borderRadius: '12px',
    },
  },
  '& .MuiPaper-root': {
    borderRadius: '16px',
  },
});