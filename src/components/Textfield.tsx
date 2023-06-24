import { InputLabel, TextField } from "@mui/material";

function Textfield(props: {
  label: string | undefined;
  name: string;
  value: string | number | undefined;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  helperText: string | undefined;
  error: boolean;
  type: string | undefined;
  autoFocus: boolean;
  inputProps: object | undefined;
}) {
  return (
    <div>
      <InputLabel error={props.error}>{props.label}</InputLabel>
      <TextField
        autoFocus={props.autoFocus}
        fullWidth
        name={props.name}
        variant="outlined"
        size="small"
        label={null}
        className="TextField-without-border-radius"
        value={props.value}
        onChange={props.onChange}
        helperText={props.helperText}
        error={props.error}
        type={props.type}
        inputProps={props.inputProps}
      />
    </div>
  );
}

export default Textfield;
