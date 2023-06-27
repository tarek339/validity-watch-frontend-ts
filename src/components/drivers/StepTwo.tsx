import { Grid, MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import PickDate from "../PickDate";
import Textfield from "../Textfield";
import SelectBar from "../SelectBar";
import { PickerChangeHandlerContext } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types";
import { DateValidationError } from "@mui/x-date-pickers";
import { ReactNode } from "react";

const height = {
  style: { height: "10px" },
};

const values = [
  {
    id: 1,
    value: "C1E",
    name: "C1E",
  },
  {
    id: 2,
    value: "C1",
    name: "C1",
  },
  {
    id: 3,
    value: "C",
    name: "C",
  },
  {
    id: 4,
    value: "CE",
    name: "CE",
  },
];

const valueCodeNum = [
  {
    id: 1,
    value: "Ja",
    name: "Ja",
  },
  {
    id: 2,
    value: "Nein",
    name: "Nein",
  },
];

function StepTwo(props: {
  // values
  valueLicenceNumber: string | number | undefined;
  valueLicenceTyp: string | number | undefined;
  valueLicenceTypExpire: any;
  valueCodeNumber: string | number | undefined;
  valueCodeNumberExpire: any;
  valueDriverCardNumber: string | number | undefined;
  valueDriverCardNumberExpire: any;
  // onChange
  onChangeLicenceNumber: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onChangeLicenceTyp: (
    event: SelectChangeEvent<string | number>,
    child: ReactNode
  ) => void;
  onChangeLicenceTypExpire:
    | ((
        value: string | null,
        context: PickerChangeHandlerContext<DateValidationError>
      ) => void)
    | undefined;
  onChangeCodeNumber: (
    event: SelectChangeEvent<string | number>,
    child: ReactNode
  ) => void;
  onChangeCodeNumberExpire:
    | ((
        value: string | null,
        context: PickerChangeHandlerContext<DateValidationError>
      ) => void)
    | undefined;
  onChangeDriverCardNumber: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onChangeDriverCardNumberExpire:
    | ((
        value: string | null,
        context: PickerChangeHandlerContext<DateValidationError>
      ) => void)
    | undefined;
  // error
  errorLicenceNumber: boolean;
  errorLicenceTyp: boolean;
  errorLicenceTypExpire: boolean;
  errorCodeNumber: boolean;
  errorCodeNumberExpire: boolean;
  errorDriverCardNumber: boolean;
  errorDriverCardNumberExpire: boolean;
  // holder
  holderLicenceNumber: React.ReactNode;
  holderLicenceTyp: React.ReactNode;
  holderLicenceTypExpire: React.ReactNode;
  holderCodeNumber: React.ReactNode;
  holderCodeNumberExpire: React.ReactNode;
  holderDriverCardNumber: React.ReactNode;
  holderDriverCardNumberExpire: React.ReactNode;
}) {
  return (
    <>
      <Grid item xs={5}>
        <Typography>Licence num.</Typography>
      </Grid>
      <Grid item xs={7}>
        <Textfield
          autoFocus={false}
          label={undefined}
          name="licenceNumber"
          value={props.valueLicenceNumber}
          onChange={props.onChangeLicenceNumber}
          helperText={undefined}
          error={props.errorLicenceNumber}
          type={undefined}
          inputProps={height}
        />
        {props.holderLicenceNumber}
      </Grid>
      <Grid item xs={5}>
        <Typography>Licence type</Typography>
      </Grid>
      <Grid item xs={7}>
        <SelectBar
          sx={{
            height: "26px",
          }}
          label={undefined}
          name="licenceTyp"
          value={props.valueLicenceTyp}
          onChange={props.onChangeLicenceTyp}
          error={props.errorLicenceTyp}
          children={values.map((value) => {
            return (
              <MenuItem key={value.id} value={value.value}>
                {value.name}
              </MenuItem>
            );
          })}
        />
        {props.holderLicenceTyp}
      </Grid>
      <Grid item xs={5}>
        <Typography>Expiry date</Typography>
      </Grid>
      <Grid item xs={7}>
        <PickDate
          views={["year", "month", "day"]}
          format={"DD.MM.YYYY"}
          value={props.valueLicenceTypExpire}
          onChange={props.onChangeLicenceTypExpire}
          error={props.errorLicenceTypExpire}
          inputLabel={undefined}
          inputProps={height}
        />
        {props.holderLicenceTypExpire}
      </Grid>
      <Grid item xs={5}>
        <Typography>Code num.</Typography>
      </Grid>
      <Grid item xs={7}>
        <SelectBar
          label={undefined}
          name={"codeNumber"}
          value={props.valueCodeNumber}
          onChange={props.onChangeCodeNumber}
          error={props.errorCodeNumber}
          children={valueCodeNum.map((value) => {
            return (
              <MenuItem key={value.id} value={value.value}>
                {value.name}
              </MenuItem>
            );
          })}
          sx={{ height: "27px" }}
        />
        {props.holderCodeNumber}
      </Grid>
      <Grid item xs={5}>
        <Typography>Expiry date</Typography>
      </Grid>
      <Grid item xs={7}>
        <PickDate
          views={["year", "month", "day"]}
          format={"DD.MM.YYYY"}
          value={props.valueCodeNumberExpire}
          onChange={props.onChangeCodeNumberExpire}
          error={props.errorCodeNumberExpire}
          inputLabel={undefined}
          inputProps={height}
        />
        {props.holderCodeNumberExpire}
      </Grid>
      <Grid item xs={5}>
        <Typography>Driver card num.</Typography>
      </Grid>
      <Grid item xs={7}>
        <Textfield
          autoFocus={false}
          label={undefined}
          name="driverCardNumber"
          value={props.valueDriverCardNumber}
          onChange={props.onChangeDriverCardNumber}
          helperText={undefined}
          error={props.errorDriverCardNumber}
          type={undefined}
          inputProps={height}
        />
        {props.holderDriverCardNumber}
      </Grid>
      <Grid item xs={5}>
        <Typography>Expiry date</Typography>
      </Grid>
      <Grid item xs={7}>
        <PickDate
          views={["year", "month", "day"]}
          format={"DD.MM.YYYY"}
          value={props.valueDriverCardNumberExpire}
          onChange={props.onChangeDriverCardNumberExpire}
          error={props.errorDriverCardNumberExpire}
          inputLabel={undefined}
          inputProps={height}
        />
        {props.holderDriverCardNumberExpire}
      </Grid>
    </>
  );
}

export default StepTwo;
