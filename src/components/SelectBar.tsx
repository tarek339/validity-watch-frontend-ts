import { InputLabel, Select, SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

function SelectBar(props: {
  label: string | undefined;
  name: string;
  value: string | number | undefined;
  onChange: (
    event: SelectChangeEvent<string | number>,
    child: ReactNode
  ) => void;
  error: boolean;
  children: React.ReactNode;
  sx: object | undefined;
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
        sx={props.sx}
        // sx={{
        //   width: 240,
        //   [`& .${selectClasses.indicator}`]: {
        //     transition: "0.2s",
        //     [`&.${selectClasses.expanded}`]: {
        //       transform: "rotate(-180deg)",
        //     },
        //   },
        // }}
      >
        {props.children}
      </Select>
    </div>
  );
}

export default SelectBar;
