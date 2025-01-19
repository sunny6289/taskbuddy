import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePickerProps } from "../constants/PropData/propData";
const DatePicker = ({ label, value, style, setDate  }: DatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MUIDatePicker
        defaultValue={value}
        label={label}
        sx={style}
        onChange={setDate}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
