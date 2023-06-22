import { InputLabel, Select, SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

function SelectBar(props: {
  label: string;
  name: string;
  value: string | number;
  onChange: (
    event: SelectChangeEvent<string | number>,
    child: ReactNode
  ) => void;
  error: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <InputLabel error={props.error}>{props.label}</InputLabel>
      <Select
        name={props.name}
        fullWidth
        value={props.value}
        label={null}
        onChange={props.onChange}
        size="small"
        error={props.error}
      >
        {props.children}
      </Select>
    </div>
  );
}

export default SelectBar;
