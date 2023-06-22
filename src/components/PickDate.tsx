import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { InputLabel } from "@mui/material";
import { PickerChangeHandlerContext } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types";
import { DateValidationError } from "@mui/x-date-pickers";

export default function PickDate(props: {
  views: ("year" | "month" | "day")[];
  format: string;
  value: any;
  onChange:
    | ((
        value: string | null,
        context: PickerChangeHandlerContext<DateValidationError>
      ) => void)
    | undefined;
  error: boolean;
  inputLabel: string;
}) {
  return (
    <div>
      <InputLabel error={props.error}>{props.inputLabel}</InputLabel>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          views={props.views}
          format={props.format}
          sx={{ width: "100%" }}
          value={props.value}
          onChange={props.onChange}
          slotProps={{
            textField: {
              className: "TextField-without-border-radius",
              size: "small",
              error: props.error,
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
