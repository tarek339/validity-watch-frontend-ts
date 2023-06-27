import { Grid, Typography } from "@mui/material";
import Textfield from "../Textfield";
import PickDate from "../PickDate";
import { PickerChangeHandlerContext } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types";
import { DateValidationError } from "@mui/x-date-pickers";

const height = {
  style: { height: "10px" },
};

function StepOne(props: {
  // value
  valueFirstName: string | number | undefined;
  valueLastName: string | number | undefined;
  valuePhoneNumber: string | number | undefined;
  valueBirthday: any;
  valueBirthPlace: string | number | undefined;
  valueStreet: string | number | undefined;
  valueHouseNumber: string | number | undefined;
  valueZipCode: string | number | undefined;
  valueCity: string | number | undefined;
  // onChange
  onChangeFirstName: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onChangeLastName: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onChangePhoneNumber: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onChangeBirthday:
    | ((
        value: string | null,
        context: PickerChangeHandlerContext<DateValidationError>
      ) => void)
    | undefined;
  onChangeBirthPlace: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onChangeStreet: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onChangeHouseNumber: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onChangeZipCode: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onChangeCity: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  // error
  errorFirstName: boolean;
  errorLastName: boolean;
  errorPhoneNumber: boolean;
  errorBirthday: boolean;
  errorBirthPlace: boolean;
  errorStreet: boolean;
  errorHouseNumber: boolean;
  errorZipCode: boolean;
  errorCity: boolean;
  // holder
  holderFirstName: React.ReactNode;
  holderLastName: React.ReactNode;
  holderPhoneNumber: React.ReactNode;
  holderBirthday: React.ReactNode;
  holderBirthPlace: React.ReactNode;
  holderStreet: React.ReactNode;
  holderHouseNumber: React.ReactNode;
  holderZipCode: React.ReactNode;
  holderCity: React.ReactNode;
}) {
  return (
    <>
      <Grid item xs={5}>
        <Typography>First name</Typography>
      </Grid>
      <Grid item xs={7}>
        <Textfield
          autoFocus={false}
          label={undefined}
          name={"firstName"}
          value={props.valueFirstName}
          onChange={props.onChangeFirstName}
          helperText={undefined}
          error={props.errorFirstName}
          type={undefined}
          inputProps={height}
        />
        {props.holderFirstName}
      </Grid>
      <Grid item xs={5}>
        <Typography>Last name</Typography>
      </Grid>
      <Grid item xs={7}>
        <Textfield
          autoFocus={false}
          label={undefined}
          name="lastName"
          value={props.valueLastName}
          onChange={props.onChangeLastName}
          helperText={undefined}
          error={props.errorLastName}
          type={undefined}
          inputProps={height}
        />
        {props.holderLastName}
      </Grid>
      <Grid item xs={5}>
        <Typography>Phone nr</Typography>
      </Grid>
      <Grid item xs={7}>
        <Textfield
          autoFocus={false}
          label={undefined}
          name="phoneNumber"
          value={props.valuePhoneNumber}
          onChange={props.onChangePhoneNumber}
          helperText={undefined}
          error={props.errorPhoneNumber}
          type={undefined}
          inputProps={height}
        />
        {props.holderPhoneNumber}
      </Grid>
      <Grid item xs={5}>
        <Typography>Date of birth</Typography>
      </Grid>
      <Grid item xs={7}>
        <PickDate
          views={["year", "month", "day"]}
          format={"DD.MM.YYYY"}
          value={props.valueBirthday}
          onChange={props.onChangeBirthday}
          error={props.errorBirthday}
          inputLabel={undefined}
          inputProps={height}
        />
        {props.holderBirthday}
      </Grid>
      <Grid item xs={5}>
        <Typography>Place of birth</Typography>
      </Grid>
      <Grid item xs={7}>
        <Textfield
          autoFocus={false}
          label={undefined}
          name="birthPlace"
          value={props.valueBirthPlace}
          onChange={props.onChangeBirthPlace}
          helperText={undefined}
          error={props.errorBirthPlace}
          type={undefined}
          inputProps={height}
        />
        {props.holderBirthPlace}
      </Grid>
      <Grid item xs={5}>
        <Typography>Street</Typography>
      </Grid>
      <Grid item xs={7}>
        <Textfield
          autoFocus={false}
          label={undefined}
          name="street"
          value={props.valueStreet}
          onChange={props.onChangeStreet}
          helperText={undefined}
          error={props.errorStreet}
          type={undefined}
          inputProps={height}
        />
        {props.holderStreet}
      </Grid>
      <Grid item xs={5}>
        <Typography>House nr</Typography>
      </Grid>
      <Grid item xs={7}>
        <Textfield
          autoFocus={false}
          label={undefined}
          name="houseNumber"
          value={props.valueHouseNumber}
          onChange={props.onChangeHouseNumber}
          helperText={undefined}
          error={props.errorHouseNumber}
          type={undefined}
          inputProps={height}
        />
        {props.holderHouseNumber}
      </Grid>
      <Grid item xs={5}>
        <Typography>Zip Code</Typography>
      </Grid>
      <Grid item xs={7}>
        <Textfield
          autoFocus={false}
          label={undefined}
          name="zipCode"
          value={props.valueZipCode}
          onChange={props.onChangeZipCode}
          helperText={undefined}
          error={props.errorZipCode}
          type={undefined}
          inputProps={height}
        />
        {props.holderZipCode}
      </Grid>
      <Grid item xs={5}>
        <Typography>City</Typography>
      </Grid>
      <Grid item xs={7}>
        <Textfield
          autoFocus={false}
          label={undefined}
          name="city"
          value={props.valueCity}
          onChange={props.onChangeCity}
          helperText={undefined}
          error={props.errorCity}
          type={undefined}
          inputProps={height}
        />
        {props.holderCity}
      </Grid>
    </>
  );
}

export default StepOne;
