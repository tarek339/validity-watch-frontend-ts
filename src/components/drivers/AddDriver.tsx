import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Grid,
  MenuItem,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeSnackbar, setSnackbar } from "../../redux/slices/snackbarSlice";
import GridContainer from "../GridContainer";
import Textfield from "../Textfield";
import SnackBar from "../SnackBar";
import Person2Icon from "@mui/icons-material/Person2";
import SelectBar from "../SelectBar";
import PickDate from "../PickDate";
import moment from "moment";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 601,
      lg: 750,
      xl: 980,
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First name min. 3 letters")
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  lastName: Yup.string()
    .min(3, "Last name min. 3 letters")
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  phoneNumber: Yup.string()
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/g,
      "Incorrect type of phone number"
    )
    .required("required"),
  street: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  houseNumber: Yup.string()
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/g, "Numbers only")
    .required("required"),
  zipCode: Yup.string()
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/g, "Numbers only")
    .required("required"),
  city: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  birthday: Yup.string().required("required"),
  birthPlace: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Letters only")
    .required("required"),
  licenceNumber: Yup.string()
    .matches(/^[a-zA-Z0-9 ]*$/, "No special characters")
    .required("required"),
  licenceTyp: Yup.string().required("required"),
  licenceTypExpire: Yup.string().required("required"),
  codeNumber: Yup.string()
    .matches(/^[a-zA-Z0-9 ]*$/, "No special characters")
    .required("required"),
  codeNumberExpire: Yup.string().required("required"),
  driverCardNumber: Yup.string()
    .matches(/^[a-zA-Z0-9 ]*$/, "No special characters")
    .required("required"),
  driverCardNumberExpire: Yup.string().required("required"),
});

const AddDriver = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state: RootState) => state.snackbar);
  const user = useSelector((state: RootState) => state.user.user);

  const formik = useFormik({
    initialValues: {
      id: user?._id,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      street: "street",
      houseNumber: "12",
      zipCode: "1212",
      city: "city",
      birthday: "",
      birthPlace: "hamburg",
      licenceNumber: "",
      licenceTyp: "CE",
      licenceTypExpire: "",
      codeNumber: "Ja",
      codeNumberExpire: "",
      driverCardNumber: "",
      driverCardNumberExpire: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await axios
        .post("/driver/sign-up", values)
        .then((res) => {
          resetForm();
          dispatch(
            setSnackbar({
              open: true,
              severity: "success",
              message: res?.data?.message,
            })
          );
          setTimeout(
            () =>
              dispatch(
                removeSnackbar({ open: false, severity: "error", message: "" })
              ),
            4000
          );
        })
        .catch((err) => {
          console.log(err?.response?.data?.message);
          dispatch(
            setSnackbar({
              open: true,
              severity: "error",
              message: err?.response?.data?.message,
            })
          );
          setTimeout(
            () =>
              dispatch(
                removeSnackbar({ open: false, severity: "error", message: "" })
              ),
            4000
          );
        });
    },
  });

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

  return (
    <div className="section">
      <ThemeProvider theme={theme}>
        {snackbar.open ? <SnackBar /> : null}
        <div className="section-child">
          <form
            className="section-child-content"
            onSubmit={formik.handleSubmit}
          >
            <GridContainer
              backgroundColor="#f73378"
              icon={<Person2Icon />}
              content="Add drivers"
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Textfield
                  inputProps={undefined}
                  autoFocus={false}
                  label="First Name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.firstName) &&
                    Boolean(formik.touched.firstName)
                  }
                  type={undefined}
                />
                {formik.touched.firstName ? (
                  <div className="error">{formik.errors.firstName} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Textfield
                  inputProps={undefined}
                  autoFocus={false}
                  label="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.lastName) &&
                    Boolean(formik.touched.lastName)
                  }
                  type={undefined}
                />
                {formik.touched.lastName ? (
                  <div className="error">{formik.errors.lastName} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} md={6}>
                <Textfield
                  inputProps={undefined}
                  autoFocus={false}
                  label="Phone number"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.phoneNumber) &&
                    Boolean(formik.touched.phoneNumber)
                  }
                  type={undefined}
                />
                {formik.touched.phoneNumber ? (
                  <div className="error">{formik.errors.phoneNumber} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={8} md={4}>
                <Textfield
                  inputProps={undefined}
                  autoFocus={false}
                  label="Street"
                  name="street"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.street) &&
                    Boolean(formik.touched.street)
                  }
                  type={undefined}
                />
                {formik.touched.street ? (
                  <div className="error">{formik.errors.street} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <Textfield
                  inputProps={undefined}
                  autoFocus={false}
                  label="House Nr."
                  name="houseNumber"
                  value={formik.values.houseNumber}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.houseNumber) &&
                    Boolean(formik.touched.houseNumber)
                  }
                  type={undefined}
                />
                {formik.touched.houseNumber ? (
                  <div className="error">{formik.errors.houseNumber} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <Textfield
                  inputProps={undefined}
                  autoFocus={false}
                  label="ZIP Code"
                  name="zipCode"
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.zipCode) &&
                    Boolean(formik.touched.zipCode)
                  }
                  type={undefined}
                />
                {formik.touched.zipCode ? (
                  <div className="error">{formik.errors.zipCode} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={8} md={4}>
                <Textfield
                  inputProps={undefined}
                  autoFocus={false}
                  label="City"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.city) && Boolean(formik.touched.city)
                  }
                  type={undefined}
                />
                {formik.touched.city ? (
                  <div className="error">{formik.errors.city} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <PickDate
                  views={["day", "month", "year"]}
                  format={"DD.MM.YYYY"}
                  value={moment(formik.values.birthday)}
                  onChange={(value, context) => {
                    const date = moment(value);
                    // convert the string value to a Moment object
                    formik.setFieldValue("birthday", date);
                  }}
                  error={
                    Boolean(formik.errors.birthday) &&
                    Boolean(formik.touched.birthday)
                  }
                  inputLabel={"Date of birth"}
                  inputProps={undefined}
                />
                {formik.touched.birthday ? (
                  <div className="error">{formik.errors.birthday} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Textfield
                  inputProps={undefined}
                  autoFocus={false}
                  label="Place of birth"
                  name="birthPlace"
                  value={formik.values.birthPlace}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.birthPlace) &&
                    Boolean(formik.touched.birthPlace)
                  }
                  type={undefined}
                />
                {formik.touched.birthPlace ? (
                  <div className="error">{formik.errors.birthPlace} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} md={6}>
                <Textfield
                  inputProps={undefined}
                  autoFocus={false}
                  label="Licence number"
                  name="licenceNumber"
                  value={formik.values.licenceNumber}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.licenceNumber) &&
                    Boolean(formik.touched.licenceNumber)
                  }
                  type={undefined}
                />
                {formik.touched.licenceNumber ? (
                  <div className="error">{formik.errors.licenceNumber} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <SelectBar
                  sx={undefined}
                  label="Licence Typ"
                  name="licenceTyp"
                  value={formik.values.licenceTyp}
                  onChange={formik.handleChange}
                  error={
                    Boolean(formik.errors.licenceTyp) &&
                    Boolean(formik.touched.licenceTyp)
                  }
                  children={values.map((value) => {
                    return (
                      <MenuItem key={value.id} value={value.value}>
                        {value.name}
                      </MenuItem>
                    );
                  })}
                />
                {formik.touched.licenceTyp ? (
                  <div className="error">{formik.errors.licenceTyp} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <PickDate
                  views={["day", "month", "year"]}
                  format={"DD.MM.YYYY"}
                  value={moment(formik.values.licenceTypExpire)}
                  onChange={(value, context) => {
                    const date = moment(value);
                    // convert the string value to a Moment object
                    formik.setFieldValue("licenceTypExpire", date);
                  }}
                  error={
                    Boolean(formik.errors.licenceTypExpire) &&
                    Boolean(formik.touched.licenceTypExpire)
                  }
                  inputLabel={"Expiry date"}
                  inputProps={undefined}
                />
                {formik.touched.licenceTypExpire ? (
                  <div className="error">{formik.errors.licenceTypExpire} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <SelectBar
                  label={"Code number 95"}
                  name={"codeNumber"}
                  value={formik.values.codeNumber}
                  onChange={formik.handleChange}
                  error={
                    Boolean(formik.errors.codeNumber) &&
                    Boolean(formik.touched.codeNumber)
                  }
                  children={valueCodeNum.map((value) => {
                    return (
                      <MenuItem key={value.id} value={value.value}>
                        {value.name}
                      </MenuItem>
                    );
                  })}
                  sx={undefined}
                />
                {formik.touched.codeNumber ? (
                  <div className="error">{formik.errors.codeNumber} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <PickDate
                  views={["day", "month", "year"]}
                  format={"DD.MM.YYYY"}
                  value={moment(formik.values.codeNumberExpire)}
                  onChange={(value, context) => {
                    const date = moment(value);
                    // convert the string value to a Moment object
                    formik.setFieldValue("codeNumberExpire", date);
                  }}
                  error={
                    Boolean(formik.errors.codeNumberExpire) &&
                    Boolean(formik.touched.codeNumberExpire)
                  }
                  inputLabel={"Expiry date"}
                  inputProps={undefined}
                />
                {formik.touched.codeNumberExpire ? (
                  <div className="error">{formik.errors.codeNumberExpire} </div>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Textfield
                  inputProps={undefined}
                  autoFocus={false}
                  label="Driver card number"
                  name="driverCardNumber"
                  value={formik.values.driverCardNumber}
                  onChange={formik.handleChange}
                  helperText={undefined}
                  error={
                    Boolean(formik.errors.driverCardNumber) &&
                    Boolean(formik.touched.driverCardNumber)
                  }
                  type={undefined}
                />
                {formik.touched.driverCardNumber ? (
                  <div className="error">{formik.errors.driverCardNumber}</div>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <PickDate
                  views={["day", "month", "year"]}
                  format={"DD.MM.YYYY"}
                  value={moment(formik.values.driverCardNumberExpire)}
                  onChange={(value, context) => {
                    const date = moment(value);
                    // convert the string value to a Moment object
                    formik.setFieldValue("driverCardNumberExpire", date);
                  }}
                  error={
                    Boolean(formik.errors.driverCardNumberExpire) &&
                    Boolean(formik.touched.driverCardNumberExpire)
                  }
                  inputLabel="Expiry date"
                  inputProps={undefined}
                />
                {formik.touched.driverCardNumberExpire ? (
                  <div className="error">
                    {formik.errors.driverCardNumberExpire}{" "}
                  </div>
                ) : null}
              </Grid>

              <Grid item xs={12}>
                <Button fullWidth variant="contained" type="submit">
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </ThemeProvider>
    </div>
  );
};
export default AddDriver;
