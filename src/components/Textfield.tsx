import { InputLabel, TextField } from "@mui/material";

const labelStyle = {
  color: "#000",
  paddingBottom: "3px",
};

const inputLabel = { sx: { backgroundColor: "#fff", borderRadius: "5px" } };

function Textfield(props: {
  label: string;
  name: string;
  value: string | number | undefined;
  onChange: any;
  helperText: any | undefined;
  error: boolean;
  type: string | undefined;
  autoFocus: boolean;
}) {
  return (
    <div>
      <InputLabel error={props.error} sx={labelStyle}>
        {props.label}
      </InputLabel>
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
        inputProps={inputLabel}
        helperText={props.helperText}
        error={props.error}
        type={props.type}
      />
    </div>
  );
}

export default Textfield;
